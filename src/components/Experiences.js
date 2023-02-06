import React from "react"
import Field from "./Field"
import * as consts from './ExperiencesConstants'
import { useSelector } from "react-redux"

export default () => {
  const showErrors = useSelector(state=>state.form['page2Check'])

  return (

    <div style={{flexDirection:''}}>
      <Field {...consts.positionAtt} showErrors={showErrors}/>
      <Field {...consts.employerAtt} showErrors={showErrors}/>
        <div style={{display:'flex'}}>
          <div style={{flex:1}}>
            <Field {...consts.workstartAtt} showErrors={showErrors}/>
          </div>
          <div style={{flex:1}}>
            <Field {...consts.workendAtt} showErrors={showErrors}/>
          </div>
        </div>
      <Field {...consts.workdescriptionAtt} showErrors={showErrors}/>
    </div>
  )
}