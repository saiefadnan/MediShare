import Typography from '@mui/material/Typography';
import { Box, Card } from '@mui/material';
import heart from '../dashboard_stuffs/Icons/heart.png'
import history from '../dashboard_stuffs/Icons/history.png'
import saving from '../dashboard_stuffs/Icons/saving.png'
import time from '../dashboard_stuffs/Icons/time.png'

const Cards = () => {
    return ( 
        <Box sx={{ 
            display: 'flex', 
            flexWrap: 'wrap',
            width: '92.5%',  
            // minWidth: '1200px',
            margin: '10px auto',
            padding: '20px',
            borderRadius:'8px',
            // border: "1px solid rgba(255, 255, 255, 0.3)", 
            // boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            // backdropFilter: "blur(10px)",
            // WebkitBackdropFilter: "blur(10px)", 
            // color: "#333"
        }}>
            <Card sx={{ padding: '20px', backgroundColor: ' #FFE2E5', height: '130px', width: '280px', margin: '20px auto'}}>
                <Typography variant="h6">
                    <img src={heart} style={{padding: '0px 10px 0px 0px'}}></img>
                    Stocked Meds</Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Total 12,200</Typography>
            </Card>
            <Card sx={{ padding: '20px', backgroundColor: ' #FFF4DE', height: '130px', width: '280px', margin: '20px auto'}}>
                <Typography variant="h6">
                    <img src={time} style={{padding: '0px 10px 0px 0px'}}></img>
                    Expired Meds</Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold', }}>Total 12,200</Typography>
            </Card>
            <Card sx={{ padding: '20px', backgroundColor: ' #DCFCE7', height: '130px', width: '280px', margin: '20px auto'}}>
                <Typography variant="h6">
                <img src={saving} style={{padding: '0px 10px 0px 0px'}}></img>
                Success Rate</Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>60%</Typography>
            </Card>
            <Card sx={{ padding: '20px', backgroundColor: ' #F3E8FF', height: '130px', width: '280px', margin: '20px auto'}}>
                <Typography variant="h6">
                <img src={history} style={{padding: '0px 10px 0px 0px'}}></img>
                    Popularity</Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>43%</Typography>
            </Card>
        </Box>
     );
}
 
export default Cards;