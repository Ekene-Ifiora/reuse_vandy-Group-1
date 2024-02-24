import { Box, ChakraProvider, Container, Flex } from "@chakra-ui/react";
import Navigation from "../../components/Navbar/Navigation";
import ProductListing from "../../components/ProductPosts/ProductListing";
import { Button, ButtonGroup } from "@chakra-ui/react";
import "./Homepage.css";
import ChatsPage from "../../components/Chat/chatsPage";

const HomePage = (client) => {
  return (
    <>
      <div className="navbar">
        <Navigation />
      </div>
      <div className="productListing">
        <ProductListing />
      </div>
    </>
  );
};

export default HomePage;
