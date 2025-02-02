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

  const queryUsers = async(req, res)=>{
    try {
        const {q} = req.body;
        console.log(req.body);
        const { data, error } = await supabase
        .from("userInfo")
        .select("email")
        .ilike("email", `%${q}%`);

        if(error) return res.status(400).json({ error: error.message });
        console.log(data);
        res.status(200).json(data);
    }catch (err) {
        res.status(500).json({ error: 'Something went wrong!' });
    }
  }

  const userDetails = async(req, res)=>{
    try{
        const {email} = req.body;
        const { data, error } = await supabase
        .from("userInfo")
        .select("email, username, role, status")
        .eq("email", email);

        if(error) return res.status(400).json({ error: error.message });
        if(data.length===0) return null;
        const [userInfo] = data;
        console.log(userInfo,'done');
        res.status(200).json(userInfo);

    }catch(err){
        res.status(500).json({ error: 'Something went wrong!' });
    }
  }

  const storeUserinfo = async(req, res)=>{
    try{
        const {email, username, status, role} = req.body;
        // console.log(req.body);
        const { data, error } = await supabase
        .from("userInfo")
        .update({username, status, role})
        .eq("email", email);

        if(error) return res.status(400).json({ error: error.message });
        res.status(200).json({msg: "success"});
    }catch(err){
        res.status(500).json({ error: 'Something went wrong!' });
    }
  }

  const queryAdmins = async(req, res)=>{
    try{
        const { data, error } = await supabase
        .from("userInfo")
        .select("username, role, image_url")
        .neq("role", "user");

        //console.log(data);
        if(error) return res.status(400).json({ error: error.message });
        res.status(200).json(data);
    }catch(err){
        res.status(500).json({ error: 'Something went wrong!' });
    }
  }

  const uploadImage = async(req, res)=>{
    try{
        const file = req.file;
        console.log(req.body);
        if (!file) return res.status(400).json({ error: "No file uploaded" });

        const fileExt = file.originalname.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`; 
        const filePath = `profile-pictures/${fileName}`; 

        // console.log(filePath);
        const { data, error } = await supabase.storage
        .from("profile-pictures") // Storage bucket name
        .upload(filePath, file.buffer, { contentType: file.mimetype });

        if (error) throw error;
    
        const { data: publicUrlData } = supabase.storage
        .from("profile-pictures")
        .getPublicUrl(filePath);

        const imageUrl = publicUrlData.publicUrl;
        const { data: userData, error: dbError } = await supabase
        .from("userInfo")
        .update({ image_url: imageUrl })
        .eq("email", req.body.email);

        if (error) throw dbError;

        res.status(200).json({ message: "Upload successful", imageUrl });

    }catch(err){
        res.status(500).json({ error: 'Something went wrong!' });
    }
  }

  const fetchImage = async(req, res)=>{
    try{
        const { id }=req.body;
        const { data, error } = await supabase
        .from("userInfo")
        .select("image_url")
        .eq("id", id);
        const [image] = data;
        if(error) return res.status(400).json({ error: error.message });
        res.status(200).json(image);
    }catch(err){
        res.status(500).json({ error: 'Something went wrong!' });
    }
  }
  const freqChart = async(req, res)=>{
    try{
        const { year }=req.body;
        console.log(year);

        const { data, error } = await supabase.rpc('get_freq_chartdata',{input_year: year})
        console.log(data);
        if(error) return res.status(400).json({ error: error.message });
        res.status(200).json(data);
    }catch(err){
        res.status(500).json({ error: 'Something went wrong!' });
    }
  }

  const pieChart = async(req,res)=>{
    try{
        const { year }=req.body;
        console.log(year);

        const { data, error } = await supabase.rpc('get_piedata',{input_year: year})
        console.log(data);
        const [piedata] = data;
        if(error) return res.status(400).json({ error: error.message });
        res.status(200).json(piedata);
    }catch(err){
        res.status(500).json({ error: 'Something went wrong!' });
    }
  }

module.exports ={
    userRating,
    ratingChart,
    queryUsers,
    userDetails,
    storeUserinfo,
    queryAdmins,
    uploadImage,
    fetchImage,
    freqChart,
    pieChart
}