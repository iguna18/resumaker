import { useNavigate } from "react-router-dom"
import { Button, Divider, WelcomeDiv } from "../styles/styles"
// import wallpaper from '/assets/wallpaper.jpg'

// const style = {
//   width: '100',
//   height: '300px',
//   backgroundImage: `url('/assets/wallpaper.jpg')`,
//   backgroundRepeat: 'no-repeat',
//   backgroundSize: 'cover'
// };

export const Welcome = () => {
  const navigate = useNavigate()
  return (
    <WelcomeDiv>
      <div style={{width:'100%'}}>

      <img src='/assets/logo.svg' style={{height:'40px'}}></img>
      <Divider/>
      </div>
      <div style={{width:'100%', height:'100%'}}>
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