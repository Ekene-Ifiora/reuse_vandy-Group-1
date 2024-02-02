import React from "react";
import * as Components from './Styles/Components'
import { Alert, AlertIcon, Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import useSignUpWithEmailAndPassword from "../../hooks/useSignUpWithEmailAndPassword";

const Signup = () => {
  // State for storing email and password inputs
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });

  // Custom hook for handling login functionality
  const { loading, error, signup } = useSignUpWithEmailAndPassword();
  return (
    <>
                <Components.Form>
                    <Components.Title>Create Account</Components.Title>
                    <Components.Input type='name' placeholder='Full Name' value={inputs.fullName} onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}/>
                    <Components.Input type='username' placeholder='Username' value={inputs.username} onChange={(e) => setInputs({ ...inputs, username: e.target.value })}/>
                    <Components.Input type='email' placeholder='Email' value={inputs.email} onChange={(e) => setInputs({ ...inputs, email: e.target.value })}/>
                    <Components.Input type='password' placeholder='Password' value={inputs.password} onChange={(e) => setInputs({ ...inputs, password: e.target.value })}/>
                    <Components.Anchor href='#'>Forgot your password?</Components.Anchor>
                    <Components.Button isLoading={loading} onClick={() => signup(inputs)}>Sign Up</Components.Button>
                </Components.Form>


        {/* Display error message if login fails */}
        {error && (
            <Alert status='error' fontSize={13} p={2} borderRadius={4}>
                <AlertIcon fontSize={12} />
                {error.message}
            </Alert>
        )}
    </>


  );
};

export default Signup;
