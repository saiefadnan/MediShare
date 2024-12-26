import '../styles/style.css';

const Donation = () => {
    return (
        <div className="donation-page">
            <div className="donation-container">
                <div className="donation-header">
                    <h1>Your One Step Can Make a Difference</h1>
                </div>
                <div className="donation-form-container bordered">
                    <form className="donation-form">
                        <label>
                            Medicine Name
                            <input type="text" placeholder="EX: Napa" className="donation-input" />
                        </label>
                        <label>
                            Generic Name
                            <input type="text" placeholder="EX: Paracetamol" className="donation-input" />
                        </label>
                        <label>
                            Quantity
                            <input type="number" placeholder="EX: 10" className="donation-input" />
                        </label>
                        <label>
                            Expiry Date
                            <input type="date" className="donation-input" />
                        </label>
                        <label>
                            Add Your Location from Map
                            <div className="map-placeholder">
                                <p>Map will go here</p>
                            </div>
                        </label>
                        <label>
                            Add Picture of Your Medicine
                            <input type="file" className="donation-input-file" />
                            <small>Expiry date must be visible</small>
                        </label>
                        <label className="checkbox-container">
                            <input type="checkbox" />
                            <span>All the information I provided is true.</span>
                        </label>
                        <button type="submit" className="donation-button">Confirm</button>
                    </form>
                </div>
            </div>
            <div className="right-panel">
                <h2>About Donations</h2>
                <p>Help those in need by donating your unused medicines.</p>
                <p>
                    Ensure medicines are not expired and well-packaged for safety.
                </p>
                <blockquote>
                    <p>"Small acts, when multiplied by millions of people, can transform the world."</p>
                    <footer>- Howard Zinn</footer>
                </blockquote>
            </div>
        </div>
    );
};

export default Donation;
