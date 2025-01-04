import './findMed.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Card from '../../components/Card.jsx';
import {useState,useEffect} from 'react';
import data from './assets/data.js';
import cardImg from './assets/img/bg.jpg';



export default function FindMedPage(){

    const rng=12;

    const [filterButton,setFilterButton]=useState(false);
    const [medData,setMedData]=useState(data.slice(0,rng));
    const [count,setCount]=useState(1);

    function loadMore(){
        setCount(count+1);
    }

    function handleFilterButton(){
        setFilterButton(!filterButton);
        
    }

    useEffect(()=>{
        let nxtRng=count*rng;
        if(nxtRng>data.length){
            nxtRng=data.length;
        }  
        setMedData(data.slice(0,nxtRng));
          

    },[count]);

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
                {
                    medData.map(med=><Card key={med.Id} imgSrc={cardImg} title={med.name} qty={med.qty} expiryDate={med.expiryDate} />)
                }
            
            </div>
            <button className='loadmore-btn' onClick={loadMore}>Load More</button>
           


        </div>
        </div>
        
        
    );
}