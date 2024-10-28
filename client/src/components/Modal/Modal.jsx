import "./Modal.scss";

const Modal = ({ isModalOpen, onClose, onDelete, pet }) => {
  if (!isModalOpen) {
    return null;
  }

  return (
    <div className="overlay">
      <div className="popup">
        <h2 className="popup__title">
          Are you sure you want to delete {pet.name}?
        </h2>
        <div className="popup__button-wrapper">
          <button className="popup__button" onClick={onDelete}>
            Delete
          </button>
          <button className="popup__button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
