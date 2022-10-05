/* components/checkout/cardsection.js */

import React from "react";

import { CardElement } from "@stripe/react-stripe-js";

export default function CardSection(props) {
  return (
    <div>
      <div>
        <label htmlFor="card-element">Credit or debit card</label>

        <div>
          <fieldset style={{ border: "none" }}>
            <div className="form-row">
              <div id="card-element" style={{ width: "100%" }}>
                <CardElement
                  options={{
                    style: { base: { fontSize: "18px" } },
                  }}
                />
              </div>
              <br />
              <div className="order-button-wrapper">
                <button onClick={props.submitOrder}>Confirm order</button>
              </div>
              <div id="card-errors" role="alert" style={{ color: "red"}}>
              {props.stripeError ? (
                <div>{props.stripeError.toString()}</div>
              ) : null}
              </div>
            </div>
          </fieldset>
        </div>
      </div>
      <style jsx>
        {`
          .order-button-wrapper {
            display: flex;
            width: 100%;
            align-items: flex-end;
            justify-content: flex-end;
          }
        `}
      </style>
    </div>
  );
};