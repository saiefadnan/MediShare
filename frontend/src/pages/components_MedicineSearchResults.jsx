import React from 'react';
import '../styles/components_MedicineSearchResults.css';

const MedicineSearchResults = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const medicines = [
    {
      id: 1,
      name: "ALLER TEC",
      image: "/medicines/allertec.png", // Replace with your image path
      price: 3,
      available: true
    },
    {
      id: 2,
      name: "Zyrtec",
      image: "/medicines/zyrtec.png", // Replace with your image path
      price: 2.5,
      available: true
    },
    {
      id: 3,
      name: "Reactine",
      image: "/medicines/reactine.png", // Replace with your image path
      price: 3.5,
      available: false
    }
  ];

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        <div className="medicine-grid">
          {medicines.map((medicine) => (
            <div key={medicine.id} className="medicine-card">
              <div className="medicine-image-container">
                <img 
                  src={medicine.image} 
                  alt={medicine.name}
                  className="medicine-image"
                />
              </div>
              <div className="medicine-info">
                <h3 className="medicine-name">{medicine.name}</h3>
                <p className="medicine-price">
                  PRICE: {medicine.price} TK(Psc)
                </p>
                <p className={`medicine-status ${medicine.available ? 'available' : 'unavailable'}`}>
                  {medicine.available ? 'Available' : 'Unavailable'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MedicineSearchResults; 