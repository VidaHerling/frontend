/* pages/checkout.js */

import React, { useContext, useState } from "react";

import { Row, Col } from "react-bootstrap";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/checkout/CheckoutForm";
import AppContext from "../context/AppContext";
import Cart from "../components/cart";

export default function Checkout() {
  // get app context
  const { isAuthenticated } = useContext(AppContext);
  // isAuthenticated is passed to the cart component to display order button

  // load stripe to inject into elements components
  //const [stripePromise, setStripePromise] = useState(() => loadStripe("pk_test_51LijxvLSyC3n1jZ5jysMP93JxOI6owDlH7ypcuE6EOJvi0887PMv2zxSF3bh5Fe4Fmc1pqsi8RaA2JPbg3j6Cd4y00QkPtadYq"));
  const stripePromise = loadStripe("pk_test_51LijxvLSyC3n1jZ5jysMP93JxOI6owDlH7ypcuE6EOJvi0887PMv2zxSF3bh5Fe4Fmc1pqsi8RaA2JPbg3j6Cd4y00QkPtadYq");

  return (
    <Row>
      <Col style={{ paddingRight: 5 }} sm={{ size: 3, order: 1, offset: 2 }}>
        <h1 style={{ margin: 20 }}>Checkout</h1>
        <Cart />
      </Col>
      <Col style={{ paddingLeft: 5 }} sm={{ size: 6, order: 2 }}>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </Col>
    </Row>
  );
};