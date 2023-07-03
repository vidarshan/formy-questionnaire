import {
  ActionIcon,
  AppShell,
  Avatar,
  Box,
  Button,
  Flex,
  Header,
  Navbar,
  Paper,
  Text,
  ThemeIcon,
} from "@mantine/core";
import React, { FC } from "react";
import {
  BsPlusLg,
  BsFileTextFill,
  BsReverseListColumnsReverse,
  BsFillFilePersonFill,
  BsFillHouseFill,
} from "react-icons/bs";
import { IoLogOut } from "react-icons/io5";
import { IShell } from "../interfaces/Shell";
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";
import { logOutUser } from "../store/slices/authSlices";
const Shell: FC<IShell> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 300 }} height="100vh" pl={10} pr={10}>
          <Flex
            sx={{ height: "calc(100% - 60px)" }}
            direction="column"
            justify="space-between"
          >
            <Paper sx={{ backgroundColor: "transparent", width: "100%" }}>
              <Button
                mt={10}
                leftIcon={<BsPlusLg />}
                radius="xs"
                color="deep.0"
                fullWidth
              >
                Create New
              </Button>
              <Flex mt={20} align="center">
                <ThemeIcon color="green" radius="xs" variant="light">
                  <BsFillHouseFill />
                </ThemeIcon>
                <Text ml={6} size={14} weight={600}>
                  Home
                </Text>
              </Flex>
              <Flex mt={20} align="center">
                <ThemeIcon color="indigo" radius="xs" variant="light">
                  <BsFileTextFill />
                </ThemeIcon>
                <Text ml={6} size={14} weight={600}>
                  Questionnaires
                </Text>
              </Flex>
              <Flex mt={20} align="center">
                <ThemeIcon color="red" radius="xs" variant="light">
                  <BsFillFilePersonFill />
                </ThemeIcon>
                <Text ml={6} size={14} weight={600}>
                  Profile
                </Text>
              </Flex>
            </Paper>
            <Flex mt={20} mb={20} align="center" justify="space-between">
              <Flex>
                <Avatar></Avatar>
                <Flex direction="column">
                  <Text ml={6} size={14} weight={300}>
                    Vidarshan R.
                  </Text>
                  <Text ml={6} size={12} weight={600}>
                    User
                  </Text>
                </Flex>
              </Flex>
              <ActionIcon
                color="red"
                radius="xs"
                variant="light"
                onClick={() => dispatch(logOutUser())}
              >
                <IoLogOut />
              </ActionIcon>
            </Flex>
          </Flex>
        </Navbar>
      }
      header={
        <Header
          sx={{ display: "flex", alignItems: "center" }}
          height={60}
          p="xs"
        >
          <BsReverseListColumnsReverse />
          <Text sx={{ marginLeft: "10px" }}>Questionnaires</Text>
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <Box>{children}</Box>
    </AppShell>
  );
};

export default Shell;
