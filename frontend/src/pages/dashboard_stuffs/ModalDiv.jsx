import { Box, Button, Modal, Typography } from "@mui/material";

const ModalDiv = ({open, setOpen}) => {
    const HandleClose=()=>{
        setOpen(!open);
    }
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
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                borderRadius: 1,
            }}>
            <Typography id="modal-title" variant="h6" component="h2">
                User's Info
            </Typography>
            <Typography id="modal-description" sx={{ mt: 2 }}>
                Name:
                <br/>Status: 
                <br/>ID:
                <br/>Review:
            </Typography>
            <Button variant="contained" color='primary' onClick={HandleClose} sx={{ mt: 2 }}>
                Close
            </Button>
        </Box>
    </Modal> );
}
 
export default ModalDiv;