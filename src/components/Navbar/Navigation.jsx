import { CiLogout } from "react-icons/ci";
import {
  IoChatboxEllipsesOutline,
  IoCartOutline,
  IoHomeOutline,
} from "react-icons/io5";
import useLogout from "../../hooks/useLogout";
import "./Navigation.css";
import CreatePost from "../../components/Sidebar/CreatePost";
import "@chakra-ui/react";
import { ChakraProvider, Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import SearchProduct from "../../components/Sidebar/SearchProduct";
import useAuthStore from "../../store/authStore";
import React, { useState, useEffect } from "react";
import Avatar from "react-avatar";
import { LiaUsersCogSolid } from "react-icons/lia";

const Navigation = ({
  showSearchIcon = true,
  showProfileIcon = true,
  showHomeIcon = true,
  showCartIcon = true,
  showLogoutIcon = true,
}) => {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  const { handleLogout, isLoggingOut } = useLogout();
  const authUser = useAuthStore((state) => state.user);

  const goToProfile = () => {
    if (user) {
      navigate(`/${authUser.username}`); // Navigate using the user's UID
    }
  };

  const goToCart = () => {
    if (user) {
      navigate(`/${authUser.username}/cart`); // Navigate using the user's UID
    }
  };

  const goToUsersList = () => {
    if (user) {
      navigate(`/${authUser.username}/userslist`); // Navigate using the user's UID
    }
  };

  const goToChat = () => {
    if (user) {
      navigate(`/${authUser.username}/chat`); // Navigate using the user's UID
    }
  };

  const goToHome = () => {
    if (user) {
      navigate(`/`); // Navigate using the user's UID
    }
  };

  return (
    <ChakraProvider>
      <nav>
        <div className="searchbar">
          {showSearchIcon && <SearchProduct className="nav-icons" />}
        </div>
        <div className="profile-container">
          {authUser && showProfileIcon ? (
            <Avatar
              color={Avatar.getRandomColor("sitebase", [
                "red",
                "green",
                "blue",
              ])}
              src={authUser.profilePicURL}
              round={true}
              size="30"
              textSizeRatio={2.5}
              maxInitials={2}
              onClick={goToProfile}
            />
          ) : (
            showProfileIcon && <Spinner size="sm" />
          )}
        </div>
        <div className="home">
          {showHomeIcon && (
            <IoHomeOutline onClick={goToHome} className="nav-icons" />
          )}
        </div>
        <div className="create">
          <CreatePost className="nav-icons" />
        </div>
        <div className="cart">
          {showCartIcon && (
            <IoCartOutline onClick={goToCart} className="nav-icons" />
          )}
        </div>
        <div className="users">
          {authUser && authUser.isAdmin && (
            <LiaUsersCogSolid onClick={goToUsersList} className="nav-icons" />
          )}
        </div>
        <div className="chat">
          <IoChatboxEllipsesOutline onClick={goToChat} className="nav-icons" />
        </div>

        <div className="logout">
          {showLogoutIcon && (
            <CiLogout onClick={handleLogout} className="nav-icons" />
          )}
        </div>
      </nav>
    </ChakraProvider>
  );
};

export default Navigation;
