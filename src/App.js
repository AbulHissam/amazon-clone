import "./App.css";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Checkout from "./components/Checkout/Checkout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userSelector, login, logout } from "./features/userSlice";
import { basketSelector } from "./features/basketSlice";
import { onAuthStateChanged, signOut } from "@firebase/auth";
import { auth } from "./firebase/firebase";

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
          <Route path="/login" element={<Login />} />
          <Route path="/" element={returnWithHeader(<Home />)} />
          <Route path="/checkout" element={returnWithHeader(<Checkout />)} />
          />
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
