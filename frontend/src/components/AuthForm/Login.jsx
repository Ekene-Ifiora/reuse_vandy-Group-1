import * as Components from "./Styles/Components";
import { Alert, AlertDescription } from "@chakra-ui/alert";
import React, { useState } from "react";
import axios from 'axios'
import useLogin from "../../hooks/useLogin";
import { auth } from "../../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  // State for storing email and password inputs
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, inputs.email, inputs.password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Custom hook for handling login functionality
  const { loading, error, login } = useLogin();

  return (
    <>
      <Components.Form onSubmit={signIn}>
        <Components.Title>Sign in</Components.Title>
        <Components.Input
          type="email"
          placeholder="Email"
          value={inputs.email}
          onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
        />

        <Components.Input
          type="password"
          placeholder="Password"
          value={inputs.password}
          onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
        />
        <Components.Anchor href="#">Forgot your password?</Components.Anchor>

        <Components.Button
          type="submit"
          isLoading={loading}
          onClick={() => login(inputs)}
        >
          Sign In
        </Components.Button>

        {/* Display error message if login fails */}
        {error && (
          <Alert
            status="error"
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <AlertDescription style={{ color: "red", paddingTop: "20px" }}>
              {error.message}
            </AlertDescription>
          </Alert>
        )}
      </Components.Form>
    </>
  );
};

export default Login;
