import React, { useState } from "react";
import { addDoc, collection } from "@firebase/firestore";
import { firestore } from "../firebase";




const MessageHolder = ({message}) => {  
    console.log(message)
    return (
        <p> {message} </p>
    )
};

export default MessageHolder;