import React, { useEffect } from "react"
import Field from "./Field"
import * as consts from './ExperiencesConstants'
import { useSelector, useDispatch } from "react-redux"
import { Divider } from "../styles/styles";

const getShowErrorsFlag = (index, state) => {
  return state[`page2Group${index}Check`]
}

export default () => {
  const state = useSelector(state=>state.form)

  const groupCounter = useSelector(state=>state.form['page2FormCounter'])
  const arr = Array.from({length: groupCounter})
  return (
    arr.map((_, i) => {
      const showErrors = getShowErrorsFlag(i, state)
      return (
        <div style={{flexDirection:''}} key={i}>
          <Field {...consts.positionAtt} showErrors={showErrors} index={i}/>
          <Field {...consts.employerAtt} showErrors={showErrors} index ={i}/>
            <div style={{display:'flex'}}>
              <div style={{flex:1}}>
                <Field {...consts.workstartAtt} showErrors={showErrors} index ={i}/>
              </div>
              <div style={{flex:1}}>
                <Field {...consts.workendAtt} showErrors={showErrors} index ={i}/>
              </div>
            </div>
          <Field {...consts.workdescriptionAtt} showErrors={showErrors} index ={i}/>
          <Divider thin/>
        </div>
      )
    })
  )
}