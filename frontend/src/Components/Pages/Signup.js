import React, { Component } from 'react'
import '../css/Signup.css';
import AuthenticationService from '../api/AuthenticationService';
import { Formik, Form, Field } from 'formik';


class Signup extends Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            firstName: '',
            lastName: '',
            username: '',
            password: ''
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    onSubmit(values)
    {
        AuthenticationService.signUpWithLocalAccount(values.firstName, values.lastName, values.username, values.password)
        .then(res => {

            if(res.status === 200)
            {
                this.props.history.push('/login')
            }

        }).catch(error => {
            console.log(error)
        })
    }

    handleChange(event){
        this.setState(
            {
            [event.target.name]
                : event.target.value
            }
        )
    }

    validate(values){
        let errors = {}
        
        if(!values.firstName)
        {
            errors.firstName = "Introdu un prenume!"
        }
        if(!values.lastName)
        {
            errors.lastName = "Introdu nume!"
        }
        if(!values.username)
        {
            errors.username = "Introdu o adresa de email!"
        }
        if(!values.password)
        {
            errors.password = "Introdu o parola!"
        }
    }

    render()
    {
        let {firstName, lastName, username, password} = this.state

        return(

            <div className="signup-container">
            
                <Formik
                    initialValues={{firstName,lastName,username,password}}
                    onSubmit={this.onSubmit}
                    validateOnChange={this.handleChange}
                    validateOnBlur={false}
                    validate={this.validate}
                >
                    {(props) => (
                
                <Form>

                <h2>Inregistrare</h2>

                <label><b>Nume</b></label>
                <fieldset className="form-group-login">
                    <Field className="input" type="text" name="lastName" placeholder="Nume" />
                </fieldset>

                <label><b>Prenume</b></label>
                <fieldset className="form-group-login">
                    <Field className="input" type="text" name="firstName" placeholder="Prenume" />
                </fieldset>

                <label><b>Adresa de email</b></label>
                <fieldset className="form-group-login">
                    <Field className="input" type="email" name="username" placeholder="Adresa de email" />
                </fieldset>

                <label><b>Parola</b></label>
                <fieldset className="form-group-login">
                    <Field className="input" type="password" name="password" placeholder="Parola" />
                </fieldset>

                <button className="signup-button" type="submit">Creeaza cont</button>
                
                </Form>)}
                
                </Formik>

            </div>

        )
    }
}

export default Signup;