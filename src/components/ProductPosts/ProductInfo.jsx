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
} from "@chakra-ui/react";
import Navigation from "../../components/Navbar/Navigation";
import { ChakraProvider } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import ChatPage from "../../pages/ChatPage/ChatPage";
import { newChat } from "react-chat-engine";

const ProductInfo = ({ open, onClose, item }) => {
  const { isImageOpen, onImageOpen, onImageClose } = useDisclosure();
  const navigate = useNavigate();
  const authUser = useAuthStore((state) => state.user);
  const publicKey = "282eceef-5a55-4bac-9587-7e367d4ad838"

  const goToChat = (item) => {

    if (authUser) {
      <ChatPage sellerUsername={item.sellerName} />
      navigate(`/${authUser.username}/chat`); // Navigate using the user's UID
    }
  };
  
  if (!open) return null;
  return (
    <ChakraProvider>
      <Modal isOpen={open} onClose={onClose} size="xl">
        <ModalOverlay />

        <ModalContent
          bg={"gray.300"}
        >
          <ModalHeader color="black" fontSize={"large"} align="center">
            {item.name}
          </ModalHeader>
          <ModalCloseButton
          // marginLeft={"90vh"}
          // color={"black"}
          // marginTop={"-2vh"}
          />
          <ModalBody pb={6}>
            {/* <img src={item.imageURL} className="itemImage" /> */}
            {/* Description and Auction Details */}
            <VStack align="center" spacing={4}>
              {/* Product Image */}
              <Image src={item.imageURL} alt="Product Image" boxSize="150px" />

              {/* Product Description */}
              <Text>{item.description}</Text>

              {/* Auction Details */}

              <VStack spacing={2}>
                <Button colorScheme="teal" size="md">
                  Participate in Auction
                </Button>
                <Text as="b">Buy Now Price: {item.buyNowPrice}</Text>
                <Text>Starting Price: {item.startingPrice}</Text>
                <Text>Current Price: {item.currentPrice}</Text>
                <Text>Time Remaining: {item.timeRemaining}</Text>
              </VStack>
            </VStack>
            {/* Seller Information */}
            <Box
              mt={8}
              bg="gray.200"
              maxW="md"
              borderWidth="3px"
              borderRadius="lg"
              borderColor="gray.200"
              marginLeft={10}
            >
              <Heading as="h3" size="md" align="center">
                Seller Information
              </Heading>
              <Text marginLeft={2}>Seller: {item.sellerName} </Text>
              <Text marginLeft={2}>Contact email: {item.sellerEmail}</Text>
              <Button
                mt={4}
                colorScheme="teal"
                marginLeft={145}
                marginBottom={2}
                onClick={() => goToChat(item)}
              >
                Contact Seller
              </Button>
            </Box>
            <Box
              mt={8}
              bg="gray.200"
              maxW="md"
              borderWidth="3px"
              borderRadius="lg"
              borderColor="gray.200"
              marginLeft={10}
            >
              <Heading as="h3" size="md" bg="gray.200" align="center" mb={2}>
                Comments
              </Heading>
              <Stack direction="column" spacing={2} mb={4} bg="gray.200">
                <Button mt={4} colorScheme="teal" size="md">
                  Add Comment
                </Button>
              </Stack>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
};

export default ProductInfo;
