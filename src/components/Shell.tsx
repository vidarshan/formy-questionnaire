import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Header,
  Modal,
  Switch,
  TextInput,
  Textarea,
} from "@mantine/core";
import React, { FC, useState } from "react";
import { BsFileTextFill } from "react-icons/bs";
import { IShell } from "../interfaces/Shell";
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";
import { useForm } from "@mantine/form";
import { createQuestionnaire } from "../store/slices/questionnaireSlice";
import { logOutUser } from "../store/slices/authSlices";
import { useNavigate } from "react-router-dom";

const Shell: FC<IShell> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [questionOpen, setQuestionOpen] = useState(false);

  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      isPublic: false,
      isPublished: true,
      isOneTime: false,
    },

    validate: {
      title: (value) => (value.length < 2 ? "Title must be longer" : null),
      description: (value) =>
        value.length < 2 ? "Description must be longer" : null,
    },
  });

  const onQuestionnaireCreate = (values: any) => {
    const { title, description, isPublic, isOneTime } = values;
    dispatch(
      createQuestionnaire({
        title,
        description,
        isPublic,
        isOneTime,
        questions: [],
      })
    );
  };

  return (
    <Box>
      <Modal
        size="lg"
        radius="xs"
        opened={open}
        onClose={() => setOpen(false)}
        title="Create Questionnaire"
      >
        <form
          onSubmit={form.onSubmit((values: any) =>
            onQuestionnaireCreate(values)
          )}
        >
          <TextInput
            radius="xs"
            placeholder="Questionnaire title"
            label="Title"
            withAsterisk
            {...form.getInputProps("title")}
          />
          <Textarea
            mt={10}
            radius="xs"
            placeholder="Questionnaire description"
            label="Description"
            withAsterisk
            {...form.getInputProps("description")}
          />
          <Switch
            mt={10}
            color="deep.0"
            label="Open questionnaire"
            description="This allows your questionnaire to be answered with an account"
            {...form.getInputProps("isPublic")}
          />
          <Switch
            mt={10}
            color="deep.0"
            label="Publish on create"
            description="Create questionaire and open it for responses"
            {...form.getInputProps("isPublished", { type: "checkbox" })}
          />
          <Switch
            mt={10}
            color="deep.0"
            label="One time answer"
            description="One response per one user"
            {...form.getInputProps("isOneTime")}
          />
          <Grid mt={10}>
            <Grid.Col span={6}>
              <Button variant="outline" color="deep.0" radius="xs" fullWidth>
                Cancel
              </Button>
            </Grid.Col>
            <Grid.Col span={6}>
              <Button type="submit" color="deep.0" radius="xs" fullWidth>
                Create questionnaire
              </Button>
            </Grid.Col>
          </Grid>
        </form>
      </Modal>
      <Modal
        opened={questionOpen}
        onClose={() => setQuestionOpen(false)}
        withCloseButton={false}
      >
        Modal without header, press escape or click on overlay to close
      </Modal>
      <Header height={60}>
        <Flex pr={10} h="100%" align="center" justify="flex-end">
          <Button
            leftIcon={<BsFileTextFill />}
            mr={10}
            color="green"
            radius="xs"
            onClick={() => setOpen(true)}
          >
            Create questionnaire
          </Button>
          <Button
            color="red"
            radius="xs"
            onClick={() => {
              dispatch(logOutUser());
              navigate("/");
            }}
          >
            Logout
          </Button>
        </Flex>
      </Header>
      {children}
    </Box>
  );
};

export default Shell;
