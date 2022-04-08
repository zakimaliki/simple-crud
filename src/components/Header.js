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
      "https://crudcrud.com/api/4ffb348c1d734649848b5236da073a62/unicorns",
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
    <div>
      {isLoading ? <LoadingSpinner /> : ""}
      <div id="todo-header" className="header">
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
    </div>
  );
};

export default Header;
