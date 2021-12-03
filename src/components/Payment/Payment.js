import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { basketSelector } from "../../features/basketSlice";
import { userSelector } from "../../features/userSlice";
import CheckoutProduct from "../CheckoutProduct/CheckoutProduct";
import "./Payment.css";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import axios from "../../requests/axios";

function Payment() {
  const user = useSelector(userSelector);
  const basket = useSelector(basketSelector);

  const navigate = useNavigate();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    //genertae the special clientSecret which will be used to charge the customer
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        // stripe expects the total in currencie subunits (100 cents=1$)
        url: `/payments/create?total=${getTotalCost() * 100}`,
      });
      if (response.status === 200) {
        setClientSecret(response.data.clientSecret);
      } else {
        alert(response.data.error.message);
      }
    };
    if (getTotalCost() > 0) getClientSecret();
  }, [basket]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!error && basket.length === 0) {
      alert("Basket is empty");
    } else if (!error && clientSecret) {
      setProcessing(true);
      const payload = await stripe
        .confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        })
        .then((response) => {
          // paymentIntent=paymet confirmation and destructured from response
          setSucceeded(true);
          setError("");
          setProcessing(false);

          navigate("/orders", { replace: true });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleChange = (event) => {
    // Listening for change in the card element
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  const getTotalCost = () => {
    let totalCost = basket.reduce((amount, item) => {
      return amount + item.price;
    }, 0);
    return totalCost;
  };
  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.user}</p>
            <p>123 React Lane</p>
            <p>Los Angeles,CA</p>
          </div>
        </div>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Review Items ans Delivery</h3>
          </div>
          <div className="payment__items">
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

        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__address">
            {/* Stripe Magic */}
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => {
                    return <h3>Order Total: {value}</h3>;
                  }}
                  decimalScale={2}
                  value={getTotalCost()}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₹"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>

              {/* Errors in processing payment */}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
