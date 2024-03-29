import { Button, Flex, Header, Text } from "@mantine/core";
import React, { FC } from "react";
import { BsFillHouseDoorFill, BsFillPlusCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { NavbarProps } from "../interfaces/Navbar";
import { VscSignOut } from "react-icons/vsc";
import { logOutUser } from "../store/slices/authSlices";
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../store/store";

const NavBar: FC<NavbarProps> = ({ setCreateOpen, login }) => {
  const { token } = useAppSelector((state) => state.user);
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
          <Link to="/">
            <Text color="grape" weight={700}>
              Formy
            </Text>
          </Link>
        </Flex>

        <Flex>
          {setCreateOpen !== undefined && (
            <>
              <Button
                color="grape"
                size="xs"
                radius="xs"
                variant="filled"
                onClick={() =>
                  setCreateOpen !== undefined && setCreateOpen(true)
                }
                leftIcon={<BsFillPlusCircleFill />}
              >
                New Questionnaire
              </Button>
            </>
          )}
          {token !== null && !login && (
            <Button
              ml={10}
              color="red"
              variant="filled"
              radius="xs"
              size="xs"
              leftIcon={<VscSignOut />}
              onClick={() => dispatch(logOutUser())}
            >
              Log out
            </Button>
          )}
        </Flex>
        {login && (
          <>
            {token === null ? (
              <Flex>
                <Link to="/login">
                  <Button
                    ml={10}
                    color="grape"
                    variant="filled"
                    radius="xs"
                    size="xs"
                  >
                    Log in
                  </Button>
                </Link>
              </Flex>
            ) : (
              <Link to="/">
                <Button
                  ml={10}
                  color="grape"
                  variant="filled"
                  radius="xs"
                  size="xs"
                  leftIcon={<BsFillHouseDoorFill />}
                >
                  Dashboard
                </Button>
              </Link>
            )}
          </>
        )}
      </Flex>
    </Header>
  );
};

export default NavBar;
