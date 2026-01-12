/* eslint-disable react/prop-types */
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardText,
  CCol,
  CContainer,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React, { useState, useEffect } from 'react'
import { Nav } from 'react-bootstrap'
import axios from '../../../axios'
import DBConnectTab from './DBConnectTab'

const DBGeneralUser = () => {
  const [userInfo, setUserInfo] = useState(null)

  const db_info = [
    {
      name: 'Oracle',
      url: 'project-db-stu.ddns.net',
      port: '1524',
      color: 'danger',
      textColor: 'white',
    },
    {
      name: 'MySQL',
      url: 'project-db-stu.ddns.net',
      port: '3307',
      color: 'warning',
      textColor: 'white',
    },
    // { name: 'MySQL(캠퍼스)', url: 'project-db-stu2.ddns.net', port: '3308' },
    {
      name: 'Maria',
      url: 'project-db-stu2.ddns.net',
      port: '3307',
      color: 'success',
      textColor: 'white',
    },
  ]

  useEffect(() => {
    //서버에 데이터 전달 시
    // GET방식일 경우 -> params속성
    // Post방식일 경우 -> data속성
    axios({
      method: 'GET',
      url: '/project-smhrd/db/list',
      responseType: 'json',
      params: { email: 'general' },
    }).then((response) => {
      setUserInfo(response.data)
    })
  }, [])

  function TabContent(props) {
    if (props.selectTab === 0) {
      return (
        <CContainer>
          <CRow className="mb-3">
            <h1>DataBase 서버정보</h1>
            {db_info.map((item, index) => (
              <CCol key={index}>
                <CCard color={item.color} textColor={item.textColor}>
                  <CCardHeader>{item.name}</CCardHeader>
                  <CCardBody>
                    <CCardText>서버: {item.url}</CCardText>
                    <CCardText>포트번호: {item.port}</CCardText>
                  </CCardBody>
                </CCard>
              </CCol>
            ))}
          </CRow>
          <CRow className="mb-3">
            <h1>DataBase 계정발급 신청현황</h1>
            <CTable bordered>
              <CTableHead>
                <CTableRow color="info" style={{ textAlign: 'center' }}>
                  <CTableHeaderCell scope="col">DB계정</CTableHeaderCell>
                  <CTableHeaderCell scope="col">비밀번호</CTableHeaderCell>
                  <CTableHeaderCell scope="col">DB종류</CTableHeaderCell>
                  <CTableHeaderCell scope="col">프로젝트종류</CTableHeaderCell>
                  <CTableHeaderCell scope="col">승인여부</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {userInfo &&
                  userInfo.map((item, index) => (
                    <CTableRow style={{ textAlign: 'center' }} key={index}>
                      <CTableDataCell>{item.db_user}</CTableDataCell>
                      <CTableDataCell>{item.db_pw}</CTableDataCell>
                      <CTableDataCell>{item.db_type}</CTableDataCell>
                      <CTableDataCell>{item.pro_ctg_name}</CTableDataCell>
                      <CTableDataCell>{item.accept}</CTableDataCell>
                    </CTableRow>
                  ))}
              </CTableBody>
            </CTable>
          </CRow>
        </CContainer>
      )
    } else if (props.selectTab === 1) {
      return (
        <CContainer>
          <CRow className="mb-3">
            <DBConnectTab></DBConnectTab>
          </CRow>
        </CContainer>
      )
    }
  }

  const [tab, setTab] = useState(0)

  return (
    <>
      <Nav className="mt-5 mb-3" variant="tabs" defaultActiveKey="link-0" id="nav_style">
        <Nav.Item>
          <Nav.Link
            eventKey="link-0"
            onClick={() => {
              setTab(0)
            }}
          >
            DB정보 및 신청현황
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-1"
            onClick={() => {
              setTab(1)
            }}
          >
            DB연결방법
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent selectTab={tab}></TabContent>
    </>
  )
}

export default DBGeneralUser
