import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navbar.css';

import "../LoginFormModal/LoginForm.css"

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <div className="session-links">
                <div id="logged-in-links">
                    <NavLink style={{ color: "white", marginLeft: "10px", marginRight: "10px" }} className='get-songs' exact to="/songs">Home</NavLink>
                    <NavLink style={{ color: "white", marginLeft: "10px", marginRight: "10px" }} className='create-song' exact to="/new">Upload</NavLink>
                    <ProfileButton user={sessionUser} />
                </div>

            </div>

        );
    } else {
        sessionLinks = (
            <div className="login-signup-links">
                <div id="login">
                    <LoginFormModal />
                </div>
                <div id="signup">
                    <SignupFormModal />
                </div>

            </div>
        );
    }

    return (
        <div className="navbar-container">
            <div className="outer-empty-nav"></div>
            <div className="logo-container">
                <div className="title-container">
                    AUDIO STRATUS
                </div>
                <div className="logo">
                    <img className="logo" alt=" stratus" src={"https://res.cloudinary.com/ddmb8mrlb/image/upload/v1664661127/icons/image_m12nib.png"} />
                </div>
            </div>
            <div className="middle-empty-nav"></div>
            <div className="navbar-links">
                {isLoaded && sessionLinks}
            </div>
            <div className="outer-empty-nav"></div>

        </div>
    );
}

export default Navigation;

// function Navigation({ isLoaded }) {
//     const sessionUser = useSelector(state => state.session.user);
//     let sessionLinks;
//     if (sessionUser) {
//         sessionLinks = (
//             <div className="session-links">
//                 <div id="logged-in-links">
//                     <div className='get-songs'>
//                         <NavLink className='get-songs' exact to="/songs">Home</NavLink>
//                     </div>
//                     <div className='create-song'>
//                         <NavLink className='create-song' exact to="/new">Upload</NavLink>
//                     </div>
//                     <ProfileButton user={sessionUser} />
//                 </div>
//             </div>
//         );
//     } else {
//         sessionLinks = (
//             <>
//                 <div className="login-signup-links">
//                     <div id="login">
//                         <LoginFormModal />
//                     </div>
//                     <div id="signup">
//                         <SignupFormModal />
//                     </div>

//                 </div>
//             </>
//         );
//     }

//     return (
//         <div className="navigation">
//             <div className="nav-container">
//                 <div className="far-left">
//                     <div className="logo">
//                         <img alt="stratus" src={"https://res.cloudinary.com/ddmb8mrlb/image/upload/v1664089676/icons/1146940_atdw8f.png"} />
//                         AUDIO STRATUS
//                     </div>
//                 </div>
//                 <div className="far-right">
//                     {isLoaded && sessionLinks}
//                 </div>
//             </div>
//         </div >
//     );
// };

// export default Navigation;

