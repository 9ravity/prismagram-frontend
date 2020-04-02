import React, { useState } from "react";
import styled from "styled-components";
import Input from "../Components/Input";
import Button from "../Components/Button";

// style
const Wrapper = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`; // container

const Box = styled.div`
  ${props => props.theme.whiteBox}
  border-radius: 0px;
  padding: 20px 0px;
  width: 100%;
  max-width: 350px;
`;

const StateChanger = styled(Box)`
  text-align: center;
`;

const Link = styled.span`
  color: ${props => props.theme.blueColor};
  cursor: pointer;
`;

const Form = styled(Box)`
  padding: 40px;
  padding-bottom: 30px;
  margin-bottom: 15px;
  form {
    width: 100%;
    input {
      width: 100%;
      &:not(:last-chile) {
        margin-bottom: 7px;
      }
    }
    button {
      margin-top: 10px;
    }
  }
`;
console.log(Box);

export default () => {
  const [action, setAction] = "logIn"; // 액션값과 같으면 login처리
  const username = useInput("");
  const password = useInput("");

  return (
    <Wrapper>
      <Form>
        {action === "logIn" ? (
          <form>
            <Input placeholder={"Username"} {...username}></Input>
            <Input placeholder={"Password"} {...password}></Input>
            <Button text={"Log in"} />
          </form>
        ) : (
          <form>
            <Input placeholder={"First name"}></Input>
            <Input placeholder={"Last name"}></Input>
            <Input placeholder={"Email"}></Input>
            <Input placeholder={"Username"}></Input>
            <Input placeholder={"Password"}></Input>
            <Button text={"Sign up"} />
          </form>
        )}
      </Form>
      <StateChanger>
        {action === "logIn" ? (
          <>
            Don't have an account?{" "}
            <Link onClick={() => setAction("signUp")}>Sign up</Link>
          </>
        ) : (
          <>
            Have an account?{" "}
            <Link onClick={() => setAction("logIn")}> Log in</Link>
          </>
        )}
      </StateChanger>
    </Wrapper>
  );
};
