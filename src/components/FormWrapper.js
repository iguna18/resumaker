import React from "react"
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Divider } from "../styles/styles"
import { useDispatch, useSelector } from "react-redux"
import * as ExperiencesConstants from './ExperiencesConstants'
import * as GeneralConstants from './GeneralConstants'
import * as EducationConstants from './EducationConstants'
import { setField } from "../reducers/slices"


const onClickingForward = (dispatch, pageid, navigate, state) => (e) => {
  //Sets the flag for displaying error (incorrectly filled fields) s to true
  dispatch(setField({fieldName:`page${pageid}Check`, fieldValue:true}))
  //Navigates to the next page only if all validity checks are met on current page
  const consts = [GeneralConstants,ExperiencesConstants,EducationConstants].at(pageid-1)
  for(let key in consts) {
    const c = consts[key]
    const fieldName = c.name
    for(let i=0; i<state[`page${pageid}FormCounter`]; i++) {
      if(!state[`${fieldName}Validity_${i}`])
        return
    }
  }

  navigate(`/${pageid + 1}`)
}

const onClickingMore = (dispatch, pageid, state) => (e) => {
  //Increases the counter for how many times should the current page's form
  //be displayed
  dispatch(setField({fieldName:`page${pageid}FormCounter`, 
  fieldValue:state[`page${pageid}FormCounter`] + 1}))
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
        {
          pageid != 1 &&
          <button onClick={onClickingMore(dispatch, pageid, state)}>მეტის დამატება</button>
        }
      </div>
      <div style={{width:'81%', display:'flex', justifyContent:'space-between', paddingBottom:'40px'}}>
        <div>
        {
          pageid != 1 &&
          <Link to={`/${pageid-1}`}>
            <button>
              უკან
            </button>
          </Link>
        }
        </div>
        <button onClick={onClickingForward(dispatch, pageid, navigate, state)}>
          შემდეგი
        </button>
      </div>
    </div>
  )
}