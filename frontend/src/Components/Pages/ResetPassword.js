import React, {Component} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthenticationService from "../api/AuthenticationService"

import '../css/ForgotPassword.css';

class ResetPassword extends Component
{

    constructor(props){
        super(props)
        this.state = {
            password:'',
            verifyPassword:''
        }

        this.handleClick= this.handleClick.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    handleClick()
    {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const token = params.get('token');

        if(this.state.password === this.state.verifyPassword)
        {

            AuthenticationService.resetPassword(token,this.state.password).then(response => {
                if(response.status === 200)
                {
                    toast.success('Parola a fost schimbata cu success!', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });

                    this.props.history.push('/login');
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
        }else
        {
            toast.error("Parola nu este corecta", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

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
                
                    <h2>Resetare parola</h2>

                    <input type="password" placeholder="Parola noua" name="password" onChange={this.onInputChange}/>

                    <input type="password" placeholder="Confirmare parola" name="verifyPassword" onChange={this.onInputChange}/>

                    <button className="forgotButton" type="submit" onClick={this.handleClick}>Schimba Parola</button>

                </div>
            </>
        )
    }
}

export default ResetPassword;