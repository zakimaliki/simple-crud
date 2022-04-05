import axios from "../api";
const TodoItem = ({ todo }) => {
  let id = todo._id;
  const updateTodo = () => {
    const todo = {
      name: "Sparkle Angel test",
      age: 3,
      colour: "red",
    };
    axios.put("unicorns/" + id, todo).then(() => {
      alert(todo.name + " " + "are updated.");
      window.location.reload(false);
    });
  };

  const deleteTodo = () => {
    axios.delete("unicorns/" + id).then(() => {
      alert(todo.name + " " + "are deleted.");
      window.location.reload(false);
    });
  };

  return (
    <li>
      <div>{todo.name}</div>
      <div>{todo.age}</div>
      <div>{todo.colour}</div>
      <div>{todo._id}</div>
      <span className="open" onClick={updateTodo}>
        ✓
      </span>
      <span className="close" onClick={deleteTodo}>
        x
      </span>
    </li>
  );
};

export default TodoItem;
