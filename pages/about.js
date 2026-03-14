import Link from "next/link";
import Card from "react-bootstrap/Card";
import BookDetails from "@/components/BookDetails";
import PageHeader from "@/components/PageHeader";

export async function getStaticProps() {
  const res = await fetch("https://openlibrary.org/works/OL472549W.json");
  const data = await res.json();

  return {
    props: { book: data },
  };
}

export default function About({ book }) {
  return (
    <>
      <PageHeader text="About the Developer - Khadija Baig" />

      <Card>
        <Card.Body>
          <p>
            Hi 👋🏻, my name is Khadija Baig, and I am in my 5th semester of the
            CPA program! I am keen on learning new things that help me develop
            my skills. Through this project, I explored how to integrate public
            APIs using React and Next.js to build a dynamic and user-friendly
            interface.
            <br />
            <br />
            For this project, I chose the book "The Man in the Brown Suit".
          </p>

          <p>
            You can explore more books at{" "}
            <Link href="https://openlibrary.org" target="_blank">
              Open Library
            </Link>
            .
          </p>
        </Card.Body>
      </Card>

      <br />

      <BookDetails
        book={book}
        workId="OL472549W"
        showFavouriteBtn={false}
      />
    </>
  );
}