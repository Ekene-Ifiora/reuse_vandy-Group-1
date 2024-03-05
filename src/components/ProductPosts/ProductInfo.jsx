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
  const { isImageOpen, onImageOpen, onImageClose} = useDisclosure();
  console.log(item.id);
  if (!open) return null;
  return (
    <ChakraProvider>
    <Modal isOpen={open} onClose={onClose} size="xl">
      <ModalOverlay />

      <ModalContent
        bg={"gray.300"}
        // border={"1px solid gray"}
        // width={"100vh"}
        // height={"150vh"}
        // position={"fixed"}
        // marginTop={"20vh"}
        // marginLeft={"300px"}
        // borderRadius={6}
      >
        <ModalHeader color="black" fontSize={"large"} align='center'>
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
            <Image src={item.imageURL} alt="Product Image" boxSize="150px"/>





            {/* Image Modal */}
            {/* <Button onClick={onImageOpen} size='sm' colorScheme="blue">Open Image</Button>
            <Modal isOpen={isImageOpen} onClose={onImageClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader align='center'>Large Image</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Image src={item.imageURL} alt="Large Product Image" />
                </ModalBody>
              </ModalContent>
            </Modal> */}



            {/* Product Description */}
            <Text>{item.description}</Text>


            {/* Auction Details */}

            <VStack spacing={2}>
              <Button colorScheme="teal" size="md">
                Participate in Auction
              </Button>
              <Text as='b'>Buy Now Price: {item.buyNowPrice}</Text>
              <Text>Starting Price: {item.startingPrice}</Text>
              <Text>Current Price: {item.currentPrice}</Text>
              <Text>Time Remaining: {item.timeRemaining}</Text>
            </VStack>
          </VStack>
          {/* Seller Information */}
          <Box mt={8} bg='gray.200' maxW='md' borderWidth='3px' borderRadius='lg' borderColor='gray.200' marginLeft={10}>
            <Heading as="h3" size="md" align='center'>
              Seller Information
            </Heading>
            <Text marginLeft={2}>Seller: John Doe </Text> {/* fixme pass sellername */}
            <Text marginLeft={2}>Contact email: exampleseller@email.com</Text> {/* fixme pass selleremail */}
            <Button mt={4} colorScheme="teal" marginLeft={145} marginBottom={2}>
              Contact Seller
            </Button>
          </Box>
          {/* Comments Section */}
          <Box mt={8} bg='gray.200' maxW='md' borderWidth='3px' borderRadius='lg' borderColor='gray.200' marginLeft={10}>
            <Heading as="h3" size="md" bg="gray.200" align='center' mb={2}>
              Comments
            </Heading>
            {/* TODO Add comments functionality here */}
            {/* You can use a commenting component or a form for adding comments */}
            {/* Comments */}
            <Stack direction="column" spacing={2} mb={4} bg='gray.200'>
              {/* fixme pass item.comments */}
              {/* {item.comments.map((comment, index) => (
                <Box key={index} bg="gray.100" marginLeft={1} marginBottom={1} borderWidth='3px' borderRadius='lg' borderColor='gray.100'>
                    {comment}
                </Box>
              ))} */}
              <Button mt={4} colorScheme="teal" size="md">
                Add Comment
              </Button>
            </Stack>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
    </ChakraProvider>


// <Modal isOpen={open} onClose={onClose} size="xl">
// <ModalOverlay />

// <ModalContent
//   bg={"black"}
//   border={"1px solid gray"}
//   width={"100vh"}
//   height={"50vh"}
//   position={"fixed"}
//   marginTop={"20vh"}
//   marginLeft={"300px"}
//   borderRadius={6}
// >
//   <ModalHeader color="white" fontSize={"large"} paddingLeft={"10px"}>
//     {item.name}
//   </ModalHeader>
//   <ModalCloseButton
//     marginLeft={"90vh"}
//     color={"white"}
//     marginTop={"-2vh"}
//   />
//   <ModalBody pb={6}>
//     <img src={item.imageURL} className="itemImage" />
//   </ModalBody>
// </ModalContent>
// </Modal>

    
  );
};

export default ProductInfo;
