/* eslint-disable array-callback-return */
/* eslint-disable react/prop-types */
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Nav } from 'react-bootstrap'
import { convertImageUrl } from '../utils/imageUtils'

const TabDoc = ({ data }) => {
  // 산출문서 탭 생성 시 시연영상(0), PPT(1) 제외하기 위해 slice() 이용
  const detail = data !== null ? data.slice(2, data.length) : null
  const [clickedTab, changeTab] = useState(0)

  function TabContent(props) {
    // console.log('탭번호:', props.clickedTab)

    for (let i = 0; i < detail.length; i++) {
      if (props.clickedTab === i) {
        // URL 변환
        const url = convertImageUrl(detail[props.clickedTab].pro_detail_url)

        return (
          <div style={{ textAlign: 'center' }}>
            <img src={url} className="doc_img" alt={detail[props.clickedTab].pro_detail_type}></img>
          </div>
        )
      }
    }
  }

  // useEffect(() => {
  //   TabContent(clickedTab)
  // }, [clickedTab])

  return (
    <>
      <Nav className="mt-5 mb-3" variant="tabs" defaultActiveKey="link-0" id="nav_style">
        {detail.map((item, index) => (
          <Nav.Item key={index}>
            <Nav.Link
              eventKey={`link-${index}`}
              onClick={() => {
                changeTab(index)
              }}
            >
              {item.pro_detail_type}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
      <TabContent clickedTab={clickedTab} />
    </>
  )
}

export default TabDoc
