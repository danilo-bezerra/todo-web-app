import { HTMLAttributes } from "react";
import styles from "./styles.module.scss";

type Props = HTMLAttributes<HTMLButtonElement>;

export function Button({ className = "", children, ...rest }: Props) {
  return (
    <button className={`${styles.button} ${styles[className]}`} {...rest}>
      {children}
    </button>
  );
}
