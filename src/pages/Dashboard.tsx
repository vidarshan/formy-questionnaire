import { Card, Grid, Paper, Text, Title } from "@mantine/core";
import React from "react";

const Dashboard = () => {
  return (
    <Paper>
      <Title order={3}>Dashboard</Title>
      <Grid mt={10}>
        <Grid.Col span={4}>
          <Card withBorder>ddd</Card>
        </Grid.Col>
        <Grid.Col span={4}>
          <Card withBorder>ddd</Card>
        </Grid.Col>
        <Grid.Col span={4}>
          <Card withBorder>ddd</Card>
        </Grid.Col>
      </Grid>
    </Paper>
  );
};

export default Dashboard;
