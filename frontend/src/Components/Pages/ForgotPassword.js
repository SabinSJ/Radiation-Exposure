import React, {Component} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthenticationService from "../api/AuthenticationService"

import '../css/ForgotPassword.css';

class ForgotPassword extends Component
{

    constructor(props){
        super(props)
        this.state = {
            username:''
        }

        this.handleClick= this.handleClick.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    handleClick(username)
    {

        username = this.state.username;

        AuthenticationService.forgotPassword(username).then(response => {
            if(response.status === 200)
            {
                toast.success('Email sent', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        })
        .catch(error => {
            toast.error(error, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        })
    }

    onInputChange(event)
    {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render(){
        return(

            <> 
                <ToastContainer />

                <div className="forgot-container">

                    <h2>Recuperare parola</h2>

                    <p>Introduceti adresa de email asociat contului dumneavoastra si noi va vom trimite un link de resetare a parolei.</p>

                    <input type="text" placeholder="Adresa de email" name="username" onChange={this.onInputChange}/>

                    <button className="forgotButton" type="submit" onClick={this.handleClick}>Recupereaza Parola</button>

                </div>
            </>
        )
    }
}

export default ForgotPassword;