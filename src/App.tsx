import {
  ActionIcon,
  AppShell,
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Header,
  Loader,
  Navbar,
  Paper,
  Table,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import React, { useEffect } from "react";
import {
  BsPlusLg,
  BsFileTextFill,
  BsReverseListColumnsReverse,
  BsFillFilePersonFill,
  BsFillHouseFill,
  BsFillLockFill,
  BsFillUnlockFill,
  BsBookmarkCheckFill,
  BsClockFill,
} from "react-icons/bs";
import { IoLogOut } from "react-icons/io5";
import Shell from "./components/Shell";
import { AppDispatch } from "../store";
import { useDispatch } from "react-redux";
import { getQuestionnaires } from "./store/slices/questionnaireSlice";
import { useAppSelector } from "./store/store";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "./store/slices/authSlices";

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { questionnaires, getAllLoading } = useAppSelector(
    (state) => state.questionnaire
  );

  const ths = (
    <tr>
      <th>Element Description</th>
      <th>Element name</th>
    </tr>
  );

  const rows = questionnaires.map((q) => (
    <tr key={q._id}>
      <td>{q.description}</td>
      <td>{q.title}</td>
    </tr>
  ));

  useEffect(() => {
    dispatch(getUserInfo());
    dispatch(getQuestionnaires());
  }, [dispatch]);

  return (
    <Shell>
      <Container mt={20} size="xl">
        <Title weight={500}>Dashboard</Title>
        <Grid mt={10}>
          <Grid.Col span={4}>
            <Card bg="rgb(255, 244, 230)" radius="xs">
              <Flex>
                <Title color="rgb(253, 126, 20)" order={2} weight={600}>
                  Questionnaires
                </Title>
              </Flex>
              <Flex justify="flex-end">
                <Title color="rgb(253, 126, 20)">10</Title>
              </Flex>
            </Card>
          </Grid.Col>
          <Grid.Col span={4}>
            <Card bg="rgb(235, 251, 238)" radius="xs">
              <Flex>
                <Title color="rgb(64, 192, 87)" order={2} weight={600}>
                  Open
                </Title>
              </Flex>
              <Flex justify="flex-end">
                <Title color="rgb(64, 192, 87)">6</Title>
              </Flex>
            </Card>
          </Grid.Col>
          <Grid.Col span={4}>
            <Card bg="rgb(231, 245, 255)" radius="xs">
              <Flex>
                <Title color="rgb(34, 139, 230)" order={2} weight={600}>
                  Closed
                </Title>
              </Flex>
              <Flex justify="flex-end">
                <Title color="rgb(34, 139, 230)">4</Title>
              </Flex>
            </Card>
          </Grid.Col>
        </Grid>
        <Title mt={20} weight={500}>
          Questionnaires
        </Title>
        {getAllLoading ? (
          <Container fluid>
            <Flex h={300} direction="column" align="center" justify="center">
              <Loader color="deep.0" />
              <Text>Loading data</Text>
            </Flex>
          </Container>
        ) : (
          <>
            {questionnaires.length === 0 ? (
              <Card mt={10} h={100} radius="xs" withBorder>
                <Flex h="100%" align="center" justify="center">
                  <Text>You have no questionnaires</Text>
                </Flex>
              </Card>
            ) : (
              <Grid mt={10}>
                {questionnaires.map((questionnaire) => {
                  return (
                    <Grid.Col key={questionnaire._id} span={6}>
                      <Card radius="xs" withBorder>
                        <Flex
                          direction="row"
                          justify="space-between"
                          align="center"
                        >
                          <Flex direction="column">
                            <Text color="blue" size="xl" weight={500}>
                              {questionnaire.title}
                            </Text>
                            <Text color="dark" size="md" weight={400}>
                              {questionnaire.description}
                            </Text>
                          </Flex>
                          <ActionIcon>
                            <BsFileTextFill />
                          </ActionIcon>
                        </Flex>
                        <Text color="gray" mt={4} size="sm">
                          Created{" "}
                          {moment(questionnaire.createdAt).format(
                            "YYYY-MM-DD HH:mm A"
                          )}
                        </Text>
                        <Grid mt={4}>
                          <Grid.Col span={4}>
                            <Card radius="xs" withBorder p={4}>
                              <Flex justify="center" align="center">
                                {questionnaire.isPublic ? (
                                  <BsFillUnlockFill />
                                ) : (
                                  <BsFillLockFill />
                                )}
                                <Text size="md" ml={4}>
                                  Public
                                </Text>
                              </Flex>
                            </Card>
                          </Grid.Col>
                          <Grid.Col span={4}>
                            <Card radius="xs" withBorder p={4}>
                              <Flex justify="center" align="center">
                                {questionnaire.isPublished ? (
                                  <BsBookmarkCheckFill />
                                ) : (
                                  <BsFillLockFill />
                                )}
                                <Text size="md" ml={4}>
                                  Published
                                </Text>
                              </Flex>
                            </Card>
                          </Grid.Col>
                          <Grid.Col span={4}>
                            <Card radius="xs" withBorder p={4}>
                              <Flex justify="center" align="center">
                                {questionnaire.isOneTime ? (
                                  <BsClockFill />
                                ) : (
                                  <BsClockFill />
                                )}
                                <Text size="md" ml={4}>
                                  One time
                                </Text>
                              </Flex>
                            </Card>
                          </Grid.Col>
                        </Grid>
                        <Grid>
                          <Grid.Col span={6}>
                            <Button
                              color="deep.0"
                              variant="filled"
                              mt={10}
                              fullWidth
                              radius="xs"
                              onClick={() =>
                                navigate(`/questionnaire/${questionnaire._id}`)
                              }
                            >
                              View Responses
                            </Button>
                          </Grid.Col>
                          <Grid.Col span={6}>
                            <Button
                              color="deep.0"
                              variant="outline"
                              mt={10}
                              fullWidth
                              radius="xs"
                            >
                              End questionnaire
                            </Button>
                          </Grid.Col>
                        </Grid>
                      </Card>
                    </Grid.Col>
                  );
                })}
              </Grid>
            )}
          </>
        )}
      </Container>
    </Shell>
  );
};

export default App;
