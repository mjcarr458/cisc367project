import { addDoc, collection } from "@firebase/firestore";
import 'bootstrap/dist/css/bootstrap.css';
import React, { useRef, useState } from 'react';
import { Button, Dropdown } from "react-bootstrap";
import { firestore } from "../firebase";
import { CDBSlider, CDBContainer } from 'cdbreact';
import Slider from "/src/components/slider.js"

export default function Home() {
    const messageRef = useRef();
    const ref = collection(firestore, "messages");
    const [building, setBuilding] = useState(null);

    const handleSave = async(e) => {
        e.preventDefault();
        console.log(messageRef.current.value);

        let data = {
            message: messageRef.current.value,
        }

        try {
            addDoc(ref,data);
        }catch(e){
            console.log(e)
        }
    }

    function changeBuilding(newBuilding){
        setBuilding(newBuilding)
        console.log(newBuilding)
    }
    return (
    <div style={{ 
    display: 'block',
    border: '5px solid', 
    width: '100%',
    margin: 'auto', 
    padding: '5%',
    justifyContent: 'left' }}>
        
        <form onSubmit={handleSave}>
            <label> Enter Message</label>
            <input type="text" ref = {messageRef} />
            <button type="submit">Save</button>
        </form>
        
        
        <div style={{
            display: 'flex', 
            justifyContent: 'space-between', 
            width: "100%",
            border: '5px solid'}}>
        <Button>
            Time
        </Button>
        <Dropdown>
        <Dropdown.Toggle variant="primary">
            {building ? building : "Choose Building" }
        </Dropdown.Toggle>
        <Dropdown.Menu>
        <Dropdown.Item onClick={() => changeBuilding("Redding Hall")}>
            Redding Hall
          </Dropdown.Item>
          <Dropdown.Item onClick={() => changeBuilding("Smith Hall")}>
            Smith Hall
          </Dropdown.Item>
          <Dropdown.Item onClick={() => changeBuilding("Brown Lab")}>
            Brown Lab
          </Dropdown.Item>
        </Dropdown.Menu>
        </Dropdown>
        <Button>
            Accessibility Info
        </Button>
        </div>
        <Slider></Slider>


    </div>
    );
}

