import '../styles/card.css';
import React,{useState,useEffect} from 'react';

    

import axios from 'axios';
export default function card(props){


const [requestPopup,setRequestPopup]=useState(false);

const [detailsPopup,setDetailsPopup]=useState(false);
const [background,setBackground]=useState(true);

//request form states

const [requesterId,setRequesterId]=useState(props.userId);
const [medId,setMedId]=useState(props.medId);
const [donorId,setDonorId]=useState(props.donorId);
const [prescriptionImg,setPrescriptionImg]=useState('');
const [reason,setReason]=useState('');
const [reqrQty,setReqrQty]=useState(0);
const [file,setFile]=useState(null);

//get location
const [lat,setLat]=useState(props.locx);
const [lon,setLon]=useState(props.locy);
const [location,setLocation]=useState("");

useEffect(() => {
    const fetchLocation = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/getLocation`, {
                params: { lat, lon },
                
            });
            setLocation(response.data.location);
        } catch (error) {
            console.error("Error fetching location", error);
        }
    };

    if (lat && lon) fetchLocation();
}, [lat, lon]);

const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    
  };
  
const handleRequestSubmission=async (e)=>{
    e.preventDefault();
    if(!requesterId){
        window.alert("Please Log In First!");
        
        return;
    }
    if(!reason||!file||!reqrQty){
        console.log(reason);

        window.alert("Fill all the fields!");
        return;
    }
    const formData=new FormData();
    formData.append('requester_id',requesterId);
    formData.append('med_id',medId);
    formData.append('donor_id',donorId);
    formData.append('reason',reason);
    formData.append('file',file);
    formData.append('quantity',reqrQty);




    
    try {
        
        const  response=await axios.post('http://localhost:5000/api/requestSubmission',formData,{
            headers:{
                "Content-Type":'multipart/form-data'
            },
        });
        console.log(response.data.message);
        if(response.status===200){
            console.log(response.data.message);
            window.alert("Request Submitted Successfully!");
        }else{
            window.alert(response.data.message);
            console.log(response.status);
        }
        
    } catch (error) {
        window.alert(error.response.data.message);
        console.error(error);
    }
    setRequestPopup(false);
    setBackground(true);

}

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
        <div className={background?"card-item":"card-item popup-active"}>
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
                         <form onSubmit={handleRequestSubmission} className='request-form ' action="">
                         <input type="text"  placeholder='Reason for procuring' onChange={(e)=>setReason(e.target.value)} />
                         
                         <span>Upload Prescription</span>
                         <input type="file" onChange={handleFileChange}  placeholder='Prescription'  />
                         <input type="number" placeholder='Quantity' onChange={(e)=>setReqrQty(e.target.value)} />
                

                             <div className='form-btns'>
                         <button type='submit'>Request</button>
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
                    <p>Quantity:{props.qty}</p>
                    <p>Location:{location}</p>
                    <p>Company:{props.company}</p>
                    <p>Common Dieases:{props.disease}</p>
                   
                    <button onClick={handleClose}>Close</button>
                    </div>

                )
            }

            
    

        </div>
    );

}