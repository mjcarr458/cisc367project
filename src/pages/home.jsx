import { addDoc, collection, getDocs, query, where } from "@firebase/firestore";
import 'bootstrap/dist/css/bootstrap.css';
import React, { useRef, useState, useEffect } from 'react';
import { Button, Dropdown } from "react-bootstrap";
import Slider from "../components/slider.js";
import { firestore } from "../firebase";
import { BUILDINGS } from '../GLOBALVARS';
import StarRatingNoise from "../components/StarRatingNoise.js";
import StarRatingLight from "../components/StarRatingLighting.js";
import StarRatingCrowd from "../components/StarRatingCrowd.js";
import StarRatingTemp from "../components/StarRatingTemp.js";
import ViewRating from "../components/ViewRating.js";
import './style.css';
import BuildingInfo from '../sampledata.json'
import DataEntry from "../components/Form.jsx"



export default function Home() {
    const messageRef = useRef();
    const [viewMode, setViewMode] = useState(true);
    const ref = collection(firestore, "messages");
    const [building, setBuilding] = useState("");
    const [viewNoise, setViewNoise] = useState(0);
    const [viewLight, setViewLight] = useState(0);
    const [viewCrowd, setViewCrowd] = useState(0);
    const [viewTemp, setViewTemp] = useState(0);

    const [buildingInfo, setBuildingInfo] =useState(BuildingInfo);
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

    async function getInfo(building, category){

        var sum = 0
        var count = 0
    
        const q = query(
            collection(firestore, category), 
            where("building", "==", building)
          );
    
        const docsSnap = await getDocs(q);
        await docsSnap.forEach(doc => {
            sum += doc.data().rating
            count += 1
            console.log(doc.data().rating);
        })
        console.log("=========================")
        console.log("BUILDING", building)
        console.log("COUNT: ", count)
        console.log("SUM: ", sum)
        var avg = sum/count
        console.log("AVG: ", avg)
        var round = Math.round(avg)
        console.log("ROUND: ", Math.round(avg))
        console.log("==========================")
        return round
    }

    function changeToViewMode(){
        setViewMode(true);
        console.log(viewMode)
    }

    function changeToEditMode(){
        setViewMode(false);
        console.log(viewMode)
    }
    
    function setNoiseAvg(building){
        const noisePromise = getInfo(building, "noise")
            noisePromise.then((value) => {
                console.log("VALUE: ", value);
                setViewNoise(value)
            })
    }

    function setLightAvg(building){
        const noisePromise = getInfo(building, "lights")
            noisePromise.then((value) => {
                console.log("VALUE: ", value);
                setViewLight(value)
            })
    }

    function setCrowdAvg(building){
        const noisePromise = getInfo(building, "crowd")
            noisePromise.then((value) => {
                console.log("VALUE: ", value);
                setViewCrowd(value)
            })
    }

    function setTempAvg(building){
        const noisePromise = getInfo(building, "temp")
            noisePromise.then((value) => {
                console.log("VALUE: ", value);
                setViewTemp(value)
            })
    }
            

    function changeBuilding(newBuilding){
        if (viewMode){
            setNoiseAvg(newBuilding)
            setLightAvg(newBuilding)
            setCrowdAvg(newBuilding);
            setTempAvg(newBuilding)
        }
        console.log("viewNoise: ", viewNoise)
        setBuilding(newBuilding)
        console.log(newBuilding)
    }

    useEffect(() => {
        changeBuilding("Redding Hall")
    });

    
    return (
    <div style={{ 
    display: 'block',
    border: '5px solid', 
    width: '100%',
    margin: 'auto', 
    padding: '5%',
    justifyContent: 'left' }}>
        <DataEntry buildingInfo={buildingInfo} setBuildingInfo={setBuildingInfo}/>
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
        {BUILDINGS.map( buildingName => (
            <Dropdown.Item onClick={() => changeBuilding(buildingName)}>
            {buildingName}
          </Dropdown.Item>
        ))}
        </Dropdown.Menu>
        </Dropdown>
        <Button>
            Accessibility Info
        </Button>
        </div>
        <div> 
            {viewMode 
            ?   <div>
                <label> viewMode</label>
                <label> Noise </label>
                <ViewRating rating={viewNoise}/>
                <label> Light</label>
                <ViewRating rating={viewLight}/>
                <label> Crowd</label>
                <ViewRating rating={viewCrowd}/>
                <label> Temp</label>
                <ViewRating rating={viewTemp}/>
                </div>
            : <div> 
                <label> Edit Mode</label>
                <label> Noise</label>
                <StarRatingNoise building={building}/>
                <label> Light</label>
                <StarRatingLight building={building}/>
                <label> Crowd</label>
                <StarRatingCrowd building={building}/>
                <label> Temperature</label>
                <StarRatingTemp building={building}/>
            </div>     
            }
        </div>
        
            
  
        
        <Button onClick= {() => changeToViewMode()}> View Mode</Button>
        <Button onClick= {() => changeToEditMode()}> Edit Mode</Button>
        


    </div>
    );
}

