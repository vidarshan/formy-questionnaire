import {
  Card,
  Container,
  Title,
  Text,
  Divider,
  Box,
  Button,
  Flex,
} from "@mantine/core";
import React from "react";

const Paper = () => {
  return (
    <Container size="xl" p={0}>
      <Box>
        <Card radius="xs" withBorder>
          <Box>
            <Text size={24}>Paper 1</Text>
            <Text c="dimmed" size={18}>
              Description of the paper
            </Text>
            <Divider mt={10} />
          </Box>
          <Flex mt={20} direction="row" justify="flex-end">
            <Button mr={10} color="orange" radius="xs" variant="outline">
              Cancel
            </Button>
            <Button color="orange" radius="xs">
              Submit Paper
            </Button>
          </Flex>
        </Card>
      </Box>
    </Container>
  );
};

export default Paper;
