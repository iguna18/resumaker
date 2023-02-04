import React from 'react';


function Cv() {
  return (
    <div style={{ backgroundColor:"blue", display: "flex", flexDirection: "column", height:'100vh',
                    padding: "1em 2em"}}>
      <div style={{ flex: 1 }}>Part 1</div>
      <div style={{ flex: 1 }}>Part 2</div>
      <div style={{ height: "40px", backgroundColor:"purple" }}>Part 4</div>
    </div>
  );
}

export default Cv;