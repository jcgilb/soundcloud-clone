import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import CreateNewSong from "../CreateNewSong";
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
                    <CreateNewSong />
                </div>
                <ProfileButton user={sessionUser} />
            </>
        );
    } else {
        sessionLinks = (
            <>
                <div className='sign-in'>
                    <NavLink to="/login">Sign in</NavLink>
                </div>
                <div className='create-account'>
                    <NavLink to="/signup">Create account</NavLink>
                </div>
            </>
        );
    }

    return (
        <div className="navigation">
            <div className="nav-container">
                <>
                    <div className="logo">
                        <img></img>
                    </div>
                </>

                {isLoaded && sessionLinks}
            </div>
            {/* this is the svg that I saved directly from the website */}



        </div>
    );
};

export default Navigation;



// import React from 'react';
// import { NavLink, useHistory } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import ProfileButton from './ProfileButton';
// // import './Navigation.css';

// function Navigation({ isLoaded }) {
//     // const history = useHistory();
//     const sessionUser = useSelector(state => state.session.user);
//     let sessionLinks;
//     if (sessionUser) {
//         sessionLinks = (
//             <ProfileButton user={sessionUser} />
//         );
//     } else {
//         sessionLinks = (
//             <>
//                 <span className='sign-in'>
//                     <NavLink to="/login">Sign in</NavLink>
//                 </span>
//                 <span className='create-account'>
//                     <NavLink to="/signup">Create account</NavLink>
//                 </span>
//             </>
//         );
//     }

//     return (
//         <div className="nav-container">
//             <div className="navbar">
//                 {/* <img src={logo} alt='peace-logo'></img> */}
//                 <div className='nav'>
//                     <div className='logo'>
//                         {/* this is the svg that I saved directly from the website */}
//                         <svg xmlns="http://www.w3.org/2000/svg">
//                             <path fill="#fff" d="M20.4 3c-.44 5.91-.79 11.45 0 17.35a.53.53 0 0 0 1.06 0C22.31 14.43 22 9 21.46 3a.53.53 0 1 0-1.06 0ZM17.06 5.07a66.43 66.43 0 0 0 0 15.31.55.55 0 0 0 1.1 0 59.89 59.89 0 0 0 0-15.31.56.56 0 0 0-1.1 0ZM13.78 4.56a66.36 66.36 0 0 0 0 15.81.53.53 0 0 0 1.06 0 63.85 63.85 0 0 0 0-15.81.54.54 0 0 0-1.06 0ZM10.45 6.1a56.48 56.48 0 0 0 0 14.29.55.55 0 0 0 1.09 0 52.21 52.21 0 0 0 0-14.29.55.55 0 0 0-1.09 0ZM7.13 9.65c-.79 3.68-.42 7.06 0 10.76a.51.51 0 0 0 1 0c.49-3.76.88-7 0-10.76a.55.55 0 0 0-1 0ZM3.79 9.11a33.57 33.57 0 0 0 0 10.82c0 .57 1 .56 1.08 0a30 30 0 0 0 0-10.82.57.57 0 0 0-1.08 0ZM.45 10.93a15 15 0 0 0 0 7.14.52.52 0 0 0 1 0 12.66 12.66 0 0 0 0-7.14.57.57 0 0 0-1 0ZM23.5 14.29l5.27-4.89V1.13a10 10 0 0 0-5.27 2ZM30.51 11.68v7.53a10.16 10.16 0 0 0 5.67-2.29ZM39.45 10.17c0-4.74-3.94-8.63-8.94-9V9.4l6.86 6.34a8.6 8.6 0 0 0 2.08-5.57Z" />
//                             <path fill="#fff" d="M41.46 7.79h-.56a9.61 9.61 0 0 1 .29 2.34 10.13 10.13 0 0 1-1.77 5.69 11.55 11.55 0 0 1-7 4.68c-.81.19-2.36.28-3.18.39h4.35c1.2 0 2.5-.07 3.75-.07h3.86a6.7 6.7 0 0 0 6.8-6.29 6.53 6.53 0 0 0-6.54-6.74ZM23.5 17.34a12.63 12.63 0 0 0 5.27 1.86v-7.52l-5.27 4.89Z" />
//                         </svg>
//                         <span className='name'>AUDIO STRATUS</span>
//                     </div>
//                     <span className='nav-links'>
//                         <span className='home'>
//                             <NavLink exact to="/">Home</NavLink>
//                         </span>
//                         {isLoaded && sessionLinks}
//                     </span>
//                 </div>
//             </div>
//         </div >
//     );
// };

// export default Navigation;