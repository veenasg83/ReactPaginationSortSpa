import React, { Component } from 'react';
import $ from 'jquery';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            errors: ""
        };
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        var register = {
            userName: this.state.username,
            password: this.state.password
        }

        $.ajax({
            url: "https://localhost:44351/api/user/register",
            type: "POST",
            data: JSON.stringify(register),
            contentType: "application/json; charset=utf-8",
            datatype: "json",
            success: function (response) {
                //  this.loadData();
                // this.setState({ showForm: false });
                console.log(response);
            }.bind(this),
            error: function (error) {
                console.log("errtttttor", error);
            }.bind(this)
        })
    }

    render() {
        return (
            <div className="container">
                <h1>Register</h1>
                <form>
                    {this.state.errors && <div className="alert alert-danger">{this.state.errors}</div>}
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input id="username" className="form-control" name="username" onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input id="password" className="form-control" name="password" type="password" onChange={this.handleChange} />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={this.onSubmit} > Submit</button>
                </form>
            </div>

        );
    }
}

export default Register;