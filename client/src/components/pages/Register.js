import { useState } from "react";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import { API_URL } from "../../config";

const Register = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [tel, setTel] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [status, setStatus] = useState(null); //null, loading, success, serverError, clientError, loginError
  const handleSubmit = (e) => {
    e.preventDefault();

    const fd = FormData();
    fd.append("login", login);
    fd.append("password", password);
    fd.append("tel", tel);
    fd.append("avatar", avatar);
    const options = {
      method: "POST",
      body: FormData,
    };
    fetch(`${API_URL}/auth/register`, options)
      .then((res) => {
        if (res.status === 201) {
          setStatus("success");
        } else if (res.status === 400) {
          setStatus("clientError");
        } else if (res.status === 409) {
          setStatus("loginError");
        } else {
          setStatus("serverError");
        }
      })
      .catch((err) => {
        setStatus("serverError");
      });
  };
  return (
    <Form className="col-12 col-sm-3 mx-auto" onSubmit={handleSubmit}>
      <h1 className="my-4">Sing up!</h1>
      {status === "success" && (
        <Alert variant="success">
          <Alert.Heading>Success!</Alert.Heading>
          <p>You have been successfully registered!</p>
        </Alert>
      )}
      {status === "serverError" && (
        <Alert variant="danger">
          <Alert.Heading>Something went wrong...</Alert.Heading>
          <p>Unexpected error... Try again!</p>
        </Alert>
      )}
      {status === "clientError" && (
        <Alert variant="danger">
          <Alert.Heading>Not enough data</Alert.Heading>
          <p>You have to fill all the fields</p>
        </Alert>
      )}
      {status === "loginError" && (
        <Alert variant="warning">
          <Alert.Heading>Login already in use</Alert.Heading>
          <p>You have to use different login</p>
        </Alert>
      )}
      {status === "loading" && (
        <Spinner>
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      <Form.Group className="mb3" controlId="formLogin">
        <Form.Label>Login</Form.Label>
        <Form.Control
          type="text"
          value={login}
          onChange={(e) => {
            setLogin(e.target.value);
          }}
          placeholder="Enter login"
        />
      </Form.Group>
      <Form.Group className="mb3" controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Password"
        />
      </Form.Group>
      <Form.Group className="mb3" controlId="formPhoneNumber">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          type="tel"
          value={tel}
          onChange={(e) => {
            setTel(e.target.value);
          }}
          placeholder="Phone Number"
        />
      </Form.Group>
      <Form.Group className="mb3" controlId="formPhoneNumber">
        <Form.Label>Avatar</Form.Label>
        <Form.Control
          type="file"
          onChange={(e) => setAvatar(e.target.files[0])}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default Register;
