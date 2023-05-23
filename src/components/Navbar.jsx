import axios from "axios";
import React from "react";

export default function Navbar({ user }) {
  const logoutHandler = () => {
    axios("/api/user/logout")
      .then(() => {
        window.location = "/";
      })
      .catch(console.log);
  };

  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary navbar bg-dark"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">
                <h4>TODO LIST</h4>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <ul className="navbar-nav" style={{ padding: "10px 30px 10px 30px" }}>
          {!user?.id ? (
            <>
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/timer"
                >
                  Timer
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/signup"
                >
                  Registration
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/signin"
                >
                  Login
                </a>
              </li>
            </>
          ) : (
            <div
              style={{
                display: "flex",
                columnGap: "15px",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  columnGap: "15px",
                }}
              >
                <h5>Hello</h5>
                <h4>{user?.name}</h4>
              </div>
              <div>
                <button
                  style={{ marginLeft: "20%" }}
                  onClick={logoutHandler}
                  type="button"
                  className="btn btn-light"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </ul>
      </div>
    </nav>
  );
}
