/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { CFormInput } from '@coreui/react'
class CardHeaderInfo extends Component {
  chlist = () => {
    this.props.chlist()
  }

  render() {
    return (
      <>
        {/* 0922 디자인 수정 */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <strong>프로젝트 조회</strong>

          <div style={{ display: 'flex', alignItems: 'baseline' }}>
            {/* <div style={{ marginRight: '2em' }}>
              <strong>검색 : </strong>
              <input placeholder="검색어를 입력하세요"></input>
            </div> */}

            {/* 리스트형 보기 주석 */}
            {/* <div>
              {this.props.checkList == false ? (
                <strong onClick={this.chlist}>리스트형 보기</strong>
              ) : (
                <strong onClick={this.chlist}>카드형 보기</strong>
              )}

              <svg
                style={{ marginLeft: '0.5em' }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="icon icon-lg"
                role="img"
              >
                <rect
                  width="352"
                  height="32"
                  x="80"
                  y="96"
                  fill="var(--ci-primary-color, currentColor)"
                  className="ci-primary"
                ></rect>
                <rect
                  width="352"
                  height="32"
                  x="80"
                  y="240"
                  fill="var(--ci-primary-color, currentColor)"
                  className="ci-primary"
                ></rect>
                <rect
                  width="352"
                  height="32"
                  x="80"
                  y="384"
                  fill="var(--ci-primary-color, currentColor)"
                  className="ci-primary"
                ></rect>
              </svg>
            </div> */}
          </div>
        </div>
      </>
    )
  }
}

export default CardHeaderInfo
