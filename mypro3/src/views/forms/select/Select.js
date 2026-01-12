import React, { useEffect, useState, useRef } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CFormSelect, CRow } from '@coreui/react'
import { CButton } from '@coreui/react'
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from '@coreui/react'
import axios from '../../../axios'
import { toast } from 'react-custom-alert'

const Select = () => {
  const newUsersPermissionCheck = useRef([])
  const selectUserPermissionCheck = useRef([])

  const newUserAllCheckBox = useRef()
  const oldUserAllCheckBox = useRef()

  const [allUsers, serAllUsers] = useState([])
  const [newUsers, setNewUsers] = useState([])
  const [oldUsers, setOldUsers] = useState([])
  const [selctPermision, setSelectPermission] = useState('권한')

  let selectUsers = []
  const [transPermission, setTransPermission] = useState(0)
  const [beforeChoice, setBeforeChoice] = useState('권한')

  useEffect(
    function () {
      axios({
        method: 'GET',
        url: '/project-smhrd/user/userList',
      })
        .then((res) => {
          //전체 회원가입 한 User정보 다가져옴!
          serAllUsers(res.data)

          setNewUsers(
            res.data.filter(function (userData) {
              return userData.mem_level == '일반'
            }),
          )

          setOldUsers(
            res.data.filter(function (userData) {
              return userData.mem_level == beforeChoice
            }),
          )

          selectUserPermissionCheck.current.length = oldUsers.length

          newUsersPermissionCheck.current.length = newUsers.length

          for (let i = 0; i < selectUserPermissionCheck.current.length; i++) {
            selectUserPermissionCheck.current[i].checked = false
          }
          for (let i = 0; i < newUsersPermissionCheck.current.length; i++) {
            newUsersPermissionCheck.current[i].checked = false
          }
        })
        .catch((err) => {})
    },
    [transPermission],
  )

  function chiocePermission(e) {
    setSelectPermission(e.target.text)
    setBeforeChoice(e.target.text)
    setOldUsers(
      allUsers.filter(function (userData) {
        return userData.mem_level == e.target.text
      }),
    )
  }

  function allChoiceNewUser(e) {
    console.log(e.target.checked)
    selectUserPermissionCheck.current.length = newUsers.length
    if (e.target.checked) {
      console.log(newUsersPermissionCheck.current)
      for (let i = 0; i < newUsersPermissionCheck.current.length; i++) {
        newUsersPermissionCheck.current[i].checked = true
        selectUsers.push(newUsersPermissionCheck.current[i].value)
      }
    } else {
      for (let i = 0; i < newUsersPermissionCheck.current.length; i++) {
        newUsersPermissionCheck.current[i].checked = false
        selectUsers = []
      }
    }
  }

  function allChoiceUser(e) {
    selectUserPermissionCheck.current.length = oldUsers.length
    if (e.target.checked) {
      console.log(selectUserPermissionCheck.current)
      for (let i = 0; i < selectUserPermissionCheck.current.length; i++) {
        selectUserPermissionCheck.current[i].checked = true
        selectUsers.push(selectUserPermissionCheck.current[i].value)
      }
    } else {
      for (let i = 0; i < selectUserPermissionCheck.current.length; i++) {
        selectUserPermissionCheck.current[i].checked = false
        selectUsers = []
      }
    }
  }

  function choiceUser(useEmail, e) {
    if (e.target.checked) {
      selectUsers.push(useEmail)
    } else {
      selectUsers = selectUsers.filter(function (data) {
        return data != useEmail
      })
    }
  }

  function upDatePermission(requestPermission) {
    axios({
      method: 'POST',
      url: '/project-smhrd/user/permission-update',
      data: {
        email: selectUsers,
        newPermission: requestPermission,
      },
      responseType: 'json',
    }).then((res) => {
      toast.success(res.data + '명의 회원정보변경완료')
      selectUsers = []

      newUserAllCheckBox.current.checked = false
      oldUserAllCheckBox.current.checked = false
      setTransPermission(transPermission + 1)
    })
  }

  function deleteUser() {
    axios({
      method: 'POST',
      url: '/project-smhrd/user/delete',
      data: {
        email: selectUsers,
      },
      responseType: 'json',
    }).then((res) => {
      toast.success(res.data + '명의 회원정보변경완료')
      newUserAllCheckBox.current.checked = false
      oldUserAllCheckBox.current.checked = false
      setTransPermission(transPermission + 1)
    })
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <strong>신규회원</strong>
            <div style={{ textAlign: 'right' }}>
              <CButton
                style={{ backgroundColor: '#008acc', borderColor: '#008acc' }}
                onClick={() => {
                  upDatePermission('일반')
                }}
              >
                일반
              </CButton>
              <CButton
                style={{ backgroundColor: '#008acc', borderColor: '#008acc' }}
                onClick={() => {
                  upDatePermission('학생')
                }}
              >
                학생
              </CButton>
              <CButton
                style={{ backgroundColor: '#008acc', borderColor: '#008acc' }}
                onClick={() => {
                  upDatePermission('관리자')
                }}
              >
                관리자
              </CButton>
              <CButton
                style={{ backgroundColor: '#008acc', borderColor: '#008acc' }}
                onClick={() => {
                  upDatePermission('마스터')
                }}
              >
                마스터
              </CButton>
              <CButton color="danger" onClick={deleteUser}>
                삭제
              </CButton>
            </div>
          </CCardHeader>
          <CCardBody>
            <CTable striped hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">
                    <input
                      type="checkbox"
                      onChange={allChoiceNewUser}
                      ref={newUserAllCheckBox}
                    ></input>
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">이름</CTableHeaderCell>
                  <CTableHeaderCell scope="col">과정명</CTableHeaderCell>
                  <CTableHeaderCell scope="col">E-mail</CTableHeaderCell>
                  <CTableHeaderCell scope="col"></CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {newUsers.map(function (data, index) {
                  return (
                    <CTableRow key={index}>
                      <CTableHeaderCell scope="row">
                        <input
                          type="checkbox"
                          ref={(e) => (newUsersPermissionCheck.current[index] = e)}
                          onChange={(e) => {
                            choiceUser(data.mem_email, e)
                          }}
                          value={data.mem_email}
                        ></input>
                      </CTableHeaderCell>
                      <CTableDataCell>{data.mem_name}</CTableDataCell>
                      <CTableDataCell>{data.class_code}</CTableDataCell>
                      <CTableDataCell>{data.mem_email}</CTableDataCell>
                      <CTableDataCell>{data.mem_level}</CTableDataCell>
                    </CTableRow>
                  )
                })}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <strong>기존회원</strong>
            <div style={{ textAlign: 'right' }}>
              <CButton
                style={{ backgroundColor: '#008acc', borderColor: '#008acc' }}
                onClick={() => {
                  upDatePermission('일반')
                }}
              >
                일반
              </CButton>
              <CButton
                style={{ backgroundColor: '#008acc', borderColor: '#008acc' }}
                onClick={() => {
                  upDatePermission('학생')
                }}
              >
                학생
              </CButton>
              <CButton
                style={{ backgroundColor: '#008acc', borderColor: '#008acc' }}
                onClick={() => {
                  upDatePermission('관리자')
                }}
              >
                관리자
              </CButton>
              <CButton
                style={{ backgroundColor: '#008acc', borderColor: '#008acc' }}
                onClick={() => {
                  upDatePermission('마스터')
                }}
              >
                마스터
              </CButton>
              <CButton color="danger" onClick={deleteUser}>
                삭제
              </CButton>
            </div>
          </CCardHeader>
          <CCardBody>
            <CTable striped hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">
                    <input
                      type="checkbox"
                      onChange={allChoiceUser}
                      ref={oldUserAllCheckBox}
                    ></input>
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">이름</CTableHeaderCell>
                  <CTableHeaderCell scope="col">과정명</CTableHeaderCell>
                  <CTableHeaderCell scope="col">E-mail</CTableHeaderCell>
                  <CTableHeaderCell scope="col">
                    <CDropdown>
                      <CDropdownToggle color="info">{selctPermision}</CDropdownToggle>
                      <CDropdownMenu>
                        <CDropdownItem
                          onClick={(e) => {
                            chiocePermission(e)
                          }}
                        >
                          일반
                        </CDropdownItem>
                        <CDropdownItem
                          onClick={(e) => {
                            chiocePermission(e)
                          }}
                        >
                          학생
                        </CDropdownItem>
                        <CDropdownItem
                          onClick={(e) => {
                            chiocePermission(e)
                          }}
                        >
                          관리자
                        </CDropdownItem>
                        <CDropdownItem
                          onClick={(e) => {
                            chiocePermission(e)
                          }}
                        >
                          마스터
                        </CDropdownItem>
                      </CDropdownMenu>
                    </CDropdown>
                  </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {oldUsers.map(function (data, index) {
                  return (
                    <CTableRow key={index}>
                      <CTableHeaderCell scope="row">
                        <input
                          type="checkbox"
                          ref={(e) => (selectUserPermissionCheck.current[index] = e)}
                          onChange={(e) => {
                            choiceUser(data.mem_email, e)
                          }}
                          value={data.mem_email}
                        ></input>
                      </CTableHeaderCell>
                      <CTableDataCell>{data.mem_name}</CTableDataCell>
                      <CTableDataCell>{data.class_code}</CTableDataCell>
                      <CTableDataCell>{data.mem_email}</CTableDataCell>
                      <CTableDataCell>{data.mem_level}</CTableDataCell>
                    </CTableRow>
                  )
                })}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Select
