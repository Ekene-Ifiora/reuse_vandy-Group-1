import { React, useState } from "react";
import product_card from "../db/data_1";
import "./ProductListing.css";
import useGetFeedPosts from "../../hooks/useGetFeedPosts";
import ProductInfo from "./ProductInfo";
import useAddCart from "../../hooks/useAddCart";

const ProductListing = () => {
  var { isLoading, posts } = useGetFeedPosts();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { handleAddCart } = useAddCart();

  if (posts.length < 1 || isLoading) {
    posts = product_card;
  }

  const listItems = posts.map((item) => (
    <div
      className="card"
      key={item.id}
      onClick={(e) => {
        setSelectedProduct(item.id);
      }}
    >
      <div className="card_img">
        {selectedProduct && (
          <ProductInfo
            open={selectedProduct === item.id}
            onClose={() => setSelectedProduct(null)}
            item={item}
          />
        )}
        <img src={item.imageURL} className="img" />
      </div>
      <div className="card_header">
        <h2 className="itemName">{item.name}</h2>
        <p className="itemDesc">{item.description}</p>
        <p className="price">
          {item.bids && item.bids.length > 0 ? item.bids[0].bid : item.buyNowPrice}
          <span>{"$"}</span>
        </p>
        <div className="btn" onClick={(e) => handleAddCart(item)}>
          Add to cart
        </div>
      </div>
    </div>
  ));
  return <div className="main_content">{listItems}</div>;
};
export default ProductListing;
