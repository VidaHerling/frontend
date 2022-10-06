/* _app.js */

import React, { useState, useContext, useEffect, startTransition } from "react";
import Head from "next/head";
import Layout from "../components/layout";
import { ApolloProvider } from "@apollo/client";
import client from "../lib/apollo";
import AppContext from "../context/AppContext";
import fetch from "isomorphic-fetch";
import Cookies from "js-cookie";
import { SessionProvider } from "next-auth/react";

export default function MyApp({ Component, pageProps }) {
  const [state, setState] = useState({ 
    cart: { items: [], total: 0 }, 
    user: null
   });

   console.log(`in app.js, the cart is ${JSON.stringify(state.cart)}`)

  useEffect(() => {
    // grab token value from cookie
    const token = Cookies.get("token");
    console.log("_app.js token is " + token);

    if (typeof cart === "string" && cart !== "undefined") {
      console.log("foyd");
      JSON.parse(cart).forEach((item) => {
        setState({
          cart: { items: JSON.parse(cart), total: item.price * item.quantity },
        });
      });
    };

    if (token) {
      // authenticate the token on the server and place set user object
      fetch(`${process.env.production.NEXT_PUBLIC_API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(async (res) => {
        // if res comes back not valid, token is not valid
        // delete the token and log the user out on client
        console.log(">>>>res and NEXT_PUBLIC_API_URL", res, " & ", process.env.NEXT_PUBLIC_API_URL )
        if (!res.ok) {
          Cookies.remove("token");
          setState({ ...state, user: null });
          return null;
        }
        const user = await res.json();
        setUser(user);
      });
    }
  }, []);

  const setUser = (user) => {
    setState({ ...state, user });
  };

  // let checkoutCart = Cookies.get("checkoutCart");
  // console.log("checkout cart in _app.js is " + JSON.stringify(checkoutCart));

  const addItem = (item) => {
    let { items } = state.cart;
    //check if item already in the cart
    let foundItem = true;
    if(items.length > 0) {
      foundItem = items.find((i) => i.id === item.id);
      if(!foundItem) foundItem = false;
    } else {
      foundItem = false;
    }
    console.log("foundItem is " + JSON.stringify(foundItem))
    console.log(`items are ${JSON.stringify(items)}`)
    console.log("add item, cart is " + JSON.stringify(state.cart))
    
    //if item is new, add to cart and set quantity equals to 1;
    if(!foundItem){
      // have to create a temp item because the item object is not extensible (new properties cannot be added)
      let temp = JSON.parse(JSON.stringify(item));
      temp.quantity = 1;
      //console.log(temp);
      let newCart = {
        items: [...items, temp],
        total: state.cart.total + item.price
      }
      setState((prevState) => ({
        ...prevState, 
        cart: newCart
      }));
      console.log(`newCart is ${JSON.stringify(newCart)}`)
      console.log(`the user is ${JSON.stringify(state.user)}`)
    } else {
      let newCart = {
        items: items.map((item) =>{
          if(item.id === foundItem.id){
            return Object.assign({}, item, { quantity: item.quantity + 1 })
           } else {
          return item;
        }}),
        total: state.cart.total + item.price
      }
      setState((prevState) => ({
        ...prevState, 
        cart: newCart
      }));
    }
  };

  const removeItem = (item) => {
    let { items } = state.cart;
    let foundItem = true;
    if(items.length > 0) {
      foundItem = items.find((i) => i.id === item.id);
      if(!foundItem) foundItem = false;
    } else {
      foundItem = false;
    }

    console.log("foundItem is " + JSON.stringify(foundItem))
    //console.log(`items are ${JSON.stringify(items)} and item is ${JSON.stringify(item)}`)

    if(foundItem.quantity > 1){
      let newCart = {
        items: items.map((item) =>{
          if(item.id === foundItem.id){
            return Object.assign({}, item, { quantity: item.quantity - 1 })
           } else {
          return item;
        }}),
        total: state.cart.total - item.price
      };
      setState((prevState) => ({
        ...prevState, 
        cart: newCart
      }));
    } else {
      let index = items.findIndex((item) => item.id === foundItem.id );
      items.splice(index, 1);
      let newCart = {
        items: items,
        total: state.cart.total - item.price,
      }
      setState((prevState) => ({
        ...prevState, 
        cart: newCart
      }));
  }};

  return (
    <AppContext.Provider
      value={{
        cart: state.cart,
        addItem: addItem,
        removeItem: removeItem,
        isAuthenticated: !!state.user,
        user: state.user,
        setUser: setUser,
      }}
    >
      <ApolloProvider client={client}>
        <Head />
          <Layout>
            <Component {...pageProps} />
          </Layout>
      </ApolloProvider>
    </AppContext.Provider>
  );
}
