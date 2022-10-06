/* components/cart/index.js 
coding following the tutorial
https://strapi.io/blog/nextjs-react-hooks-strapi-shopping-cart-5
*/
import {
  Card,
  Badge,
  Button
} from "react-bootstrap";
import Link from "next/link";
import { useContext } from "react";
import { useRouter } from "next/router";
import AppContext from "../../context/AppContext";
import Cookies from "js-cookie";

export default function Cart(){
  const { user, cart, addItem, removeItem }  = useContext(AppContext);
  const router = useRouter();
  // Cookies.set("checkoutCart", JSON.stringify(cart));

  const renderItems = () => {
    console.log("in cart.js " + JSON.stringify(cart));
    // let { items } = cart;
    if(cart.items && cart.items.length){
      const itemList = cart.items.map(item => {
        if(item.quantity > 0){
          return (
            <div
              className="items-one"
              style={{ marginBottom: 15 }}
              key={item.id}
              >
              <div>
                <span>{item.name}</span> 
                <span>  ${item.price}</span>
              </div>
              <div>
                <Button
                  style={{
                    height: 25,
                    padding: 0,
                    width: 25,
                    marginRight: 10,
                    marginLeft: 10,
                  }}
                  onClick={() => addItem(item)}>
                  +
                </Button>
                <span style={{ marginLeft: 10, marginRight: 10 }} id="item-quantity">
                  {item.quantity}
                </span>
                <Button
                  style={{
                    height: 25,
                    padding: 0,
                    width: 25,
                    marginRight: 10,
                    marginLeft: 10,
                  }} 
                  onClick={() => removeItem(item)}>
                  -
                </Button>
              </div>

            </div>
          )
        }})
        return itemList;
      }
        else {
          return (<div></div>)
        }
    }

  const checkoutItems = () => {
      if(cart.items.length > 0){
        return(
          <div style={{ width: "20em", padding: 10, textAlign: "center" }} className="card-footer">
            <Badge bg="light">
              <h5 style={{ fontWeight: 100, color: "gray" }}>Total:</h5>
              <h3>${cart.total.toFixed(2)}</h3>
            </Badge>
            <div>
              {router.pathname === "/restaurants/[id]" ? (
                !user ? 
                  (<div
                    style={{
                      marginTop: 10,
                      marginRight: 10,
                    }}
                  >
                    <Link href="/login">
                      <Button style={{ width: "100%" }} color="primary">
                        <a>Sign in to Order</a>
                      </Button>
                    </Link>
                  </div>
                ): 
                (
                  <div
                    style={{
                      marginTop: 10,
                      marginRight: 10,
                    }}
                  >
                    <Link href="/checkout">
                      <Button style={{ width: "100%" }} color="primary">
                        <a>Order</a>
                      </Button>
                    </Link>
                  </div>
                )) : null
                }

              {router.pathname === "/checkout" && (
                <Button
                  style={{ width: "15em" }} 
                  color="primary"
                  onClick={() => window.history.back()}
                >
                  Back to restaurant
                </Button>
              )}
            </div>
          </div>
          )
        }
      }
      
        // {/* <Link href="/checkout">
        //   <Button style={{ width: "30%" }} color="primary">
        //     <a>Order</a>
        //   </Button>
        // </Link> */}

  return (
    <>
      <Card style={{ margin: "1rem 0" }}>
        <Card.Title className="card-header">Cart</Card.Title>
        <Card.Body>
          <h4>Your order: </h4>
          <div>
            {renderItems()}
          </div>
          <div>
            {checkoutItems()}
          </div>
          {console.log(`Route Path: ${router.asPath}`)}
        </Card.Body>
      </Card>
    </>
  )
}
// /* components/cart/index.js */

// import React, { useContext } from "react";
// import { useRouter } from "next/router";
// import { Button, Card, Badge } from "react-bootstrap";
// import AppContext from "../../context/AppContext";
// import { render } from "react-dom";

// export default function Cart(props) {
//   const { cart, addItem, removeItem }  = useContext(AppContext);
//   const router = useRouter();
//   let {items} = cart;
//   console.log(`items: ${JSON.stringify(items)}`)
//   let isAuthenticated = true;

//   return (
//     <div>
//       <Card style={{ padding: "10px 5px" }} className="cart">
//         <Card.Title style={{ margin: 10 }}>Your Order:</Card.Title>
//         <hr />
//         <Card.Body style={{ padding: 10 }}>
//           <div style={{ marginBottom: 6 }}>
//             Items:
//           </div>
//           <div>
//           { cart.items 
//           ? cart.items.map((item) => {
//               if(item.quantity > 0) {
//                 return (
//                   <div
//                     className="items-one"
//                     style={{ marginBottom: 15 }}
//                     key={item.id}
//                   >
//                     <div>
//                       <span id="item-price">&nbsp; ${item.price}</span>
//                       <span id="item-name">&nbsp; {item.name}</span>
//                     </div>
//                     <div>
//                       <Button
//                         style={{
//                           height: 25,
//                           padding: 0,
//                           width: 15,
//                           marginRight: 10,
//                           marginLeft: 10,
//                         }}
//                         onClick={() => addItem(item)}
//                         color="link"
//                       >
//                         +
//                       </Button>
//                       <span style={{ marginLeft: 10, marginRight: 10 }} id="item-quantity">
//                         {item.quantity}
//                       </span>
//                       <Button
//                         style={{
//                           height: 25,
//                           padding: 0,
//                           width: 15,
//                           marginRight: 10,
//                           marginLeft: 10,
//                         }}
//                         onClick={() => removeItem(item)}
//                         color="link"
//                       >
//                         -
//                       </Button>
//                     </div>
//                   </div>
//                 );
//               }
//             }) : null }
//           </div>
//           <div>
//             <Badge style={{ width: 200, padding: 10 }} bg="light">
//               <h5 style={{ fontWeight: 100, color: "gray" }}>Total:</h5>
//               <h3>${cart.total.toFixed(2)}</h3>
//             </Badge>
//             <Button
//               href={user ? "/checkout" : "/login" }>
//               Order
//             </Button>
//           </div>
//           {/* {console.log(router.pathname)} */}
//         </Card.Body>
//       </Card>
//       <style jsx>{`
//         #item-price {
//           font-size: 1.3em;
//           color: rgba(97, 97, 97, 1);
//         }
//         #item-quantity {
//           font-size: 0.95em;
//           padding-bottom: 4px;
//           color: rgba(158, 158, 158, 1);
//         }
//         #item-name {
//           font-size: 1.3em;
//           color: rgba(97, 97, 97, 1);
//         }
//       `}</style>
//     </div>
//   );
// };

