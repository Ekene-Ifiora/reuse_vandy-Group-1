import { Box, Image } from "@chakra-ui/react";
import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";
import useGetUserProfileById from "../../hooks/useGetUserProfileById";
// import "./Product.css";

const Products = ({ result }) => {
  return (
    <>
      <h1>This is the product page</h1>
      {/* <section className="card-container">{result}</section> */}
    </>
  );
};

export default Products;
// const ProductPost = ({ post }) => {
// 	const { userProfile } = useGetUserProfileById(post.createdBy);

// 	return (
// 		<>

// 			{/* <PostHeader post={post} creatorProfile={userProfile} />
// 			<Box my={2} borderRadius={4} overflow={"hidden"}>
// 				<Image src={post.imageURL} alt={"FEED POST IMG"} />
// 			</Box>
// 			<PostFooter post={post} creatorProfile={userProfile} /> */}
// 		</>
// 	);
// };

// export default FeedPost;
