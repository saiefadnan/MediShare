import '../styles/card.css';
export default function card(props){

    return(
        <div className="card-item">
            <img src={props.imgSrc} alt="img" />

            <div className='card-details'>
                <h2 className='card-title'>{props.title}</h2>
                <p className='quantity'>Qty:{props.qty}</p>
                <p className='exp-date'>Exp Date:{props.expiryDate}</p>
            </div>
            <div className='card-btns'>
                <button>Request</button>
                <button>Details</button>
            </div>



            





        </div>
    );

}