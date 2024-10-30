import "./Header.scss";
import logo from "../../assets/images/doguments_logo.png";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const path = useLocation();

  const headerClass = path.pathname === "/" ? "home-header" : "header";

  return (
    <article className={`header ${headerClass}`}>
      <div className={`${headerClass}__wrapper`}>
        <Link to={"/login"}>
          <div className={`${headerClass}__button`}>Login</div>
        </Link>
        <Link to={"/signup"}>
          <div className={`${headerClass}__button`}>Sign Up</div>
        </Link>
      </div>
      <Link to={"/"}>
        <div className={`${headerClass}__logo-container`}>
          <img
            src={logo}
            alt="Doguments Logo"
            className={`${headerClass}__logo`}
          />
          <p className={`${headerClass}__title`}>Doguments</p>
        </div>
      </Link>
      {path.pathname === "/" && (
        <p className={"home-header__text"}>
          Simplifying veterinary care one document at a time.
        </p>
      )}
    </article>
  );
}

export default Header;
