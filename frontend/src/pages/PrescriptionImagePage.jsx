import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/PrescriptionImagePage4324.css';

function PrescriptionImagePage4324() {
  const location = useLocation();
  const { prescriptionImage } = location.state || {}; // Retrieve the passed image URL

  if (!prescriptionImage) {
    return <div>No image found.</div>; // Handle if there's no image passed
  }

  return (
    <div className="nodal4324">
      <div className="nodal-content4324">
        <span className="klose-button4324" onClick={() => window.history.back()}>
          &times;
        </span>
        <img
          src={prescriptionImage}
          alt="Prescription"
          className="prescription-image4324"
        />
      </div>
    </div>
  );
}

export default PrescriptionImagePage4324;
