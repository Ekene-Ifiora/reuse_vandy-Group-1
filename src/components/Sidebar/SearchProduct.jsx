import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { SearchLogo } from "../../assets/constants";
import useSearchProduct from "../../hooks/useSearchProduct";
import { useRef } from "react";
import SuggestedProduct from "../SuggestedUsers/SuggestedProduct";

const SearchProducts = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const searchRef = useRef(null);
  const { items, isLoading, getItemDetails, setItem } = useSearchProduct();

  const handleSearchProduct = (e) => {
    e.preventDefault();
    getItemDetails(searchRef.current.value);
  };
  const handleCloseModal = () => {
    onClose(); // Close the modal
    setItem([]); // Clear the search results
  };

  return (
    <>
      <Tooltip
        hasArrow
        label={"Search"}
        placement="right"
        ml={1}
        openDelay={500}
        display={{ base: "block", md: "none" }}
      >
        <Flex
          alignItems={"center"}
          gap={4}
          _hover={{ bg: "whiteAlpha.400" }}
          borderRadius={6}
          p={2}
          w={{ base: 10, md: "full" }}
          justifyContent={{ base: "center", md: "flex-start" }}
          onClick={onOpen}
        >
          <SearchLogo />{" "}
          <input
            className="search-input"
            type="text"
            placeholder="Enter your search item."
          />
        </Flex>
      </Tooltip>

      <Modal
        isOpen={isOpen}
        onClose={handleCloseModal}
        motionPreset="slideInLeft"
      >
        <ModalOverlay />
        <ModalContent
          bg={"black"}
          border={"1px solid gray"}
          maxW={"400px"}
          color={"white"}
        >
          <ModalHeader>Search Item</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSearchProduct}>
              <FormControl>
                <FormLabel>Item Name</FormLabel>
                <Input placeholder="Username, Item, Tags" ref={searchRef} />
              </FormControl>

              <Flex w={"full"} justifyContent={"flex-end"}>
                <Button
                  type="submit"
                  ml={"auto"}
                  size={"sm"}
                  my={4}
                  isLoading={isLoading}
                >
                  Search
                </Button>
              </Flex>
            </form>
            {items && <SuggestedProduct items={items} setItem={setItem} />}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SearchProducts;
