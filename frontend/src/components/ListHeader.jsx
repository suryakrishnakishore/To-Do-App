import React, { useState } from 'react'
import Modal from './Modal'
import { useNavigate } from 'react-router-dom';

function ListHeader(props) {
  const [showMode, setShowMode] = useState(false);
  let navigate = useNavigate();

  function handleSignOut () {
    navigate("/");
  }

  return (
    <div className='list-header headText'>
      <h1>{props.listName}</h1>
      <div className="buttons-container">
        <button className="btn1" type="submit" onClick={() => setShowMode(true)}>
          ADD NEW
        </button>
        <button className="btn2" type="submit" onClick={handleSignOut}>
          SIGN OUT
        </button>
      </div>
      {showMode && <Modal mode={showMode} setShowMode={setShowMode} n={"CREATE"}></Modal>}
    </div>
    
  )
}

export default ListHeader