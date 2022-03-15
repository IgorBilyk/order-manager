import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { BsFillPrinterFill } from "react-icons/bs";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai"; //AiOutlineArrowDown

import { Link } from "react-router-dom";
import styles from "./Reserves.module.css";

export default function Reserves() {
  const [orders, setOrders] = useState([]);
  const [count, setCount] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  const [search, setSearch] = useState(null);

  //Get all orders once page is loading
  useEffect(() => {
    fetchAllOrders();
  }, [count]);

  //Handle sort by name once 'Nome' button is clicked
  const sortByName = () => {
    if (!isClicked) {
      const sorted = orders.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1;
        }
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1;
        }
        return 0;
      });
      setIsClicked(true);
      setOrders(sorted);
      setCount((prevCount) => prevCount + 1);
    } else {
      const sorted = orders.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return 1;
        }
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return -1;
        }
        return 0;
      });
      setIsClicked(false);
      setOrders(sorted);
      setCount((prevCount) => prevCount + 1);
    }
  };
  useEffect(() => {
    outputHandler();
  }, [count]);

  const handleSearchDate = (e) => {
    fetch(`http://localhost:3001/${e.target.value}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
  };
  const handleDelete = (e, id) => {
    console.log(id);
    fetch(`http://localhost:3001/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCount((prevCount) => prevCount + 1);
      })
      .catch((error) => console.log(error));
  };
  const fetchAllOrders = () => {
    fetch("http://localhost:3001/reserves")
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
      })
      .catch((error) => console.log(error));
  };
  const outputHandler = () => {
    const tables = orders.map((order) => <li>{order.table}</li>);
    const output = orders.map((order) => (
      <tr className={styles.tableRow} key={order._id}>
        <th className={styles.nameRow}>
          <a
            href="#"
            className="btn btn-sm btn-danger"
            onClick={() => handleDelete(1, order._id)}
          >
            Delete
          </a>
        </th>
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
    return output;
  };

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
      <h2>Reservas {orders.length ? `(${orders.length})` : ""}</h2>

      <input type="date" onChange={handleSearchDate}></input>
      <table className="table table-sm  table-hover">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Mesa</th>
            <th scope="col">
              <button onClick={sortByName} className={styles.sortByName}>
                {isClicked ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />}
                Nome
              </button>
            </th>

            <th scope="col">N# Pessoas</th>
            <th scope="col">Dia/hora</th>
            <th scope="col">Phone</th>
            <th scope="col">Informação</th>
          </tr>
        </thead>
        <tbody>{outputHandler()}</tbody>
      </table>
    </main>
  );
}
