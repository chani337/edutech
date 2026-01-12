/* eslint-disable react/prop-types */
import React from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { CCard, CCardHeader, CCardBody, CButton, CSpinner } from '@coreui/react'

import { cilList, cilShieldAlt } from '@coreui/icons'
import { CCarousel, CCarouselItem, CImage } from '@coreui/react'
import TabDoc from 'src/components/TabDoc'
import TabBig from 'src/components/TabBig'
import PdfViewer from 'src/components/PdfViewer'

import axios from '../../../axios'
import { useState } from 'react'
import { convertImageUrl } from '../../../utils/imageUtils'

const Typography = () => {
  // MakrCards.js에서 클릭한 프로젝트의 번호를 전달받기 위함
  const location = useLocation()
  const pro_num = location.state?.pro_num

  const [data, setData] = useState()
  const [proBasic, setProBasic] = useState(null)
  const [proDetailList, setProDetailList] = useState([])
  const [proClass, setProClass] = useState(null)
  const [proFunList, setProFunList] = useState([])
  const [proDanalyList, setproDanalyList] = useState([])
  const [proIoTList, setProIoTList] = useState([])
  const [slide, setSlide] = useState(null)
  const [pro_doc_url, setProDocUrl] = useState(location.state?.pro_doc_url)
  let mem_level = window.localStorage.getItem('mem_level')

  const slideNum = (detailList) => {
    // PPT 또는 슬라이드쇼용 폴더 찾기 (확장자가 없는 URL)
    const slideItem = detailList.find(
      (item) =>
        item.pro_detail_url &&
        !/\.(jpg|JPG|jpeg|JPEG|png|PNG|pdf|PDF|mp4|MP4)$/.test(item.pro_detail_url),
    )

    if (!slideItem) {
      console.log('📸 slideNum - 슬라이드쇼 항목 없음')
      return []
    }

    let len = slideItem.pro_detail_contnum || 25 // NULL이면 기본값 25
    let url = slideItem.pro_detail_url

    console.log('📸 slideNum - 원본 URL:', url)
    console.log('📸 slideNum - 슬라이드 개수:', len)

    // URL 변환
    url = convertImageUrl(url)

    console.log('📸 slideNum - 변환된 URL:', url)

    let slideNmlist = []

    for (let i = 0; i < len; i++) {
      slideNmlist.push(`${url}/${i}.jpg`)
    }

    console.log('📸 slideNum - 생성된 URL 리스트:', slideNmlist.slice(0, 3))

    return slideNmlist
  }

  useEffect(() => {
    let url = pro_doc_url.slice(0, -9)
    setProDocUrl(url + 'doc.pdf')
    axios({
      method: 'POST',
      url: `/project-smhrd/project/projectDetail/${pro_num}`,
      responseType: 'json',
    }).then((response) => {
      setData(response.data)
      if (response.data != null) {
        setProBasic(response.data.pro_basic)
        setProClass(response.data.pro_class)

        // 첫 번째 detail URL 처리
        if (response.data.pro_detailList[0]) {
          response.data.pro_detailList[0].pro_detail_url = convertImageUrl(
            response.data.pro_detailList[0].pro_detail_url,
          )
        }

        setProDetailList(response.data.pro_detailList)
        setProFunList(response.data.pro_funList)
        setproDanalyList(response.data.pro_danalyList)
        setProIoTList(response.data.pro_iotList)

        let list = slideNum(response.data.pro_detailList)

        setSlide(list)
      }
    })
  }, [])

  return (
    <>
      <CCard className="mb-4" style={{ lineHeight: 2 }}>
        <CCardHeader className="header-align">
          Detail
          <span>
            {/* 기획서 프리뷰  */}
            {mem_level == '관리자' || mem_level == '마스터' ? (
              <CButton color="primary" variant="outline">
                <a href={pro_doc_url} style={{ textDecoration: 'none' }} download="">
                  기획서보기
                </a>
              </CButton>
            ) : (
              <PdfViewer projectUrl={pro_doc_url} />
            )}
          </span>
        </CCardHeader>
        <CCardBody>
          <CCarousel controls transition="crossfade">
            {slide !== null ? (
              slide.map((item, index) => {
                // URL 변환
                const realImg = convertImageUrl(item)

                return (
                  <CCarouselItem key={index}>
                    <CImage
                      src={realImg}
                      className="d-block w-100"
                      alt="slide 1"
                      style={{ objectFit: 'cover' }}
                    />
                  </CCarouselItem>
                )
              })
            ) : (
              <CSpinner color="primary" />
            )}
          </CCarousel>
        </CCardBody>

        <CCardHeader>
          <strong>프로젝트 소개</strong>
        </CCardHeader>

        {proBasic !== null ? (
          <CCardBody>
            <h3 className="h3-title">{proBasic.pro_theme}</h3>
            <p>
              <strong>과정명 : </strong>{' '}
              <span>
                {proClass?.curri_name} {proClass?.curri_cnt}회차
              </span>
            </p>
            <p>
              <strong>팀명 : </strong> <span>{proBasic.pro_team}</span>
            </p>
          </CCardBody>
        ) : (
          <CSpinner color="primary" />
        )}

        <CCardHeader>
          <strong>1줄 요약</strong>
        </CCardHeader>

        {proBasic !== null ? (
          <CCardBody>
            <div className="div-align">
              <h3 className="h3-title">About</h3>
              <h1 className="h1-title">{proBasic.pro_name}</h1>
            </div>
            <p>{proBasic.pro_nutshell}</p>
          </CCardBody>
        ) : (
          <CSpinner color="primary" />
        )}

        <ol>
          {proFunList.length !== 0
            ? proFunList.map((item, index) => <li key={index}>{item.pro_fun}</li>)
            : ''}
        </ol>

        <CCardHeader>
          <strong>시연영상</strong>
        </CCardHeader>

        <CCardBody style={{ textAlign: 'center' }}>
          {proDetailList.length !== 0 ? (
            (() => {
              // video.mp4 찾기
              const videoItem = proDetailList.find(
                (item) =>
                  item.pro_detail_url && /\.(mp4|MP4|avi|AVI|mov|MOV)$/i.test(item.pro_detail_url),
              )
              const videoUrl = videoItem ? convertImageUrl(videoItem.pro_detail_url) : null

              return videoUrl ? (
                mem_level == '관리자' || mem_level == '마스터' ? (
                  <video
                    style={{ height: '500px' }}
                    src={videoUrl}
                    controls
                    className="video"
                    preload="metadata"
                    id="video_style"
                  ></video>
                ) : (
                  <video
                    style={{ height: '500px' }}
                    src={videoUrl}
                    controls
                    className="video"
                    preload="metadata"
                    id="video_style"
                    controlsList="nodownload"
                  ></video>
                )
              ) : (
                <p>시연영상이 없습니다.</p>
              )
            })()
          ) : (
            <CSpinner color="primary" />
          )}
        </CCardBody>
        <CCardHeader>
          <strong>산출문서</strong>
        </CCardHeader>
        <CCardBody>
          {proDetailList !== null ? (
            <TabDoc data={proDetailList} style={{ marginTop: '0px !important' }}></TabDoc>
          ) : (
            <CSpinner color="primary" />
          )}
        </CCardBody>

        {/* {console.log('[proDanalyList]:', proDanalyList.length)} */}
        {proClass?.curri_name.indexOf('인공지능') === 0 ||
        proClass?.curri_name.indexOf('빅데이터') === 0 ? (
          proDanalyList.length !== 0 ? (
            <div>
              <CCardHeader>
                <strong>빅데이터 분석정의서</strong>
              </CCardHeader>
              <CCardBody>
                <TabBig data={proDanalyList}></TabBig>
              </CCardBody>
            </div>
          ) : (
            ''
          )
        ) : proIoTList.length !== 0 ? (
          <div>
            <CCardHeader>
              <strong>회로도</strong>
            </CCardHeader>
            <CCardBody>
              <TabBig data={proDanalyList}></TabBig>
            </CCardBody>
          </div>
        ) : (
          ''
        )}
      </CCard>
    </>
  )
}

export default Typography
