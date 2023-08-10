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
import { Bs123, BsFillPlusCircleFill, BsJustify } from "react-icons/bs";
import { useMediaQuery } from "@mantine/hooks";

const Inputs: FC<IInputs> = () => {
  const { id = "" } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { questionnaire, editableQuestion, options, option } = useAppSelector(
    (state) => state.questionnaire
  );
  const { addQuestionOpen, addAnswerOpen } = useAppSelector(
    (state) => state.interface
  );
  const [answerEnabled, setAnswerEnabled] = useState(false);
  const extraSmallScreen = useMediaQuery("(min-width: 540px)");

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
    resetState();
  };

  const renderSelectedInput = (type: string) => {
    switch (type) {
      case "text":
        return (
          <>
            <Card mt={20} radius="xs" withBorder>
              <Text size="sm" weight={500} color="dimmed">
                Question Preview
              </Text>
              <Textarea
                value={
                  editableQuestion.answers === null
                    ? ""
                    : editableQuestion.answers
                }
                readOnly
                radius="xs"
                size="xs"
                mt={10}
                icon={<BsJustify />}
                label={editableQuestion.title}
              />
            </Card>
            <Card mt={20} radius="xs" withBorder>
              <Text size="sm" weight={500} color="dimmed">
                Set Details
              </Text>
              <TextInput
                mt={10}
                radius="xs"
                size="xs"
                label="Input title"
                placeholder="Question title"
                onChange={(e) =>
                  dispatch(
                    setQuestion({ property: "title", value: e.target.value })
                  )
                }
                withAsterisk
              />
              {addAnswerOpen && (
                <Textarea
                  value={
                    editableQuestion.values === null
                      ? ""
                      : editableQuestion.values
                  }
                  radius="xs"
                  size="xs"
                  mt={10}
                  label={editableQuestion.title}
                  icon={<BsJustify />}
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
                readOnly
                mt={10}
                icon={<Bs123 />}
                label={editableQuestion?.title}
              />
            </Card>
            <Card mt={20} radius="xs" withBorder>
              <Title order={4}>Set Details</Title>
              <TextInput
                mt={10}
                value={editableQuestion?.title}
                radius="xs"
                size="xs"
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
                  icon={<Bs123 />}
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
                label={editableQuestion?.title}
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
                size="xs"
                radius="xs"
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
                <Grid.Col span={9}>
                  <TextInput
                    placeholder="New radio input"
                    value={option.value}
                    radius="xs"
                    size="xs"
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
                <Grid.Col span={3}>
                  <Button
                    variant="outline"
                    color="green"
                    radius="xs"
                    size="xs"
                    fullWidth
                    disabled={option.value === ""}
                    leftIcon={<BsFillPlusCircleFill />}
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
                size="xs"
                radius="xs"
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
                <Grid.Col span={9}>
                  <TextInput
                    placeholder="New checkbox"
                    value={option.value}
                    size="xs"
                    radius="xs"
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
                <Grid.Col span={3}>
                  <Button
                    variant="outline"
                    color="green"
                    size="xs"
                    radius="xs"
                    fullWidth
                    disabled={option.value === ""}
                    leftIcon={<BsFillPlusCircleFill />}
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
                size="xs"
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
                size="xs"
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
          icon={<BsJustify />}
          withAsterisk
        />;
    }
  };

  return (
    <Modal
      h={300}
      size={!extraSmallScreen ? "xs" : "md"}
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
        size="xs"
        radius="xs"
        value={editableQuestion.type}
        label="Question Type"
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
        <Grid.Col span={12}>
          <Button
            disabled={editableQuestion.title === ""}
            color="green"
            radius="xs"
            size="xs"
            variant="outline"
            fullWidth
            leftIcon={<BsFillPlusCircleFill />}
            onClick={() => {
              onQuestionnaireEdit();
              dispatch(setAddQuestionOpen(false));
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
