import styled from "styled-components"
import { Input } from "../styles/styles"
import { useDispatch, useSelector } from 'react-redux';
import { updateField } from "../reducers/slices";
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

const Field = ({under, name, geoName, type, isSmall, greensign, otherAtt}) => {
  const value = useSelector((state) => state[name]);
  const dispatch = useDispatch();
  const onChange = (event) => {
    dispatch(updateField({fieldName:name, value:event.target.value}));
  };
  const style = {
    width: isSmall?'90%':'100%'
  }
  
  // To avoid error from destructuring undefined (other attributes for input
  // may or may not be passed)
  const otherAtt = otherAtt ? otherAtt : {}
  return (
    <div style={style}>
      <label htmlFor={name}>{geoName}</label>
      <div style={{position:'relative'}}>
        {greensign && <Validation>&#10003;</Validation>}
        <Validation err>&#10007;</Validation>
        <Input type={type} name={name} placeholder={geoName}
               onChange={onChange} value={value} {...otherAtt}/>
      </div>
      {under && <label htmlFor="name" style={{fontSize:'0.5em'}}>{under}</label>}
    </div>
  )
}

export default Field