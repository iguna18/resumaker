import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"
import Cv from './components/cv'
import { Strip } from './styles/styles'
import {FaChevronCircleLeft} from 'react-icons/fa'
import General from './components/General'
import Experiences from './components/Experiences'
import FormWrapper from './components/FormWrapper'
const Container = ({ children }) => (
  <div style={{ display: "flex", flexDirection: "row", height:"100vh" }}>
    {children}
  </div>
)


const NotFoundPage = () => <div>404: Page Not Found</div>;

const App = () => {

    
  return (
    <Router>
    <Container>
      <Strip style={{display: 'flex', justifyContent: 'center'}} flex={1}>
        <div style={{height:'fit-content', marginTop:'1em'}}>
          <FaChevronCircleLeft color='white' size='18'/>
        </div>
      </Strip>
      <Strip flex={6}>
        <FormWrapper>
          <Routes>
          {/* <Route path="/1" element={<General/>} /> */}
          <Route path="/2" element={<Experiences/>} />  
          <Route path="/3" element={<></>} />  
          </Routes>
        </FormWrapper>
      </Strip>
      {/* <Strip/> */}
      <Strip flex={5}>
        <Cv/>
      </Strip>
    </Container>
    </Router>
  )
}

export default App