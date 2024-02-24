import React from 'react';
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
} from '@chakra-ui/react';
import Navigation from "../../components/Navbar/Navigation";
import { ChakraProvider } from '@chakra-ui/react';

const ProductPage = () => {
  // Mock data for the product TODO must replace with fetching data for each product
  const product = {
    name: 'Brand new fridge!',
    tags: ['Electronics', 'Refridgerator', 'Kissam'],
    image: 'https://c1.staticflickr.com/1/62/224776053_f02809d6a8_n.jpg',
    description: 'Comes with free food inside',
    auctionDescription: 'I need to sell this quickly Im in crippling debt',
    buyNowPrice: '$150',
    startingPrice: '$100',
    currentPrice: '$120',
    timeRemaining: '2 days 4 hours',
    activeMembers: 5,
    sellerInfo: {
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
  };

  return (
    <ChakraProvider>
    <Navigation />
    <Box p={4} bg='white'>
      {/* Product Name */}
      <Heading as="h1" size="xl" mb={4} bg='white' align = 'center'>
        {product.name}
      </Heading>

      {/* Tags */}
      <Stack direction="row" spacing={2} mb={4} bg='yellow'>
        <Text marginLeft = {3}> Tags: </Text>
        {product.tags.map((tag, index) => (
          <Tag key={index} colorScheme="teal" marginLeft={2}>
            {tag}
          </Tag>
        ))}
      </Stack>

      {/* Product Details */}
      <HStack spacing={8} align="start" bg = "gray.200">
        {/* Product Image */}
        <Image src={product.image} alt="Product Image" boxSize="300px" />

        {/* Description and Auction Details */}
        <VStack align="start" spacing={4} >
          {/* Product Description */}
          <Box>
            <Heading as="h2" size="lg">
              Product Description
            </Heading>
            <Text>{product.description}</Text>
          </Box>

          {/* Auction Description */}
          <Box>
            <Heading as="h2" size="lg">
              Auction Description
            </Heading>
            <Text>{product.auctionDescription}</Text>
          </Box>

          {/* Auction Details */}
          <VStack spacing={2}>
            <Button colorScheme="teal" size="md">
              Participate in Auction
            </Button>
            <Text>Buy Now Price: {product.buyNowPrice}</Text>
            <Text>Starting Price: {product.startingPrice}</Text>
            <Text>Current Price: {product.currentPrice}</Text>
            <Text>Time Remaining: {product.timeRemaining}</Text>
            <Text>Active Members: {product.activeMembers}</Text>
          </VStack>
        </VStack>
      </HStack>

      {/* Seller Information */}
      <Box mt={8} bg='white'>
        <Heading as="h3" size="lg">
          Seller Information
        </Heading>
        <Text>Seller: {product.sellerInfo.name}</Text>
        <Text>Contact Email: {product.sellerInfo.email}</Text>
        <Button mt={4} colorScheme="teal">
          Contact Seller
        </Button>
      </Box>

      {/* Comments Section */}
      <Box mt={8} bg='white'>
        <Heading as="h3" size="lg">
          Comments
        </Heading>
        {/* TODO Add comments functionality here */}
        {/* You can use a commenting component or a form for adding comments */}
        <Text> Comments will appear here </Text>
      </Box>
    </Box>
    </ChakraProvider>
  );
};

export default ProductPage;