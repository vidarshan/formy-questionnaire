import {
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Image,
  Paper,
  Title,
} from "@mantine/core";
import React from "react";
import { secondary } from "../config/colors";
import {
  BsCheckCircleFill,
  BsFillShieldSlashFill,
  BsGithub,
  BsGlobeAsiaAustralia,
} from "react-icons/bs";
import { FaPersonRunning } from "react-icons/fa6";
import NavBar from "../components/NavBar";
import { BiPointer } from "react-icons/bi";
import { useAppSelector } from "../store/store";

const Landing = () => {
  const { token } = useAppSelector((state) => state.user);

  return (
    <>
      <NavBar login />
      <Container pb={50} size="xl">
        <Flex direction="column" align="center">
          <Title mt={30} order={1} color="grape">
            Formy
          </Title>
          <Title mb={20} order={4} color="gray">
            Make and answer questionnaires
          </Title>
        </Flex>
        <Image
          height={300}
          fit="cover"
          src={require("../images/banner.jpeg")}
        />
        <Flex mt={30} direction="column" align="center">
          <Title mt={30} order={2} color="grape">
            Features
          </Title>
          <Title mb={20} order={4} color="gray">
            What you get by using formy?
          </Title>
        </Flex>

        <Grid>
          <Grid.Col xs={12} sm={6} md={3} xl={3} span={3}>
            <Card h="100%" radius="xs" withBorder>
              <Flex h="100%" direction="column" justify="center" align="center">
                <FaPersonRunning size={40} color={secondary} />
                <Title mt={10} order={3}>
                  Easy Onboarding
                </Title>
              </Flex>
            </Card>
          </Grid.Col>
          <Grid.Col xs={12} sm={6} md={3} xl={3} span={3}>
            <Card h="100%" radius="xs" withBorder>
              <Flex h="100%" direction="column" justify="center" align="center">
                <BsGlobeAsiaAustralia size={40} color={secondary} />
                <Title mt={10} align="center" order={3}>
                  Wide range of questions
                </Title>
              </Flex>
            </Card>
          </Grid.Col>
          <Grid.Col xs={12} sm={6} md={3} xl={3} span={3}>
            <Card h="100%" radius="xs" withBorder>
              <Flex h="100%" direction="column" justify="center" align="center">
                <BsFillShieldSlashFill size={40} color={secondary} />
                <Title mt={10} align="center" order={3}>
                  Answer questions without sign up
                </Title>
              </Flex>
            </Card>
          </Grid.Col>
          <Grid.Col xs={12} sm={6} md={3} xl={3} span={3}>
            <Card h="100%" radius="xs" withBorder>
              <Flex h="100%" direction="column" justify="center" align="center">
                <BsCheckCircleFill size={40} color={secondary} />
                <Title mt={10} order={3}>
                  Clean and simple process
                </Title>
              </Flex>
            </Card>
          </Grid.Col>
        </Grid>
        <Flex mt={30} direction="column" align="center">
          <Title mt={30} order={2} color="grape">
            Access Anywhere
          </Title>
          <Title mb={20} order={4} color="gray">
            Access through web and mobile
          </Title>
        </Flex>
        <Image
          height={600}
          fit="contain"
          src={require("../images/landing-1.png")}
        />
        <Flex mt={30} direction="column" align="center">
          <Title mt={30} order={2} color="grape">
            {token !== null ? "You have already joined" : "Join Now"}
          </Title>
          <Title mb={20} order={4} color="gray">
            {token !== null
              ? "Start creating questionnaires"
              : "Create an account and get started"}
          </Title>
          {token !== null ? (
            <Button
              color="grape"
              radius="xs"
              size="xl"
              leftIcon={<BiPointer />}
            >
              Return to home
            </Button>
          ) : (
            <Button
              color="grape"
              radius="xs"
              size="xl"
              leftIcon={<BiPointer />}
            >
              Create an account
            </Button>
          )}
        </Flex>
      </Container>

      <Paper radius="xs">
        <Flex pb={10} justify="center" align="center" direction="column">
          <Button
            mt={10}
            w={200}
            leftIcon={<BsGithub />}
            color="green"
            radius="xs"
            size="xs"
            variant="light"
          >
            View Project on Github
          </Button>
        </Flex>
      </Paper>
    </>
  );
};

export default Landing;
