import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Checkbox,
  Container,
  Flex,
  Modal,
  NumberInput,
  Radio,
  Rating,
  Switch,
  Text,
  Textarea,
  Title,
} from "@mantine/core";
import Inputs from "../components/Inputs";
import {
  answerQuestion,
  getQuestionnaire,
  publishQuestionnaire,
} from "../store/slices/questionnaireSlice";
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../store/store";
import { Question } from "../interfaces/Question";
import { setAddQuestionOpen } from "../store/slices/interfaceSlice";
import {
  Bs123,
  BsFillCheckCircleFill,
  BsFillPlusCircleFill,
  BsJustify,
} from "react-icons/bs";
import Spinner from "../components/Spinner";
import Empty from "../components/Empty";
import { useMediaQuery } from "@mantine/hooks";
import NavBar from "../components/NavBar";

const Questionnaire = () => {
  const { id = "" } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [openPublishConfirmation, setOpenPublishConfirmation] = useState(false);
  const { questionnaire, publishLoading, getLoading } = useAppSelector(
    (state) => state.questionnaire
  );
  const extraSmallScreen = useMediaQuery("(min-width: 540px)");
  const { userId } = useAppSelector((state) => state.user);

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
              mt={20}
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
              mt={20}
              min={0}
              label={question?.title}
              onChange={(e) => onAnswerQuestion(index, e)}
              icon={<Bs123 />}
            />
          </>
        );
      case "radio":
        return (
          <Radio.Group key={question._id} label={question.title} mt={20}>
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
          <Checkbox.Group mt={20} key={question._id} label={question.title}>
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
        return (
          <>
            <Text mt={20} weight={500} size="0.875rem">
              {question.title}
            </Text>
            <Switch color="deep.0" mt={10} />
          </>
        );
      case "rating":
        return (
          <>
            <Text mt={20} weight={500} size="0.875rem">
              {question.title}
            </Text>
            <Rating mt={10} />
          </>
        );
      default:
        <Textarea
          mt={20}
          placeholder="Your comment"
          label="Your comment"
          icon={<BsJustify />}
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
      <Modal
        opened={openPublishConfirmation}
        onClose={() => {
          setOpenPublishConfirmation(false);
        }}
        title="Publish Questionnaire"
        radius="xs"
        closeOnClickOutside={false}
        size={!extraSmallScreen ? "xs" : "md"}
        centered
      >
        <Text size="xs">
          Confirming publish will make this questionnaire uneditable and ready
          to collect responses. Do you want to continue?
        </Text>
        <Button
          mt={10}
          size="xs"
          variant="outline"
          color="green"
          radius="xs"
          fullWidth
          leftIcon={<BsFillCheckCircleFill />}
          onClick={() => {
            onPublishQuestionnaire();
            setOpenPublishConfirmation(false);
            navigate("/");
          }}
        >
          Publish Questionnaire
        </Button>
      </Modal>
      <NavBar />
      {getLoading ? (
        <Spinner
          title="Loading questionnaire data..."
          color="indigo"
          size="md"
        />
      ) : (
        <Container mt={20} size="xl">
          <Inputs />
          <Card mt={30} radius="xs" withBorder>
            <Flex direction="row" justify="space-between" align="center">
              <Flex direction="column">
                <Title color="cyan" order={3}>
                  {questionnaire.title}
                </Title>
                <Text color="gray">{questionnaire.description}</Text>
              </Flex>
              <Flex>
                {userId === questionnaire?.user && (
                  <>
                    {!questionnaire?.isPublished && (
                      <Button
                        w="fit-content"
                        size="xs"
                        radius="xs"
                        color="green"
                        variant="filled"
                        fullWidth
                        onClick={() => dispatch(setAddQuestionOpen(true))}
                        leftIcon={<BsFillPlusCircleFill />}
                      >
                        New Question
                      </Button>
                    )}
                  </>
                )}
              </Flex>
            </Flex>
            {questionnaire?.questions.length === 0 ? (
              <Empty title="No Questions" />
            ) : (
              <>
                {questionnaire !== null &&
                  (questionnaire.questions || []).map(
                    (q: Question, index: number) => {
                      return (
                        <>{renderSelectedInput(q, index, questionnaire.user)}</>
                      );
                    }
                  )}
              </>
            )}
          </Card>

          <Flex direction="row" justify="flex-end">
            {!questionnaire.isPublished && (
              <Button
                w="fit-content"
                mt={20}
                size="xs"
                radius="xs"
                fullWidth
                disabled={getLoading || questionnaire?.questions.length === 0}
                color={questionnaire.isPublished ? "red" : "green"}
                leftIcon={<BsFillCheckCircleFill />}
                variant="outline"
                loading={publishLoading}
                onClick={() => setOpenPublishConfirmation(true)}
              >
                Publish Questionnaire
              </Button>
            )}
          </Flex>
        </Container>
      )}
    </>
  );
};

export default Questionnaire;
