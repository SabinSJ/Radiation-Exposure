import React from 'react';
import '../css/Button.css';
import {Link} from 'react-router-dom';
import AuthenticationService from '../api/AuthenticationService';

const STYLES = ['btn--primary','btn--outline']

const SIZES = ['btn--medium','btn--large']

export const Button = ({children,type,onClick,buttonStyle,buttonSize}) => {
    
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0]

    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0]

    let isLoggedIn = AuthenticationService.isUserLoggedIn();

    return (
        <>
        {

        isLoggedIn

        ?

        <Link to = '/' className = 'btn-mobile'>
            <button className = {`btn ${checkButtonStyle} ${checkButtonSize}`} onClick = {onClick} type = {type}>
                {children}
            </button>
        </Link> 

        :

        <Link to = '/login' className = 'btn-mobile'>
            <button className = {`btn ${checkButtonStyle} ${checkButtonSize}`} onClick = {onClick} type = {type}>
                {children}
            </button>
        </Link> 

        }

        </>
    );
};