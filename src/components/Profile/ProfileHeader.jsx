import { Avatar, AvatarGroup, Button, Flex, Text, VStack, useDisclosure } from "@chakra-ui/react";

import useUserProfileStore from "../../store/userProfileStore";
import useAuthStore from "../../store/authStore";
import EditProfile from "./EditProfile";
import useFollowUser from "../../hooks/useFollowUser";

const ProfileHeader = () => {
	// const { userProfile } = useUserProfileStore();
	// const authUser = useAuthStore((state) => state.user);
	// const { isOpen, onOpen, onClose } = useDisclosure();
	// const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(userProfile?.uid);
	// const visitingOwnProfileAndAuth = authUser && authUser.username === userProfile.username;
	// const visitingAnotherProfileAndAuth = authUser && authUser.username !== userProfile.username;

	return (
		<Flex gap={{ base: 4, sm: 10 }} py={10} direction={{ base: "column", sm: "row" }}>		
				<AvatarGroup size={{ base: "xl", md: "2xl" }} justifySelf={"center"} alignSelf={"flex-start"} mx={"auto"}>
					<Avatar name='As a programmer' src='/profilepic.png' alt='As a programmer logo' />
				</AvatarGroup>

			<VStack alignItems={"start"} gap={2} mx={"auto"} flex={1}>
				<Flex
					gap={4}
					direction={{ base: "column", sm: "row" }}
					justifyContent={{ base: "center", sm: "flex-start" }}
					alignItems={"center"}
					w={"full"}
				>
					<Text fontSize={{ base: "sm", md: "lg" }}>test</Text>
						<Flex gap={4} alignItems={"center"} justifyContent={"center"}>
							<Button
								bg={"white"}
								color={"black"}
								_hover={{ bg: "whiteAlpha.800" }}
								size={{ base: "xs", md: "sm" }}
								// onClick={onOpen}
							>
								Edit Profile
							</Button>
						</Flex>
				</Flex>

				<Flex alignItems={"center"} gap={{ base: 2, sm: 4 }}>
					<Text fontSize={{ base: "xs", md: "sm" }}>
						<Text as='span' fontWeight={"bold"} mr={1}>
							{1}
						</Text>
						Posts
					</Text>
					<Text fontSize={{ base: "xs", md: "sm" }}>
						<Text as='span' fontWeight={"bold"} mr={1}>
							{1}
						</Text>
						Followers
					</Text>
					<Text fontSize={{ base: "xs", md: "sm" }}>
						<Text as='span' fontWeight={"bold"} mr={1}>
							{1}
						</Text>
						Following
					</Text>
				</Flex>
				<Flex alignItems={"center"} gap={4}>
					<Text fontSize={"sm"} fontWeight={"bold"}>
						{}
					</Text>
				</Flex>
			</VStack>
			{/* {isOpen && <EditProfile isOpen={isOpen} onClose={onClose} />} */}
		</Flex>
	);
};

export default ProfileHeader;
