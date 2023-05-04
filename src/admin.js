import './admin.css';
import { useState, useEffect } from 'react';
import Order from './order';
import axios from 'axios';

const Admin = () => {
    const [orders, setOrders] = useState([]);
    const [loggedIn, setLoggedIn] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const LoadOrders = () => {
        fetch('/orders/')
            .then(json => json.json())
            .then(data => {
                setOrders(data)
            })
        axios.post("/admin-login", {usrn: username, pass: password})
        .then(res => res.data)
        .then(data => {
            if (data === "GOOD"){
                setLoggedIn(true);
            }
            else if (data === "BAD"){
                setLoggedIn(false);
            }
        });
    }

    useEffect(() => {
        LoadOrders();
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const UserF = (event) => {
        setUsername(event.target.value);
    }
    const PasswordF = (event) => {
        setPassword(event.target.value);
    }

    const Login = () => {
        axios.post("/admin-login", {usrn: username, pass: password})
        .then(res => res.data)
        .then(data => {
            if (data === "GOOD"){
                setLoggedIn(true);
            }
            else if (data === "BAD"){
                setLoggedIn(false);
                alert("Wrong Username or Password!");
            }
        });
        setUsername('');
        setPassword('');
    }

    const renderContent = () => {
        if (loggedIn === true){
            if (orders.length > 0){
                return (
                    orders.map((order, i) =>
                        <Order key={i} orderId={order.orderId} product={order.product} price={order.price} img={order.img} name={order.name} email={order.email} addr={order.addr} quantity={order.quantity} />
                    )
                );
            }
            else if (orders.length <= 0){
                return <h1 className='no-orders'>No Orders</h1>
            }
        }
        else if (loggedIn === false){
            return(
                <div className='login-form'>
                    <h1 className='login-text'>Login:</h1>
                    <input type="text" className='form-fields' onChange={UserF} value={username} placeholder='Username'/>
                    <br />
                    <input type="password" className='form-fields' onChange={PasswordF} value={password} placeholder='Password'/>
                    <br />
                    <button className="login-btn" onClick={Login}>Login</button>
                </div>
            );
        }
    }

    return (
        <div className='admin'>
            {renderContent()}
        </div>
    );
}

export default Admin;