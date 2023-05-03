import './order.css';
import Images from './images'
import axios from 'axios';

const Order = (props) => {
    const CompleteOrder = () => {
        console.log(props.orderId);
        axios.post("/rm-order", {theId: props.orderId});
        window.location.reload();
        alert(props.product + " order marked complete for " + props.name);
        
    }

    return (
        <div className='order'>
            <img src={Images[props.img]} alt={props.product}/>

            <div className='leftCol'>
                <h3>Product Info:</h3>
                <h4>Product Ordered: {props.product}</h4>
                <h4>Quantity: {props.quantity}</h4>
                <h4>Cost per Item: {props.price}</h4>
            </div>

            <div className='rightCol'>
                <h3><b>Contact Info:</b></h3>
                <h4>Name: {props.name}</h4>
                <h4>Email: {props.email}</h4>
                <h4>Address: {props.addr}</h4>
            </div>
            <button onClick={CompleteOrder} className="oc-btn">Order Completed</button>
        </div>
    );
}

export default Order;