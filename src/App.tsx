import {
  Button,
  Container,
  Flex,
  Text,
  ActionIcon,
  TextInput,
  Checkbox,
  Radio,
  Textarea,
  NumberInput,
} from "@mantine/core";
import React from "react";
import { BiArrowBack, BiArrowToRight } from "react-icons/bi";
import "./App.css";

function App() {
  return (
    <Flex sx={{ height: "100vh" }} justify="center" align="center">
      <Container>
        <ActionIcon color="teal" size="xl" radius="xl" variant="filled">
          <BiArrowBack />
        </ActionIcon>
      </Container>
      <Container>
        <Text size="xl">This is a sample question, answer it?</Text>
        <TextInput placeholder="Your Answer"></TextInput>
        <Checkbox.Group
          defaultValue={["react"]}
          orientation="vertical"
          label="Select your favorite framework/library"
          description="This is anonymous"
          withAsterisk
        >
          <Checkbox value="react" label="React" />
          <Checkbox value="svelte" label="Svelte" />
          <Checkbox value="ng" label="Angular" />
          <Checkbox value="vue" label="Vue" />
        </Checkbox.Group>
        <Radio.Group
          name="favoriteFramework"
          orientation="vertical"
          label="Select your favorite framework/library"
          description="This is anonymous"
          withAsterisk
        >
          <Radio value="react" label="React" />
          <Radio value="svelte" label="Svelte" />
          <Radio value="ng" label="Angular" />
          <Radio value="vue" label="Vue" />
        </Radio.Group>
        <Textarea
          placeholder="Your comment"
          label="Your comment"
          withAsterisk
        />
        <NumberInput
          defaultValue={18}
          placeholder="Your age"
          label="Your age"
          withAsterisk
        />
      </Container>
      <Container>
        <ActionIcon color="teal" size="xl" radius="xl" variant="filled">
          <BiArrowToRight />
        </ActionIcon>
      </Container>
    </Flex>
  );
}

export default App;
