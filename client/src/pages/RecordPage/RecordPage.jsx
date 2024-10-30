import "./RecordPage.scss";
import Record from "../../components/Record/Record";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../utils/api.js";
import TitleBox from "../../components/TitleBox/TitleBox.jsx";
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
    <div className="record">
      <div className="record__cont">
        <Link to={`/pets/${petId}`}>
          <button className="back__button">
            <img src={backicon} className="back__img" alt="Back to Pet List" />
          </button>
        </Link>
        <TitleBox title={"Documents"} />
      </div>
      <ul className="record__list">
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
      <div className="record__wrapper">
        <Record records={records} />
        <div className="record__wrapper-wrapper">
          <div className="record__button-wrapper">
            <button className="record__button" onClick={handleOpenModal}>
              Add Document
            </button>
            <button className="record__button" onClick={handleOpenModal}>
              Request Document
            </button>
          </div>
        </div>
        <RecordModal
          isModalOpen={isModalOpen}
          handleCancel={handleCancel}
          handleRecordUpload={handleRecordUpload}
          petId={petId}
        />
      </div>
    </div>
  );
}

export default RecordPage;
