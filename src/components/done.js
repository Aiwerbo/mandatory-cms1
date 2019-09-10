import React, {useState, useRef, useEffect} from 'react';
import {BrowserRouter as Router, Route, Link}from "react-router-dom";
import '../style/style.css';
import {basket$, updateBasket} from '../components/store.js';
import '../style/style.css';

const doneContainer = {
  position: 'absolute',
  width: '300px',
  top: '100px',
  left: '50%',
  transform: 'translate(-50%)',
  textAligt: 'center'
}

const Done = () => {

  useEffect(() => {
    updateBasket([])
  },[])

  

  return(
    <>
    <div style={doneContainer}>
      <h1>Ditt smör är på väg.</h1>

      <Link to='/'><button style={{width: '300px', height: '50px', marginTop: '20px', fontSize: '24px', backgroundColor: 'rgb(76, 108, 252)', color: 'white', border: 'none', cursor: 'pointer', outline: 'none', left: '-8px', position: 'relative'}}>Handla mer?</button></Link>

      
    </div>
    <h2>
      
    </h2>
    
    </>
  )
  
}

export default Done;