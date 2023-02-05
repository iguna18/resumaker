import {useState} from "react"
import { Input } from "../styles/styles"
import {Divider} from "../styles/styles"
import Field from "./Field";

const PHONE_REGEX = /^(\+995)(79\d{7}|5\d{8})$/ ;

export default () => {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);

  const [number, setNumber] = useState("");
  const [isValidNumber, setIsValidNumber] = useState(false);

  const handleNumberChange = (event) => {
    setNumber(event.target.value)
    setIsValidNumber(PHONE_REGEX.test(number));
  };


  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setIsValidEmail(event.target.value.slice(-12) == '@redberry.ge');
  };
  return (
    <>
      <div style={{width:'94%', display:'flex', flexDirection:'column'}}>
        <div style={{display:'flex'}}>
          <div style={{flex:1}}>
            <Field geoName={'სახელი'} name={'firstName'} under={'მინიმუმ 2 ასო, ქართული ასოები'} isSmall greensign/>
          </div>
          <div style={{flex:1}}>
            <Field geoName={'გვარი'} name={'lastName'} under={'მინიმუმ 2 ასო, ქართული ასოები'} greensign/>
          </div>
        </div>

        <Field geoName={'ჩემს შესახებ (არასავალდებულო)'} type={'textfield'}/>
        <Field geoName={'ელ-ფოსტა'} name='email' under={'უნდა მთავრდებოდეს @redberry.ge-ით'}
          onChange={handleEmailChange} value={email} type={'email'} isRequired greensign/>
        <Field geoName={'მობილურის ნომერი'} type={'number'} name={'number'}
          onChange={handleNumberChange} value={number}
          under={'უნდა აკმაყოფილებდეს ქართული მობილურის ნომრის ფორმატს'} greensign/>
      
      </div>
    </>
  )
}