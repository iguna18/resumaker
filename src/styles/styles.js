import styled from 'styled-components';


const colors = {
  HeadlineRed: '#f92e03',
  ButtonBlue: '#4461e3',
  ButtonHoverBlue: '#122680',
  SlightGray: '#f6f6f6',
  AshyBlue: '#62A1EB',
  Violet: '#6B40E3',
  InputGray: '#BCBCBC'
}
export default colors

export const Strip = styled.div`
  flex: ${props => props.flex};
  height:100%;
  background: ${colors.SlightGray};
  overflow-y: auto;
`
export const Input = styled.input`
  box-sizing: border-box; 
  padding: 5px;
  width: 100%; 
  font-family: "HelveticaNeue";
  font-size: 13px;
  margin-bottom: 2px;
  outline: none;
  border-radius: 3px;
  border: 1px solid;
  border-color: ${props => props.valueValidity?'lightgreen':colors.InputGray};
  &:focus {
    border-color:${colors.InputGray};
    border-width: 2px;
  }
  ${props => props.name === 'photo' && 
    `display: none;`
  }
  color:${props => props.type === "date" && 'gray'};
  ${props => props.type === "number" && `
    -webkit-appearance: none;
    margin: 0;
    -moz-appearance: textfield;
  `};
  ${props => props.name === "photo" && `
    margin-left:4px
  `};
  ${props => props.showErrors && !props.valueValidity && `
    border-color:red;
  ` }
`
export const Textarea = styled.textarea`
  width: 98.5%;
  height: 50px; 
  font-family:'HelveticaNeue';
  resize: none;
  overflow: auto;
  font-size: 13px;
  box-sizing: border-box;
  padding: 5px;
  outline: none;
  border-radius: 3px;
  border: 1px solid;
  border-color: ${props => props.valueValidity?'lightgreen':colors.InputGray};
  &:focus {
    border-color:${colors.InputGray};
    border-width: 2px;
  }
  ${props => props.showErrors && !props.valueValidity && `
    border-color:red;
  ` }
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
  ${props => props.verythin && `
    margin-bottom:15px;
  `}
  ${props => props.verythin && `
    margin-top:20px;
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
  background-color: ${colors.ButtonBlue};
  color: white;
  display: block;
  text-align: center;
  line-height: 22.5px;
  height: 25px;
  width: 110px;
  font-size: 14px;
  border-radius: 3.5px;
  margin-left: 10px;
  &:hover {
    background-color: ${colors.ButtonHoverBlue};
    cursor: pointer;
  }
`
export const Img = styled.img`
  float: right; 
  margin-left: 10px;
  margin-bottom: 5px;
  border-radius: 50%;
  width: 180px;
  height: 180px;
`

export const CvDiv = styled.div`
  background-color: 'red';
  display: "flex";
  flex-direction: "column"; 
  height:'100%';
  padding: "1em 60px"
`
export const Button = styled.button`
  background-color: ${colors.AshyBlue};
  border-width:0;
  color: ${colors.SlightGray};
  font-size: 14px;
  border-radius: 3px;
  font-family: 'Helvetica Neue';
  font-weight: 500;
  line-height: 21px;
  height: 35px;
  padding: 2px 4px;
  width: 250px;
  text-align: center;
  &:hover {
    background-color: ${colors.ButtonHoverBlue};
  }
  ${props => props.violet && `
    background-color: ${colors.Violet};
    width: 85px;
  `}
  ${props => props.longer && `
    width: 120px;
  `}
`
export const FieldLabel = styled.label`
  font-weight:500;
  font-size:13px;
  ${props => props.small && `
    font-size:11px;
    font-weight:300;
  `}
  ${props => !props.small && props.showErrors && !props.valueValidity && `
    color:red
  `}
`
export const Select = styled.select`
  box-sizing: border-box; 
  padding: 5px;
  width: 100%; 
  font-family: "HelveticaNeue";
  font-size: 12px;
  margin-bottom: 2px;
  outline: none;
  border-radius: 3px;
  border: 1px solid;
  background-color: white;
  color: ${props => props.value && props.value != 'default' ? 'black' : '#808080'};
  border-color: ${props => props.valueValidity?'lightgreen':colors.InputGray};
  &:focus {
    border-color:${colors.InputGray};
    border-width: 2px;
  }
  ${props => props.showErrors && !props.valueValidity && `
    border-color:red;
  ` }
`
export const Option = styled.option`
  font-family:'Helvetica Neue'
`