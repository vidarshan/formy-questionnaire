import {
  ActionIcon,
  AppShell,
  Avatar,
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Header,
  Navbar,
  Paper,
  Table,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import React from "react";
import {
  BsPlusLg,
  BsFileTextFill,
  BsReverseListColumnsReverse,
  BsFillFilePersonFill,
  BsFillHouseFill,
} from "react-icons/bs";
import { IoLogOut } from "react-icons/io5";
import Shell from "../components/Shell";

const Home = () => {
  const elements = [
    { position: 6, mass: 12.011, symbol: "C", name: "Carbon" },
    { position: 7, mass: 14.007, symbol: "N", name: "Nitrogen" },
    { position: 39, mass: 88.906, symbol: "Y", name: "Yttrium" },
    { position: 56, mass: 137.33, symbol: "Ba", name: "Barium" },
    { position: 58, mass: 140.12, symbol: "Ce", name: "Cerium" },
  ];

  const rows = elements.map((element) => (
    <tr key={element.name}>
      <td>{element.position}</td>
      <td>{element.name}</td>
      <td>{element.symbol}</td>
      <td>{element.mass}</td>
    </tr>
  ));

  return (
    <Shell>
      <>
        <Text>Dashboard</Text>
        <Grid>
          <Grid.Col span={4}>
            <Card radius="xs" withBorder>
              <Title>All</Title>
              <Title>ddd</Title>
            </Card>
          </Grid.Col>
          <Grid.Col span={4}>
            <Card radius="xs" withBorder>
              <Title>Opened</Title>
              <Title>ddd</Title>
            </Card>
          </Grid.Col>
          <Grid.Col span={4}>
            <Card radius="xs" withBorder>
              <Title>Closed</Title>
              <Title>ddd</Title>
            </Card>
          </Grid.Col>
        </Grid>
        <Text>Questionnaire</Text>
        <Table striped highlightOnHover>
          {rows}
        </Table>
      </>
    </Shell>
  );
};

export default Home;
