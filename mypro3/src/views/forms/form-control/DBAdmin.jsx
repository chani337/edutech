import {
  CButton,
  CCol,
  CContainer,
  CFormInput,
  CFormSelect,
  CInputGroup,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from '../../../axios'

const DBAdmin = () => {
  const [input, setInput] = useState({
    category: '',
    keyword: '',
  })

  const [dbUserList, setDBUserList] = useState(null)

  useEffect(() => {
    axios({
      method: 'GET',
      url: '/project-smhrd/db/list',
      responseType: 'json',
      params: { email: 'admin' },
    }).then((response) => {
      setDBUserList(response.data)
    })
  }, [])

  const onChangeSerach = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
  }

  const getDBUserList = () => {
    axios({
      method: 'GET',
      url: '/project-smhrd/db/userSearch',
      responseType: 'json',
      params: { category: input.category, keyword: input.keyword },
    }).then((response) => {
      setDBUserList(response.data)
    })
  }

  return (
    <>
      <CContainer>
        <h1>DataBase 계정발급 현황(마스터)</h1>

        <CRow className="mb-3" sm={{ cols: '2' }}>
          <CCol md={{ offset: 6 }}>
            <CInputGroup>
              <CFormSelect name="category" onChange={onChangeSerach}>
                <option>선택</option>
                <option value="과정">과정명</option>
                <option value="담임">담임명</option>
                <option value="신청자">신청자명</option>
              </CFormSelect>
              <CFormInput type="text" name="keyword" onChange={onChangeSerach} />
              <CButton type="button" className="btn btn-info" onClick={getDBUserList}>
                검색
              </CButton>
            </CInputGroup>
          </CCol>
        </CRow>

        <CRow className="mb-3">
          <CTable bordered>
            <CTableHead>
              <CTableRow color="info" style={{ textAlign: 'center' }}>
                <CTableHeaderCell scope="col">과정명</CTableHeaderCell>
                <CTableHeaderCell scope="col">담임명</CTableHeaderCell>
                <CTableHeaderCell scope="col">프로젝트종류</CTableHeaderCell>
                <CTableHeaderCell scope="col">DB종류</CTableHeaderCell>
                <CTableHeaderCell scope="col">DB계정</CTableHeaderCell>
                <CTableHeaderCell scope="col">비밀번호</CTableHeaderCell>
                <CTableHeaderCell scope="col">신청자명</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {dbUserList &&
                dbUserList.map((item, index) => (
                  <CTableRow style={{ textAlign: 'center' }} key={index}>
                    <CTableDataCell>{item.curri_name}</CTableDataCell>
                    <CTableDataCell>{item.member_name}</CTableDataCell>
                    <CTableDataCell>{item.pro_ctg_name}</CTableDataCell>
                    <CTableDataCell>{item.db_type}</CTableDataCell>
                    <CTableDataCell>{item.db_user}</CTableDataCell>
                    <CTableDataCell>{item.db_pw}</CTableDataCell>
                    <CTableDataCell>{item.member_name2}</CTableDataCell>
                  </CTableRow>
                ))}
            </CTableBody>
          </CTable>
        </CRow>
      </CContainer>
    </>
  )
}

export default DBAdmin
