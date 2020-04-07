import React, { useState } from "react";
import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import {
  LOG_IN,
  CREATE_ACCOUNT,
  CONFIRM_SECRET,
  LOCAL_LOG_IN,
} from "./AuthQueries";
import { toast } from "react-toastify";

//useInput은 value랑 onChange를 준다

export default () => {
  /* state */
  const [action, setAction] = useState("logIn");
  const username = useInput("");
  const firstName = useInput("");
  const lastName = useInput("");
  const secret = useInput("");
  const email = useInput("shegoback@naver.com");
  /* ***** */
  /***************************Mutation***************************************/
  const [requestSecretMutation] = useMutation(LOG_IN, {
    variables: { email: email.value },
  });

  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      email: email.value,
      username: username.value,
      firstName: firstName.value,
      lastName: lastName.value,
    },
  });

  const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, {
    variables: {
      email: email.value,
      secret: secret.value,
    },
  });

  const localLogInMutation = useMutation(LOCAL_LOG_IN);
  // variables token을 넣지 않는 이유 token은 오로지 mutation을 호출한 후에 나옴
  // 내가 confirmSecret를 호출한 후에 생김
  /******************************************************************/

  const onSubmit = async (e) => {
    e.preventDefault();
    if (action === "logIn") {
      if (email.value !== "") {
        try {
          /* const mutation = await requestSecretMutation();
          console.log(mutation);*/
          const {
            data: { mutation },
          } = await requestSecretMutation();
          if (!mutation) {
            toast.error("You don't have an account yet, create one 💢");
          } else {
            toast.success("Check your email for your login secret key");
          }
        } catch (error) {
          console.log(error);
          toast.error("Can't request secret, try again"); // error는 back-end에서 넘어와도 front-end에서 작업한 문구가 나옴
        }
      } else {
        toast.error("Email is required");
      }
    } else if (action === "signUp") {
      if (
        email.value !== "" &&
        username.value !== "" &&
        firstName.value !== "" &&
        lastName.value !== ""
      ) {
        try {
          const { createAccout } = await createAccountMutation();
          if (!createAccout) {
            toast.error("Can't create account");
          } else {
            toast.success("Account created! LogIn Now 💨");
            setTimeout(() => setAction("logIn"), 3000); // setAction 으로 action 처리
          }
        } catch (error) {
          //back-end message 뿌리는 방법
          //toast.error(error.message);
          console.log(error);
          toast.error(error.message);
        }
      } else {
        toast.error("All field are required");
      }
    } else if (action === "confirm") {
      if (secret.value !== "") {
        try {
          const {
            data: { confirmSecret },
          } = await confirmSecretMutation();
          console.log(confirmSecret); // response = token
          const token = confirmSecret.token;
          if (token !== "" && token !== undefined) {
            localLogInMutation({
              variables: { token },
            }); //
          }

          // TODO: log user in
        } catch (error) {
          console.log(error);
          toast.error("Can't confirm secret ❌");
        }
      }
    }
  };

  return (
    <AuthPresenter
      setAction={setAction}
      action={action}
      username={username}
      firstName={firstName}
      lastName={lastName}
      email={email}
      secret={secret}
      onSubmit={onSubmit}
    />
  );
};
