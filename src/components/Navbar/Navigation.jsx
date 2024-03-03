import { CiLogout } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import {
  IoChatboxEllipsesOutline,
  IoCartOutline,
  IoHomeOutline,
} from "react-icons/io5";
import useLogout from "../../hooks/useLogout";
import "./Navigation.css";
import CreatePost from "../../components/Sidebar/CreatePost";
import "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import SearchProduct from "../../components/Sidebar/SearchProduct";
import useAuthStore from "../../store/authStore";
import { Link } from "react-router-dom";

const Navigation = ({
  handleInputChange,
  query,
  showProfileIcon,
  showHomeIcon,
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

  const goToHome = () => {
    if (user) {
      navigate(`/`); // Navigate using the user's UID
    }
  };

  return (
    <ChakraProvider>
      <nav>
        <div className="searchbar">
          <SearchProduct className="nav-icons" />
        </div>
        <div className="profile-container">
          {showProfileIcon && (
            <CgProfile onClick={goToProfile} className="nav-icons" />
          )}
          {/* <Link to={`/${authUser.username}`}>
            <CgProfile className="nav-icons" />
          </Link> */}
        </div>
        <div className="home">
          {showHomeIcon && (
            <IoHomeOutline onClick={goToHome} className="nav-icons" />
          )}
        </div>
        <div className="cart">
          <IoCartOutline className="nav-icons" />
        </div>
        <div className="chat">
          <IoChatboxEllipsesOutline className="nav-icons" />
        </div>
        <div className="create">
          <CreatePost className="nav-icons" />
        </div>
        <div className="logout">
          {showProfileIcon && (
            <CiLogout onClick={handleLogout} className="nav-icons" />
          )}
        </div>
      </nav>
    </ChakraProvider>
  );
};

export default Navigation;
