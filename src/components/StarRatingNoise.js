import React, { useState } from "react";
import { addDoc, collection } from "@firebase/firestore";
import { firestore } from "../firebase";



const sendInfo = async(rating, building) => {
    const ref = collection(firestore, "noise");
    console.log("Rating: ", rating, " Building", building);

    let data = {
        rating: rating,
        building: building
    }
    addDoc(ref,data);
}

const StarRatingNoise = ({building}) => {  
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
                    sendInfo(index,building);}}
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

export default StarRatingNoise;