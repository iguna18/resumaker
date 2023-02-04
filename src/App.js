import logo from './logo.svg'
import './App.css'
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"
import Cv from './components/cv'
import { Strip } from './styles/styles'

const Container = ({ children }) => (
  <div style={{ display: "flex", flexDirection: "row", height:"100vh" }}>
    {children}
  </div>
)


const NotFoundPage = () => <div>404: Page Not Found</div>;

const App = () => (
  <Router>
  <Container>
    <Strip>
      {'<'}
    </Strip>
    <Strip wide>
      <Routes>
      <Route path="/generalinformation" element={
          <form>
          <label htmlFor="name">Name:</label>
          <br/>
          <input type="text" id="name" name="name"/>
          <br/>
          <label htmlFor="email">Email:</label>
          <br/>
          <input type="email" id="email" name="email"/>
          </form>
      } />
      <Route path="/experience" element={
          <form>
          <label htmlFor="position">position:</label>
          <br/>
          <input type="text" id="position" name="position"/>
          <br/>
          <label htmlFor="employer">employer:</label>
          <br/>
          <input type="text" id="employer" name="employer"/>
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