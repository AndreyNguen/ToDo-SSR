import React, { useState } from 'react';

export default function Task({
  task, deleteHandler, setView, user,
}) {
  const [viewInput, setViewInput] = useState(false);
  const [editInput, setEditInput] = useState({
    title: task.title,
    body: task.body,
  });

  const changeHandler = (e) => {
    setEditInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const editViewHandler = () => {
    setViewInput(true);
    setEditInput({ title: task.title, body: task.body });
  };

  const saveHandler = (id) => {
    fetch(`/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ ...editInput, id }),
    }).then(() => setView((prev) => prev.map((currentTask) => {
      if (currentTask.id === task.id) {
        return { ...currentTask, ...editInput };
      }
      return currentTask;
    })));
    setViewInput(false);
  };

  return (
    <div className="d-flex justify-content-center shadow-lg p-3 mb-5 bg-body rounded border border-4 border-dark rounded-3">
      <div className="col-sm-12 mb-2 mb-sm-0 m-2">
        <div className="card border border-1 border-dark mb-2 m-0">
          <div className="card-body">
            <h6 className="card-title">
              Task created by:
              {' '}
              {task?.User?.name}
            </h6>
            <h4 className="card-title">{task.title}</h4>
            <p className="card-text">{task.body}</p>
            {viewInput ? (
              <>
                <input
                  name="title"
                  value={editInput.title}
                  onChange={changeHandler}
                  type="text"
                  className="form-control border border-2 border-dark"
                  id="exampleFormControlInput1"
                />
                <textarea
                  name="body"
                  value={editInput.body}
                  onChange={changeHandler}
                  type="text"
                  className="form-control border border-2 border-dark mt-1"
                  id="exampleFormControlTextarea1"
                  rows="3"
                />
                <button
                  onClick={() => saveHandler(task.id)}
                  type="button"
                  className="btn btn-dark m-1"
                >
                  save
                </button>
                <button
                  onClick={() => setViewInput(false)}
                  type="button"
                  className="btn btn-dark"
                >
                  close
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => deleteHandler(task.id)}
                  type="button"
                  className="btn btn-dark"
                  disabled={user?.id !== task.User.id}
                >
                  delete
                </button>
                <button
                  onClick={() => editViewHandler(task.value)}
                  type="button"
                  className="btn btn-dark m-1"
                  disabled={user?.id !== task.User.id}
                >
                  edit
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
