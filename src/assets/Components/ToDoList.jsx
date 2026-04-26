import ToDoItem from "./ToDoItem";

function ToDoList({
  completedHandle,
  deleteHandle,
  filterButtons,
  filteredTodos,
  setFilterType,
  filterType,
  handleEdit,
  editTodo,
}) {
  return (
    <div className="container mt-3 bg-light-subtle">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6">
          <div className="card bg-body border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between mb-3">
                <h5 className="mb-0 text-dark">Görevler</h5>

                <small className="text-secondary">
                  {filteredTodos.filter((t) => t.completed).length} /{" "}
                  {filteredTodos.length}
                </small>
              </div>
              <div className="d-flex gap-2 mb-3">
                {filterButtons.map((button) => (
                  <button
                    key={button}
                    className={`btn btn-md ${filterType === button ? "btn-primary" : "btn-outline-primary"}`}
                    onClick={() => setFilterType(button)}
                  >
                    {button}
                  </button>
                ))}
              </div>

              {filteredTodos.length === 0 && (
                <div className="text-center text-secondary py-3">
                  <h6>Henüz görev yok</h6>
                  <small>Bir görev ekle 🚀</small>
                </div>
              )}

              <div className="d-flex flex-column gap-2">
                {filteredTodos.map((todo) => (
                  <ToDoItem
                    key={todo.id}
                    todo={todo}
                    completedHandle={completedHandle}
                    deleteHandle={deleteHandle}
                    handleEdit={handleEdit}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToDoList;
