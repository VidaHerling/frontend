/* pages/index.js */
import { Button, Form } from 'react-bootstrap';
import React, { useState } from 'react';
// import client from '../lib/apollo';
// import { ApolloProvider } from '@apollo/client';
import RestaurantList from '../components/RestaurantList';

export default function Home() {
  const [query, setQuery] = useState("");

  return (
    <>
      <div className="search">
        <h1>NYC Restaurants</h1>
          <Form className="d-flex">
          <Button variant="primary" style={{ margin: "1em 1em 1em 0"}}> Search </Button>
          <Form.Control
            style={{ margin: "1em 0"}}
            onChange={(e) =>
            setQuery(e.target.value.toLocaleLowerCase())
            }
            value={query}
          />
          </Form>
      </div>
      <RestaurantList search={query} />
    </>
  );
}