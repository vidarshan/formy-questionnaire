import {
  Button,
  Card,
  Checkbox,
  Flex,
  Grid,
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
import React, { FC, useState } from "react";
import { IInputs } from "../interfaces/Inputs";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { editQuestionnaire } from "../store/slices/questionnaireSlice";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../store/store";
import { setAddQuestionOpen } from "../store/slices/interfaceSlice";

const Inputs: FC<IInputs> = () => {
  const { id = "" } = useParams();
  const checkboxes = [{ label: "test", value: "test" }];
  const dispatch = useDispatch<AppDispatch>();
  const { questionnaire } = useAppSelector((state) => state.questionnaire);
  const { addQuestionOpen } = useAppSelector((state) => state.interface);
  const [title, setTitle] = useState("");
  const [subtitle, subTitle] = useState("");
  const [content, setContent] = useState("");
  const [answerEnabled, setAnswerEnabled] = useState(false);
  const [checkboxlist, setCheckboxlist] = useState<any>([]);
  const [radiolist, setRadiolist] = useState<any>([]);
  const [answer, setAnswer] = useState("");
  const [response, setResponse] = useState("");
  const [addingItemValue, setAddingItemValue] = useState<any | undefined>("");
  const [selectedInput, setSelectedInput] = useState<string | null>("text");
  const [currentValue, setCurrentValue] = useState<null | string | number>(
    null
  );
  const [currentNumberValue, setCurrentNumberValue] = useState<number | "">(0);
  const [radioButtonValue, setRadioButtonValue] = useState("");
  const [checkboxValue, setCheckboxValue] = useState<string[]>([]);
  const [switchValue, setSwitchValue] = useState<any>(false);
  const [ratingValue, setRatingValue] = useState<number>();

  const resetState = () => {
    setTitle("");
    setSelectedInput("");
    setCurrentValue(null);
    setCurrentNumberValue(0);
    setAnswerEnabled(false);
    setRadioButtonValue("");
    setCheckboxValue([]);
    setAddingItemValue("");
    setSwitchValue(false);
    setRatingValue(0);
  };

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
            type: selectedInput,
            values: currentValue,
            answers: null,
            response: null,
            required: false,
          },
        ],
      })
    );
    resetState();
  };

  const renderSelectedInput = () => {
    switch (selectedInput) {
      case "text":
        return (
          <>
            <Card mt={20} radius="xs" withBorder>
              <Title order={4}>Question Preview</Title>
              <Textarea
                value={currentValue === null ? "" : currentValue}
                disabled
                radius="xs"
                mt={10}
                label={title}
              />
            </Card>
            <Card mt={20} radius="xs" withBorder>
              <Title order={4}>Set Details</Title>
              <TextInput
                mt={10}
                radius="xs"
                label="Input title"
                placeholder="Question title"
                onChange={(e) => setTitle(e.target.value)}
                withAsterisk
              />
              <Checkbox
                mt={20}
                mb={20}
                radius="xs"
                color="deep.0"
                checked={answerEnabled}
                label="Add an answer to this question"
                onChange={() => {
                  setAnswerEnabled(!answerEnabled);
                  setCurrentValue(null);
                }}
              />
              {answerEnabled && (
                <Textarea
                  value={currentValue === null ? "" : currentValue}
                  radius="xs"
                  mt={10}
                  label={title}
                  onChange={(e) => setCurrentValue(e.target.value)}
                />
              )}
            </Card>
          </>
        );
      case "number":
        return (
          <>
            <Card mt={20} radius="xs" withBorder>
              <Title order={4}>Question Preview</Title>
              <NumberInput
                value={currentNumberValue}
                radius="xs"
                disabled
                mt={10}
                label={title}
              />
            </Card>
            <Card mt={20} radius="xs" withBorder>
              <Title order={4}>Set Details</Title>
              <TextInput
                mt={10}
                value={title}
                radius="xs"
                label="Input title"
                placeholder="Question title"
                onChange={(e) => setTitle(e.target.value)}
                withAsterisk
              />
              <Checkbox
                mt={20}
                mb={20}
                radius="xs"
                color="deep.0"
                checked={answerEnabled}
                label="Add an answer to this question"
                onChange={() => setAnswerEnabled(!answerEnabled)}
              />
              {answerEnabled && (
                <NumberInput
                  value={currentNumberValue}
                  mt={10}
                  label={title}
                  onChange={(e) => {
                    setCurrentNumberValue(e);
                  }}
                />
              )}
            </Card>
          </>
        );
      case "radio":
        return (
          <>
            <Card mt={20} radius="xs" withBorder>
              <Title order={4}>Question Preview</Title>
              <Radio.Group value={radioButtonValue} label={title} mt={10}>
                {radiolist.map((rd: any) => {
                  return (
                    <Flex
                      mt={5}
                      mb={5}
                      direction="row"
                      justify="space-between"
                      align="center"
                    >
                      {" "}
                      <Radio
                        disabled
                        color="deep.0"
                        mt={10}
                        value={rd.value}
                        label={rd.value}
                      />
                    </Flex>
                  );
                })}
              </Radio.Group>
            </Card>
            <Card mt={20} radius="xs" withBorder>
              <Title order={4}>Set Details</Title>
              <TextInput
                mt={10}
                label="Input title"
                placeholder="Question title"
                onChange={(e) => setTitle(e.target.value)}
              />
              <Grid mt={20}>
                <Grid.Col span={10}>
                  <TextInput
                    value={addingItemValue}
                    placeholder="New radio input"
                    onChange={(e) => setAddingItemValue(e.target.value)}
                  />
                </Grid.Col>
                <Grid.Col span={2}>
                  <Button
                    variant="outline"
                    color="deep.0"
                    radius="xs"
                    fullWidth
                    disabled={addingItemValue === ""}
                    onClick={() => {
                      if (addingItemValue !== "") {
                        setRadiolist([
                          ...radiolist,
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
                mt={20}
                mb={20}
                radius="xs"
                color="deep.0"
                checked={answerEnabled}
                label="Add an answer to this question"
                onChange={() => setAnswerEnabled(!answerEnabled)}
              />
              {answerEnabled && (
                <Radio.Group
                  value={radioButtonValue}
                  onChange={(e) => setRadioButtonValue(e)}
                  mt={10}
                  withAsterisk
                >
                  {radiolist.map((rd: any) => {
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
              )}
            </Card>
          </>
        );
      case "checkbox":
        return (
          <>
            <Card mt={20} radius="xs" withBorder>
              <Title order={4}>Question Preview</Title>
              <Checkbox.Group value={checkboxValue} label={title} mt={10}>
                {checkboxlist.map((ch: any) => {
                  return (
                    <Flex
                      mt={5}
                      mb={5}
                      direction="row"
                      justify="space-between"
                      align="center"
                    >
                      <Checkbox
                        disabled
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
            </Card>
            <Card mt={20} radius="xs" withBorder>
              <Title order={4}>Set Details</Title>
              <TextInput
                mt={10}
                label="Input title"
                placeholder="Question title"
                onChange={(e) => setTitle(e.target.value)}
              />
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
                    variant="outline"
                    color="deep.0"
                    radius="xs"
                    fullWidth
                    disabled={addingItemValue === ""}
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
                mt={20}
                mb={20}
                radius="xs"
                color="dark"
                checked={answerEnabled}
                label="Add an answer to this question"
                onChange={() => setAnswerEnabled(!answerEnabled)}
              />

              {answerEnabled && (
                <Checkbox.Group
                  label={title}
                  mt={10}
                  value={checkboxValue}
                  onChange={(e) => setCheckboxValue(e)}
                >
                  {checkboxlist.map((ch: any) => {
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
              )}
            </Card>
          </>
        );

      case "switch":
        return (
          <>
            <Card mt={20} radius="xs" withBorder>
              <Title order={4}>Question Preview</Title>
              <Switch
                checked={switchValue}
                disabled
                color="deep.0"
                label={title}
                mt={10}
              />
            </Card>
            <Card mt={20} radius="xs" withBorder>
              <Title order={4}>Set Details</Title>
              <TextInput
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                radius="xs"
                mt={10}
                label="Input title"
                placeholder="Question title"
              />
              <Checkbox
                mt={20}
                mb={20}
                radius="xs"
                color="dark"
                checked={answerEnabled}
                label="Add an answer to this question"
                onChange={() => setAnswerEnabled(!answerEnabled)}
              />

              {answerEnabled && (
                <Switch
                  color="deep.0"
                  label={title}
                  mt={10}
                  checked={switchValue}
                  onChange={(e) => setSwitchValue(e.currentTarget.checked)}
                />
              )}
            </Card>
          </>
        );
      case "rating":
        return (
          <>
            <Card mt={20} radius="xs" withBorder>
              <Title order={4}>Question Preview</Title>
              <Flex direction="column">
                <Text mt={10} size={14}>
                  {title}
                </Text>
                <Rating title={title} mt={10} value={ratingValue} readOnly />
              </Flex>
            </Card>
            <Card mt={20} radius="xs" withBorder>
              <Title order={4}>Set Details</Title>
              <TextInput
                mt={10}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                label="Input title"
                placeholder="Question title"
                withAsterisk
              />
              <Checkbox
                mt={20}
                mb={20}
                radius="xs"
                color="dark"
                checked={answerEnabled}
                label="Add an answer to this question"
                onChange={() => setAnswerEnabled(!answerEnabled)}
              />
              {answerEnabled && (
                <Flex direction="column">
                  <Text mt={10} size={14}>
                    {title}
                  </Text>
                  <Rating
                    title={title}
                    mt={10}
                    value={ratingValue}
                    onChange={(e) => setRatingValue(e)}
                  />
                </Flex>
              )}
            </Card>
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
    <Modal
      h={300}
      size="lg"
      opened={addQuestionOpen}
      onClose={() => dispatch(setAddQuestionOpen(false))}
      title="New Question"
      radius="xs"
      scrollAreaComponent={ScrollArea.Autosize}
      closeOnClickOutside={false}
      centered
    >
      <Select
        radius="xs"
        color="deep.0"
        value={selectedInput}
        label="Your favorite framework/library"
        placeholder="Pick one"
        dropdownPosition="bottom"
        onChange={(v) => {
          resetState();
          setTitle("");
          setCurrentValue(null);
          setSelectedInput(v);
        }}
        data={[
          { value: "text", label: "Text Input" },
          { value: "number", label: "Number Input" },
          { value: "radio", label: "Radio Buttons" },
          { value: "checkbox", label: "Checkboxes" },
          { value: "switch", label: "Switch Input" },
          { value: "rating", label: "Rating" },
        ]}
      />
      {renderSelectedInput()}
      <Grid mt={10}>
        <Grid.Col span={6}>
          <Button variant="outline" color="gray" radius="xs" fullWidth>
            Cancel
          </Button>
        </Grid.Col>
        <Grid.Col span={6}>
          <Button
            disabled={title === ""}
            color="deep.0"
            radius="xs"
            fullWidth
            onClick={() => {
              onQuestionnaireEdit();
            }}
          >
            Add Question
          </Button>
        </Grid.Col>
      </Grid>
    </Modal>
  );
};

export default Inputs;