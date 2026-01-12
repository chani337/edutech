import React from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell } from '@coreui/icons'
import { DocsCallout, DocsExample } from 'src/components'

import { useState } from 'react'
import {
  CFormInput,
  CForm,
  CFormSelect,
  CFormCheck,
  CFormLabel,
  CFormTextarea,
} from '@coreui/react'
import Select from 'react-select'
const Buttons = () => {
  const options = [
    { value: 'chocolate', label: '정형' },
    { value: 'strawberry', label: '이명훈' },
  ]

  const [inputList, setInputList] = useState([])
  const onAddBtnClick = (event) => {
    setInputList(
      inputList.concat(
        <CFormTextarea
          rows="3"
          style={{ marginTop: '10px' }}
          placeholder="내용을 입력해주세요"
        ></CFormTextarea>,
      ),
    )
  }
  return (
    <CRow>
      <CForm className="row g-1">
        <CCol xs={12}>
          <DocsCallout name="Button" href="components/buttons" />
        </CCol>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>프로젝트 기본정보</strong>
            </CCardHeader>
            <CCardBody>
              <CCol md={6}>
                <CFormInput
                  type="text"
                  id="inputEmail4"
                  label="프로젝트명"
                  placeholder="내용을 입력해주세요"
                />
              </CCol>
              <CCol md={6}>
                <CFormInput
                  type="text"
                  id="inputPassword4"
                  label="팀명"
                  placeholder="내용을 입력해주세요"
                />
              </CCol>
              <CCol xs={12}>
                <CFormInput
                  id="inputAddress"
                  label="프로젝트 주제"
                  placeholder="내용을 입력해주세요"
                />
              </CCol>
              <CCol xs={12} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ marginRight: '10px' }}>수상여부</span>
                  <CFormCheck
                    button={{ color: 'info' }}
                    type="radio"
                    name="award"
                    autoComplete="off"
                    label="최우수"
                    id="test1"
                  />
                  <CFormCheck
                    button={{ color: 'info' }}
                    type="radio"
                    name="award"
                    autoComplete="off"
                    label="우수"
                    id="test2"
                  />
                </div>
                <div style={{ width: '50%', display: 'flex' }}>
                  <div>
                    <span style={{ marginRight: '10px' }}>프로젝트 형태</span>
                    <CFormCheck
                      button={{ color: 'info' }}
                      type="radio"
                      name="pro_form"
                      autoComplete="off"
                      label="챌린지포인트"
                      id="test3"
                    />
                    <CFormCheck
                      button={{ color: 'info' }}
                      type="radio"
                      name="pro_form"
                      autoComplete="off"
                      label="자율"
                      id="test4"
                    />
                    <CFormCheck
                      button={{ color: 'info' }}
                      type="radio"
                      name="pro_form"
                      autoComplete="off"
                      label="기업"
                      id="test5"
                    />
                  </div>
                  <div>
                    <CFormSelect id="inputState">
                      <option>기업이름</option>
                      <option>기업이름</option>
                    </CFormSelect>
                  </div>
                </div>
              </CCol>
              <CCol md={12}>
                <span style={{ marginRight: '10px' }}>카테고리</span>
                <CFormCheck
                  button={{ color: 'info' }}
                  type="checkbox"
                  name="category"
                  autoComplete="off"
                  label="안전"
                  id="test6"
                />
                <CFormCheck
                  button={{ color: 'info' }}
                  type="checkbox"
                  name="category"
                  autoComplete="off"
                  label="IoT"
                  id="test7"
                />
                <CFormCheck
                  button={{ color: 'info' }}
                  type="checkbox"
                  name="category"
                  autoComplete="off"
                  label="뷰티,헬스케어"
                  id="test8"
                />
                <CFormCheck
                  button={{ color: 'info' }}
                  type="checkbox"
                  name="category"
                  autoComplete="off"
                  label="문화"
                  id="test9"
                />
                <CFormCheck
                  button={{ color: 'info' }}
                  type="checkbox"
                  name="category"
                  autoComplete="off"
                  label="언어,교육"
                  id="test10"
                />
                <CFormCheck
                  button={{ color: 'info' }}
                  type="checkbox"
                  name="category"
                  autoComplete="off"
                  label="사회"
                  id="test11"
                />
                <CFormCheck
                  button={{ color: 'info' }}
                  type="checkbox"
                  name="category"
                  autoComplete="off"
                  label="자기,개발"
                  id="test12"
                />
                <CFormCheck
                  button={{ color: 'info' }}
                  type="checkbox"
                  name="category"
                  autoComplete="off"
                  label="복지"
                  id="test13"
                />
                <CFormCheck
                  button={{ color: 'info' }}
                  type="checkbox"
                  name="category"
                  autoComplete="off"
                  label="동,식물"
                  id="test14"
                />
              </CCol>
              <CCol md={12}>
                <span style={{ marginRight: '10px' }}>분석 데이터</span>
                <CFormCheck
                  button={{ color: 'info' }}
                  type="checkbox"
                  name="analysis_data"
                  autoComplete="off"
                  label="음성"
                  id="test15"
                />
                <CFormCheck
                  button={{ color: 'info' }}
                  type="checkbox"
                  name="analysis_data"
                  autoComplete="off"
                  label="영상"
                  id="test16"
                />
                <CFormCheck
                  button={{ color: 'info' }}
                  type="checkbox"
                  name="analysis_data"
                  autoComplete="off"
                  label="이미지"
                  id="test17"
                />
                <CFormCheck
                  button={{ color: 'info' }}
                  type="checkbox"
                  name="analysis_data"
                  autoComplete="off"
                  label="텍스트"
                  id="test18"
                />
              </CCol>
              <CCol md={12}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginRight: '10px' }}>팀원</span>
                  <CFormSelect
                    id="inputState2"
                    label=""
                    style={{ width: '30%', marginRight: '10px' }}
                  >
                    <option>과정명(회차)</option>
                    <option>...</option>
                  </CFormSelect>
                  <Select
                    isMulti
                    name="colors"
                    options={options}
                    className="basic-multi-select"
                    classNamePrefix="학생이름"
                  />
                </div>
              </CCol>
              <CCol md={12}>
                <span style={{ marginRight: '10px' }}>프로젝트 종류</span>
                <CFormCheck
                  button={{ color: 'info' }}
                  type="radio"
                  name="pro_type"
                  autoComplete="off"
                  label="미니"
                  id="test19"
                />
                <CFormCheck
                  button={{ color: 'info' }}
                  type="radio"
                  name="pro_type"
                  autoComplete="off"
                  label="핵심"
                  id="test19"
                />
                <CFormCheck
                  button={{ color: 'info' }}
                  type="radio"
                  name="pro_type"
                  autoComplete="off"
                  label="실전"
                  id="test19"
                />
              </CCol>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>프로젝트 소개</strong>
            </CCardHeader>
            <CCardBody>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1">프로젝트 한줄소개</CFormLabel>
                <CFormTextarea
                  id="exampleFormControlTextarea1"
                  rows="3"
                  placeholder="내용을 입력해주세요"
                ></CFormTextarea>
              </div>
              <div className="mb-3" id="areaDiv">
                <CFormLabel htmlFor="exampleFormControlTextarea2">프로젝트 기능</CFormLabel>
                <CFormTextarea
                  id="exampleFormControlTextarea2"
                  rows="3"
                  placeholder="내용을 입력해주세요"
                ></CFormTextarea>
                {inputList}
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <CButton
                  type="button"
                  style={{ display: 'flex', justifyContent: 'center' }}
                  onClick={onAddBtnClick}
                >
                  추가
                </CButton>
              </div>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>빅데이터 분석정의서</strong>
            </CCardHeader>
            <CCardBody>
              <CCol md={12}>
                <CFormInput
                  type="text"
                  id="inputEmai55"
                  label="기능명"
                  placeholder="내용을 입력해주세요"
                />
              </CCol>
              <CCol md={12}>
                <CFormInput
                  type="text"
                  id="inputEmai55"
                  label="데이터 정의"
                  placeholder="내용을 입력해주세요"
                />
              </CCol>
              <CCol md={12}>
                <CFormCheck
                  button={{ color: 'info' }}
                  type="checkbox"
                  name="analysis_data"
                  autoComplete="off"
                  label="크롤링"
                  id="test50"
                />
                <CFormCheck
                  button={{ color: 'info' }}
                  type="checkbox"
                  name="analysis_data"
                  autoComplete="off"
                  label="오픈소스"
                  id="test51"
                />
              </CCol>
              <CCol md={12}>
                <CFormLabel htmlFor="exampleFormControlTextarea2">데이터 획득방법</CFormLabel>
                <CFormTextarea
                  id="exampleFormControlTextarea2"
                  rows="3"
                  placeholder="내용을 입력해주세요"
                ></CFormTextarea>
              </CCol>
              <CCol md={12}>
                <CFormInput
                  type="text"
                  id="inputEmai55"
                  label="데이터주소"
                  placeholder="내용을 입력해주세요"
                />
              </CCol>
              <CCol md={12}>
                <CFormLabel htmlFor="exampleFormControlTextarea2">전처리 과정</CFormLabel>
                <CFormTextarea
                  id="exampleFormControlTextarea2"
                  rows="3"
                  placeholder="내용을 입력해주세요"
                ></CFormTextarea>
              </CCol>
              <CCol md={12}>
                <CFormInput
                  type="text"
                  id="inputEmai55"
                  label="모델링 목표"
                  placeholder="내용을 입력해주세요"
                />
              </CCol>
              <CCol md={12}>
                <CFormInput
                  type="text"
                  id="inputEmai55"
                  label="모델링 알고리즘"
                  placeholder="내용을 입력해주세요"
                />
              </CCol>
              <CCol md={12}>
                <CFormLabel htmlFor="exampleFormControlTextarea2">학습</CFormLabel>
                <CFormTextarea
                  id="exampleFormControlTextarea2"
                  rows="3"
                  placeholder="내용을 입력해주세요"
                ></CFormTextarea>
              </CCol>
              <CCol md={12}>
                <CFormLabel htmlFor="exampleFormControlTextarea2">검증</CFormLabel>
                <CFormTextarea
                  id="exampleFormControlTextarea2"
                  rows="3"
                  placeholder="내용을 입력해주세요"
                ></CFormTextarea>
              </CCol>
              <CCol md={12}>
                <CFormLabel htmlFor="exampleFormControlTextarea2">평과결과</CFormLabel>
                <CFormTextarea
                  id="exampleFormControlTextarea2"
                  rows="3"
                  placeholder="내용을 입력해주세요"
                ></CFormTextarea>
              </CCol>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>프로젝트 컨텐츠</strong>
            </CCardHeader>
            <CCardBody>
              <CCol md={12}>
                <CFormInput
                  type="text"
                  id="inputEmai55"
                  label="프로젝트 폴더경로"
                  placeholder="내용을 입력해주세요"
                />
              </CCol>
              <CCol md={12}>
                <CFormCheck
                  button={{ color: 'info' }}
                  type="checkbox"
                  name="category"
                  autoComplete="off"
                  label="분석컨텐츠1"
                  id="test60"
                />
                <CFormCheck
                  button={{ color: 'info' }}
                  type="checkbox"
                  name="category"
                  autoComplete="off"
                  label="분석컨텐츠2"
                  id="test61"
                />
              </CCol>

              <CCol md={12}>
                <div style={{ display: 'flex', alignItems: 'baseline' }}>
                  <CFormCheck
                    button={{ color: 'info' }}
                    type="checkbox"
                    name="category"
                    autoComplete="off"
                    label="시연영상"
                    id="test60"
                  />
                  <CFormCheck
                    button={{ color: 'info' }}
                    type="checkbox"
                    name="category"
                    autoComplete="off"
                    label="시스템아키텍쳐"
                    id="test61"
                  />
                  <CFormCheck
                    button={{ color: 'info' }}
                    type="checkbox"
                    name="category"
                    autoComplete="off"
                    label="UCD"
                    id="test61"
                  />
                  <CFormCheck
                    button={{ color: 'info' }}
                    type="checkbox"
                    name="category"
                    autoComplete="off"
                    label="ERD"
                    id="test61"
                  />
                  <CFormCheck
                    button={{ color: 'info' }}
                    type="checkbox"
                    name="category"
                    autoComplete="off"
                    label="주요화면"
                    id="test61"
                  />
                  <CFormCheck
                    button={{ color: 'info' }}
                    type="checkbox"
                    name="category"
                    autoComplete="off"
                    label="개발환경"
                    id="test61"
                  />
                  <CFormCheck
                    button={{ color: 'info' }}
                    type="checkbox"
                    name="category"
                    autoComplete="off"
                    label="주요활굥기능"
                    id="test61"
                  />
                  <CFormCheck
                    button={{ color: 'info' }}
                    type="checkbox"
                    name="category"
                    autoComplete="off"
                    label="PPT"
                    id="test61"
                  />
                  <CFormInput
                    type="text"
                    id="inputEmai55"
                    placeholder="PPT 장수"
                    style={{ width: '10%' }}
                  />
                </div>
              </CCol>
              <CCol md={12}>
                <CFormCheck
                  button={{ color: 'info' }}
                  type="checkbox"
                  name="category"
                  autoComplete="off"
                  label="기획서"
                  id="test61"
                />
                <CFormCheck
                  button={{ color: 'info' }}
                  type="checkbox"
                  name="category"
                  autoComplete="off"
                  label="요구사항정의서"
                  id="test61"
                />
                <CFormCheck
                  button={{ color: 'info' }}
                  type="checkbox"
                  name="category"
                  autoComplete="off"
                  label="테이블명세서"
                  id="test61"
                />
                <CFormCheck
                  button={{ color: 'info' }}
                  type="checkbox"
                  name="category"
                  autoComplete="off"
                  label="DB요구사항"
                  id="test61"
                />
                <CFormCheck
                  button={{ color: 'info' }}
                  type="checkbox"
                  name="category"
                  autoComplete="off"
                  label="화면설계서"
                  id="test61"
                />
                <CFormCheck
                  button={{ color: 'info' }}
                  type="checkbox"
                  name="category"
                  autoComplete="off"
                  label="테스트결과서"
                  id="test61"
                />
                <CFormCheck
                  button={{ color: 'info' }}
                  type="checkbox"
                  name="category"
                  autoComplete="off"
                  label="빅데이터분석"
                  id="test61"
                />
                <CFormCheck
                  button={{ color: 'info' }}
                  type="checkbox"
                  name="category"
                  autoComplete="off"
                  label="WBS"
                  id="test61"
                />
              </CCol>
              <CCol xs={12} style={{ textAlign: 'center' }}>
                <CButton type="submit">프로젝트 정보 등록</CButton>
              </CCol>
            </CCardBody>
          </CCard>
        </CCol>
      </CForm>
    </CRow>
  )
}

export default Buttons
