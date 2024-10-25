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
import placeholderImage from "../../assets/images/placeholder--dog.webp";

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
      <div className="records">Veterinary Records</div>
      <div className="vaccines">Vaccine Log</div>
      <div className="weight">Weight Log</div>
      <div className="notes">Notes</div>
      <div className="back">
        <Link to={`/pets/`}>
          <button className="back-icon__button">
            <img
              src={backicon}
              className="back-icon__img"
              alt="Back to Pet List"
            />
          </button>
        </Link>
      </div>
      <h1 className="my-pet__title">{pet.name}</h1>
      <img
        src={
          pet.image
            ? `http://localhost:${port}/pet_uploads/${pet.image}`
            : placeholderImage
        }
        alt={pet.name}
        className="my-pets__img"
      />
      <div className="my-pet__info">
        <p className="my-pet__body my-pet__body--title">{pet.name}</p>
        <div className="my-pet__container">
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
        <p className="my-pet__body">{pet.type}</p>
        <p className="my-pet__body">{pet.breed}</p>
        <p className="my-pet__body">
          DOB: {pet.dob ? formatDate(pet.dob) : ""}
        </p>
        <p className="my-pet__body">{petAge(pet.dob)}</p>
        <p className="my-pet__body">{formatFixed(pet)}</p>
        <p className="my-pet__body">{pet.currentWeight} kg</p>
        {pet.food && <p className="my-pet__body">Food: {pet.food}</p>}
        {pet.conditions && (
          <p className="my-pet__body">Conditions: {pet.conditions}</p>
        )}

        {pet.meds && <p className="my-pet__body">Medications: {pet.meds}</p>}
        <p className="my-pet__body">
          Microchipped: {pet.isMicrochipped ? "✅" : "❌"}
        </p>
        {pet.isMicrochipped === 1 && pet.microNumber && (
          <p className="my-pet__body">Microchip Number: {pet.microNumber}</p>
        )}
      </div>

      <div className="edit-pet-icon">
        <Link to={`/pets/${petId}/edit`}>
          <button className="edit-pet">
            <img src={editicon} className="edit-icon" alt="Edit pet" />
          </button>
        </Link>
      </div>

      <div className="delete-pet-icon">
        <img
          src={deleteicon}
          className="delete-icon"
          alt="Delete pet"
          onClick={handleOpenModal}
        />
      </div>
    </article>
  );
}

export default MyPetPage;
