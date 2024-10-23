import "./MyPetPage.scss";
import formatDate from "../../utils/formatDate";
import petAge from "../../utils/petAge";
import formatFixed from "../../utils/formatFixed";
import { baseUrl } from "../../utils/api.js";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import editicon from "../../assets/icons/editicon.svg";
import deleteicon from "../../assets/icons/deleteicon.svg";

function MyPetPage() {
  const { userId, petId } = useParams();
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
      } catch (error) {
        console.log("Error fetching specific pet data", error);
      }
    }
  };

  useEffect(() => {
    getSpecificPet();
  }, [petId]);

  return (
    <article className="my-pet">
      <div className="records">Veterinary Records</div>
      <div className="vaccines">Vaccine Log</div>
      <div className="weight">Weight Log</div>
      <div className="notes">Notes</div>
      <h1 className="my-pet__title">{pet.name}</h1>
      <img src={pet.image} alt={pet.name} className="my-pet__img" />
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
        <p className="my-pet__body">Food: {pet.food}</p>
        {pet.conditions && (
          <p className="my-pet__body">Conditions: {pet.conditions}</p>
        )}

        {pet.meds && <p className="my-pet__body">Medications: {pet.meds}</p>}
        <p className="my-pet__body">
          Microchipped: {pet.isMicrochipped ? "✅" : "❌"}
        </p>
        {pet.isMicrochipped && pet.microNumber && (
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
        <img src={deleteicon} className="delete-icon" alt="Delete pet" />
      </div>
    </article>
  );
}

export default MyPetPage;
