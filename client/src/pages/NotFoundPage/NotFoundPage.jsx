import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./NotFoundPage.scss";

function NotFoundPage() {
  const navigate = useNavigate();

  //set document title
  useEffect(() => {
    document.title = "Page Not Found - Doguments";
  }, []);

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 2000);
  }, [navigate]);

  return (
    <div className="not-found">
      <h1 className="not-found__title">404</h1>
      <p className="not-found__text">Page not found.</p>
    </div>
  );
}

export default NotFoundPage;
