import React from "react";
import { useDispatch } from "react-redux";
import "./Product.css";
import StarIcon from "@mui/icons-material/Star";
import { addToBasket } from "../../features/basketSlice";

function Product({ id, title, price, rating, imageUrl }) {
  const dispatch = useDispatch();
  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          {Array(rating)
            .fill(0)
            .map((_, i) => {
              return <StarIcon className="product__ratingGoldStar" />;
            })}
        </div>
      </div>

      <img src={imageUrl} alt="product-image" />

      <button
        onClick={() => {
          // dispatch addToBasket action
          dispatch(
            addToBasket({
              id: id,
              title: title,
              price: price,
              rating: rating,
              imageUrl: imageUrl,
            })
          );
        }}
      >
        Add to basket
      </button>
    </div>
  );
}

export default Product;
