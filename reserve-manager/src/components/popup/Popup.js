import React, { useState, useEffect } from "react";
import styles from "./Popup.module.css";

import "bootstrap/dist/css/bootstrap.min.css";

export default function Popup({ closeEditPopup, increaseCount, id }) {
  const [newOrder, setEditedOrder] = useState({});

  const handleFormChange = (e) => {
    setEditedOrder({
      ...newOrder,
      [e.target.name]: e.target.value,
    });
    console.log(newOrder);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    /* changeEditOrder(newOrder); */
    fetch(`http://localhost:3001/update/${id}`, {
      method: "PUT",
      body: JSON.stringify(newOrder),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setEditedOrder(data);
        //setCount((prevCount) => prevCount + 1);
        increaseCount();
        closeEditPopup();
      })
      .catch((error) => console.log(error));
  };
  //Get individual order
  const fetchIndividualOrder = async (id) => {
    const response = await fetch(`http://localhost:3001/${id}`);
    const result = await response.json();
    setEditedOrder(result);
  };
  useEffect(async () => {
    await fetchIndividualOrder(id);

    return () => {
      setEditedOrder({});
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <form>
          {/* <label>
            Dia
            <input
              type="date"
              name="bookingDate"
              value="2022-12-12"
              onChange={handleFormChange}
            ></input>
          </label> */}
          <label>
            Hora:
            <input
              type="time"
              name="time"
              value={newOrder.time}
              onChange={handleFormChange}
            />
          </label>
          <label>
            Mesa:
            <input
              type="number"
              maxLength="4"
              max="100"
              name="table"
              value={newOrder.table}
              onChange={handleFormChange}
            />
          </label>
          <label>
            Pessoas:
            <input
              id="person"
              type="number"
              name="persons"
              value={newOrder.persons}
              onChange={handleFormChange}
            />
          </label>
          <label>
            Name:
            <input
              id="name"
              type="text"
              name="name"
              value={newOrder.name}
              onChange={handleFormChange}
            />
          </label>
          <label>
            Phone:
            <input
              id="phone"
              type="number"
              name="phone"
              value={newOrder.phone}
              onChange={handleFormChange}
            />
          </label>
          <label>
            Texto:
            <input
              id="text"
              className={styles.textarea}
              type="textarea"
              name="notes"
              value={newOrder.notes}
              onChange={handleFormChange}
            />
          </label>
          <div className={styles.btnWrapper}>
            <button
              className="btn btn-success"
              type="button"
              onClick={handleFormSubmit}
            >
              Enviar
            </button>
            <button
              className="btn btn-danger"
              onClick={closeEditPopup}
              type="button"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
