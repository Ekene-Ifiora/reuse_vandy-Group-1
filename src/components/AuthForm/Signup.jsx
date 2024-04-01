import React from "react";
import * as Components from "./Styles/Components";
import { useState } from "react";
import useSignUpWithEmailAndPassword from "../../hooks/useSignUpWithEmailAndPassword";
import axios from "axios";
import useShowToast from "../../hooks/useShowToast";

const Signup = () => {
  const { loading, error, signup } = useSignUpWithEmailAndPassword();
  const showToast = useShowToast();
  // State for storing email and password inputs
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });
  // const [username, setUsername] = useState();
  // const [secret, setSecret] = useState();
  // const [email, setEmail] = useState();
  // const [first_name, setFirstName] = useState();
  // const [last_name, setLastName] = useState();

  const signUp = (e) => {
    e.preventDefault();
    const myArray = inputs.email.split("@");
    if (!inputs.fullName) {
      <div className="error">
        {showToast("Error", "Input Full Name", "error")}
      </div>;
    } else if (!inputs.username) {
      <div className="error">
        {showToast("Error", "Input username", "error")}
      </div>;
    } else if (!inputs.email) {
      <div className="error">{showToast("Error", "Input email", "error")}</div>;
    } else if (myArray[1] != "vanderbilt.edu") {
      <div className="error">
        {showToast("Error", "Input Vanderbilt email", "error")}
      </div>;
    } else if (!inputs.password) {
      <div className="error">
        {showToast("Error", "Input Password", "error")}
      </div>;
    } else {
      e.preventDefault();
      signup(inputs);
      {
        error && console.log(error.message);
      }
      // setUsername(inputs.username);
      // setSecret(inputs.username);
      // setEmail(inputs.email);
      // setFirstName(inputs.fullName);
      // setLastName(inputs.fullName);

      // axios
      //   .post("http://localhost:3001/signup", {
      //     username,
      //     secret,
      //     email,
      //     first_name,
      //     last_name,
      //   })
      //   //.then((r) => props.onAuth({ ...r.data, secret })) // NOTE: over-ride secret
      //   .catch((e) => console.log(JSON.stringify(e.response.data)));
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
