import '../css/Login.css';
import React, { Component } from 'react';
import login_img from '../images/userIcon.png';
import { Link } from 'react-router-dom';
import AuthenticationService from '../api/AuthenticationService';
import { Formik, Form, Field } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
                window.location.reload();
            }

        })
        .catch(error => {
            if (!this.state.email && !this.state.password) {
                toast.error("Introdu o adresa de email!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                toast.error("Introdu o parola!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            else if (!this.state.password) {
                toast.error("Introdu o parola!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            else if (this.state.password.length < 5) {
                toast.error("Parola trebuie sa contina mai mult de 5 caractere", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            else{
                toast.error("Something went wrong...", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }

        })
        
    }

    render()
    {
        let{email,password} = this.state
        return(
            <>

            <div>
                
                <ToastContainer />

                <div className="container">
                
                <img src={login_img} alt="userlogin"/>

                <Formik
                    initialValues={{email,password}}
                    onSubmit={this.onSubmit}
                    validateOnChange={this.handleChange}
                    validateOnBlur={false}
                >
                    {(props) => (
                    <Form>
                        <label><b>Adresa de email</b></label>

                        <fieldset className="form-group-login">
                            <Field className="input" type="email" name="email" placeholder="Email Address" onKeyUp={this.handleChange}/>
                        </fieldset>

                        <label><b>Parola</b></label>

                        <fieldset className="form-group-login">
                            <Field className="input" type="password" name="password" placeholder="Password"/>
                        </fieldset>

                        <button className="loginButton" type="submit">Autentificare</button>
                    </Form>
                    )}

                </Formik>

                    <p className="signup">Nu ai cont?<Link to='/signup'> Inregistreaza-te</Link></p>
                    <p className="forgot"><Link to='/forgot'> Ai uitat parola?</Link></p>
                </div>
            </div>
            </>

        )
    }

}

export default LoginComponent;