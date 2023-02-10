import React from "react"
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Divider } from "../styles/styles"
import { useDispatch, useSelector } from "react-redux"
import * as ExperiencesConstants from './ExperiencesConstants'
import * as GeneralConstants from './GeneralConstants'
import * as EducationConstants from './EducationConstants'
import { setField } from "../reducers/slices"

/**
 * Set flags for displaying errors for each field group and navigate to next page if 
 * there are no errors
 */
const onClickingForward = (dispatch, pageid, navigate, state) => (e) => {
  //Sets the flag for displaying error (incorrectly filled fields) s to true
  //Navigates to the next page only if all validity checks are met on current page
  const consts = [GeneralConstants,ExperiencesConstants,EducationConstants].at(pageid-1)
  const fieldsArray = Object.values(consts);
  const numberOfGroups = state[`page${pageid}FormCounter`]
  let erroredGroupCounter = 0
  for(let i=0; i<numberOfGroups; i++) {  //for each group of fields
    let atLeastOneFieldFilled = false
    //First group on page must be checked(treated as if it was partially filled)
    if(i == 0) {
      atLeastOneFieldFilled = true
    } else { //check if the group is touched
      for(const field of fieldsArray) {
        const fieldName = field.name
        if(state[`${fieldName}_${i}`]) {
          atLeastOneFieldFilled = true
          continue
        }
      }
    }

    if(!atLeastOneFieldFilled) {
      dispatch(setField({fieldName:`page${pageid}Group${i}Check`, fieldValue:false}))
      continue
    }

    //Mark this group if it has errors
    for(const field of fieldsArray) {
      const fieldName = field.name
      if(!state[`${fieldName}Validity_${i}`]) {
        dispatch(setField({fieldName:`page${pageid}Group${i}Check`, fieldValue:true}))
        erroredGroupCounter++
        continue
      }
    }
  }
  console.log(erroredGroupCounter);
  if(erroredGroupCounter == 0)
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
              <div style={{fontSize:18,  fontWeight:530}}>{['','ᲞᲘᲠᲐᲓᲘ ᲘᲜᲤᲝ', 'ᲒᲐᲛᲝᲪᲓᲘᲚᲔᲑᲐ', 'ᲒᲐᲜᲐᲗᲚᲔᲑᲐ'].at(pageid)}</div>
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