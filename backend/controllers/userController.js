const bcrypt = require('bcrypt');
const supabase = require('../config/supabase.js');

const generatePassword = () => {
    const length = 10;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
}

const signup = async (req, res) => {
    const { username, email, gateway, image_url } = req.body;
    var password = req.body.password;
    const user = await supabase
        .from('userInfo')
        .select('*')
        .eq('email', email)
        .single();

    if (user.data) {
        if (gateway === 'google') {
            return res.status(200).json({ success: true, message: "Login successful", user: user.data });
        }
        return res.status(400).json({ success: false, message: "User already exists with this email" });
    }

    if(password==null){
        password=generatePassword();
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const { data, error } = await supabase
            .from('userInfo')
            .insert([{ username, email, password: hashedPassword, image_url }])
            .select('*')
            .single();
        console.log(data);

        if (error) throw error;
        res.status(201).json({ success: true, message: "User registered successfully", user: data });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const { data, error } = await supabase
            .from('userInfo')
            .select('*')
            .eq('email', email)
            .single();

        if (error) throw error;

        const isValidPassword = await bcrypt.compare(password, data.password);
        if (isValidPassword) {
            res.status(200).json({ success: true, message: "Login successful", user: data });
        } else {
            res.status(401).json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

const test = async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('userInfo')
        .select('*')
  
      if (error) throw error
      console.log(data)
      res.json({ success: true, data })
      
    } catch (error) {
      res.status(500).json({ success: false, error: error.message })
    }
  }

module.exports ={
    signup,
    login,
    test
}