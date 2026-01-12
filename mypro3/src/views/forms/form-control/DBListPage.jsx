import React from 'react'
import { useState, useEffect } from 'react'
import DBAdmin from './DBAdmin'
import DBGeneralUser from './DBGeneralUser'
import axios from '../../../axios'
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

const DBListPage = () => {
  const [okList, setOkList] = useState([])
  const [okFilterList, setokFilterList] = useState([])

  const [input, setInput] = useState({
    category: '',
    keyword: '',
  })
  useEffect(function () {
    axios({
      method: 'GET',
      url: '/project-smhrd/dbmain/list',
      responseType: 'json',
    }).then((response) => {
      setOkList(response.data)
    })
  }, [])

  const onChangeSerach = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })

    if (e.target.value === '') {
      setokFilterList([])
    }
  }

  const getDBUserList = () => {
    if (input.category === '과정') {
      setokFilterList(okList.filter((data, index) => data.curri_name == input.keyword))
    } else if (input.category === '담임') {
      setokFilterList(okList.filter((data, index) => data.teacher_name == input.keyword))
    } else if (input.category === '신청자') {
      setokFilterList(okList.filter((data, index) => data.req_user == input.keyword))
    }
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
              {okFilterList.length === 0
                ? okList.map(function (data, index) {
                    return (
                      <CTableRow style={{ textAlign: 'center' }} key={index}>
                        <CTableDataCell>{data.curri_name}</CTableDataCell>
                        <CTableDataCell>{data.teacher_name}</CTableDataCell>
                        <CTableDataCell>{data.pro_ctg}</CTableDataCell>
                        <CTableDataCell>{data.db_type}</CTableDataCell>
                        <CTableDataCell>{data.db_user}</CTableDataCell>
                        <CTableDataCell>{data.db_pw}</CTableDataCell>
                        <CTableDataCell>{data.req_user}</CTableDataCell>
                      </CTableRow>
                    )
                  })
                : okFilterList.map(function (data, index) {
                    return (
                      <CTableRow style={{ textAlign: 'center' }} key={index}>
                        <CTableDataCell>{data.curri_name}</CTableDataCell>
                        <CTableDataCell>{data.teacher_name}</CTableDataCell>
                        <CTableDataCell>{data.pro_ctg}</CTableDataCell>
                        <CTableDataCell>{data.db_type}</CTableDataCell>
                        <CTableDataCell>{data.db_user}</CTableDataCell>
                        <CTableDataCell>{data.db_pw}</CTableDataCell>
                        <CTableDataCell>{data.req_user}</CTableDataCell>
                      </CTableRow>
                    )
                  })}
            </CTableBody>
          </CTable>
        </CRow>
      </CContainer>
    </>
  )
}

export default DBListPage
