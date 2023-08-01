import {
  Button,
  Checkbox,
  Flex,
  Modal,
  NumberInput,
  Radio,
  Rating,
  Switch,
  Table,
  Text,
  Textarea,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getQuestionnaire } from "../store/slices/questionnaireSlice";
import { AppDispatch } from "../../store";
import { useAppSelector } from "../store/store";
import moment from "moment";
import Spinner from "../components/Spinner";
import { QuestionnaireResponse, Response } from "../interfaces/Questionnaire";
import { BsFillRecordFill } from "react-icons/bs";

const Responses = () => {
  const { id = "" } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { questionnaire, getLoading } = useAppSelector(
    (state) => state.questionnaire
  );
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
            size="xl"
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
              });
            }}
            title="Authentication"
          >
            {renderResponseContent()}
          </Modal>
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
        </>
      )}
    </>
  );
};

export default Responses;
