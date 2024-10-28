import "./MyPetPage.scss";
import formatDate from "../../utils/formatDate";
import petAge from "../../utils/petAge";
import formatFixed from "../../utils/formatFixed";
import { baseUrl, port } from "../../utils/api.js";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import editicon from "../../assets/icons/editicon.svg";
import deleteicon from "../../assets/icons/deleteicon.svg";
import backicon from "../../assets/icons/backicon.svg";
import Modal from "../../components/Modal/Modal.jsx";
import TitleBox from "../../components/TitleBox/TitleBox.jsx";
import placeholderImage from "../../assets/images/placeholder--dog.png";
import pawicon1 from "../../assets/icons/brown_beige-icon.png";
import pawicon2 from "../../assets/icons/teal_beige-icon.png";
import pawicon3 from "../../assets/icons/brown_teal-icon.png";

function MyPetPage() {
  const { userId, petId } = useParams();
  const [redirect, setRedirect] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pet, setPet] = useState({
    id: "",
    name: "",
    image: "",
    dob: "",
    sex: "",
    isFixed: "",
    type: "",
    breed: "",
    conditions: "",
    food: "",
    meds: "",
    currentWeight: "",
    isMicrochipped: "",
    microNumber: "",
  });

  //set document title
  useEffect(() => {
    document.title = `${pet.name} - Doguments`;
  }, [pet]);

  const getSpecificPet = async () => {
    if (petId) {
      const url = `${baseUrl}pets/${petId}`;

      try {
        const response = await axios.get(url);
        console.log(response.data);
        const data = response.data;
        setPet({
          name: data.name,
          image: data.image,
          dob: data.dob,
          sex: data.sex,
          isFixed: data.is_fixed,
          type: data.type,
          breed: data.breed,
          conditions: data.conditions,
          food: data.food,
          meds: data.meds,
          currentWeight: data.current_weight,
          isMicrochipped: data.is_microchipped,
          microNumber: data.micro_number,
        });
        console.log(data.image);
      } catch (error) {
        console.log("Error fetching specific pet data", error);
      }
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleDeleteModal = async () => {
    const url = `${baseUrl}pets/${petId}`;
    try {
      await axios.delete(url);
      setRedirect(true);
    } catch (error) {
      console.error("Error deleting pet", error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getSpecificPet();
  }, [petId]);

  let navigate = useNavigate();

  useEffect(() => {
    if (redirect) {
      setTimeout(() => {
        navigate("/pets/");
      }, 2500);
    }
  }, [redirect, navigate]);

  return (
    <article className="my-pet">
      <Modal
        isModalOpen={isModalOpen}
        onClose={handleCancel}
        onDelete={handleDeleteModal}
        pet={pet}
      ></Modal>
      <TitleBox title={`${pet.name}'s Profile`} />
      <ul className="my-pet__list">
        <Link to={`/pets/${petId}/records`}>
          <li className="my-pet__item my-pet__item--records">Docs</li>
        </Link>
        <Link to={`/pets/${petId}/vaccines`}>
          <li className="my-pet__item my-pet__item--vaccines">Vaccine Log</li>
        </Link>
        <Link to={`/pets/${petId}/weight`}>
          <li className="my-pet__item my-pet__item--weight">Weight Log</li>
        </Link>
        <Link to={`/pets/${petId}/notes`}>
          <li className="my-pet__item my-pet__item--notes">Notes</li>
        </Link>
      </ul>
      <div className="my-pet__wrapper">
        <div className="my-pet__change-container">
          <div className="back">
            <Link to={`/pets/`}>
              <button className="back__button">
                <img
                  src={backicon}
                  className="back__img"
                  alt="Back to Pet List"
                />{" "}
              </button>
            </Link>
          </div>
          <div className="my-pet__img-container">
            <img
              src={
                pet.image
                  ? `http://localhost:${port}/pet_uploads/${pet.image}`
                  : placeholderImage
              }
              alt={pet.name}
              className="my-pet__img"
            />
          </div>
        </div>
        <div className="my-pet__info-wrapper">
          <div className="my-pet__name-wrapper">
            <h4 className="my-pet__title">{pet.name}</h4>
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
          </div>
          <div className="my-pet__info">
            <div className="my-pet__info-container">
              <div className="my-pet__type-container">
                <p className="my-pet__body">{pet.type}</p>
                <p className="my-pet__body">{pet.breed}</p>
              </div>
              <div className="my-pet__age-container">
                <p className="my-pet__body">
                  {pet.dob ? formatDate(pet.dob) : ""}
                </p>
                <p className="my-pet__body">{petAge(pet.dob)}</p>
              </div>
            </div>
            <div className="my-pet__info-container">
              <p className="my-pet__body">{formatFixed(pet)}</p>
              <p className="my-pet__body">{pet.currentWeight} kg</p>
            </div>
            {pet.food && (
              <>
                <p className="my-pet__body my-pet__body--bold my-pet__body--conditional">
                  Diet:
                </p>
                <p className="my-pet__body ">
                  <img
                    src={pawicon1}
                    alt="Paw Print Icon"
                    className="my-pet__icon"
                  />
                  {pet.food}
                </p>{" "}
              </>
            )}
            {pet.conditions && (
              <>
                <p className="my-pet__body my-pet__body--bold my-pet__body--conditional">
                  Conditions:
                </p>
                <p className="my-pet__body">
                  <img
                    src={pawicon2}
                    alt="Paw Print Icon"
                    className="my-pet__icon"
                  />
                  {pet.conditions}
                </p>
              </>
            )}

            {pet.meds && (
              <>
                <p className="my-pet__body my-pet__body--bold my-pet__body--conditional">
                  Medications:
                </p>
                <p className="my-pet__body">
                  <img
                    src={pawicon3}
                    alt="Paw Print Icon"
                    className="my-pet__icon"
                  />
                  {pet.meds}
                </p>
              </>
            )}
            <div className="my-pet__micro-container">
              <div className="my-pet__container-wrapper my-pet__container-wrapper--flex">
                <p className="my-pet__body my-pet__body--bold my-pet__body--conditional">
                  Microchipped:
                </p>

                <p className="my-pet__body my-pet__body--conditional my-pet__body--space">
                  {pet.isMicrochipped ? "✅" : "❌"}
                </p>
              </div>
              {pet.isMicrochipped === 1 && pet.microNumber && (
                <div className="my-pet__container-wrapper">
                  <p className="my-pet__body my-pet__body--bold my-pet__body--conditional">
                    Microchip Number:
                  </p>
                  <p className="my-pet__body">{pet.microNumber}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <section className="my-pet__icon-container">
          <div className="my-pet__edit-icon">
            <Link to={`/pets/${petId}/edit`}>
              <button className="edit-icon">
                <img src={editicon} className="edit-icon" alt="Edit pet" />
              </button>
            </Link>
          </div>

          <div className="my-pet__delete-pet-icon">
            <img
              src={deleteicon}
              className="delete-icon"
              alt="Delete pet"
              onClick={handleOpenModal}
            />
          </div>
        </section>
      </div>
    </article>
  );
}

export default MyPetPage;
