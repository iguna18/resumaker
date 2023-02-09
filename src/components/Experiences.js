import React, { useEffect } from "react"
import Field from "./Field"
import * as consts from './ExperiencesConstants'
import { useSelector, useDispatch } from "react-redux"

export default () => {
  const showErrors = useSelector(state=>state.form['page2Check'])

  const groupCounter = useSelector(state=>state.form['page2FormCounter'])
  const arr = Array.from({length: groupCounter})
  return (
    arr.map((_, i) => {
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
        </div>
      )
    })
  )
}