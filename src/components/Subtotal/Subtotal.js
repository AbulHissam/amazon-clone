import React from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { basketSelector } from "../../features/basketSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

function Subtotal() {
  const basket = useSelector(basketSelector);
  const navigate = useNavigate();
  const getTotalCost = () => {
    let totalCost = basket.reduce((amount, item) => {
      return amount + item.price;
    }, 0);
    return totalCost;
  };

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket?.length} items):<strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" />
              This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={basket ? getTotalCost() : 0}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"₹"}
      ></CurrencyFormat>
      <button
        onClick={() => {
          navigate("/payment");
        }}
      >
        Proceed to checkout
      </button>
    </div>
  );
}

export default Subtotal;
