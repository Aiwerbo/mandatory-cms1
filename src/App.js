import React, {useState, useRef, useEffect} from 'react';
import {BrowserRouter as Router, Route, Link}from "react-router-dom";
import {basket$, updateBasket} from './components/store.js';
import './App.css';
import Home from './components/home'
import Product from './components/product'
import Review from './components/review'
import Basket from './components/basket';
import Checkout from './components/checkout';
import Done from './components/done';
import skog from './sol.jpg'

const checkout = {
  position: 'fixed',
  top: '26px',
  left: '850px',
  fontSize: '16px',
  zIndex: '5',
  color: 'white',
  fontStyle: 'oblique',
}
const home = {
  position: 'fixed',
  color: 'white',
  top: '20px',
  zIndex: '5',
  left: '20px',
  fontSize: '24px',
  
}

function App() {

  const [basket, setBasket] = useState('');
  const [local, setLocal] = useState(localStorage.getItem('money') || '')

  useEffect(() => {
    localStorage.setItem('money', local)
  }, [local])
  
    const updateLocal = (data) => {
      console.log(data)
      setLocal(data)
    }


   const updateBasketFn = (data) => {
    
    setBasket(data)
  }

  console.log(basket$.value)

  return (
    <Router>
      <div className="App">
      <Link to='/basket' style={checkout}>{local}Kr - Gå till varukorg</Link>
      <div style={{position: 'absolute', left: '-20px'}}>

      </div>
      <Link to='/' style={home}>Home</Link>
        <div>

      <Route exact path='/' component={Home}></Route>
      <Route path='/product/:id' render={(props) => <Product {...props} updateLocal={updateLocal}  updateBasket={updateBasketFn}/>} />
      <Route path='/review' component={Review}></Route>
      <Route path='/basket' render={(props) => <Basket {...props} updateLocal={updateLocal} updateBasket={updateBasketFn}/>} />
      <Route path='/checkout' render={(props) => <Checkout {...props} updateLocal={updateLocal}  updateBasket={updateBasketFn} /> } />
      <Route path='/done' component={Done}></Route>
        
        
        </div>
      
      
      </div>
    </Router>
  );
}

export default App;
