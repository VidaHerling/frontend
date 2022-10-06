import { Card, Button } from "react-bootstrap";

export default function Success(){
  return (
    <>
      <Card style={{ margin: "1rem 0" }}>
        <Card.Title className="card-header">Thank you for your order</Card.Title>
        <Card.Body>
          <h4>We have received your payment and will work on the order shortly.</h4>
          <div>
            <a href="/">Web page will redirect to homepage in 5 seconds.</a>
          </div>
        </Card.Body>
      </Card>
    </>
  )
}