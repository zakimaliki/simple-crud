import { useState } from "react";

const Header = ({ setRefresh }) => {
  const [name, setTitle] = useState("");
  const addTodo = () => {
    const newTodo = {
      name,
      age: 2,
      colour: "blue",
    };
    fetch(
      "https://crudcrud.com/api/0273646a66ea4836b05b90b638c034fc/unicorns",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      }
    ).then(() => {
      setTitle("");
      setRefresh(true);
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
