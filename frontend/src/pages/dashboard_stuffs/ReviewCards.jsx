import Typography from '@mui/material/Typography';
import { Card } from '@mui/material';
import star from './Icons/star.png'
import ranking from './Icons/ranking.png'
import users from './Icons/users.png'
import result from './Icons/result.png'
import useFetch from '../../hooks/useFetch';

const ReviewCards = () => {
    const {data, isPending, error} = useFetch('http://localhost:5000/api/admin/reviewcards');
    console.log(data);
    return ( 
        <div style={{
            display: 'flex', 
            flexWrap:'wrap', 
            width: '92.5%',  
            //minWidth: '1200px',
            margin: '10px auto',
            padding: '20px',
            borderRadius: '8px',
        }}>
            <Card sx={{ padding: '20px', backgroundColor: ' #FFE2E5', height: '120px', width: '280px', margin: '20px auto'}}>
                <Typography variant="h6">
                    <img src={users} style={{padding: '0px 10px 0px 0px'}}></img>
                    Total Users</Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{data?.total_users}</Typography>
            </Card>
            <Card sx={{ padding: '20px', backgroundColor: ' #FFF4DE', height: '120px', width: '280px', margin: '20px auto'}}>
                <Typography variant="h6">
                    <img src={ranking} style={{padding: '0px 10px 0px 0px'}}></img>
                    Total Reviews
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{data?.total_reviews}</Typography>
            </Card>
            <Card sx={{ padding: '20px', backgroundColor: ' #DCFCE7', height: '120px', width: '280px', margin: '20px auto'}}>
                <Typography variant="h6">
                    <img src={star} style={{padding: '0px 10px 0px 0px'}}></img>
                    Overall Rating
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{data?.avg_rating} ⭐</Typography>
            </Card>
            <Card sx={{ padding: '20px', backgroundColor: ' #F3E8FF', height: '120px', width: '280px', margin: '20px auto'}}>
                <Typography variant="h6">
                <img src={result} style={{padding: '0px 10px 0px 0px'}}></img>
                    Overall Review
                </Typography>
                {data?.avg_rating>=3?<Typography variant="h5" sx={{ fontWeight: 'bold' }}>Mostly Positive</Typography>
                :<Typography variant="h5" sx={{ fontWeight: 'bold' }}>Mostly Negative</Typography>}
            </Card>
        </div>
     );
}
 
export default ReviewCards;