import { FormEvent, useContext, useState } from "react";
import styles from "./styles.module.scss";
import { ThemeContext } from "../../contexts/ThemeContext";

type Props = {
  onCreate: (task: string) => void;
};

export function CreateTodo({ onCreate }: Props) {
  const [task, setTask] = useState("");
  const { theme } = useContext(ThemeContext);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (task.trim()) {
      onCreate(task);
      setTask("");
    }
  }

  return (
    <form className={`${styles.form} ${styles[theme]}`} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Create a new todo..."
        value={task}
        onChange={({ target }) => setTask(target.value)}
        autoFocus
      />
    </form>
  );
}
