/* eslint-disable react/prop-types */

import React from 'react'
import {
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

import MDViewer from './MDViewer'
import { useState, useEffect, useRef } from 'react'
import '@toast-ui/editor/dist/toastui-editor-viewer.css'
import axios from '../../../axios'
import { useNavigate, useSearchParams } from 'react-router-dom'
const MDViewerPage = () => {
  const nav = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const [postView, setPostView] = useState({
    title: null,
    content: null,
    src: null,
  })
  const [tch, setTch] = useState({ num: '1', title: '' })
  const [tch_menu, setTchMenu] = useState([])

  useEffect(() => {
    //맨처음 보여질 프로젝트 기술페이지
    //기술 이름 값들

    axios({
      method: 'GET',
      url: '/project-smhrd/tech/postMenu',
      responseType: 'json',
    }).then((response) => {
      let getData = response.data
      let result = [
        { tch_category: 'Web', tch_title: [], tch_num: [] },
        { tch_category: 'BigData & AI', tch_title: [], tch_num: [] },
        { tch_category: 'Android', tch_title: [], tch_num: [] },
        { tch_category: 'IoT', tch_title: [], tch_num: [] },
      ]

      for (let i = 0; i < getData.length; i++) {
        if (getData[i].tch_type == 'web') {
          result[0].tch_title.push(getData[i].tch_name)
          result[0].tch_num.push(getData[i].tch_num)
        } else if (getData[i].tch_type == 'ml' || getData[i].tch_type == 'dl') {
          result[1].tch_title.push(getData[i].tch_name)
          result[1].tch_num.push(getData[i].tch_num)
        } else if (getData[i].tch_type == 'android') {
          result[2].tch_title.push(getData[i].tch_name)
          result[2].tch_num.push(getData[i].tch_num)
        } else if (getData[i].tch_type == 'iot') {
          result[3].tch_title.push(getData[i].tch_name)
          result[3].tch_num.push(getData[i].tch_num)
        }
      }

      setTchMenu(result)
    })
  }, [])

  useEffect(() => {
    let url = '/project-smhrd/tech/postView?tchNum=' + searchParams.get('tchNum')
    if (searchParams.get('tchNum') == null) {
      url = '/project-smhrd/tech/postView?tchNum=1'
    }

    axios({
      method: 'GET',
      url: url,
      responseType: 'json',
    }).then((response) => {
      if (url == '/project-smhrd/tech/postView?tchNum=1') {
        setPostView({
          ...postView,
          title: 'ToastUI&Ajax',
          content: response.data.markDown,
          src: 'ToastUI&Ajax.zip',
        })
      } else {
        setPostView({
          ...postView,
          title: searchParams.get('tchTitle').split('#')[0].replace('-', '&'),

          content: response.data.markDown,
          src: searchParams.get('tchTitle').split('#')[0] + '.zip',
        })
      }
    })
  }, [tch])

  return (
    <CRow>
      {/* 기술 메뉴바 */}
      <CCol className="col-3">
        {/* <CForm>
          <CFormInput type="text" id="tectKeyword" placeholder="search.." />
        </CForm> */}

        {/* 시작 시 특정 메뉴 활성화 ->  activeItemKey={항목번호} */}
        <CAccordion>
          {tch_menu.map((item, key) => (
            <CAccordionItem itemKey={key + 1} key={key}>
              <CAccordionHeader>{item.tch_category}</CAccordionHeader>
              <CAccordionBody>
                <CListGroup flush>
                  {item.tch_title.map((title, index) => (
                    <CListGroupItem
                      key={index}
                      onClick={() => {
                        setTch({ num: item.tch_num[index], title: title })
                      }}
                    >
                      <a
                        href={
                          '/base/forms/viewer?tchNum=' +
                          item.tch_num[index] +
                          '&tchTitle=' +
                          title.replace('&', '-')
                        }
                        style={{ textDecoration: 'none', color: 'black' }}
                      >
                        {title.split('#')[1]}
                      </a>
                    </CListGroupItem>
                  ))}
                </CListGroup>
              </CAccordionBody>
            </CAccordionItem>
          ))}
        </CAccordion>
      </CCol>

      {/* 기술정보 출력 */}
      <CCol>
        <MDViewer tchData={postView}></MDViewer>
      </CCol>
    </CRow>
  )
}

export default MDViewerPage
