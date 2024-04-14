import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import {
  Flex,
  GridItem,
  Text,
  Image,
  ChakraProvider,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Box,
  Divider,
  ModalCloseButton,
  Avatar,
  VStack,
  Button,
} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import Comment from "../Comment/Comment";
import PostFooter from "../ProductPosts/PostFooter";
import useUserProfileStore from "../../store/userProfileStore";
import useAuthStore from "../../store/authStore";
import useShowToast from "../../hooks/useShowToast";
import { useState } from "react";
import usePostStore from "../../store/postStore";
import { deleteObject, ref } from "firebase/storage";
import { firestore, storage } from "../../firebase/firebase";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { FaDollarSign } from "react-icons/fa6";
import EditPost from "./EditPost";

export const ProfilePost = ({ post }) => {
  const [isDetailsOpen, setDetailsOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);
  const userProfile = useUserProfileStore((state) => state.userProfile);
  const authUser = useAuthStore((state) => state.user);
  const showToast = useShowToast();
  const [isDeleting, setIsDeleting] = useState(false);
  const deletePost = usePostStore((state) => state.deletePost);
  const decrementPostsCount = useUserProfileStore((state) => state.deletePost);
  const visitingOwnProfileAndAuth =
    authUser && authUser.username === userProfile.username;

  const handleDetailsOpen = () => {
    setDetailsOpen(true);
    setEditOpen(false);
  };

  const handleDetailsClose = () => {
    setDetailsOpen(false);
  };

  const handleEditOpen = () => {
    setEditOpen(true);
    setDetailsOpen(false);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleDeletePost = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    if (isDeleting) return;

    try {
      const imageRef = ref(storage, `posts/${post.id}`);
      await deleteObject(imageRef);
      const userRef = doc(firestore, "users", authUser.uid);
      await deleteDoc(doc(firestore, "posts", post.id));

      await updateDoc(userRef, {
        posts: arrayRemove(post.id),
      });

      deletePost(post.id);
      decrementPostsCount(post.id);
      showToast("Success", "Post deleted successfully", "success");
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <ChakraProvider>
      <>
        <GridItem
          cursor={"pointer"}
          borderRadius={4}
          overflow={"hidden"}
          border={"1px solid"}
          borderColor={"whiteAlpha.300"}
          position={"relative"}
          aspectRatio={1 / 1}
          onClick={handleDetailsOpen}
        >
          <Flex
            opacity={0}
            _hover={{ opacity: 1 }}
            position={"absolute"}
            top={0}
            left={0}
            right={0}
            bottom={0}
            bg={"blackAlpha.700"}
            transition={"all 0.3s ease"}
            zIndex={1}
            justifyContent={"center"}
          >
            <Flex alignItems={"center"} justifyContent={"center"} gap={50}>
              <Flex>
                <FaDollarSign size={20} color={"white"} />
                <Text fontWeight={"bold"} ml={2} color={"white"}>
                  {post.buyNowPrice}
                </Text>
              </Flex>

              <Flex>
                <FaComment size={20} color={"white"} />
                <Text fontWeight={"bold"} ml={2} color={"white"}>
                  {post.comments.length}
                </Text>
              </Flex>
            </Flex>
          </Flex>

          <Image
            src={post.imageURL}
            alt="profile post"
            w={"100%"}
            h={"100%"}
            objectFit={"cover"}
          />
        </GridItem>

        <Modal
          isOpen={isDetailsOpen}
          onClose={handleDetailsClose}
          isCentered={true}
          size={{ base: "3xl", md: "5xl" }}
        >
          <ModalOverlay />
          <ModalContent>
            {/* <ModalHeader>Modal Title</ModalHeader> */}
            <ModalCloseButton />
            <ModalBody bg={"white"} pb={"5"}>
              <Flex
                gap="4"
                w={{ base: "90%", sm: "70%", md: "full" }}
                mx={"auto"}
                maxH={"90vh"}
                minH={"50vh"}
              >
                <Flex
                  borderRadius={4}
                  overflow={"hidden"}
                  border={"1px solid"}
                  borderColor={"whiteAlpha.300"}
                  flex={1.5}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Image src={post.imageURL} alt="profile post" />
                </Flex>

                <Flex
                  flex={1}
                  flexDir={"column"}
                  px={10}
                  display={{ base: "none", md: "flex" }}
                >
                  <Flex alignItems={"center"} justifyContent={"space-between"}>
                    <Flex alignItems={"center"} gap={4}>
                      <Avatar
                        src={userProfile.profilePicURL}
                        size={"sm"}
                        name="As a Programmer"
                      />
                      <Text fontWeight={"bold"} fontSize={12}>
                        {userProfile.username}
                      </Text>
                    </Flex>

                    {authUser?.uid === userProfile.uid && (
                      <Button
                        size={"sm"}
                        bg={"transparent"}
                        _hover={{ bg: "whiteAlpha.300", color: "white" }}
                        borderRadius={4}
                        p={1}
                        onClick={handleDeletePost}
                        isLoading={isDeleting}
                      >
                        <MdDelete size={20} cursor="pointer" />
                      </Button>
                    )}
                  </Flex>
                  <Divider my={4} bg={"gray.500"} />

                  <VStack
                    w="full"
                    alignItems={"start"}
                    maxH={"350px"}
                    overflow={"auto"}
                  >
                    {post.comments.map((comment) => (
                      <Comment key={comment.id} comment={comment} />
                    ))}
                  </VStack>
                  <Divider my={4} bg={"gray.800"} />

                  <PostFooter
                    post={post}
                    username={userProfile.username}
                    isProfilePage={true}
                  />

                  {visitingOwnProfileAndAuth && (
                    <Flex
                      gap={1}
                      alignItems={"center"}
                      justifyContent={"flex-end"}
                    >
                      <CiEdit size={20} />
                      <ChakraProvider>
                        <Button
                          bg={"white"}
                          color={"black"}
                          _hover={{ bg: "whiteAlpha.800" }}
                          size={{ base: "xs", md: "sm" }}
                          onClick={handleEditOpen}
                        >
                          Edit
                        </Button>
                      </ChakraProvider>
                    </Flex>
                  )}
                </Flex>
              </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>

        {isEditOpen && (
          <EditPost post={post} isOpen={isEditOpen} onClose={handleEditClose} />
        )}
      </>
    </ChakraProvider>
  );
};

export default ProfilePost;
