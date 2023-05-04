import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import UserIcon from '@mui/icons-material/Inventory';
import AdminIcon from '@mui/icons-material/LocalShipping';
import './App.css';
import Product from './product';
import Admin from './admin';
import { useState, useEffect } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [value, setValue] = useState(0);
  const [productPage, setProductPage] = useState(true);

  const LoadProducts = () => {
    fetch('/products/')
      .then(json => json.json())
      .then(data => {
        setProducts(data)
      })
  }

  useEffect(() => {
    LoadProducts();
  }, []);

  const display = (row) => {
    return (
      <div className='product-row'>
        {row.map((product, i) => (
          <Product itemName={product.name} price={"$" + product.price} img={product.img} />
        ))}
      </div>
    );
  }

  return (
    <div className='app'>

      <div>
        <Box sx={{ width: 500, margin: "auto" }}>
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
              setProductPage(!productPage);
            }}
          >
            <BottomNavigationAction label="Products" icon={<UserIcon fontSize="large" />} />
            <BottomNavigationAction label="Customer Orders" icon={<AdminIcon fontSize='large' />} />
          </BottomNavigation>
        </Box>
      </div>

        { productPage === true &&
          products.map((row, index) => (
          display(row)
        ))}

        { productPage === false &&
          <Admin/>
        }

    </div>
  );
}

export default App;
