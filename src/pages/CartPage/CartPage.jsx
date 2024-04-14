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
import "./CartPage.css";

/**
 * Component representing the cart page.
 * Fetches cart items from Firestore and allows users to view, remove items from the cart, and calculate the total.
 */
const CartPage = () => {
  const [user] = useAuthState(auth);
  const authUser = useAuthStore((state) => state.user);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const showToast = useShowToast();
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);

  /**
   * Fetches cart items from Firestore when the user is authenticated.
   */
  useEffect(() => {
    if (user) {
      const fetchCartItems = async () => {
        try {
          const userRef = doc(firestore, "users", authUser.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            const userData = userSnap.data();
            const cartItemIds = userData.cart || [];
            const itemsPromises = cartItemIds.map(async (itemId) => {
              const itemRef = doc(firestore, "posts", itemId);
              const itemSnap = await getDoc(itemRef);
              if (itemSnap.exists()) {
                return { id: itemId, ...itemSnap.data() };
              } else {
                return null;
              }
            });
            const items = await Promise.all(itemsPromises);
            setCartItems(items.filter((item) => item !== null));
          } else {
            showToast("Error", "User data not found", "error");
          }
        } catch (error) {
          showToast("Error", "Error fetching cart items: " + error, "error");
        } finally {
          setIsLoading(false);
        }
      };
      fetchCartItems();
    }
  }, [user, authUser]);

  /**
   * Handles contacting the seller of a product.
   * @param {Object} item - The item whose seller needs to be contacted.
   */
  const handleContactSeller = (item) => {
    if (user) {
      navigate(`/${authUser.username}/chat`); // Navigate using the user's UID
    }
    // console.log("Contact seller:", item.sellerEmail);
  };

  /**
   * Handles removing an item from the cart.
   * @param {string} itemId - The ID of the item to be removed from the cart.
   */
  const handleRemoveItem = async (itemId) => {
    try {
      const userRef = doc(firestore, "users", authUser.uid);
      await updateDoc(userRef, {
        cart: arrayRemove(itemId), // Change arrayUnion to arrayRemove
      });
      setCartItems(cartItems.filter((item) => item.id !== itemId));
      showToast("Success", "Removed item from cart", "success");
    } catch (error) {
      showToast("Error", "Error removing item from cart: " + error, "error");
    }
  };

  /**
   * Calculates the total price of items in the cart.
   * @returns {number} The total price of items in the cart.
   */
  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + parseInt(item.buyNowPrice),
      0
    );
  };

  return (
    <div className="cartBody">
      <ChakraProvider>
        <div className="navbar">
          <Navigation
            showProfileIcon={true}
            showHomeIcon={true}
            showCartIcon={false}
            showLogoutIcon={false}
          />
        </div>

        <div className="cartBody">
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
              <Text fontSize="xl" fontWeight="bold" mb={4}>
                Your Cart
              </Text>
              {isLoading ? (
                <Skeleton width="100%" height="100px" />
              ) : (
                <VStack spacing={4} alignItems="flex-start" w="100%">
                  {cartItems.map((item) => (
                    <Flex
                      key={item.id}
                      w="100%"
                      p={4}
                      borderWidth="1px"
                      borderRadius="md"
                      alignItems="center"
                      justifyContent="space-between"
                      _hover={{ bg: "black", color: "white" }}
                      bg={"transparent"}
                      cursor={"pointer"}
                      className="items"
                    >
                      <ProductInfo
                        open={selectedProduct === item.id}
                        onClose={() => setSelectedProduct(null)}
                        item={item}
                      />
                      <Image
                        src={item.imageURL}
                        borderRadius={"20px"}
                        boxSize="80px"
                        onClick={(e) => {
                          setSelectedProduct(item.id);
                        }}
                      />
                      <Flex
                        direction="column"
                        alignItems="flex-start"
                        flex="1"
                        ml={4}
                        onClick={(e) => {
                          setSelectedProduct(item.id);
                        }}
                      >
                        <Text fontSize="md" fontWeight="bold" mb={2}>
                          {item.name}
                        </Text>
                        <Text fontSize="sm">${item.buyNowPrice}</Text>
                      </Flex>
                      <Button
                        colorScheme="blue"
                        size="sm"
                        onClick={() => handleContactSeller(item)}
                      >
                        Contact Seller
                      </Button>
                      <Button
                        colorScheme="red"
                        size="sm"
                        onClick={() => handleRemoveItem(item.id)}
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
                  color={"black"}
                >
                  <Text fontWeight="bold">Total: ${calculateTotal()}</Text>
                </Flex>
              )}
            </Flex>
          </Container>
        </div>
      </ChakraProvider>
    </div>
  );
};

export default CartPage;
