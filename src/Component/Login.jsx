import React, { Component } from 'react';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: { username: "", password: "" },
            errors: {}
        }
    }

    validate = () => {
        const errors = {};
        const { account } = this.state;
        if (account.username.trim() === "")
            errors.username = "username is required";
        if (account.password.trim() === '')
            errors.password = "password is required";

        return Object.keys(errors).length === 0 ? null : errors;
    }

    handleChange = e => {
        const account = { ...this.state.account };
        account[e.currentTarget.name] = e.currentTarget.value;
        this.setState({ account });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const errors = this.validate();
        console.log(errors);
        this.setState({ errors: errors || {} });

        if (errors)
            return;

        var loginModel = {
            email: this.state.account.username,
            password: this.state.account.password
        }

        //$.ajax({
        //    url:
        //        type:
        //    data:
        //        contentType:
        //    dataType:
        //        success: function(response) {
        //        Cookies.set('talentAuthToken',response.token)
        //        }.bind(this),
        //})
    }
    render() {
        const { errors, account } = this.state;
        return (

            <form>
                <div className="form-group">
                    <label htmlFor="email">Username</label>
                    <input
                        type="email"
                        name="username"
                        className="form-control"
                        id="email"
                        value={account.username}
                        placeholder="Enter email"
                        onChange={this.handleChange}
                    />
                    {errors.username && <div className="alert alert-danger">{errors.username}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        value={account.password}
                        onChange={this.handleChange}
                    />
                    {errors.password && <div className="alert alert-danger">{errors.password}</div>}
                </div>

                <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
            </form>

        );
    }
}

export default Login;