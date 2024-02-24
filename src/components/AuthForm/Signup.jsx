import React from "react";
import * as Components from "./Styles/Components";
import { useState } from "react";
// import { auth } from "../../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import useSignUpWithEmailAndPassword from "../../hooks/useSignUpWithEmailAndPassword";
import { app, auth, firestore, storage } from "../../firebase/firebase";
import { doc, setDoc, Timestamp } from "firebase/firestore";

const Signup = () => {
  // State for storing email and password inputs
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    signupError: "",
  });

  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(
      auth,
      inputs.email,
      inputs.password,
      inputs.fullName,
      inputs.username
    )
      .then((userCredential) => {
        const userObj = {
          bio: "",
          createdAt: Timestamp.now(),
          email: userCredential.user.email,
          username: userCredential.user.username,
          posts: [],
          chats: [],
          profilePicURL: "",
          uid: "",
          friends: [],
          messages: [],
        };
        setDoc(doc(firestore, "users", userCredential.user.email), userObj);
      })
      .catch((error) => {
        console.log(error);
      });
    // ).then(
    //   (authRes) => {
    // const userObj = {
    //   email: authRes.user.email,
    //   friends: [],
    //   messages: [],
    // };
    //     // firebase
    //     firestore()
    //       .collection("users")
    //       .doc(this.state.email)
    //       .set(userObj)
    //       .then(
    //         () => {
    //           // this.props.history.push('/dashboard');
    //         },
    //         (dbErr) => {
    //           console.log("Failed to add user to the database: ", dbErr);
    //           // this.setState({ signupError: 'Failed to add user' });
    //         }
    //       );
    //   },
    //   (authErr) => {
    //     console.log("Failed to create user: ", authErr);
    //     // this.setState({ signupError: "Failed to add user" });
    //   }
    // );
  };

  // Custom hook for handling login functionality
  const { loading, error, signup } = useSignUpWithEmailAndPassword();
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
        <Components.Button
          type="submit"
          isLoading={loading}
          onClick={() => signup(inputs)}
        >
          Sign Up
        </Components.Button>
      </Components.Form>
    </>
  );
};

export default Signup;
