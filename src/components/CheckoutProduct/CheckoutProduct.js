import React from "react";
import { useDispatch } from "react-redux";
import { removeFromBasket } from "../../features/basketSlice";
import StarIcon from "@mui/icons-material/Star";
import "./CheckoutProduct.css";

function CheckoutProduct(item) {
  const dispatch = useDispatch();
  const { id, title, price, rating, imageUrl } = item;
  console.log(id);
  return (
    <div className="checkoutProduct">
      <img className="checkoutProduct__image" src={imageUrl} />

      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{title}</p>
        <p className="checkoutProduct__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="checkoutProduct__rating">
          {Array(rating)
            .fill(0)
            .map((_, i) => {
              return <StarIcon className="product__ratingGoldStar" />;
            })}
        </div>
        {
          <button
            onClick={() => {
              // dispatch removeFromBasket action
              dispatch(removeFromBasket({ id: id }));
            }}
          >
            Remove from Basket
          </button>
        }
      </div>
    </div>
  );
}

export default CheckoutProduct;
