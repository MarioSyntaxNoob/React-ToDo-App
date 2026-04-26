import React, { useEffect, useReducer, useState } from "react";
import ToDoInput from "./assets/Components/ToDoInput";
import ToDoList from "./assets/Components/ToDoList";

function todoReducer(state, action) {
  switch (action.type) {
    case "ADD_TODO":
      if (action.payload.trim() === "") return state;

      return [
        ...state,
        {
          id: Date.now(),
          text: action.payload,
          completed: false,
        },
      ];

    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.payload);

    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo,
      );

    case "EDIT_TODO":
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, text: action.payload.text }
          : todo,
      );

    default:
      return state;
  }
}

function App() {
  const initialState = JSON.parse(localStorage.getItem("todo")) || [];
  const [toDos, dispatch] = useReducer(todoReducer, initialState);
  const [inputValue, setInputValue] = useState("");

  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(toDos));
  }, [toDos]);

  // ➜ ADD
  const addTodos = () => {
    dispatch({
      type: "ADD_TODO",
      payload: inputValue,
    });

    setInputValue("");
  };

  // ➜ DELETE
  const deleteHandle = (id) => {
    dispatch({
      type: "DELETE_TODO",
      payload: id,
    });
  };

  // ➜ TOGGLE
  const completedHandle = (id) => {
    dispatch({
      type: "TOGGLE_TODO",
      payload: id,
    });
  };

  // ➜ EDIT (inputa taşıma)
  const handleEdit = (id) => {
    const todoEdit = toDos.find((todo) => todo.id === id);

    setEditingTodo(todoEdit.id);
    setInputValue(todoEdit.text);
  };

  // ➜ EDIT SAVE
  const editTodo = () => {
    dispatch({
      type: "EDIT_TODO",
      payload: {
        id: editingTodo,
        text: inputValue,
      },
    });

    setInputValue("");
    setEditingTodo(null);
  };

  // ➜ FILTER
  const [filterType, setFilterType] = useState("All");

  const filteredTodos = toDos.filter((todo) => {
    if (filterType === "All") return true;
    if (filterType === "Active") return !todo.completed;
    if (filterType === "Completed") return todo.completed;
    return true;
  });

  const filterButtons = ["All", "Completed", "Active"];

  return (
    <div className="bg-body-tertiary min-vh-100">
      <ToDoInput
        addTodos={addTodos}
        inputValue={inputValue}
        setInputValue={setInputValue}
        editingTodo={editingTodo}
        editTodo={editTodo}
      />

      <ToDoList
        toDos={toDos}
        completedHandle={completedHandle}
        deleteHandle={deleteHandle}
        filterButtons={filterButtons}
        filteredTodos={filteredTodos}
        setFilterType={setFilterType}
        filterType={filterType}
        handleEdit={handleEdit}
      />
    </div>
  );
}

export default App;
