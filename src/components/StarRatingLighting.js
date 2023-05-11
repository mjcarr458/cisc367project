import React, { useState } from "react";
import { addDoc, collection } from "@firebase/firestore";
import { firestore } from "../firebase";



const sendInfo = async(rating, building, time) => {
    const ref = collection(firestore, "lights");
    console.log("Rating: ", rating, " Building", building);

    let data = {
        rating: rating,
        building: building,
        time: time
    }
    addDoc(ref,data);
}

const StarRatingLight = ({building, time}) => {  
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    console.log({building})
    return (
        <div className="star-rating">
          {[...Array(5)].map((star, index) => {
            index += 1;
            return (
              <button
                type="button"
                key={index}
                className={index <= (hover || rating) ? "on" : "off"}
                onClick={() => {
                    setRating(index);
                    sendInfo(index,building, time);}}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(rating)}
              >
                <span className="star">&#9733;</span>
              </button>
            );
          })}
        </div>
      );
};

export default StarRatingLight;