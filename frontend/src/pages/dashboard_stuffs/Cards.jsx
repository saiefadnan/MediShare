import Typography from '@mui/material/Typography';
import { Card } from '@mui/material';

const Cards = () => {
    return ( 
        <div style={{display: 'flex', width: '100%'}}>
            <Card sx={{ padding: '2px', backgroundColor: ' #FFE2E5', height: '152px', width: '258px', margin: '50px auto'}}>
                <Typography variant="h6">Available Medicines</Typography>
                <Typography variant="h4">120</Typography>
            </Card>
            <Card sx={{ padding: '2px', backgroundColor: ' #FFF4DE', height: '152px', width: '258px', margin: '50px auto'}}>
                <Typography variant="h6">Expired Medicines</Typography>
                <Typography variant="h4">120</Typography>
            </Card>
            <Card sx={{ padding: '2px', backgroundColor: ' #DCFCE7', height: '152px', width: '258px', margin: '50px auto'}}>
                <Typography variant="h6">Overview Savings</Typography>
                <Typography variant="h4">120</Typography>
            </Card>
            <Card sx={{ padding: '2px', backgroundColor: ' #F3E8FF', height: '152px', width: '258px', margin: '50px auto'}}>
                <Typography variant="h6">History</Typography>
                <Typography variant="h4">120</Typography>
            </Card>
        </div>
     );
}
 
export default Cards;