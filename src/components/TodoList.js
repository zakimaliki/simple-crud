import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import LoadingSpinner from "./spinner";

const TodoList = ({ isRefresh, setRefresh }) => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isRefresh) {
      setIsLoading(true);
      fetch(
        "https://crudcrud.com/api/0273646a66ea4836b05b90b638c034fc/unicorns"
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setRefresh(false);
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
