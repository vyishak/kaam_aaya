import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#ff9900" };
  } else {
    return { color: "#ffffff" };
  }
};

const Menu = ({ history }) => (
  <div>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top mb-5">
      <Link className="navbar-brand" style={isActive(history, "/")} to="/">
        Kaam Aaya
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <ul className="navbar-nav">
          {!isAuthenticated() && (
            <>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  style={isActive(history, "/signin")}
                  to="/signin"
                >
                  Sign In
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  style={isActive(history, "/signup")}
                  to="/signup"
                >
                  Sign Up
                </Link>
              </li>
            </>
          )}

          {isAuthenticated() && (
            <>
              {/* <li className="nav-item">
                <Link
                  className="nav-link"
                  to={"/findpeople"}
                  style={isActive(history, "/findpeople")}
                >
                  Find Artists
                </Link>
              </li> */}

              <li className="nav-item">
                <Link
                  className="nav-link"
                  to={"/post/create"}
                  style={isActive(history, "/post/create")}
                >
                  Post job
                </Link>
              </li>

              {/* <li className="nav-item">
                <Link
                  className="nav-link"
                  to={`/user/${isAuthenticated().user._id}`}
                  style={isActive(
                    history,
                    `/user/${isAuthenticated().user._id}`
                  )}
                >
                  {`${isAuthenticated().user.name}'s profile`}
                </Link>
              </li> */}

              <li className="nav-item">
                <span
                  className="nav-link"
                  style={
                    (isActive(history, "/signup"),
                    { cursor: "pointer", color: "#fff" })
                  }
                  onClick={() => signout(() => history.push("/"))}
                >
                  Sign out
                </span>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  </div>
);

export default withRouter(Menu);
