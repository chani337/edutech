import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

// routes config
import routes from '../routes'
import AddProject from 'src/views/pages/projectPage/AddProject'

const AppContent = () => {
  return (
    <CContainer lg>
      {/* <Suspense fallback={<div>Test123123</div>}> */}
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  // 구분값 받아서 props로 전달
                  element={
                    <route.element
                      pro_prize={route.pro_prize}
                      pro_type={route.pro_type}
                      dtype_num={route.dtype_num}
                    />
                  }
                />
              )
            )
          })}

          <Route path="/addproject" element={<AddProject />}></Route>
          <Route path="/" element={<Navigate to="base" replace />} />
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
