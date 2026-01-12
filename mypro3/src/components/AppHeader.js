import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilEnvelopeOpen, cilList, cilMenu } from '@coreui/icons'
import { logo } from 'src/assets/brand/logo'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const AppHeader = () => {
  const [userName, setUserName] = useState('')
  const [userData, setUserData] = useState('')
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const nav = useNavigate()

  useEffect(() => {
    // setUserData(window.localStorage.getItem('mem_name'))
    let data = window.localStorage.getItem('mem_name')

    if (data == null) {
      //console.log('널처리')

      nav('/')
    } else {
      //console.log('낫널처리')
      setUserName(data)
    }
  }, [])

  //로그아웃기능
  function logOut() {
    window.localStorage.clear()
    // setUserName(null)
    window.location.href = '/'
  }
  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          {/* <CIcon icon={logo} height={48} alt="Logo" /> */}
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink to="/base" component={NavLink}>
              스마트인재개발원의 다양한 프로젝트를 검색해보세요
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <div style={{ float: 'right', right: 0 }}>
          {userName !== null ? userName + '님 환영합니다' : '로그인을 해주세요'}
        </div>
        {userName !== null ? (
          <div
            style={{ float: 'right', right: 0, marginLeft: '10px' }}
            onClick={logOut}
            type="button"
          >
            로그아웃
          </div>
        ) : (
          ''
        )}
      </CContainer>
      <CHeaderDivider />
      {/* <CContainer fluid>
        <AppBreadcrumb />
      </CContainer> */}
    </CHeader>
  )
}

export default AppHeader
