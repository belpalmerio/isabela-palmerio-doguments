import "./AddMyPetPage.scss";
import formatDate from "../../utils/formatDate.js";
import petAge from "../../utils/petAge.js";
import displaySpayOrNeuter from "../../utils/displaySpayOrNeuter.js";
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
} from "../../utils/formTypes.js";
import {
  requiredFields,
  requiredBooleans,
} from "../../utils/requiredFields.js";
import { baseUrl } from "../../utils/api.js";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import deleteicon from "../../assets/icons/deleteicon.svg";

function AddMyPetPage() {
  const { userId } = useParams();
  const [redirect, setRedirect] = useState(false);
  const [originalDob, setOriginalDob] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
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
    document.title = `Add Your Pet - Doguments`;
  }, [formInput]);

  let navigate = useNavigate();

  function handleTyping(text) {
    return (e) => {
      setFormInput({ ...formInput, [text]: e.target.value });
    };
  }

  const handleWeightInput = (e) => {
    const value = e.target.value;
    if (/^\d+(\.\d{0,2})?$/.test(value) || value === "") {
      setFormInput({ ...formInput, currentWeight: value });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setFormInput({ ...formInput, image: URL.createObjectURL(file) });
    }
  };

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

    requiredBooleans.forEach((boolean) => {
      if (formInput[boolean] === null || formInput[boolean] === undefined) {
        newErrors[boolean] = "This field is required";
        isValid = false;
      }
    });

    if (formInput.type === "Select Type") {
      newErrors[formInput.type] = "Please select an animal type";
      isValid = false;
    }

    if (formInput.breed === "Select Breed") {
      formInput.breed = null;
    }

    setError(newErrors);

    if (isValid) {
      try {
        const formData = new FormData();
        formData.append("name", formInput.name);
        formData.append("image", selectedImage);
        formData.append(
          "dob",
          formInput.dob ? formatDate(formInput.dob) : originalDob
        );
        formData.append("sex", formInput.sex);
        formData.append("isFixed", formInput.isFixed ? 1 : 0);
        formData.append("type", formInput.type);
        formData.append("breed", formInput.breed);
        formData.append("conditions", formInput.conditions);
        formData.append("food", formInput.food);
        formData.append("meds", formInput.meds);
        formData.append("currentWeight", parseFloat(formInput.currentWeight));
        formData.append("isMicrochipped", formInput.isMicrochipped ? 1 : 0);
        formData.append("microNumber", formInput.microNumber);
        console.log("Form data being sent:", formData);
        for (let [key, value] of formData.entries()) {
          console.log(`${key}:`, value);
        }

        const response = await axios.post(`${baseUrl}pets/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

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
        navigate(`/pets`);
      }, 2500);
    }
  }, [redirect, navigate]);

  return (
    <article className="edit-pet">
      <div className="records">Veterinary Records</div>
      <div className="vaccines">Vaccine Log</div>
      <div className="weight">Weight Log</div>
      <div className="notes">Notes</div>
      <form
        action="/pets"
        className="edit-pet__form"
        encType="multipart/form-data"
        onSubmit={handleFormSubmit}
      >
        <label className="edit-pet__label">
          Name:
          <input
            type="text"
            value={formInput.name}
            className="edit-pet__title"
            placeholder="Your pet's name"
            onChange={handleTyping("name")}
          />
        </label>
        <label className="edit-pet__label">
          Upload Image:
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="edit-pet__body"
          />
        </label>
        {(formInput.image || selectedImage) && (
          <img
            src={
              selectedImage
                ? URL.createObjectURL(selectedImage)
                : formInput.image
            }
            alt={formInput.name || "Pet Image"}
            className="edit-pet__img"
          />
        )}

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
              placeholder="Your pet's weight in kg"
              onChange={handleWeightInput}
            />
            kg
          </label>
          <label htmlFor="" className="edit-pet__label">
            Food:
            <input
              type="text"
              value={formInput.food}
              className="edit-pet__body"
              placeholder="Any food your pets consumes"
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
              onChange={handleTyping("meds")}
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

        <button className="button" type="submit">
          Add Pet
        </button>
      </form>

      <div className="delete-pet">
        <img src={deleteicon} className="delete-icon" alt="Delete pet" />
      </div>
    </article>
  );
}

export default AddMyPetPage;
