import React from "react";
import { Navbar, Container, Offcanvas, Nav } from "react-bootstrap";
import Userfront from "@userfront/react";
import check from "../images/check.png";
import edit from "../images/edit.png";
import pending from "../images/pending.png";
import home from "../images/home.png";
import HYHTitle from "../images/HYHTitle.png";
import unpublish from "../images/unpublish.png"

//logout button component from Userfront
Userfront.init("5nxgy66b");

const LogoutButton = Userfront.build({
  toolId: "krobnr",
});
//------------------------------------

export default function NavBar() {
  return (
    <div>
      <Navbar style={{ width: "fit-content",fontFamily: 'Roboto, sans-serif'}} bg="light" expand={false}>
        <Container bsPrefix="none" fluid>
          <div className="navContainer">
            <Navbar.Brand>Menu</Navbar.Brand>
            <Navbar.Toggle aria-controls="offcanvasNavbar" />
          </div>
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="start"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">
                <img src={HYHTitle} width="100%" />
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="/dashboard">
                  <img className="navImg" src={home} width="20px" /> Home
                </Nav.Link>
                <Nav.Link href="/form">
                  <img
                    className="navImg"
                    src={edit}
                    width="20px"
                    padding="10px"
                  />{" "}
                  Request Input Form
                </Nav.Link>
                <Nav.Link href="/pending">
                  <img className="navImg" src={pending} width="20px" /> Pending
                  Requets
                </Nav.Link>
                <Nav.Link href="/funded">
                  {" "}
                  <img className="navImg" src={check} width="20px" /> Funded
                  Requests
                </Nav.Link>
                <Nav.Link href="/unpublished">
                  {" "}
                  <img className="navImg" src={unpublish} width="20px" /> Unpublished Requests
                </Nav.Link>
                {/* <LogoutButton/> */}
                <Nav.Link>
                  <div className="logoutBtn">
                    <LogoutButton />
                  </div>
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>
  );
}
