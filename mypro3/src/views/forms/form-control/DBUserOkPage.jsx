import {
  CButton,
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
import React, { useState, useEffect, useRef } from 'react'
import axios from '../../../axios'
import { toast } from 'react-custom-alert'
import 'react-custom-alert/dist/index.css'

const DBUserOkPage = () => {
  const requestUser = useRef([])
  let selectRequest = []
  const [search, setSearch] = useState({
    category: '',
    keyword: '',
  })
  const [userList, setUserList] = useState([])

  const onChangeSerach = (e) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    })
  }

  const getDBUserList = () => {
    const memLevel = window.localStorage.getItem('mem_level')
    const classCode = window.localStorage.getItem('class_code')
    // 마스터 또는 관리자 권한이면 class_code 없이 요청 (모든 요청 조회)
    const requestData =
      memLevel === '마스터' || memLevel === '관리자'
        ? { mem_level: memLevel }
        : { class_code: classCode, mem_level: memLevel }

    axios({
      url: '/project-smhrd/dbmain/requestList',
      method: 'POST',
      data: requestData,
    }).then((res) => {
      console.log(res)
      setUserList(res.data)
    })
  }

  useEffect(() => {
    getDBUserList()
  }, [])

  const onCheckedAll = () => {}

  function locationDbUrl(info) {
    console.log(info)
    let result = ''
    if (info.db_location == 'aischool' && info.db_type == 'oracle') {
      result = '/project-smhrd/dbaischool/createAIAcademyOracleDb'
    } else if (info.db_location == 'cgi' && info.db_type == 'oracle') {
      result = '/project-smhrd/dbcgi/createCgiOracleDb'
    } else if (info.db_location == 'campus' && info.db_type == 'oracle') {
      result = '/project-smhrd/dbcampus/createCampusOracleDb'
    } else if (info.db_location == 'aischool' && info.db_type == 'mysql') {
      result = '/project-smhrd/dbaischool/createAIAcademyMysqlDb'
    } else if (info.db_location == 'cgi' && info.db_type == 'mysql') {
      result = '/project-smhrd/dbcgi/createCgiMysqlDb'
    } else if (info.db_location == 'campus' && info.db_type == 'mysql') {
      result = '/project-smhrd/dbcampus/createCampusMysqlDb'
    } else if (info.db_location == 'aischool' && info.db_type == 'maria') {
      result = '/project-smhrd/dbaischool/createAIAcademyMariaDb'
    } else if (info.db_location == 'campus' && info.db_type == 'maria') {
      result = '/project-smhrd/dbcampus/createCampusMariaDb'
    }

    return result
  }

  function createUser() {
    for (let i = 0; i < selectRequest.length; i++) {
      let url = locationDbUrl(selectRequest[i])
      console.log(url)
      axios({
        url: url,
        method: 'POST',
        data: {
          reqId: selectRequest[i].db_user,
          reqPw: selectRequest[i].db_pw,
        },
      }).then((res) => {
        if (res.data == 'success') {
          axios({
            url: '/project-smhrd/dbmain/updateDbRequest',
            method: 'POST',
            data: {
              reqId: selectRequest[i].db_user,
              reqPw: selectRequest[i].db_pw,
            },
          }).then((res) => {
            setUserList(userList.filter((data, index) => data.db_user !== selectRequest[i].db_user))

            toast.success('DB계정 생성 성공')
          })
        } else {
        }
      })
    }
  }

  function choiceUser(request, e) {
    if (e.target.checked) {
      selectRequest.push({
        db_user: request.db_user,
        db_pw: request.db_pw,
        db_type: request.db_type,
        db_location: request.db_location,
      })
    } else {
      selectRequest = selectRequest.filter(function (data) {
        return data.db_user != request.db_user
      })
    }
  }

  return (
    <>
      <CContainer>
        <h1>DataBase 계정발급 신청현황</h1>

        <CRow className="mb-3">
          <CCol md={{ offset: 11 }}>
            <CButton type="button" className="btn btn-info" onClick={createUser}>
              발급승인
            </CButton>
          </CCol>
        </CRow>

        <CRow className="mb-3">
          <CTable bordered>
            <CTableHead>
              <CTableRow color="info" style={{ textAlign: 'center' }}>
                <CTableHeaderCell scope="col">
                  <input type="checkbox" onClick={onCheckedAll} />
                </CTableHeaderCell>
                <CTableHeaderCell scope="col">과정명</CTableHeaderCell>
                {window.localStorage.getItem('mem_level') == '마스터' ? (
                  <CTableHeaderCell scope="col">담임명</CTableHeaderCell>
                ) : (
                  ''
                )}
                <CTableHeaderCell scope="col">프로젝트종류</CTableHeaderCell>
                <CTableHeaderCell scope="col">DB종류</CTableHeaderCell>
                <CTableHeaderCell scope="col">DB계정</CTableHeaderCell>
                <CTableHeaderCell scope="col">비밀번호</CTableHeaderCell>
                <CTableHeaderCell scope="col">신청자명</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {userList.map((item, index) => (
                <CTableRow style={{ textAlign: 'center' }} key={index}>
                  <CTableDataCell scope="col">
                    <input
                      type="checkbox"
                      ref={(e) => (requestUser.current[index] = e)}
                      onChange={(e) => {
                        choiceUser(item, e)
                      }}
                    />
                  </CTableDataCell>
                  <CTableDataCell scope="col">{item.curri_name}</CTableDataCell>
                  {window.localStorage.getItem('mem_level') == '마스터' ? (
                    <CTableDataCell scope="col">{item.teacher_name}</CTableDataCell>
                  ) : (
                    ''
                  )}
                  <CTableDataCell scope="col">{item.pro_ctg}</CTableDataCell>
                  <CTableDataCell scope="col">{item.db_type}</CTableDataCell>
                  <CTableDataCell scope="col">{item.db_user}</CTableDataCell>
                  <CTableDataCell scope="col">{item.db_pw}</CTableDataCell>
                  <CTableDataCell scope="col">{item.req_user}</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CRow>
      </CContainer>
    </>
  )
}

export default DBUserOkPage
