import {Button, ChakraProvider, Container, Flex, Link, Skeleton, SkeletonCircle, Text, VStack } from "@chakra-ui/react";
import ProfileHeader from "../../components/Profile/ProfileHeader";
import ProfileTabs from "../../components/Profile/ProfileTabs";
import ProfilePosts from "../../components/Profile/ProfilePosts";
import useGetUserProfileById from "../../hooks/useGetUserProfileById";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useParams } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { auth } from '../../firebase/firebase'; 
import { useColorMode } from "@chakra-ui/react";

const ProfilePage = () => {
	const [user] = useAuthState(auth);
	

    const { isLoading, userProfile } = useGetUserProfileById(user?.uid);
	const { colorMode } = useColorMode();

  	console.log("Current color mode:", colorMode);
	// console.log('User:', user);
	// if (user) {
	// 	console.log("User UID:", user.uid);
	// } else {
	// 	console.log("User is null at this point.");
	// }
    // console.log('isLoading:', isLoading, 'userProfile:', userProfile);
	// const userNotFound = !isLoading && !userProfile;
	// if (userNotFound) return <UserNotFound user={user}/>;

	return (
		<Container maxW='container.lg' py={5}>
			<Flex py={10} px={4} pl={{ base: 4, md: 10 }} w={"full"} mx={"auto"} flexDirection={"column"}>
				<ProfileHeader />
				{/* {!isLoading && userProfile && <ProfileHeader />}
				{isLoading && <ProfileHeaderSkeleton />} */}
			</Flex>
			<Flex
				px={{ base: 2, sm: 4 }}
				maxW={"full"}
				mx={"auto"}
				borderTop={"1px solid"}
				borderColor={"whiteAlpha.300"}
				direction={"column"}
			>
				<ProfileTabs />
				<ProfilePosts />
			</Flex>
		<Button colorScheme='blue'>Button</Button>
		</Container>
	);
};
 
export default ProfilePage;

// skeleton for profile header
const ProfileHeaderSkeleton = () => {
	return (
		<Flex
			gap={{ base: 4, sm: 10 }}
			py={10}
			direction={{ base: "column", sm: "row" }}
			justifyContent={"center"}
			alignItems={"center"}
		>
			<SkeletonCircle size='24' />

			<VStack alignItems={{ base: "center", sm: "flex-start" }} gap={2} mx={"auto"} flex={1}>
				<Skeleton height='12px' width='150px' />
				<Skeleton height='12px' width='100px' />
			</VStack>
		</Flex>
	);
};

// const UserNotFound = ({user}) => {
// 	return (
// 		<Flex flexDir='column' textAlign={"center"} mx={"auto"}>
// 			{user && <Text>Email: {user.email}</Text>}
// 				<ProfileTabs />
// 				<ProfilePosts />
// 			<Link as={RouterLink} to={"/"} color={"blue.500"} w={"max-content"} mx={"auto"}>
// 				Go home
// 			</Link>
// 		</Flex>
// 	);
// };
