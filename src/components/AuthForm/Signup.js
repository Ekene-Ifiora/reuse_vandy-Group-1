import React from "react";
import * as Components from './Styles/Components'
import { Alert, AlertIcon, Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import { auth } from "../../firebase/firebase"
import { createUserWithEmailAndPassword } from "firebase/auth";
import useSignUpWithEmailAndPassword from "../../hooks/useSignUpWithEmailAndPassword";

const Signup = () => {
  // State for storing email and password inputs
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });

  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, inputs.fullName,inputs.username, inputs.email, inputs.password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Custom hook for handling login functionality
  const { loading, error, signup } = useSignUpWithEmailAndPassword();
  return (
    <>
                <Components.Form onSubmit={signUp}>
                    <Components.Title>Create Account</Components.Title>
                    <Components.Input type='name' placeholder='Full Name' value={inputs.fullName} onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}/>
                    <Components.Input type='username' placeholder='Username' value={inputs.username} onChange={(e) => setInputs({ ...inputs, username: e.target.value })}/>
                    <Components.Input type='email' placeholder='Email' value={inputs.email} onChange={(e) => setInputs({ ...inputs, email: e.target.value })}/>
                    <Components.Input type='password' placeholder='Password' value={inputs.password} onChange={(e) => setInputs({ ...inputs, password: e.target.value })}/>
                    <Components.Button type='submit' isLoading={loading}>Sign Up</Components.Button>
                </Components.Form>
    </>
  );
};

export default Signup;
