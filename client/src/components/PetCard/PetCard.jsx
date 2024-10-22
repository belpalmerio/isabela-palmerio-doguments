import "./PetCard.scss";
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