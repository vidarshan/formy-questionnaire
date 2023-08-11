import {
  Anchor,
  Box,
  Button,
  Flex,
  Title,
  TextInput,
  Alert,
  PasswordInput,
  Grid,
  Container,
  Card,
  Divider,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsReverseListColumnsReverse } from "react-icons/bs";
import { useForm } from "@mantine/form";
import {
  getUserInfo,
  logInUser,
  resetErrors,
} from "../store/slices/authSlices";
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../store/store";
import { accent } from "../config/colors";
import { BiLock } from "react-icons/bi";

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const { loginLoading, error } = useAppSelector((state) => state.user);

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
    dispatch(getUserInfo());
  };
  return (
    <Flex px={10} h="100vh" align="center" justify="center">
      <Card w={400} radius="xs" withBorder>
        <Flex justify="center">
          <BiLock size={30} />
        </Flex>
        <Title color="grape" order={4} weight={500} align="center">
          Welcome Back
        </Title>
        <Title order={5} weight={500} align="center">
          Login to your account
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
            required
          />
          <PasswordInput
            mt={20}
            radius="xs"
            placeholder="Enter your password"
            label="Password"
            visible={visible}
            onVisibilityChange={() => setVisible(!visible)}
            {...form.getInputProps("password")}
            required
          />
          <Button
            color="grape"
            type="submit"
            mt={30}
            radius="xs"
            fullWidth
            loading={loginLoading}
          >
            Log In
          </Button>
        </form>

        <Divider my={20} color="gray" labelPosition="center" label="or" />
        <Button
          color="gray"
          variant="outline"
          onClick={() => {
            dispatch(resetErrors());
            navigate("/register");
          }}
          radius="xs"
          fullWidth
        >
          New User?
        </Button>
      </Card>
    </Flex>
  );
};

export default Login;
