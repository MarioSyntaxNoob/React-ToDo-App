export default function ToDoInput({
  addTodos,
  inputValue,
  setInputValue,
  editingTodo,
  editTodo,
}) {
  return (
    <div className="container-fluid py-4 bg-body-tertiary border-bottom border-secondary-subtle">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6">
          <div className="card bg-body border-0 shadow-sm">
            <div className="card-body">
              <h5 className="text-center text-dark mb-3">Todo List</h5>

              <div className="input-group">
                <input
                  className="form-control bg-body-tertiary border-secondary-subtle"
                  placeholder="Yeni görev ekle..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key !== "Enter") return;
                    editingTodo === null ? addTodos() : editTodo();
                  }}
                />
                {editingTodo === null ? (
                  <button
                    className="btn btn-primary"
                    onClick={addTodos}
                    disabled={!inputValue?.trim()}
                  >
                    Ekle
                  </button>
                ) : (
                  <button
                    className="btn btn-success"
                    onClick={() => editTodo()}
                    disabled={!inputValue?.trim()}
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
