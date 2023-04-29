import { HTMLAttributes, useContext } from "react";
import styles from "./styles.module.scss";

import { ITask } from "../../models/ITask";

import iconCross from "../../assets/icon-cross.svg";
import iconCheck from "../../assets/icon-check.svg";
import { Button } from "../Button";
import { ThemeContext } from "../../contexts/ThemeContext";

type Props = HTMLAttributes<HTMLLIElement> & {
  task: ITask;
  onCheck: (task: ITask) => void;
  onDelete: (task: ITask) => void;
};

export function TodoItem({ task, onCheck, onDelete, ...rest }: Props) {
  const { theme } = useContext(ThemeContext);
  return (
    <li
      key={task.id}
      className={`${styles.todoListItem} ${task.done ? styles.done : ""} ${
        styles[theme]
      }`}
      draggable
      {...rest}
    >
      <div className={styles.taskItemCheck} onClick={() => onCheck(task)}>
        {task.done && <img src={iconCheck} />}
      </div>
      <span>{task.task}</span>
      <Button onClick={() => onDelete(task)}>
        <img src={iconCross} alt="" />
      </Button>
    </li>
  );
}
