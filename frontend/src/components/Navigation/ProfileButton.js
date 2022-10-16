import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import { useHistory } from "react-router-dom";
import "./ProfileDropdown.css";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const songs = useSelector((state) => state.songs);

  // open menu onClick event
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  // close the menu if a user clicks anywhere outside of it
  useEffect(() => {
    if (!showMenu) return;
    const closeMenu = () => {
      setShowMenu(false);
    };
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  // logout onClick event handler
  const logout = (e) => {
    e.preventDefault();
    songs.currentSong = {};
    dispatch(sessionActions.logout());
    return history.push("/");
  };

  return (
    <>
      <div className="profile" onClick={openMenu}>
        <i className="fas fa-user-circle fa-2x" />
        <div className="firstName">{user.username}</div>
        <i className="fas fa-solid fa-chevron-down "></i>
      </div>
      {/* render this div if showMenu is set to true */}
      {showMenu && (
        <div className="dropdown-container">
          <div className="profile-dropdown">
            <label id="username">{user.username}</label>
            <label id="email">{user.email}</label>
            <label>
              <button className="logout" onClick={logout}>
                Log Out
              </button>
            </label>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileButton;
