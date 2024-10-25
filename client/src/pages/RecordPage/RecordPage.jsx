import "./RecordPage.scss";
import Record from "../../components/Record/Record";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../utils/api.js";
import RecordModal from "../../components/RecordModal/RecordModal.jsx";
import backicon from "../../assets/icons/backicon.svg";

function RecordPage() {
  const { userId, petId } = useParams();
  const [records, setRecords] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  //set document title
  useEffect(() => {
    document.title = "Records - Doguments";
  }, []);

  //get record list
  const getRecords = async () => {
    const url = `${baseUrl}pets/${petId}/records`;

    try {
      const response = await axios.get(url);
      setRecords(response.data);
    } catch (error) {
      console.log("Error fetching record data", error);
    }
  };

  useEffect(() => {
    getRecords();
  }, [petId]);

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  async function handleRecordUpload(formData) {
    const url = `${baseUrl}pets/${petId}/records`;

    try {
      await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      getRecords();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error uploading document", error);
    }
  }

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  let navigate = useNavigate();

  return (
    <div className="container">
      <div className="records">Veterinary Records</div>
      <div className="vaccines">Vaccine Log</div>
      <div className="weight">Weight Log</div>
      <div className="notes">Notes</div>
      <div className="back">
        <Link to={`/pets/${petId}`}>
          <button className="back-icon__button">
            <img
              src={backicon}
              className="back-icon__img"
              alt="Back to Pet List"
            />
          </button>
        </Link>
      </div>
      RECORD PAGE
      <button className="record" onClick={handleOpenModal}>
        Add Document
      </button>
      <RecordModal
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        handleRecordUpload={handleRecordUpload}
        petId={petId}
      />
      <Record records={records} />
    </div>
  );
}

export default RecordPage;
