/* eslint-disable react/prop-types */

import React from 'react'
import {
  CContainer,
  CCard,
  CCardHeader,
  CCardBody,
  CCol,
  CForm,
  CFormInput,
  CRow,
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
  CListGroup,
  CListGroupItem,
} from '@coreui/react'
import Editor from './MDEditor'
import MDViewer from './MDViewer'
import MDEditor from './MDEditor'

const FormControl = () => {
  return (
    <CRow>
      {/* 기술 메뉴바 */}
      <CCol className="col-3">
        <CForm>
          <CFormInput type="text" id="tectKeyword" placeholder="search.." />
        </CForm>

        <CAccordion activeItemKey={2}>
          <CAccordionItem itemKey={1}>
            <CAccordionHeader>Web</CAccordionHeader>
            <CAccordionBody>
              <CListGroup flush>
                <CListGroupItem>Flask & Servlet 연동방법</CListGroupItem>
                <CListGroupItem>KaKaoMap-Ajax 연동방법</CListGroupItem>
                <CListGroupItem>ToastUI-Ajax 연동방법</CListGroupItem>
              </CListGroup>
            </CAccordionBody>
          </CAccordionItem>
          <CAccordionItem itemKey={2}>
            <CAccordionHeader>Android</CAccordionHeader>
            <CAccordionBody>
              <CListGroup flush>
                <CListGroupItem>Calendar-DB 연동방법</CListGroupItem>
                <CListGroupItem>Android-Flask 연동방법</CListGroupItem>
                <CListGroupItem>Android-Server 연동방법</CListGroupItem>
              </CListGroup>
            </CAccordionBody>
          </CAccordionItem>
          <CAccordionItem itemKey={3}>
            <CAccordionHeader>BigData & AI</CAccordionHeader>
            <CAccordionBody>
              <CListGroup flush>
                <CListGroupItem>콘텐츠 기반 영화 추천 알고리즘 사용방법</CListGroupItem>
                <CListGroupItem>협업 필터링 알고리즘 사용방법</CListGroupItem>
                <CListGroupItem>YOLOv5 환경구축 및 사용방법</CListGroupItem>
              </CListGroup>
            </CAccordionBody>
          </CAccordionItem>
          <CAccordionItem itemKey={4}>
            <CAccordionHeader>IoT</CAccordionHeader>
            <CAccordionBody>
              <CListGroup flush>
                <CListGroupItem>아두이노-Server 연동방법</CListGroupItem>
                <CListGroupItem>Android-아두이노 연동방법</CListGroupItem>
                <CListGroupItem>아두이노-Flask 연동방법</CListGroupItem>
              </CListGroup>
            </CAccordionBody>
          </CAccordionItem>
        </CAccordion>
      </CCol>

      {/* 기술정보 출력 */}
      <CCol>
        <MDViewer></MDViewer>
        <MDEditor></MDEditor>
      </CCol>
    </CRow>
  )
}

export default FormControl
