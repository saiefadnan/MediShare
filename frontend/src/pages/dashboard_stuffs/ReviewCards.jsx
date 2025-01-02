import Typography from '@mui/material/Typography';
import { Card } from '@mui/material';

const ReviewCards = () => {
    return ( 
        <div style={{
            display: 'flex', 
            width: '82.5%',  
            minWidth: '1200px',
            margin: '10px auto',
            borderRadius: '8px',
            border: "1px solid rgba(255, 255, 255, 0.3)", 
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)", 
            color: "#333",
            justifyContent: 'space-evenly'}}>
            <Card sx={{ padding: '20px', backgroundColor: ' #FFE2E5', height: '120px', width: '280px', margin: '50px auto'}}>
                <Typography variant="h6">Total Users</Typography>
                <Typography variant="h4">15,200</Typography>
            </Card>
            <Card sx={{ padding: '20px', backgroundColor: ' #FFF4DE', height: '120px', width: '280px', margin: '50px auto'}}>
                <Typography variant="h6">Total Reviews</Typography>
                <Typography variant="h4">35,000</Typography>
            </Card>
            <Card sx={{ padding: '20px', backgroundColor: ' #DCFCE7', height: '120px', width: '280px', margin: '50px auto'}}>
                <Typography variant="h6">Overall Rating</Typography>
                <Typography variant="h4">4.8 ⭐</Typography>
            </Card>
            <Card sx={{ padding: '20px', backgroundColor: ' #F3E8FF', height: '120px', width: '280px', margin: '50px auto'}}>
                <Typography variant="h6">Overall Review</Typography>
                <Typography variant="h4">Mostly Positive</Typography>
            </Card>
        </div>
     );
}
 
export default ReviewCards;