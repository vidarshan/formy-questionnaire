import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Card,
  Container,
  CopyButton,
  Flex,
  Grid,
  Header,
  Loader,
  Modal,
  Pagination,
  Switch,
  Table,
  Text,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { BiLinkAlt, BiX } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/store";
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";
import {
  createQuestionnaire,
  getQuestionnaireStats,
  getQuestionnaires,
  unPublishQuestionnaire,
} from "../store/slices/questionnaireSlice";
import { useForm } from "@mantine/form";
import moment from "moment";
import {
  BsArrowDownRight,
  BsEye,
  BsFileEarmarkLock,
  BsFillFileXFill,
  BsFillPlusCircleFill,
  BsLock,
  BsPencilSquare,
  BsPlusLg,
  BsSearch,
  BsXLg,
} from "react-icons/bs";
import { PiSpinnerBold } from "react-icons/pi";
import Empty from "../components/Empty";
import NavBar from "../components/NavBar";
import { useMediaQuery } from "@mantine/hooks";

const Home = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [unPublishOpen, setUnPublishOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const smallScreen = useMediaQuery("(min-width: 990px)");
  const extraSmallScreen = useMediaQuery("(min-width: 540px)");

  const {
    questionnaires,
    page,
    pages,
    getAllLoading,
    all,
    unPublished,
    published,
    getStatsLoading,
  } = useAppSelector((state) => state.questionnaire);

  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      isPublic: false,
      isOneTime: false,
    },

    validate: {
      title: (value) => (value.length < 2 ? "Title must be longer" : null),
      description: (value) =>
        value.length < 2 ? "Description must be longer" : null,
    },
  });

  const onQuestionnaireCreate = (values: any) => {
    const { title, description, isPublic, isOneTime } = values;
    dispatch(
      createQuestionnaire({
        title,
        description,
        isPublic,
        isOneTime,
        questions: [],
      })
    );
    form.reset();
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getQuestionnaires({ keyword: "", pageNumber: 1 }));
    dispatch(getQuestionnaireStats());
  }, [dispatch]);

  const rows = questionnaires.map((element) => (
    <tr key={element._id}>
      <td>
        <Text size="xs">{element.title}</Text>
      </td>
      {smallScreen && (
        <td>
          <Text size="xs">{element.description}</Text>
        </td>
      )}

      <td>
        <Badge
          size={!extraSmallScreen ? "xs" : "sm"}
          radius="xs"
          variant="outline"
          color={element.isPublic ? "green" : "blue"}
        >
          {element.isPublic
            ? `${smallScreen ? "Allowed" : "All"}`
            : `${smallScreen ? "Specific Users" : "Some"}`}
        </Badge>
      </td>
      <td>
        <Badge
          size={!extraSmallScreen ? "xs" : "sm"}
          radius="xs"
          variant="outline"
          color={element.isPublished ? "green" : "red"}
        >
          {element.isPublished
            ? `${smallScreen ? "Published" : "Yes"}`
            : `${smallScreen ? "Not Published" : "No"}`}
        </Badge>
      </td>
      {extraSmallScreen && (
        <td>
          <Text size="xs">{element.responses?.length}</Text>
        </td>
      )}

      {smallScreen && (
        <td>
          <Text size="xs">
            {moment(element.createdAt).format("DD-MM-YY HH:MM a")}
          </Text>
        </td>
      )}
      {smallScreen && (
        <td>
          <Text size="xs">
            {moment(element.updatedAt).format("DD-MM-YY HH:MM a")}
          </Text>
        </td>
      )}

      <td>
        <CopyButton
          value={`http://localhost:3000/questionnaire/answer/${element._id}`}
        >
          {({ copied, copy }) => (
            <>
              {smallScreen ? (
                <Button
                  color="blue"
                  size="xs"
                  radius="xs"
                  variant={copied ? "filled" : "outline"}
                  onClick={copy}
                  leftIcon={<BiLinkAlt />}
                  disabled={!element.isPublished}
                >
                  {copied ? "Copied" : "Get Link"}
                </Button>
              ) : (
                <ActionIcon
                  color={extraSmallScreen ? "blue" : "red"}
                  size={!extraSmallScreen ? "xs" : "sm"}
                  disabled={!element.isPublished}
                  variant="outline"
                  radius="xs"
                >
                  <BiLinkAlt />
                </ActionIcon>
              )}
            </>
          )}
        </CopyButton>
      </td>
      <td>
        <ActionIcon
          color="blue"
          variant="outline"
          radius="xs"
          size={!extraSmallScreen ? "xs" : "md"}
          onClick={() =>
            element.isPublished
              ? navigate(`/responses/${element._id}`)
              : navigate(`/questionnaire/${element._id}`)
          }
        >
          {element.isPublished ? <BsEye /> : <BsPencilSquare />}
        </ActionIcon>
      </td>
      <td>
        {smallScreen ? (
          <Button
            leftIcon={<BsXLg />}
            variant="outline"
            color="red"
            size="xs"
            radius="xs"
            onClick={() => {
              setSelectedId(element._id);
              setUnPublishOpen(true);
            }}
          >
            Unpublish
          </Button>
        ) : (
          <ActionIcon
            color="red"
            variant="outline"
            radius="xs"
            size={!extraSmallScreen ? "xs" : "sm"}
            onClick={() => {
              setSelectedId(element._id);
              setUnPublishOpen(true);
            }}
          >
            <BiX />
          </ActionIcon>
        )}
      </td>
    </tr>
  ));

  return (
    <>
      <Modal
        opened={unPublishOpen}
        onClose={() => setUnPublishOpen(false)}
        title="Unpublish"
        radius="xs"
        closeOnClickOutside={false}
        size={!extraSmallScreen ? "xs" : "md"}
        centered
      >
        <Text size="xs">
          Confirming unpublish will make this questionnaire closed and stop
          collecting responses. Do you want to continue?
        </Text>
        <Button
          mt={10}
          size="xs"
          variant="outline"
          color="red"
          radius="xs"
          fullWidth
          leftIcon={<BsLock />}
          onClick={() => {
            dispatch(unPublishQuestionnaire(selectedId));
            setSelectedId("");
            setUnPublishOpen(false);
          }}
        >
          Unpublish Questionnaire
        </Button>
      </Modal>
      <Modal
        size={!extraSmallScreen ? "xs" : "lg"}
        radius="xs"
        opened={open}
        onClose={() => setOpen(false)}
        title="Create Questionnaire"
        centered
        closeOnClickOutside={false}
      >
        <form
          onSubmit={form.onSubmit((values: any) =>
            onQuestionnaireCreate(values)
          )}
        >
          <TextInput
            radius="xs"
            placeholder="Questionnaire title"
            label="Title"
            withAsterisk
            {...form.getInputProps("title")}
          />
          <Textarea
            mt={10}
            radius="xs"
            placeholder="Questionnaire description"
            label="Description"
            withAsterisk
            {...form.getInputProps("description")}
          />
          <Switch
            my={20}
            color="green"
            label="Anonymous"
            description="This allows your questionnaire to be answered without participant's details (Name and Email)"
            {...form.getInputProps("isPublic")}
          />
          <Grid mt={10}>
            <Grid.Col span={12}>
              <Button
                variant="outline"
                type="submit"
                color="green"
                radius="xs"
                leftIcon={<BsFillPlusCircleFill />}
                disabled={
                  form.values.title === "" || form.values.description === ""
                }
                fullWidth
              >
                Create questionnaire
              </Button>
            </Grid.Col>
          </Grid>
        </form>
      </Modal>
      <NavBar setCreateOpen={setOpen} />
      <Container fluid>
        <Grid mt={30}>
          <Grid.Col span={4}>
            <Card radius="xs" withBorder>
              <Flex direction="row" align="center" justify="space-between">
                <Title color="red" order={smallScreen ? 3 : 5}>
                  {!extraSmallScreen ? "All" : "Questionnaires"}
                </Title>
                {getAllLoading ? (
                  <Loader color="red" size="xs" />
                ) : (
                  <Title color="red" order={smallScreen ? 3 : 5}>
                    {all}
                  </Title>
                )}
              </Flex>
            </Card>
          </Grid.Col>
          <Grid.Col span={4}>
            <Card radius="xs" withBorder>
              <Flex direction="row" align="center" justify="space-between">
                <Title color="green" order={smallScreen ? 3 : 5}>
                  Published
                </Title>
                {getStatsLoading ? (
                  <Loader color="green" size="xs" />
                ) : (
                  <Title color="green" order={smallScreen ? 3 : 5}>
                    {published}
                  </Title>
                )}
              </Flex>
            </Card>
          </Grid.Col>
          <Grid.Col span={4}>
            <Card radius="xs" withBorder>
              <Flex direction="row" align="center" justify="space-between">
                <Title color="blue" order={smallScreen ? 3 : 5}>
                  Unpublished
                </Title>
                {getAllLoading ? (
                  <Loader color="blue" size="xs" />
                ) : (
                  <Title color="blue" order={smallScreen ? 3 : 5}>
                    {unPublished}
                  </Title>
                )}
              </Flex>
            </Card>
          </Grid.Col>
        </Grid>
        <Box>
          <Flex
            direction="row"
            align="center"
            justify="space-between"
            mt={30}
            mb={10}
          >
            <Title order={4}>Questionnaires</Title>
            <TextInput
              icon={
                getAllLoading ? (
                  <PiSpinnerBold className="spinner" />
                ) : (
                  <BsSearch />
                )
              }
              radius="xs"
              placeholder="Search questionnaires"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                dispatch(
                  getQuestionnaires({
                    keyword: e.target.value,
                    pageNumber: page,
                  })
                );
              }}
            />
          </Flex>
          {rows?.length ? (
            <>
              <Table withBorder highlightOnHover striped>
                <thead>
                  <tr>
                    <th>Name</th>
                    {smallScreen && <th>Description</th>}
                    <th>Anonymous</th>
                    <th>Published</th>
                    {extraSmallScreen && <th>Responses</th>}
                    {smallScreen && <th>Created</th>}
                    {smallScreen && <th>Updated</th>}
                    <th></th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>{rows}</tbody>
              </Table>

              <Flex direction="row" justify="flex-end">
                <Pagination
                  size="sm"
                  value={page}
                  mt={18}
                  radius="xs"
                  total={pages}
                  color="red"
                  onChange={(e) =>
                    dispatch(getQuestionnaires({ keyword: "", pageNumber: e }))
                  }
                />
              </Flex>
            </>
          ) : (
            <Empty title="No Questionnaires" />
          )}
        </Box>
      </Container>
    </>
  );
};

export default Home;
