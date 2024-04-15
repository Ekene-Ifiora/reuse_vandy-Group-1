import "./ProductInfo.css";
import React from "react";
import {
  Box,
  Image,
  Heading,
  Text,
  Tag,
  Button,
  Stack,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { firestore, storage } from "../../firebase/firebase";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import useShowToast from "../../hooks/useShowToast";
import Navigation from "../../components/Navbar/Navigation";
import { ChakraProvider } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import ChatPage from "../../pages/ChatPage/ChatPage";
import { newChat } from "react-chat-engine";
import { useState } from "react";
import { deleteObject, ref } from "firebase/storage";
import { arrayRemove, deleteDoc } from "firebase/firestore";
import usePostStore from "../../store/postStore";
import useUserProfileStore from "../../store/userProfileStore";
import useGetUserProfileById from "../../hooks/useGetUserProfileById";
import { Link } from "react-router-dom";
import { Avatar, Flex, Skeleton, SkeletonCircle } from "@chakra-ui/react";
import PostFooter from "../ProductPosts/PostFooter";
import { useEffect } from "react";
import bidStore from "../../store/bidStore";
import { useLocation } from "react-router-dom";
import useCreateBid from "../../hooks/useCreateBid";
import { ModalFooter } from "@chakra-ui/react";
import Comment from "../Comment/Comment";
import { MdDelete } from "react-icons/md";

const ProductInfo = ({ open, onClose, item }) => {
  const { isOpen: isAuctionOpen, onOpen: onAuctionOpen, onClose: onAuctionClose } = useDisclosure();
  const { isOpen: isBidOpen, onOpen: onBidOpen, onClose: onBidClose } = useDisclosure();
  const [inputs, setInputs] = useState({
    item: "",
    bid: 0, 
    createdAt: Date.now(),
    createdBy: "",
  });
  const navigate = useNavigate();
  const authUser = useAuthStore((state) => state.user);
  const [isDeleting, setIsDeleting] = useState(false);
  const deletePost = usePostStore((state) => state.deletePost);
  const decrementPostsCount = useUserProfileStore((state) => state.deletePost);
  const { userProfile, isLoading } = useGetUserProfileById(item.createdBy);
  const showToast = useShowToast();
  const { isLoadingtwo, handleCreateBid } = useCreateBid();
  const handleBidCreation = async () => {
    try {
      await handleCreateBid(item, inputs);
      onAuctionClose();
      setInputs({
        item: "",
        bid: 0,
        createdAt: Date.now(),
        createdBy: "",
      });
    } catch (error) {
      showToast("Error", 'check', "error");
    }
  };
  // console.log(authUser)
  // console.log(item)

  const [bidderProfiles, setBidderProfiles] = useState({});

  useEffect(() => {
    const fetchBidderProfiles = async () => {
        const profiles = {};
        console.log("Starting to fetch bidder profiles...");

        const sortedBids = item.bids.sort((a, b) => b.bid - a.bid);

        await Promise.all(sortedBids.map(async (bid) => {
            console.log("Processing bid", bid)
            console.log("Processing bid with UID:", bid.createdBy);
            if (!bid.createdBy) {
              console.error("Missing or invalid UID for bid:", bid);
              return;
            }
            const bidderDocRef = doc(firestore, "users", bid.createdBy);
            const docSnap = await getDoc(bidderDocRef);
            if (docSnap.exists()) {
                profiles[bid.createdBy] = docSnap.data();
            }
        }));

        setBidderProfiles(profiles);
    };

    if (item.bids && item.bids.length > 0) {
        fetchBidderProfiles();
    }
  }, [item.bids, firestore]);

  // console.log("BidderProfiles", bidderProfiles)
  const goToChat = (item) => {
    if (authUser) {
      <ChatPage sellerUsername={item.sellerName} />;
      navigate(`/${authUser.username}/chat`); // Navigate using the user's UID
    }
  };

  const contactBidder = (bidderProfile) => {
    if (authUser) {
      <ChatPage bidderUsername={bidderProfile.fullName} />
      navigate(`/${authUser.username}/chat`); // Navigate using the user's UID
    }
  };

  const auctionEndTime = new Date(`${item.auctionDateEnd}T${item.auctionTimeEnd}`);
  const currentTime = new Date();
  const hasAuctionEnded = currentTime > auctionEndTime;

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

                {item.inAuction == "false" && <Text as="b">Buy Now Price: {"$" + item.buyNowPrice}</Text>}
                {/* Auction Details */}
                {item.inAuction == "true" && (
                  <VStack spacing={2}>
                    {item.createdBy !== authUser.uid ? (
                      <HStack spacing={2}>
                        {hasAuctionEnded ? (
                            <Text>The time for this auction has passed.</Text>
                        ) : (
                            <Button colorScheme="teal" size="md" onClick={onAuctionOpen}>
                                Participate in Auction
                            </Button>
                        )}
                        <Button colorScheme="teal" size="md" onClick={onBidOpen}>
                          Show Current Bid
                        </Button>
                      </HStack>
                    ) : (
                        <div>You cannot participate in your own auction.</div>
                    )}
                  </VStack>
                )}
              </VStack>
              {/* Seller Information */}

            <Modal isOpen={isAuctionOpen} onClose={onAuctionClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Place Your Bid</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <p>Enter your bid for {item.name}.</p>

                  <FormControl>
                  <Input
                    placeholder={'Your Bid'}
                    size={"sm"}
                    type={"text"}
                    onChange={(e) =>
                      setInputs({ ...inputs, bid: e.target.value,})
                    }
                  />
                </FormControl>

                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={onAuctionClose}>
                    Close
                  </Button>
                  <Button variant="ghost" onClick={handleBidCreation} isLoadingtwo={isLoadingtwo} >Submit Bid</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>

            <Modal isOpen={isBidOpen} onClose={onBidClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Bids for {item.name}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <VStack spacing={4}>
                    <Text>Top Three Bids</Text>
                    {item.bids && item.bids.length > 0 ? (
                      item.bids.slice(0, 3).map((bid, index) => {
                          const bidderProfile = bidderProfiles[bid.createdBy];
                          return bidderProfile ? (
                              <HStack key={index} align="start" w="full">
                                  <Avatar src={bidderProfile.profilePicURL} />
                                  <VStack>
                                    <Text>{bidderProfile.fullName} bid: ${bid.bid}</Text>
                                    <Button
                                      mt={4}
                                      colorScheme="teal"
                                      marginLeft={145}
                                      marginBottom={2}
                                      onClick={() => contactBidder(bidderProfile)}
                                    >
                                      Contact Bidder
                                    </Button>
                                  </VStack>
                              </HStack>
                          ) : (
                              <Text key={index}>No BidderProfile</Text>
                          );
                      })
                    ) : (
                      <Text>There are no bids yet.</Text>
                    )}
                  </VStack>
                </ModalBody>
              </ModalContent>
            </Modal>

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

// function useCreateBid() {
//   const showToast = useShowToast();
//   const [isLoading, setIsLoading] = useState(false);
//   const authUser = useAuthStore((state) => state.user);
//   const createBid = bidStore((state) => state.createBid);
//   const addBid = usePostStore((state) => state.addBid);
//   const { pathname } = useLocation();

//   const handleCreateBid = async (item, inputs) => {
//     if (isLoading) return;
//     inputs.item = item.id;
//     inputs.createdBy = authUser.uid; 
//     if (!inputs.bid) throw new Error("Please input bid amount");

//     setIsLoading(true);
//     const newBid = inputs;

//     try {
//       const bidDocRef = await addDoc(collection(firestore, "bids"), newBid);
//       const postDocRef = doc(firestore, "posts", item.id);

//       await updateDoc(postDocRef, { bids: arrayUnion({ ...newBid, id: bidDocRef.id }) });

//       if (authUser.uid) {
//         createBid({ ...newBid, id: bidDocRef.id });
//         addBid(item.id, { ...newBid, id: bidDocRef.id })
//       }
//       showToast("Success", "Bid sent successfully", "success");
//     } catch (error) {
//       showToast("Error", error.message, "error");
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   return { isLoading, handleCreateBid };
// }