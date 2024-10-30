import "./PetCard.scss";
import formatDate from "../../utils/formatDate";
import petAge from "../../utils/petAge";
import formatFixed from "../../utils/formatFixed";
import { Link } from "react-router-dom";
import { port } from "../../utils/api";
import placeholderImage from "../../assets/images/placeholder--dog.png";

function PetCard({ pets }) {
  //scroll to top on pet click
  function handleToTop() {
    window.scrollTo(0, 0);
  }

  return (
    <>
      {pets.map(
        ({
          id,
          name,
          image,
          dob,
          type,
          breed,
          conditions,
          current_weight,
          food,
          is_fixed,
          is_microchipped,
          meds,
          micro_number,
          sex,
        }) => {
          const isFixed = is_fixed;
          return (
            <li className="my-pets__item" key={id}>
              <Link to={`/pets/${id}`}>
                <button
                  className="my-pets__button"
                  onClick={() => handleToTop()}
                >
                  <h3 className="my-pets__header">{name}</h3>
                  <div className="my-pets__wrapper">
                    <div className="my-pets__container">
                      <img
                        src={
                          image
                            ? `http://localhost:${port}/pet_uploads/${image}`
                            : placeholderImage
                        }
                        alt={name}
                        className="my-pets__img"
                      />
                    </div>

                    <div className="my-pets__info">
                      <p className="my-pets__body">{type}</p>
                      <p className="my-pets__body">DOB: {formatDate(dob)}</p>
                      <p className="my-pets__body">{petAge(dob)}</p>
                      <div className="my-pets__gender-wrapper">
                        <p className="my-pets__body my-pets__body--special my-pets__body--fixed">
                          {formatFixed({ sex, isFixed })}
                        </p>
                        <p
                          className={`my-pets__body ${
                            sex === "male"
                              ? "my-pets__body--male"
                              : sex === "female"
                              ? "my-pets__body--female"
                              : ""
                          } my-pets__body--special`}
                        >
                          {sex}
                        </p>
                      </div>
                    </div>
                  </div>
                </button>
              </Link>
            </li>
          );
        }
      )}
    </>
  );
}

export default PetCard;
