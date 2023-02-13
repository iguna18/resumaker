import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { refresh } from "../reducers/slices"
import { HomeButton, Strip } from "../styles/styles"
import Cv from "./Cv"
import FormWrapper from "./FormWrapper"

export const Layout = ({ children, degrees }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleClick = () => {
    dispatch(refresh({}))
    navigate('/')
  }

  return <>
    <Strip style={{display: 'flex', justifyContent: 'center'}} flex={1}>
      <HomeButton onClick={handleClick}>
        <div>
          {'<'}
        </div>
      </HomeButton>
    </Strip>
    <Strip flex={6}>
      <FormWrapper>
        {children}
      </FormWrapper>
    </Strip>
    <Strip flex={5}>
      <Cv degrees={degrees}/>
    </Strip>
  </>
}