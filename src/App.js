import logo from './logo.svg'
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"
import Cv from './components/cv'
import { Strip, Input } from './styles/styles'
import {FaChevronCircleLeft} from 'react-icons/fa'
import General from './components/General'



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
      <Routes>
      <Route path="/generalinformation" element={<General/>} />
      <Route path="/experience" element={
          <form>
          <label htmlFor="position">position:</label>
          <br/>
          <Input type="text" id="position" name="position"/>
          <br/>
          <label htmlFor="employer">employer:</label>
          <br/>
          <Input type="text" id="employer" name="employer"/>
          </form>
      } />  
      </Routes>
    </Strip>
    <Strip/>
    <Strip wide>
      <Cv/>
    </Strip>
  </Container>
  </Router>
)

export default App