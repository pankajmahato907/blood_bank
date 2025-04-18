import React from "react";
import { useLocation } from "react-router-dom";

const GoogleMap = () => {
    const location = useLocation();  // to get the data passed from the BloodBankinfo.jsx using use navigate
    const { bankDetails } = location.state || {};  // destructure the data
    const query = encodeURIComponent(bankDetails?.name.split(" ").slice(0,2).join("")|| "Kathmandu");
    console.log(bankDetails?.name.split(" ").slice(0,2).join(" "))
    const mapSrc = `https://maps.google.com/maps?q=${query}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
    
  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          position: "relative",
          paddingBottom: "75%",
          height: 0,
          overflow: "hidden",
        }}
      >
        <iframe
          title="Google Map"
          src= {mapSrc}
          loading="lazy"
        
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: 0,
          }}
        ></iframe>
      </div>
      <a
        href="https://tariffcalculator.us/"
        rel="noopener noreferrer"
        target="_blank"
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: "hidden",
          clip: "rect(0,0,0,0)",
          whiteSpace: "nowrap",
          border: 0,
        }}
      >
        {console.log(bankDetails)}
        tariffcalculator.us
      </a>
    </div>
  );
};

export default GoogleMap;
