import React from "react";
import * as Components from "./Styles/Components";
import { useState } from "react";
import useSignUpWithEmailAndPassword from "../../hooks/useSignUpWithEmailAndPassword";

const Signup = () => {
  const { loading, error, signup } = useSignUpWithEmailAndPassword();
  // State for storing email and password inputs
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });

  const signUp = (e) => {
    e.preventDefault();
    signup(inputs);
    {
      error && console.log(error.message);
    }
  };

  // Custom hook for handling login functionality

  return (
    <>
      <Components.Form onSubmit={signUp}>
        <Components.Title>Create Account</Components.Title>
        <Components.Input
          type="name"
          placeholder="Full Name"
          value={inputs.fullName}
          onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
        />
        <Components.Input
          type="username"
          placeholder="Username"
          value={inputs.username}
          onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
        />
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
        <Components.Button type="submit" isLoading={loading}>
          Sign Up
        </Components.Button>
      </Components.Form>
    </>
  );
};

export default Signup;