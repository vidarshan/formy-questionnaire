import {
  Badge,
  Box,
  Button,
  Card,
  Container,
  CopyButton,
  Flex,
  Grid,
  Loader,
  Modal,
  Pagination,
  Switch,
  Table,
  Text,
  TextInput,
  Textarea,
  Title,
  Tooltip,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { BiLinkAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
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
  BsFillEyeFill,
  BsFillPlusCircleFill,
  BsLock,
  BsPencilSquare,
  BsSearch,
  BsXLg,
} from "react-icons/bs";
import { PiSpinnerBold } from "react-icons/pi";
import Empty from "../components/Empty";
import NavBar from "../components/NavBar";
import { useMediaQuery } from "@mantine/hooks";
import Spinner from "../components/Spinner";

const Home = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [unPublishOpen, setUnPublishOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const smallScreen = useMediaQuery("(min-width: 990px)");
  const extraSmallScreen = useMediaQuery("(min-width: 540px)");
  const { createLoading } = useAppSelector((state) => state.questionnaire);

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

      <td>
        <Text size="xs">{element.description}</Text>
      </td>

      <td>
        <Badge
          size="sm"
          radius="xs"
          variant="filled"
          color={element.isPublic ? "green" : "blue"}
        >
          {element.isPublic ? "All" : "Required"}
        </Badge>
      </td>
      <td>
        <Badge
          size="sm"
          radius="xs"
          variant="filled"
          color={element.isPublished ? "green" : "red"}
        >
          {element.isPublished ? "Yes" : "No"}
        </Badge>
      </td>

      <td>
        <Text size="xs">{element.responses?.length}</Text>
      </td>

      <td>
        <Text size="xs">
          {moment(element.createdAt).format("DD-MM-YY HH:MM a")}
        </Text>
      </td>

      <td>
        <Text size="xs">
          {moment(element.updatedAt).format("DD-MM-YY HH:MM a")}
        </Text>
      </td>

      <td>
        <CopyButton
          value={`${process.env.REACT_APP_FE_BASE_URL}/questionnaire/answer/${element._id}`}
        >
          {({ copied, copy }) => (
            <>
              <Tooltip
                label="Share this link with participants to access"
                position="left"
                withArrow
              >
                <Button
                  color="grape"
                  size="xs"
                  radius="xs"
                  variant={copied ? "outline" : "filled"}
                  onClick={copy}
                  leftIcon={<BiLinkAlt />}
                  disabled={!element.isPublished}
                >
                  {copied ? "Copied" : "Get Link"}
                </Button>
              </Tooltip>
            </>
          )}
        </CopyButton>
      </td>
      <td>
        <Tooltip
          label={
            element.isPublished
              ? "View questionnaire responses"
              : "Edit questionnaire"
          }
          position="left"
          withArrow
        >
          <Button
            color="green"
            variant="filled"
            radius="xs"
            size="xs"
            onClick={() =>
              element.isPublished
                ? navigate(`/responses/${element._id}`)
                : navigate(`/questionnaire/${element._id}`)
            }
            leftIcon={
              element.isPublished ? <BsFillEyeFill /> : <BsPencilSquare />
            }
          >
            {element.isPublished ? "View" : "Edit"}
          </Button>
        </Tooltip>
      </td>
      <td>
        <Tooltip
          label="Unpublishing will stop collecting responses"
          position="left"
          withArrow
        >
          <Button
            leftIcon={<BsXLg />}
            variant="filled"
            color="red"
            size="xs"
            radius="xs"
            disabled={!element.isPublished}
            onClick={() => {
              setSelectedId(element._id);
              setUnPublishOpen(true);
            }}
          >
            Unpublish
          </Button>
        </Tooltip>
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
                variant="filled"
                type="submit"
                color="green"
                radius="xs"
                leftIcon={<BsFillPlusCircleFill />}
                disabled={
                  form.values.title === "" || form.values.description === ""
                }
                loading={createLoading}
                fullWidth
              >
                Create questionnaire
              </Button>
            </Grid.Col>
          </Grid>
        </form>
      </Modal>
      <NavBar setCreateOpen={setOpen} />
      <Container size="xl">
        <Grid mt={30}>
          <Grid.Col span={4}>
            <Card radius="xs" withBorder>
              <Flex direction="row" align="center" justify="space-between">
                <Title color="grape" order={smallScreen ? 3 : 5}>
                  {!extraSmallScreen ? "All" : "Questionnaires"}
                </Title>
                {getStatsLoading ? (
                  <Loader color="grape" size="xs" />
                ) : (
                  <Title color="grape" order={smallScreen ? 3 : 5}>
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
                {getStatsLoading ? (
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
          {getAllLoading ? (
            <Spinner color="grape" size="lg" title="Loading Questionnaires" />
          ) : (
            <>
              {rows?.length ? (
                <div className="response-table">
                  <Table withBorder highlightOnHover striped>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Participant Details</th>
                        <th>Published</th>
                        <th>Responses</th>
                        <th>Created</th>
                        <th>Updated</th>
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
                      color="grape"
                      onChange={(e) =>
                        dispatch(
                          getQuestionnaires({ keyword: "", pageNumber: e })
                        )
                      }
                    />
                  </Flex>
                </div>
              ) : (
                <Empty title="No Questionnaires" />
              )}
            </>
          )}
        </Box>
      </Container>
    </>
  );
};

export default Home;
