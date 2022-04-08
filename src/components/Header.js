import { useState } from "react";
import LoadingSpinner from "./spinner";

const Header = ({ setRefresh }) => {
  const [name, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const addTodo = () => {
    const newTodo = {
      name,
      age: 2,
      colour: "blue",
    };
    setIsLoading(true);
    fetch(
      "https://crudcrud.com/api/0273646a66ea4836b05b90b638c034fc/unicorns",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      }
    )
      .then(() => {
        setTitle("");
        setRefresh(true);
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
  };
  return (
    <div id="todo-header" className="header">
      {isLoading ? <LoadingSpinner /> : ""}
      <h2>Simple Todo App</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setTitle(e.target.value)}
      />
      {name && (
        <span className="add-button" onClick={addTodo}>
          Add
        </span>
      )}
    </div>
  );
};

export default Header;
