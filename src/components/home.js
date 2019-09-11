import React, {useState, useRef, useEffect} from 'react';
import {BrowserRouter as Router, Route, Link}from "react-router-dom";
import axios from 'axios';
import '../style/style.css';
import API_ROOTS from './constants'
import Menu from './menu'

const whiteBack = {
  position: 'absolute',
  width: '870px',
  top: '100px',
  left: '50%',
  transform: 'translate(-50%)',
  

}
const headerText = {
  position: 'relative',
  textAlign: 'center',
  fontStyle: 'oblique',
  
}
const table = {
  position: 'relative',
  display: 'flex',
  flexWrap: 'wrap',
  left: '100px',
  borderCollapse: 'collapse',
  marginBottom: '100px',

}



let total = 0;



const Home = (props) => {

  const [apiData, setApiData] = useState([]);
  const [inStock, setInStock] = useState(false)
  const [skip, updateSkip] = useState(0)
  const [limit, updateLimit] = useState(6)
  const [search, setSearch] = useState('');
  

  let next = parseInt(props.match.params.page) + 1
  let prev = parseInt(props.match.params.page) -1;
  let page = parseInt(props.match.params.page) * 6;

  let pagination = "&limit=" + limit + "&skip=" + page
  
  useEffect(() => {

    let url = API_ROOTS.API_ROOTProducts;
    
    if(inStock === true){
      url += '&filter[instock]=true'
    }
    if(search !== ''){
      pagination = '';
      url += '&filter[name][$regex]=' + search;
    }
    

    axios.get(url + pagination, {headers: {"Content-Type": "application/json"}})
 
    .then((response) => {
    
      total = response.data.total;
      setApiData(response.data.entries)
      
    })

  }, [inStock, skip, search, page]);

  

  const showInStock = () => {

    setInStock(inStock === false ? true : false)
  }

  const renderList = (data) => {

   


    return(
      <tbody key={data._id}>
        <tr>
          <td className='homeTableImageTd'><img src={'https://shop.devspace.host' + data.gallery[0].path} style={{height: '200px', width: '200px', margin: '10px'}}></img></td>
        </tr>
        <tr>
         
          <td><Link style={{fontSize: '16px', paddingLeft: '30px'}} to={'/product/' + data._id}>{data.name}</Link></td>
        </tr>
        <tr>
          <td style={{paddingLeft: '30px'}}><div className='homeTableTextDiv'>Pris: {data.price} kr</div></td>
          
        </tr>
       
      </tbody>
    )
  }
  const pagLeftFn = () => {
   // updateSkip(skip - 6);
  
  }

  const pagRightFn = () => {
   // updateSkip(skip + 6);

  }

  const searchFn = (e) => {
    props.history.push("/page/0")
    setSearch(e.target.value)
  }

  let leftArrow = '';
  let rightArrow = '';


  if(page === 0){
    let hideLeftArrow = 
    <div className="arrows" style={{pointerEvents: 'none'}} onClick={pagLeftFn}>
      <button style={{opacity: '0.2'}} className="arrowButton arrowButton1">Previous page</button>
    </div>
    
    
    leftArrow = hideLeftArrow;
  }
  else{
    leftArrow = 
    <div className="arrows" onClick={pagLeftFn}>
        <Link to={'/page/' + prev}><button className="arrowButton arrowButton1">Prev page</button></Link>
    </div>
    
  }
  if(total -1 - page < 6 || search.length > 0){
    let hideRightArrow = 

    <div className="arrows" style={{pointerEvents: 'none'}} onClick={pagRightFn}><button style={{opacity: '0.2'}} className="arrowButton arrowButton2">Next page</button></div>
    
    
    rightArrow = hideRightArrow;
  }
  else{
    rightArrow = 
    
    <div className="arrows" onClick={pagRightFn}>
      <Link to={'/page/' + next}><button className="arrowButton arrowButton2">Next page</button></Link>
    </div>
    
    
  }


  return(
    <>
    <Menu history={props.history} searchFn={searchFn} showInStock={showInStock}></Menu>
    <Link to='/basket' >Check out</Link>
    <div style={whiteBack}>
    
    
       
        <h3 style={headerText}>Vi säljer smör i solsken</h3>
        

        <table style={table}>
          {apiData.map(renderList)}
        </table>

        <div className="arrowContainer">
          {leftArrow}
          {rightArrow}
        </div>

      
    </div>

      
      
   
      
    </>
  )
}

export default Home;