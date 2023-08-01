import {
  ActionIcon,
  AppShell,
  Badge,
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Header,
  Modal,
  Navbar,
  Pagination,
  Switch,
  Table,
  Text,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import {
  BiAlignLeft,
  BiCog,
  BiHomeAlt,
  BiLinkAlt,
  BiPaperclip,
  BiUserCircle,
} from "react-icons/bi";
import Dashboard from "./Dashboard";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/store";
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";
import {
  createQuestionnaire,
  getQuestionnaires,
} from "../store/slices/questionnaireSlice";
import { useForm } from "@mantine/form";
import moment from "moment";
import {
  BsEye,
  BsFillCheckCircleFill,
  BsFillEyeFill,
  BsLink45Deg,
  BsPencilSquare,
  BsSearch,
  BsXCircleFill,
  BsXLg,
  BsXSquareFill,
} from "react-icons/bs";
import { PiSpinnerBold } from "react-icons/pi";
import Empty from "../components/Empty";

const Home = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { questionnaires, page, pages, getAllLoading } = useAppSelector(
    (state) => state.questionnaire
  );
  console.log(
    "🚀 ~ file: Home.tsx:31 ~ Home ~ questionnaires:",
    questionnaires
  );

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
  }, [dispatch]);

  const rows = questionnaires.map((element) => (
    <tr key={element._id}>
      <td>{element.title}</td>
      <td>{element.description}</td>
      <td>
        <Badge
          size="sm"
          radius="xs"
          variant="outline"
          color={element.isPublic ? "green" : "dark"}
        >
          {element.isPublic ? "Open" : "Specific Users"}
        </Badge>
      </td>
      <td>
        <Badge
          size="sm"
          radius="xs"
          variant="outline"
          color={element.isPublished ? "green" : "dark"}
        >
          {element.isPublished ? "Pubished" : "Not Published"}
        </Badge>
      </td>
      <td>
        <Badge
          size="sm"
          radius="xs"
          variant="outline"
          color={element.isOneTime ? "green" : "dark"}
        >
          {element.isOneTime ? "Single" : "Multiple"}
        </Badge>
      </td>
      <td>{element.responses?.length}</td>
      <td>{moment(element.createdAt).format("DD-MM-YY HH:MM a")}</td>
      <td>{moment(element.updatedAt).format("DD-MM-YY HH:MM a")}</td>
      <td>
        <Button
          color="blue"
          size="xs"
          radius="xs"
          variant="outline"
          onClick={() => navigate(`/questionnaire/answer/${element._id}`)}
          leftIcon={<BiLinkAlt />}
          disabled={!element.isPublished}
        >
          Get Link
        </Button>
      </td>
      <td>
        <ActionIcon
          color="green"
          variant="outline"
          radius="xs"
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
        <ActionIcon color="red" variant="outline" radius="xs">
          <BsXLg />
        </ActionIcon>
      </td>
    </tr>
  ));

  return (
    <>
      <Modal
        size="lg"
        radius="xs"
        opened={open}
        onClose={() => setOpen(false)}
        title="Create Questionnaire"
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
            mt={10}
            color="deep.0"
            label="Open questionnaire"
            description="This allows your questionnaire to be answered with an account"
            {...form.getInputProps("isPublic")}
          />
          <Switch
            mt={10}
            color="deep.0"
            label="One time answer"
            description="One response per one user"
            {...form.getInputProps("isOneTime")}
          />
          <Grid mt={10}>
            <Grid.Col span={6}>
              <Button variant="outline" color="deep.0" radius="xs" fullWidth>
                Cancel
              </Button>
            </Grid.Col>
            <Grid.Col span={6}>
              <Button type="submit" color="deep.0" radius="xs" fullWidth>
                Create questionnaire
              </Button>
            </Grid.Col>
          </Grid>
        </form>
      </Modal>
      <Header height={60}>
        <Flex
          h="100%"
          mx={10}
          direction="row"
          justify="space-between"
          align="center"
        >
          <Flex>
            <Text color="orange" weight={700}>
              Quizzy
            </Text>
            <Box ml={10}>
              <Link to="/">
                <Text color="dark" weight={700}>
                  Dashboard
                </Text>
              </Link>
            </Box>
            <Box ml={10}>
              <Link to="/">
                {" "}
                <Text color="dark" weight={700}>
                  Questionnaires
                </Text>
              </Link>
            </Box>
          </Flex>
          <Box>
            <Button
              color="orange"
              size="xs"
              radius="xs"
              onClick={() => setOpen(true)}
            >
              Create Questionnaire
            </Button>
            <Button color="red" ml={10} size="xs" radius="xs">
              Log Out
            </Button>
          </Box>
        </Flex>
      </Header>
      <Container size="xl">
        <Grid mt={30}>
          <Grid.Col span={4}>
            <Card radius="xs" withBorder>
              <Flex direction="row" align="center" justify="space-between">
                <Title color="orange" order={3}>
                  Questionnaires
                </Title>
                <Title color="orange" order={3}>
                  34
                </Title>
              </Flex>
            </Card>
          </Grid.Col>
          <Grid.Col span={4}>
            <Card radius="xs" withBorder>
              <Flex direction="row" align="center" justify="space-between">
                <Title color="green" order={3}>
                  Open
                </Title>
                <Title color="green" order={3}>
                  34
                </Title>
              </Flex>
            </Card>
          </Grid.Col>
          <Grid.Col span={4}>
            <Card radius="xs" withBorder>
              <Flex direction="row" align="center" justify="space-between">
                <Title color="blue" order={3}>
                  Closed
                </Title>
                <Title color="blue" order={3}>
                  34
                </Title>
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
            <Text size={16}>Dashboard</Text>

            <TextInput
              icon={
                getAllLoading ? (
                  <PiSpinnerBold className="spinner" />
                ) : (
                  <BsSearch />
                )
              }
              radius="xs"
              placeholder="Search for questionnaire"
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
                    <th>Description</th>
                    <th>Open</th>
                    <th>Published</th>
                    <th>Single Response</th>
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
