import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom"
import Cv from './components/cv'
import { Strip } from './styles/styles'
import {FaChevronCircleLeft} from 'react-icons/fa'
import General from './components/General'
import Experiences from './components/Experiences'
import FormWrapper from './components/FormWrapper'
import Education from "./components/Education"
import { useEffect } from "react"

const Container = ({ children }) => (
  <div style={{ display: "flex", flexDirection: "row", height:"100vh" }}>
    {children}
  </div>
)

const Layout = ({ children }) => (
  <>
    <Strip style={{display: 'flex', justifyContent: 'center'}} flex={1}>
      <div style={{height:'fit-content', marginTop:'1em'}}>
        <FaChevronCircleLeft color='white' size='18'/>
      </div>
    </Strip>
    <Strip flex={6}>
      <FormWrapper>
        {children}
      </FormWrapper>
    </Strip>
    <Strip flex={5}>
      <Cv/>
    </Strip>
  </>
)

function NoMatch() {
  const navigate = useNavigate()
  useEffect(()=>{
    navigate('/0')
    
  })
  return null
}

const App = () => {

  return (
    <Router>
    <Container>
          <Routes>
          <Route exact path="/0" element={<h1>ZDAROVA</h1>} />
          <Route path="/1" element={<Layout><General/></Layout>} />
          <Route path="/2" element={<Layout><Experiences/></Layout>} />  
          <Route path="/3" element={<Layout><Education/></Layout>} />
          <Route path="/4" element={<Cv/>} />
          <Route path='*' element={<NoMatch/>}/>
          </Routes>
    </Container>
    </Router>
  )
}

export default App