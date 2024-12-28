import './findMed.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Card from '../../components/Card.jsx';
import {useState} from 'react';

import cardImg from './assets/img/bg.jpg';



export default function FindMedPage(){

    const [filterButton,setFilterButton]=useState(false);

    function handleFilterButton(){
        setFilterButton(!filterButton);
        
    }

    return (
        
        <div id='full-page'>
        <div className='search-section'>
            <h1 >Find Your Med!</h1>
            <div className='search-container'>
            <input type="text" placeholder='Enter Medicine Name'/>
            <button className='search-icon'><FontAwesomeIcon  icon={faMagnifyingGlass}/></button>
            
            </div>
            

        </div>
        <div className='filter-container'>
            <button onClick={handleFilterButton} className='dropdown-button'>Filter</button>
            <div className={filterButton?'popup dropdown-active':'popup dropdown-inactive'}>
            <form className='filter-form ' action="">
                <input type="text"  placeholder='Location' />
                <input type="text" placeholder='Generic Name' />
                <input type="text" placeholder='General Name' />
                <input type="text" placeholder='Disease' />
                <input type="text" placeholder='Company' />
                <input type="date" placeholder='Earliest Expiry Date' />
                <button >Filter</button>

            </form>
            </div>
            
        </div>
        <div className='card-section'>
            <div className='cards-container'>
            <Card imgSrc={cardImg}  title="Napa(500mg)" qty={5} expiryDate="22 Dec 2024"/>
            {/*<Card imgSrc={cardImg} title="Paracetamol (500mg)" qty={10} expiryDate="15 Jan 2025" />
            <Card imgSrc={cardImg} title="Ibuprofen (200mg)" qty={20} expiryDate="30 Mar 2025" />
            <Card imgSrc={cardImg} title="Amoxicillin (250mg)" qty={15} expiryDate="12 Jul 2024" />
            <Card imgSrc={cardImg} title="Cetirizine (10mg)" qty={5} expiryDate="18 Oct 2024" />
            <Card imgSrc={cardImg} title="Metformin (500mg)" qty={8} expiryDate="10 May 2025" />
            <Card imgSrc={cardImg} title="Azithromycin (250mg)" qty={12} expiryDate="22 Dec 2024" />
            <Card imgSrc={cardImg} title="Doxycycline (100mg)" qty={7} expiryDate="25 Aug 2025" />
            <Card imgSrc={cardImg} title="Ciprofloxacin (500mg)" qty={6} expiryDate="14 Feb 2024" />
            <Card imgSrc={cardImg} title="Loratadine (10mg)" qty={9} expiryDate="5 Sep 2025" />
            <Card imgSrc={cardImg} title="Pantoprazole (40mg)" qty={4} expiryDate="1 Nov 2024" />
            <Card imgSrc={cardImg} title="Doxycycline (100mg)" qty={7} expiryDate="25 Aug 2025" />
            <Card imgSrc={cardImg} title="Ciprofloxacin (500mg)" qty={6} expiryDate="14 Feb 2024" />
            <Card imgSrc={cardImg} title="Loratadine (10mg)" qty={9} expiryDate="5 Sep 2025" />
            <Card imgSrc={cardImg} title="Pantoprazole (40mg)" qty={4} expiryDate="1 Nov 2024" />*/}
            </div>
            <button className='loadmore-btn'>Load More</button>
           


        </div>
        <div className='footer-section'>

        </div>
        </div>
        
        
    );
}