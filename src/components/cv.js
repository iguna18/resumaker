import React from 'react';
import {BsFillCompassFill, BsTelephoneFill} from 'react-icons/bs'
import colors, { Divider } from '../styles/styles';
import {MdAlternateEmail} from 'react-icons/md'
import { useSelector } from 'react-redux';
import { Img } from '../styles/styles';

const Cv = () => {
  const state = useSelector(state=>state.form)
  const name = 
    ((state['firstName_0']?state['firstName_0']:'\xa0') + ' '
    + (state['lastName_0']?state['lastName_0']:'\xa0')).toUpperCase()

  return (
    <div style={{ backgroundColor:"white", display: "flex", flexDirection: "column", height:'100%',
                    padding: "1em 60px"}}>
      <div style={{ flex: 1 }}>
        {state['photo_0'] && <Img src={state['photo_0']} alt="Uploaded Photo" />}
        <h1 style={{color:colors.HeadlineRed}}>
          {name}
        </h1>
        <p>
          <MdAlternateEmail style={{color:'gray', position:'relative', fontSize:18, top:3, marginRight:9}}/>
          <span>{state['email_0']}</span>
        </p>
        <p>
          <BsTelephoneFill style={{color:'gray', position:'relative', fontSize:14, top:1, marginRight:12}}/>
          <span>{state['number_0']}</span>
        </p>
        <h3 style={{color:colors.HeadlineRed}}>
          ᲩᲔᲛᲡ ᲨᲔᲡᲐᲮᲔᲑ
        </h3>
        <p>
          {state['aboutMe_0']}
        </p>
        <Divider thin/>
        <h3 style={{color:colors.HeadlineRed}}>
          ᲒᲐᲛᲝᲪᲓᲘᲚᲔᲑᲐ
        </h3>
      </div>
      {/* <div style={{ flex: 1 }}>Part 2</div> */}
      <div style={{ height: 50, marginTop:20 }}>
        <BsFillCompassFill color='red' size={20} />
      </div>
    </div>
  );
}

export default Cv;