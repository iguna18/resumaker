import styled from 'styled-components';

export const Strip = styled.div`
  flex: ${props => props.wide?5:1};
  height:100%;
  background: lightgray;
  overflow-y: auto;
`
export const Input = styled.input`
  width: 100%; 
  box-sizing: border-box; 
  padding: 10px
`