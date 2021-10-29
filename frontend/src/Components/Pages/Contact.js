import React, { Component } from 'react'
import '../css/Contact.css'
import {useFormik} from 'formik';
import emailjs from 'emailjs-com'

import locationImage from '../images/location-icon.png'
import phoneImage from '../images/phone-icon.png'
import emailImage from '../images/email-icon.png'
import githubImage from '../images/github-logo.png'
import linkedinImage from '../images/linkedin-icon.png'

export default function Contact() {


    const formik = useFormik({
        initialValues: {
            subject:'',
            email:'',
            message:''
        },
        onSubmit: values =>{
            console.log(values)

            emailjs.send(
                "service_o719lrb",
                "template_g8l7dhw",
                values,
                "user_9h7JJwzBcPHXoD7JZsatI"
            ).then(res=>{
                console.log(res.status)
            }).catch(error => {
                console.log(error)
            })
        }
    })
    

    return (
        <div>
            <div className="contact-container">
                <h1 className="contact_title_name">CONTACT</h1>
                <hr className="dot_line"></hr>

                {/* <form id="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST"> */}
                <div className="form-container">

                    <form onSubmit={formik.handleSubmit}>
                        <div className="form-group">
                                <label htmlFor='subject'>Subiect</label>

                                <input type="text" 
                                    className="form-control"
                                    id="subject" 
                                    name="subject"
                                    onChange={formik.handleChange}
                                    values={formik.values.subject}/>
                        </div>

                        <div className="form-group">
                                <label htmlFor='email'>Adresa de email</label>

                                <input type="email" 
                                    name="email" 
                                    className="form-control" 
                                    onChange={formik.handleChange}
                                    values={formik.values.email}/>
                        </div>

                        <div className="form-group">
                                <label htmlFor='message'>Mesaj</label>

                                <textarea className="form-control" 
                                    id="message"
                                    name="message" 
                                    rows="10" 
                                    onChange={formik.handleChange}
                                    values={formik.values.message}>
                                </textarea>
                        </div>

                        <button type="submit" className="form-btn">Trimite</button>
                    </form>

                </div>

                <div className="personal-data">
                    <div className="location-data">
                        <img className="data-image" src={locationImage} alt="location"/>
                        <h3>Campina, Prahova</h3>
                    </div>

                    <div className="phone-data">
                        <img className="data-image" src={phoneImage} alt="phone"/>
                        <h3>0730 852 355</h3>
                    </div>

                    <div className="email-data">
                        <img className="data-image" src={emailImage} alt="email"/>
                        <h3>florinsabin.sarca@gmail.com</h3>
                    </div>

                    <hr class="dot_line"></hr>

                    <div className="social-links">
                        <a href="https://www.linkedin.com/in/florin-sabin-sarca/">
                            <img src={linkedinImage} alt="linkedin"/>
                        </a>

                        <a href="https://www.github.com/SabinSJ">
                            <img src={githubImage} alt="github"/>
                        </a>
                    </div>
                </div>

                
                
            </div>
        </div>
    )
}
