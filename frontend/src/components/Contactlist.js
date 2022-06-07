import React, { useState } from 'react'
import selectDate from "../utils/selectDate.svg";
import Popupform from './Popupform';
import './contactlist.css'

function Contactlist() {
    const [contacts,setcontacts] = useState([]);
   
    const importlist = async() =>{
        const res = await fetch(process.env.REACT_APP_API + "/api/v1/contacts",{
            method:"GET",
            headers: { "Content-Type": "application/json" },
        })
        console.log(res.status)
        const data = await res.json();
        console.log(data)
        setcontacts(data)
    }
    const deletecontact =async (contact) =>{
        console.log(contact)
        const res = await fetch(process.env.REACT_APP_API + "/api/v1/contacts/"+contact,{
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        })
        console.log(res.status)
        const update = await fetch(process.env.REACT_APP_API + "/api/v1/contacts",{
            method:"GET",
            headers: { "Content-Type": "application/json" },
        })
        const result = await update.json();
        setcontacts(result)
    }
    
  return (
         <div className="mainpage">
             <section>
             <div className="filter">
              <img src={selectDate} alt="selectDate" /></div>
              <Popupform />
              <button className='btn mt-3' onClick={importlist}>Import</button>
             </section>
             <table class="content-table">
          <thead>
              <th>Name</th>
              <th>Designation</th>
              <th>Company</th>
              <th>Industry</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Country</th>
              <th>Action</th>
          </thead>
          <tbody>
              {contacts.map((contact)=>(
                  <tr key={contact._id}>
                      {/* {Object.values(contact).map((val)=>(
                          <td>{val}</td>
                      ))} */}
                      <td>{contact.name}</td>
                      <td>{contact.designation}</td>
                      <td>{contact.company}</td>
                      <td>{contact.industry}</td>
                      <td>{contact.email}</td>
                      <td>{contact.phonenumber}</td>
                      <td>{contact.country}</td>
                      <td><button onClick={()=>deletecontact(contact._id)}> 🗳️</button></td>
                  </tr>
              ))}
          </tbody>
      </table>
    </div>
  )
}

export default Contactlist



