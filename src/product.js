import { useState } from 'react';
import './product.css';
import Popup from 'reactjs-popup';
import Images from './images';
import axios from 'axios';

const Product = (props) => {
    const [tempName, setTempName] = useState('');
    const [tempEmail, setTempEmail] = useState('');
    const [tempCard, setTempCard] = useState('')
    const [tempAddr, setTempAddr] = useState('');
    const [tempQuantity , setTempQuantity] = useState('');

    const OrderProduct = () => {
        if (tempName !== '' && tempEmail !== '' && tempAddr !== '' && tempQuantity !== ''){
            const orderToAdd = {
                "product": props.itemName,
                "price": props.price,
                "img": props.img,
                "name": tempName,
                "email": tempEmail,
                "card": tempCard,
                "addr": tempAddr,
                "quantity": Number(tempQuantity, 0)
            };
            axios.post("https://sales-app-back-end.onrender.com/add-order/", orderToAdd);
            setTempName('');
            setTempEmail('');
            setTempAddr('');
            setTempQuantity('');
            alert("Hello " + tempName + ". You have successfully ordered " + tempQuantity + " " + props.product + "(s)");
        }
        else{
            alert("You did not fill out all the fields correcty - Please try again!");
        }
    }

    const NameF = (event) => {
        setTempName(event.target.value);
    };
    const EmailF = (event) => {
        setTempEmail(event.target.value);
    };
    const CardF = (event) => {
        setTempCard(event.target.value);
    }
    const AddrF = (event) => {
        setTempAddr(event.target.value);
    };
    const QuantityF = (event) => {
        setTempQuantity(event.target.value);
    };

    return(
        <div className='product'>
            <img className="product-img" src={Images[props.img]} alt={props.itemName}/>
            <h2 className='title'>{props.itemName}</h2>
            <h3 className='price'>{props.price}</h3>

            
            <Popup trigger=
                {<button className="order-btn">Order</button>}
                modal nested>
                {
                    close => (
                        <div className='popup'>
                            <div>
                                <img className="product-img popup-img" src={Images[props.img]} alt={props.itemName}/>
                            </div>
                            <div className='text-fields'>
                                <input type="text" className='text-field' onChange={NameF} value={tempName} placeholder='Name'/>
                                <br />
                                <input type="email" className='text-field' onChange={EmailF} value={tempEmail} placeholder='Email'/>
                                <br />
                                <input type="tel" className='text-field' onChange={CardF} value={tempCard} placeholder='Credit/Debit Card'/>
                                <br />
                                <input type="text" className='text-field' onChange={AddrF} value={tempAddr} placeholder='Address'/>
                                <br />
                                <input type="number" className='text-field' onChange={QuantityF} value={tempQuantity} placeholder='Quantity (Whole Number Please)'/>
                            </div>
                            <button className="order-btn popup-btn" onClick={() => { close(); OrderProduct();}}>Order</button>
                        </div>
                    )
                }
            </Popup>


        </div>
    );
}

export default Product;