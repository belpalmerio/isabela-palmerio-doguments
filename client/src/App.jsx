import { BrowserRouter, Routes, Route } from "react-router-dom";
// import HomePage from "./pages/HomePage/HomePage";
import MyPetListPage from "./pages/MyPetListPage/MyPetListPage";
import AddMyPetPage from "./pages/AddMyPetPage/AddMyPetPage";
import MyPetPage from "./pages/MyPetPage/MyPetPage";
import EditMyPetPage from "./pages/EditMyPetPage/EditMyPetPage";
// import RecordPage from "./pages/RecordPage/RecordPage";
// import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
// import Header from "./components/Header/Header";
import "./styles/partials/_global.scss";

function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/pets" element={<MyPetListPage />} />
        <Route path="/pets/add" element={<AddMyPetPage />} />
        <Route path="/pets/:petId" element={<MyPetPage />} />
        <Route path="/pets/:petId/edit" element={<EditMyPetPage />} />
        {/* <Route path="/pets/:petId/records" element={<RecordPage />} />
        <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
