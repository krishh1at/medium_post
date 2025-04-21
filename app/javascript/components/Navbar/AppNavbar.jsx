import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const AppNavbar = ({ loggedIn, user, handleLogout }) => {
  return (
    <Navbar bg="light" expand="lg" className="mb-4 shadow-sm">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Medium Post</Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="app-navbar-nav" />
        <Navbar.Collapse id="app-navbar-nav">
          {
            loggedIn && (
              <Nav className="me-auto">
                <LinkContainer to="/">
                  <Nav.Link>Posts</Nav.Link>
                </LinkContainer>

                {
                  user.role == 'creator' && (
                    <>
                      <LinkContainer to="/my/posts">
                        <Nav.Link>Creator</Nav.Link>
                      </LinkContainer>
                      <LinkContainer to="/create/post">
                        <Nav.Link>New post</Nav.Link>
                      </LinkContainer>
                    </>
                  )
                }
              </Nav>
            )
          }

          <Nav>
            {
              loggedIn ? (
                <NavDropdown title={user?.name || "Account"} id="user-dropdown">
                  <LinkContainer to="/dashboard">
                    <NavDropdown.Item>Dashboard</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <LinkContainer to="/">
                    <Nav.Link>Login</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Nav.Link>Register</Nav.Link>
                  </LinkContainer>
                </>
              )
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
