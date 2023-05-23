import React, { useState } from 'react';
import Task from './Task';

export default function Form({ allTasks, user }) {
  const [input, setInput] = useState({ title: '', body: '' });
  const [view, setView] = useState(allTasks);

  const submitHandler = (e) => {
    e.preventDefault();
    fetch('/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(input),
    })
      .then((res) => res.json())
      .then((data) => {
        setView((prev) => [data, ...prev]);
        setInput({ title: '', body: '' });
      });
  };

  const deleteHandler = (id) => {
    fetch(`/tasks/${id}`, {
      method: 'DELETE',
    })
      .then(() => setView((prev) => prev.filter((el) => el.id !== id)));
  };

  const changeHandler = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <>
      <div className="d-flex justify-content-center w-100 p-3 rounded-3">
        <form onSubmit={submitHandler} className="col-sm-5 mb-2 mb-sm-0 m-2">
          <div className="mb-3">
            <input
              name="title"
              value={input.title}
              onChange={changeHandler}
              type="text"
              className="form-control border border-2 border-dark"
              id="exampleFormControlInput1"
              placeholder="add title"
              required
              minLength={3}
            />
          </div>
          <div className="mb-3">
            <textarea
              name="body"
              value={input.body}
              onChange={changeHandler}
              type="text"
              className="form-control border border-2 border-dark"
              id="exampleFormControlTextarea1"
              rows="3"
              placeholder="add task"
              required
              inputMode=""
              minLength={3}
            />
          </div>
          <div>
            <button className="btn btn-dark" type="submit">add task</button>
          </div>
        </form>
      </div>
      <div className="container col-5">
        {view?.map((task) => (
          <Task
            task={task}
            key={task.id}
            setView={setView}
            deleteHandler={deleteHandler}
            input={input}
            setInput={setInput}
            user={user}
          />
        ))}
      </div>

    </>
  );
}
