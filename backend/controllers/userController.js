const bcrypt = require('bcrypt');
const supabase = require('../config/supabase.js');

const signup = async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const { data, error } = await supabase
            .from('userInfo')
            .insert([{ username, email, password: hashedPassword }]);

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