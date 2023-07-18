import React, { FC } from "react";
import { EmptyProps } from "../interfaces/Empty";
import { Card, Flex, Title } from "@mantine/core";
import { BsDatabase } from "react-icons/bs";

const Empty: FC<EmptyProps> = ({ title }) => {
  return (
    <Card h={100} mt={30} radius="xs" withBorder>
      <Flex h="100%" direction="column" justify="center" align="center">
        <BsDatabase size={40} />
        <Title weight={500} order={6} mt={10}>
          {title}
        </Title>
      </Flex>
    </Card>
  );
};

export default Empty;
