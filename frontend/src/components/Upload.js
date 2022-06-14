import React, { useState } from "react";
import { Modal,ModalBody,ModalHeader } from "reactstrap";
// import contact from "../../../Backend/model/contact";
import importbtn from "../utils/import.svg";

const Upload =  ({onClick})=> {
    const [modal,setmodal] = useState(false)
    const [file, setFile] = useState();
    const fileReader = new FileReader();
    const handleOnChange = (e) => {
        setFile(e.target.files[0]);
    };
    const handleOnSubmit = (e) => {
        e.preventDefault();

        if (file) {
            fileReader.onload =  (event)=> {
                const csvOutput = event.target.result;
                console.log(csvOutput)
                console.log(typeof(csvOutput))
                const array = csvOutput.split(";")
                const converttoobject = array.map((contact)=>{
                    return JSON.parse(contact)
                })
                console.log(converttoobject)
                console.log(typeof(converttoobject))
                console.log(array)
                console.log(typeof(array))
                    var res = converttoobject.map(async(onecontact)=>{
                        var result = await fetch(process.env.REACT_APP_API + "/api/v1/contacts", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(onecontact),
                          });
                        console.log("print res")
                        console.log(result)
                        console.log(result.status)
                    })
            };

            fileReader.readAsText(file);
        }
    };
    
    const rendercontact = (e) =>{
        console.log(e)
        e.preventDefault()
        
    }

    return (
        <>
        <div className="import-component">
            <Modal size="lg" isOpen={modal} toggle={()=>setmodal(!modal)}>
            <ModalHeader toggle={()=>setmodal(!modal)}>
                    IMPORT a CSV file
            </ModalHeader>
            <ModalBody>
            <form onSubmit={rendercontact}>
                <input
                    type={"file"}
                    id={"csvFileInput"}
                    accept={".csv"}
                    onChange={handleOnChange}
                />

                <button
                    onClick={(e) => {
                        handleOnSubmit(e);
                    }} 
                >
                    IMPORT CSV
                </button>
                <button type="submit" onClick={onClick}>Done</button>
            </form>
            </ModalBody>
        </Modal>
        <button className='importbtn' onClick={()=>setmodal(true)} >  
                  <img src={importbtn} alt="import" />
              </button>
        </div>
        </>
    );
}

export default Upload;