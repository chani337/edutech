import {
  CForm,
  CFormInput,
  CFormSelect,
  CCard,
  CContainer,
  CRow,
  CCol,
  CCardBody,
  CCardTitle,
  CCardText,
  CFormLabel,
  CFormTextarea,
  CInputGroup,
  CButton,
} from '@coreui/react'
import React, { useState } from 'react'
import axios from '../../../axios'
import { toast } from 'react-custom-alert'
import { useNavigate } from 'react-router-dom'
import 'react-custom-alert/dist/index.css'
const DBRegisterPage = () => {
  const nav = useNavigate()

  const [dbsignup, setDBsignUp] = useState({
    mem_email: window.localStorage.getItem('mem_email'),
    mem_name: window.localStorage.getItem('mem_name'),
    db_type: '',
    db_user: '', //생성할 DB계정명
    db_pw: '',
    db_location: '',
    db_etc: '',
    pro_ctg_num: '',
  })

  const [check, setCheck] = useState(0) // 중복체크했는지 확인 하는용
  const userCheck = () => {
    axios({
      url: '/project-smhrd/dbmain/userCheck',
      method: 'post',
      data: { db_user: dbsignup.db_user },
      responseType: 'json',
    }).then((res) => {
      if (res.data === 'success') {
        setCheck(1)
        toast.success('사용 가능한 DB계정입니다')
      } else {
        setCheck(0)
        toast.error('사용 불가능한 DB계정입니다')
      }
    })
  }

  const onChangeDBsignup = (e) => {
    setDBsignUp({
      ...dbsignup,
      [e.target.name]: e.target.value,
    })
  }

  const sendData = () => {
    if (
      dbsignup.db_user !== '' &&
      dbsignup.db_pw !== '' &&
      dbsignup.db_type !== '' &&
      check === 1
    ) {
      // class_code 추가
      const requestData = {
        ...dbsignup,
        class_code: window.localStorage.getItem('class_code') || '',
      }

      console.log('DB 요청 데이터:', requestData) // 디버깅용

      axios({
        url: '/project-smhrd/dbmain/dbSignup',
        method: 'post',
        data: requestData,
      })
        .then((res) => {
          if (res.data === 'success') {
            alert('요청성공')
            nav('/base')
            //toast.success('요청 성공')
          } else {
            alert('요청실패')
            //toast.success('요청 실패')
          }
        })
        .catch((error) => {
          console.error('DB 요청 에러:', error)
          alert('요청 중 오류가 발생했습니다: ' + error.message)
        })
    } else {
      if (check !== 1) {
        alert('중복체크를 확인해주세요')
      } else {
        alert('필수 정보들을 입력 해주세요')
      }
    }
  }

  return (
    <CContainer style={{ width: '70%' }}>
      <CCard style={{ width: '100%' }}>
        <CCardBody>
          <CCardTitle>DB신청 시 안내사항</CCardTitle>
          <CCardText>1.mysql은 DB이름과 계정명과 일치함</CCardText>
          <CCardText>2.중복체크 필수</CCardText>
          <CCardText>3.승인이 빠르게 필요할 시 담임선생님께 요청드릴 것</CCardText>
        </CCardBody>
      </CCard>
      <CCard>
        <CCardBody>
          <CForm action="#" method="post">
            <CRow>
              <CCol>
                <CInputGroup className="mb-3">
                  <CFormInput
                    type="text"
                    name="db_user"
                    placeholder="DB계정을 입력해주세요"
                    onChange={onChangeDBsignup}
                  />
                  <CButton type="button" className="btn btn-primary" onClick={userCheck}>
                    중복체크(필수)
                  </CButton>
                </CInputGroup>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol>
                <CFormInput
                  type="password"
                  name="db_pw"
                  placeholder="비밀번호를 입력해주세요"
                  onChange={onChangeDBsignup}
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol>
                <CFormSelect
                  name="db_type"
                  size="lg"
                  aria-label="기술 분야"
                  onChange={onChangeDBsignup}
                >
                  <option value="none">DB종류를 선택해주세요.</option>
                  <option value="oracle">Oracle</option>
                  <option value="mysql">MySQL</option>
                  <option value="maria">MariaDB</option>
                </CFormSelect>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol>
                <CFormSelect
                  name="pro_ctg_num"
                  size="lg"
                  aria-label="기술 분야"
                  onChange={onChangeDBsignup}
                >
                  <option value="none">프로젝트 종류를 선택해주세요.</option>
                  {/* <option value="1">미니</option> */}
                  <option value="2">핵심</option>
                  <option value="3">실전</option>
                </CFormSelect>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol>
                <CFormSelect
                  name="db_location"
                  size="lg"
                  aria-label="기술 분야"
                  onChange={onChangeDBsignup}
                >
                  <option value="none">강의장 위치를 선택해주세요</option>
                  <option value="cgi">CGI</option>
                  <option value="campus">CAMPUS</option>
                  <option value="aischool">인공지능사관학교</option>
                </CFormSelect>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol>
                <CFormLabel>기타 문의사항</CFormLabel>
                <CFormTextarea
                  name="db_etc"
                  style={{ resize: 'none' }}
                  onChange={onChangeDBsignup}
                ></CFormTextarea>
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <CFormInput
                  type="button"
                  value="발급 신청"
                  className="btn btn-primary"
                  onClick={sendData}
                />
              </CCol>
            </CRow>
          </CForm>
        </CCardBody>
      </CCard>
    </CContainer>
  )
}

export default DBRegisterPage
