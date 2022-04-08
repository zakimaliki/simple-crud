import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Modal from "react-modal";
import React from "react";
import LoadingSpinner from "./spinner";

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

Modal.setAppElement(document.getElementById("root"));

const TodoItem = ({ todo, setRefresh }) => {
  const [isLoading, setIsLoading] = useState(false);
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  const [name, setTitle] = useState("");

  let id = todo._id;

  const updateTodo = () => {
    let todo = {
      name,
      age: 3,
      colour: "red",
    };
    setIsLoading(true);
    fetch(
      "https://crudcrud.com/api/0273646a66ea4836b05b90b638c034fc/unicorns/" +
        id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      }
    )
      .then(() => {
        console.log("todo updated.");
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

  const deleteTodo = () => {
    setIsLoading(true);
    fetch(
      "https://crudcrud.com/api/0273646a66ea4836b05b90b638c034fc/unicorns/" +
        id,
      {
        method: "DELETE",
      }
    )
      .then(() => {
        console.log("todo deleted.");
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
    </div>
  );
};

export default TodoItem;
