import React, { useState } from "react";
import { addDoc, collection } from "@firebase/firestore";
import { firestore } from "../firebase";
import { Button, Dropdown } from "react-bootstrap";




const MessageHolder = ({message}) => {  
    console.log(message)
    return (
        <div style={{
            display: 'flex', 
            justifyContent: 'space-between', 
            width: "100%",
            border: '5px solid'}}>
        <p> {message} </p>
        <Button> Resolved </Button>
        
        </div>
        
    )
};

export default MessageHolder;