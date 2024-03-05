import Navigation from "../../components/Navbar/Navigation";
import ProductListing from "../../components/ProductPosts/ProductListing";
import "./Homepage.css";

const HomePage = (client) => {
  return (
    <>
      <div className="navbar">
        <Navigation showProfileIcon={true} showHomeIcon={false} />
      </div>
      <div className="productListing">
        <ProductListing />
      </div>
    </>
  );
};

export default HomePage;