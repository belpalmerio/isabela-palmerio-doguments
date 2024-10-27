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
      <img src={logo} alt="Doguments Logo" className={`${headerClass}__logo`} />
      <p className={`${headerClass}__title`}>Doguments</p>
      {path.pathname === "/" && <p className={"home-header__text"}>Tagline</p>}
    </article>
  );
}

export default Header;
