/* eslint-disable react/prop-types */
import React from 'react'
import { useState } from 'react'
import { Nav } from 'react-bootstrap'

const DBConnectTab = () => {
  const img_path = {
    sqldev: [
      '/img/sqldeveloper/01.png',
      '/img/sqldeveloper/02.png',
      '/img/sqldeveloper/03.png',
      '/img/sqldeveloper/04.png',
      '/img/sqldeveloper/05.png',
    ],
    eclipse: [
      '/img/eclipse/01.png',
      '/img/eclipse/02.png',
      '/img/eclipse/03.png',
      '/img/eclipse/04.png',
      '/img/eclipse/05.png',
      '/img/eclipse/06.png',
      '/img/eclipse/07.png',
    ],
  }

  function TabContent(props) {
    if (props.selectTab === 0) {
      return (
        <div style={{ textAlign: 'center' }}>
          {img_path['sqldev'].map((item, index) => (
            <img src={item} key="index" alt="이미지없음"></img>
          ))}
        </div>
      )
    } else if (props.selectTab === 1) {
      return (
        <div style={{ textAlign: 'center' }}>
          {img_path['eclipse'].map((item, index) => (
            <img src={item} key="index" alt="이미지없음"></img>
          ))}
        </div>
      )
    }
  }

  const [tab, setTab] = useState(0)

  return (
    <>
      <h1>DataBase 연동방법</h1>
      <Nav className="mt-5 mb-3" variant="tabs" defaultActiveKey="link-0" id="nav_style">
        <Nav.Item>
          <Nav.Link
            eventKey="link-0"
            onClick={() => {
              setTab(0)
            }}
          >
            서비스흐름도
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-1"
            onClick={() => {
              setTab(1)
            }}
          >
            유스케이스 다이어그램
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent selectTab={tab}></TabContent>
    </>
  )
}

export default DBConnectTab
