import {
    Avatar,
    Button,
    Center,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Stack,
  } from "@chakra-ui/react";
  import { useRef, useState } from "react";
  import useAuthStore from "../../store/authStore";
  import usePreviewImg from "../../hooks/usePreviewImg";
  import useEditPost from "../../hooks/useEditPost";
  import useShowToast from "../../hooks/useShowToast";
  
  const EditPost= ({ post, isOpen, onClose }) => {
    const [inputs, setInputs] = useState({
      buyNowPrice: 0,
      description: "",
      name: "",
    });
    const authUser = useAuthStore((state) => state.user);
    const fileRef = useRef(null);
    const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImg();
    const { isUpdating, editPost} = useEditPost();
    const showToast = useShowToast();
  
    const handleEditPost = async () => {
      try {
        await editPost(post, inputs, selectedFile);
        setSelectedFile(null);
        onClose();
      } catch (error) {
        showToast("Error", error.message, "error");
      }
    };
  
    return (
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent
            bg={"white"}
            boxShadow={"xl"}
            border={"1px solid gray"}
            mx={3}
          >
            <ModalHeader />
            <ModalCloseButton />
            <ModalBody>
              {/* Container Flex */}
              <Flex bg={"white"}>
                <Stack
                  spacing={4}
                  w={"full"}
                  maxW={"md"}
                  bg={"white"}
                  p={6}
                  my={0}
                >
                  <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
                    Edit Post
                  </Heading>
                  <FormControl>
                    <Stack direction={["column", "row"]} spacing={6}>
                      <Center>
                        <Avatar
                          size="xl"
                          src={selectedFile || post.imageURL}
                          border={"2px solid white "}
                        />
                      </Center>
                      <Center w="full">
                        <Button w="full" onClick={() => fileRef.current.click()}>
                          Edit Post Picture
                        </Button>
                      </Center>
                      <Input
                        type="file"
                        hidden
                        ref={fileRef}
                        onChange={handleImageChange}
                      />
                    </Stack>
                  </FormControl>
  
                  <FormControl>
                    <FormLabel fontSize={"sm"}>Buy Now Price</FormLabel>
                    <Input
                      placeholder={post.buyNowPrice}
                      size={"sm"}
                      type={"number"}
                      //value={inputs.buyNowPrice || post.buyNowPrice}
                      onChange={(e) =>
                        setInputs({ ...inputs, buyNowPrice: e.target.value })
                      }
                    />
                  </FormControl>
  
                  <FormControl>
                    <FormLabel fontSize={"sm"}>Description</FormLabel>
                    <Input
                      placeholder={post.description}
                      size={"sm"}
                      type={"text"}
                    //   value={inputs.description || post.description}
                      onChange={(e) =>
                        setInputs({ ...inputs, description: e.target.value })
                      }
                    />
                  </FormControl>
  
                  <FormControl>
                    <FormLabel fontSize={"sm"}>Name</FormLabel>
                    <Input
                      placeholder={post.name}
                      size={"sm"}
                      type={"text"}
                    //   value={inputs.name || post.name}
                      onChange={(e) =>
                        setInputs({ ...inputs, name: e.target.value })
                      }
                    />
                  </FormControl>
  
                  <Stack spacing={6} direction={["column", "row"]}>
                    <Button
                      bg={"red.400"}
                      color={"white"}
                      w="full"
                      size="sm"
                      _hover={{ bg: "red.500" }}
                      onClick={onClose}
                    >
                      Cancel
                    </Button>
                    <Button
                      bg={"blue.400"}
                      color={"white"}
                      size="sm"
                      w="full"
                      _hover={{ bg: "blue.500" }}
                      onClick={handleEditPost}
                      isLoading={isUpdating}
                    >
                      Submit
                    </Button>
                  </Stack>
                </Stack>
              </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  };
  
  export default EditPost;