export default function ToDoItem({
  todo,
  completedHandle,
  deleteHandle,
  handleEdit,
}) {
  return (
    <div
      className={`d-flex justify-content-between align-items-center p-2 rounded border ${
        todo.completed
          ? "bg-success bg-opacity-10 border-success-subtle"
          : "bg-body border-secondary-subtle"
      }`}
    >
      <div className="d-flex align-items-center gap-2">
        <input
          type="checkbox"
          className="form-check-input"
          checked={todo.completed}
          onChange={() => completedHandle(todo.id)}
        />

        <span
          className={
            todo.completed
              ? "text-decoration-line-through text-secondary"
              : "text-dark"
          }
        >
          {todo.text}
        </span>
      </div>

      <div className="">
        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={() => handleEdit(todo.id)}
        >
          ✏️ Edit
        </button>
        <button
          className="btn btn-sm btn-outline-danger m-1"
          onClick={() => deleteHandle(todo.id)}
        >
          Sil
        </button>
      </div>
    </div>
  );
}
