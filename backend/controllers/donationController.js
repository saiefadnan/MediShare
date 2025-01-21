const supabase = require('../config/supabase.js');

const donateMedicine = async (req, res) => {
    try {
        const { medicineName, genericName,companyName,diseaseName, quantity, expiryDate, latitude, longitude, medicineImage } = req.body;
    
        const { data, error } = await supabase
        .from('medicine')
        .insert([
            {
            common_name: medicineName,
            generic_name: genericName,
            company: companyName,
            disease: diseaseName,
            quantity: parseInt(quantity, 10),
            expiry_date: expiryDate,
            locx: latitude,
            locy: longitude,
            med_image: medicineImage ? medicineImage.name : null,
            },
        ]);
    
        if (error) {
        console.error('Error inserting data:', error.message);
        res.status(400).json({ success: false, message: 'There was an issue submitting the data.' });
        } else {
        console.log('Data inserted successfully:', data);
        res.status(200).json({ success: true, message: 'Donation submitted successfully!' });
        }
    } catch (err) {
        console.error('Unexpected error:', err);
        res.status(500).json({ success: false, message: 'An unexpected error occurred.' 
            console.log('Your message here');

        });
    }
};

module.exports = { donateMedicine };