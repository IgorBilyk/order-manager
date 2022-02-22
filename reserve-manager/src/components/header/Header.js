import React from "react";

import Form from "./form/Form";

import styles from "./Header.module.css";

function Header(props) {
  return (
    <header className={styles.header}>
      <Form />
    </header>
  );
}

export default Header;
