import '../css/Login.css';
import React, { Component } from 'react';
import login_img from '../images/userIcon.png';
import { Link } from 'react-router-dom';
import AuthenticationService from '../api/AuthenticationService';
import { Formik, Form, Field } from 'formik';


class LoginComponent extends Component{

    constructor(props)
    {
        super(props)

        this.state = {
            email: '',
            password: '',
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]
                    : event.target.value
            }
        )
    }

    onSubmit(values)
    {    
        AuthenticationService.logInWithLocalAccount(values.email, values.password).then(response => {

            if(response.status === 200)
            {
                AuthenticationService.registerSuccesfullLoginWithJwt(values.email, response.data.token)
                this.props.history.push('/');
            }

        }).catch(error => {
            console.log(error.response)
            })
        
    }


    validate(values) {
        let errors = {}

        if (values.password.length < 5) {
            errors.password = "Use 5 or more characters for password!"
        }

        if (!values.email) {
            errors.email = "Enter a Email address!"
        }
        if (!values.password) {
            errors.password = "Enter a password"
        }
        return errors
    }

    render()
    {
        let{email,password} = this.state
        return(

            <div className="container">
            
                <img src={login_img} alt="userlogin"/>

            <Formik
                initialValues={{email,password}}
                onSubmit={this.onSubmit}
                validateOnChange={this.handleChange}
                validateOnBlur={false}
                validate={this.validate}
            >
                {(props) => (
                <Form>
                    <label><b>Adresa de email</b></label>
                    {/* <input type="text" placeholder="Enter email" name="email" required onKeyUp={this.handleChange} /> */}

                    <fieldset className="form-group-login">
                        <Field className="input" type="text" name="email" placeholder="Email Address" onKeyUp={this.handleChange} />
                    </fieldset>

                    <label><b>Parola</b></label>
                    {/* <input type="password" placeholder="Enter Password" name="password" required /> */}

                    <fieldset className="form-group-login">
                        <Field className="input" type="password" name="password" placeholder="Password" />
                    </fieldset>

                    <button className="loginButton" type="submit">Autentificare</button>
                </Form>
                )}

            </Formik>

                <p className="signup">Don't have an account?<Link to='/signup'> Sign up</Link></p>
                <p className="forgot"><Link to='/forgotpassword'> Forgot password?</Link></p>
            </div>

        )
    }

}

export default LoginComponent;