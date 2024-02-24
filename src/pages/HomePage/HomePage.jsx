import { Box, Container, Flex } from "@chakra-ui/react";
import Navigation from "../../components/Navbar/Navigation";
import ProductListing from "../../components/ProductPosts/ProductListing";
import { Button, ButtonGroup } from "@chakra-ui/react";

const HomePage = (client) => {
  return (
    // <>
    //   {/* <div className="header">
    // 		  	<Header/>
    // 	  </div> */}
    // 	  <Navigation user={client} />
    //   {/* <ProductListing/> */}
    // </>

    <Container paddingTop="unset" maxW={"container.lg"}>
      <Navigation />
    </Container>

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
