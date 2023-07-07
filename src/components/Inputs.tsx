import {
  Card,
  Checkbox,
  FileInput,
  Group,
  NumberInput,
  Radio,
  Rating,
  Slider,
  Switch,
  TextInput,
  Textarea,
} from "@mantine/core";
import React, { FC } from "react";
import { IInputs } from "../interfaces/Inputs";

const Inputs: FC<IInputs> = ({ selected }) => {
  const renderSelectedInput = () => {
    switch (selected) {
      case "rating":
        return (
          <>
            <TextInput
              label="Question title"
              placeholder="Question title"
              withAsterisk
            />
            <Rating mt={10} value={0} />
          </>
        );
      case "checkbox":
        return (
          <Checkbox.Group
            defaultValue={["react"]}
            label="Select your favorite frameworks/libraries"
            description="This is anonymous"
            withAsterisk
          >
            <Group mt="xs">
              <Checkbox value="react" label="React" />
              <Checkbox value="svelte" label="Svelte" />
              <Checkbox value="ng" label="Angular" />
              <Checkbox value="vue" label="Vue" />
            </Group>
          </Checkbox.Group>
        );
      case "radio":
        return (
          <Radio.Group
            name="favoriteFramework"
            label="Select your favorite framework/library"
            description="This is anonymous"
            withAsterisk
          >
            <Group mt="xs">
              <Radio value="react" label="React" />
              <Radio value="svelte" label="Svelte" />
              <Radio value="ng" label="Angular" />
              <Radio value="vue" label="Vue" />
            </Group>
          </Radio.Group>
        );
      case "text":
        return (
          <Textarea
            placeholder="Your comment"
            label="Your comment"
            withAsterisk
          />
        );
      case "number":
        return (
          <NumberInput
            defaultValue={18}
            placeholder="Your age"
            label="Your age"
            withAsterisk
          />
        );
      case "switch":
        return <Switch label="I agree to sell my privacy" />;
      case "file":
        return (
          <FileInput placeholder="Pick file" label="Your resume" withAsterisk />
        );
      case "slider":
        return (
          <Slider
            marks={[
              { value: 20, label: "20%" },
              { value: 50, label: "50%" },
              { value: 80, label: "80%" },
            ]}
          />
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
    <Card mt={20} radius="xs" withBorder>
      {renderSelectedInput()}
    </Card>
  );
};

export default Inputs;
