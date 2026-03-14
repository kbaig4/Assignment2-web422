import { Container, Row, Col, Button } from "react-bootstrap";
import { useAtom } from "jotai";
import { favouritesAtom } from "../store";

import { useState, useEffect } from "react";

export default function BookDetails({ book, workId, showFavouriteBtn = true }) {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(favouritesList.includes(workId));

  useEffect(() => {
    setShowAdded(favouritesList.includes(workId));
  }, [favouritesList, workId]);

  function favouritesClicked() {
    if (showAdded) {
      setFavouritesList((current) => current.filter((fav) => fav != workId));
      setShowAdded(false);
    } else {
      setFavouritesList((current) => [...current, workId]);
      setShowAdded(true);
    }
  }

  return (
    <Container>
      <Row>
        <Col lg="4">
          <img
            onError={(event) => {
              event.target.onerror = null;
              event.target.src =
                "https://placehold.co/400x600?text=Cover+Not+Available";
            }}
            className="img-fluid w-100"
            src={`https://covers.openlibrary.org/b/id/${book?.covers?.[0]}-L.jpg`}
            alt="Cover Image"
          />
          <br />
          <br />
        </Col>

        <Col lg="8">
          <h3>{book?.title}</h3>

          {book?.description && (
            <p>
              {typeof book.description === "string"
                ? book.description
                : book.description.value}
            </p>
          )}

          <br />

          {book?.subject_people?.length > 0 && (
            <>
              <h5>Characters</h5>
              {book.subject_people.join(", ")}
              <br />
              <br />
            </>
          )}

          {book?.subject_places?.length > 0 && (
            <>
              <h5>Settings</h5>
              {book.subject_places.join(", ")}
              <br />
              <br />
            </>
          )}

          {book?.links?.length > 0 && (
            <>
              <h5>More Information</h5>
              {book.links.map((l, idx) => (
                <span key={idx}>
                  <a href={l.url} target="_blank" rel="noreferrer">
                    {l.title}
                  </a>
                  <br />
                </span>
              ))}
              <br />
            </>
          )}

          {showFavouriteBtn && (
            <Button
              variant={showAdded ? "primary" : "outline-primary"}
              onClick={favouritesClicked}
            >
              {showAdded ? "+ Favourite (added)" : "+ Favourite"}
            </Button>
          )}
        </Col>
      </Row>
    </Container>
  );
}