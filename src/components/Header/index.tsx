import { ThemeToggler } from "../ThemeToggler";
import styles from "./styles.module.scss";

export function Header() {
  return (
    <header className={styles.header}>
      <h1>TODO</h1>
      <ThemeToggler />
    </header>
  );
}
