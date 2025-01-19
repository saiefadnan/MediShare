const supabase = require('../config/supabase.js');

const userRating = async (req, res) => {
    try {
        const {year} = req.body;
        console.log(year);
        const { data, error } = await supabase.rpc('get_rating_count',{input_year: year})
        if(error) return res.status(400).json({ error: error.message });
        res.status(200).json(data);
    }catch (err) {
        res.status(500).json({ error: 'Something went wrong!' });
    }
  }
  
  const ratingChart = async (req, res) => {
    try {
        const {year} = req.body;
        console.log(year);
        const { data, error } = await supabase.rpc('get_rating_chart',{input_year: year})
        if(error) return res.status(400).json({ error: error.message });
        console.log(data);
        res.status(200).json(data);
    }catch (err) {
        res.status(500).json({ error: 'Something went wrong!' });
    }
  }

module.exports ={
    userRating,
    ratingChart
}