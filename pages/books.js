/**************************************************************************
*******
* WEB422 – Assignment 2
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: Khadija Baig Student ID: 183789239 Date: 19th February 2026
*
******************************************************************************
**/

import useSWR from "swr";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Pagination, Table, Button } from "react-bootstrap";
import PageHeader from "@/components/PageHeader";

export default function Books() {
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState([]);

  const router = useRouter();

  let queryString = { ...router.query };
  let qParts = [];

  Object.entries(queryString).forEach(([key, value]) => {
    qParts.push(`${key}:${value}`);
  });

  if (qParts.length > 0) {
    queryString = qParts.join(" AND ");
  } else {
    queryString = "";
  }

  const subtext = Object.keys(router.query)
    .map((key) => `${key}: ${router.query[key]}`)
    .join(" | ");

  const { data, error } = useSWR(
    queryString
      ? `https://openlibrary.org/search.json?q=${encodeURIComponent(
          queryString
        )}&page=${page}&limit=10`
      : null
  );

  useEffect(() => {
    if (data) {
      setPageData(data.docs);
    }
  }, [data]);

  useEffect(() => {
    setPage(1);
  }, [router.query]);

  function previous() {
    if (page > 1) setPage(page - 1);
  }

  function next() {
    setPage(page + 1);
  }
// I will keep this section for adding the Back button with a display of error functionality
  if (error) {
    return (
      <>
        <PageHeader text="Search Results" subtext={subtext} />
        <Button variant="secondary" className="mb-3" onClick={() => router.push("/")}>
          Back to Search
        </Button>
        <p>Failed to load data.</p>
      </>
    );
  }
// Need to establish connectivity between books data using router Key Map Function
  return (
    <>
      <PageHeader text="Search Results" subtext={subtext} />

      <Button
        variant="secondary"
        className="mb-3"
        onClick={() => router.push("/")}
      >
        Back to Search
      </Button>

      {!data ? (
        <p>Loading...</p>
      ) : (
        <>
          <Table striped hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>First Published</th>
              </tr>
            </thead>
            <tbody>
              {pageData.map((book) => (
                <tr
                  key={book.key}
                  onClick={() => router.push(book.key)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{book.title}</td>
                  <td>{book.author_name ? book.author_name.join(", ") : "N/A"}</td>
                  <td>{book.first_publish_year ? book.first_publish_year : "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Pagination>
            <Pagination.Prev onClick={previous} disabled={page === 1} />
            <Pagination.Item active>{page}</Pagination.Item>
            <Pagination.Next onClick={next} />
          </Pagination>
        </>
      )}
    </>
  );
}