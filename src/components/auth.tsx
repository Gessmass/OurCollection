import { ChangeEvent, FC, useState } from "react";
import styled from "@emotion/styled";
import { auth, googleProvider } from "../config/firebase_config";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const MainDiv = styled.div`
  border: 2px solid black;
  width: 500px;
  height: 200px;
  background-color: grey;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
`;

const Id = styled.input`
  width: 80%;
  height: 30px;
  background-color: white;
`;

const SignIn = styled.button`
  width: 100px;
  height: 50px;
  border-radius: 50%;
  background-color: #00a050;
`;

const SignInWithGoogle = styled.button`
  width: 100px;
  height: 50px;
  border-radius: 6px;
  background-color: #d5994b;
  color: white;
`;

const Logout = styled.button`
  width: 100px;
  height: 50px;
  border-radius: 6px;
  background-color: #d54b4b;
  color: white;
`;

export const Auth: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  console.log(auth?.currentUser?.email);

  const signIn = async (): Promise<void> => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    }
  };

  const signInWithGoogle = async (): Promise<void> => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <MainDiv>
      <Id
        placeholder="Email"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
      />
      <Id
        placeholder="Password"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setPassword(e.target.value)
        }
        type="password"
      />
      <SignIn onClick={signIn}>Sign In</SignIn>
      <SignInWithGoogle onClick={signInWithGoogle}>
        Sign In with Goole
      </SignInWithGoogle>
      <Logout onClick={logout}>Logout</Logout>
    </MainDiv>
  );
};
