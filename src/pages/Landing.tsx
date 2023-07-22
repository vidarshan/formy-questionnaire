import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Header,
  Navbar,
  Paper,
  Text,
  Title,
} from "@mantine/core";
import React from "react";
import { accent, muted, secondary } from "../config/colors";
import {
  BsCheckCircleFill,
  BsFillArrowRightCircleFill,
  BsFillShieldSlashFill,
  BsGithub,
  BsGlobeAsiaAustralia,
} from "react-icons/bs";
import { FaPersonRunning } from "react-icons/fa6";

const Landing = () => {
  return (
    <>
      <Header bg="dark" sx={{ border: "none" }} height={60} p="xs">
        <Flex justify="space-between" align="center" h="100%">
          <Text color={accent} weight={600} size={20}>
            Quizzy
          </Text>
          <Button color={accent} size="sm" radius="xs">
            Start Building
          </Button>
        </Flex>
      </Header>
      <Paper bg="dark" radius="xs">
        <Flex
          pt={100}
          pb={100}
          direction="column"
          align="center"
          justify="center"
          h="100%"
        >
          <Title color={accent} mb={20} order={1}>
            Quizzy
          </Title>
          <Title color={muted} order={2}>
            Build your own quiz and get easy participant responses. It's all
            free.{" "}
          </Title>
          <Button
            color="red"
            mt={40}
            leftIcon={<BsFillArrowRightCircleFill />}
            radius="xs"
          >
            Sign Up and Build Questionnaires Now
          </Button>
        </Flex>
      </Paper>
      <Container pb={50} size="xl">
        <Title align="center" mt={20} mb={20}>
          Features
        </Title>
        <Grid>
          <Grid.Col span={3}>
            <Card h={200} radius="xs" withBorder>
              <Flex h="100%" direction="column" justify="center" align="center">
                <FaPersonRunning size={40} color={secondary} />
                <Title mt={10} order={3}>
                  Easy Onboarding
                </Title>
              </Flex>
            </Card>
          </Grid.Col>
          <Grid.Col span={3}>
            <Card radius="xs" withBorder h="100%">
              <Flex h="100%" direction="column" justify="center" align="center">
                <BsGlobeAsiaAustralia size={40} color={secondary} />
                <Title mt={10} align="center" order={3}>
                  Wide range of question types
                </Title>
              </Flex>
            </Card>
          </Grid.Col>
          <Grid.Col span={3}>
            <Card radius="xs" withBorder h="100%">
              <Flex h="100%" direction="column" justify="center" align="center">
                <BsFillShieldSlashFill size={40} color={secondary} />
                <Title mt={10} align="center" order={3}>
                  Answer questions without sign up
                </Title>
              </Flex>
            </Card>
          </Grid.Col>
          <Grid.Col span={3}>
            <Card radius="xs" withBorder h="100%">
              <Flex h="100%" direction="column" justify="center" align="center">
                <BsCheckCircleFill size={40} color={secondary} />
                <Title mt={10} order={3}>
                  Self markable questions
                </Title>
              </Flex>
            </Card>
          </Grid.Col>
        </Grid>
      </Container>
      <Paper h={200} bg="dark" radius="xs">
        <Title color={muted} align="center" pt={20} mt={20} mb={20}>
          Ease of Use
        </Title>
      </Paper>
      <Paper radius="xs">
        <Flex pb={10} justify="center" align="center" direction="column">
          <Text size={14} mt={10}>
            © Vidarshan's Portfolio Project.
          </Text>
          <Button
            mt={10}
            w={200}
            leftIcon={<BsGithub />}
            color="green"
            radius="xs"
            size="xs"
          >
            View Project on Github
          </Button>
        </Flex>
      </Paper>
    </>
  );
};

export default Landing;
