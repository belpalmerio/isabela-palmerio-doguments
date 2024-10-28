import "./RecordModal.scss";
import { useState } from "react";
import backicon from "../../assets/icons/backicon.svg";

function RecordModal({ isModalOpen, handleCancel, handleRecordUpload, petId }) {
  const [apptDate, setApptDate] = useState("");
  const [recordFile, setRecordFile] = useState(null);

  if (!isModalOpen) {
    return null;
  }

  function handleFileChange(e) {
    setRecordFile(e.target.files[0]);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    if (apptDate) {
      formData.append("apptDate", apptDate);
    }
    formData.append("petId", petId);
    formData.append("recordFile", recordFile);

    console.log("Record File: ", recordFile);
    console.log("Appointment Date: ", apptDate);

    await handleRecordUpload(formData);
  }

  return (
    <div className="overlay">
      <div className="popup">
        <article className="popup__container">
          <h2 className="popup__title">
            <button className="popup__close" onClick={handleCancel}>
              <img src={backicon} className="popup__icon" alt="Back Icon" />
            </button>
            Upload Documents
          </h2>
          <form
            encType="multipart/form-data"
            className="popup__form"
            onSubmit={handleSubmit}
          >
            <label className="popup__label">
              Date:
              <input
                type="date"
                className="popup__body"
                value={apptDate}
                onChange={(e) => setApptDate(e.target.value)}
              />
            </label>
            <input
              className="popup__body"
              type="file"
              name="recordFile"
              accept=".pdf, .doc, .docx, .jpg, .jpeg, .png, image/*"
              onChange={handleFileChange}
              required
            />
            <div className="popup__button-wrapper">
              <button type="submit" className="popup__button">
                Upload
              </button>
            </div>
          </form>
        </article>
      </div>
    </div>
  );
}

export default RecordModal;
