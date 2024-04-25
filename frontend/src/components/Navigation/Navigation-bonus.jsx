import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton-bonus";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  // console.log("sessionUser", sessionUser);

  return (
    <div className="nav-bar">
      <NavLink to="/">
        <img
          className="nav-link-img"
          src="/images/ant-sandwhich-logo.png"
          alt="ant sandwhich icon"
        />
      </NavLink>
      <div className="create-and-profile">
        {sessionUser !== null && sessionUser && (
          <NavLink to="/spots/new" className="new-spot-link">
            create new spot
          </NavLink>
        )}

        <div className="profile-menu">
          {isLoaded && <ProfileButton user={sessionUser} />}
        </div>
      </div>
    </div>
  );
}

export default Navigation;
