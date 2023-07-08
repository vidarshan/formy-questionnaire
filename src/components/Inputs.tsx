import {
  ActionIcon,
  Button,
  Card,
  Checkbox,
  FileInput,
  Flex,
  Grid,
  Group,
  NumberInput,
  Radio,
  Rating,
  Slider,
  Switch,
  Text,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import React, { FC, useEffect, useRef, useState } from "react";
import { IInputs } from "../interfaces/Inputs";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import {
  editQuestionnaire,
  getQuestionnaire,
} from "../store/slices/questionnaireSlice";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../store/store";
import { BsTrash3 } from "react-icons/bs";

const Inputs: FC<IInputs> = ({ selected = "" }) => {
  console.log("🚀 ~ file: Inputs.tsx:27 ~ selected:", selected);
  const { id = "" } = useParams();
  const checkboxes = [{ label: "test", value: "test" }];
  console.log("🚀 ~ file: Inputs.tsx:34 ~ checkboxes:", checkboxes);
  const dispatch = useDispatch<AppDispatch>();
  const { questionnaire } = useAppSelector((state) => state.questionnaire);
  const [title, setTitle] = useState("");
  const [subtitle, subTitle] = useState("");
  const [content, setContent] = useState("");
  const [answerEnabled, setAnswerEnabled] = useState(false);
  const [currentCheckbox, setCurrentCheckbox] = useState();
  const [checkboxlist, setCheckboxlist] = useState<any>([]);
  console.log("🚀 ~ file: Inputs.tsx:41 ~ checkboxlist:", checkboxlist);
  const [answer, setAnswer] = useState("");
  const [response, setResponse] = useState("");
  const [addingItemValue, setAddingItemValue] = useState<any | undefined>("");
  console.log("🚀 ~ file: Inputs.tsx:41 ~ checkboxlist:", checkboxlist);

  const onQuestionnaireEdit = () => {
    dispatch(
      editQuestionnaire({
        id,
        title: questionnaire?.title,
        description: questionnaire?.description,
        isPublic: questionnaire?.isPublic,
        isOneTime: questionnaire?.isOneTime,
        question: [
          {
            title,
            subtitle,
            type: selected,
            content,
            answer,
            response: "",
          },
        ],
      })
    );
  };

  const renderSelectedInput = () => {
    switch (selected) {
      case "rating":
        return (
          <>
            <Title order={4}>Rating Input</Title>
            <TextInput
              mt={10}
              label="Input title"
              placeholder="Question title"
              withAsterisk
            />
            <Textarea
              mt={10}
              label="Input description"
              placeholder="Question description"
              withAsterisk
            />
            <Checkbox
              mt={10}
              checked={answerEnabled}
              label="Add an answer to this question"
              onChange={() => setAnswerEnabled(!answerEnabled)}
            />
            {answerEnabled && <Rating mt={10} value={0} />}
          </>
        );
      case "checkbox":
        return (
          <>
            <Title order={4}>Multi Option</Title>
            <TextInput
              mt={10}
              label="Input title"
              placeholder="Question title"
              withAsterisk
            />
            <Textarea
              mt={10}
              label="Input description"
              placeholder="Question description"
              withAsterisk
            />
            <Checkbox.Group mt={10} withAsterisk>
              {checkboxlist.map((ch: any) => {
                console.log(checkboxes);
                return (
                  <Flex
                    mt={5}
                    mb={5}
                    direction="row"
                    justify="space-between"
                    align="center"
                  >
                    {" "}
                    <Checkbox mt={10} value={ch.value} label={ch.value} />
                  </Flex>
                );
              })}
            </Checkbox.Group>
            <Grid mt={20}>
              <Grid.Col span={10}>
                <TextInput
                  value={addingItemValue}
                  placeholder="New checkbox"
                  onChange={(e) => setAddingItemValue(e.target.value)}
                />
              </Grid.Col>
              <Grid.Col span={2}>
                <Button
                  variant="filled"
                  color="dark"
                  radius="xs"
                  fullWidth
                  onClick={() => {
                    if (addingItemValue !== "") {
                      setCheckboxlist([
                        ...checkboxlist,
                        { value: addingItemValue, label: addingItemValue },
                      ]);
                      setAddingItemValue("");
                    }
                  }}
                >
                  Add
                </Button>
              </Grid.Col>
            </Grid>
            <Checkbox
              mt={10}
              checked={answerEnabled}
              label="Add an answer to this question"
              onChange={() => setAnswerEnabled(!answerEnabled)}
            />
            <Checkbox.Group mt={10} withAsterisk>
              {checkboxlist.map((ch: any) => {
                console.log(checkboxes);
                return (
                  <Flex mt={5} mb={5}>
                    {" "}
                    <Checkbox mt={10} value={ch.value} label={ch.value} />
                  </Flex>
                );
              })}
            </Checkbox.Group>
          </>
        );
      case "radio":
        return (
          <>
            <Title order={4}>Single Option</Title>
            <TextInput
              mt={10}
              label="Input title"
              placeholder="Question title"
              withAsterisk
            />
            <Textarea
              mt={10}
              label="Input description"
              placeholder="Question description"
              withAsterisk
            />
            <Radio.Group mt={10} withAsterisk>
              {checkboxlist.map((ch: any) => {
                console.log(checkboxes);
                return (
                  <Flex
                    mt={5}
                    mb={5}
                    direction="row"
                    justify="space-between"
                    align="center"
                  >
                    {" "}
                    <Radio mt={10} value={ch.value} label={ch.value} />
                  </Flex>
                );
              })}
            </Radio.Group>
            <Grid mt={20}>
              <Grid.Col span={10}>
                <TextInput
                  value={addingItemValue}
                  placeholder="New checkbox"
                  onChange={(e) => setAddingItemValue(e.target.value)}
                />
              </Grid.Col>
              <Grid.Col span={2}>
                <Button
                  variant="filled"
                  color="dark"
                  radius="xs"
                  fullWidth
                  onClick={() => {
                    if (addingItemValue !== "") {
                      setCheckboxlist([
                        ...checkboxlist,
                        { value: addingItemValue, label: addingItemValue },
                      ]);
                      setAddingItemValue("");
                    }
                  }}
                >
                  Add
                </Button>
              </Grid.Col>
            </Grid>
            <Checkbox
              mt={10}
              checked={answerEnabled}
              label="Add an answer to this question"
              onChange={() => setAnswerEnabled(!answerEnabled)}
            />
            <Radio.Group mt={10} withAsterisk>
              {checkboxlist.map((ch: any) => {
                console.log(checkboxes);
                return (
                  <Flex mt={5} mb={5}>
                    {" "}
                    <Radio mt={10} value={ch.value} label={ch.value} />
                  </Flex>
                );
              })}
            </Radio.Group>
          </>
        );
      case "text":
        return (
          <>
            <Title order={4}>Text Input</Title>
            <TextInput
              mt={10}
              label="Input title"
              placeholder="Question title"
            />
            <Textarea
              mt={10}
              placeholder="Your comment"
              label="Your comment"
              withAsterisk
            />
            <Checkbox
              mt={10}
              checked={answerEnabled}
              label="Add an answer to this question"
              onChange={() => setAnswerEnabled(!answerEnabled)}
            />
            {answerEnabled && (
              <Textarea
                mt={10}
                placeholder="Your comment"
                label="Your comment"
                withAsterisk
              />
            )}
          </>
        );
      case "number":
        return (
          <>
            <Title order={4}>Number Input</Title>
            <TextInput
              mt={10}
              label="Input title"
              placeholder="Question title"
            />
            <NumberInput
              mt={10}
              defaultValue={18}
              placeholder="Your age"
              label="Your age"
            />
            <Checkbox
              mt={10}
              checked={answerEnabled}
              label="Add an answer to this question"
              onChange={() => setAnswerEnabled(!answerEnabled)}
            />
            {answerEnabled && (
              <NumberInput
                mt={10}
                defaultValue={18}
                placeholder="Your age"
                label="Your age"
              />
            )}
          </>
        );
      case "switch":
        return (
          <>
            {" "}
            <Title order={4}>Switch Input</Title>
            <TextInput
              mt={10}
              label="Input title"
              placeholder="Question title"
            />
            <Switch mt={10} />
            <Checkbox
              mt={10}
              checked={answerEnabled}
              label="Add an answer to this question"
              onChange={() => setAnswerEnabled(!answerEnabled)}
            />
            {answerEnabled && <Switch mt={10} />}
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

  return (
    <>
      <Card mt={20} radius="xs" withBorder>
        {renderSelectedInput()}
      </Card>
      <Button mt={10} radius="xs" fullWidth onClick={() => {}}>
        Add Question
      </Button>
    </>
  );
};

export default Inputs;
