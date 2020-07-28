import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { otp } from "../auth";

class Otp extends Component {
  constructor() {
    super();
    this.state = {
      inp: "",
      error: "",
      redirectToReferer: false,
    };
  }

  // For chaning the state // values = name or email or password
  handleChange = (values) => (event) => {
    this.setState({ error: "" });
    this.setState({ [values]: event.target.value });
  };

  clickSubmit = (event) => {
    event.preventDefault();
    const { inp } = this.state;

    const user = {
      inp,
    };
    // console.log(user);
    otp(user).then((data) => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        this.setState({ inp: "" });
      }
    });
  };

  render() {
    const { inp, error } = this.state;

    // if (redirectToReferer) {
    //   return <Redirect to="/" />;
    // }
    return (
      <div className="container txt">
        <h3 className="mt-2">.</h3>
        <h2 className="mt-5 mb-3">
          Validate your Otp to Activate your account
        </h2>

        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>

        <form>
          <div className="form-group">
            <label className="text-muted">OTP</label>
            <input
              onChange={this.handleChange("inp")}
              type="text"
              className="form-control"
              value={inp}
            />
          </div>
          <button
            onClick={this.clickSubmit}
            className="btn btn-raised btn-primary"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Otp;
