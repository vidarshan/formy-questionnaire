import React, { useEffect, useState } from "react";
import Shell from "../components/Shell";
import {
  ActionIcon,
  Box,
  Button,
  Card,
  Checkbox,
  Container,
  Flex,
  Header,
  Modal,
  NumberInput,
  Radio,
  Rating,
  ScrollArea,
  Select,
  Switch,
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
import { Link, useParams } from "react-router-dom";
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
import Empty from "../components/Empty";

const Questionnaire = () => {
  const { id = "" } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { questionnaire, participantMode, editableQuestionnaire, getLoading } =
    useAppSelector((state) => state.questionnaire);
  const { userId } = useAppSelector((state) => state.user);

  const onAnswerQuestion = (index: number, value: any) => {
    const answerObj = {
      index,
      value,
    };
    dispatch(answerQuestion(answerObj));
  };

  const renderSelectedInput = (question: any, index: number, user: string) => {
    console.log(
      "🚀 ~ file: Questionnaire.tsx:61 ~ renderSelectedInput ~ question:",
      question
    );
    switch (question?.type) {
      case "text":
        return (
          <>
            <Textarea
              key={question._id}
              radius="xs"
              label={question?.title}
              onChange={(e) => onAnswerQuestion(index, e.target.value)}
            />
          </>
        );
      case "number":
        return (
          <>
            <NumberInput
              key={question._id}
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
        console.log(question);
        return (
          <Radio.Group key={question._id} label={question.title} mt={10}>
            {question.options.map((rd: any) => {
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
            })}
          </Radio.Group>
        );
      case "checkbox":
        return (
          <Checkbox.Group mt={10} key={question._id} label={question.title}>
            {question.options.map((ch: any) => {
              return (
                <Flex mt={5} mb={5}>
                  {" "}
                  <Checkbox
                    color="deep.0"
                    mt={10}
                    value={ch.value}
                    label={ch.value}
                    radius="xs"
                  />
                </Flex>
              );
            })}
          </Checkbox.Group>
        );
      case "switch":
        return <Switch color="deep.0" label={question.title} mt={10} />;
      case "rating":
        return <Rating title={question.title} mt={10} />;
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
    <>
      <Header height={60}>
        <Flex
          h="100%"
          mx={10}
          direction="row"
          justify="space-between"
          align="center"
        >
          <Flex>
            <Text color="orange" weight={700}>
              Quizzy
            </Text>
            <Box ml={10}>
              <Link to="/">
                <Text color="dark" weight={700}>
                  Dashboard
                </Text>
              </Link>
            </Box>
            <Box ml={10}>
              <Link to="/">
                {" "}
                <Text color="dark" weight={700}>
                  Questionnaires
                </Text>
              </Link>
            </Box>
          </Flex>
        </Flex>
      </Header>
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
              <Title color="green" order={3}>
                {questionnaire.title}
              </Title>
              <Text color="gray">{questionnaire.description}</Text>
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
          {questionnaire?.questions?.length === 0 ? (
            <Empty title="No questions in this questionnaire" />
          ) : (
            <Card mt={30} radius="xs" withBorder>
              {questionnaire !== null &&
                (questionnaire.questions || []).map(
                  (q: Question, index: number) => {
                    return (
                      <>{renderSelectedInput(q, index, questionnaire.user)}</>
                    );
                  }
                )}
            </Card>
          )}

          <Flex direction="row" justify="flex-end">
            <Button
              w="fit-content"
              mt={20}
              size="xs"
              radius="xs"
              fullWidth
              disabled={getLoading || questionnaire?.questions.length === 0}
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
    </>
  );
};

export default Questionnaire;
