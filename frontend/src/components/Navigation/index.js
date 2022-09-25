import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navbar.css';


function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <>
                <div className='get-songs'>
                    <NavLink className='get-songs' exact to="/songs">Home</NavLink>
                </div>
                <div className='create-song'>
                    <NavLink className='create-song' exact to="/new">Upload</NavLink>
                </div>
                <ProfileButton user={sessionUser} />
            </>
        );
    } else {
        sessionLinks = (
            <>
                <div className='sign-in'>
                    <NavLink className='sign-in' to="/login">Sign in</NavLink>
                </div>
                <div className='create-account'>
                    <NavLink className='create-account' to="/signup">Create account</NavLink>
                </div>
            </>
        );
    }

    return (
        <div className="navigation">
            <div className="nav-container">
                <div className="far-left">
                    <div className="logo">
                        <img alt="stratus" src={"https://res.cloudinary.com/ddmb8mrlb/image/upload/v1664089676/icons/1146940_atdw8f.png"} />
                        {/* <i class="fas fa-brands fa-soundcloud fa-3x" ></i> */}
                        AUDIO STRATUS
                    </div>
                </div>
                <div className="far-right">
                    {isLoaded && sessionLinks}
                </div>
            </div>
        </div >
    );
};

export default Navigation;

