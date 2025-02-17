const supabase = require('../config/supabase'); // Ensure correct path

const donateMedicine = async (req, res) => {
    try {
        const { medicineName, genericName, companyName, diseaseName, quantity, expiryDate, latitude, longitude, donorId } = req.body;
        const medicineImage = req.file;

        if (!medicineImage) {
            return res.status(400).json({ success: false, message: 'No image file received' });
        }

        console.log("Received file: ", medicineImage);

        const fileName = `medicines/${Date.now()}_${medicineImage.originalname}`;
        const { data, error } = await supabase.storage
            .from('med_image') // Your bucket name
            .upload(fileName, medicineImage.buffer, {
                contentType: medicineImage.mimetype,
                cacheControl: '3600',
                upsert: false,
            });

        if (error) {
            console.error('Error uploading image:', error.message);
            return res.status(400).json({ success: false, message: 'Image upload failed' });
        }

        const imageUrl = supabase.storage.from('med_image').getPublicUrl(fileName).data.publicUrl;

        // Insert into database
        const { data: insertData, error: insertError } = await supabase
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
                    med_image: imageUrl,
                    status: 'Available',
                    donor_id: donorId,
                },
            ]);

        if (insertError) {
            console.error('Error inserting data:', insertError.message);
            return res.status(400).json({ success: false, message: 'There was an issue submitting the data.' });
        }

        console.log('Data inserted successfully:', insertData);
        return res.status(200).json({ success: true, message: 'Donation submitted successfully!' });

    } catch (err) {
        console.error('Unexpected error:', err);
        return res.status(500).json({ success: false, message: 'An unexpected error occurred.' });
    }
};

module.exports = { donateMedicine };