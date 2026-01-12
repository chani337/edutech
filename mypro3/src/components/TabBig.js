/* eslint-disable react/prop-types */
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Nav } from 'react-bootstrap'
const TabBig = ({ data }) => {
  // console.log('[TabBig]:', data)
  console.log('[TabBig]:', data)

  function TabContent(props) {
    // console.log('[TabContent key]:', props.key)
    if (props.clickedTab === 0) {
      return (
        <div>
          <table style={{ width: '100%' }}>
            <thead>
              <tr className="tab_col">
                <th className="tab_th th-col-1">구분</th>
                <th className="tab_th">내용</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="tab_td td-col">데이터정의</td>
                <td className="tab_td td_normal">
                  {props.content.pro_danaly_data}
                  {/* 총 15가지 견종의 강아지 사진 데이터 (비숑, 보더콜리, 치와와, 차우차우,
                  골든래트리버, 허스키, 말티즈, 포메라니안, 푸들, 시바, 시츄, 웰시코기,
                  요크셔테리어, 닥스훈트, 진돗개, 믹스견) */}
                </td>
              </tr>

              <tr>
                <td className="tab_td td-col">데이터 획득 방법</td>
                <td className="tab_td td_normal">
                  {/* 1. 강아지 사진 구글 이미지에서 각 견종별 약 1000장씩 크롤링 <br></br>
                  2. Stanford Dogs Dataset 2만개{' '}
                  <a href="http://vision.stanford.edu/aditya86/ImageNetDogs/">
                    http://vision.stanford.edu/aditya86/ImageNetDogs/
                  </a> */}
                  {props.content.pro_danaly_getdata ? props.content.pro_danaly_getdata : '-'}
                  {props.content.pro_danaly_data ? props.content.pro_danaly_data : '-'}
                  {props.content.pro_danaly_url ? props.content.pro_danaly_url : '-'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )
    } else if (props.clickedTab === 1) {
      return (
        <div>
          <table style={{ width: '100%' }}>
            <thead>
              <tr className="tab_col">
                <th className="tab_th th-col-1">구분</th>
                <th className="tab_th">내용</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="tab_td td-col">전처리 과정</td>
                <td className="tab_td td_normal">
                  {/* Keras의 Imgagegenerator를 사용해서 이미지 회전 및 이동을 통해 이미지 데이터 6배
                  증강(각 1000개를 6000개로, 총 9만개) */}
                  {props.content.pro_danaly_data_proccess
                    ? props.content.pro_danaly_data_proccess
                    : '-'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )
    } else if (props.clickedTab === 2) {
      return (
        <div>
          <table style={{ width: '100%' }}>
            <thead>
              <tr className="tab_col">
                <th className="tab_th th-col-1">구분</th>
                <th className="tab_th">내용</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="tab_td td-col">모델링 목표</td>
                <td className="tab_td td_normal">
                  {/* 견종 예측, 털 색상 예측 */}
                  {props.content.pro_danaly_model_goal ? props.content.pro_danaly_model_goal : '-'}
                </td>
              </tr>

              <tr>
                <td className="tab_td td-col">모델링 가능 알고리즘</td>
                <td className="tab_td td_normal">
                  {/* 견종 예측 : CNN 모델, VGG16 <br /> 다중 분류 털 색상 예측 : Dlib, CNN, K-means
                  알고리즘,수학적 거리 계산 공식 */}
                  {props.content.pro_danaly_model_algo ? props.content.pro_danaly_model_algo : '-'}
                </td>
              </tr>
              <tr>
                <td className="tab_td td-col">학습</td>
                <td className="tab_td td_normal">
                  {/* 견종예측 : Convolution층을 전이학습 <br></br>털 색상 예측 <br></br>- Dlib과 CNN을
                  사용해서 강아지의 얼굴 추출<br></br>- K-means Color Clustering 알고리즘을 사용해서
                  사진의 평균 색 상을 추출 후 가장 높은 비율의 색상 선택<br></br> */}
                  {props.content.pro_danaly_modeling}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )
    } else if (props.clickedTab === 3) {
      return (
        <div>
          <table style={{ width: '100%' }}>
            <thead>
              <tr className="tab_col">
                <th className="tab_th th-col-1">구분</th>
                <th className="tab_th">내용</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="tab_td td-col">모델링 검증</td>
                <td className="tab_td td_normal">
                  {/* 15가지 견종의 강아지 이미지 데이터를 추가적으로 약 200장 정도 확보 후 견종 예측
                  모델 검증 */}
                  {props.content.pro_danaly_verifi ? props.content.pro_danaly_verifi : '-'}
                </td>
              </tr>

              <tr>
                <td className="tab_td td-col">모델링 평과 결과</td>
                <td className="tab_td td_normal">
                  {/* 견종 예측 <br></br>- CNN 모델 : 0.08% 정확도 <br></br>- VGG16 다중 분류 모델 : 87%
                  정확도 */}
                  {props.content.pro_danaly_evalu ? props.content.pro_danaly_evalu : '-'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )
    }
  }

  let [clickedTab, changeTab] = useState(0)

  return (
    <>
      <Nav className="mt-5 mb-3" variant="tabs" defaultActiveKey="link-0" id="nav_style">
        <Nav.Item>
          <Nav.Link
            eventKey="link-0"
            onClick={() => {
              changeTab(0)
            }}
          >
            데이터 준비
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-1"
            onClick={() => {
              changeTab(1)
            }}
          >
            전처리
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-2"
            onClick={() => {
              changeTab(2)
            }}
          >
            모델 생성 및 학습
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-3"
            onClick={() => {
              changeTab(3)
            }}
          >
            검증
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {data &&
        data.map((item, index) => (
          <>
            <h1>{item.pro_danaly_name}</h1>
            <TabContent key={index} content={item} clickedTab={clickedTab} />
            <br />
          </>
        ))}
    </>
  )
}

export default TabBig
