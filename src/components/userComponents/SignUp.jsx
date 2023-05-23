import axios from 'axios';
import React, { useState } from 'react';

export default function SignUp() {
  const [error, setError] = useState({});

  const submitSignUpHandler = (e) => {
    e.preventDefault();
    // Cобираем значиния имён с инпутов, конвертируем в объект. 
    const formData = Object.fromEntries(new FormData(e.target));
    const {
      email, pass, passRepeat, name,
    } = formData;
    // Проверка на пустые инпуты
    if (!(email, pass, passRepeat, name)) {
      return setError({
        message: 'Fill all form',
      });
    }
    // Проверка на схожесть паролей.
    if (pass !== passRepeat) {
      return setError({
        message: 'Password do not much',
      });
    }
    axios.post('/api/user/signup', formData)
      .then(() => {
        window.location.href = '/';
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  };

  return (
    <div className="d-flex justify-content-center w-100 p-3 rounded-3">
      <form onSubmit={submitSignUpHandler} className="col-sm-5 mb-2 mb-sm-0 m-2">
        <div className="mb-3">
          <input
            name="name"
            type="text"
            className="form-control border border-2 border-dark"
            id="userName"
            placeholder="Add your Name"
          />
        </div>
        <div className="mb-3">
          <input
            name="email"
            type="email"
            className="form-control border border-2 border-dark"
            id="userEmail"
            placeholder="Add your Email"
          />
        </div>
        <div className="mb-3">
          <input
            name="pass"
            type="password"
            className="form-control border border-2 border-dark"
            id="userPassword"
            placeholder="Add your Password"
            required
            minLength={7}
          />
        </div>
        <div className="mb-3">
          <input
            name="passRepeat"
            type="password"
            className="form-control border border-2 border-dark"
            id="userPassword"
            placeholder="Repeat your Password"
            required
            minLength={7}
          />
        </div>
        <div>
          <button className="btn btn-dark" type="submit">Reg now!</button>
          {error.message && <div style={{ color: 'purple' }}>{error.message}</div>}
        </div>
      </form>
    </div>
  );
}
