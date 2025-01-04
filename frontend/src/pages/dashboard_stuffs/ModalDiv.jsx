import { Avatar, Box, Button, Checkbox, Divider, FormControl, FormControlLabel, FormGroup, Modal, Radio, RadioGroup, Rating, TextField, Typography } from "@mui/material";
import avatar1 from './Icons/image.png'
import { useState } from "react";

const ModalDiv = ({open, setOpen}) => {
    const HandleClose=()=>{
        setOpen(!open);
    }
    const [name, setName] = useState("User_01");
    const [status, setStatus] = useState("Limited");
    const [id, setId] = useState("202214091");
    const [rating, setRating] = useState(4);

    return ( 
    <Modal
        open={open}
        onClose={HandleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description">
        <Box
            sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%,-50%)',
                width: 400,
                height: 510,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                borderRadius: 1,
            }}>
            <Typography id="modal-title" variant="h6" component="h2">
                User's Info
            </Typography>
            <Divider sx={{backgroundColor: '#E0E0E0'}}/>
            <FormControl component="fieldset" sx={{width: '100%',}}>
                <Avatar src={avatar1} 
                sx={{
                    height: '100px',
                    width: '100px',
                    margin: '10px auto'}}/>
                <TextField
                    label="Name"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    variant="standard"
                    size="small"
                    fullWidth 
                    sx={{mb: 2}}/>
                <TextField
                    label="ID"
                    value={id}
                    onChange={(e)=>setId(e.target.value)}
                    variant="standard"
                    size="small"
                    fullWidth
                    sx={{mb: 2}}/>
                <Typography component="legend">Status</Typography>
                <RadioGroup
                value={status}
                onChange={(e)=>setStatus(e.target.value)}
                row>
                    <FormControlLabel value="Regular" control={<Radio />} label="Regular" />
                    <FormControlLabel value="Limited" control={<Radio />} label="Limited" />
                </RadioGroup>
                <Typography component="legend">Rating</Typography>
                <Rating
                    name="simple-controlled"
                    value={rating}
                    onChange={(event, newValue) => {
                        setRating(newValue);
                    }}
                    sx={{mb: 2}}/>
                <Button variant="contained" color='primary' onClick={HandleClose} sx={{ mb: 2 ,alignSelf: 'end'}}>
                    Save
                </Button>
            </FormControl>
        </Box>
    </Modal> );
}
 
export default ModalDiv;