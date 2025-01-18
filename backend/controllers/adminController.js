const supabase = require('../config/supabase.js');

const userRating = async (req, res) => {
    try {
        const { data, error } = await supabase
          .from('userRating') 
          .select('*'); 
    
        if (error) {
          return res.status(400).json({ error: error.message });
        }
    
        res.status(200).json(data);
    }catch (err) {
        res.status(500).json({ error: 'Something went wrong!' });
    }
  }

module.exports ={
    userRating
}