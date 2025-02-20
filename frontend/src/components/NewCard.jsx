<img src={props.imgSrc} alt="img" />

            <div className='card-details'>
                <h2 className='card-title'>{props.title}</h2>
                <p className='quantity'>Qty:{props.qty}</p>
                <p className='exp-date'>Exp Date:{props.expiryDate}</p>
            </div>
            <div className='card-btns'>
                <button onClick={handleRequest}>Request</button>
                <button onClick={handleDetails}>Details</button>
            </div>