import { Box, Container, Flex } from "@chakra-ui/react";
import ProductPost from "../../components/ProductPosts/ProductPost";
import SuggestedUsers from "../../components/SuggestedUsers/SuggestedUsers";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navigation from "../../components/Navbar/Navigation";
import Header from "../../components/Navbar/Header";
import ProductListing from "../../components/ProductPosts/ProductListing";

const HomePage = () => {
  return (
    <>
      {/* <div className="header">
			  	<Header/>
		  </div> */}
      <Navigation />
      {/* <ProductListing/> */}
    </>

    // <Container maxW={"container.lg"}>
    // 	<Flex gap={20}>
    // 	<Box w={{ base: "70px", md: "240px" }}>
    // 			<Sidebar />
    // 		</Box>
    // 		<Box flex={3} mr={20} display={{ base: "none", lg: "block" }} maxW={"300px"}>

    // 		</Box>
    // 	</Flex>
    // </Container>

    // <Container maxW={"container.lg"}>
    // 	<Flex gap={20}>
    // 	<Box w={{ base: "70px", md: "240px" }}>
    // 			<Sidebar />
    // 		</Box>
    // 		<Box flex={3} mr={20} display={{ base: "none", lg: "block" }} maxW={"300px"}>

    // 		</Box>
    // 	</Flex>
    // </Container>
  );
};

export default HomePage;
