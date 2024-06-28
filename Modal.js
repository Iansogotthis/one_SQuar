import React from "react";

const Modal = ({
  isOpen,
  onClose,
  onSave,
  label,
  setLabel,
  onScaledView,
  onScopedView,
  onInclude,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <p>Edit Label:</p>
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
        <button onClick={onSave} className="modal-button">Save</button>
        <button onClick={onClose} className="modal-button">Cancel</button>
        <br />
        <button onClick={onScaledView} className="modal-button">Scaled View</button>
        <button onClick={onScopedView} className="modal-button">Scoped View</button>
        <button onClick={onInclude} className="modal-button">Include</button>
      </div>
    </div>
  );
};

export default Modal;