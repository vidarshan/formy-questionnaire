import {
  Alert,
  Box,
  Button,
  Checkbox,
  Container,
  Flex,
  Header,
  Modal,
  NumberInput,
  Pagination,
  Radio,
  Rating,
  Switch,
  Table,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getQuestionnaire } from "../store/slices/questionnaireSlice";
import { AppDispatch } from "../../store";
import { useAppSelector } from "../store/store";
import moment from "moment";
import Spinner from "../components/Spinner";
import { QuestionnaireResponse, Response } from "../interfaces/Questionnaire";
import {
  BsArrowDownRight,
  BsFillRecordFill,
  BsPersonCircle,
  BsPlusLg,
} from "react-icons/bs";
import { usePagination } from "@mantine/hooks";
import Empty from "../components/Empty";

const Responses = () => {
  const { id = "" } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { questionnaire, getLoading } = useAppSelector(
    (state) => state.questionnaire
  );
  const pagination = usePagination({ total: 10, initialPage: 1 });

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<QuestionnaireResponse>({
    createdAt: "",
    description: "",
    isLinkValid: false,
    isOneTime: false,
    isPublic: false,
    isPublished: true,
    questions: [],
    responses: [],
    title: "",
    updatedAt: "",
    user: "",
    _id: "",
    name: "",
    email: "",
  });

  const rows = (questionnaire.responses || []).map((element: any) => (
    <tr key={element._id}>
      <td>{element.title}</td>
      <td>{element.description}</td>
      <td>{element.name}</td>
      <td>{element.email}</td>
      <td>{element.questions?.length}</td>
      <td>{moment(element.createdAt).format("DD-MM-YY HH:MM a")}</td>
      <td>{moment(element.updatedAt).format("DD-MM-YY HH:MM a")}</td>
      <td>
        {" "}
        <Button
          color="green"
          size="xs"
          radius="xs"
          variant="outline"
          onClick={() => {
            setSelected(element);
            setOpen(true);
          }}
        >
          View Response
        </Button>
      </td>
    </tr>
  ));

  const renderSelectedInput = (question: any, index: number) => {
    switch (question?.type) {
      case "text":
        return (
          <>
            <Textarea
              key={question._id}
              radius="xs"
              label={question?.title}
              value={question?.values === null ? "" : question?.values}
              readOnly
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
              value={question?.values === null ? 0 : question?.values}
              readOnly
            />
          </>
        );
      case "radio":
        return (
          <Radio.Group
            value={question?.values === null ? "" : question?.values}
            key={question._id}
            label={question.title}
            mt={10}
          >
            {question.options.map((rd: any) => {
              return (
                <Flex mt={5} mb={5}>
                  <Radio
                    color="deep.0"
                    mt={10}
                    value={rd.value}
                    label={rd.value}
                    readOnly
                  />
                </Flex>
              );
            })}
          </Radio.Group>
        );
      case "checkbox":
        return (
          <Checkbox.Group
            value={question?.values === null ? "" : question?.values}
            mt={10}
            key={question._id}
            label={question.title}
          >
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
                    readOnly
                  />
                </Flex>
              );
            })}
          </Checkbox.Group>
        );
      case "switch":
        return (
          <Switch
            value={question?.values === null ? false : question?.values}
            color="deep.0"
            label={question.title}
            mt={10}
            readOnly
          />
        );
      case "rating":
        return (
          <Rating
            value={question?.values === null ? 0 : question?.values}
            title={question.title}
            mt={10}
            readOnly
          />
        );
      default:
        <Textarea
          value={question?.values === null ? "" : question?.values}
          placeholder="Your comment"
          label="Your comment"
          withAsterisk
          disabled
        />;
    }
  };
  const renderResponseContent = () => {
    console.log(
      "🚀 ~ file: Responses.tsx:135 ~ renderResponseContent ~ selected:",
      selected
    );
    const responseContent: Response = (questionnaire.responses || []).find(
      (res: any) => res._id === selected._id
    );

    if (responseContent && responseContent.questions !== undefined) {
      return (
        <>
          {" "}
          <Alert
            mb={10}
            icon={<BsPersonCircle />}
            title="Personal Details"
            color="indigo"
            variant="outline"
            radius="xs"
          >
            <>
              <TextInput
                value={selected.name === null ? "" : selected.name}
                label="Participant Name"
                size="xs"
                readOnly
              />
              <TextInput
                value={selected.email === null ? "" : selected.email}
                label="Participant Email"
                size="xs"
                readOnly
              />
            </>
          </Alert>
          {(responseContent.questions || []).map((q: any) => {
            return renderSelectedInput(q, q._id);
          })}
        </>
      );
    } else {
      return <Text></Text>;
    }
  };

  useEffect(() => {
    dispatch(getQuestionnaire(id));
  }, [dispatch, id]);

  return (
    <>
      {getLoading ? (
        <Spinner title="Loading Questionnaire" color="red" size="lg" />
      ) : (
        <>
          <Modal
            size="md"
            opened={open}
            centered
            onClose={() => {
              setOpen(false);
              setSelected({
                createdAt: "",
                description: "",
                isLinkValid: false,
                isOneTime: false,
                isPublic: false,
                isPublished: true,
                questions: [],
                responses: [],
                title: "",
                updatedAt: "",
                user: "",
                _id: "",
                name: "",
                email: "",
              });
            }}
            title="Response"
            radius="xs"
            closeOnClickOutside={false}
          >
            {renderResponseContent()}
          </Modal>
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
              <Box>
                <Button
                  color="orange"
                  size="xs"
                  radius="xs"
                  onClick={() => setOpen(true)}
                  leftIcon={<BsPlusLg />}
                >
                  Create Questionnaire
                </Button>
                <Button
                  color="red"
                  ml={10}
                  size="xs"
                  radius="xs"
                  leftIcon={<BsArrowDownRight />}
                >
                  Log Out
                </Button>
              </Box>
            </Flex>
          </Header>
          {console.log(questionnaire.responses)}
          <Container mt={30} size="xl">
            {rows.length ? (
              <Table withBorder highlightOnHover striped>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Participant</th>
                    <th>Email</th>
                    <th>No. of questions</th>
                    <th>Created</th>
                    <th>Updated</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>{rows}</tbody>
              </Table>
            ) : (
              <Empty title="No Responses" />
            )}
          </Container>
        </>
      )}
    </>
  );
};

export default Responses;
