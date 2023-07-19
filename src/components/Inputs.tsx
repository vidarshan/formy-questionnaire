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
import {
  editQuestionnaire,
  getQuestionnaire,
  resetQuestion,
  resetQuestionOptions,
  setOption,
  setQuestion,
  setQuestionOptions,
  setQuestionType,
} from "../store/slices/questionnaireSlice";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../store/store";
import {
  setAddQuestionOpen,
  setAddAnswerOpen,
} from "../store/slices/interfaceSlice";
import { v4 as uuidv4 } from "uuid";

const Inputs: FC<IInputs> = () => {
  const { id = "" } = useParams();
  const checkboxes = [{ label: "test", value: "test" }];
  const dispatch = useDispatch<AppDispatch>();
  const { questionnaire, editableQuestion, options, option } = useAppSelector(
    (state) => state.questionnaire
  );
  const { addQuestionOpen, addAnswerOpen } = useAppSelector(
    (state) => state.interface
  );
  const [title, setTitle] = useState("");
  const [answerEnabled, setAnswerEnabled] = useState(false);
  const [checkboxlist, setCheckboxlist] = useState<any>([]);
  const [addingItemValue, setAddingItemValue] = useState<any | undefined>("");
  const [checkboxValue, setCheckboxValue] = useState<string[]>([]);
  const [switchValue, setSwitchValue] = useState<any>(false);
  const [ratingValue, setRatingValue] = useState<number>();

  const resetState = () => {
    dispatch(resetQuestion());
    dispatch(resetQuestionOptions());
    dispatch(setAddAnswerOpen(false));
    dispatch(
      setOption({
        id: uuidv4(),
        value: "",
        label: "",
      })
    );
  };

  const onQuestionnaireEdit = () => {
    dispatch(
      editQuestionnaire({
        id,
        title: questionnaire?.title,
        description: questionnaire?.description,
        isPublic: questionnaire?.isPublic,
        isPublished: questionnaire?.isPublished,
        isOneTime: questionnaire?.isOneTime,
        question: [
          {
            title: editableQuestion?.title,
            type: editableQuestion?.type,
            values: editableQuestion?.values,
            options: editableQuestion?.options,
            answers: editableQuestion?.answers,
            response: editableQuestion?.response,
            required: editableQuestion?.required,
          },
        ],
      })
    );
    dispatch(getQuestionnaire(id));
    resetState();
  };

  const renderSelectedInput = (type: string) => {
    switch (type) {
      case "text":
        return (
          <>
            <Card mt={20} radius="xs" withBorder>
              <Title order={4}>Question Preview</Title>
              <Textarea
                value={
                  editableQuestion.answers === null
                    ? ""
                    : editableQuestion.answers
                }
                disabled
                radius="xs"
                mt={10}
                label={editableQuestion.title}
              />
            </Card>
            <Card mt={20} radius="xs" withBorder>
              <Title order={4}>Set Details</Title>
              <TextInput
                mt={10}
                radius="xs"
                label="Input title"
                placeholder="Question title"
                onChange={(e) =>
                  dispatch(
                    setQuestion({ property: "title", value: e.target.value })
                  )
                }
                withAsterisk
              />
              <Checkbox
                mt={20}
                mb={20}
                radius="xs"
                color="pink"
                checked={addAnswerOpen}
                label="Add an answer to this question"
                onChange={() => {
                  dispatch(setAddAnswerOpen(!addAnswerOpen));
                }}
              />
              {addAnswerOpen && (
                <Textarea
                  value={
                    editableQuestion.values === null
                      ? ""
                      : editableQuestion.values
                  }
                  radius="xs"
                  mt={10}
                  label={title}
                  onChange={(e) =>
                    dispatch(
                      setQuestion({
                        property: "values",
                        value: e.target.value,
                      })
                    )
                  }
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
                value={
                  editableQuestion.values === null ? 0 : editableQuestion.values
                }
                radius="xs"
                disabled
                mt={10}
                label={editableQuestion?.title}
              />
            </Card>
            <Card mt={20} radius="xs" withBorder>
              <Title order={4}>Set Details</Title>
              <TextInput
                mt={10}
                value={editableQuestion?.title}
                radius="xs"
                label="Input title"
                placeholder="Question title"
                onChange={(e) =>
                  dispatch(
                    setQuestion({
                      property: "title",
                      value: e.target.value,
                    })
                  )
                }
                withAsterisk
              />
              <Checkbox
                mt={20}
                mb={20}
                radius="xs"
                color="pink"
                checked={addAnswerOpen}
                label="Add an answer to this question"
                onChange={() => {
                  dispatch(setAddAnswerOpen(!addAnswerOpen));
                }}
              />
              {addAnswerOpen && (
                <NumberInput
                  value={
                    editableQuestion.values === null
                      ? 0
                      : editableQuestion.values
                  }
                  mt={10}
                  label={editableQuestion?.title}
                  onChange={(e) => {
                    dispatch(
                      setQuestion({
                        property: "values",
                        value: e,
                      })
                    );
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
              <Radio.Group
                value={editableQuestion?.values}
                label={title}
                mt={10}
              >
                {options?.map((rd: any) => {
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
                value={editableQuestion?.title}
                onChange={(e) =>
                  dispatch(
                    setQuestion({
                      property: "title",
                      value: e.target.value,
                    })
                  )
                }
              />
              <Grid mt={20}>
                <Grid.Col span={10}>
                  <TextInput
                    placeholder="New radio input"
                    value={option.value}
                    onChange={(e) =>
                      dispatch(
                        setOption({
                          id: option?.id,
                          value: e.target.value,
                          label: e.target.value,
                        })
                      )
                    }
                  />
                </Grid.Col>
                <Grid.Col span={2}>
                  <Button
                    variant="outline"
                    color="deep.0"
                    radius="xs"
                    fullWidth
                    disabled={option.value === ""}
                    onClick={() => {
                      if (option.value !== "") {
                        dispatch(setQuestionOptions());
                        dispatch(
                          setOption({
                            id: uuidv4(),
                            value: "",
                            label: "",
                          })
                        );
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
                color="pink"
                label="Add an answer to this question"
                checked={addAnswerOpen}
                onChange={() => {
                  dispatch(setAddAnswerOpen(!addAnswerOpen));
                }}
              />
              {addAnswerOpen && (
                <Radio.Group
                  value={editableQuestion.values}
                  onChange={(e) =>
                    dispatch(
                      setQuestion({
                        property: "values",
                        value: e,
                      })
                    )
                  }
                  mt={10}
                  withAsterisk
                >
                  {options.map((rd: any) => {
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
        console.log(editableQuestion);
        return (
          <>
            <Card mt={20} radius="xs" withBorder>
              <Title order={4}>Question Preview</Title>
              <Checkbox.Group
                value={
                  editableQuestion?.values === null
                    ? []
                    : editableQuestion.values
                }
                label={editableQuestion?.title}
                mt={10}
              >
                {editableQuestion?.options.map((ch: any) => {
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
                value={editableQuestion?.title}
                onChange={(e) =>
                  dispatch(
                    setQuestion({
                      property: "title",
                      value: e.target.value,
                    })
                  )
                }
              />
              <Grid mt={20}>
                <Grid.Col span={10}>
                  <TextInput
                    placeholder="New checkbox"
                    value={option.value}
                    onChange={(e) =>
                      dispatch(
                        setOption({
                          id: option?.id,
                          value: e.target.value,
                          label: e.target.value,
                        })
                      )
                    }
                  />
                </Grid.Col>
                <Grid.Col span={2}>
                  <Button
                    variant="outline"
                    color="deep.0"
                    radius="xs"
                    fullWidth
                    disabled={option.value === ""}
                    onClick={() => {
                      if (option.value !== "") {
                        dispatch(setQuestionOptions());
                        dispatch(
                          setOption({
                            id: uuidv4(),
                            value: "",
                            label: "",
                          })
                        );
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
                color="pink"
                checked={addAnswerOpen}
                label="Add an answer to this question"
                onChange={() => {
                  dispatch(setAddAnswerOpen(!addAnswerOpen));
                }}
              />
              {addAnswerOpen && (
                <Checkbox.Group
                  mt={10}
                  value={
                    editableQuestion.values === null
                      ? []
                      : editableQuestion.values
                  }
                  onChange={(e) => {
                    dispatch(
                      setQuestion({
                        property: "values",
                        value: e,
                      })
                    );
                  }}
                >
                  {options.map((ch: any) => {
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
        console.log(editableQuestion);
        return (
          <>
            <Card mt={20} radius="xs" withBorder>
              <Title order={4}>Question Preview</Title>
              <Switch
                label={editableQuestion.title}
                checked={
                  editableQuestion.values === null
                    ? false
                    : editableQuestion.values
                }
                disabled
                color="deep.0"
                mt={10}
              />
            </Card>
            <Card mt={20} radius="xs" withBorder>
              <Title order={4}>Set Details</Title>
              <TextInput
                value={editableQuestion.title}
                onChange={(e) =>
                  dispatch(
                    setQuestion({
                      property: "title",
                      value: e.target.value,
                    })
                  )
                }
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
                  label={editableQuestion.title}
                  mt={10}
                  checked={
                    editableQuestion.values === null
                      ? false
                      : editableQuestion.values
                  }
                  onChange={(e) =>
                    dispatch(
                      setQuestion({
                        property: "values",
                        value: e.target.checked,
                      })
                    )
                  }
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
                  {editableQuestion.title}
                </Text>
                <Rating
                  title={editableQuestion.title}
                  mt={10}
                  value={
                    editableQuestion.values === null
                      ? 0
                      : editableQuestion.values
                  }
                  readOnly
                />
              </Flex>
            </Card>
            <Card mt={20} radius="xs" withBorder>
              <Title order={4}>Set Details</Title>
              <TextInput
                mt={10}
                value={editableQuestion.title}
                onChange={(e) =>
                  dispatch(
                    setQuestion({
                      property: "title",
                      value: e.target.value,
                    })
                  )
                }
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
                <Flex direction="column">
                  <Text mt={10} size={14}>
                    {editableQuestion.title}
                  </Text>
                  <Rating
                    title={editableQuestion.title}
                    mt={10}
                    value={
                      editableQuestion.values === null
                        ? 0
                        : editableQuestion.values
                    }
                    onChange={(e) =>
                      dispatch(
                        setQuestion({
                          property: "values",
                          value: e,
                        })
                      )
                    }
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
      onClose={() => {
        dispatch(setAddQuestionOpen(false));
        resetState();
      }}
      title="New Question"
      radius="xs"
      scrollAreaComponent={ScrollArea.Autosize}
      closeOnClickOutside={false}
      centered
    >
      <Select
        radius="xs"
        color="deep.0"
        value={editableQuestion.type}
        label="Question Input Type"
        placeholder="Pick one"
        dropdownPosition="bottom"
        onChange={(v) => {
          resetState();
          dispatch(setQuestionType(v));
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
      {renderSelectedInput(editableQuestion.type)}
      <Grid mt={10}>
        <Grid.Col span={6}>
          <Button
            onClick={() => {
              dispatch(setAddQuestionOpen(false));
              resetState();
            }}
            variant="outline"
            color="pink"
            radius="xs"
            fullWidth
          >
            Cancel
          </Button>
        </Grid.Col>
        <Grid.Col span={6}>
          <Button
            disabled={editableQuestion.title === ""}
            color="pink"
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
