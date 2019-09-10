import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Link}from "react-router-dom";
import '../style/style.css';
import {basket$, updateBasket} from '../components/store.js';
import API_ROOTS from './constants'
import axios from 'axios';  
import '../style/style.css';

const topHeader = {

  backgroundColor: 'rgb(76, 108, 252)',
  height: '70px',
  width: '100%',
  position: 'fixed',
  top: '0',
  zIndex: '1'

}
const basketContainer = {
  position: 'absolute',
  width: '870px',
  top: '100px',
  left: '50%',
  transform: 'translate(-50%)',
  
}

const Checkout = (props) => {

  const [inputName, setInputName] = useState('');
  const [inputaddress, setInputAddress] = useState('');
  const [data, setData] = useState('');

  let total = 0;
  let sum = 0;
  

  const whereFn = (e) => {
    setInputAddress(e.target.value)
  }
  const nameFn = (e) => {
    setInputName(e.target.value)
  }
  const sendToOrder = () => {
    let url = API_ROOTS.API_ROOTSaveOrder;




    

    let order = {data:{
      name: inputName,
      address: inputaddress,
      totalprice: total,
      list: basket$.value
    }}


    axios.post(url, order, {headers: {"Content-Type": "application/json"}})
 
    .then((response) => {
      
      

      props.updateBasket(basket$.value.length)
    })
  }
 

  const renderBasket = (data, index) => {
    

    sum = parseInt(data.value.price) * parseInt(data.value.amount)

    total = total + sum;

    return(
      
      <tbody key={index}>
        <tr>
          <td>Produkt: {data.value.product}</td>
          <td>Antal: {data.value.amount}</td>
          <td>Pris styck: {data.value.price}</td>
          <td>Pris: {sum}</td>
        </tr>
        
      </tbody>
    )
  }

  return(

<>
<div style={topHeader}></div>
<div style={basketContainer}>

<h2 style={{position: 'relative'}}>Checka ut</h2>

<table style={{ fontSize: '16px', paddingLeft: '10px', width: '630px'}}>
{basket$.value.map(renderBasket)}
</table>

<div style={{position: 'relative', marginTop: '30px', marginLeft: '10px' }}> Summa att betala för varukorgen: <label style={{fontSize: '24px', fontWeight: "bold", left: '80px', position: 'relative'}}>{total} Kr</label></div>

<div style={{marginTop: '100px'}}>
<label style={{paddingLeft: '30px'}}>Vi tänkte skicka smöret till dig. Vart ska vi skicka varorna? </label><br></br>


<input style={{width: '500px', height: '30px', fontSize: '16px', marginTop: '20px', padding: '10px'}} type='text' onChange={nameFn} placeholder='Namn'></input><br></br>

<input type='text' onChange={whereFn} placeholder='Adress' style={{width: '500px', height: '30px', fontSize: '16px', marginTop: '20px', padding: '10px'}}></input><br></br>

<Link to='/done'><button onClick={sendToOrder} style={{width: '500px', height: '50px', marginTop: '20px', fontSize: '24px', backgroundColor: 'rgb(76, 108, 252)', color: 'white', border: 'none'}} id='handlaKlart'>Lägg beställning</button></Link>
</div>
</div>

</>
  )
  
}

export default Checkout;