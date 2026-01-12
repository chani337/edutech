import {
  CRow,
  CCol,
  CFormInput,
  CFormSelect,
  CFormTextarea,
  CForm,
  CButton,
  CContainer,
} from '@coreui/react'
import React from 'react'
import '../../../scss/addproject.scss'

const AddProject = () => {
  // (프로젝트 주제, 팀명, 해쉬태그(N개, DB값 중 선택), 과정명(DB값 중 선택), 한줄 소개, 주요기능(N개))

  // - (파일)세부내용 이미지파일
  // (시스템아키텍처, 유스케이스, E-R다이어그램, 주요화면, 주요기술)
  // - (텍스트)세부기술(빅데이터/인공지능) - 여러개 작성 : 기능명, 데이터 정의(N개), 데이터 획득방법(N개), 전처리 과정(N개), 모델링 목표(N개), 모델링 가능 알고리즘(N개), 학습(N개), 모델링 검증 방안(N개), 모델링 평가 결과(N개)
  // - (파일)세부기술(IoT) : 사용부품 이미지, 회로도 이미지(N개)
  return (
    <div className="addproject-container">
      <h1> 프로젝트 등록</h1>
      <p>프로젝트의 세부 내용을 함께 등록 해주세요!</p>
      <hr></hr>
      <CForm>
        <CRow>
          <CCol xs>
            <CFormInput placeholder="주제" aria-label="주제" />
          </CCol>
          <CCol xs>
            <CFormInput placeholder="팀명" aria-label="팀명" />
          </CCol>
        </CRow>

        <CRow>
          <CCol>
            <CFormSelect
              aria-label="Default select example"
              options={[
                '과정을 선택하시오.',
                { label: 'K-digital 지능형 IoT 9회차 - 담임 : 선영표', value: '1' },
                {
                  label: '산대특 인공지능 서비스개발자과정- 담임 : 임승환',
                  value: '2',
                },
              ]}
            />
          </CCol>
        </CRow>

        <CRow>
          <CCol>
            <CFormInput placeholder="프로젝트를 한 줄로 소개해주세요!" aria-label="project" />
          </CCol>
        </CRow>

        <CRow>
          <CCol>
            <CFormTextarea
              id="exampleFormControlTextarea1"
              label="** 프로젝트와 관련된 세부 내용을 작성해주세요."
              rows={3}
            ></CFormTextarea>
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <CFormInput
              type="file"
              id="formFileMultiple"
              label="** PPT 이미지를 업로드 해주세요!(복수 선택 가능)"
              multiple
            />
          </CCol>
        </CRow>

        <CRow>
          <CCol>
            <CFormInput type="file" id="formFile" label="** 기획서를 업로드 해주세요! (pdf) " />
          </CCol>
        </CRow>
        <CRow>
          <CCol xs>
            <CFormInput type="file" id="formFile" label="시스템 아키텍처(jpg, jpeg, png)" />
          </CCol>
          <CCol xs>
            <CFormInput type="file" id="formFile" label="유스케이스(jpg, jpeg, png) " />
          </CCol>
        </CRow>
        <CRow>
          <CCol xs>
            <CFormInput type="file" id="formFile" label="ER다이어그램(jpg, jpeg, png)" />
          </CCol>
          <CCol xs>
            <CFormInput type="file" id="formFile" label="주요 기술(jpg, jpeg, png) " />
          </CCol>
        </CRow>
      </CForm>

      <hr></hr>
      <CContainer>
        <div className="row justify-content-md-center">
          <CCol md="auto">
            <CButton color="success" shape="rounded-0">
              등록
            </CButton>
            <CButton color="secondary" shape="rounded-0">
              돌아가기
            </CButton>
          </CCol>
        </div>
      </CContainer>
    </div>
  )
}

export default AddProject
