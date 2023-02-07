import React from "react"
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Divider } from "../styles/styles"
import { increaseGroupCounter } from "../reducers/slices";
import { useDispatch, useSelector } from "react-redux";
import * as ExperiencesConstants from './ExperiencesConstants'
import * as GeneralConstants from './GeneralConstants'
import * as EducationConstants from './EducationConstants'

const onClickingForward = (dispatch, pageid, navigate, state) => (e) => {
  // dispatch(setField({fieldName:`page${pageid}Check`, fieldValue:true}))
  const consts = [GeneralConstants,ExperiencesConstants,EducationConstants].at(pageid-1)
  for(let key in consts) {
    const c = consts[key]
    const fieldName = c.name
    if(!state[`${fieldName}Validity`])
      return
  }
  navigate(`/${pageid + 1}`)
}

export default ({children}) => {
  const location = useLocation();
  const pageid = parseInt(location.pathname[1])
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const state = useSelector(state => state.form)

  return (

    <div style={{display:'flex', flexDirection:'column', height:'100%', justifyContent:'space-between'}}>
      <div>
        <div style={{width:'81%'}}>
          <div style={{display:'flex', justifyContent:'space-between', marginTop:'15px',width:''}}>
              <div>{['','პირადი ინფო', 'გამოცდილება', 'განათლება'].at(pageid)}</div>
              <div>{pageid}/3</div>
          </div>
          <Divider/>
        </div>
        <div style={{width:'80%'}}>{children}</div>
        <button onClick={()=>{
          dispatch(increaseGroupCounter({pageid}))
        }}>მეტის დამატება</button>
      </div>
      <div style={{width:'81%', display:'flex', justifyContent:'space-between', paddingBottom:'40px'}}>
          <Link to={`/${pageid-1}`}>
            <button>
              უკან
            </button>
          </Link>
          {/* <Link to={`/${pageid+1}`}> */}
            <button onClick={onClickingForward(dispatch, pageid, navigate, state)}>
              შემდეგი
            </button>
          {/* </Link> */}
      </div>
    </div>
  )
}