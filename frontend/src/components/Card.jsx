import '../styles/card.css';
import {useState,useEffect,useCallback, useMemo, useRef } from 'react';
import {motion} from 'framer-motion';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Alert, AlertTitle, Snackbar } from '@mui/material';


    

import axios from 'axios';
export default function Card(props){


const [requestPopup,setRequestPopup]=useState(false);

const [detailsPopup,setDetailsPopup]=useState(false);
const [background,setBackground]=useState(true);
const [alertInfo, setAlertInfo] = useState({ open: false, message: '', severity: 'success' });
const handleAlertClose = () => {
    setAlertInfo({ ...alertInfo, open: false });
  };
  const showAlert = (message, severity = 'success') => {
    setAlertInfo({ open: true, message, severity });
  
    setTimeout(() => {
      setAlertInfo({ ...alertInfo, open: false });
    }, 3000);
  };

//request form states

const [requesterId,setRequesterId]=useState(props.userId);
const [medId,setMedId]=useState(props.medId);
const [donorId,setDonorId]=useState(props.donorId);
const [prescriptionImg,setPrescriptionImg]=useState('');
const [reason,setReason]=useState('');
const [reqrQty,setReqrQty]=useState(0);
const [file,setFile]=useState(null);
const [imagePreview,setImagePreview]=useState('/placeholder.svg');

//get location
const [lat,setLat]=useState(props.locx);
const [lon,setLon]=useState(props.locy);
const [location,setLocation]=useState("");

useEffect(() => {
    const fetchLocation = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getLocation`, {
                params: { lat, lon },
                
            });
            setLocation(response.data.location);
        } catch (error) {
            console.error("Error fetching location", error);
        }
    };

    if (lat && lon && detailsPopup) fetchLocation();
}, [detailsPopup]);

const handleFileChange = (event) => {
    setImagePreview(URL.createObjectURL(event.target.files[0]));
    setFile(event.target.files[0]);
  };
  
const handleRequestSubmission=async (e)=>{
    e.preventDefault();
    console.log(requesterId);
    console.log('MedId: ',medId);
    console.log(donorId);
    console.log(reason);
    if(!requesterId){
        showAlert("Please Log In First!", 'error');
        return;
    }
    if(!reason||!file||!reqrQty){
        console.log(reason);
        showAlert("Fill all the fields!", 'error');
        return;
    }
    if(reqrQty>props.qty){
        showAlert("Quantity requested is more than available!", 'error');
        return;
    }
    if(reqrQty<=0){
        showAlert("Quantity should be greater than 0!", 'error');
        return;
    }
    if(!file.type.includes('image')){
        showAlert("Please upload an image file!", 'error');
        return;
    }
    if(requesterId==donorId){
        showAlert("Tui ki bokachoda naki shala! Nijer dhon nije chushos?", 'error');
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
            showAlert("Request Submitted Successfully!",'success');
        }else{
            showAlert(response.data.message,'error');
            console.log(response.status);
        }
        
    } catch (error) {
        showAlert(error.response.data.message,'error');
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
            <Snackbar
                open={alertInfo.open}
                autoHideDuration={4000}
                onClose={handleAlertClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={handleAlertClose} severity={alertInfo.severity} variant="filled">
                      <AlertTitle>{alertInfo.severity === 'error' ? 'Error' : 'Success'}</AlertTitle>
                      {alertInfo.message}
                </Alert>
            </Snackbar>
            <div className="card183">
                <div className="image-container">
                    <img src={props.imgSrc} alt="img" />
                </div>

                <div className="content">
                    <div className="brand">{props.title}</div>
                    <div className="product-name">For {props.disease}</div>
                    
                    <div className="color-size-container">
                    <div className="colors">
                        Available: {props.qty}
                    </div>
                    <div className="sizes">
                        Expiry Date: {props.expiryDate}
                    </div>
                    </div>

                    {/*<div className="rating">
                    <svg viewBox="0 0 99.498 16.286" xmlns="http://www.w3.org/2000/svg" className="svg four-star-svg">
                        <path fill="#fc0" transform="translate(-0.001 -1.047)" d="M9.357,1.558,11.282,5.45a.919.919,0,0,0,.692.5l4.3.624a.916.916,0,0,1,.509,1.564l-3.115,3.029a.916.916,0,0,0-.264.812l.735,4.278a.919.919,0,0,1-1.334.967l-3.85-2.02a.922.922,0,0,0-.855,0l-3.85,2.02a.919.919,0,0,1-1.334-.967l.735-4.278a.916.916,0,0,0-.264-.812L.279,8.14A.916.916,0,0,1,.789,6.576l4.3-.624a.919.919,0,0,0,.692-.5L7.71,1.558A.92.92,0,0,1,9.357,1.558Z" id="star-svgrepo-com"></path>
                        <path fill="#fc0" transform="translate(20.607 -1.047)" d="M9.357,1.558,11.282,5.45a.919.919,0,0,0,.692.5l4.3.624a.916.916,0,0,1,.509,1.564l-3.115,3.029a.916.916,0,0,0-.264.812l.735,4.278a.919.919,0,0,1-1.334.967l-3.85-2.02a.922.922,0,0,0-.855,0l-3.85,2.02a.919.919,0,0,1-1.334-.967l.735-4.278a.916.916,0,0,0-.264-.812L.279,8.14A.916.916,0,0,1,.789,6.576l4.3-.624a.919.919,0,0,0,.692-.5L7.71,1.558A.92.92,0,0,1,9.357,1.558Z" data-name="star-svgrepo-com" id="star-svgrepo-com-2"></path>
                        <path fill="#fc0" transform="translate(41.215 -1.047)" d="M9.357,1.558,11.282,5.45a.919.919,0,0,0,.692.5l4.3.624a.916.916,0,0,1,.509,1.564l-3.115,3.029a.916.916,0,0,0-.264.812l.735,4.278a.919.919,0,0,1-1.334.967l-3.85-2.02a.922.922,0,0,0-.855,0l-3.85,2.02a.919.919,0,0,1-1.334-.967l.735-4.278a.916.916,0,0,0-.264-.812L.279,8.14A.916.916,0,0,1,.789,6.576l4.3-.624a.919.919,0,0,0,.692-.5L7.71,1.558A.92.92,0,0,1,9.357,1.558Z" data-name="star-svgrepo-com" id="star-svgrepo-com-3"></path>
                        <path fill="#fc0" transform="translate(61.823 -1.047)" d="M9.357,1.558,11.282,5.45a.919.919,0,0,0,.692.5l4.3.624a.916.916,0,0,1,.509,1.564l-3.115,3.029a.916.916,0,0,0-.264.812l.735,4.278a.919.919,0,0,1-1.334.967l-3.85-2.02a.922.922,0,0,0-.855,0l-3.85,2.02a.919.919,0,0,1-1.334-.967l.735-4.278a.916.916,0,0,0-.264-.812L.279,8.14A.916.916,0,0,1,.789,6.576l4.3-.624a.919.919,0,0,0,.692-.5L7.71,1.558A.92.92,0,0,1,9.357,1.558Z" data-name="star-svgrepo-com" id="star-svgrepo-com-4"></path>
                        <path fill="#e9e9e9" transform="translate(82.431 -1.047)" d="M9.357,1.558,11.282,5.45a.919.919,0,0,0,.692.5l4.3.624a.916.916,0,0,1,.509,1.564l-3.115,3.029a.916.916,0,0,0-.264.812l.735,4.278a.919.919,0,0,1-1.334.967l-3.85-2.02a.922.922,0,0,0-.855,0l-3.85,2.02a.919.919,0,0,1-1.334-.967l.735-4.278a.916.916,0,0,0-.264-.812L.279,8.14A.916.916,0,0,1,.789,6.576l4.3-.624a.919.919,0,0,0,.692-.5L7.71,1.558A.92.92,0,0,1,9.357,1.558Z" data-name="star-svgrepo-com" id="star-svgrepo-com-5"></path>
                    </svg>
                    (29,062)
                    </div>*/}
                </div>

                <div className="button-container" style={{margin:"0 0 5% 0"}}>
                    <button className="buy-button button" style={{margin: '0 2% 0 2%'}} onClick={handleRequest}>Request</button>
                    <button className="cart-button button" style={{margin: '0 2% 0 2%'}} onClick={handleDetails}>
                    Details
                    </button>
                </div>
                </div>

            <Modal className="custom-modal" show={requestPopup} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title style={{fontWeight: '600'}}>Request Medicine</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form onSubmit={handleRequestSubmission}>
                        <Form.Group controlId="formReason">
                            <Form.Control className='cookie-para' type="text" placeholder='Reason for procuring' onChange={(e) => setReason(e.target.value)} />
                        </Form.Group><br/>
                        <Form.Group controlId="formFile">
                            <Form.Label className='cookie-para'>Upload Prescription</Form.Label>
                                <div className="medicine-upload-container">
                                    <motion.label
                                            htmlFor="medicineImage"
                                            className="upload-box"
                                            whileHover={{ scale: 1.02 }}
                                            transition={{ 
                                            type: 'tween', 
                                            duration: 0.4,
                                            ease: [0.3, 0.1, 0.1, 1]
                                            }}
                                        >
                                        <img src={imagePreview} alt="Upload Prescription" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '8px', backgroundColor: '#f4f4f4' }} />
                                        <input
                                            type="file"
                                            id="medicineImage"
                                            name="medicineImage"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            style={{ display: 'none' }}
                                        />
                                    </motion.label>
                                </div>
                        </Form.Group><br/>
                        <Form.Group controlId="formQuantity">
                            <Form.Control className='cookie-para' type="number" placeholder='Quantity' onChange={(e) => setReqrQty(e.target.value)} />
                        </Form.Group>
                        <div style={{textAlign: 'center', marginTop: '5%'}}>
                            <Button variant="primary" type='submit'>Request</Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>

            <Modal className="custom-modal" show={detailsPopup} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title style={{fontWeight: '600'}}>Medicine Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="cookie-para">Generic Name: <b>{props.title}</b></p>
                    <p className="cookie-para">Common Name: <b>{props.commonName}</b></p>
                    <p className="cookie-para">Quantity: <b>{props.qty}</b></p>
                    <p className="cookie-para">Location: <b>{location}</b></p>
                    <p className="cookie-para">Company: <b>{props.company}</b></p>
                    <p className="cookie-para">Common Diseases: <b>{props.disease}</b></p>
                </Modal.Body>
            </Modal>

            
    

        </div>
    );

}