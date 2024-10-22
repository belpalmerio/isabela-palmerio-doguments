import "./MyPetListPage.scss";
import PetCard from "../../components/PetCard/PetCard";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../utils/api.js";

function MyPetListPage() {
  const { userId } = useParams();
  const [pets, setPets] = useState([]);

  //set document title
  useEffect(() => {
    document.title = "My Pets - Doguments";
  }, []);

  //get pet list
  const getPets = async () => {
    const url = `${baseUrl}pets/`;

    try {
      const response = await axios.get(url);
      setPets(response.data);
    } catch (error) {
      console.log("Error fetching pet data", error);
    }
  };

  useEffect(() => {
    getPets();
  }, [userId]);

  return (
    <div className="container">
      <PetCard pets={pets} />
    </div>
  );
}

export default MyPetListPage;
