import React from 'react';
import {BsFillCompassFill, BsTelephoneFill} from 'react-icons/bs'
import colors, { CvDiv, Divider, Img } from '../styles/styles';
import {MdAlternateEmail} from 'react-icons/md'
import { useSelector } from 'react-redux';

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
              {state[`workstart_${i}`]} - {state[`workend_${i}`]}
            </span>
            <p>
              {state[`workdescription_${i}`]}
            </p>
          </div>
        )
      })          
      }
    </div>
  )
}
const Cv = () => {
  const state = useSelector(state=>state.form)
  const name = 
    ((state['firstName_0']?state['firstName_0']:'\xa0') + ' '
    + (state['lastName_0']?state['lastName_0']:'\xa0')).toUpperCase()

  const style = { 
    backgroundColor:"white", 
    display: "flex", 
    flexDirection: "column", 
    height:'100%',
    boxSizing: 'border-box',
    padding: "30px 60px",
    fontSize:'12px'
  }

  return (
    <div style={style}>
      <div style={{ flex: 1 }}>
        {state['photo_0'] && <Img src={state['photo_0']} alt="Uploaded Photo" />}
        <h1 style={{color:colors.HeadlineRed}}>
          {name}
        </h1>
        <p>
          <MdAlternateEmail style={{color:'gray', position:'relative', fontSize:18, top:3, marginRight:9}}/>
          <span style={{fontSize:13}}>{state['email_0']}</span>
        </p>
        <p>
          <BsTelephoneFill style={{color:'gray', position:'relative', fontSize:14, top:1, marginRight:12}}/>
          <span style={{fontSize:13}}>{state['number_0']}</span>
        </p>
        <h3 style={{color:colors.HeadlineRed}}>
          ᲩᲔᲛᲡ ᲨᲔᲡᲐᲮᲔᲑ
        </h3>
        <p>
          {state['aboutMe_0']}
        </p>
        <Divider verythin/>
        <h3 style={{color:colors.HeadlineRed}}>
          ᲒᲐᲛᲝᲪᲓᲘᲚᲔᲑᲐ
        </h3>
        <ExperienceSection state={state}/>
      </div>
      <div style={{ height: 50, marginTop:20 }}>
        <BsFillCompassFill color='red' size={20} />
      </div>
    </div>
  );
}

export default Cv;