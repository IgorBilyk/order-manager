import React, { useState, useEffect } from "react";

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
    <tr>
      <th scope="row">{order.table}</th>
      <td>{order.name}</td>
      <td>{order.persons}</td>
      <td>
        {order.date}
        {order.time}
      </td>
      <td>{order.phone}</td>
      <td>{order.notes}</td>
    </tr>
  ));
  return (
    <main>
      <nav>
        <Link to="/" className={styles.link}>
          Home
        </Link>
      </nav>
      <h2>Reservas</h2>
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
        <tbody>
          {output}
          {/* <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td colspan="2">Larry the Bird</td>
            <td>@twitter</td>
          </tr> */}
        </tbody>
      </table>
    </main>
  );
}
