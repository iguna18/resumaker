import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {addGroupThunk } from "../reducers/slices"
import Field from "./Field";
import * as consts from './GeneralConstants'

export default () => {
  const showErrors = useSelector(state=>state.form['page1Check'])
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(addGroupThunk(1, 0))
  },[])
  return (
    <>
    {

      <div style={{ display:'flex', flexDirection:'column'}}>
        <div style={{display:'flex'}}>
          <div style={{flex:1}}>
            <Field {...consts.nameFieldAtt} showErrors={showErrors}/>
          </div>
          <div style={{flex:1}}>
            <Field {...consts.lastNameFieldAtt} showErrors={showErrors}/>
          </div>
        </div>

        <Field {...consts.aboutMeFieldAtt} showErrors={showErrors}/>
        <Field {...consts.emailFieldAtt} showErrors={showErrors}/>
        <Field {...consts.numberFieldAtt} showErrors={showErrors}/>
      </div>
    }
    </>
  )
}