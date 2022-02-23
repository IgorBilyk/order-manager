import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { BsFillPrinterFill } from "react-icons/bs";

import { Link } from "react-router-dom";
import styles from "./Reserves.module.css";

export default function Reserves() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/reserves")
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const tables = orders.map((order) => <li>{order.table}</li>);
  const output = orders.map((order) => (
    <tr key={order._id}>
      <th scope="row">{order.table}</th>
      <td>{order.name}</td>
      <td>{order.persons}</td>
      <td>
        {order.bookingDate.slice(0, 10)} {order.time}
      </td>
      <td>
        <a className={styles.link} href="tel:{order.phone}">
          {order.phone}
        </a>
      </td>
      <td>{order.notes}</td>
    </tr>
  ));
  return (
    <main>
      <nav>
        <Link to="/" className={styles.link}>
          Home
        </Link>
        <a href="#">
          <BsFillPrinterFill onClick={() => window.print()} />
        </a>
      </nav>
      <h2>Reservas</h2>
      <input
        type="text"
        className="form-control "
        id="search"
        placeholder="Pesquisar..."
        
      />
      <table className="table table-sm  table-hover">
        <thead>
          <tr>
            <th scope="col">Mesa</th>
            <th scope="col">Nome</th>
            <th scope="col">N# Pessoas</th>
            <th scope="col">Dia/hora</th>
            <th scope="col">Phone</th>
            <th scope="col">Informação</th>
          </tr>
        </thead>
        <tbody>{output}</tbody>
      </table>
    </main>
  );
}
