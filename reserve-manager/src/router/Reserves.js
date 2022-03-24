import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { BsFillPrinterFill } from "react-icons/bs";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai"; //AiOutlineArrowDown

import { Link } from "react-router-dom";

import Popup from "../components/popup/Popup";

import styles from "./Reserves.module.css";

export default function Reserves() {
  const [orders, setOrders] = useState([]);
  const [count, setCount] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [editedOrder, setEditedOrder] = useState();
  const [id, setId] = useState();

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

  //Search by date
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
  //Delete individual order
  const handleDelete = (id) => {
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
  //Open edit popup and get edited order data
  const handleEdit = (id) => {
    setId(id);
    /* fetch(`http://localhost:3001/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setEditedOrder(data);
      })
      .catch((error) => console.log(error)); */

    setIsEditClicked(true);
  };
  //Close Edit popup
  const closeEditPopup = () => {
    setIsEditClicked(false);
  };

  //Update order (edit order)
  const changeEditOrder = (data) => {
    /*  fetch(`http://localhost:3001/update/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
        setCount((prevCount) => prevCount + 1);
      })
      .catch((error) => console.log(error)); */
  };
  const increaseCount = () => {
    if (count > 100) return setCount(0);
    setCount((prevCount) => prevCount + 1);
  };
  //Get all orders
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
          <button
            className="btn btn-sm btn-danger"
            onClick={() => handleDelete(order._id)}
          >
            Delete
          </button>
          <button
            className="btn btn-sm btn-primary mx-2"
            onClick={() => handleEdit(order._id)}
          >
            Edit
          </button>
        </th>
        <th scope="row">{order.table}</th>
        <td>{order.persons}</td>
        <td>{order.name}</td>
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
  console.log(count);
  return (
    <main>
      {isEditClicked && (
        <Popup
          closeEditPopup={closeEditPopup}
          /* editedOrder={editedOrder} */ changeEditOrder={changeEditOrder}
          increaseCount={increaseCount}
          id={id}
        />
      )}
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
            <th scope="col">N# Pessoas</th>
            <th scope="col">
              <button onClick={sortByName} className={styles.sortByName}>
                {isClicked ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />}
                Nome
              </button>
            </th>

            <th scope="col">Dia/hora</th>
            <th scope="col">Phone</th>
            <th scope="col">Informação</th>
          </tr>
        </thead>
        <tbody>{outputHandler()}</tbody>
      </table>
      {!orders.length ? (
        <p className={styles.notFound}>
          No items found. <Link to="/">Add new order</Link>
        </p>
      ) : (
        ""
      )}
    </main>
  );
}
