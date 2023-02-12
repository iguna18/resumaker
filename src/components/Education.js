import React, { useEffect, useState } from "react"
import Field from "./Field"
import * as consts from './EducationConstants'
import { useSelector, useDispatch } from "react-redux"
import { Divider } from "../styles/styles";
import services from "../services/services"

const getShowErrorsFlag = (index, state) => {
  return state[`page3Group${index}Check`]
}

export default () => {
  const [degrees, setDegrees] = useState([])
  useEffect(()=>{
    services
      .getDegrees()
      .then(degrees => {
        setDegrees(degrees)
      })
      .catch(err => {
        console.log(err)
      })
  },[])
  const state = useSelector(state=>state.form)

  const groupCounter = useSelector(state=>state.form['page3FormCounter'])
  const arr = Array.from({length: groupCounter})
  return (
    arr.map((_, i) => {
      const showErrors = getShowErrorsFlag(i, state)
      return (
        <div key={i}>
          <Field {...consts.schoolAtt} showErrors={showErrors} index={i}/>
            <div style={{display:'flex'}}>
              <div style={{flex:1}}>
                <Field {...consts.degreeAtt} otherAtt={{degrees}} showErrors={showErrors} index ={i}
                  />
              </div>
              <div style={{flex:1}}>
                <Field {...consts.schoolendAtt} showErrors={showErrors} index ={i}/>
              </div>
            </div>
          <Field {...consts.schooldescriptionAtt} showErrors={showErrors} index ={i}/>
          <Divider thin/>
        </div>
      )
    })
  )
}