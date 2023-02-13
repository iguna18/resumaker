import { useEffect } from "react";
import { Input, UploadLabel, Validation, Textarea, FieldLabel, Select, Option } from "../styles/styles"
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
    if(name != 'photo') {
      dispatch(setField(
        {
          fieldName:`${name}_${index}`, 
          fieldValue:event.target.value,
          localStorageFlag:true
        }))
    } else {
      const reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
      reader.onload = (e) => {
        dispatch(setField(
          {
            fieldName:'photo_0',
            fieldValue:e.target.result,
            localStorageFlag:true
          }
        ))
      }
      // dispatch(setField(
      // {
      //   fieldName:'photo_0',
      //   fieldValue:URL.createObjectURL(event.target.files[0])
      //   // fieldValue:event.target.files[0]
      // }
      // ))
    }
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
            return value.length > 12 && value.slice(-12) == '@redberry.ge'
          case 'position':
          case 'employer':
          case 'school':
            return value.length >= 2
          case 'workdescription':
          case 'schooldescription':
            return value.length > 0
          case 'aboutMe':
            return true
          case 'workstart':
          case 'workend':
          case 'schoolend':
            return value != ''
          case 'photo':
            return value != ''
          case 'degree':
            return value && value != 0
          default:
          break;
        }
      }(),
      localStorageFlag:true
    }, [value]))
  })
    
  const style = {
    width: name == 'photo'?'fit-content':(isSmall?'85%':'100%'),
    marginBottom: 20,
    display: name == 'photo'?'flex':'',
    alignItems: name == 'photo'?'center':''
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
  otherAtt.value = name != 'photo' ? value :''
  otherAtt.valueValidity=valueValidity
  otherAtt.showErrors=showErrors
  return (
    <div style={style}>
      <FieldLabel htmlFor={name} showErrors={showErrors} valueValidity={valueValidity}>
        {geoName}</FieldLabel>
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
          <Textarea name={name} placeholder={placeholder} id={name}
            onChange={onChange} value={value} {...otherAtt}/>
          : ( 
            name == 'degree' ? 
            <Select value={value} onChange={onChange} name={name} id={name}
              valueValidity={valueValidity} showErrors={showErrors}>
              <Option value={0}>აირჩიეთ ხარისხი</Option>
              {
                otherAtt.degrees.map(d=>(
                  <Option style={{fontFamily:'Helvetica Neue'}} key={d.id} value={d.id}>
                    {d.title}</Option>
                ))
              }
            </Select>
            : 
            <Input type={type} name={name} id= {name} placeholder={placeholder}
              onChange={onChange} {...otherAtt}/>
          )
        }
        {
          name == 'photo' &&
          <UploadLabel htmlFor={name}>ატვირთვა</UploadLabel>
        }
      </div>
      {under && <FieldLabel small htmlFor={name}>
        {under}</FieldLabel>}
    </div>
  )
}

export default Field