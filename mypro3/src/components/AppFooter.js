import React from 'react'
import { CFooter } from '@coreui/react'
import { Link } from 'react-router-dom'

const AppFooter = () => {
  const linkStyle = {
    textDecoration: 'none',
    color: 'gray',
  }
  return (
    <CFooter>
      <div>
        <span className="policyFooter">
          <Link to="/private" style={linkStyle}>
            개인정보처리방침
          </Link>
        </span>
        <span className="policyFooter">
          <Link to="/terms" style={linkStyle}>
            이용약관
          </Link>
        </span>
      </div>
      <div>
        <span className="ms-1">&copy; Untitled. All rights reserved</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Developed by</span>
        <span>황해도,임명진,강예진,박수현,정형,임승환,정봉균</span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
