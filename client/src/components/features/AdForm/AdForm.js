import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";

import "react-datepicker/dist/react-datepicker.css";

const AdForm = (props) => {
  const {
    register,
    handleSubmit: validate,
    formState: { errors },
  } = useForm();

  const [title, setTitle] = useState(props.title || "");
  const [content, setContent] = useState(props.content || "");
  const [price, setPrice] = useState(props.price || "");
  const [loc, setLoc] = useState(props.loc || "");
  const [adDate, setAdDate] = useState(new Date());
  const [photo, setPhoto] = useState(props.photo || null);

  const handleSubmit = () => {
    if (title && content && price && loc && adDate) {
      // e.preventDefault();
      console.log({ title, content, price, loc,  adDate, photo });
      props.action({ title, content, price, loc, date:adDate, photo });
    }
  };

  return (
    <Form  className="col-12 col-sm-6 mx-auto" onSubmit={validate(handleSubmit)}>
      <h2>{props.children}</h2>
      <Form.Group className="mb-3" controlId="formTitle">
        <Form.Label>Title:</Form.Label>
        <Form.Control
          {...register("title", {
            require: true,
            minLength: 10,
            maxLength: 50,
          })}
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          placeholder="Enter title min: 10 max: 50 characters"
        />
        {errors.title && (
          <small className="d-block form-text text-danger mt-2">
            This title should be 10 - 50 characters
          </small>
        )}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formContent">
        <Form.Label>Description:</Form.Label>
        <Form.Control
          {...register("content", { require: true, minLength: 5 })}
          type="textarea"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          placeholder="Enter content min: 20 max: 1000 characters"
        />
        {errors.content && (
          <small className="d-block form-text text-danger mt-2">
            This content should be 20 - 1000 characters
          </small>
        )}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formPrice">
        <Form.Label>Price:</Form.Label>
        <Form.Control
          {...register("price", { require: true })}
          type="number"
          min="0"
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
           placeholder="Enter price"
        />
        {errors.price && (
          <small className="d-block form-text text-danger mt-2">
            Enter price
          </small>
        )}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formLoc">
        <Form.Label>Location:</Form.Label>
        <Form.Control
        {...register("loc", { require: true })}
          type="text"
          value={loc}
          onChange={(e) => {
            setLoc(e.target.value);
          }}
          placeholder="Enter location"
        />
          {errors.location && (
          <small className="d-block form-text text-danger mt-2">
            Enter location
          </small>
        )}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formDate">
        <Form.Label>Date:</Form.Label>
        <br />
        <DatePicker
        {...register("date", { require: true })}
          dateFormat="dd/MM/yyyy"
          maxDate={new Date()}
          selected={adDate}
          onChange={(date) => {
            setAdDate(date);
            console.log(date);
          }}
        />
        {errors.location && (
          <small className="d-block form-text text-danger mt-2">
            Enter date
          </small>
        )}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formPhoto">
        <Form.Label>Photo:</Form.Label>
        <br />
        <Form.Control
          type="file"
          // value={props.photo}
          onChange={(e) => {
            setPhoto(e.target.files[0]);
          }}
        />
      </Form.Group>
      <Button  variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default AdForm;
