const supabase=require('../config/supabase');
const multer=require('multer');
const axios =require('axios') 
const path=require('path');
const upload=multer();

const sanitizeFilename = (filename) => {
    return filename.replace(/\s+/g, '_').replace(/[^\w\-._]+/g, '');
};
const search=async(req,res)=>{

    const {searchKey}=req.query;
    

    try {
        let query;

        if(!searchKey){
             query = supabase.from('medicine').select('*').order('created_at', { ascending: false });
        }else{
             query= supabase
            .from('medicine')
            .select('*')
            .or(`common_name.ilike.%${searchKey}%,generic_name.ilike.%${searchKey}%`)
            .ilike('status','available')
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
    const {location,searchKey,disease,company,expiry_date}=req.query;

    let query=supabase.from('medicine').select('*');

    if (location) {
        // Convert location name to coordinates using OpenStreetMap
        try {
            const geoResponse = await axios.get(`https://nominatim.openstreetmap.org/search`, {
                params: { q: location, format: "json", limit: 1, "accept-language": "en" },
            });

            if (geoResponse.data.length > 0) {
                const { lat, lon } = geoResponse.data[0];

                // Find medicines near this location (approximate)
                query = query
                    .lt("locx", parseFloat(lat) + 0.1) // Latitude upper bound
                    .gt("locx", parseFloat(lat) - 0.1) // Latitude lower bound
                    .lt("locy", parseFloat(lon) + 0.1) // Longitude upper bound
                    .gt("locy", parseFloat(lon) - 0.1); // Longitude lower bound
            }
        } catch (error) {
            console.error("Error fetching coordinates", error);
            return res.status(500).json({ error: "Failed to process location" });
        }
    }

    if(disease){
        query=query.ilike('disease',`%${disease}%`);
    }
    if(searchKey){
        query=query.or(`common_name.ilike.%${searchKey}%,generic_name.ilike.%${searchKey}%`);
    }
    if(company){
        query=query.ilike('company',`%${company}%`);
    }
    if(expiry_date){
        query=query.gte('expiry_date',expiry_date);
    }
    query=query.ilike('status','available').order('created_at', { ascending: false });

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

const request=async(req,res)=>{
    const {requester_id,med_id,donor_id,reason,quantity}=req.body;
    const file=req.file;
    if(requester_id==donor_id){
        return res.status(400).json({message:"You can't request your own meds!"});
    }
    
  
   try {
    const {data:userStatus,error:userError}=await supabase.from('userInfo').select('status').eq('id',requester_id);
    if(userError){
        console.error(userError);
        return res.status(500).json({message:"Internal Server Error"});
    }
    
    if(userStatus[0].status==='active'){
        try {
            const fileName = sanitizeFilename(file.originalname);
            const filePath = `prescription/${fileName}`;
            
            
            const {data:UploadData,error:err}=await supabase.storage.from('prescription_bucket').upload(filePath,file.buffer,{
                contentType:file.mimetype,
                upsert:true,
            });
            
            if(err){
                console.error("here:",err);
                
                res.status(500).json({message:"Invalid Information"});
                return;
    
            }
            
            const fileUrl= supabase.storage.from('prescription_bucket').getPublicUrl(filePath).data.publicUrl;
               
            const query=supabase
            .from('medicine_request')
            .insert([
                {
                    requester_id:requester_id,
                    med_id:med_id,
                    donor_id:donor_id,
                    prescription_image:fileUrl,
                    reason:reason,
                    quantity:quantity
                },
            ]); 
            const {data,error}=await query; 
    
            if(error){
                console.error(error);
                res.status(400).json({message:"Invalid Information"});
                return;
            }
    
            res.status(200).json({message:"Request Submitted Successfully"});
            
        } catch (error) {
            console.error(error);
            res.status(500).json({message:"Internal Server Error"});
            
        }
    }else{
        console.log("restricted by admin!");
         res.status(400).json({message:"You have been restricted by admin"});
    }
    
   } catch (error) {
        console.error(error);
        res.status(500).json({message:"Internal Server Error"});
   }
   

    
}


//location api

const getLocation= async (req, res) => {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
        return res.status(400).json({ error: "Latitude and Longitude are required" });
    }

    try {
       
        const response = await axios.get(`https://nominatim.openstreetmap.org/reverse`, {
            params: {
                lat,
                lon,
                format: 'json'
            },
            headers: {
                'Accept-Language': 'en'  // Forces response in English
            }
        });

        const locationName = response.data.display_name;
        res.json({ location: locationName });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch location" });
    }
};


module.exports={
    search,
    request,
    filterSearch,
    getLocation
}