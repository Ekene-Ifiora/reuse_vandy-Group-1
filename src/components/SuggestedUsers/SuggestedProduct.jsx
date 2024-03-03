import { Avatar, Box, Flex, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const SuggestedUser = ({ item, setItem }) => {
  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
      <Flex alignItems={"center"} gap={2}>
        <Link to={`/${item.name}`}>
          <Avatar src={item.imageURL} size={"md"} />
        </Link>
        <VStack spacing={2} alignItems={"flex-start"}>
          <Link to={`/${item.name}`}>
            <Box fontSize={12} fontWeight={"bold"}>
              {item.name}
            </Box>
          </Link>
          <Box fontSize={11} color={"gray.500"}>
            {item.buyNowPrice} $
          </Box>
        </VStack>
      </Flex>
    </Flex>
  );
};

export default SuggestedUser;
