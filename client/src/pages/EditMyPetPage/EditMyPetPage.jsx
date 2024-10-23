import "./EditMyPetPage.scss";
import formatDate from "../../utils/formatDate";
import petAge from "../../utils/petAge";
import displaySpayOrNeuter from "../../utils/displaySpayOrNeuter";
import {
  types,
  dogBreeds,
  catBreeds,
  birdBreeds,
  reptileBreeds,
  rodentBreeds,
  amphibianBreeds,
  equineBreeds,
  fishBreeds,
  rabbitBreeds,
  breedOptions,
} from "../../utils/formTypes";
import requiredFields from "../../utils/requiredFields";
import { baseUrl } from "../../utils/api.js";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import deleteicon from "../../assets/icons/deleteicon.svg";

function EditMyPetPage() {
  const { userId, petId } = useParams();
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState({
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

  const [formInput, setFormInput] = useState({
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
    document.title = `Edit ${formInput.name} - Doguments`;
  }, [formInput]);

  useEffect(() => {
    async function getPetFormData() {
      try {
        const response = await axios.get(`${baseUrl}pets/${petId}`);
        const data = response.data;
        setFormInput({
          name: data.name,
          image: data.image,
          dob: data.dob,
          sex: data.sex,
          isFixed: data.is_fixed === 1,
          type: data.type,
          breed: data.breed,
          conditions: data.conditions,
          food: data.food,
          meds: data.meds,
          currentWeight: data.current_weight,
          isMicrochipped: data.is_microchipped === 1,
          microNumber: data.micro_number,
        });
        console.log("Micro?:", data.is_microchipped);
      } catch (error) {
        console.log("Error fetching specific pet data", error);
      }
    }

    getPetFormData();
  }, [petId]);

  let navigate = useNavigate();

  function handleTyping(text) {
    return (e) => {
      setFormInput({ ...formInput, [text]: e.target.value });
    };
  }

  async function handleFormSubmit(e) {
    e.preventDefault();

    const newErrors = {};
    let isValid = true;

    requiredFields.forEach((field) => {
      if (!formInput[field]?.trim()) {
        newErrors[field] = "This field is required";
        isValid = false;
      }
    });

    if (
      typeof formInput.currentWeight !== "number" ||
      formInput.currentWeight <= 0
    ) {
      newErrors[currentWeight] = "Weight must be a positive number";
      isValid = false;
    }

    if (formInput.type === "Select Type") {
      newErrors[type] = "Please select an animal type";
      isValid = false;
    }

    if (formInput.breed === "Select Breed") {
      formInput.breed = null;
    }

    setError(newErrors);

    if (isValid) {
      try {
        const response = await axios.put(`${baseUrl}pets/${petId}`, formInput);

        setFormInput({
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

        setRedirect(true);
      } catch (error) {
        console.log("Error editing pet:", error);
      }
    } else {
      console.log("Validation error", newErrors);
    }
  }

  useEffect(() => {
    if (redirect) {
      setTimeout(() => {
        navigate(`/pets/${petId}`);
      }, 2500);
    }
  }, [redirect, navigate]);

  return (
    <article className="edit-pet">
      <div className="records">Veterinary Records</div>
      <div className="vaccines">Vaccine Log</div>
      <div className="weight">Weight Log</div>
      <div className="notes">Notes</div>
      <form action="" className="edit-pet__form">
        <input
          type="text"
          value={formInput.name}
          className="edit-pet__title"
          onChange={handleTyping("name")}
        />
        <img
          src={formInput.image}
          alt={formInput.name}
          className="edit-pet__img"
        />
        <div className="edit-pet__info">
          <div className="edit-pet__container">
            <label className="edit-pet__body">Sex:</label>
            <div>
              <label className="edit-pet__body edit-pet__body--male">
                <input
                  type="radio"
                  value="male"
                  checked={formInput.sex === "male"}
                  onChange={(e) =>
                    setFormInput({ ...formInput, sex: e.target.value })
                  }
                />
                Male
              </label>
              <label className="edit-pet__body edit-pet__body--female">
                <input
                  type="radio"
                  value="female"
                  checked={formInput.sex === "female"}
                  onChange={(e) =>
                    setFormInput({ ...formInput, sex: e.target.value })
                  }
                />
                Female
              </label>
              <label className="edit-pet__body">
                {displaySpayOrNeuter(formInput)}:
                <label className="edit-pet__body edit-pet__body--yes">
                  <input
                    type="radio"
                    value="true"
                    checked={formInput.isFixed === true}
                    onChange={(e) =>
                      setFormInput({ ...formInput, isFixed: true })
                    }
                  />
                  IsMicro
                </label>
                <label className="edit-pet__body edit-pet__body--no">
                  <input
                    type="radio"
                    value="false"
                    checked={formInput.isFixed === false}
                    onChange={(e) =>
                      setFormInput({ ...formInput, isFixed: false })
                    }
                  />
                  IsntMicro
                </label>
              </label>
            </div>
          </div>
          <label className="edit-pet__body">
            Type:
            <select
              type="select"
              value={formInput.type}
              onChange={(e) =>
                setFormInput({ ...formInput, type: e.target.value })
              }
            >
              <option>Select Type</option>
              {types?.map((types) => (
                <option key={types} value={types}>
                  {types}
                </option>
              ))}{" "}
            </select>
          </label>
          {formInput.type &&
            formInput.type !== "Hedgehog" &&
            formInput.type !== "Other" && (
              <label className="edit-pet__body">
                Breed:
                <select
                  value={formInput.breed}
                  onChange={(e) =>
                    setFormInput({ ...formInput, breed: e.target.value })
                  }
                  disabled={!formInput.type || formInput.type === "Select Type"}
                >
                  <option>Select Breed</option>
                  {breedOptions[formInput.type]?.map((breed) => (
                    <option key={breed} value={breed}>
                      {breed}
                    </option>
                  ))}
                </select>
              </label>
            )}
          <label htmlFor="" className="edit-pet__label">
            DOB:
            <input
              type="date"
              value={formInput.dob ? formatDate(formInput.dob) : ""}
              className="edit-pet__body"
              onChange={handleTyping("dob")}
            />
          </label>
          <label htmlFor="" className="edit-pet__label">
            Weight:
            <input
              type="text"
              value={formInput.currentWeight}
              className="edit-pet__body"
              onChange={handleTyping("currentWeight")}
            />
            kg
          </label>
          <label htmlFor="" className="edit-pet__label">
            Food:
            <input
              type="text"
              value={formInput.food}
              className="edit-pet__body"
              onChange={handleTyping("food")}
            />
          </label>
          <label htmlFor="" className="edit-pet__label">
            Conditions:
            <input
              type="text"
              value={formInput.conditions}
              className="edit-pet__body"
              placeholder="Any medical conditions your pet has"
              onChange={handleTyping("conditions")}
            />
          </label>
          <label htmlFor="" className="edit-pet__label">
            Medications:
            <input
              type="text"
              value={formInput.meds}
              className="edit-pet__body"
              placeholder="Any medications your pet is taking"
              onChange={handleTyping("medications")}
            />
          </label>
          <label className="edit-pet__body">
            Microchipped:
            <label className="edit-pet__body edit-pet__body--yes">
              <input
                type="radio"
                value="true"
                checked={formInput.isMicrochipped === true}
                onChange={(e) =>
                  setFormInput({ ...formInput, isMicrochipped: true })
                }
              />
              IsMicro
            </label>
            <label className="edit-pet__body edit-pet__body--no">
              <input
                type="radio"
                value="false"
                checked={formInput.isMicrochipped === false}
                onChange={(e) =>
                  setFormInput({ ...formInput, isMicrochipped: false })
                }
              />
              IsntMicro
            </label>
          </label>
          {formInput.isMicrochipped && (
            <label htmlFor="" className="edit-pet__label">
              Microchip Number:
              <input
                type="text"
                value={formInput.microNumber}
                className="edit-pet__body"
                placeholder="Your pet's microchip number"
                onChange={handleTyping("microNumber")}
              />
            </label>
          )}
        </div>

        <button className="button">Update</button>
      </form>

      <div className="delete-pet">
        <img src={deleteicon} className="delete-icon" alt="Delete pet" />
      </div>
    </article>
  );
}

export default EditMyPetPage;
