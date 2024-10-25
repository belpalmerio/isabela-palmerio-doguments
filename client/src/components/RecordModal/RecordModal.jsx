import "./RecordModal.scss";
import { useState } from "react";

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
        <article className="record">
          <button className="record__close" onClick={handleCancel}>
            X
          </button>
          <h2 className="record__title">Upload Documents</h2>
          <form
            encType="multipart/form-data"
            className="record__form"
            onSubmit={handleSubmit}
          >
            <label className="record__label">
              Appointment Date:
              <input
                type="date"
                className="record__body"
                value={apptDate}
                onChange={(e) => setApptDate(e.target.value)}
              />
            </label>
            <input
              className="record__body"
              type="file"
              name="recordFile"
              accept=".pdf, .doc, .docx, .jpg, .jpeg, .png, image/*"
              onChange={handleFileChange}
              required
            />
            <button type="submit" className="record__submit">
              Upload
            </button>
          </form>
        </article>
      </div>
    </div>
  );
}

export default RecordModal;
