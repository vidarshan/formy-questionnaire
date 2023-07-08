import React, { useEffect, useState } from "react";
import Shell from "../components/Shell";
import {
  Button,
  Card,
  Container,
  Flex,
  Modal,
  ScrollArea,
  Select,
  Text,
} from "@mantine/core";
import Inputs from "../components/Inputs";
import { getQuestionnaire } from "../store/slices/questionnaireSlice";
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const Questionnaire = () => {
  const { id = "" } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const [selectedInput, setSelectedInput] = useState<string | null>("text");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(getQuestionnaire(id));
  }, [dispatch, id]);

  return (
    <Shell>
      <Container mt={20} size="xl">
        <Modal
          h={300}
          size="lg"
          opened={open}
          onClose={() => setOpen(!open)}
          title="New Question"
          radius="xs"
          scrollAreaComponent={ScrollArea.Autosize}
          closeOnClickOutside={false}
          centered
        >
          <Inputs />
        </Modal>
        <Card bg="yellow" radius="xs">
          <Flex direction="row" align="center" justify="space-between">
            <Text>You are viewing this questionnaire as the editor</Text>
            <Button radius="xs">Switch to Participant View</Button>
          </Flex>
        </Card>
        <Flex>
          <Button mt={20} radius="xs" fullWidth onClick={() => setOpen(true)}>
            Add new Question
          </Button>
        </Flex>
      </Container>
    </Shell>
  );
};

export default Questionnaire;
