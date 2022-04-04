import React, { useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router";

import styles from "./Form.module.css";
//Bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

function FormWrapper() {
  const navigate = useNavigate();

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const [orders, setOrder] = useState({
    table: "",
    persons: "1",
    notes: "",
    date: null,
    bookingDate: "",
    time: "",
    name: "",
    phone: "",
  });
  const time = moment().format("DD/MM/YYYY");
  console.log();
  const handleFormChange = (e) => {
    setOrder({
      ...orders,
      [e.target.name]: e.target.value,
      date: time,
    });
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/add", {
      method: "POST",
      body: JSON.stringify(orders),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
    setOrder({
      table: "",
      persons: "",
      notes: "",
      date: "",
      bookingDate: "",
      time: "",
      name: "",
      phone: "",
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
      <Form.Group className="mb-3">
        <Form.Label>Mesa #</Form.Label>
        <Form.Control
          id="table"
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

      <Form.Group className="mb-3">
        <Form.Label>Numero das Pessoas</Form.Label>
        <Form.Control
          id="person"
          type="number"
          placeholder="Numero das Pessoas"
          name="persons"
          min="1"
          value={orders.persons}
          onChange={handleFormChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Nome</Form.Label>
        <Form.Control
          id="name"
          type="text"
          placeholder="Nome"
          name="name"
          value={orders.name}
          onChange={handleFormChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Phone</Form.Label>
        <Form.Control
          id="phone"
          type="number"
          placeholder="Phone"
          name="phone"
          min="1"
          value={orders.phone}
          onChange={handleFormChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Informaçao</Form.Label>
        <Form.Check
          id="text"
          className={styles.textarea}
          type="textarea"
          placeholder="Texto..."
          name="notes"
          value={orders.notes}
          onChange={handleFormChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        {"Enviar"}
      </Button>
    </Form>
  );
}

export default FormWrapper;
