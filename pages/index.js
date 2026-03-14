/**************************************************************************
*******
* WEB422 – Assignment 2
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: Khadija Baig Student ID: 183789239 Date: 13th March 2026
*
******************************************************************************
**/



import { Form, Row, Col, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import PageHeader from "@/components/PageHeader";

export default function Home() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function submitForm(data) {
    router.push({
      pathname: "/books",
      query: Object.fromEntries(
        Object.entries(data).filter(([key, value]) => value !== "")
      ),
    });
  }
// This same Code is being repeated here for Title and other field. This return functionality holds the UI of the Form, along with CSS Class of the fields
  return (
    <>
      <PageHeader
        text="Book Search"
        subtext="Find books by Searching author, title, subject, language, or first published year"
      />

      <Form onSubmit={handleSubmit(submitForm)}>
        <Row>
          <Col xs={12}>
            <Form.Group controlId="author" className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter author"
                className={errors.author ? "is-invalid" : ""}
                {...register("author", { required: "Author is required" })} // I haved This Required Functionality using register making it a mandatory field
              />
              {errors.author && (
                <div className="invalid-feedback">
                  {errors.author.message}
                </div>
              )}
            </Form.Group></Col></Row>
                
        <Row> 
          <Col lg={6}>
            <Form.Group controlId="title" className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                {...register("title")}
              />
            </Form.Group>
          </Col>

          <Col lg={6}>
            <Form.Group controlId="subject" className="mb-3">
              <Form.Label>Subject (contains)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter subject keyword"
                {...register("subject")}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col lg={6}>
            <Form.Group controlId="language" className="mb-3">
              <Form.Label>Language Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter language code (e.g. eng)"
                maxLength={3}
                {...register("language")}
              />
            </Form.Group>
          </Col>

          <Col lg={6}>
            <Form.Group controlId="first_publish_year" className="mb-3">
              <Form.Label>First Published (Year)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter published year"
                {...register("first_publish_year")}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xs={12}>
            <Button variant="primary" type="submit" className="w-100 py-3 fs-5">
              Search
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}