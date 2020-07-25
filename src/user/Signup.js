import React, { Component } from 'react';
import { signup, forgotPassword } from '../auth';

class Signup extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            phone: "",
            company: "",
            address: "",
            error: "",
            open: false,
            message: ""
        };
    }

// For chaning the state // values = name or email or password
    handleChange = values => event => {
        this.setState({ error: "" });
        this.setState({ [values]: event.target.value });
    };

    isValid = () => {
        const { name, email, password, phone, address, company } = this.state;

        const mail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const decimal=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

        if(!password.match(decimal)) {
            this.setState({ error: "Password must contain atleast 1 Upper case, 1 lower case and should be 7 to 15 characters" });
            return false;
        }

        if (email.length === 0 || !email.match(mail)) {
            this.setState({ error: "Please enter valid Email"});
            return false;
          }

        if (!name || !phone || !company || !address) {
          this.setState({ error: "Please Complete all Fields"});
          return false;
        }
        return true;
    };

    clickSubmit = event => {
        event.preventDefault();
        const { name, email, phone, address, company, password } = this.state;

    if(this.isValid()) {

        const user = {
            name: name,
            email,
            password,
            phone,
            address,
            company
        };
        // console.log(user);
        signup(user).then(data => {
            if (data.error) {
                this.setState({ error: data.error });
            } else {
                this.setState({
                    error: "",
                    name: "",
                    password: "",
                    email: "",
                    address: "",
                    company: "",
                    phone: "",
                    open: true
                });
            }
        });
      }
    };

    // forgotPassword = async e => {
    //     e.preventDefault();
    //     this.setState({ message: "", error: "" });
    //     await forgotPassword(this.state.email).then(data => {
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
        const { name, email, phone, address, company, error, password, open } = this.state;
        return (
            <div className="container clr">
                <div className="txt">
                <div className="mt-5 pt-3 alg">
                    <img width="100" src="https://static.wixstatic.com/media/d1c8bc_9fa02b0348bd420e9a2d21183c946627~mv2.png/v1/fill/w_158,h_123,al_c,q_85,usm_0.66_1.00_0.01/Kaam%20aaya%20Logo.webp" />
                </div>
                <h3 className="mt-3 mb-4 alg">Sign Up!</h3>

                {this.state.message && (
                    <h4 className="bg-success">{this.state.message}</h4>
                )}

                <div className="alert alert-danger"
                    style={{ display: error ? "" : "none" }}
                >
                    {error}
                </div>

                <div className="alert alert-info"
                    style={{ display: open ? "" : "none" }}
                >
                    Awesome!, Now Please Sign in...
                </div>
                <form>
                    <div className="form-group">
                        <label className="text-muted wd">Name</label>
                        <i className="fas fa-user-tie dpi"></i>
                        <input
                         onChange={this.handleChange("name")}
                         type="text" className="form-control dpi wdf"
                         value={name}
                        />
                    </div>
                    <div className="form-group">
                        <label className="text-muted wd">Email Id</label>
                        <i class="fas fa-envelope dpi"></i>
                        <input
                         onChange={this.handleChange("email")} 
                         type="email" className="form-control dpi wdf" 
                         value={email}
                        />
                    </div>
                    <div className="form-group">
                        <label className="text-muted wd">Phone Number</label>
                        <i class="fas fa-mobile-alt dpi"></i>
                        <input
                         onChange={this.handleChange("phone")}
                         maxLength="13"
                         minLength="10" 
                         type="text" className="form-control dpi wdf" 
                         value={phone}
                        />
                    </div>
                    <div className="form-group">
                        <label className="text-muted wd">Password</label>
                        <i class="fas fa-unlock-alt dpi"></i>
                        <input
                         onChange={this.handleChange("password")} 
                         type="password" className="form-control dpi wdf" 
                         value={password}
                        />
                    </div>
                    <div className="form-group">
                        <label className="text-muted wd">Company Name</label>
                        <i class="fas fa-id-card dpi"></i>
                        <input
                         onChange={this.handleChange("company")} 
                         type="text" className="form-control dpi wdf" 
                         value={company}
                        />
                    </div>
                    <div className="form-group">
                        <label className="text-muted wd">Address</label>
                        <i class="fas fa-map-signs dpi"></i>
                        <input
                         onChange={this.handleChange("address")} 
                         type="text" className="form-control dpi wdf" 
                         value={address}
                        />
                    </div>
                    <label class="container mb-4">
                        <input className="mr-2" type="checkbox" checked="" />
                        <span className="checkmark"></span> I accept the Terms & Conditions
                    </label>
                    <div className="alert alert-danger"
                    style={{ display: error ? "" : "none" }}
                    >
                        {error}
                    </div>
                    <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">
                        Sign Up
                    </button>
                </form>
                </div>
            </div>
        );
    }
};

export default Signup;