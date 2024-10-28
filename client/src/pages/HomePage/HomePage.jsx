import "./HomePage.scss";
import TitleBox from "../../components/TitleBox/TitleBox.jsx";
import { Link } from "react-router-dom";
import icon from "../../assets/icons/teal_brown-icon.png";

function HomePage() {
  return (
    <article className="home">
      <div className="home__container">
        <TitleBox title={"About Us"} />
        <p className="home__body">
          Doguments bridges the gap between pet owners and veterinary
          professionals by streamlining the process of managing medical records.
          By offering a transparent, user-friendly platform, we make it easy for
          veterinary professionals to upload important documents directly to pet
          profiles, ensuring that owners stay informed and in control. With
          everything from vaccination records to appointments in one place,
          managing your pet's health has never been simpler.
        </p>
      </div>
      <img src={icon} alt="Paw Print Icon" className="home__icon" />
      <Link to="/pets/add">
        <button className="home__button">Get Started</button>
      </Link>
    </article>
  );
}

export default HomePage;
