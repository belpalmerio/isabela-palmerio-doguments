import "./Modal.scss";

const Modal = ({ isModalOpen, onClose, onDelete, pet }) => {
  if (!isModalOpen) {
    return null;
  }

  return (
    <div className="overlay">
      <div className="popup">
        <h2>Are you sure you want to delete {pet.name}?</h2>
        <button onClick={onDelete}>Delete</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default Modal;
