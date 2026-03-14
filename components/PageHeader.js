import { Card } from "react-bootstrap";

export default function PageHeader(props) {
  return (
    <>
      <Card className="bg-light mt-4 mb-4">
        <Card.Body className="py-4 text-center">
          <h1 className="mb-2">{props.text}</h1>
          {props.subtext && (
            <p className="text-muted mb-0">{props.subtext}</p>
          )}
        </Card.Body>
      </Card>
    </>
  );
}
