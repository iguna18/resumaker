import React from "react"
import Field from "./Field"
export default () => {
  const positionAtt = {
    type:'text',
    name:'position',
    geoName:'თანამდებობა',
    under:'მინიმუმ 2 სიმბოლო',
    placeholder:'დეველოპერი, დიზაინერი, ა.შ.'
  }
  const employerAtt = {
    type:'text',
    name:'employer',
    geoName:'დამსაქმებელი',
    under:'მინიმუმ 2 სიმბოლო',
    placeholder:'დამსაქმებელი'
  }
  const workstartAtt = {
    type:'date',
    name:'workstart',
    geoName:'დაწყების თარიღი',
    isSmall:true,
    nogreensign:true

  }
  const workendAtt = {
    type:'date',
    name:'workend',
    geoName:'დამთავრების თარიღი',
    nogreensign:true
  }
  return (

    <div style={{width:'94%', flexDirection:''}}>
      <Field {...positionAtt}/>
      <Field {...employerAtt}/>
        <div style={{display:'flex'}}>
          <div style={{flex:1}}>
            <Field {...workstartAtt}/>
          </div>
          <div style={{flex:1}}>
            <Field {...workendAtt}/>
          </div>
        </div>
    </div>
  )
}