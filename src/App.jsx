import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import PageLayout from "./Layouts/PageLayout/PageLayout";
import { BrowserRouter as Router } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";
import { useState } from "react";
import CartPage from "./pages/CartPage/CartPage";
import ChatPage from "./pages/ChatPage/ChatPage";
import UserListPage from "./pages/UsersPage/UsersListPage";

function App() {
  const [authUser] = useAuthState(auth);
  const [user, setUser] = useState();

  return (
    <div>
      <Router>
        <Routes>
          {/* If user is authenticated, show the home page, else navigate to the authentication page */}
          <Route
            path="/"
            element={
              authUser ? <HomePage user={user} /> : <Navigate to="/auth" />
            }
          />

          {/* If user is not authenticated, show the authentication page, else navigate to the home page */}
          <Route
            path="/auth"
            element={
              !authUser ? (
                <AuthPage onAuth={(user) => setUser(user)} />
              ) : (
                <Navigate to="/" />
              )
            }
          />

          {/* Route to the profile page with dynamic username parameter */}
          <Route path="/:username" element={<ProfilePage />} />

          {/* Route to the cart page*/}
          <Route path="/:username/cart" element={<CartPage />} />

          {/* Route to the cart page*/}
          <Route path="/:username/userslist" element={<UserListPage />} />

          {/* Route to the chat page*/}
          {/* <Route path="/:username/chat" element={<ChatPage />} /> */}
          <Route path="/:username/chat" element={<ChatPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
