import { useEffect } from "react";
import styled from "styled-components"
import { Input } from "../styles/styles"
import { useDispatch, useSelector } from 'react-redux';
import { setField } from "../reducers/slices";

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

const Field = ({under, name, geoName, type, isSmall, nogreensign, otherAtt, placeholder}) => {
  let value = useSelector((state) => state['form'][name]);
  value = value? value : ''
  
  const dispatch = useDispatch();
  
  const onChange = (event) => {
    dispatch(setField({fieldName:name, fieldValue:event.target.value}))
  }

  useEffect(() => {

    dispatch(setField({
      fieldName:`${name}Validity`,
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
          default:
          break;
        }
      }()
    }, [value]))
  })
    
  const style = {
    width: isSmall?'90%':'100%'
  }
  
  // To avoid error from destructuring undefined (other attributes for input
  // may or may not be passed)
  // otherAtt = otherAtt ? otherAtt : {}
  return (
    <div style={style}>
      <label htmlFor={name}>{geoName}</label>
      <div style={{position:'relative'}}>
        {!nogreensign && <Validation>&#10003;</Validation>}
        <Validation err>&#10007;</Validation>
        <Input type={type} name={name} placeholder={placeholder}
          onChange={onChange} value={value} {...otherAtt}/>
      </div>
      {under && <label htmlFor="name" style={{fontSize:'0.5em'}}>{under}</label>}
    </div>
  )
}

export default Field