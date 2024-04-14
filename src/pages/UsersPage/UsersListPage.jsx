import { useEffect, useState } from "react";
import {
  Button,
  ChakraProvider,
  Container,
  Flex,
  Image,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../firebase/firebase";
import { arrayRemove, doc, updateDoc, getDoc } from "firebase/firestore";
import Navigation from "../../components/Navbar/Navigation";
import useAuthStore from "../../store/authStore";
import useShowToast from "../../hooks/useShowToast";
import ProductInfo from "../../components/ProductPosts/ProductInfo";
import { useNavigate } from "react-router-dom";
import "./UsersListPage.css";
import { getDocs, collection } from "firebase/firestore";
import { Link } from "react-router-dom";
import { LiaUsersCogSolid } from "react-icons/lia";

const UserListPage = () => {
  const [user] = useAuthState(auth);
  const authUser = useAuthStore((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const showToast = useShowToast();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  /**
   * Handles contacting the seller of a product.
   * @param {Object} item - The item whose seller needs to be contacted.
   */
  const handleContactSeller = () => {
    if (user) {
      navigate(`/${authUser.username}/chat`); // Navigate using the user's UID
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      if (authUser && authUser.isAdmin && user) {
        try {
          const usersCollection = collection(firestore, "users");
          const usersSnapshot = await getDocs(usersCollection);
          const userList = usersSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setUsers(userList);
        } catch (error) {
          showToast("Error", "Error fetching users: " + error.message, "error");
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchUsers();
  }, [user, authUser, showToast]);

  return (
    <div className="userList">
      <ChakraProvider>
        <div className="navbar">
          <Navigation
            showProfileIcon={true}
            showHomeIcon={true}
            showCartIcon={false}
            showLogoutIcon={false}
          />
        </div>

        <div className="listBody">
          <Container maxW="container.lg" py={5} pt="60px" marginTop={"20px"}>
            <Flex
              position="relative"
              py={10}
              px={4}
              pl={{ base: 4, md: 10 }}
              w="full"
              mx="auto"
              flexDirection="column"
            >
              <Flex flexDirection="row">
                <LiaUsersCogSolid size={"30"} />
                <Text fontSize="xl" fontWeight="bold" mb={4} paddingLeft={"11"}>
                  Members({users.length})
                </Text>
              </Flex>

              {isLoading ? (
                <Skeleton width="100%" height="100px" />
              ) : (
                <VStack spacing={4} alignItems="flex-start" w="100%">
                  {users.map((vusers) => (
                    <Flex
                      key={vusers.id}
                      w="100%"
                      p={4}
                      borderWidth="1px"
                      borderColor={"black"}
                      borderRadius="md"
                      alignItems="center"
                      justifyContent="space-between"
                      _hover={{ bg: "black", color: "white" }}
                      bg={"transparent"}
                      onClick={(e) => {
                        setSelectedProduct(vusers.id);
                      }}
                      cursor={"pointer"}
                      className="users"
                    >
                      <Link to={`/${vusers.username}`}>
                        <Image
                          src={vusers.profilePicURL}
                          borderRadius={"20px"}
                          boxSize="80px"
                        />
                      </Link>
                      <Flex
                        direction="column"
                        alignItems="flex-start"
                        flex="1"
                        ml={4}
                      >
                        <Text fontSize="md" fontWeight="bold" mb={2}>
                          {vusers.fullName}
                        </Text>
                        <Text fontSize="sm">{vusers.username}</Text>
                      </Flex>
                      <Button
                        colorScheme="blue"
                        size="sm"
                        onClick={() => handleContactSeller()}
                      >
                        Contact User
                      </Button>
                      <Button
                        colorScheme="red"
                        size="sm"
                        // onClick={() => handleRemoveItem(item.id)}
                      >
                        Remove
                      </Button>
                    </Flex>
                  ))}
                </VStack>
              )}
              {!isLoading && (
                <Flex
                  w="100%"
                  justifyContent="flex-end"
                  mt={4}
                  borderTop="1px solid"
                  pt={4}
                  color={"white"}
                >
                  {/* <Text fontWeight="bold">Total: ${calculateTotal()}</Text> */}
                </Flex>
              )}
            </Flex>
          </Container>
        </div>
      </ChakraProvider>
    </div>
  );
};

export default UserListPage;
