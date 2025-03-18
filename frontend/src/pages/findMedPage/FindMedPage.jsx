import './findMed.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Card from '../../components/Card.jsx';
import { useState, useEffect } from 'react';
import { useAuth } from '../../Contexts/AuthContext.jsx';
import { motion } from 'framer-motion';



const images = Object.values(import.meta.glob('./assets/img/*.{png,jpg,jpeg,svg}', { eager: true })).map((mod) => mod.default);

export default function FindMedPage() {

    const {user}=useAuth();
    const userId=user?.id;
    
    const rng = 15;

    const [filterButton, setFilterButton] = useState(false);

    const [count, setCount] = useState(1);

    const [data, setData] = useState([]);


    const [searchKey, setSearchKey] = useState('');
    const [medicines, setMedicines] = useState([]);
    const [suggesion, setSuggesion] = useState([]);
    const [suggesionOn, setSuggesionOn] = useState(false);

    const [loading, setLoading] = useState(true);
    //filter states

    const [location, setLocation] = useState('');
    const [disease, setDisease] = useState('');
    const [company, setCompany] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [locationSuggestions, setLocationSuggestions] = useState([]);

    const handlelocationChange =async (e) => {
        const input=e.target.value;
        setLocation(input);

        if(input.length>2){
            try {
                const response = await axios.get(
                    `https://nominatim.openstreetmap.org/search`,
                    {
                        params: { q: input, format: "json", limit: 5, "accept-language": "en" },
                    }
                );

                setLocationSuggestions(response.data.map((place)=>({
                    name:place.display_name,
                    lat:place.lat,
                    lon:place.lon

                })));
                
            } catch (error) {
                console.error("Error fetching location suggestions", error);
                
            }
        }else{
            setLocationSuggestions([]);
        }
    }

    const handleSelectLocation = (suggestion) => {
        setLocation(suggestion.name);
        setLocationSuggestions([]);
    };  




    useEffect(() => {

        fetchData(searchKey);


    }, [searchKey]);


  

    useEffect(() => {
        if (!searchKey) {
            setSuggesionOn([]);
            setSuggesionOn(false);
        }
        else {
            setSuggesion(data.slice(0, 6));

        }

    }, [data, searchKey]);

    useEffect(() => {
        // Fetch all medicines initially
        fetchAllMedicines();
    }, []);

    const fetchAllMedicines = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/searchMedicine`, { params: { searchKey: '' } });
            setData(response.data); // Store all medicines in data state
            setMedicines(response.data.slice(0, rng)); // Initially show some medicines
            setLoading(false);
        } catch (error) {
            console.error('Error fetching medicines:', error);
            setLoading(false);
        }
    };


    const fetchData = async (key) => {
        try {

            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/searchMedicine`, { params: { searchKey: key } });
            setData(response.data);
            setLoading(false);





        } catch (error) {
            console.error('Error fetching medicines:', error);
            setLoading(false);
        }
    };



    function handleSearch() {
        setMedicines(data.slice(0, rng));


    };

    function handleSearchChange(e) {

        setSearchKey(e.target.value);
        setSuggesionOn(true);


    };



    function loadMore() {


        setCount(count + 1);


    }

    function handleFilterButton() {
        setFilterButton(!filterButton);
    }

    useEffect(() => {

        let nxtRng = count * rng;
        if (nxtRng > data.length) {
            nxtRng = data.length;
        }

        setMedicines(data.slice(0, nxtRng));
    }, [count]);

    function disableSuggesion() {
        setTimeout(() => {
            setSuggesionOn(false);
        }, 1000);

    }

    function handleSuggestionClick(itm) {

        setSearchKey(itm.common_name);
        setCount(1);
        setMedicines(data.slice(0, rng));
        setSuggesion([]);
        setSuggesionOn(false);


    }


    async function handleFilter(e) {
        e.preventDefault();
        setFilterButton(false);
        let filters = {};
        if(searchKey) filters.searchKey = searchKey;
        if (location) filters.location = location;
        if (disease) filters.disease = disease;
        if (company) filters.company = company;
        if (expiryDate) filters.expiry_date = expiryDate;

        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/searchFilteredMedicine`, { params: filters });

            console.log(response.data);
            setMedicines(response.data);


        } catch (error) {
            console.error(error);
        }
        setLocation('');
        setDisease('');
        setCompany('');
        setExpiryDate('');


    }


    return (
        <motion.div id="full-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, ease: "easeInOut" }}>
            {loading ? (
                <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div className="wrapper">
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="shadow"></div>
                        <div className="shadow"></div>
                        <div className="shadow"></div>
                    </div>
                </div>
            ) : (
                <>
                    <div className="search-section">
                        <h1>
                            Find Your Med!
                        </h1>
                        <div className="search-container">
                            <input onBlur={disableSuggesion} type="text" value={searchKey} onChange={handleSearchChange} placeholder="Enter Medicine Name" />
                            <button onClick={handleSearch} className="search-icon">
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>
                            <div className={suggesionOn ? "suggesion active" : "suggesion inactive"}>
                                {suggesion.map((itm) => (
                                    <motion.h4
                                        key={itm.med_id}
                                        onClick={() => handleSuggestionClick(itm)}
                                        initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, ease: "easeInOut" }}
                                    >
                                        <span>Generic Name: {itm.generic_name}</span> <span>Common Name: {itm.common_name}</span>
                                    </motion.h4>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="filter-container">
                        <button onClick={handleFilterButton} className="dropdown-button">
                            Filter
                        </button>
                        <motion.div className={filterButton ? 'popup dropdown-active' : 'popup dropdown-inactive'} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                            <form className="filter-form" onSubmit={handleFilter}>
                                <input id='location' type="text" placeholder="Location" value={location} onChange={handlelocationChange} />
                                {locationSuggestions.length > 0 && (
                                    <ul className="suggestions">
                                        {locationSuggestions.map((suggestion, index) => (
                                            <li key={index} onClick={() => handleSelectLocation(suggestion)}>
                                                {suggestion.name}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                <input id='disease' type="text" placeholder="Disease" value={disease} onChange={(e) => setDisease(e.target.value)} />
                                <input id='company' type="text" placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} />
                                <label htmlFor="earliest-expiry-date">Earliest Expiry Date</label>
                                <input type="date" id='earliest-expiry-date' value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} placeholder="Earliest Expiry Date" />
                                <button type='submit'>Filter</button>
                            </form>
                        </motion.div>
                    </div>
                    <div className="card-section">
                        <div className="cards-container">
                            {medicines.length > 0 ? (
                                medicines.map((med, index) => (
                                    <motion.div key={med.med_id} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeInOut" }}>
                                        <Card
                                            userId={userId}
                                            medId={med.med_id}
                                            donorId={med.donor_id}
                                            imgSrc={med.med_image || images[index % images.length]} // Use modulo for cycling through images
                                            title={med.generic_name}
                                            commonName={med.common_name}    
                                            qty={med.quantity}
                                            expiryDate={med.expiry_date}
                                            company={med.company}
                                            disease={med.disease}
                                            locx={med.locx}
                                            locy={med.locy}
                                            gen={med.generic_name}
                                        />
                                    </motion.div>
                                ))
                            ) : (
                                <motion.h1 className="no-data" style={{ marginBottom: '50px' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, ease: "easeInOut" }}>
                                    No Medicine Found!
                                </motion.h1>
                            )}
                        </div><br/>
                        {medicines.length < data.length && (
                            <motion.button className="loadmore-btn" onClick={loadMore} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, ease: "easeInOut" }}>
                                Load More
                            </motion.button>
                        )}
                    </div>
                </>
            )}
        </motion.div>
    );
}
