import React, { useContext } from "react";
import { useState } from "react";
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import Lightswitch from "./Lightswitch";
import { DarkModeContext } from "./context/DarkModeContext";

function Container() {
  const { darkMode } = useContext(DarkModeContext);
  const [isRefresh, setIsRefresh] = useState(true);

  const setRefresh = (status) => {
    setIsRefresh(status);
  };
  return (
    <div
      className={
        darkMode ? `Container Container-dark` : `Container Container-light`
      }
    >
      <div className="content">
        <Header setRefresh={setRefresh} />
        <TodoList setRefresh={setRefresh} isRefresh={isRefresh} />
      </div>
      <Lightswitch />
    </div>
  );
}

export default Container;
