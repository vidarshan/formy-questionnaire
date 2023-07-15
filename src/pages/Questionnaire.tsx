import React, { useEffect, useState } from "react";
import Shell from "../components/Shell";
import {
  Button,
  Card,
  Container,
  Flex,
  Modal,
  NumberInput,
  Radio,
  ScrollArea,
  Select,
  Text,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import Inputs from "../components/Inputs";
import {
  answerQuestion,
  editQuestionnaire,
  getQuestionnaire,
  switchView,
} from "../store/slices/questionnaireSlice";
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
  const { questionnaire, participantMode, editableQuestionnaire } =
    useAppSelector((state) => state.questionnaire);
  const [open, setOpen] = useState(false);
  const [submitObj, setSubmitObj] = useState([]);

  const [textResponse, setTextResponse] = useState("");

  const onAnswerQuestion = (index: number, value: any) => {
    const answerObj = {
      index,
      value,
    };
    dispatch(answerQuestion(answerObj));
  };

  const renderSelectedInput = (question: any, index: number) => {
    switch (question?.type) {
      case "text":
        return (
          <>
            <Textarea
              value={question.values}
              radius="xs"
              label={question?.title}
              onChange={(e) => onAnswerQuestion(index, e.target.value)}
              withAsterisk
            />
          </>
        );
      case "number":
        return (
          <>
            <NumberInput radius="xs" mt={10} label={question?.title} />
          </>
        );
      case "radio":
        return (
          <Radio.Group mt={10}>
            {/* {radiolist.map((rd: any) => {
              return (
                <Flex mt={5} mb={5}>
                  <Radio
                    color="deep.0"
                    mt={10}
                    value={rd.value}
                    label={rd.value}
                  />
                </Flex>
              );
            })} */}
          </Radio.Group>
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
        {!participantMode ? (
          <Card radius="xs" withBorder>
            <Flex direction="row" align="center" justify="space-between">
              <Text>You are viewing this questionnaire as the editor</Text>
              <Button radius="xs" onClick={() => dispatch(switchView(true))}>
                Switch to Participant View
              </Button>
            </Flex>
          </Card>
        ) : (
          <Card radius="xs" withBorder>
            <Flex direction="row" align="center" justify="space-between">
              <Text>You are viewing this questionnaire as the participant</Text>
              <Button radius="xs" onClick={() => dispatch(switchView(false))}>
                Switch to Participant View
              </Button>
            </Flex>
          </Card>
        )}
        {editableQuestionnaire !== null &&
          (editableQuestionnaire.questions || []).map(
            (q: Question, index: number) => {
              return (
                <Card mt={10} radius="xs" withBorder>
                  {renderSelectedInput(q, index)}
                </Card>
              );
            }
          )}
        <Flex>
          <Button
            mt={20}
            radius="xs"
            fullWidth
            onClick={() => dispatch(setAddQuestionOpen(true))}
          >
            Add new Question
          </Button>
          <Button mt={20} radius="xs" fullWidth>
            Answer
          </Button>
        </Flex>
      </Container>
    </Shell>
  );
};

export default Questionnaire;
