import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Checkout from "./components/Checkout/Checkout";
import Login from "./components/Login/Login";
import Payment from "./components/Payment/Payment";
import { useSelector, useDispatch } from "react-redux";
import { userSelector, login, logout } from "./features/userSlice";
import { basketSelector } from "./features/basketSlice";
import { onAuthStateChanged, signOut } from "@firebase/auth";
import { auth } from "./firebase/firebase";
import { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe(
  "pk_test_51JxbsrSAVjkzFXhMimhlSPt90uY2uR6p2HiMKU60rjxJTJRWRMavwqkPJr2Jr4xqMY4sMq06EznMnTZl94kLjOgW00pkTQHXBO"
);

function App() {
  const user = useSelector(userSelector);
  const basket = useSelector(basketSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          console.log("The user is logged in" + " " + user.email);
          // if the user is logged in dispatch an action to store user details in redux store
          dispatch(login({ email: user.email }));
        } else {
          signOut(auth);
          // when user is signed out dispatch an action to remove user details in redux store
          dispatch(logout());
        }
      },
      [user, basket]
    );
  });
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route
            path="/payment"
            element={returnWithHeader(
              <Elements stripe={promise}>
                <Payment />
              </Elements>
            )}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/checkout" element={returnWithHeader(<Checkout />)} />
          <Route path="/" element={returnWithHeader(<Home />)} />
        </Routes>
      </div>
    </Router>
  );
}

function returnWithHeader(component) {
  return (
    <>
      <Header />
      {component}
    </>
  );
}

export default App;
