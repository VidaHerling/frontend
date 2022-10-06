/* components/restaurantList 
@apollo/client documentation: https://www.apollographql.com/docs/react/get-started*/

import { gql, useQuery } from '@apollo/client';
import { Col, Card, Row, Container } from 'react-bootstrap';
import Link from 'next/link';

const GET_RESTAURANTS = gql`
{ 
  restaurants {
    id
    name
    description
    image {
      url
    }
  }
}
`;

export default function RestaurantList(props) {
  const { loading, error, data } = useQuery(GET_RESTAURANTS);
  if (loading) return <h1>Loading ...</h1>
  if (error) return <h1>Error loading restaurants</h1>;
  if (!data) return <h1>No Restaurant Found</h1>
  /* if restaurants are returned from the GraphQL query, run the filter query and set equal to varaiable restaurant Search*/
  // console.log("RestaurantList " + JSON.stringify(data))

  const searchQuery = data.restaurants.filter((res) => {
    return res.name.toLowerCase().includes(props.search);
  })

  // console.log("searchQuery is " + JSON.stringify(searchQuery))

  if(searchQuery.length != 0){
    const restaurantList = searchQuery.map((res) => (
      <Col xs="6" sm="4" style={{ padding: 0 }} key={res.id}>
        <Card style={{ margin: "10px" }}>
          <Card.Img variant="top" style={{ height: "15em" }} src={`${process.env.NEXT_PUBLIC_API_URL}${res.image.url}`} />
          <Card.Body>
            <Card.Title>{res.name}</Card.Title>
            <Card.Text>
              {res.description}
            </Card.Text>
            <Link
              as={`/restaurants/${res.id}`}
              href={`/restaurants/[${res.id}]`}
            >
              <a className="btn btn-primary">View</a>
            </Link>
          </Card.Body>
        </Card>
      </Col>
        ))
    return (
      <Row xs="3">
        {restaurantList}
      </Row>
    )
  } else {
    return <h1>No Restaurant Found</h1>
  }
};