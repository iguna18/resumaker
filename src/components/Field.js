import { useEffect } from "react";
import styled from "styled-components"
import { Input } from "../styles/styles"
import { useDispatch, useSelector } from 'react-redux';
import { setFieldThunk } from "../reducers/slices";

const Validation = styled.div`
  position: absolute;
  color: ${props => props.err ? 'red' : 'green'};
  left: 100%;
  top: 50%;

  transform: translate(
    ${props => props.err ? '10px' : '-10px'},
    -50%
  );
`
const PHONE_REGEX = /^(\+995)(79\d{7}|5\d{8})$/

const Field = ({under, name, geoName, type, isSmall, otherAtt, placeholder, showErrors, index, pageid}) => {
  // let group = useSelector((state) => state.form[pageid][index]
  // let value = useSelector((state) => state.form[pageid][index][name])
  //PIRVEL RIGSHI AMAS MIXEDE ^^
  let value=null
  value = value? value : ''
  let valueValidity = useSelector((state) => state['form'][`${name}Validity`])
  if(!valueValidity)
    valueValidity = false
  
  const dispatch = useDispatch();
  
  const onChange = (event) => {
    dispatch(setFieldThunk({fieldName:name, fieldValue:event.target.value, index, pageid}))
  }

  useEffect(() => {

    // dispatch(setFieldThunk({
    //   fieldName:`${name}Validity`,
    //   fieldValue: function(){
    //     switch (name) {
    //       case 'number':
    //         return PHONE_REGEX.test(value)
    //       case 'firstName':
    //       case 'lastName':
    //         return value.length >= 2 && /^[\u10A0-\u10FF]+$/.test(value)
    //       case 'email':
    //         return value.slice(-12) == '@redberry.ge'
    //       case 'position':
    //       case 'employer':
    //         return value.length >= 2
    //       case 'workdescription':
    //         return value.length > 0
    //       case 'aboutMe':
    //         return true
    //       case 'workstart':
    //       case 'workend':
    //         return value != ''
    //       default:
    //       break;
    //     }
    //   }(),
    //   index, 
    //   pageid
    // }, [value]))
  })
    
  const style = {
    width: isSmall?'85%':'100%'
  }
  
  // To avoid error from destructuring undefined (other attributes for input
  // may or may not be passed)
  otherAtt = otherAtt ? otherAtt : {}
 
  const today = new Date()
  let endDay = useSelector(state => state.form['workend'])
  let startDay = useSelector(state => state.form['workstart'])
 //ensuring selected end is not earlier than start or later than today
  if(name == 'workend') { 
    if(startDay)
      otherAtt.min = startDay
    
    otherAtt.max = today.toISOString().split("T")[0] 
  
    //ensuring selected start is not later than end or today
  } else if(name == 'workstart') { 
    if(!endDay)
      endDay = today.toISOString().split("T")[0] 
    
    otherAtt.max = endDay
  }

  return (
    <div style={style}>
      <label htmlFor={name}>{geoName}</label>
      <div style={{position:'relative'}}>
        {
          ['text','email','number'].some(t=>t==type) && 
          valueValidity &&
          <Validation>&#10003;</Validation>
        }
        {
          showErrors &&
          name != 'aboutMe' &&
          !valueValidity &&
         <Validation err>&#10007;</Validation>
        }
        {
          type == 'textarea' ?
          <textarea name={name} placeholder={placeholder}
            onChange={onChange} value={value} {...otherAtt}
            style={{width:'100%', resize: 'none', overflow: 'auto'}}></textarea>
          :
          <Input type={type} name={name} placeholder={placeholder}
            onChange={onChange} value={value} {...otherAtt} />
        }
      </div>
      {under && <label htmlFor="name" style={{fontSize:'0.5em'}}>{under}</label>}
    </div>
  )
}

export default Field