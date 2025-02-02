const supabase=require('../config/supabase');
const multer=require('multer');
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

const request=async(req,res)=>{
    const {requester_id,med_id,donor_id,reason,quantity}=req.body;
    const file=req.file;
    
  
   
   

    try {
        const fileName = sanitizeFilename(file.originalname);
        const filePath = `prescription/${fileName}`;
        
        console.log("file buffer",filePath);
        const {data:UploadData,error:err}=await supabase.storage.from('prescription_bucket').upload(filePath,file.buffer,{
            contentType:file.mimetype,
            upsert:true,
        });
        
        if(err){
            console.error("here:",err);
            
            res.status(500).json({error:"Invalid Information"});
            return;

        }
        
        const fileUrl= supabase.storage.from('prescription_bucket').getPublicUrl(filePath).data.publicUrl;
        console.log(fileUrl);    
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
            res.status(400).json({error:"Invalid Information"});
            return;
        }

        res.status(200).json({message:"Request Submitted Successfully"});
        
    } catch (error) {
        console.error(error);
        
    }
}

module.exports={
    search,
    request,
    filterSearch
}