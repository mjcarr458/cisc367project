import React, { useState, useEffect } from "react";
import { addDoc, collection, getDocs, query, where } from "@firebase/firestore";
import { firestore, } from "../firebase";

var round = 0

const findAll = async(building) => {

    var sum = 0
    var count = 0

    const q = query(
        collection(firestore, "noise"), 
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
    round = Math.round(avg)
    console.log("ROUND: ", Math.round(avg))
    console.log("==========================")
    return round
}


const ViewRatingNoise = ({rating}) => {  
    

    //findAll(building)
    

    console.log("CORE ROUND: ", rating)
    return (
        <div className="star-rating">
          {[...Array(5)].map((star, index) => {
            index += 1;
            return (
              <button
                type="button"
                key={index}
                className={index <= (rating) ? "on" : "off"}
              >
                <span className="star">&#9733;</span>
              </button>
            );
          })}
        </div>
      );
};

export default ViewRatingNoise;