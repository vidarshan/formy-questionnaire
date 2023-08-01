import {
  Card,
  Container,
  Title,
  Text,
  Divider,
  Box,
  Button,
  Flex,
  Header,
  Textarea,
  NumberInput,
  Radio,
  Checkbox,
  Switch,
  Rating,
  TextInput,
  Alert,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  answerQuestion,
  getQuestionnaire,
  submitAnswer,
} from "../store/slices/questionnaireSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { useAppSelector } from "../store/store";
import Spinner from "../components/Spinner";
import {
  BsFillCheckCircleFill,
  BsFillEnvelopeAtFill,
  BsFillFileEarmarkTextFill,
  BsFillFilePersonFill,
} from "react-icons/bs";
import { useForm } from "@mantine/form";

const Paper = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id = "" } = useParams();
  const [detailsConfirmed, setDetailsConfirmed] = useState(false);
  const { questionnaire, getLoading, editableQuestionnaire } = useAppSelector(
    (state) => state.questionnaire
  );
  const { userId } = useAppSelector((state) => state.user);
  interface DetailsProps {
    email: string;
    name: string;
  }

  const form = useForm({
    initialValues: {
      email: "johndoe@gmail.com",
      name: "John",
    },
    validate: {
      email: (value: string) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid email",
    },
  });

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

  const onDetailsConfirm = (values: DetailsProps) => {
    console.log(
      "🚀 ~ file: Paper.tsx:148 ~ onDetailsConfirm ~ values:",
      values
    );
    setDetailsConfirmed(true);
  };

  const onSubmitAnswer = () => {
    console.log(editableQuestionnaire);
    let answerObj = {
      id: editableQuestionnaire._id,
      name: form.values.name,
      email: form.values.email,
      title: editableQuestionnaire.title,
      description: editableQuestionnaire.description,
      questions: editableQuestionnaire.questions,
    };

    dispatch(submitAnswer(answerObj));
  };

  useEffect(() => {
    dispatch(getQuestionnaire(id));
  }, [dispatch, id]);

  return (
    <Container fluid>
      <Flex>
        <Card w="100%" mt={10} radius="xs" withBorder>
          {getLoading ? (
            <Spinner title="Loading Questionnaire" color="red" size="lg" />
          ) : (
            <>
              {" "}
              <Title order={3}>{questionnaire.title}</Title>
              <Text>{questionnaire.description}</Text>
              <Alert
                title={
                  detailsConfirmed ? "Details Confirmed" : "Participant Details"
                }
                my={10}
                radius="xs"
                color={detailsConfirmed ? "green" : "orange"}
                variant="light"
                icon={
                  detailsConfirmed ? (
                    <BsFillCheckCircleFill />
                  ) : (
                    <BsFillFileEarmarkTextFill />
                  )
                }
              >
                <>
                  {detailsConfirmed
                    ? "Personal details confirmed and will be submitted with the response"
                    : "Please fill in your personal details to proceed filling the questionnaire."}
                </>
              </Alert>
              <form
                onSubmit={form.onSubmit((values) =>
                  onDetailsConfirm({ email: values.email, name: values.name })
                )}
              >
                <TextInput
                  placeholder="Your email"
                  type="email"
                  icon={<BsFillEnvelopeAtFill />}
                  radius="xs"
                  {...form.getInputProps("email")}
                  required
                  withAsterisk
                  disabled={detailsConfirmed}
                />
                <TextInput
                  mt={10}
                  type="text"
                  placeholder="Your name"
                  icon={<BsFillFilePersonFill />}
                  radius="xs"
                  {...form.getInputProps("name")}
                  required
                  withAsterisk
                  disabled={detailsConfirmed}
                />
                <Flex mt={10} justify="flex-end">
                  <Button
                    disabled={detailsConfirmed}
                    color="red"
                    size="xs"
                    radius="xs"
                    type="submit"
                  >
                    Confirm & Start
                  </Button>
                </Flex>
              </form>
              {!detailsConfirmed && (
                <Box>
                  {(questionnaire.questions || []).map(
                    (q: any, index: number) => {
                      return (
                        <>
                          {renderSelectedInput(
                            q,
                            index,
                            userId === null ? "" : userId
                          )}
                        </>
                      );
                    }
                  )}
                  <Flex direction="row" justify="flex-end">
                    <Button mr={10} size="xs" radius="xs">
                      Check Answers
                    </Button>
                    <Button
                      size="xs"
                      radius="xs"
                      onClick={() => onSubmitAnswer()}
                    >
                      Submit Questionnaire
                    </Button>
                  </Flex>
                </Box>
              )}
            </>
          )}
        </Card>
      </Flex>
    </Container>
  );
};

export default Paper;
