import React, { Component, Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
import { ToastContainer, toast } from 'react-custom-alert'
import { ClipLoader } from 'react-spinners'
import PrivatePolicy from './components/PrivatePolicy'
import TermsPolicy from './components/TermsPolicy'

export const ProjectContext = React.createContext()

const override = {
  display: 'flex',
  margin: '0 auto',
  borderColor: 'blue',
  textAlign: 'center',
}
// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))
//요것은 Test 입니당2!

// Pages

const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

class App extends Component {
  state = {
    proTotalCnt: 0,
    proTotalData: [],
  }

  //
  render() {
    return (
      <ProjectContext.Provider value={{ state: this.state, setState: this.setState }}>
        <Router>
          <ToastContainer floatingTime={800} />
          <Suspense fallback={loading}>
            <Routes>
              <Route path="/base/*" name="Base" element={<DefaultLayout />} />
              <Route path="/erro" name="Erro" element={<Page404></Page404>}></Route>
              <Route exact path="/register" name="Register Page" element={<Register />} />

              <Route exact path="/500" name="Page 500" element={<Page500 />} />
              <Route path="/private" element={<PrivatePolicy />} />
              <Route path="/terms" element={<TermsPolicy />} />
              <Route path="/" name="Home" element={<Login />} />
              <Route exact path="*" name="Page 404" element={<Page404 />} />
            </Routes>
          </Suspense>
        </Router>
      </ProjectContext.Provider>
    )
  }
}

export default App
