import { React, useState } from "react";
import product_card from "../db/data_1";
import "./ProductListing.css";
import useGetFeedPosts from "../../hooks/useGetFeedPosts";
import ProductInfo from "./ProductInfo";

const ProductListing = () => {
  var { isLoading, posts } = useGetFeedPosts();
  const [selectedProduct, setSelectedProduct] = useState(null);
  if (posts.length < 15 || isLoading) {
    posts = product_card;
  }

  const listItems = posts.map((item) => (
    <div className="card" key={item.id}>
      <div
        className="card_img"
        onClick={(e) => {
          setSelectedProduct(item.id);
        }}
      >
        <ProductInfo
          open={selectedProduct === item.id}
          onClose={() => setSelectedProduct(null)}
          item={item}
        />
        <img src={item.imageURL} />
      </div>
      <div className="card_header">
        <h2>{item.name}</h2>
        <p>{item.description}</p>
        <p className="price">
          {item.buyNowPrice}
          <span>{"$"}</span>
        </p>
        <div className="btn">Add to cart</div>
      </div>
    </div>
  ));
  return <div className="main_content">{listItems}</div>;
};
export default ProductListing;
