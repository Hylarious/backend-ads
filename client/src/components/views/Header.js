import { Container, Nav, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { checkIfLoggedIn } from "../../redux/usersRedux";

const Header = () => {
  const user = useSelector(state => checkIfLoggedIn(state));

  return (
    <div>
      <Navbar bg="primary" data-bs-theme="light">
        <Container>
          <Navbar.Brand as={NavLink} to="/">Ads App</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
            {user === null  && <Nav.Link as={NavLink} to="/register">Register</Nav.Link> }
            {user === null &&<Nav.Link as={NavLink} to="/login">Login</Nav.Link> }
            {user !== null && <Nav.Link as={NavLink} to="/ad/add">Add</Nav.Link>}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
