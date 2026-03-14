import useSWR from "swr";
import Error from "next/error";
import Link from "next/link";
import { Card, Button } from "react-bootstrap";

export default function BookCard({ workId }) {
  const { data, error } = useSWR(
    workId ? `https://openlibrary.org/works/${workId}.json` : null
  );

  if (error || !data) {
    return <Error statusCode={404} />;
  }

  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        onError={(event) => {
          event.target.onerror = null;
          event.target.src =
            "https://placehold.co/400x600?text=Cover+Not+Available";
        }}
        className="img-fluid w-100"
        src={`https://covers.openlibrary.org/b/id/${data?.covers?.[0]}-M.jpg`}
        alt="Cover Image"
      />

      <Card.Body className="d-flex flex-column">
        <Card.Title>{data?.title || ""}</Card.Title>
        <Card.Text>
          {data?.first_publish_date ? data.first_publish_date : "N/A"}
        </Card.Text>

        <Link href={`/works/${workId}`} passHref legacyBehavior>
          <Button variant="primary">View Details</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}