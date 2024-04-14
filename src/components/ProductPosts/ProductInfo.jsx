import "./ProductInfo.css";
import React from "react";
import { MdDelete } from "react-icons/md";
import { Box, Image, Heading, Text, Button, VStack } from "@chakra-ui/react";
import Navigation from "../../components/Navbar/Navigation";
import { ChakraProvider } from "@chakra-ui/react";
import Comment from "../Comment/Comment";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import ChatPage from "../../pages/ChatPage/ChatPage";
import { newChat } from "react-chat-engine";
import { useState } from "react";
import { deleteObject, ref } from "firebase/storage";
import { firestore, storage } from "../../firebase/firebase";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import useShowToast from "../../hooks/useShowToast";
import usePostStore from "../../store/postStore";
import useUserProfileStore from "../../store/userProfileStore";
import useGetUserProfileById from "../../hooks/useGetUserProfileById";
import { Link } from "react-router-dom";
import { Avatar, Flex, Skeleton, SkeletonCircle } from "@chakra-ui/react";
import PostFooter from "../ProductPosts/PostFooter";

const ProductInfo = ({ open, onClose, item }) => {
  const { isImageOpen, onImageOpen, onImageClose } = useDisclosure();
  const navigate = useNavigate();
  const authUser = useAuthStore((state) => state.user);
  const [isDeleting, setIsDeleting] = useState(false);
  const showToast = useShowToast();
  const deletePost = usePostStore((state) => state.deletePost);
  const decrementPostsCount = useUserProfileStore((state) => state.deletePost);
  const { userProfile, isLoading } = useGetUserProfileById(item.createdBy);

  const goToChat = (item) => {
    if (authUser) {
      <ChatPage sellerUsername={item.sellerName} />;
      navigate(`/${authUser.username}/chat`); // Navigate using the user's UID
    }
  };

  const handleDeletePost = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    if (isDeleting) return;

    try {
      const imageRef = ref(storage, `posts/${item.id}`);
      await deleteObject(imageRef);
      const userRef = doc(firestore, "users", authUser.uid);
      await deleteDoc(doc(firestore, "posts", item.id));

      await updateDoc(userRef, {
        posts: arrayRemove(item.id),
      });

      deletePost(item.id);
      decrementPostsCount(item.id);
      showToast("Success", "Post deleted successfully", "success");
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsDeleting(false);
    }
  };

  if (!open) return null;
  return (
    <ChakraProvider>
      {!isLoading && (
        <Modal isOpen={open} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent bg={"#272b34"}>
            <ModalHeader
              color="white"
              fontSize={"large"}
              fontWeight={"bold"}
              align="center"
            >
              {item.name}
            </ModalHeader>
            <ModalCloseButton color={"white"} />
            <ModalBody pb={6} color={"white"}>
              {/* <img src={item.imageURL} className="itemImage" /> */}
              {/* Description and Auction Details */}
              <VStack align="center" spacing={4}>
                {/* Product Image */}
                <Image
                  src={item.imageURL}
                  alt="Product Image"
                  boxSize="150px"
                  borderRadius={"20px"}
                />

                {/* Product Description */}
                <Text>{item.description}</Text>

                <Text as="b">Buy Now Price: {"$" + item.buyNowPrice}</Text>
                {/* Auction Details */}
                {item.inAuction && (
                  <VStack spacing={2}>
                    <Button colorScheme="teal" size="md">
                      Participate in Auction
                    </Button>

                    <Text>Starting Price: {item.startingPrice}</Text>
                    <Text>Current Price: {item.currentPrice}</Text>
                    <Text>Time Remaining: {item.timeRemaining}</Text>
                  </VStack>
                )}
              </VStack>
              {/* Seller Information */}
              <Box
                mt={8}
                bg="#fe8033"
                maxW="md"
                borderRadius="lg"
                borderColor="gray.200"
                marginLeft={10}
                color={"white"}
              >
                <Heading as="h3" size="md" align="center" color={"#272b34"}>
                  Seller Information
                </Heading>
                <Flex direction="row" alignItems="center">
                  <Link to={`/${userProfile.username}`}>
                    <Avatar
                      marginLeft={2}
                      src={userProfile.profilePicURL}
                      size="md"
                    />
                  </Link>
                  <Flex direction="column" marginLeft={2}>
                    <Link to={`/${userProfile.username}`}>
                      <Text fontWeight="bold" fontSize={12}>
                        <Text marginLeft={2}>
                          {" "}
                          Username: @{userProfile.username}
                        </Text>
                        <Text marginLeft={2}>Seller: {item.sellerName} </Text>
                        <Text marginLeft={2}>
                          Contact email: {item.sellerEmail}
                        </Text>
                      </Text>
                    </Link>
                  </Flex>
                </Flex>

                <Button
                  bg={"#272b34"}
                  _hover={{ bg: "#272b34", color: "orange" }}
                  borderRadius={4}
                  p={1}
                  mt={4}
                  color={"white"}
                  marginLeft={"170px"}
                  marginRight={"170px"}
                  marginBottom={2}
                  size={"sm"}
                  onClick={() => goToChat(item)}
                >
                  Contact Seller
                </Button>
              </Box>

              <Box
                mt={8}
                bg="#fe8033"
                maxW="md"
                borderRadius="lg"
                marginLeft={10}
                color={"white"}
              >
                <Heading as="h3" size="md" align="center" color={"#272b34"}>
                  Comments
                </Heading>

                <VStack
                  w="full"
                  alignItems={"start"}
                  maxH={"350px"}
                  overflow={"auto"}
                  marginLeft={2}
                >
                  {item.comments.map((comment) => (
                    <Comment key={comment.id} comment={comment} />
                  ))}
                </VStack>

                <Button
                  bg={"#272b34"}
                  _hover={{ bg: "#272b34", color: "orange" }}
                  borderRadius={4}
                  p={1}
                  mt={4}
                  color={"white"}
                  marginLeft={"170px"}
                  marginRight={"170px"}
                  marginBottom={2}
                  size={"sm"}
                  // onClick={() => {`/${userProfile.username}`}}
                >
                  Add Comment
                </Button>

                {/* <PostFooter
                  post={item}
                  
                  username={userProfile.username}
                  // isProfilePage={true}
                /> */}

                {authUser.isAdmin && (
                  <Button
                    size={"sm"}
                    bg={"transparent"}
                    _hover={{ bg: "#272b34", color: "orange" }}
                    borderRadius={4}
                    p={1}
                    marginLeft={"210px"}
                    marginRight={"210px"}
                    onClick={handleDeletePost}
                    isLoading={isDeleting}
                    color="red"
                  >
                    <MdDelete size={20} cursor="pointer" />
                  </Button>
                )}
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </ChakraProvider>
  );
};

export default ProductInfo;
