import { useNavigate } from "react-router-dom"
import { Button, Divider, WelcomeDiv } from "../styles/styles"

export const Welcome = () => {
  const navigate = useNavigate()
  return (
    <WelcomeDiv>
      <img src='/assets/logo2.png' style={{
        position:"absolute", display:'inline', zIndex:'0', left:'50%',top:'50%',
        transform:'translate(15%,-20%)', width:'220px'
      }}/>
      <div style={{width:'100%'}}>
        <img src='/assets/logo.svg' style={{height:'40px'}}></img>
        <Divider/>
      </div>
      <div style={{width:'100%', height:'100%', zIndex:'1'}}>
        <Button onClick={()=>navigate('/1')} style={{
          position:'absolute',left:'50%',top:'50%',
          transform:'translate(-50%,-50%)',
          backgroundColor:'#202020'
        }}>
          ᲠᲔᲖᲘᲣᲛᲔᲡ ᲓᲐᲛᲐᲢᲔᲑᲐ
        </Button>
      </div>
    </WelcomeDiv>
  )
}