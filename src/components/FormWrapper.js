import React from "react"
import { useLocation, Link } from 'react-router-dom';
import { Divider } from "../styles/styles";

export default ({children}) => {
  const location = useLocation();
  const pageid = parseInt(location.pathname[1])
  return (

    <div style={{display:'flex', flexDirection:'column', height:'100%', justifyContent:'space-between'}}>
      <div>
        <div style={{display:'flex', justifyContent:'space-between', marginTop:'1em'}}>
            <div>{['','პირადი ინფო', 'გამოცდილება', 'განათლება'].at(pageid)}</div>
            <div>{pageid}/3</div>
        </div>
        <Divider/>
        <div>{children}</div>
      </div>
      <div style={{display:'flex', justifyContent:'space-between', paddingBottom:'40px'}}>
          <Link to={`/${pageid-1}`}>
            <button>
              უკან
            </button>
          </Link>
          <Link to={`/${pageid+1}`}>
            <button>
              შემდეგი
            </button>
          </Link>
      </div>
    </div>
  )
}