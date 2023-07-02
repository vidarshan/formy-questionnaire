import {
  Anchor,
  Box,
  Button,
  Card,
  Flex,
  Paper,
  Title,
  TextInput,
} from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";
import { BsReverseListColumnsReverse } from "react-icons/bs";

const Login = () => {
  return (
    <Flex h={"100vh"} align="center" justify="center">
      <Box sx={{ minWidth: "500px" }}>
        <Flex mb={10} justify="center">
          <BsReverseListColumnsReverse size={30} />
        </Flex>
        <Title order={2} weight={500} align="center">
          Login
        </Title>
        <TextInput
          mt={20}
          radius="xs"
          placeholder="Enter your email"
          label="Email"
        />
        <TextInput
          mt={20}
          radius="xs"
          placeholder="Enter your password"
          label="Password"
        />
        <Button color="deep.0" mt={30} radius="xs" fullWidth>
          Log In
        </Button>
        <Flex justify="center" mt={20}>
          <Link to="/signup">
            <Anchor size="sm" color="deep.0">
              New User?
            </Anchor>
          </Link>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Login;
