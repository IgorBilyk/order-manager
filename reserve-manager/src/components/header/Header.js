import React from "react";

import Form from "./form/Form";
import { Link } from "react-router-dom";

import styles from "./Header.module.css";

function Header(props) {
  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <Link to="/reserves">Todas Reservas</Link>
        
      </nav>
      <Form />
    </header>
  );
}

export default Header;
