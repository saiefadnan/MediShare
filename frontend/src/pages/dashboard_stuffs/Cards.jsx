import Typography from '@mui/material/Typography';
import { Box, Card } from '@mui/material';
import heart from '../dashboard_stuffs/Icons/heart.png'
import history from '../dashboard_stuffs/Icons/history.png'
import saving from '../dashboard_stuffs/Icons/saving.png'
import time from '../dashboard_stuffs/Icons/time.png'
import useFetch from '../../hooks/useFetch';

const Cards = () => {
    const {data, isPending, error} = useFetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/dashcards`);
    console.log(data);
    return ( 
        <Box sx={{ 
            display: 'flex', 
            flexWrap: 'wrap',
            width: '92.5%',  
            margin: '10px auto',
            padding: '20px',
            borderRadius:'8px',
        }}>
            <Card sx={{ padding: '20px', backgroundColor: ' #FFE2E5', height: '130px', width: '280px', margin: '20px auto'}}>
                <Typography variant="h6">
                    <img src={heart} style={{padding: '0px 10px 0px 0px'}}></img>
                    Stocked Meds</Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Total {data?.stocked_meds}</Typography>
                {!error && isPending && <Typography>Loading...</Typography>}
                {error && <Typography color="error">Error: {error}</Typography>}
            </Card>
            <Card sx={{ padding: '20px', backgroundColor: ' #FFF4DE', height: '130px', width: '280px', margin: '20px auto'}}>
                <Typography variant="h6">
                    <img src={time} style={{padding: '0px 10px 0px 0px'}}></img>
                    Expired Meds</Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold', }}>Total {data?.expired_meds}</Typography>
                {!error && isPending && <Typography>Loading...</Typography>}
                {error && <Typography color="error">Error: {error}</Typography>}
            </Card>
            {/* <Card sx={{ padding: '20px', backgroundColor: ' #DCFCE7', height: '130px', width: '280px', margin: '20px auto'}}>
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
            </Card> */}
        </Box>
     );
}
 
export default Cards;