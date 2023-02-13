import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom"
import Cv from './components/Cv'
import General from './components/General'
import Experiences from './components/Experiences'
import Education from "./components/Education"
import { useEffect, useState } from "react"
import { refresh, setField } from "./reducers/slices"
import { useDispatch } from "react-redux"
import { Layout } from "./components/Layout"
import { Welcome } from "./components/Welcome"
import { LastPage } from "./components/LastPage"

const Container = ({ children }) => (
  <div style={{ display: "flex", flexDirection: "row", height:"100vh" }}>
    {children}
  </div>
)

function NoMatch() {
  const navigate = useNavigate()
  useEffect(()=>{
    navigate('/0')
    
  })
  return null
}


const App = () => {
  const dispatch = useDispatch()
  const [degrees, setDegrees] = useState([])

  useEffect(()=>{
    for(let i=0; i<localStorage.length; i++){
      const key = localStorage.key(i)
      if(!key.startsWith('resumaker_')) continue

      dispatch(setField({
          fieldName:key.slice(10),
          fieldValue:localStorage.getItem(key), 
          localStorageFlag:false
        })
      )
    }
    if(localStorage.getItem('degrees'))
      setDegrees(JSON.parse(localStorage.getItem('degrees')))
    
      // return () => {
      //   dispatch(refresh({}))
      //   localStorage.removeItem('degrees')
      // }
  },[])

  return (
    <Router>
    <Container>
          <Routes>
          <Route exact path="/0" element={<Welcome/>} />
          <Route path="/1" element={<Layout degrees={degrees}><General/></Layout>} />
          <Route path="/2" element={<Layout degrees={degrees}><Experiences/></Layout>} />  
          <Route path="/3" element={<Layout degrees={degrees}><Education degrees={degrees} setDegrees={setDegrees}/></Layout>} />
          <Route path="/4" element={<LastPage><Cv degrees={degrees}/></LastPage>} />
          <Route path='*' element={<NoMatch/>}/>
          </Routes>
    </Container>
    </Router>
  )
}

export default App