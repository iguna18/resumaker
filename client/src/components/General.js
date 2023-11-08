import { useSelector } from "react-redux";
import Field from "./Field";
import * as consts from './GeneralConstants'
export default () => {
  const showErrors = useSelector(state=>state.form[`page1Group${0}Check`])

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

        <Field {...consts.photoAtt} showErrors={showErrors}/>
        <Field {...consts.aboutMeFieldAtt} showErrors={showErrors}/>
        <Field {...consts.emailFieldAtt} showErrors={showErrors}/>
        <Field {...consts.numberFieldAtt} showErrors={showErrors}/>
      </div>
    }
    </>
  )
}