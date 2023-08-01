import { Button, Checkbox, Flex, Modal, NumberInput, Radio, Rating, Switch, Table, Text, Textarea } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getQuestionnaire } from "../store/slices/questionnaireSlice";
import { AppDispatch } from "../../store";
import { useAppSelector } from "../store/store";
import moment from "moment";
import Spinner from "../components/Spinner";

const Responses = () => {
  const { id = "" } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { questionnaire, getLoading } = useAppSelector((state) => state.questionnaire);
  console.log("🚀 ~ file: Responses.tsx:15 ~ Responses ~ questionnaire:", questionnaire)
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState('');

  const rows = (questionnaire.responses || []).map((element: any) => (
    <tr key={element._id}>
      <td>{element.title}</td>
      <td>{element.description}</td>
      <td>{element.name}</td>
      <td>{element.email}</td>
      <td>{element.questions?.length}</td>
      <td>{moment(element.createdAt).format("DD-MM-YY HH:MM a")}</td>
      <td>{moment(element.updatedAt).format("DD-MM-YY HH:MM a")}</td>
      <td> <Button
            color="green"
            size="xs"
            radius="xs"
            onClick={()=>{
              setSelectedId(element._id)
              setOpen(true)
            }}
            
          >
            View Response
          </Button></td>
    </tr>
  ));


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
  const renderResponseContent = () => {
    // const responseContent = (questionnaire.responses || []).find((res:any)=> res._id === selectedId);
    // console.log("🚀 ~ file: Responses.tsx:126 ~ renderResponseContent ~ responseContent:", responseContent)
    return <>
  {/* {(responseContent.questions || []).map((q:any)=>{
    return <Text>ddd</Text>
  })} */}
    </>
  }

  useEffect(() => {
    dispatch(getQuestionnaire(id));
  }, [dispatch, id]);

  return (
    <>
    {getLoading ? <Spinner title="Loading Questionnaire" color="red" size="lg"/> : <>
    <Modal opened={open} onClose={() => {
      setOpen(false);
      setSelectedId('');
    }} title="Authentication">
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
    </>}
     
    </>
  );
};

export default Responses;
