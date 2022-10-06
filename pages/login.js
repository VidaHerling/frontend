/* /pages/login.js */

import React, { useState, useEffect, useContext } from "react";
// import { useRouter } from "next/router";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
} from "react-bootstrap";
import { login, GoogleAuthCallback } from "../lib/auth";
import AppContext from "../context/AppContext";
import { useRouter } from "next/router";

export default function Login(props) {
  const [data, updateData] = useState({ identifier: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();
  const { isAuthenticated, setUser } = useContext(AppContext);
  
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/"); // redirect if you're already logged in
    }
  }, []);

  function onChange(event) {
    updateData({ ...data, [event.target.name]: event.target.value });
  }

  // console.log("login form entries: " + JSON.stringify(data));

  return (
    <Container>
      <Row>
        <Col sm="6" md={{ size: 5}}>
          <div className="paper">
            <div className="header">
              <h1 style={{color: "white", textAlign: "center"}}>Log in</h1>
            </div>
            <section className="wrapper">
              {Object.entries(error).length !== 0 &&
                error.constructor === Object &&
                error.message.map((error) => {
                  return (
                    <div
                      key={error.messages[0].id}
                      style={{ marginBottom: 10 }}
                    >
                      <small style={{ color: "red" }}>
                        {error.messages[0].message}
                      </small>
                    </div>
                  );
                })}
              <Form>
                <fieldset disabled={loading}>
                  <Form.Group>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      onChange={(event) => onChange(event)}
                      name="identifier"
                      style={{ height: 50, fontSize: "1.2em" }}
                    />
                  </Form.Group>
                  
                  <Form.Group style={{ marginBottom: 30 }}>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      onChange={(event) => onChange(event)}
                      type="password"
                      name="password"
                      style={{ height: 50, fontSize: "1.2em" }}
                    />
                  </Form.Group>

                  <Form.Group>
                    <span>
                      <a href="">
                        <small>Forgot Password?</small>
                      </a>
                    </span>
                    <Button
                      style={{ float: "right", width: 120 }}
                      color="primary"
                      onClick={() => {
                        setLoading(true);
                        login(data.identifier, data.password)
                          .then((res) => {
                            setLoading(false);
                            // set authed User in global context to update header/app state
                            setUser(res.data.user);
                            alert("Log in successfully")
                            console.log("!!!!", res.data.user)
                            window.history.back();
                          })
                          .catch((error) => {
                            setError(error.response.data);
                            setLoading(false);
                          });
                      }}
                    >
                      {loading ? "Loading... " : "Submit"}
                    </Button>
                  </Form.Group>
                </fieldset>
              </Form>
            </section>
          </div>
        </Col>
      </Row>
      <style jsx>
        {`
          .paper {
            border: 1px solid lightgray;
            box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
              0px 1px 1px 0px rgba(0, 0, 0, 0.14),
              0px 2px 1px -1px rgba(0, 0, 0, 0.12);
            border-radius: 6px;
            margin-top: 90px;
          }
          .notification {
            color: #ab003c;
          }
          .header {
            width: 100%;
            height: 120px;
            background-color: #2196f3;
            margin-bottom: 30px;
            border-radius-top: 6px;
          }
          .wrapper {
            padding: 10px 30px 20px 30px !important;
          }
          a {
            color: blue !important;
          }
          img {
            margin: 15px 30px 10px 50px;
          }
        `}
      </style>
    </Container>
  );
}