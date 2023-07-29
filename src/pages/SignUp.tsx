import React, { useEffect, useState } from "react";
import {
  Anchor,
  Box,
  Button,
  Flex,
  Title,
  TextInput,
  PasswordInput,
  Alert,
  Card,
  Divider,
} from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { BsReverseListColumnsReverse } from "react-icons/bs";
import {
  getUserInfo,
  registerUser,
  resetErrors,
} from "../store/slices/authSlices";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { useForm } from "@mantine/form";
import { useAppSelector } from "../store/store";
import { BiLock } from "react-icons/bi";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [visible, setVisible] = useState(false);
  const { loading, error, token } = useAppSelector((state) => state.user);

  interface IValues {
    name: string;
    email: string;
    password: string;
  }

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },

    validate: {
      name: (value) =>
        value.length < 2 ? "Name must be 2 characters or longer" : null,
      password: (value) =>
        value.length < 6 ? "Password must be 6 characters or longer" : null,
      email: (value: string) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid email",
    },
  });

  const onRegister = (values: IValues) => {
    const { email, password, name } = values;
    dispatch(registerUser({ name, email, password, isAdmin: false }));
  };
  return (
    <Flex px={10} h={"100vh"} align="center" justify="center">
      <Card w={400} radius="xs" withBorder>
        <Flex justify="center">
          <BiLock size={30} />
        </Flex>
        <Title color="orange" order={4} weight={500} align="center">
          Welcome
        </Title>
        <Title color="gray" order={5} weight={500} align="center">
          Create your account
        </Title>
        {error && (
          <Alert variant="filled" radius="xs" mt={10} color="red">
            {error}
          </Alert>
        )}
        <form onSubmit={form.onSubmit((values) => onRegister(values))}>
          <TextInput
            mt={20}
            radius="xs"
            placeholder="Enter your name"
            label="Name"
            {...form.getInputProps("name")}
          />
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
            loading={loading}
            type="submit"
            color="deep.0"
            mt={30}
            radius="xs"
            fullWidth
          >
            Register
          </Button>
        </form>
        <Divider my={20} color="gray" labelPosition="center" label="or" />
        <Button
          color="orange"
          variant="subtle"
          onClick={() => {
            dispatch(resetErrors());
            navigate("/login");
          }}
          radius="xs"
          fullWidth
        >
          Have an account?
        </Button>
      </Card>
    </Flex>
  );
};

export default SignUp;
