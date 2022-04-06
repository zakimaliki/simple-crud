import { useState } from "react";
import axios from "../api";

const Header = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setTitle] = useState("");
  const addTodo = () => {
    setIsLoading(true);
    const newTodo = {
      name,
      age: 2,
      colour: "blue",
    };

    axios
      .post("unicorns", newTodo)
      .then((res) => {
        setTitle("");
        alert("A new data is added");
        setIsLoading(false);
        window.location.reload(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          setIsLoading(false);
          console.log("fetch aborted.");
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div id="todo-header" className="header">
      <h2>Simple Todo App</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setTitle(e.target.value)}
      />{" "}
      {name && (
        <span className="add-button" onClick={addTodo}>
          Add
        </span>
      )}
    </div>
  );
};

export default Header;
