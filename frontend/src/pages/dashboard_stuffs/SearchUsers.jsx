import { Box, Divider, InputAdornment, Modal, TextField, Typography } from "@mui/material";
import { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';


const SearchUsers = ({open, setOpen}) => {
    const HandleClose=()=>{
        setOpen(!open);
    }
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (event) => {
        setSearchQuery();
        console.log(event.target.value);
    };

    return ( 
    <Modal
        open={open}
        onClose={HandleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        disableScrollLock={true}
        >
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
            <Typography id="modal-title" variant="h6" component="h2">
                Search Users
            </Typography>
            <Divider sx={{backgroundColor: '#E0E0E0'}}/>
            <TextField
                label="Search"
                variant="outlined"
                fullWidth
                value={searchQuery}
                onChange={handleSearchChange}
                InputProps={{
                    startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                    ),
                }}
                sx={{ m: 2 }}
            />
        </Box>
    </Modal> );
}
 
export default SearchUsers;