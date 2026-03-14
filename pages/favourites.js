import { useAtom } from "jotai"; //This is something new added from Jotai Library called Atom
import { favouritesAtom } from "./store";
import { useRouter } from "next/router";
import PageHeader from "@/components/PageHeader";
import BookCard from "@/components/BookCard"; // This Bookcard is Part of Part 3
import { Row, Col, Button } from "react-bootstrap";

export default function Favourites() {
  const [favouritesList] = useAtom(favouritesAtom); //Favuorites List is Stored here ni the array
  const router = useRouter();

  if (favouritesList.length === 0) {
    return (
      <>
        <PageHeader
          text="Nothing Here"
          subtext="Add a book to your favourites list"
        />

        <Button //This Button is constucted for Better UI, to go back to previous menu using the router function and / takes it back onestep like a ladder
          variant="secondary" className="mb-3" onClick={() => router.push("/")} > Back to Search
        </Button>
      </>
    );
  }

  return (
    <>
      <PageHeader
        text="Favourites"
        subtext="Your Favourite Books"
      />

      <Button
        variant="secondary"
        className="mb-3"
        onClick={() => router.push("/")}
      >
        Back to Search
      </Button>

      <Row className="gy-4"> 
        {favouritesList.map((workId) => (
          <Col lg={3} md={6} key={workId}> 
            <BookCard workId={workId} />
          </Col>
        ))}
      </Row>
    </>// Here this WorkID has been used to map the Favourites List to the Book Card Functionality, which is the last part of assignment
  );
}