import { useState } from "react";
import styles from "./styles.module.scss";

import iconMoon from "../../assets/icon-moon.svg";
import iconSun from "../../assets/icon-sun.svg";

export function ThemeToggler() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  function handleToggle() {
    setTheme((t) => (t == "dark" ? "light" : "dark"));
    document.body.classList.toggle("dark");
  }

  return (
    <button className={styles.themeToggler} onClick={handleToggle}>
      <img src={theme == "dark" ? iconMoon : iconSun} alt="" />
    </button>
  );
}
