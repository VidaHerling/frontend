/* Layout to apply on MyApp */

import React, { useContext } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import AppContext from '../context/AppContext';
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { logout } from '../lib/auth';
// import GoogleAuth from './googleAuth';

export default function Layout(props) {
  let { user, setUser } = useContext(AppContext);
  // console.log("user: " + JSON.stringify(user));

  const title = "NYC Restaurants";
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <Script 
          id="stripe-js"
          src="https://js.stripe.com/v3/" 
        />
      </Head>
      <header>
        {/* <style jsx>
          {`
            Navbar {
              color: white !important;
              font-size: 20px;
            }
          `}
        </style> */}
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/">Home</Navbar.Brand>
              <Navbar className="justify-content-end">
                {user ? 
                (<>
                  <Navbar.Text>Sign in as: {user.username}</Navbar.Text>
                  <Nav.Link
                    className="nav-link"
                    onClick={() => {
                      logout();
                      setUser(null);
                      console.log("logout user " + JSON.stringify(user))
                    }}>
                      logout
                  </Nav.Link>
                </>)
                :
                (<>
                  <Nav.Link href="/login"><Button variant="light">Log In</Button></Nav.Link>
                  <Nav.Link href="/register"><Button variant="info">Sign Up</Button></Nav.Link>
                  {/* <GoogleAuth /> */}
                </>)
                }
              </Navbar>
          </Container>
        </Navbar>
      </header>
      <Container>{props.children}</Container>
    </div>
  );
}