import "./PetCard.scss";
import formatDate from "../../utils/formatDate";
import petAge from "../../utils/petAge";
import formatFixed from "../../utils/formatFixed";
import { Link } from "react-router-dom";

function PetCard({ pets }) {
  //scroll to top on pet click
  function handleToTop() {
    window.scrollTo(0, 0);
  }

  return (
    <article className="my-pets">
      <ul className="my-pets__list">
        {pets.map((pet) => {
          return (
            <li className="my-pets__list-item" key={pet.id}>
              <Link to={`/pets/${pet.id}`}>
                <button
                  className="my-pet__button"
                  onClick={() => handleToTop()}
                >
                  <img src={pet.image} alt={pet.name} className="my-pet__img" />
                  <div className="my-pet__info">
                    <p className="my-pet__body my-pet__body--title">
                      {pet.name}
                    </p>
                    <p className="my-pet__body">{pet.type}</p>
                    <p className="my-pet__body">DOB: {formatDate(pet.dob)}</p>
                    <p className="my-pet__body">{petAge(pet.dob)}</p>
                    <p
                      className={`my-pet__body ${
                        pet.sex === "male"
                          ? "my-pet__body--male"
                          : pet.sex === "female"
                          ? "my-pet__body--female"
                          : ""
                      }`}
                    >
                      {pet.sex}
                    </p>
                    <p className="my-pet__body">{formatFixed(pet)}</p>
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
