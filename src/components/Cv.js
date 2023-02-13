import React, { useEffect, useState } from 'react';
import {BsFillCompassFill, BsTelephoneFill} from 'react-icons/bs'
import colors, { Description, Divider, Img, StyledH1 } from '../styles/styles';
import {MdAlternateEmail} from 'react-icons/md'
import { useSelector } from 'react-redux';
import * as ExperiencesConstants from './ExperiencesConstants'
import * as EducationConstants from './EducationConstants'

const EducationSection = ({state, degrees}) => {
  return (
    <div>
      {
      Array.from({length:state['page3FormCounter']}).map((_,i) => {
        const place = 
          (state[`school_${i}`]?state[`school_${i}`]:'') 
          + (state[`degree_${i}`] && state[`degree_${i}`] > 0 ? (', '
          + degrees[parseInt(state[`degree_${i}`])-1].title) :'')
        
        return (
          <div key = {i}>
            <p style={{fontWeight:500}}>
              {place}
            </p>
            <span style={{fontStyle:'oblique', color:'grey' }}>
            {state[`schoolend_${i}`] ? state[`schoolend_${i}`]: '\xa0'}
            </span>
            <Description> 
              <p>
              {state[`schooldescription_${i}`]}
              </p>
            </Description>
          </div>
        )
      })          
      }
    </div>
  )
}

const ExperienceSection = ({state}) => {
  return (
    <div>
      {
      Array.from({length:state['page2FormCounter']}).map((_,i) => {
        const place = 
          (state[`position_${i}`]?state[`position_${i}`]:'') 
          + (state[`employer_${i}`]? (', '+state[`employer_${i}`]) :'')
        
        return (
          <div key = {i}>
            <p style={{fontWeight:500}}>
              {place}
            </p>
            <span style={{fontStyle:'oblique', color:'grey' }}>
            { 
              state[`workstart_${i}`] || state[`workend_${i}`] ?
              state[`workstart_${i}`] +' - '+ state[`workend_${i}`]
              : '\xa0'
            }
            </span>
            <Description>
              <p>
              {state[`workdescription_${i}`]}
              </p>
            </Description>
          </div>
        )
      })          
      }
    </div>
  )
}
const Cv = ({degrees}) => {
  const state = useSelector(state=>state.form)
  const name = 
    ((state['firstName_0']?state['firstName_0']:'\xa0') + ' '
    + (state['lastName_0']?state['lastName_0']:'\xa0')).toUpperCase()

  const style = { 
    // maxWidth:'100%',
    backgroundColor:"white", 
    display: "flex", 
    flexDirection: "column",
    minHeight: '100%',
    height:'fit-content',
    boxSizing: 'border-box',
    padding: "30px 60px",
    fontSize:'12px'
  }
  
  let showExperiences = false
  const numberOfExperienceGroups = state[`page${2}FormCounter`]
  for(let i=0; i<numberOfExperienceGroups; i++) {  //for each group of fields
    for(const field of Object.values(ExperiencesConstants)) {
      if(state[`${field.name}_${i}`]) {
        showExperiences = true
        break
      }
    }
    if(showExperiences)break
  }
  let showEducations = false
  const numberOfEducationGroups = state[`page${3}FormCounter`]
  for(let i=0; i<numberOfEducationGroups; i++) {  
    for(const field of Object.values(EducationConstants)) {
      if(state[`${field.name}_${i}`]) {
        showEducations = true
        break
      }
    }
    if(showEducations)break
  }
  return (
    <div style={style}>
      <div style={{ flex: 1 }}>
        {state['photo_0'] && <Img src={state['photo_0']} alt="Uploaded Photo" />}
        <StyledH1 text={state['firstName_0']}>
          {name}
        </StyledH1>
        <p style={{display:state['email_0']?'':'none'}}>
          <MdAlternateEmail style={{color:'gray', position:'relative', fontSize:18, top:3, marginRight:9}}/>
          <span style={{fontSize:13}}>{state['email_0']}</span>
        </p>
        <p style={{display:state['number_0']?'':'none'}}>
          <BsTelephoneFill style={{color:'gray', position:'relative', fontSize:14, top:1, marginRight:12}}/>
          <span style={{fontSize:13}}>{state['number_0']}</span>
        </p>
        <h3 style={{color:colors.HeadlineRed, display:state['aboutMe_0']?'':'none'}}>
          ᲩᲔᲛᲡ ᲨᲔᲡᲐᲮᲔᲑ
        </h3>
        <p>
          {state['aboutMe_0']}
        </p>
        {(showExperiences || showEducations) && <Divider verythin/>}
        
        <h3 style={{color:colors.HeadlineRed, display:showExperiences?'':'none'}}>
          ᲒᲐᲛᲝᲪᲓᲘᲚᲔᲑᲐ
        </h3>
        <ExperienceSection state={state}/>
        <h3 style={{color:colors.HeadlineRed, display:showEducations?'':'none'}}>
          ᲒᲐᲜᲐᲗᲚᲔᲑᲐ
        </h3>
        <EducationSection state={state} degrees={degrees}/>
      </div>
      <div style={{ height: 50, marginTop:20 }}>
        <BsFillCompassFill color='red' size={20} />
      </div>
    </div>
  );
}

export default Cv;