import '../styles/card.css';
import React,{useState,useEffect} from 'react';

export default function card(props){

const [requestPopup,setRequestPopup]=useState(false);

const [detailsPopup,setDetailsPopup]=useState(false);
const [background,setBackground]=useState(true);

function handleRequest(){
    setRequestPopup(true);
    setBackground(false);
}

function handleDetails(){
    setDetailsPopup(true);
    setBackground(false);
}

function handleClose() {
    setRequestPopup(false);
    setDetailsPopup(false);
    setBackground(true);
};



    return(
        <div className="card-item">
            <img src={props.imgSrc} alt="img" />

            <div className='card-details'>
                <h2 className='card-title'>{props.title}</h2>
                <p className='quantity'>Qty:{props.qty}</p>
                <p className='exp-date'>Exp Date:{props.expiryDate}</p>
            </div>
            <div className='card-btns'>
                <button onClick={handleRequest}>Request</button>
                <button onClick={handleDetails}>Details</button>
            </div>

            {
                requestPopup&&(

                    <div className='request-popup'>
                         <form className='request-form ' action="">
                         <input type="text"  placeholder='Reason for procuring' />
                         <input type="text" placeholder='Your Current Location' />
                         <span>Upload Prescription</span>
                         <input type="file"  placeholder='Prescription' />
                         <input type="number" placeholder='Quantity' />
                

                             <div className='form-btns'>
                         <button onClick={handleRequest}>Request</button>
                        <button onClick={handleClose}>Close</button>
                        </div>

                         </form>

            </div>

                )
            }

            {
                detailsPopup&&(

                    <div className='details-popup'>
                    <h2>Medicine Details</h2>
                    <hr/>
                    <p>Generic Name:{props.title}</p>
                    <p>Quantity:05</p>
                    <p>Location:Khulna</p>
                    <p>Company:Beximco</p>
                    <p>Common Dieases:Fever,cold</p>
                    <p>Description:Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio vero nulla quasi explicabo consequuntur voluptatem, odit quam vel praesentium!</p>
                    <button onClick={handleClose}>Close</button>
                    </div>

                )
            }

            
    

        </div>
    );

}