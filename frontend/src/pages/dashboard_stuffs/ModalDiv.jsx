import { Avatar, Box, Button, Checkbox, Divider, FormControl, FormControlLabel, FormGroup, Modal, Radio, RadioGroup, Rating, TextField, Typography } from "@mui/material";
import avatar1 from './Icons/image.png'
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";

const ModalDiv = ({Open,Id,Status,Name}) => {
    const [open, setOpen]=Open;
    const [id,setId]=Id;
    const [status, setStatus]= Status;
    const [name, setName] = Name;
    const HandleClose=()=>{
        setOpen(!open);
    }
    const [rating, setRating] = useState(0);
    const {data, isPending, error} = useFetch('http://localhost:5000/api/admin/fetch-rating',{user_id: id});

    useEffect(()=>{
        console.log(data);
        data?.rating?setRating(data.rating):setRating(0);
    },[data])
    console.log(data);
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
                position: 'fixed',
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
                    <FormControlLabel value="active" control={<Radio />} label="Regular" />
                    <FormControlLabel value="restricted" control={<Radio />} label="Limited" />
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