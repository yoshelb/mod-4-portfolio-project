import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";

import { Link, useNavigate } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const navigate = useNavigate();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
    // console.log("SHOW MENU", showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    navigate("/");
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button onClick={toggleMenu}>
        {/* <i className="fas fa-user-circle" /> */}
        <div className="button-imgs">
          {showMenu === true ? (
            <RxCross2 size={50} />
          ) : (
            <RxHamburgerMenu size={50} />
          )}
          <div
            className="profile-menu-icon"
            style={{
              backgroundImage: `url('/images/ant-head-icon.png')`,
            }}
          ></div>
        </div>
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            {/* <li>{user.username}</li> */}
            <li>
              <li className="user-greeting">Hello, {user.firstName}</li>
              <li className="user-email">{user.email}</li>
            </li>
            <li>
              <Link to="/spots/current" className="manage-spots-link">
                Manage Spots
              </Link>
            </li>
            <li>
              <button onClick={logout} className="logout-button">
                Log Out
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="log-in-modal">
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
            </li>
            <li className="log-in-modal">
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </li>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
