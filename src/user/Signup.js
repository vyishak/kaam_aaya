import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { signup, otp, forgotPassword } from "../auth";

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      emailid: "",
      password: "",
      phonenumber: "",
      company: "",
      address: "",
      error: "",
      open: false,
      message: "",
      click: "",
      inp: "",
      redirectToProfile: false,
      userType: "Employer",
    };
  }

  // For chaning the state // values = name or emailid or password
  handleChange = (values) => (event) => {
    this.setState({ error: "" });
    this.setState({ [values]: event.target.value });
  };

  isValid = () => {
    const {
      name,
      emailid,
      password,
      phonenumber,
      address,
      company,
      click,
      userType,
    } = this.state;

    const mail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const decimal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,15}$/;

    if (!name || !phonenumber || !company || !address) {
      this.setState({ error: "Please Complete all Fields" });
      return false;
    }

    if (emailid.length === 0 || !emailid.match(mail)) {
      this.setState({ error: "Please enter valid Email" });
      return false;
    }

    if (!password.match(decimal)) {
      this.setState({
        error:
          "Password must contain atleast 1 Upper case, 1 lower case, 1 Special Character and should be 6 to 15 characters",
      });
      return false;
    }

    if (click !== "checked") {
      this.setState({ error: "Please agree the Terms & Conditions" });
      return false;
    }

    return true;
  };

  toggleClick = () => {
    this.setState({ click: "checked" });
  };

  clickSubmitTwo = (event) => {
    const {
      name,
      emailid,
      phonenumber,
      address,
      company,
      password,
      userType,
      redirectToProfile,
      inp,
    } = this.state;

    if (this.isValid()) {
      const user = {
        name: name,
        emailid,
        password,
        phonenumber,
        address,
        company,
        userType,
        inp,
      };

      otp(user).then((data) => {
        console.log(data);
        if (data.status === false) {
          this.setState({ error: data.message });
        } else {
          this.setState({ redirectToProfile: true });
        }
      });
    }
  };

  clickSubmit = (event) => {
    event.preventDefault();
    const {
      name,
      emailid,
      phonenumber,
      address,
      company,
      password,
      userType,
      inp,
    } = this.state;

    if (this.isValid()) {
      const user = {
        name: name,
        emailid,
        password,
        phonenumber,
        address,
        company,
        userType,
        inp,
      };
      // console.log(user);
      signup(user).then((data) => {
        if (data.error) {
          this.setState({ error: data.error });
        } else {
          this.setState({
            open: true,
          });
          if (data.status === false) {
            this.setState({ error: data.message });
          }
        }
      });
    }
  };

  // forgotPassword = async e => {
  //     e.preventDefault();
  //     this.setState({ message: "", error: "" });
  //     await forgotPassword(this.state.emailid).then(data => {
  //         if (data.error) {
  //             console.log(data.error);
  //             this.setState({ error: data.error });
  //         } else {
  //             console.log(data.message);
  //             this.setState({ message: data.message });
  //         }
  //     });
  // };

  render() {
    const {
      name,
      emailid,
      phonenumber,
      address,
      company,
      error,
      password,
      open,
      click,
      redirectToProfile,
      inp,
    } = this.state;

    if (redirectToProfile) {
      return <Redirect to={"/signin"} />;
    }
    return (
      <div className="container clr">
        <div className="txt">
          <div className="mt-5 pt-3 alg">
            <img
              width="100"
              src="https://static.wixstatic.com/media/d1c8bc_9fa02b0348bd420e9a2d21183c946627~mv2.png/v1/fill/w_158,h_123,al_c,q_85,usm_0.66_1.00_0.01/Kaam%20aaya%20Logo.webp"
            />
          </div>
          <h3 className="mt-3 mb-4 alg">Sign Up!</h3>

          {this.state.message && (
            <h4 className="bg-success">{this.state.message}</h4>
          )}

          <div
            className="alert alert-info"
            style={{ display: open ? "" : "none" }}
          >
            {" "}
            Otp as sent to your mobile number, please enter OTP to activate your
            Account{" "}
          </div>

          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>

          {open ? (
            <div className="form-group">
              <label className="text-muted wd">OTP</label>
              <i className="fas fa-mobile-alt dpi"></i>
              <input
                onChange={this.handleChange("inp")}
                type="text"
                className="form-control dpi wdf"
                value={inp}
              />
              <button
                onClick={this.clickSubmitTwo}
                className="btn btn-raised btn-primary mt-4 mb-4"
              >
                Sign Up
              </button>
            </div>
          ) : (
            <form>
              <div className="form-group">
                <label className="text-muted wd">Name</label>
                <i className="fas fa-user-tie dpi"></i>
                <input
                  onChange={this.handleChange("name")}
                  type="text"
                  className="form-control dpi wdf"
                  value={name}
                />
              </div>
              <div className="form-group">
                <label className="text-muted wd">Email Id</label>
                <i className="fas fa-envelope dpi"></i>
                <input
                  onChange={this.handleChange("emailid")}
                  type="email"
                  className="form-control dpi wdf"
                  value={emailid}
                />
              </div>
              <div className="form-group">
                <label className="text-muted wd">Phone Number</label>
                <i className="fas fa-mobile-alt dpi"></i>
                <input
                  onChange={this.handleChange("phonenumber")}
                  maxLength="10"
                  minLength="10"
                  type="text"
                  className="form-control dpi wdf"
                  value={phonenumber}
                />
              </div>
              <div className="form-group">
                <label className="text-muted wd">Password</label>
                <i className="fas fa-unlock-alt dpi"></i>
                <input
                  onChange={this.handleChange("password")}
                  type="password"
                  className="form-control dpi wdf"
                  value={password}
                />
              </div>
              <div className="form-group">
                <label className="text-muted wd">Company Name</label>
                <i className="fas fa-id-card dpi"></i>
                <input
                  onChange={this.handleChange("company")}
                  type="text"
                  className="form-control dpi wdf"
                  value={company}
                />
              </div>
              <div className="form-group">
                <label className="text-muted wd">Address</label>
                <i className="fas fa-map-signs dpi"></i>
                <input
                  onChange={this.handleChange("address")}
                  type="text"
                  className="form-control dpi wdf"
                  value={address}
                />
              </div>
              <label className="container mb-4">
                <input
                  className="mr-2"
                  type="checkbox"
                  onClick={this.toggleClick}
                  checked={click}
                />
                <span className="checkmark"></span> I accept the Terms &
                Conditions
              </label>
              <div
                className="alert alert-danger"
                style={{ display: error ? "" : "none" }}
              >
                {error}
              </div>
              <button
                onClick={this.clickSubmit}
                className="btn btn-raised btn-primary"
              >
                Send OTP
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }
}

export default Signup;
