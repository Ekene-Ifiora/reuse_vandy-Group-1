import { Avatar, Box, Flex, VStack } from "@chakra-ui/react";
import ProductInfo from "../ProductPosts/ProductInfo";
import { React, useState } from "react";

const SuggestedUser = ({ items, setItem }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Iterate over each item in the items array and render its details
  const renderedItems = items.map((item) => (
    <Flex
      key={item.id}
      justifyContent={"space-between"}
      alignItems={"center"}
      w={"full"}
      marginBottom={"10px"}
    >
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
            {/* {console.log(item)} */}
            <Box fontSize={12} fontWeight={"bold"}>
              {item.name}
            </Box>
          </button>
          <Box fontSize={11} color={"gray.500"}>
            {item.buyNowPrice} $
          </Box>
        </VStack>
      </Flex>
      {/* {setItem([])} */}
    </Flex>
  ));

  return (
    // Render the array of items
    <>{renderedItems}</>
  );
};

export default SuggestedUser;
