import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { refresh } from "../reducers/slices"
import { HomeButton, PopUp, Strip, StyledLastPage } from "../styles/styles"



export const LastPage = ({ children, degrees }) => {
  const [popup, setpopup] = useState(true)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleClick = () => {
    dispatch(refresh({}))
    navigate('/')
  }
  useEffect(()=>{
    setpopup(true)
  },[])

  return (
    <StyledLastPage>
      <div style={{  position:'relative', display: 'inline', left :'50px'}}>
        <HomeButton onClick={() => {
            dispatch(refresh({}))
            navigate('/')
          }}>
          <span style={{position:'relative', left:'9px', top:'2px', fontWeight:450}}>{'<'}</span>
        </HomeButton>
      </div>
      <div className='cont'>
        <div className="popup" style={{visibility:popup?'visible':'hidden'}}>
          <div className='x' onClick={()=>setpopup(false)}>x</div>
          <span>რეზიუმე წარმატებით გაიგზავნა 🎉 </span>
        </div>
        <div className='cvcontainer'>
          {children}
        </div>
      </div>
    </StyledLastPage>

  )

}