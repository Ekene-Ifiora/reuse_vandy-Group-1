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

const ProductInfo = ({ open, onClose, item }) => {
  console.log(item.id);
  if (!open) return null;
  return (
    // <ChakraProvider>
    //   <Button onClick={open}>Open Product</Button>

    //   <Modal isOpen={open} onClose={onClose}>
    //     <ModalOverlay />
    //     <ModalContent>
    //       <ModalHeader align="center"> {item.name} </ModalHeader>
    //       <ModalCloseButton />
    //       <ModalBody>
    //         {/* Product Name
    //                 <Heading as="h1" size="xl" mb={4} align = 'center' marginTop={20}>
    //                     {item.name}
    //                 </Heading> */}

    //         {/* Tags
    //                 <Stack direction="row" spacing={2} mb={4} bg='yellow' borderWidth='3px' borderRadius='lg' borderColor='yellow'>
    //                     <Text marginLeft = {3} > Tags: </Text>
    //                         {item.tags.map((tag, index) => (
    //                             <Tag key={index} colorScheme="teal" marginLeft={2}>
    //                                 {tag}
    //                             </Tag>
    //                         ))}
    //                 </Stack> */}

    //         {/* Description and Auction Details */}
    //         <VStack align="center" spacing={4}>
    //           {/* Product Image */}
    //           <Image src={item.image} alt="Product Image" objectFit="cover" />
    //           {/* Product Description */}
    //           <Text>{item.description}</Text>

    //           {/* Auction Details */}
    //           <VStack spacing={2}>
    //             <Button colorScheme="teal" size="md">
    //               Participate in Auction
    //             </Button>
    //             <Text as="b">Buy Now Price: {item.buyNowPrice}</Text>
    //             <Text>Starting Price: {item.startingPrice}</Text>
    //             <Text>Current Price: {item.currentPrice}</Text>
    //             <Text>Time Remaining: {item.timeRemaining}</Text>
    //           </VStack>
    //         </VStack>
    //         {/* Seller Information */}
    //         <Box
    //           mt={8}
    //           bg="gray.200"
    //           maxW="sm"
    //           borderWidth="3px"
    //           borderRadius="lg"
    //           borderColor="gray.200"
    //         >
    //           <Heading as="h3" size="md" align="center">
    //             Seller Information
    //           </Heading>
    //           <Text marginLeft={2}>Seller: {item.sellerInfo.name}</Text>
    //           <Text marginLeft={2}>Contact email: {item.sellerInfo.email}</Text>
    //           <Button
    //             mt={4}
    //             colorScheme="teal"
    //             marginLeft={115}
    //             marginBottom={2}
    //           >
    //             Contact Seller
    //           </Button>
    //         </Box>
    //         {/* Comments Section */}
    //         <Box
    //           mt={8}
    //           bg="gray.200"
    //           maxW="sm"
    //           borderWidth="3px"
    //           borderRadius="lg"
    //           borderColor="gray.200"
    //         >
    //           <Heading as="h3" size="md" bg="gray.200" align="center">
    //             Comments
    //           </Heading>
    //           {/* TODO Add comments functionality here */}
    //           {/* You can use a commenting component or a form for adding comments */}
    //           {/* Comments */}
    //           <Stack direction="column" spacing={2} mb={4} bg="gray.200">
    //             {item.comments.map((comment, index) => (
    //               <Box
    //                 key={index}
    //                 bg="gray.100"
    //                 marginLeft={1}
    //                 marginBottom={1}
    //                 borderWidth="3px"
    //                 borderRadius="lg"
    //                 borderColor="gray.100"
    //               >
    //                 {comment}
    //               </Box>
    //             ))}
    //             <Button mt={4} colorScheme="teal" size="md">
    //               Add Comment
    //             </Button>
    //           </Stack>
    //         </Box>
    //       </ModalBody>

    //       <ModalFooter>
    //         <Button colorScheme="blue" mr={3} onClick={onClose}>
    //           Close
    //         </Button>
    //       </ModalFooter>
    //     </ModalContent>
    //   </Modal>
    // </ChakraProvider>
    <Modal isOpen={open} onClose={onClose} size="xl">
      <ModalOverlay />

      <ModalContent
        bg={"black"}
        border={"1px solid gray"}
        width={"100vh"}
        height={"50vh"}
        position={"fixed"}
        marginTop={"20vh"}
        marginLeft={"300px"}
        borderRadius={6}
      >
        <ModalHeader color="white" fontSize={"large"} paddingLeft={"10px"}>
          {item.name}
        </ModalHeader>
        <ModalCloseButton
          marginLeft={"90vh"}
          color={"white"}
          marginTop={"-2vh"}
        />
        <ModalBody pb={6}>
          <img src={item.imageURL} className="itemImage" />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ProductInfo;
