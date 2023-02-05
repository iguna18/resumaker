import React from 'react';
import {BsFillCompassFill} from 'react-icons/bs'

function Cv() {
  return (
    <div style={{ backgroundColor:"white", display: "flex", flexDirection: "column", height:'100vh',
                    padding: "1em 2em"}}>
      <div style={{ flex: 1 }}> p1 </div>
      <div style={{ flex: 1 }}>Part 2</div>
      <div style={{ height: 50, marginTop:20 }}>
        <BsFillCompassFill color='red' size={20} />
      </div>
    </div>
  );
}

export default Cv;