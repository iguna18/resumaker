import {useState} from "react"
import { Input } from "../styles/styles"
import {Divider} from "../styles/styles"
import Field from "./Field";

const PHONE_REGEX = /^(\+995)(79\d{7}|5\d{8})$/ ;

export default () => {
  const nameFieldAtt = {
    name:'firstName', 
    geoName:'სახელი',
    under:'მინიმუმ 2 ასო, ქართული ასოები',
    isSmall:true,
    greensign:true
  }

  return (
    <>
      <div style={{width:'94%', display:'flex', flexDirection:'column'}}>
        <div style={{display:'flex'}}>
          <div style={{flex:1}}>
            <Field />
          </div>
          <div style={{flex:1}}>
            <Field geoName={'გვარი'} name={'lastName'} under={'მინიმუმ 2 ასო, ქართული ასოები'} greensign/>
          </div>
        </div>

        <Field type={'textfield'} geoName={'ჩემს შესახებ (არასავალდებულო)'}/>
        <Field type={'email'} geoName={'ელ-ფოსტა'} name='email' under={'უნდა მთავრდებოდეს @redberry.ge-ით'}
            greensign/>
        <Field type={'number'} geoName={'მობილურის ნომერი'} name={'number'}
          under={'უნდა აკმაყოფილებდეს ქართული მობილურის ნომრის ფორმატს'} greensign/>
      
      </div>
    </>
  )
}