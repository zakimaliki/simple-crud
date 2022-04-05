import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import axios from "../api";

const TodoList = ({ isRefresh, setRefresh }) => {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    if (isRefresh) {
      axios
        .get("unicorns")
        .then((res) => {
          const data = res.data;
          setTodos(data);
        })
        .catch((err) => {
          setRefresh(false);
          if (err.name === "AbortError") {
            console.log("fetch aborted.");
          }
        });
    }
  }, [isRefresh, setRefresh]);
  return (
    <ul id="todo-list">
      {todos.map((todo) => (
        <TodoItem todo={todo} key={todo.id} setRefresh={setRefresh} />
      ))}
    </ul>
  );
};

export default TodoList;
