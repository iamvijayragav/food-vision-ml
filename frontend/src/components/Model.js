import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import React, { useEffect, useState } from "react";

const Model = ({currentPred,setModel}) => {
  const [percentage, setPercentage] = useState(40);

  useEffect(() => {
    setTimeout(() => {
      if (percentage < 60) {
        setPercentage(percentage + 1);
      }
    }, 50);
  }, [percentage]);

 

  return (
    <div className="model">
      <div className="inside-model">
      <div className="content">
      <h1 onClick={()=>setModel(prv=>!prv)}>&#215;</h1>
      </div>
        
        <div style={{ width: 150 }}>
          <CircularProgressbar value={percentage} text={`${percentage}%`} />
        </div>

        <div className="content">
          <h1>{
            currentPred
            }</h1>
          <p>
            Image result for idli Idli is an excellent addition to heart-healthy
            nutrition since it is low in calories and fat. Fermented foods, such
            as idli, contain peptides that help bring down cholesterol and blood
            pressure. It is an anti-diabetic food containing antioxidant
            properties.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Model;