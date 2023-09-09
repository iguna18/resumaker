import React from "react"
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Divider, Button } from "../styles/styles"
import { useDispatch, useSelector } from "react-redux"
import * as ExperiencesConstants from './ExperiencesConstants'
import * as GeneralConstants from './GeneralConstants'
import * as EducationConstants from './EducationConstants'
import { setField } from "../reducers/slices"
import services from '../services/services'
const handleFinish = (state, navigate) => {
  let resume = {
    name: 'карл йонсон',//state['firstName_0'],
    surname: state['lastName_0'],
    email: state['email_0'],
    phone_number: state['number_0'],
    experiences: [],
    educations: [],
    image: state['photo_0'].split(',')[1],
    about_me: state['aboutMe_0'] ? state['aboutMe_0'] : null
  }
  console.log(state['photo_0'])
  const fd = new FormData();
  fd.append('name', state['firstName_0'])
  fd.append('surname', state['lastName_0'])
  fd.append('email', state['email_0'])
  fd.append('phone_number', state['number_0'])
  const base64Data = state['photo_0'].split(",")[1];
  const binaryData = new Uint8Array(atob(base64Data).split('').map(char => char.charCodeAt(0)));
  const blob = new Blob([binaryData], { type: "image/png" });

  fd.append('image', blob, 'image.png')
  fd.append('about_me', state['aboutMe_0'] ? state['aboutMe_0'] : null)
  
  // const exp = []
  for (let i = 0; i < state['page2FormCounter']; i++) {
    resume.experiences.push({
      position:state[`position_${i}`],
      employer:state[`employer_${i}`],
      start_date:(state[`workstart_${i}`] || '').replaceAll('-','/'),
      due_date:(state[`workend_${i}`] || '').replaceAll('-','/'),
      description:state[`workdescription_${i}`]
    })
  }
  // fd.append('experiences', JSON.stringify(exp))
  // const edu = []
  for (let i = 0; i < state['page3FormCounter']; i++) {
    resume.educations.push({
      institute:state[`school_${i}`],
      degree_id:parseInt((state[`degree_${i}`] || '1')),
      due_date:(state[`schoolend_${i}`] || '').replaceAll('-','/'),
      description:state[`schooldescription_${i}`]
    })
  }
  // fd.append('educations', JSON.stringify(edu))
  services.uploadResume(fd)
    .then(responsedata => {
      console.log('\nuploaddddd\n');
      const blob = new Blob([responsedata], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "generated.pdf";
      a.click();

      URL.revokeObjectURL(url);
    }).catch(err => {
      navigate(`/${4}`)
      console.log(err.response.data)
      console.log(err)
      console.error("Error generating or downloading PDF:", err)
    })
}


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
      dispatch(setField({fieldName:`page${pageid}Group${i}Check`, fieldValue:false, localStorageFlag:true}))
      continue
    }

    //Mark this group if it has errors
    for(const field of fieldsArray) {
      const fieldName = field.name
      if(!state[`${fieldName}Validity_${i}`]) {
        dispatch(setField({fieldName:`page${pageid}Group${i}Check`, fieldValue:true, localStorageFlag:true}))
        erroredGroupCounter++
        continue
      }
    }
  }
  if(erroredGroupCounter == 0) {
    navigate(`/${pageid + 1}`)
    if(pageid == 3) 
      handleFinish(state, navigate)
  }
}

const onClickingMore = (dispatch, pageid, state) => (e) => {
  //Increases the counter for how many times should the current page's form
  //be displayed
  dispatch(setField({fieldName:`page${pageid}FormCounter`, 
  fieldValue:state[`page${pageid}FormCounter`] + 1, localStorageFlag:true}))
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
          <div style={{display:'flex', justifyContent:'space-between', marginTop:'30px',width:''}}>
              <div style={{fontSize:18,  fontWeight:530}}>{['','ᲞᲘᲠᲐᲓᲘ ᲘᲜᲤᲝ', 'ᲒᲐᲛᲝᲪᲓᲘᲚᲔᲑᲐ', 'ᲒᲐᲜᲐᲗᲚᲔᲑᲐ'].at(pageid)}</div>
              <div>{pageid}/3</div>
          </div>
          <Divider/>
        </div>
        <div style={{width:'80%'}}>{children}</div>
        {
          pageid != 1 &&
          <Button onClick={onClickingMore(dispatch, pageid, state )}>
            {['','','მეტი გამოცდილების დამატება','სხვა სასწავლებლის დამატება'].at(pageid)}
          </Button>
        }
      </div>
      <div style={{width:'81%', display:'flex', justifyContent:'space-between', marginTop:'60px', paddingBottom:'40px'}}>
        <div>
        {
          pageid != 1 &&
          <Link to={`/${pageid-1}`}>
            <Button violet>
              ᲣᲙᲐᲜ
            </Button>
          </Link>
        }
        </div>
        <Button violet longer onClick={onClickingForward(dispatch, pageid, navigate, state)}>
          {pageid==3 ?'ᲓᲐᲡᲠᲣᲚᲔᲑᲐ':'ᲨᲔᲛᲓᲔᲒᲘ'}
        </Button>
      </div>
    </div>
  )
}