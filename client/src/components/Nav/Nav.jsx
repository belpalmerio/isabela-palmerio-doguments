import "./Nav.scss";
import icon from "../../assets/icons/teal_brown-icon.png";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <article className="nav">
      <ul className="nav__list">
        <div className="nav__list-container">
          <Link to={"/"}>
            <li className="nav__list-item">Home</li>
          </Link>
          <Link to={"/pets/"}>
            <li className="nav__list-item">My Pets</li>
          </Link>
        </div>
        <li className="nav__list-item nav__list-item--img">
          <img
            src={icon}
            alt="Brown and Teal Pawprint Icon"
            className="nav__img"
          />
        </li>
        <div className="nav__list-container">
          <Link to={"/health-trackers"}>
            <li className="nav__list-item">Health</li>
          </Link>
          <Link to={"/settings"}>
            <li className="nav__list-item">Settings</li>
          </Link>
        </div>
      </ul>
    </article>
  );
}

export default Nav;
