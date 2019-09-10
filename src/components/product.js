import React, {useState, useRef, useEffect} from 'react';
import {BrowserRouter as Router, Route, Link}from "react-router-dom";
import {basket$, updateBasket} from '../components/store.js';
import axios from 'axios';
import API_ROOTS from './constants'
import '../style/style.css';
import Markdown from 'markdown-to-jsx'


const whiteBack = {
  position: 'absolute',
  width: '870px',
  top: '100px',
  left: '50%',
  transform: 'translate(-50%)',
  

}

const topHeader = {

  backgroundColor: 'rgb(76, 108, 252)',
  height: '70px',
  width: '100%',
  position: 'fixed',
  top: '0',
  zIndex: '4'

}


let counter = 0;
let counter2 = 10000;
let counter3 = 2000000;


const Product = (props) => {

  const [apiData, setApiData] = useState([])
  const [reviewData, setReviewData] = useState([]);
  const [reviewDataLink, setReviewDataLink] = useState({});
  const [amount, setAmount] = useState(1)
  const id = props.match.params.id;



  useEffect(() => {

    let url = API_ROOTS.API_ROOTProducts + '&filter[_id]=' + id;
    


    axios.get(url, {headers: {"Content-Type": "application/json"}})
 
    .then((response) => {
      
      
      setApiData(response.data.entries)
      
    })

    

  }, []);

  useEffect(() => {
    let urlReview = API_ROOTS.API_ROOTReview + '&filter[productlink].[_id]=' + id;

    axios.get(urlReview, {headers: {"Content-Type": "application/json"}})
 
    .then((response) => {
      
      setReviewDataLink(response.data)
      setReviewData(response.data.entries)
      
    })

  },[])

  
  const amountFn = (e) => {
    setAmount(e.target.value)
  }

  

  const renderMush = (data) => {

    const addToBasket = () => {

    
      


     let basket = {

        value: {
          product: data.name,
          amount: amount,
          price: data.price
        } 
      }

      updateBasket([...basket$.value, basket])
      props.updateBasket(basket$.value.length)

      
    }


    const renderImg = (img, index) => {
      counter++;

      return(
        
          <td key={counter} style={{width: '200px', float: 'left'}}><img width='200px' src={'https://shop.devspace.host' + img.path}></img></td>
        
      )
      
    }

    return(
      
      <tbody key={counter3}>
        <tr>
          <td><h3>{data.name}</h3></td>
        </tr>
        <tr>
          <td><Markdown>{data.description}</Markdown></td>
        </tr>
        <tr>
          <td>Pris: {data.price} Kr</td>
        </tr>
        <tr>
          <td>Lagersaldo: {data.stock}</td>
        </tr>
        <tr>
          <td>
          <label>Antal att lägga till i varukorgen</label>
          <input style={{margin: '20px', padding: '10px', width: '50px', border: '2px solid rgb(76, 108, 252)', fontSize: '24px'}} type='number' min='1' max='200' defaultValue='1' onChange={amountFn}></input>
          </td>
        </tr>
        <tr>
          <td>
          <label>Lägg till varan i varukorgen</label><br></br>
          <button style={{width: '300px', height: '50px', marginTop: '20px', fontSize: '24px', backgroundColor: 'rgb(76, 108, 252)', color: 'white', border: 'none', cursor: 'pointer', outline: 'none'}} onClick={addToBasket}>Lägg till i varukorgen</button>
          </td>
          </tr>
          <tr>
            {data.gallery.map(renderImg)}
          </tr>
        
          
          
          
      
        
        

      
      </tbody>
    )
  }

  const renderReview = (data, index) => {

    counter2++;
    return(
      
        <div key={counter2} style={counter2} style={{backgroundColor: 'rgb(247, 247, 247)'}}>
        <h4 style={{padding: '5px 10px'}}>{data.title}</h4>
        <div style={{padding: '5px 10px'}}>{data.body}</div>
        <div style={{padding: '5px 10px'}}>Betyg: {data.rating}/5</div>
        </div>
      
    )
  }


  


   
  return(
    <>
    <div style={topHeader}></div>
    <div style={whiteBack}></div>

    <div style={{position: 'relative'}}>

    <table style={{position: 'relative', top: '100px', left: '50px'}}>
        {apiData.map(renderMush)}
      </table>

      <div style={{position: 'relative', left: '700px', top: '-450px', width: '300px'}}>
      <h3 style={{position: 'relative', top: '50px', left: '60px'}}>Recensioner</h3>
      <div style={{position: 'relative', top: '50px', left: '60px'}}>
        {reviewData.map(renderReview)}
        
      </div>
      <Link style={{position: 'relative', top: '60px', left: '58px'}} to={{pathname: '/review', state: {apiData: apiData, id:id, reviewDataLink: reviewDataLink} }}><button style={{width: '200px', height: '50px', marginTop: '20px', fontSize: '24px', backgroundColor: 'rgb(76, 108, 252)', color: 'white', border: 'none', cursor: 'pointer', outline: 'none'}}>Skriv recension</button></Link>

      </div>
      


    </div>
      
      
    
    
    
    </>
  )

}

export default Product;