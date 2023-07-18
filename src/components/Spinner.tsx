import React, { FC } from "react";
import { Container, Flex, Loader, Title } from "@mantine/core";
import { SpinnerProps } from "../interfaces/Spinner";

const Spinner: FC<SpinnerProps> = ({ title, color, size }) => {
  return (
    <Container h={200}>
      <Flex h="100%" direction="column" justify="center" align="center">
        <Loader color={color} size={size} />
        <Title weight={500} order={6} mt={10}>
          {title}
        </Title>
      </Flex>
    </Container>
  );
};

export default Spinner;
