import { useState } from "react";
import axios from "../api";

const Header = () => {
  const [name, setTitle] = useState("");
  const addTodo = () => {
    const newTodo = {
      name,
      age: 2,
      colour: "blue",
    };

    axios.post("unicorns", newTodo).then((res) => {
      setTitle("");
      alert("A new data is added");
      window.location.reload(false);
    });
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
