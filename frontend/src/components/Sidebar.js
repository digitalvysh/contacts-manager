import React from 'react'
import './sidebar.css'

const Sidebar = () => {
  return (
    <div className='asidebar'>
        <b>Logo</b>
        <span className='dashboard'>Dashboard</span>
        <span className='Totalcontacts'> Total Contacts </span>
        <button className='logout'>
            Log out
        </button>
      
    </div>
  )
}

export default Sidebar

