import styled from 'styled-components';

export const Strip = styled.div`
  flex: ${props => props.flex};
  height:100%;
  background: lightgray;
  overflow-y: auto;
`
export const Input = styled.input`
  /* box-sizing: border-box;  */
  /* padding: 10px */
  width: 100%; 
  ${props => props.type === "number" && `
    -webkit-appearance: none;
    margin: 0;
    -moz-appearance: textfield;
  `}  
`
export const Divider = styled.hr`
  margin-bottom:45px;
  margin-top:10px;
  border-top: 0.5px solid black;
`