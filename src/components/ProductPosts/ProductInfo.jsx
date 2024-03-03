import React from "react";
import "./ProductInfo.css";
import {
  Button,
  CloseButton,
  Flex,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";

const ProductInfo = ({ open, onClose, item }) => {
  console.log(item.id);
  if (!open) return null;
  return (
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
