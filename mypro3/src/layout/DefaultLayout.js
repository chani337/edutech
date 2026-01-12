import React, { Suspense, useEffect, useState, createContext } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { useNavigate, useLocation } from 'react-router-dom'
import { Provider } from 'react-redux'

export const LodingConText = createContext()

const DefaultLayout = () => {
  const [loding, setloding] = useState(true)
  const nav = useNavigate()

  useEffect(function () {
    if (window.localStorage.getItem('mem_name') == null) {
      nav('/')
    }
  }, [])
  // const location = useLocation()

  // useEffect(
  //   function () {
  //     console.log(location)
  //   },
  //   [location],
  // )

  return (
    <div>
      <LodingConText.Provider value={{ loding, setloding }}>
        <AppSidebar />
        <div className="wrapper d-flex flex-column min-vh-100 bg-light" id="div-bg">
          <AppHeader />
          <div className="body flex-grow-1 px-3">
            <AppContent></AppContent>
          </div>
          <AppFooter />
        </div>
      </LodingConText.Provider>
    </div>
  )
}

export default DefaultLayout
