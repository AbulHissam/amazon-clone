import React from "react";
import { useSelector } from "react-redux";
import { basketSelector } from "../../features/basketSlice";
import { userSelector } from "../../features/userSlice";
import CheckoutProduct from "../CheckoutProduct/CheckoutProduct";
import Subtotal from "../Subtotal/Subtotal";
import "./Checkout.css";

function Checkout() {
  const user = useSelector(userSelector);
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
          <h4>Hello,{user ? user : "Guest"}</h4>
          <h2 className="checkout__title">Your shopping Basket</h2>
          {basket.map((item) => {
            return (
              <CheckoutProduct
                key={item.id}
                id={item.id}
                title={item.title}
                price={item.price}
                rating={item.rating}
                imageUrl={item.imageUrl}
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
