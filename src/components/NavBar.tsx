import {
  ActionIcon,
  Box,
  Button,
  Flex,
  Header,
  Text,
  ThemeIcon,
} from "@mantine/core";
import React, { FC } from "react";
import {
  BsArrowDownRight,
  BsFillPlusCircleFill,
  BsMoon,
  BsPlusLg,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import { NavbarProps } from "../interfaces/Navbar";
import { VscSignOut } from "react-icons/vsc";
import { logOutUser } from "../store/slices/authSlices";
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";

const NavBar: FC<NavbarProps> = ({ setCreateOpen }) => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <Header height={60}>
      <Flex
        h="100%"
        mx={10}
        direction="row"
        justify="space-between"
        align="center"
      >
        <Flex>
          <Text color="orange" weight={700}>
            Formy
          </Text>
        </Flex>

        <Flex>
          <Button
            color="green"
            size="xs"
            radius="xs"
            variant="outline"
            onClick={() => setCreateOpen(true)}
            leftIcon={<BsFillPlusCircleFill />}
          >
            New Questionnaire
          </Button>
          <ActionIcon
            ml={10}
            color="yellow"
            variant="outline"
            radius="xs"
            size="md"
          >
            <BsMoon />
          </ActionIcon>
          <ActionIcon
            ml={10}
            color="red"
            variant="outline"
            radius="xs"
            size="md"
            onClick={() => dispatch(logOutUser())}
          >
            <VscSignOut />
          </ActionIcon>
        </Flex>
      </Flex>
    </Header>
  );
};

export default NavBar;
