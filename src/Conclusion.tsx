import { Flex, Text, ThemeIcon } from "@mantine/core";
import React from "react";
import { BiCheck } from "react-icons/bi";

const Conclusion = () => {
  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      sx={{ height: "100vh" }}
    >
      {" "}
      <ThemeIcon radius="xl" size="xl">
        <BiCheck />
      </ThemeIcon>
      <Text>Thank You!</Text>
      <Text>Await for results</Text>
    </Flex>
  );
};

export default Conclusion;
