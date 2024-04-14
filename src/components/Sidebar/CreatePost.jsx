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
  Select,
} from "@chakra-ui/react";
import { BsFillImageFill } from "react-icons/bs";
import { useRef, useState } from "react";
import usePreviewImg from "../../hooks/usePreviewImg";
import useShowToast from "../../hooks/useShowToast";
import useAuthStore from "../../store/authStore";
import usePostStore from "../../store/postStore";
import useUserProfileStore from "../../store/userProfileStore";
import { useLocation } from "react-router-dom";
import { IoCreateOutline } from "react-icons/io5";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { firestore, storage } from "../../firebase/firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

const CreatePost = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [caption, setCaption] = useState("");
  const [inputs, setInputs] = useState({
    name: "",
    nameLower: "",
    tags: "",
    description: "",
    buyNowPrice: "",
    location: "",
    sellerName: "",
    sellerEmail: "",
    sellerUsername: "",
    comments: [],
    createdAt: Date.now(),
    createdBy: "",
    inAuction: "",
    auctionDateEnd: "",
    auctionTimeEnd: "",
  });
  const imageRef = useRef(null);
  const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImg();
  const showToast = useShowToast();
  const { isLoading, handleCreatePost } = useCreatePost();
  const handlePostCreation = async () => {
    try {
      await handleCreatePost(selectedFile, inputs);
      onClose();
      setInputs("");
      setSelectedFile(null);
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  return (
    <>
      <Tooltip
        hasArrow
        label={"Create"}
        placement="right"
        ml={1}
        openDelay={500}
        display={{ base: "block", md: "none" }}
      >
        <Flex
          alignItems={"center"}
          gap={4}
          borderRadius={6}
          w={{ base: 10, md: "full" }}
          justifyContent={{ base: "center", md: "flex-start" }}
          onClick={onOpen}
        >
          <IoCreateOutline className="nav-icons" />
        </Flex>
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />

        <ModalContent
          bg={"white"}
          border={"1px solid gray"}
          boxShadow={"xl"}
          mx={3}
          color={"black"}
        >
          <ModalHeader color="black">Create Post</ModalHeader>
          <ModalCloseButton color={"black"} />
          <ModalBody pb={6}>
            <Textarea
              placeholder="Item Name"
              value={inputs.name}
              onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
              required={true}
              color="black"
              marginBottom={"5px"}
            />
            <Textarea
              placeholder="Description"
              value={inputs.description}
              onChange={(e) =>
                setInputs({ ...inputs, description: e.target.value })
              }
              color="black"
              marginBottom={"5px"}
            />
            <Select
              placeholder={"Select Tags"}
              value={inputs.tags}
              onChange={(e) => setInputs({ ...inputs, tags: e.target.value })}
              marginBottom={"5px"}
            >
              <option value="Electronics">Electronics</option>
              <option value="Tickets">Tickets</option>
              <option value="Furniture">Furniture</option>
            </Select>
            <Select
              placeholder="Select Location"
              value={inputs.location}
              onChange={(e) =>
                setInputs({ ...inputs, location: e.target.value })
              }
              marginBottom={"5px"}
            >
              <option value="Kissam College">Kissam College</option>
              <option value="Commons">Commons</option>
              <option value="Highland">Highland</option>
              <option value="EBI">EBI</option>
              <option value="Rothschild">Rothschild</option>
            </Select>
            <Select
              placeholder="Create Auction"
              value={inputs.inAuction}
              onChange={(e) =>
                setInputs({ ...inputs, inAuction: e.target.value })
              }
              marginBottom={"5px"}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </Select>
            {inputs.inAuction == "true" && (
              <Input
                type="date"
                placeholder="Date"
                value={inputs.auctionDateEnd}
                onChange={(e) =>
                  setInputs({ ...inputs, auctionDateEnd: e.target.value })
                }
                color="black"
              />
            )}
            {console.log(inputs.inAuction)}
            {inputs.inAuction == "true" && (
              <Input
                type="time"
                placeholder="Time"
                value={inputs.auctionTimeEnd}
                onChange={(e) =>
                  setInputs({ ...inputs, auctionTimeEnd: e.target.value })
                }
                color="black"
              />
            )}
            <Input
              type="number"
              placeholder="Price"
              value={inputs.buyNowPrice}
              onChange={(e) =>
                setInputs({ ...inputs, buyNowPrice: e.target.value })
              }
              color="black"
            />
            <Input
              type="file"
              hidden
              ref={imageRef}
              onChange={handleImageChange}
            />

            <BsFillImageFill
              onClick={() => imageRef.current.click()}
              style={{
                marginTop: "15px",
                marginLeft: "5px",
                cursor: "pointer",
              }}
              size={16}
              color="black"
            />

            {selectedFile && (
              <Flex
                mt={5}
                w={"full"}
                position={"relative"}
                justifyContent={"center"}
              >
                <Image src={selectedFile} alt="Selected img" />
                <CloseButton
                  position={"absolute"}
                  top={2}
                  right={2}
                  onClick={() => {
                    setSelectedFile(null);
                  }}
                />
              </Flex>
            )}
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={handlePostCreation} isLoading={isLoading}>
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePost;

function useCreatePost() {
  const showToast = useShowToast();
  const [isLoading, setIsLoading] = useState(false);
  const authUser = useAuthStore((state) => state.user);
  const createPost = usePostStore((state) => state.createPost);
  const addPost = useUserProfileStore((state) => state.addPost);
  const { pathname } = useLocation();

  const handleCreatePost = async (selectedFile, inputs) => {
    if (isLoading) return;
    inputs.sellerName = authUser.fullName;
    inputs.sellerEmail = authUser.email;
    inputs.nameLower = inputs.name.toLowerCase();
    inputs.sellerUsername = authUser.username;
    if (!inputs.name) throw new Error("Please input item name");
    if (!inputs.buyNowPrice) throw new Error("Please input item price");
    if (!selectedFile) throw new Error("Please select an image");

    setIsLoading(true);
    const newPost = inputs;
    newPost.createdBy = authUser.uid;

    try {
      const postDocRef = await addDoc(collection(firestore, "posts"), newPost);
      const userDocRef = doc(firestore, "users", authUser.uid);
      const imageRef = ref(storage, `posts/${postDocRef.id}`);

      await updateDoc(userDocRef, { posts: arrayUnion(postDocRef.id) });
      await uploadString(imageRef, selectedFile, "data_url");
      const downloadURL = await getDownloadURL(imageRef);

      await updateDoc(postDocRef, { imageURL: downloadURL });

      newPost.imageURL = downloadURL;
      if (authUser.uid) {
        createPost({ ...newPost, id: postDocRef.id });
      }
      showToast("Success", "Post created successfully", "success");
      if (pathname !== "/" && authUser.uid) {
        addPost({ ...newPost, id: postDocRef.id });
        showToast("Success", "Post created successfully", "success");
      }
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };
  return { isLoading, handleCreatePost };
}
