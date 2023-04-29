import { useContext, useState } from "react";
import styles from "./styles.module.scss";

import { ITask } from "../../models/ITask";
import { Button } from "../Button";
import { TodoItem } from "../TodoItem";
import { ThemeContext } from "../../contexts/ThemeContext";

type Props = {
  list: ITask[];
  onClearCompleted: () => void;
  onCheck: (task: ITask) => void;
  onDelete: (task: ITask) => void;
  onUpdateList: (list: ITask[]) => void;
};

export function TodoList({
  list,
  onCheck,
  onDelete,
  onClearCompleted,
  onUpdateList,
}: Props) {
  const [listType, setListType] = useState<"all" | "completed" | "active">(
    "all"
  );
  const [dragItemId, setDragItemId] = useState<null | string>(null);
  const [dragOverItemId, setDragOverItemId] = useState<null | string>(null);

  const { theme } = useContext(ThemeContext);

  const completedTasks = list.filter((t) => t.done);
  const activeTasks = list.filter((t) => !t.done);

  const taskList =
    listType == "completed"
      ? completedTasks
      : listType == "active"
      ? activeTasks
      : list;

  function handleDragStart(id: string) {
    setDragItemId(id);
  }

  function handleDragEnter(id: string) {
    setDragOverItemId(id);
  }

  function handleDragEnd() {
    if (dragItemId && dragOverItemId) {
      const dragItem: ITask = list.find((t) => t.id == dragItemId)!;
      const dragOverItem: ITask = list.find((t) => t.id == dragOverItemId)!;
      const newList = list.map((t) =>
        t.id == dragItemId
          ? dragOverItem
          : t.id == dragOverItemId
          ? dragItem
          : t
      );
      onUpdateList(newList);
      setDragItemId(null);
      setDragOverItemId(null);
    }
  }

  return (
    <section className={`${styles.todoContainer} ${styles[theme]}`}>
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
          <TodoItem
            key={t.id}
            onCheck={onCheck}
            onDelete={onDelete}
            task={t}
            onDragStart={() => handleDragStart(t.id)}
            onDragEnter={() => handleDragEnter(t.id)}
            onDragEnd={handleDragEnd}
          />
        ))}
      </ul>
    </section>
  );
}
