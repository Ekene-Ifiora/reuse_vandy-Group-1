// import { PrettyChatWindow } from "react-chat-engine-pretty";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "../../firebase/firebase";
// import { useEffect } from "react";
// import useAuthStore from "../../store/authStore";
// import Navigation from "../../components/Navbar/Navigation";

// const ChatPage = ({ createNewChat }) => {
//   // Accept createNewChat function as prop
//   const [user] = useAuthState(auth);
//   const authUser = useAuthStore((state) => state.user);

//   useEffect(() => {
//     if (createNewChat) {
//       // Check if createNewChat function is provided
//       createNewChat(authUser.userName); // Call createNewChat with userName as parameter
//     }
//   }, [createNewChat]); // useEffect will re-run when createNewChat function changes

//   return (
//     <>
//       <div className="navbar" style={{ height: "10vh" }}>
//         <Navigation
//           showProfileIcon={true}
//           showHomeIcon={true}
//           showCartIcon={false}
//           showLogoutIcon={false}
//         />
//       </div>
//       <div style={{ height: "90vh", width: "100vw", marginTop: "10vh" }}>
//         <PrettyChatWindow
//           projectId={"282eceef-5a55-4bac-9587-7e367d4ad838"}
//           username={authUser.username || ""}
//           secret={authUser.username || ""}
//           httpUrl=""
//           style={{ height: "100%" }}
//           onSendMessage={(message) => console.log("Message sent:", message)}
//           id="pretty-chat-window"
//         />
//       </div>
//     </>
//   );
// };

// export default ChatPage;

import React, { useState, useEffect } from "react";
import { ChatEngine, getOrCreateChat, newChat } from "react-chat-engine";
import { useAuthState } from "react-firebase-hooks/auth";
import Navigation from "../../components/Navbar/Navigation";
import useAuthStore from "../../store/authStore";
import { auth } from "../../firebase/firebase";

const ChatPage = ({ sellerUsername = ""}) => {
  const [username, setUsername] = useState("");
  const [user] = useAuthState(auth);
  const authUser = useAuthStore((state) => state.user);
  const [conn, setConn] = useState(null);

  console.log("Seller Name: " + sellerUsername);

  if (sellerUsername != "") {
    newChat(conn, )
  }
  
  // Function to create a direct chat with the seller
  // function createDirectChat(creds) {
  //   getOrCreateChat(
  //     creds,
  //     { is_direct_chat: true, usernames: [authUser.username, sellerUsername] },
  //     () => setUsername("")
  //   );
  // }

  // useEffect(() => {
  //   // Create a chat with the seller when the component mounts
  //   if (sellerUsername) {
  //     createDirectChat({ userName: authUser.username, userSecret: authUser.username });
  //   }
  // }, [sellerUsername]);

  // Render the chat engine
  return (
    <>
      <div className="navbar" style={{ height: "10vh" }}>
        <Navigation
          showProfileIcon={true}
          showHomeIcon={true}
          showCartIcon={false}
          showLogoutIcon={false}
        />
      </div>
      <div style={{ height: "70vh", width: "100vw", marginTop: "10vh", zIndex: "-1" }}>
        <ChatEngine
          height="90vh"
          userName={authUser.username}
          userSecret={authUser.username}
          projectID={"a79bb6db-97ca-4daa-89bd-ffc7035a69c6"}
        />
      </div>
    </>
  );
};

export default ChatPage;