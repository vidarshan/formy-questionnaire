import React, { useState } from "react";
import {
  Button,
  Flex,
  Title,
  TextInput,
  PasswordInput,
  Alert,
  Card,
  Divider,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { registerUser, resetErrors } from "../store/slices/authSlices";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { useForm } from "@mantine/form";
import { useAppSelector } from "../store/store";
import { BiLock } from "react-icons/bi";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [visible, setVisible] = useState(false);
  const { registerLoading, registerError } = useAppSelector(
    (state) => state.user
  );

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
        <Title color="grape" order={4} weight={500} align="center">
          Welcome
        </Title>
        <Title order={5} weight={500} align="center">
          Create your account
        </Title>
        {registerError && (
          <Alert variant="filled" radius="xs" mt={10} color="red">
            {registerError}
          </Alert>
        )}
        <form onSubmit={form.onSubmit((values) => onRegister(values))}>
          <TextInput
            mt={20}
            radius="xs"
            placeholder="Enter your name"
            label="Name"
            {...form.getInputProps("name")}
            withAsterisk
          />
          <TextInput
            mt={20}
            radius="xs"
            placeholder="Enter your email"
            label="Email"
            {...form.getInputProps("email")}
            withAsterisk
          />
          <PasswordInput
            mt={20}
            radius="xs"
            placeholder="Enter your password"
            label="Password"
            visible={visible}
            onVisibilityChange={() => setVisible(!visible)}
            {...form.getInputProps("password")}
            withAsterisk
          />
          <Button
            loading={registerLoading}
            type="submit"
            color="grape"
            mt={30}
            radius="xs"
            fullWidth
          >
            {registerLoading ? "Registering. Please wait." : "Login"}
          </Button>
        </form>
        <Divider my={20} color="gray" labelPosition="center" label="or" />
        <Button
          color="grape"
          variant="outline"
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
