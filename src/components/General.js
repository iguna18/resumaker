import {useState} from "react"
import { Input } from "../styles/styles"
import styled from "styled-components"

const Validation = styled.div`
  position: absolute;
  color: ${props => props.err ? 'red' : 'green'};
  left: ${props => props.err ? '98%' : '98%'};
  top:0px
`
const Divider = styled.div`
  margin-bottom:'2em';
  margin-top:'0.3em'; 
  height:1;
  background-color:'black'
`
export default () => {
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setIsValid(event.target.value.slice(-12) == '@redberry.ge');
  };
  return (
    <>
    <div style={{display:'flex', justifyContent:'space-between', marginTop:'1em'}}>
    <div>პირადი ინფო</div>
    <div>1/3</div>
    </div>

    <form>
    <Validation>UDG</Validation>
    <label htmlFor="name">Name:</label>
    <div style={{position: 'relative'}}>
      <Validation>&#10003;</Validation>
      <Input type="text" id="name" name="name" placeholder='saxeli' />
    </div>
    <label htmlFor="email">Email:</label>
    <div style={{position: 'relative'}}>
      <Validation>&#10003;</Validation>
      <Validation err>&#10007;</Validation>
      <Input type="email" id="email" name="email"
        value={email}
        onChange={handleEmailChange}
        required/>
    </div>
    </form>
    
    </>
  )
}