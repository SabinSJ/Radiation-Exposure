import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { Button } from './Button';
import './css/Navbar.css';
import AuthenticationService from './api/AuthenticationService';


function Navbar()
{
    const [click,setClick] = useState(null);
    const [button,setButton] = useState(true);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const isLoggedIn = AuthenticationService.isUserLoggedIn()

    const showButton = () => {
        if(window.innerWidth <= 960)
            setButton(false);
        else
            setButton(true);
    }

    const onSubmit = () =>
    {
        AuthenticationService.logout();
    }

    useEffect(() => {
        showButton();
        if(isLoggedIn)
            onSubmit();
    },[]);

    window.addEventListener('resize',showButton);

    return (
        <>

        <nav className = "navbar">
            <div className = "navbar-container">
                <Link to = "/" className = "navbar-logo" onClick = {closeMobileMenu}>
                    RadPoll <i className="fab.fa-typo3"/>
                </Link>

                <div className = "menu-icon" onClick = {handleClick}>
                    <i className = {click ? 'fas fa-times' : 'fas fa-bars'} />
                </div>
                <ul className = {click ? 'nav-menu active' : 'nav-menu'}>
                    <li className = 'nav-item'>
                        <Link to='/' className = 'nav-links' onClick = {closeMobileMenu}>
                            Home
                        </Link>
                    </li>

                    <li className = 'nav-item'>
                        <Link to='/services' className = 'nav-links' onClick = {closeMobileMenu}>
                            Services
                        </Link>
                    </li>

                    <li className = 'nav-item'>
                        <Link to='/products' className = 'nav-links' onClick = {closeMobileMenu}>
                            Products
                        </Link>
                    </li>

                    <li className = 'nav-item'>
                        <Link to='/login' className = 'nav-links-mobile' onClick = {closeMobileMenu}>
                            Login
                        </Link>
                    </li>
                </ul>
                {!isLoggedIn && button && <Button buttonStyle='btn--outline'>Login</Button>}
                {isLoggedIn && button && <Button buttonStyle='btn--outline' >Logout</Button>}
            </div>

        </nav>

        </>

    )
}

export default Navbar