import { useContext, useState } from "react";
import styles from "./styles.module.scss";

import iconMoon from "../../assets/icon-moon.svg";
import iconSun from "../../assets/icon-sun.svg";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Button } from "../Button";

export function ThemeToggler() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Button onClick={toggleTheme}>
      <img src={theme == "dark" ? iconMoon : iconSun} alt="" />
    </Button>
  );
}
