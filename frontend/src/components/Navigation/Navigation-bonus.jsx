import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton-bonus";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="nav-bar">
      <NavLink to="/">
        <img
          className="nav-link-img"
          src="/public/images/ant-sandwhich-logo.png"
          alt="ant sandwhich icon"
        />
      </NavLink>
      <div className="profile-menu">
        {isLoaded && <ProfileButton user={sessionUser} />}
      </div>
    </div>
  );
}

export default Navigation;
