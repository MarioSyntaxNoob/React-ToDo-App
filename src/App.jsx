import React, { useState } from "react";
import ToDoInput from "./assets/Components/ToDoInput";
import ToDoList from "./assets/Components/ToDoList";

function App() {
  const [toDos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const addTodos = () => {
    if (inputValue.trim() === "") return;
    setTodos([
      ...toDos,
      {
        id: Date.now(),
        text: inputValue,
        completed: false,
      },
    ]);
    setInputValue("");
  };
  const completedHandle = (id) => {
    setTodos(
      toDos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteHandle = (id) => {
    const deletedToDos = toDos.filter((todo) => todo.id != id);
    setTodos(deletedToDos);
  };
  const filterButtons = ["All", "Completed", "Active"];

  const [filterType, setFilterType] = useState("All");

  const filteredTodos = toDos.filter((todo) => {
    if (filterType === "All") return true;
    if (filterType === "Active") return todo.completed === false;
    if (filterType === "Completed") return todo.completed === true;
  });
  return (
    <div className="bg-body-tertiary min-vh-100">
      <ToDoInput
        addTodos={addTodos}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />

      <ToDoList
        toDos={toDos}
        completedHandle={completedHandle}
        deleteHandle={deleteHandle}
        filterButtons={filterButtons}
        filteredTodos={filteredTodos}
        setFilterType={setFilterType}
        filterType={filterType}
      />
    </div>
  );
}

export default App;
