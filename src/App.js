import logo from './logo.svg'
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"
import Cv from './components/cv'
import { Strip, Input } from './styles/styles'
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

const App = () => (
  <Router>
  <Container>
    <Strip style={{display: 'flex', justifyContent: 'center'}}>
      <div style={{height:'fit-content', marginTop:'1em'}}>
        <FaChevronCircleLeft color='white' size='18'/>
      </div>
    </Strip>
    <Strip wide>
      <FormWrapper>
        <Routes>
        <Route path="/1" element={<General/>} />
        <Route path="/2" element={<Experiences/>} />  
        <Route path="/3" element={<></>} />  
        </Routes>
      </FormWrapper>
    </Strip>
    <Strip/>
    <Strip wide>
      <Cv/>
    </Strip>
  </Container>
  </Router>
)

export default App