import Navigation from "../../components/Navbar/Navigation";
import ProductListing from "../../components/ProductPosts/ProductListing";
import "./Homepage.css";

const HomePage = (client) => {
  return (
    <div className="fullPage">
      <div className="navbar">
        <Navigation showProfileIcon={true} showHomeIcon={false} />
      </div>
      <div className="productListing">
        <ProductListing />
      </div>
    </div>
  );
};

export default HomePage;
