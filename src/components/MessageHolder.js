import React, { useState } from "react";
import { addDoc, collection, getDocs, query, where, deleteDoc, doc } from "@firebase/firestore";
import { firestore } from "../firebase";
import { Button, Dropdown } from "react-bootstrap";

async function deleteMessage(message, messageList, handleMessageList){
    console.log("DELETING: ", message[0])
    messageList.pop(message)
    await deleteDoc(doc(firestore,"messages", message[0]))
    console.log("handlerMessageList", handleMessageList)
    handleMessageList()
}

const MessageHolder = ({message, messageList, handleMessageList}) => {  
    console.log("MESSAGE IN MESSAGE HOLDER: ", message)
    return (
        <div style={{
            display: 'flex', 
            justifyContent: 'space-between', 
            width: "100%",
            border: '5px solid'}}>
        <p> {message[1]} </p>
        <Button onClick= {() => deleteMessage(message, messageList, handleMessageList)}> Resolved </Button>
        
        </div>
        
    )
};

export default MessageHolder;