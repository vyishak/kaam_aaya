import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Spinner from "../Spinner";
import { signin, authenticate } from "../auth";

class Signin extends Component {
  constructor() {
    super();
    this.state = {
      emailid: "",
      password: "",
      error: "",
      redirectToReferer: false,
      loading: false,
    };
  }

  // For chaning the state // values = name or emailid or password
  handleChange = (values) => (event) => {
    this.setState({ error: "" });
    this.setState({ [values]: event.target.value });
  };

  clickSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const { emailid, password } = this.state;

    const user = {
      emailid: emailid,
      password,
    };
    // console.log(user);
    signin(user).then((data) => {
      if (data.status === false) {
        this.setState({ error: data.message, loading: false });
      } else {
        // authenticate
        authenticate(data, () => {
          this.setState({ redirectToReferer: true });
        });
      }
    });
  };

  render() {
    const { emailid, password, error, redirectToReferer, loading } = this.state;

    if (redirectToReferer) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container">
        <h3 className="mt-2">.</h3>
        <h2 className="mt-3 mb-3">Signin</h2>

        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>

        {loading ? <Spinner /> : ""}

        <form>
          <div className="form-group">
            <label className="text-muted">Email</label>
            <input
              onChange={this.handleChange("emailid")}
              type="email"
              className="form-control"
              value={emailid}
            />
          </div>
          <div className="form-group">
            <label className="text-muted">Password</label>
            <input
              onChange={this.handleChange("password")}
              type="password"
              className="form-control"
              value={password}
            />
          </div>
          <button
            onClick={this.clickSubmit}
            className="btn btn-raised btn-primary"
          >
            Submit
          </button>
        </form>
        <p>
          <Link to="/forgot-password" className="text-danger">
            {" "}
            Forgot Password ?
          </Link>
        </p>
      </div>
    );
  }
}

export default Signin;
