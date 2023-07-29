import {
  Card,
  Container,
  Title,
  Text,
  Divider,
  Box,
  Button,
  Flex,
  Header,
} from "@mantine/core";
import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AppDispatch } from "../store/store";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks";
import { getQuestionnaire } from "../store/slices/questionnaireSlice";

const Paper = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id = "" } = useParams();

  const d = useAppSelector((state) => state.questionnaire);
  console.log("🚀 ~ file: Paper.tsx:23 ~ Paper ~ d:", d);

  useEffect(() => {
    dispatch(getQuestionnaire('ddd'));
  }, []);

  return (
    <Container fluid>
      <Flex>
        <Card w="100%" mt={10} radius="xs" withBorder>
          <Title></Title>
        </Card>
      </Flex>
    </Container>
  );
};

export default Paper;
