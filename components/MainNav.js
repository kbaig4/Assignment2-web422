import Link from "next/link";
import { Navbar, Nav, Container } from "react-bootstrap";

export default function MainNav() {
  return (
    <>
      <Navbar expand="lg" className="fixed-top navbar-dark bg-dark">
  <Container>
    <Navbar.Brand as={Link} href="/">Khadija Baig</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link as={Link} href="/about">About</Nav.Link>
        <Nav.Link as={Link} href="/favourites">Favourites</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>

      <br />
      <br />
    </>
  );
}
