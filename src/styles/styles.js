import styled from 'styled-components';

export const Strip = styled.div`
  flex: ${props => props.flex};
  height:100%;
  background: #f6f6f6;
  overflow-y: auto;
`
export const Input = styled.input`
  box-sizing: border-box; 
  padding: 5px;
  width: 100%; 
  font-family: "HelveticaNeue";
  font-size: "16px";
  margin-bottom: 2px;
  color:${props => props.type === "date" && 'gray'};
  ${props => props.type === "number" && `
    -webkit-appearance: none;
    margin: 0;
    -moz-appearance: textfield;
  `};
  ${props => props.name === "photo" && `
    margin-left:4px
  `};
`
export const Divider = styled.hr`
  margin-bottom:50px;
  margin-top:5px;
  border-top:2px;
  ${props => props.thin && `
    margin-bottom:25px;
  `}
  ${props => props.thin && `
    margin-top:30px;
  `}
  ${props => props.thin && `
    border-top:0.5px;
  `}
`
export const Validation = styled.div`
  position: absolute;
  color: ${props => props.err ? 'red' : 'green'};
  left: 100%;
  top: 50%;

  transform: translate(
    ${props => props.err ? '10px' : '-10px'},
    -50%
  );
`

export const UploadLabel = styled.label`
  background-color: #4461e3;
  color: white;
`