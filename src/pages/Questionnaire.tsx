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
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import Inputs from "../components/Inputs";
import { getQuestionnaire } from "../store/slices/questionnaireSlice";
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../store/store";
import { Question } from "../interfaces/Question";
import { setAddQuestionOpen } from "../store/slices/interfaceSlice";
import { BsFillCheckCircleFill, BsFillXCircleFill } from "react-icons/bs";

const Questionnaire = () => {
  const { id = "" } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { questionnaire } = useAppSelector((state) => state.questionnaire);
  const [open, setOpen] = useState(false);

  const renderSelectedInput = (title: string, selection: string | null) => {
    switch (selection) {
      case "text":
        return (
          <>
            <Textarea radius="xs" label={title} withAsterisk />
          </>
        );
      case "number":
        return (
          <>
            <Textarea radius="xs" label={title} withAsterisk />
            <Card bg="green" p={10} mt={10} radius="xs">
              <Flex direction="row" align="center">
                <BsFillCheckCircleFill color="#fff" />
                <Text ml={10} color="white" size={14} weight={500}>
                  Correct! The answer is 0
                </Text>
              </Flex>
            </Card>
            <Card bg="red" p={10} mt={10} radius="xs">
              <Flex direction="row" align="center">
                <BsFillXCircleFill color="#fff" />
                <Text ml={10} color="white" size={14} weight={500}>
                  Wrong Answer. The correct answer is 0
                </Text>
              </Flex>
            </Card>
          </>
        );

      default:
        <Textarea
          placeholder="Your comment"
          label="Your comment"
          withAsterisk
        />;
    }
  };

  useEffect(() => {
    dispatch(getQuestionnaire(id));
  }, [dispatch, id]);
  return (
    <Shell>
      <Container mt={20} size="xl">
        <Inputs />

        <Card bg="yellow" radius="xs">
          <Flex direction="row" align="center" justify="space-between">
            <Text>You are viewing this questionnaire as the editor</Text>
            <Button radius="xs">Switch to Participant View</Button>
          </Flex>
        </Card>

        {questionnaire !== null &&
          (questionnaire.questions || []).map((q: Question) => {
            return (
              <Card mt={10} radius="xs" withBorder>
                {renderSelectedInput(q.title, q.type)}
              </Card>
            );
          })}
        <Flex>
          <Button
            mt={20}
            radius="xs"
            fullWidth
            onClick={() => dispatch(setAddQuestionOpen(true))}
          >
            Add new Question
          </Button>
        </Flex>
      </Container>
    </Shell>
  );
};

export default Questionnaire;
