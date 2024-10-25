import "./PetCard.scss";
import formatDate from "../../utils/formatDate";
import petAge from "../../utils/petAge";
import formatFixed from "../../utils/formatFixed";
import { Link } from "react-router-dom";
import { port } from "../../utils/api";
import placeholderImage from "../../assets/images/placeholder--dog.webp";

function PetCard({ pets }) {
  //scroll to top on pet click
  function handleToTop() {
    window.scrollTo(0, 0);
  }

  console.log(placeholderImage);

  return (
    <article className="my-pets">
      <ul className="my-pets__list">
        {pets.map((pet) => {
          return (
            <li className="my-pets__list-item" key={pet.id}>
              <Link to={`/pets/${pet.id}`}>
                <button
                  className="my-pets__button"
                  onClick={() => handleToTop()}
                >
                  <img
                    src={
                      pet.image
                        ? `http://localhost:${port}/pet_uploads/${pet.image}`
                        : placeholderImage
                    }
                    alt={pet.name}
                    className="my-pets__img"
                  />

                  <div className="my-pets__info">
                    <p className="my-pets__body my-pets__body--title">
                      {pet.name}
                    </p>
                    <p className="my-pets__body">{pet.type}</p>
                    <p className="my-pets__body">DOB: {formatDate(pet.dob)}</p>
                    <p className="my-pets__body">{petAge(pet.dob)}</p>
                    <p
                      className={`my-pets__body ${
                        pet.sex === "male"
                          ? "my-pets__body--male"
                          : pet.sex === "female"
                          ? "my-pets__body--female"
                          : ""
                      }`}
                    >
                      {pet.sex}
                    </p>
                    <p className="my-pets__body">{formatFixed(pet)}</p>
                  </div>
                </button>
              </Link>
            </li>
          );
        })}
      </ul>
    </article>
  );
}

export default PetCard;
