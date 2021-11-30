import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { Button } from '../Button/Button';
import '../css/Navbar.css';
import AuthenticationService from '../api/AuthenticationService';
import DarkModeLightModeService from '../api/DarkModeLightModeService';


function Navbar()
{

    const [click,setClick] = useState(null);
    const [button,setButton] = useState(true);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const [isSwitchActivated,setSwitch] = useState(true);

    let handleSwitch = () => {
        if(isSwitchActivated)
        {
            setSwitch(false)
            DarkModeLightModeService.setDarkMode(isSwitchActivated)
        }else{
            setSwitch(true)
            DarkModeLightModeService.setDarkMode(isSwitchActivated)
        }
    }
    
    let isLoggedIn = AuthenticationService.isUserLoggedIn();
    let isDarkModeOn = DarkModeLightModeService.isDarkModeActivated();

    const logoutMobileMenu = () => {
        closeMobileMenu()
        window.location.reload();
        AuthenticationService.logout()
    }

    const showButton = () => {
        if(window.innerWidth <= 1200)
            setButton(false);
        else
            setButton(true);
    }

    useEffect( () => {
        isLoggedIn = AuthenticationService.isUserLoggedIn();

        if(isDarkModeOn)
        {
            document.body.style.backgroundColor = "#eff4f7";
        }
        else{
            document.body.style.backgroundColor = "#343e59";
        }


        // setTimeout(() => {
        //     window.location.reload();
        // }, 5000);
    })

    function logout(){
        window.location.reload();
        AuthenticationService.logout();
    }

    window.addEventListener('resize',showButton);

    let style = ""

    return (
        <>        
        <nav {...window.location.pathname === "/harta" ? style={position:'sticky'} : style={position:'fixed'}}  style={style} className = "navbar">
            <div className = "navbar-container">
                
                <Link to = "/" className = "navbar-logo" onClick = {closeMobileMenu}>
                    Rad Monitor <i className="fab.fa-typo3"/>
                </Link>

                <div className = "menu-icon" onClick = {handleClick}>
                    <i className = {click ? 'fas fa-times' : 'fas fa-bars'} />
                </div>
                
                <ul className = {click ? 'nav-menu active' : 'nav-menu'}>

                    <li className = 'nav-item'>
                        <Link to='/harta' className = 'nav-links' onClick = {closeMobileMenu}>
                            Harta
                        </Link>
                    </li>

                    <li className = 'nav-item'>
                        <Link to='/grafic' className = 'nav-links' onClick = {closeMobileMenu}>
                            Grafic
                        </Link>
                    </li>

                    {isLoggedIn &&

                    <li className = 'nav-item'>
                        <Link to='/profile' className = 'nav-links' onClick = {closeMobileMenu}>
                            Profil
                        </Link>
                    </li>

                    }

                    {/* <li className = 'nav-item'>
                        <Link to='/contact' className = 'nav-links' onClick = {closeMobileMenu}>
                            Info
                        </Link>
                    </li> */}

                    <li className = 'nav-item'>
                        <Link to='/contact' className = 'nav-links' onClick = {closeMobileMenu}>
                            Contact
                        </Link>
                    </li>

                    {isLoggedIn &&

                    <li className = 'nav-item'>
                        <Link to='/login' className = 'nav-links-mobile' onClick = {logoutMobileMenu}>
                            Logout
                        </Link>
                    </li>

                    }

                    {!isLoggedIn &&

                    <li className = 'nav-item'>
                        <Link to='/login' className = 'nav-links-mobile' onClick = {closeMobileMenu}>
                            Login
                        </Link>
                    </li>
                    }

                </ul>

                {!isLoggedIn && window.innerWidth > 1200 && button && <Button buttonStyle='btn--outline'>Login</Button> }
                {isLoggedIn && window.innerWidth > 1200 && button && <Button buttonStyle='btn--outline'  onClick={logout}>Logout</Button> }
            
                <input type="checkbox" className="checkbox" id="chk" checked={isSwitchActivated} onChange={handleSwitch} />
                <label className="label" for="chk">
                    <i className="fas fa-moon"></i>
                    <i className="fas fa-sun"></i>
                    <div className="ball"></div>
                </label>
            </div>

        </nav>

        </>

    )
}

export default Navbar