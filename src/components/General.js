import Field from "./Field";

export default () => {
  const nameFieldAtt = {
    type:'text',
    name:'firstName', 
    geoName:'სახელი',
    under:'მინიმუმ 2 ასო, ქართული ასოები',
    placeholder:'ანზორ',
    isSmall:true
  }
  const lastNameFieldAtt = {
    type:'text',
    name:'lastName', 
    geoName:'გვარი',
    placeholder:'მუმლაძე',
    under:'მინიმუმ 2 ასო, ქართული ასოები',
  }
  const aboutMeFieldAtt = {
    type:'textfield',
    name:'aboutMe', 
    geoName:'ჩემს შესახებ (არასავალდებულო)',
    placeholder:'ზოგადი ინფო შენს შესახებ',
    nogreensign:true
  }
  const emailFieldAtt = {
    type:'email',
    name:'email', 
    geoName:'ელ-ფოსტა',
    placeholder:'anzorr666@redberry.ge',
    under: 'უნდა მთავრდებოდეს @redberry.ge-ით',
  }
  const numberFieldAtt = {
    type:'number',
    name:'number', 
    geoName:'მობილურის ნომერი',
    placeholder:'+ 995 551 12 34 56',
    under: 'უნდა აკმაყოფილებდეს ქართული მობილურის ნომრის ფორმატს',
  }
  return (
    <>
      <div style={{width:'94%', display:'flex', flexDirection:'column'}}>
        <div style={{display:'flex'}}>
          <div style={{flex:1}}>
            <Field {...nameFieldAtt}/>
          </div>
          <div style={{flex:1}}>
            <Field {...lastNameFieldAtt}/>
          </div>
        </div>

        <Field {...aboutMeFieldAtt}/>
        <Field {...emailFieldAtt}/>
        <Field {...numberFieldAtt}/>
      
      </div>
    </>
  )
}