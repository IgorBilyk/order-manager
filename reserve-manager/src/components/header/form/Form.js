import React, { useState } from "react";
import moment from "moment";

import styles from "./Form.module.css";
//Bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

function FormWrapper() {
  const [orders, setOrder] = useState({
    table: "",
    persons: "",
    notes: "",
    date: "",
    bookingDate: "",
    time: "",
  });
  const time = moment().format("YYYY-MM-DDThh:mm");

  const handleFormChange = (e) => {
    setOrder({ ...orders, [e.target.name]: e.target.value, date: time });
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(orders);
    setOrder({
      table: "",
      persons: "",
      notes: "",
      date: "",
      bookingDate: "",
      time: "",
    });
  };

  return (
    <Form className={styles.formWrapper} onSubmit={handleFormSubmit}>
      <label>
        Dia <br />
        <input
          type="date"
          name="bookingDate"
          value={orders.bookingDate}
          onChange={handleFormChange}
          required
        />
      </label>
      <label>
        Hora:
        <br />
        <input
          type="time"
          name="time"
          value={orders.time}
          onChange={handleFormChange}
          required
        />
      </label>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Mesa #</Form.Label>
        <Form.Control
          type="number"
          placeholder="Numero de mesa"
          maxLength="4"
          max="100"
          name="table"
          value={orders.table}
          onChange={handleFormChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Numero das Pessoas</Form.Label>
        <Form.Control
          type="number"
          placeholder="Numero das Pessoas"
          name="persons"
          value={orders.persons}
          onChange={handleFormChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Label>Informaçao</Form.Label>
        <Form.Check
          className={styles.textarea}
          type="textarea"
          placeholder="Texto..."
          name="notes"
          value={orders.notes}
          onChange={handleFormChange}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Guardar
      </Button>
    </Form>
  );
}

export default FormWrapper;
