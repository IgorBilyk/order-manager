import { Link } from "react-router-dom";
import styles from "./Reserves.module.css";

export default function Reserves() {
  return (
    <main>
      <nav>
        <Link to="/" className={styles.link}>
          Home
        </Link>
      </nav>
      <h2>Reservas</h2>
    </main>
  );
}
