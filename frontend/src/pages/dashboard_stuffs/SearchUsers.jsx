import { Autocomplete, Box, Button, Divider, IconButton, InputAdornment, Modal, TextField, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import axios from "axios";
import debounce from 'lodash.debounce'
import toast, { Toaster } from 'react-hot-toast';
import SearchIcon from '@mui/icons-material/Search';


const SearchUsers = ({open, setOpen,}) => {
    const [options, setOptions] = useState([]); // Dynamic suggestions
    const [query, setQuery] = useState(''); // User input
    const [results, setResults] = useState({
        email: '',
        username: '',
        role: '',
        status: ''
    });
    
    const HandleClose=()=>{
        setOpen(!open);
    }
    const handleSearch = async(e)=>{
        if(e.key==='Enter'){
            try{
                const response = await axios.post('http://localhost:5000/api/admin/userinfo', { email: query });
                setResults(response.data);
            }catch(err){
                console.error('Error fetching suggestions:', err);
            }
        }
    }
    const handleSave = async()=>{
        try{
            if(!query || !results.email ) return null;
            const response = await axios.post('http://localhost:5000/api/admin/save-userinfo', 
            { 
                email: results.email,
                username: results.username, 
                status:results.status,
                role: results.role
            });
            console.log(response.data.msg);
            if(response.data.msg==="success")toast.success("Info updated!");
        }catch(err){
            console.error('Error fetching suggestions:', err);
        }
    }
    const handleInputChange = useCallback(
    debounce(async(event, value) => {
        setQuery(value);
        if (value.length > 1){
            try {
                const response = await axios.post('http://localhost:5000/api/admin/query-users', { q: value });
                console.log(response.data);
                setOptions(response.data); 
            }catch (error) {
                console.error('Error fetching suggestions:', error);
            }
        }else setOptions([]);
      },100),[]
    );
    
    return ( 
    <Modal
        open={open}
        onClose={HandleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        disableScrollLock={true}>

            
        <Box
            sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%,-50%)',
                width: 400,
                height: 400,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                borderRadius: 1,
            }}>
            <Toaster/>
            <Typography id="modal-title" variant="h6" component="h2">Edit Role</Typography>
            <Divider sx={{backgroundColor: '#E0E0E0'}}/>
            <Autocomplete
            freeSolo
            options={options.map((option) => option.email)}
            inputValue={query}
            onInputChange={handleInputChange}
            clearIcon={null}
            renderInput={(params) => (
                <TextField
                {...params}
                label="Search email"
                variant="outlined"
                fullWidth
                sx={{ m: 2 }}
                onKeyDown={handleSearch}
                />
            )}/>
            <Box>
                <TextField
                label="Name"
                value={results?.username}
                onChange={(e)=>{
                    setResults(prev=>({
                        ...prev,
                        username: e.target.value
                    }))}
                }
                variant="standard"
                size="small"
                fullWidth 
                sx={{mb: 2}}/>
                <TextField
                label="Status"
                value={results?.status}
                onChange={(e)=>{
                    setResults(prev=>({
                        ...prev,
                        status: e.target.value
                    }))}
                }
                variant="standard"
                size="small"
                fullWidth 
                sx={{mb: 2}}/>
                    <TextField
                label="Role"
                value={results?.role}
                onChange={(e)=>{
                    setResults(prev=>({
                        ...prev,
                        role: e.target.value
                    }))}
                }
                variant="standard"
                size="small"
                fullWidth 
                sx={{mb: 2}}/>
            </Box>
            <Button onClick={handleSave} color="black" sx={{font: "outfit", backgroundColor: 'orange',position: 'absolute', right: 35}}>Save</Button>
        </Box>
    </Modal> );
}
 
export default SearchUsers;