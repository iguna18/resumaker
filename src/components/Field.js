import { useEffect } from "react";
import { Input, UploadLabel, Validation } from "../styles/styles"
import { useDispatch, useSelector } from 'react-redux'
import { setField } from "../reducers/slices";


const PHONE_REGEX = /^(\+995)(79\d{7}|5\d{8})$/

const Field = ({under, name, geoName, type, isSmall, otherAtt, placeholder, showErrors, index}) => {
  let value = useSelector((state) => state.form[`${name}_${index}`])

  value = value? value : ''
  let valueValidity = useSelector((state) => state['form'][`${name}Validity_${index}`])
  if(!valueValidity)
    valueValidity = false
  
  const dispatch = useDispatch();
  
  const onChange = (event) => {
    dispatch(setField(
      {
        fieldName:`${name}_${index}`, 
        fieldValue:
          (
            name != 'photo' ?
            event.target.value :
            URL.createObjectURL(event.target.files[0])
          )
      }))
  }

  useEffect(() => {
    return () => {
      if (name =='photo' && value) {
        URL.revokeObjectURL(value);
      }
    };
  }, [value]);


  useEffect(() => {

    dispatch(setField({
      fieldName:`${name}Validity_${index}`,
      fieldValue: function(){
        switch (name) {
          case 'number':
            return PHONE_REGEX.test(value)
          case 'firstName':
          case 'lastName':
            return value.length >= 2 && /^[\u10A0-\u10FF]+$/.test(value)
          case 'email':
            return value.slice(-12) == '@redberry.ge'
          case 'position':
          case 'employer':
            return value.length >= 2
          case 'workdescription':
            return value.length > 0
          case 'aboutMe':
            return true
          case 'workstart':
          case 'workend':
            return value != ''
          case 'photo':
            return value != ''
          default:
          break;
        }
      }()
    }, [value]))
  })
    
  const style = {
    width: name == 'photo'?'fit-content':(isSmall?'85%':'100%'),
    marginBottom: 20,
    display: name == 'photo'?'flex':'',
    alignItems: name == 'photo'?'center':''
  }
  
  const textareaStyle = {
    width:'98.5%', 
    height:50, 
    fontFamily:'HelveticaNeue', 
    resize: 'none', 
    overflow: 'auto',
    fontSize:13,
    boxSizing: 'border-box',
    padding: 5
  }

  // To avoid error from destructuring undefined (other attributes for input
  // may or may not be passed)
  otherAtt = otherAtt ? otherAtt : {}
 
  const today = new Date()
  let endDay = useSelector(state => state.form[`workend_${index}`])
  let startDay = useSelector(state => state.form[`workstart_${index}`])
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

  //We dont want upload input element to have value attribute
  // if(name != 'photo')
    otherAtt.value = name != 'photo' ? value :''

  return (
    <div style={style}>
      <label htmlFor={name} style={{fontWeight:500, fontSize:14}}>{geoName}</label>
      <div style={{position:'relative', marginTop:4}}>
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
            style={textareaStyle}></textarea>
          :
          <Input type={type} name={name} id= {name} placeholder={placeholder}
            onChange={onChange} {...otherAtt} />
        }
        {
          name == 'photo' &&
          <UploadLabel htmlFor={name}>ატვირთვა</UploadLabel>
        }
      </div>
      {under && <label htmlFor={name} style={{fontSize:11, fontWeight:300}}>
        {under}</label>}
    </div>
  )
}

export default Field