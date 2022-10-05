
/* pages/restaurants.js */
import { gql, useQuery } from '@apollo/client';
import { Button, Card, Row, Col, Container } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import Cart from '../../components/cart';
import AppContext from '../../context/AppContext';

const GET_DISHES = gql`
query($id: ID!) {
  restaurant(id: $id) {
    id
    name
    dishes {
      id
      name
      description
      price
      image {
        url
      }
    }
  }
}
`;

export default function Restaurants(props){
  const router = useRouter();
  const { addItem, user } = useContext(AppContext);

  const { loading, error, data } = useQuery(GET_DISHES, {
    variables: { id: router.query.id }
  });
  // console.log("router.query is " + JSON.stringify(router.query));
  console.log("router is " + JSON.stringify(router.query));
  //console.log("router.asPath" + router.asPath);

  if (loading) return <h1>Loading ...</h1>
  if (error) return <h1>Error loading dishes</h1>;
  // if (!data.restaurants.dishes) return <h1>No Dishes Found</h1>

  console.log('in dishes.js, data is ' + JSON.stringify(data))
  console.log("on restaurant page, the user is " + JSON.stringify(user));

  const { restaurant } = data;
  if(restaurant){
    return (
        <>
          <h1>{restaurant.name}</h1>
          <Row>
            {restaurant.dishes.map((dish) => (
              <Col xs="6" sm="4" style={{ padding: 0 }} key={dish.id}>
                <Card style={{ margin: "10px" }}>
                  <Card.Img
                    variant="top"
                    style={{ height: "15em" }}
                    src={`http://localhost:1337${dish.image.url}`}
                  />
                  <Card.Body>
                    <Card.Title>{dish.name}</Card.Title>
                    <Card.Text>$ {dish.price}</Card.Text>
                    <Card.Text>{dish.description}</Card.Text>
                  </Card.Body>
                  <div className="card-footer">
                    <Button
                      variant="outline-primary"
                      onClick = {()=> addItem(dish)}
                    >
                      + Add To Cart
                    </Button>
                  </div>
                </Card>
              </Col>
          ))} 
            <Col>
              <Cart /> 
            </Col>
          </Row>

          <Container>
            <Button
              href="/"
              variant="outline-primary">
              Back to Home Page
            </Button>
          </Container>
        </>
      )
    } else {
      return <h1>No dishes found</h1>
    }
};