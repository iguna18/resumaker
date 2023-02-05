import styled from "styled-components"
import { Input } from "../styles/styles"

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

const Field = ({under, name, geoName, onChange, value, isRequired, type, isSmall, greensign}) => {
  const style = {
    width: isSmall?'90%':'100%'
  }
  
  return (
    <div style={style}>
      <label htmlFor={name}>{geoName}</label>
      <div style={{position:'relative'}}>
        {greensign && <Validation>&#10003;</Validation>}
        <Validation err>&#10007;</Validation>
        <Input type={type} name={name} placeholder={geoName} 
          onChange={onChange} value={value} required={isRequired}/>
      </div>
      {under && <label htmlFor="name" style={{fontSize:'0.5em'}}>{under}</label>}
    </div>
  )
}

export default Field