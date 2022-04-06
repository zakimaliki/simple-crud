import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import LoadingSpinner from "./spinner";
import axios from "../api";

const TodoList = ({ isRefresh, setRefresh }) => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isRefresh) {
      setIsLoading(true);
      axios
        .get("unicorns")
        .then((res) => {
          const data = res.data;
          setTodos(data);
          setIsLoading(false);
        })
        .catch((err) => {
          setRefresh(false);
          if (err.name === "AbortError") {
            setIsLoading(false);
            console.log("fetch aborted.");
          }
        })
        .finally(() => setIsLoading(false));
    }
  }, [isRefresh, setRefresh]);
  return (
    <ul id="todo-list">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        todos.map((todo) => (
          <TodoItem todo={todo} key={todo.id} setRefresh={setRefresh} />
        ))
      )}
    </ul>
  );
};

export default TodoList;
