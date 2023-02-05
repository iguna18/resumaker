import React from "react"
import Field from "./Field"
export default () => {
  return (

    <div style={{width:'94%', flexDirection:''}}>
      <Field name={'position'} geoName={'თანამდებობა'} under={'მინიმუმ 2 სიმბოლო'} type={'text'} greensign/>
      <Field name={'employer'} geoName={'დამსაქმებელი'} under={'მინიმუმ 2 სიმბოლო'} type={'text'} greensign/>
      <Field name={'workstart'} geoName={'დაწყების თარიღი'} type={'date'} isSmall/>
    </div>
  )
}