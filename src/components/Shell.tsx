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

const Shell: FC<IShell> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(false);
  const [questionOpen, setQuestionOpen] = useState(false);

  return (
    <Box>
      <Modal
        size="lg"
        radius="xs"
        opened={open}
        onClose={() => setOpen(false)}
        title="Create Questionnaire"
      >
        <TextInput
          radius="xs"
          placeholder="Questionnaire title"
          label="Title"
          withAsterisk
        />
        <Textarea
          mt={10}
          radius="xs"
          placeholder="Questionnaire description"
          label="Description"
          withAsterisk
        />
        <Switch
          mt={10}
          color="deep.0"
          label="Open questionnaire"
          description="This allows your questionnaire to be answered with an account"
        />
        <Switch
          mt={10}
          color="deep.0"
          label="Publish on create"
          description="Create questionaire and open it for responses"
        />
        <Switch
          mt={10}
          color="deep.0"
          label="One time answer"
          description="One response per one user"
        />
        <Grid mt={10}>
          <Grid.Col span={6}>
            <Button variant="outline" color="deep.0" radius="xs" fullWidth>
              Cancel
            </Button>
          </Grid.Col>
          <Grid.Col span={6}>
            <Button
              color="deep.0"
              radius="xs"
              fullWidth
              onClick={() => setQuestionOpen(true)}
            >
              Add question
            </Button>
          </Grid.Col>
        </Grid>
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
          <Button color="red" radius="xs">
            Logout
          </Button>
        </Flex>
      </Header>
      <Container mt={10} size="xl">
        <Grid>
          <Grid.Col span={4}>
            <Card radius="xs" withBorder>
              sss
            </Card>
          </Grid.Col>
          <Grid.Col span={4}>
            <Card radius="xs" withBorder>
              sss
            </Card>
          </Grid.Col>
          <Grid.Col span={4}>
            <Card radius="xs" withBorder>
              sss
            </Card>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
};

export default Shell;
