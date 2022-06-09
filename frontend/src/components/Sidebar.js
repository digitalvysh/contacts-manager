import React from 'react'
import './sidebar.css'
import signout from "../utils/signOut.svg";
// import totalContact from "../utils/totalContact.svg"
import dashboard from "../utils/dashbord.svg"
import Popupform from './Popupform';


const Sidebar = () => {
  return (
    <div className='asidebar'>
        <b>Logo</b>
        <span className='dashboard'><img src={dashboard} alt="dashboard" /></span>
        {/* <span className='Totalcontact'><img src={totalContact} alt="totalcontacts" /> </span> */}
        <Popupform className="popup-component" />
        <button className='logout'>
            <img src={signout} alt="signout" />
        </button>
      
    </div>
  )
}

export default Sidebar;

