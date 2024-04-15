import * as Components from "./Styles/Components";
import React, { useState } from "react";
import useLogin from "../../hooks/useLogin";
import useShowToast from "../../hooks/useShowToast";
import { ChakraProvider } from "@chakra-ui/react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import useForgotPassword from "../../hooks/useForgotPassword";

const Login = () => {
  // State for storing email and password inputs
  const showToast = useShowToast();
  const { forgotPass } = useForgotPassword();

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const signIn = (e) => {
    e.preventDefault();
    login(inputs);
    {
      error && showToast("Error", error.message, "error");
    }
  };

  const fPass = (e) => {
    e.preventDefault();
    forgotPass(inputs, e);
  };

  // Custom hook for handling login functionality
  const { loading, error, login } = useLogin();

  return (
    <ChakraProvider>
      <Components.Form onSubmit={(e) => signIn(e)}>
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
        <a
          onClick={(e) => fPass(e)}
          style={{
            cursor: "pointer",
            background: "transparent",
            color: "black",
            border: "none",
            fontSize: "10",
          }}
        >
          Forgot your password?
        </a>

        <Components.Button type="submit" isLoading={loading}>
          Sign In
        </Components.Button>

        {/* Display error message if login fails */}
      </Components.Form>
    </ChakraProvider>
  );
};

export default Login;
