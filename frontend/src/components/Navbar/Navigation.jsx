import { FiHeart } from "react-icons/fi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { CiLogout } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import useLogout from "../../hooks/useLogout";
import "./Navigation.css";
import { IoCreateOutline } from "react-icons/io5";
import ChatsPage from "../Chat/chatsPage";
import CreatePost from "../../components/Sidebar/CreatePost";
import "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom'; 
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/firebase'; 

const Navigation = ({ handleInputChange, query }) => {
    const navigate = useNavigate();
    const [user, loading, error] = useAuthState(auth);
    const { handleLogout, isLoggingOut } = useLogout();

    const goToProfile = () => {
      if (user) {
        navigate(`/profile/${user.uid}`); // Navigate using the user's UID
      }
    };

  // const navigate = useNavigate();
  const createPost = () => {
    // navigate(<CreatePost/>);
  };
  // const createPost = newLocal;

  return (
    <ChakraProvider>
      <nav>
        <div className="searchbar">
          <input
            className="search-input"
            type="text"
            onChange={handleInputChange}
            value={query}
            placeholder="Enter your search item."
          />
        </div>
        <div className="profile-container">
            <CgProfile onClick={goToProfile} className="nav-icons" />
        </div>
        <div className="likes">
          <a href="#">
            <FiHeart className="nav-icons"> </FiHeart>
          </a>
        </div>
        <div className="chat">
          <a href="../Chat/chatsPage">
            <IoChatboxEllipsesOutline className="nav-icons" />
          </a>
        </div>
        <div className="create">
          <CreatePost className="nav-icons" />
        </div>
        <div className="logout">
          <CiLogout onClick={handleLogout} className="nav-icons" />
        </div>
      </nav>
    </ChakraProvider>
  );
};

export default Navigation;
