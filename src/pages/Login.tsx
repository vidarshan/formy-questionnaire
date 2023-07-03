import {
  Anchor,
  Box,
  Button,
  Card,
  Flex,
  Paper,
  Title,
  TextInput,
  Alert,
  PasswordInput,
} from "@mantine/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsReverseListColumnsReverse } from "react-icons/bs";
import { useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { logInUser } from "../store/slices/authSlices";
import { AppDispatch } from "../../store";
import { useAppSelector } from "../store/store";

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [visible, setVisible] = useState(false);
  const { loading, error } = useAppSelector((state) => state.user);

  interface IValues {
    email: string;
    password: string;
  }

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value: string) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid email",
    },
  });

  const onLogin = (values: IValues) => {
    const { email, password } = values;
    dispatch(logInUser({ email, password }));
  };

  return (
    <Flex h="100vh" align="center" justify="center">
      <Box sx={{ minWidth: "500px" }}>
        <Flex mb={10} justify="center">
          <BsReverseListColumnsReverse size={30} color="#FD7E14" />
        </Flex>
        <Title order={2} weight={500} align="center">
          Login
        </Title>
        {error && (
          <Alert variant="filled" radius="xs" mt={10} color="red">
            {error}
          </Alert>
        )}

        <form onSubmit={form.onSubmit((values) => onLogin(values))}>
          <TextInput
            mt={20}
            radius="xs"
            placeholder="Enter your email"
            label="Email"
            {...form.getInputProps("email")}
          />
          <PasswordInput
            mt={20}
            radius="xs"
            placeholder="Enter your password"
            label="Password"
            visible={visible}
            onVisibilityChange={() => setVisible(!visible)}
            {...form.getInputProps("password")}
          />
          <Button
            type="submit"
            color="deep.0"
            mt={30}
            radius="xs"
            fullWidth
            loading={loading}
          >
            Log In
          </Button>
        </form>
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
