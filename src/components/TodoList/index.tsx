import { useState } from "react";
import styles from "./styles.module.scss";

import iconCross from "../../assets/icon-cross.svg";
import iconCheck from "../../assets/icon-check.svg";
import { ITask } from "../../models/ITask";

type Props = {
  list: ITask[];
  onClearCompleted: () => void;
  onCheck: (task: ITask) => void;
  onDelete: (task: ITask) => void;
};

export function TodoList({ list, onCheck, onDelete, onClearCompleted }: Props) {
  const [listType, setListType] = useState<"all" | "completed" | "active">(
    "all"
  );

  const completedTasks = list.filter((t) => t.done);
  const activeTasks = list.filter((t) => !t.done);

  const taskList =
    listType == "completed"
      ? completedTasks
      : listType == "active"
      ? activeTasks
      : list;

  return (
    <section className={styles.todoContainer}>
      <header className={styles.header}>
        <span className={styles.leftCount}>
          {activeTasks.length} items left
        </span>

        <nav className={styles.listTypeNav}>
          <button
            className={`${styles.button} ${
              listType == "all" ? styles.primary : ""
            }`}
            onClick={() => setListType("all")}
          >
            All
          </button>
          <button
            className={`${styles.button} ${
              listType == "active" ? styles.primary : ""
            }`}
            onClick={() => setListType("active")}
          >
            Active
          </button>
          <button
            className={`${styles.button} ${
              listType == "completed" ? styles.primary : ""
            }`}
            onClick={() => setListType("completed")}
          >
            Completed
          </button>
        </nav>

        <button className={styles.button} onClick={onClearCompleted}>
          Clear Completed
        </button>
      </header>
      <ul className={styles.todoList}>
        {taskList.map((t) => (
          <li
            key={t.id}
            className={`${styles.todoListItem} ${t.done ? styles.done : ""}`}
          >
            <div className={styles.taskItemCheck} onClick={() => onCheck(t)}>
              {t.done && <img src={iconCheck} />}
            </div>
            <span>{t.task}</span>
            <button className={styles.button} onClick={() => onDelete(t)}>
              <img src={iconCross} alt="" />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
