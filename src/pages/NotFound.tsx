import { Button, Flex, Paper, Title } from "@mantine/core";
import React from "react";
import { BiBlock } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Paper h="100vh">
      <Flex h="100%" direction="column" justify="center" align="center">
        <BiBlock size={30} />
        <Title mt={10} order={1}>
          404
        </Title>
        <Title mt={6} color="dimmed" order={3}>
          Page Not found
        </Title>
        <Button mt={10} variant="subtle" onClick={() => navigate("/")}>
          Go Back
        </Button>
      </Flex>
    </Paper>
  );
};

export default NotFound;
