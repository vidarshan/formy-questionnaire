import React from "react";
import {
  Anchor,
  Box,
  Button,
  Card,
  Flex,
  Paper,
  Title,
  TextInput,
  PasswordInput,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { BsReverseListColumnsReverse } from "react-icons/bs";

const SignUp = () => {
  return (
    <Flex h={"100vh"} align="center" justify="center">
      <Box sx={{ minWidth: "500px" }}>
        <Flex mb={10} justify="center">
          <BsReverseListColumnsReverse size={30} />
        </Flex>
        <Title order={2} weight={500} align="center">
          Sign Up
        </Title>
        <TextInput
          mt={20}
          radius="xs"
          placeholder="Enter your name"
          label="Name"
        />
        <TextInput
          mt={20}
          radius="xs"
          placeholder="Enter your email"
          label="Email"
        />
        <PasswordInput
          mt={20}
          radius="xs"
          placeholder="Enter your password"
          visible={false}
          label="Password"
        />
        <Button color="deep.0" mt={30} radius="xs" fullWidth>
          Sign Up
        </Button>
        <Flex justify="center" mt={20}>
          <Link to="/">
            <Anchor size="sm" color="deep.0" href="/signup">
              Current User?
            </Anchor>
          </Link>
        </Flex>
      </Box>
    </Flex>
  );
};

export default SignUp;
