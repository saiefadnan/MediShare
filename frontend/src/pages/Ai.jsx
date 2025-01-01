import React, { useState } from 'react';
import '../styles/ai.css';
import Footer from '../components/Footer.jsx'
import '../styles/footer.css'
import MedicineSearchResults from './components_MedicineSearchResults';

const Ai = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="ai-page">
     

      <div className="main-content">
        <h1>Find Your Solution Here</h1>
        <form onSubmit={handleSubmit} className="search-form">
          <div className="search-bar">
            <button  type="button" className="menu-btn">
              ☰
            </button>
            <MedicineSearchResults 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
            <input
              type="text"
              placeholder="which medicine you need but not getting ?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={() => setIsModalOpen(true)}type="submit" className="search-btn">
              🔍
            </button>
          </div>
        </form>
        
                    </div>
                    <div className='footer-section' >
                        <Footer/>
                    </div>
                    </div>
       
   
  );
};

export default Ai;

