import { Avatar, Box, Flex, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import ProductInfo from "../ProductPosts/ProductInfo";
import { React, useState } from "react";

const SuggestedUser = ({ item, setItem }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
      <Flex alignItems={"center"} gap={2}>
        <button
          onClick={(e) => {
            setSelectedProduct(item.id);
          }}
        >
          <ProductInfo
            open={selectedProduct === item.id}
            onClose={() => setSelectedProduct(null)}
            item={item}
          />
          <Avatar src={item.imageURL} size={"md"} />
        </button>
        <VStack spacing={2} alignItems={"flex-start"}>
          <button
            onClick={(e) => {
              setSelectedProduct(item.id);
            }}
          >
            <Box fontSize={12} fontWeight={"bold"}>
              {item.name}
            </Box>
          </button>
          <Box fontSize={11} color={"gray.500"}>
            {item.buyNowPrice} $
          </Box>
        </VStack>
      </Flex>
    </Flex>
  );
};

export default SuggestedUser;
