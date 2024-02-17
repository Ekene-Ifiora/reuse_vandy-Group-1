import { FiHeart } from "react-icons/fi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { CiLogout } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import useLogout from "../../hooks/useLogout";
import "./Navigation.css";

const Navigation = ({ handleInputChange, query }) => {
    const { handleLogout, isLoggingOut } = useLogout();
  return (
    <nav>
      <div className="nav-container">
        <input
          className="search-input"
          type="text"
          onChange={handleInputChange}
          value={query}
          placeholder="Enter your search item."
        />
      </div>
      <div className="profile-container">
        <a href="#">
          <FiHeart className="nav-icons" />
        </a>
        <a href="">
          <AiOutlineShoppingCart className="nav-icons" />
        </a>
        <a href="">
            <CgProfile className="nav-icons"/>
        </a>
        <a href="">
        <CiLogout onClick={handleLogout} className="nav-icons"/>
        </a>
      </div>
    </nav>
  );
};

export default Navigation;