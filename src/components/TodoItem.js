import axios from "../api";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Modal from "react-modal";
import React from "react";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  input: {
    margin: "0",
    border: "solid 0.5 black",
    borderradius: "0",
    width: "75%",
    padding: "10px",
    float: "left",
    fontsize: "16px",
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement(document.getElementById("root"));

const TodoItem = ({ todo }) => {
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [setIsLoading] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  const [name, setTitle] = useState("");

  let id = todo._id;
  const updateTodo = () => {
    setIsLoading(true);
    let todo = {
      name,
      age: 3,
      colour: "red",
    };
    axios
      .put("unicorns/" + id, todo)
      .then(() => {
        alert(todo.name + " " + "are updated.");
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

  const deleteTodo = () => {
    setIsLoading(true);
    axios
      .delete("unicorns/" + id)
      .then(() => {
        alert(todo.name + " " + "are deleted.");
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
    <li>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Update Data</h2>
        <button onClick={closeModal}>x</button>
        <form>
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setTitle(e.target.value)}
            />
            {name && (
              <span className="add-button" onClick={updateTodo}>
                Update
              </span>
            )}
          </div>
        </form>
      </Modal>
      <div>{todo.name}</div>
      <div>{todo.age}</div>
      <div>{todo.colour}</div>
      <div>{todo._id}</div>
      <span className="open" onClick={openModal}>
        <FontAwesomeIcon icon={faPencil} />
      </span>
      <span className="close" onClick={deleteTodo}>
        x
      </span>
      <br />
    </li>
  );
};

export default TodoItem;
