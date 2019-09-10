import React, {useState, useRef, useEffect} from 'react';
import '../style/checkbox.css'

const topHeader = {

  backgroundColor: 'rgb(76, 108, 252)',
  height: '70px',
  width: '100%',
  position: 'fixed',
  top: '0',
  zIndex: '1'

}

const searchField = {
  position: 'absolute',
  width: '200px',
  height: '30px',
  border: 'none',
  top: '20px',
  left: '140px',
  borderRadius: '6px',
  paddingLeft: '6px',
  fontSize: '14px',
  outline: 'none',
}
/* const checkBoxInput = {
  position: 'absolute',
  left: '500px',
  top: '20px'
} */
const checkBoxLabel = {
  position: 'absolute',
  width: '200px',
  left: '400px',
  top: '26px',
  color: 'white',
  fontStyle: 'oblique'
}



const Menu = (props) => {
  return(
    <>
    <div style={topHeader}>
    <input style={searchField} placeholder="Sök smör"type="text" onChange={props.searchFn}></input>

    <label style={checkBoxLabel} className="mds-checkbox">Visa endast smör i lager 
				<input type="checkbox" className="mds-checkbox__input" onClick={props.showInStock}></input>
				<span className="mds-checkbox__span"></span>
		</label>

    </div>
    </>
  )
}

export default Menu;