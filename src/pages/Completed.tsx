import { Card, Container, Flex, Text } from "@mantine/core";
import React from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";

const Completed = () => {
  return (
    <Container fluid>
      <Card w="100%" mt={10} radius="xs" withBorder>
        <Flex direction="row" align="center">
          <BsFillCheckCircleFill color="#11c037" size={20} />
          <Flex ml={10} direction="column">
            <Text size="sm">Thank you</Text>
            <Text size="md" weight={500}>
              Your response has been submitted.
            </Text>
          </Flex>
        </Flex>
      </Card>
    </Container>
  );
};

export default Completed;
