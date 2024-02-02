import React from "react";
import * as Components from './Styles/Components'
import { Alert, AlertIcon, Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

 function AuthForm() {
    const [isLogin, setIsLogin] = useState(true);
     const [signIn, toggle] = React.useState(true);
     const [inputs, setInputs] = useState({
        email: "",
        password: "",
        name: "",
      });
        
      return(
          <Components.Container>
              <Components.SignUpContainer signinIn={signIn}>
               <Signup/>   
              </Components.SignUpContainer>
                
               <Components.SignInContainer signinIn={signIn}>
                <Login/>
              </Components.SignInContainer>

              <Components.OverlayContainer signinIn={signIn}>
                  <Components.Overlay signinIn={signIn}>

                  <Components.LeftOverlayPanel signinIn={signIn}>
                      <Components.Title>Welcome Back!</Components.Title>
                      <Components.Paragraph>
                          To keep connected with us please login with your personal info
                      </Components.Paragraph>
                      <Components.GhostButton onClick={() => toggle(true)}>
                          Sign In
                      </Components.GhostButton>
                      </Components.LeftOverlayPanel>


                      <Components.RightOverlayPanel signinIn={signIn}>
                        <Components.Title>Hello, Commodore!</Components.Title>
                        <Components.Paragraph>
                            Enter Your personal details and start journey with us
                        </Components.Paragraph>
                            <Components.GhostButton onClick={() => toggle(false)}>
                                Sign Up
                            </Components.GhostButton> 
                      </Components.RightOverlayPanel>
  
                  </Components.Overlay>
              </Components.OverlayContainer>
          </Components.Container>
      )
 }

 export default AuthForm;