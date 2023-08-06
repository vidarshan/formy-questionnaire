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
  Modal,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { answerQuestion } from "../store/slices/questionnaireSlice";
import {
  confirmDetails,
  resetResponseState,
  submitAnswer,
} from "../store/slices/responseSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { useAppSelector } from "../store/store";
import Spinner from "../components/Spinner";
import {
  Bs123,
  BsArrowLeft,
  BsFillCheckCircleFill,
  BsFillEnvelopeAtFill,
  BsFillFileEarmarkTextFill,
  BsFillFilePersonFill,
  BsFillFileTextFill,
  BsJustify,
} from "react-icons/bs";
import { useForm } from "@mantine/form";
import { getResponseQuestionnaire } from "../store/slices/responseSlice";

const Paper = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id = "" } = useParams();
  const { questionnaire, getLoading, editableQuestionnaire } = useAppSelector(
    (state) => state.questionnaire
  );
  const { submitAnswerLoading, submitAnswerSuccess, detailsConfirmed } =
    useAppSelector((state) => state.response);
  const { userId } = useAppSelector((state) => state.user);
  interface DetailsProps {
    email: string;
    name: string;
  }

  const form = useForm({
    initialValues: {
      email: "",
      name: "",
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
              icon={<BsJustify />}
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
              icon={<Bs123 />}
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
          icon={<BsJustify />}
          withAsterisk
        />;
    }
  };

  const onSubmitAnswer = () => {
    console.log(editableQuestionnaire);
    let answerObj = {
      questionnaireId: editableQuestionnaire._id,
      name: form.values.name,
      email: form.values.email,
      title: editableQuestionnaire.title,
      description: editableQuestionnaire.description,
      questions: editableQuestionnaire.questions,
    };

    dispatch(submitAnswer(answerObj));
  };

  useEffect(() => {
    dispatch(getResponseQuestionnaire(id));
  }, [dispatch, id]);

  return (
    <Container fluid>
      {submitAnswerSuccess === "submitted" && (
        <Container fluid>
          <Card w="100%" mt={10} radius="xs" withBorder>
            <Flex direction="row" align="center" justify="space-between">
              <Flex>
                <BsFillCheckCircleFill color="#11c037" size={20} />
                <Flex ml={10} direction="column">
                  <Text color="gray" size="sm">
                    Thank you
                  </Text>
                  <Text size="sm" weight={500}>
                    Your response has been submitted.
                  </Text>
                </Flex>
              </Flex>
              <Button
                color="dark"
                leftIcon={<BsArrowLeft />}
                size="xs"
                radius="xs"
                onClick={() => {
                  navigate("/");
                  dispatch(resetResponseState());
                }}
              >
                Go Back
              </Button>
            </Flex>
          </Card>
        </Container>
      )}

      <Flex>
        <Card w="100%" mt={10} radius="xs" withBorder>
          {getLoading ? (
            <Spinner title="Loading Questionnaire" color="red" size="lg" />
          ) : (
            <>
              {submitAnswerSuccess === "initial" && (
                <>
                  <Title order={3}>{questionnaire.title}</Title>
                  <Text>{questionnaire.description}</Text>
                  {!detailsConfirmed ? (
                    <>
                      <Alert
                        title={"Provide your name and email"}
                        my={10}
                        radius="xs"
                        color="blue"
                        variant="light"
                        icon={<BsFillFilePersonFill />}
                      >
                        <></>
                      </Alert>

                      <form
                        onSubmit={form.onSubmit((values) => {
                          dispatch(confirmDetails(true));
                        })}
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
                            color="green"
                            size="xs"
                            radius="xs"
                            type="submit"
                            variant="outline"
                          >
                            Confirm & Start
                          </Button>
                        </Flex>
                      </form>
                    </>
                  ) : (
                    <Alert
                      title={"Name and email saved"}
                      my={10}
                      radius="xs"
                      color="green"
                      variant="light"
                      icon={<BsFillCheckCircleFill />}
                    >
                      <></>
                    </Alert>
                  )}

                  {detailsConfirmed && (
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
                        {/* <Button mr={10} size="xs" radius="xs">
                          Check Answers
                        </Button> */}
                        <Button
                          size="xs"
                          radius="xs"
                          variant="outline"
                          color="green"
                          onClick={() => onSubmitAnswer()}
                          loading={submitAnswerLoading}
                        >
                          Submit Questionnaire
                        </Button>
                      </Flex>
                    </Box>
                  )}
                </>
              )}
            </>
          )}
        </Card>
      </Flex>
    </Container>
  );
};

export default Paper;
