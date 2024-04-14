import {
  Avatar,
  AvatarGroup,
  Button,
  ChakraProvider,
  Flex,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";

import useUserProfileStore from "../../store/userProfileStore";
import useAuthStore from "../../store/authStore";
import EditProfile from "./EditProfile";
import useFollowUser from "../../hooks/useFollowUser";
import "./ProfileHeader.css";
import useShowToast from "../../hooks/useShowToast";
import useDeleteAccount from "../../hooks/useDeleteAccount";
import useMakeAdmin from "../../hooks/useMakeAdmin";

const ProfileHeader = () => {
  const userProfile = useUserProfileStore((state) => state.userProfile);
  // const { userProfile } = useUserProfileStore();
  const { makeAdmin, unmakeAdmin } = useMakeAdmin();
  const authUser = useAuthStore((state) => state.user);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const showToast = useShowToast();
  const { deleteAccount } = useDeleteAccount();
  // const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(userProfile?.uid);
  const visitingOwnProfileAndAuth =
    authUser && authUser.username === userProfile.username;
  const visitingAnotherProfileAndAuth =
    authUser && authUser.username !== userProfile.username;

  const DeleteUser = (user, e) => {
    e.preventDefault();
    // console.log("User info: " + user);
    deleteAccount(user, e);
  };

  const MakeAdmin = (user) => {
    makeAdmin(user);
  };

  const RemoveAdmin = (user) => {
    unmakeAdmin(user);
  };

  return (
    <ChakraProvider>
      <Flex
        gap={{ base: 4, sm: 10 }}
        py={10}
        direction={{ base: "column", sm: "row" }}
        // bg={"#272b34"}
        width={"100vw"}
      >
        <AvatarGroup
          size={{ base: "xl", md: "2xl" }}
          justifySelf={"center"}
          alignSelf={"flex-start"}
          mx={"auto"}
        >
          <Avatar src={userProfile.profilePicURL} alt="As a programmer logo" />
        </AvatarGroup>

        <VStack alignItems={"start"} gap={2} mx={"auto"} flex={1}>
          <Flex
            gap={4}
            direction={{ base: "column", sm: "row" }}
            justifyContent={{ base: "center", sm: "flex-start" }}
            alignItems={"center"}
            w={"full"}
          >
            <Text fontSize={{ base: "sm", md: "lg" }} fontWeight={"bold"}>
              {userProfile.fullName}
            </Text>
            {visitingOwnProfileAndAuth && (
              <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
                <ChakraProvider>
                  <Button
                    bg={"blue"}
                    color={"white"}
                    _hover={{ bg: "whiteAlpha.800" }}
                    size={{ base: "xs", md: "sm" }}
                    onClick={onOpen}
                  >
                    Edit Profile
                  </Button>
                </ChakraProvider>
                {authUser.isAdmin && (
                  <Button
                    bg={"#272b34"}
                    color={"white"}
                    className="box"
                    size={{ base: "xs", md: "sm" }}
                  >
                    ADMIN
                  </Button>
                )}

                <Button
                  bg={"Red"}
                  color={"white"}
                  _hover={{ bg: "blue.600" }}
                  size={{ base: "xs", md: "sm" }}
                  onClick={(e) => DeleteUser(authUser, e)}
                >
                  Delete Account
                </Button>
              </Flex>
            )}
            {visitingAnotherProfileAndAuth && (
              <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
                <ChakraProvider>
                  {console.log("User profile: " + userProfile.isAdmin)}
                  {userProfile.isAdmin && (
                    <Button
                      bg={"#272b34"}
                      color={"white"}
                      className="box"
                      size={{ base: "xs", md: "sm" }}
                    >
                      ADMIN
                    </Button>
                  )}

                  {!userProfile.isAdmin && (
                    <Button
                      bg={"#272b34"}
                      color={"white"}
                      className="box"
                      size={{ base: "xs", md: "sm" }}
                      onClick={() => MakeAdmin(userProfile)}
                    >
                      Make ADMIN
                    </Button>
                  )}
                  {authUser.isAdmin && userProfile.isAdmin && (
                    <Button
                      bg={"Red"}
                      color={"white"}
                      _hover={{ bg: "blue.600" }}
                      size={{ base: "xs", md: "sm" }}
                      onClick={() => RemoveAdmin(userProfile)}
                    >
                      Remove Admin
                    </Button>
                  )}
                </ChakraProvider>
              </Flex>
            )}
          </Flex>

          <Flex alignItems={"center"} gap={{ base: 2, sm: 4 }}>
            <Text fontSize={{ base: "xs", md: "sm" }}>
              <Text as="span" fontWeight={"bold"} mr={1}>
                {userProfile.posts.length}
              </Text>
              Posts
            </Text>
          </Flex>
          <Flex alignItems={"center"} gap={4}>
            <Text fontSize={"sm"} fontWeight={"bold"}>
              {"@" + userProfile.username}
            </Text>
          </Flex>
          <Text fontSize={"sm"}>{userProfile.bio}</Text>
        </VStack>
        {isOpen && <EditProfile isOpen={isOpen} onClose={onClose} />}
      </Flex>
    </ChakraProvider>
  );
};

export default ProfileHeader;
