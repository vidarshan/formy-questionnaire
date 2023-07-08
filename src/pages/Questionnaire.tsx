import React, { useEffect, useState } from "react";
import Shell from "../components/Shell";
import {
  Box,
  Button,
  Card,
  Checkbox,
  ColorInput,
  Container,
  FileInput,
  Flex,
  Group,
  Modal,
  NumberInput,
  Radio,
  Rating,
  Select,
  Slider,
  Switch,
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
          size="lg"
          opened={open}
          onClose={() => setOpen(!open)}
          title="New Question"
        >
          <Select
            value={selectedInput}
            label="Your favorite framework/library"
            placeholder="Pick one"
            dropdownPosition="bottom"
            onChange={(v) => setSelectedInput(v)}
            data={[
              { value: "rating", label: "Rating" },
              { value: "checkbox", label: "Multi Option" },
              { value: "radio", label: "Single Option" },
              { value: "text", label: "Text Input" },
              { value: "number", label: "Number Input" },
              { value: "switch", label: "Switch Input" },
              { value: "slider", label: "Slider Input" },
              { value: "file", label: "File Input" },
            ]}
          />
          <Inputs selected={selectedInput} />
        </Modal>
        <Card bg="yellow" radius="xs">
          <Flex direction="row" align="center" justify="space-between">
            <Text>You are viewing this questionnaire as the editor</Text>
            <Button radius="xs">Switch to Participant View</Button>
          </Flex>
        </Card>
        <Button radius="xs" fullWidth onClick={() => setOpen(true)}>
          Add new Question
        </Button>
      </Container>
    </Shell>
  );
};

export default Questionnaire;
