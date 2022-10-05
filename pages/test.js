
/* pages/restaurants.js */
import { gql, useQuery } from '@apollo/client';
import { Button, Card, Row, Container } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

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
  // useEffect(() => {
  //   if(!router.isReady) return;
  // }, [router.isReady])

  const { loading, error, data } = useQuery(GET_DISHES, {
    variables: { id: router.query.id }
  });
  console.log("router.query is " + JSON.stringify(router.query));
  console.log("router is " + JSON.stringify(router));

  if (loading) return <h1>Loading ...</h1>
  if (error) return <h1>Error loading dishes</h1>;
  // if (!data.restaurants.dishes) return <h1>No Dishes Found</h1>

  console.log('in dishes.js, data is ' + JSON.stringify(data))

  if(data.restaurants){
    const { restaurant } = data;
    return (
        <>
          <h1>{restaurant.name}</h1>
          <Row>
            {restaurant.dishes.map((res) => (
              <Col xs="6" sm="4" style={{ padding: 0 }} key={res.id}>
                <Card style={{ margin: "0 10px" }}>
                  <CardImg
                    top={true}
                    style={{ height: 150, width:150 }}
                    src={`http://localhost:1337${res.image.url}`}
                  />
                  <CardBody>
                    <CardTitle>{res.name}</CardTitle>
                    <CardText>{res.description}</CardText>
                  </CardBody>
                  <div className="card-footer">
                    <Button
                      outline
                      color="primary"
                      //onClick = {()=> addItem(res)}
                    >
                      + Add To Cart
                    </Button>
                    
                  </div>
                </Card>
              </Col>
          ))}
          </Row>
        </>
      )
    } else {
      return <h1>No dishes found</h1>
    }
};