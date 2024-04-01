import * as Components from "./Styles/Components";
import React, { useState } from "react";
import useLogin from "../../hooks/useLogin";
import useShowToast from "../../hooks/useShowToast";
import { ChakraProvider } from "@chakra-ui/react";

const Login = () => {
  // State for storing email and password inputs
  const showToast = useShowToast();
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

  // Custom hook for handling login functionality
  const { loading, error, login } = useLogin();

  return (
    <ChakraProvider>
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

        <Components.Button type="submit" isLoading={loading}>
          Sign In
        </Components.Button>

        {/* Display error message if login fails */}
      </Components.Form>
    </ChakraProvider>
  );
};

export default Login;
