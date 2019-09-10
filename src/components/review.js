import React, {useState, useRef, useEffect} from 'react';
import {BrowserRouter as Router, Route, Link, Redirect}from "react-router-dom";
import API_ROOTS from './constants';
import axios from 'axios';

const reviewContainer = {
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
  zIndex: '1'

}
const inputText = {
  width: '665px',
  height: '40px',
  border: '1px solid rgb(168, 168, 168)',
  fontSize: '16px',
  paddingLeft: '10px',
  marginBottom: '20px'
}
const inputArea = {
  border: '1px solid rgb(168, 168, 168)',
  marginBottom: '20px',
  padding: '10px',
  fontSize: '16px'
}

const Review = (props) => {

  const [rating, setRating] = useState(1);
  const [body, setBody] = useState('');
  const [title, setTitle] = useState('');
  const [redirect, setRedirect] = useState(false)

  const ratingFn = (e) => {
    
    setRating(e.target.value)
  }
  const bodyFn = (e) => {
    setBody(e.target.value)
  }
  const titleFn = (e) => {
    setTitle(e.target.value)
  }

  const sendFn = () => {



    let url = API_ROOTS.API_ROOTSaveReview + '&filter[productlink].[_id]=' + props.id;
    let obj = {data: {
      title: title,
      body: body,
      rating: rating,
      productlink: {
        _id: props.location.state.id,
        link: props.location.state.reviewDataLink.fields.productlink.options.link,
        display: props.location.state.apiData[0].name
			}
    }

  }

  obj = JSON.stringify(obj)


    axios.post(url, obj, {headers: {"Content-Type": "application/json"}})
 
    .then((response) => {
      
      
      if(response.status === 200){
        setRedirect(true)
      }
      
    })
  

    
  

}

  if(redirect){
    return <Redirect to={'/product/' + props.location.state.id} />
  }
  return(
    <>
    <div style={topHeader}></div>

    <div style={reviewContainer}>
      <h2>Skriv en recension om produkten</h2>
      <input type='text' onChange={titleFn} style={inputText} placeholder='Titel'></input><br></br>
      <textarea onChange={bodyFn} rows="8" cols="80" style={inputArea} placeholder='Skriv text här...'></textarea><br></br>
      <label>Vilket betyg ger du produkten? </label>
      <input type="number" max='5' min='1' defaultValue='1' style={{margin: '20px', padding: '10px', width: '50px', border: '2px solid rgb(76, 108, 252)', fontSize: '24px'}} onChange={ratingFn}></input><br></br>
      <button style={{width: '300px', height: '50px', marginTop: '20px', fontSize: '24px', backgroundColor: 'rgb(76, 108, 252)', color: 'white', border: 'none', cursor: 'pointer', outline: 'none'}} onClick={sendFn}>Skicka in recension </button>
      </div>
    
      
      
      </>
  )


}


export default Review;