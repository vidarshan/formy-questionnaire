import React, { useEffect, useState } from "react";
import Shell from "../components/Shell";
import {
  ActionIcon,
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
  publishQuestionnaire,
  switchView,
} from "../store/slices/questionnaireSlice";
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../store/store";
import { Question } from "../interfaces/Question";
import { setAddQuestionOpen } from "../store/slices/interfaceSlice";
import {
  BsEye,
  BsFileCheck,
  BsFileEarmarkCheck,
  BsFillCheckCircleFill,
  BsFillXCircleFill,
  BsPlusCircle,
  BsPlusLg,
} from "react-icons/bs";
import Spinner from "../components/Spinner";

const Questionnaire = () => {
  const { id = "" } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { questionnaire, participantMode, editableQuestionnaire, getLoading } =
    useAppSelector((state) => state.questionnaire);
  const { userId } = useAppSelector((state) => state.user);
  console.log(
    "🚀 ~ file: Questionnaire.tsx:50 ~ Questionnaire ~ userId:",
    userId
  );
  console.log(
    "🚀 ~ file: Questionnaire.tsx:48 ~ Questionnaire ~ questionnaire:",
    questionnaire?.user
  );
  console.log(
    "🚀 ~ file: Questionnaire.tsx:48 ~ Questionnaire ~ questionnaire:",
    questionnaire?.isPublished
  );

  const onAnswerQuestion = (index: number, value: any) => {
    const answerObj = {
      index,
      value,
    };
    dispatch(answerQuestion(answerObj));
  };

  const renderSelectedInput = (question: any, index: number, user: string) => {
    switch (question?.type) {
      case "text":
        return (
          <>
            <Textarea
              disabled={user === userId}
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
            <NumberInput
              disabled={user === userId}
              type="number"
              radius="xs"
              mt={10}
              min={0}
              label={question?.title}
              onChange={(e) => onAnswerQuestion(index, e)}
            />
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

  const onPublishQuestionnaire = () => {
    dispatch(publishQuestionnaire(id));
  };

  useEffect(() => {
    dispatch(getQuestionnaire(id));
  }, [dispatch, id]);

  return (
    <Shell>
      {getLoading ? (
        <Spinner
          title="Loading questionnaire data..."
          color="indigo"
          size="md"
        />
      ) : (
        <Container mt={20} size="xl">
          <Inputs />
          <Flex direction="row" justify="space-between" align="center">
            <Flex direction="column">
              <Title order={2} color="orange">
                {questionnaire.title}
              </Title>
              <Title order={4} color="gray">
                {questionnaire.description}
              </Title>
            </Flex>
            <Flex>
              {userId === questionnaire?.user && (
                <>
                  {!questionnaire?.isPublished && (
                    <Button
                      mr={10}
                      w="fit-content"
                      size="xs"
                      radius="xs"
                      fullWidth
                      onClick={() => dispatch(setAddQuestionOpen(true))}
                      leftIcon={<BsPlusLg />}
                    >
                      Add new Question
                    </Button>
                  )}
                  <Button
                    mr={10}
                    variant="filled"
                    color={participantMode ? "pink" : "lime"}
                    radius="xs"
                    size="xs"
                    leftIcon={<BsEye />}
                  >
                    {participantMode ? "Guest View" : "Creator View"}
                  </Button>
                  <Button
                    variant="filled"
                    color="lime"
                    radius="xs"
                    size="xs"
                    leftIcon={<BsFileCheck />}
                  >
                    Check Answers
                  </Button>
                </>
              )}
            </Flex>
          </Flex>
          {}
          <Card mt={30} radius="xs" withBorder>
            {editableQuestionnaire !== null &&
              (editableQuestionnaire.questions || []).map(
                (q: Question, index: number) => {
                  return (
                    <>
                      {renderSelectedInput(
                        q,
                        index,
                        editableQuestionnaire.user
                      )}
                    </>
                  );
                }
              )}
          </Card>
          <Flex direction="row" justify="flex-end">
            <Button
              w="fit-content"
              mt={20}
              size="xs"
              radius="xs"
              fullWidth
              color={questionnaire.isPublished ? "red" : "violet"}
              onClick={() => onPublishQuestionnaire()}
            >
              {questionnaire.isPublished
                ? "Close Questionnaire"
                : "Publish Questionnaire"}
            </Button>
          </Flex>
        </Container>
      )}
    </Shell>
  );
};

export default Questionnaire;
