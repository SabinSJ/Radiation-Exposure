import React from 'react';
import './css/HeroSection.css';
import AuthenticationService from './api/AuthenticationService';

function HeroSection()
{
    let isLoggedIn = AuthenticationService.isUserLoggedIn()

    return(
        <div className='hero-container'>
            {isLoggedIn && <p> Utilizatorul este logat</p>}
        </div>
    )
}

export default HeroSection;