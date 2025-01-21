const supabase=require('../config/supabase');


const search=async(req,res)=>{

    const {searchKey}=req.query;
    

    try {
        let query;

        if(!searchKey){
             query = supabase.from('medicine').select('*').order('created_at', { ascending: false });
        }else{
             query=supabase
            .from('medicine')
            .select('*')
            .or(`common_name.ilike.%${searchKey}%,generic_name.ilike.%${searchKey}%`)
            .order('created_at', { ascending: false });
        }
        
       
            
        const { data, error } = await query;
        
        
        if(error) {
            
            console.error(error);
            return res.status(400).json({ error: error.message });
            
          }
          
        res.status(200).json(data)
        
    } catch (err) {
       console.error(err);
        res.status(500).json(err);
    }

}

const filterSearch=async (req,res)=>{
    const {location,disease,company,expiry_date}=req.query;

    let query=supabase.from('medicine').select('*');

    if(location){
        query=query.ilike('location',`%${location}%`);
    }
    if(disease){
        query=query.ilike('disease',`%${disease}%`);
    }
    if(company){
        query=query.ilike('company',`%${company}%`);
    }
    if(expiry_date){
        query=query.gte('expiry_date',expiry_date);
    }

    try {
        const {data,error}=await query;
    if(error){
        console.error(error);
        return res.status(500).json({error:"error fetching data"});
    }

    res.status(200).json(data);
        
    } catch (err) {
        console.error(err);
        res.status(500).json({error:"internal server error"});
    }

    
}

module.exports={
    search,
    filterSearch
}