import { useState } from "react";
import styles from "./styles.module.scss";

import { ITask } from "../../models/ITask";
import { Button } from "../Button";
import { TodoItem } from "../TodoItem";

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
          <Button
            className={`${listType == "all" ? "primary" : ""}`}
            onClick={() => setListType("all")}
          >
            All
          </Button>
          <Button
            className={`${listType == "active" ? "primary" : ""}`}
            onClick={() => setListType("active")}
          >
            Active
          </Button>
          <Button
            className={`${listType == "completed" ? "primary" : ""}`}
            onClick={() => setListType("completed")}
          >
            Completed
          </Button>
        </nav>

        <Button onClick={onClearCompleted}>Clear Completed</Button>
      </header>
      <ul className={styles.todoList}>
        {taskList.map((t) => (
          <TodoItem key={t.id} onCheck={onCheck} onDelete={onDelete} task={t} />
        ))}
      </ul>
    </section>
  );
}
