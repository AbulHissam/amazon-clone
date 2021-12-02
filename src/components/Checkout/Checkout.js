import React from "react";
import { useSelector } from "react-redux";
import { basketSelector } from "../../features/basketSlice";
import CheckoutProduct from "../CheckoutProduct/CheckoutProduct";
import Subtotal from "../Subtotal/Subtotal";
import "./Checkout.css";

function Checkout() {
  const basket = useSelector(basketSelector);
  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          className="checkout__ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt="checkout-ad"
        />
        <div>
          <h2 className="checkout__title">Your shopping Basket</h2>
          {basket &&
            basket.map((item) => {
              const { id, title, price, rating, imageUrl } = item;
              return (
                <CheckoutProduct
                  key={id}
                  id={id}
                  title={title}
                  price={price}
                  rating={rating}
                  imageUrl={imageUrl}
                />
              );
            })}
        </div>
      </div>
      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;
