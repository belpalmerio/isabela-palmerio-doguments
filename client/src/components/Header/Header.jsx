import "./Header.scss";
import logo from "../../assets/images/doguments_logo.png";

function Header() {
  return (
    <article className="header">
      <img src={logo} alt="Doguments Logo" className="header__logo" />
      <p className="header__title">Doguments</p>
      <p className="header__text">Tagline</p>
    </article>
  );
}

export default Header;
