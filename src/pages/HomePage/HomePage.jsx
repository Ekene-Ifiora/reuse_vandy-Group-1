import { Box, Container, Flex } from "@chakra-ui/react";
import FeedPosts from "../../components/FeedPosts/FeedPosts";
import SuggestedUsers from "../../components/SuggestedUsers/SuggestedUsers";
import Sidebar from "../../components/Sidebar/Sidebar";
const HomePage = () => {
	return (
		<Container maxW={"container.lg"}>
			<Flex gap={20}>
			<Box w={{ base: "70px", md: "240px" }}>
					<Sidebar />
				</Box>
				<Box flex={3} mr={20} display={{ base: "none", lg: "block" }} maxW={"300px"}>
					
				</Box>
			</Flex>
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
