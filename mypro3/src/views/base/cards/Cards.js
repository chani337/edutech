/* eslint-disable react/prop-types */
import React, { Component, Suspense, useRef } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CSpinner,
  CButton,
  CContainer,
} from '@coreui/react'
import { DocsCallout } from 'src/components'
import MakeCards from './MakeCards'
import Select from 'react-select'
import axios from '../../../axios'
import CardHeaderInfo from './CardHeaderInfo'
import MakeCardList from './MakeCardList'
import Pagination from './Pagination'
import { connect } from 'react-redux'
import { LodingConText } from 'src/layout/DefaultLayout'
import '../../../scss/style.scss'
import { Link } from 'react-router-dom'

class Cards extends Component {
  static contextType = LodingConText
  // postsPerPage: 한 페이지에 보여줄 게시글 수
  // 참고사이트: https://chanhuiseok.github.io/posts/react-13/

  inputRef = React.createRef()

  state = {
    checkList: false,
    data: [],
    currentPage: 1,
    postsPerPage: 8,
    keyword: [],
    keywordCheck: true,
    inputValue: '',
    checkModal: 1,
  }

  modalFunc = (ch) => {
    this.setState({ checkModal: ch })
  }

  chlist = () => {
    const ck = this.state.checkList
    ck === false ? this.setState({ checkList: true }) : this.setState({ checkList: false })
  }

  keywordHandle() {
    if (this.state.checkModal == 1) {
      this.setState({ checkModal: 0 })
    }

    if (this.state.keywordCheck === false) {
      axios({
        method: 'POST',
        url: '/project-smhrd/project/projectList',
        data: {
          keyword: this.state.keyword,
        },
        responseType: 'json',
      }).then((response) => {
        this.setState({
          checkList: false,
          data: response.data,
        })
      })
      this.setState({ keywordCheck: true })
    }
  }

  componentDidUpdate(prevProps, preState) {
    //1. 수상여부, 주제형태, 분석데이터 형태중 어떤게 바뀌었는지 확인 필요

    if (prevProps === this.props && this.context.loding == true) {
      let reUrl = ''
      if (this.props.pro_prize) {
        reUrl = `/project-smhrd/project/projectList/pro_prize/${this.props.pro_prize}`
      } else if (this.props.dtype_num) {
        reUrl = `/project-smhrd/project/projectList/dtype_num/${this.props.dtype_num}`
      } else if (this.props.pro_type) {
        reUrl = `/project-smhrd/project/projectList/pro_type/${this.props.pro_type}`
      }

      axios({
        method: 'POST',
        url: reUrl,
        responseType: 'json',
      }).then((response) => {
        this.inputRef.current.clearValue()
        this.context.setloding(false)
        const dataSet = response.data.reverse()
        this.setState({ data: dataSet, currentPage: 1 })
      })
    }

    if (
      prevProps.pro_prize !== this.props.pro_prize &&
      this.props.pro_prize !== undefined &&
      this.context.loding == true
    ) {
      axios({
        method: 'POST',
        url: `/project-smhrd/project/projectList/pro_prize/${this.props.pro_prize}`,
        responseType: 'json',
      }).then((response) => {
        this.inputRef.current.clearValue()
        this.context.setloding(false)
        const dataSet = response.data.reverse()
        this.setState({ data: dataSet, currentPage: 1 })
      })
    }
    if (
      prevProps.pro_type !== this.props.pro_type &&
      this.props.pro_type !== undefined &&
      this.context.loding == true
    ) {
      axios({
        method: 'POST',
        url: `/project-smhrd/project/projectList/pro_type/${this.props.pro_type}`,
        responseType: 'json',
      }).then((response) => {
        this.inputRef.current.clearValue()
        this.context.setloding(false)
        const dataSet = response.data.reverse()
        this.setState({ data: dataSet, currentPage: 1 })
      })
    }
    if (
      prevProps.dtype_num !== this.props.dtype_num &&
      this.props.dtype_num !== undefined &&
      this.context.loding == true
    ) {
      axios({
        method: 'POST',
        url: `/project-smhrd/project/projectList/dtype_num/${this.props.dtype_num}`,
        responseType: 'json',
      }).then((response) => {
        this.inputRef.current.clearValue()
        this.context.setloding(false)
        const dataSet = response.data.reverse()
        this.setState({ data: dataSet, currentPage: 1 })
      })
    }

    if (
      this.props.pro_type == undefined &&
      this.props.pro_prize == undefined &&
      this.props.dtype_num == undefined
    ) {
    }

    if (preState.keyword !== this.state.keyword && this.state.keyword != null) {
      this.keywordHandle()
    }
  }

  // paginate()로 하면 오류발생
  // -->호출하는 함수가 바인딩되지 않아 발생되는 현상
  // 해결방법1: 생성자에서 바인딩 -> this.paginate => this.paginate.bind(this)
  // 해결방법2: 화살표함수로 구현(자동 바인딩)
  // 참고사이트: https://devlog.jwgo.kr/2018/08/20/set-state-undefined-error-in-react/

  paginate = (number) => {
    this.setState({
      currentPage: number,
    })
  }
  chlist = () => {
    const ck = this.state.checkList
    this.state.checkList == false
      ? this.setState({ checkList: true })
      : this.setState({ checkList: false })
  }

  //키워드 선택시 키워드값을 전송
  // 역으로 출력되게 제작
  searchKeyword = (e) => {
    this.props = {
      dtype_num: undefined,
      pro_type: undefined,
      pro_prize: undefined,
    }
    let keyArr = []
    if (Array.isArray(e)) {
      if (e.length > 0) {
        // keyArr.splice(0,0,)
        // 키워드 선택시 역으로 출력x
        // 단 카드는 역으로 마지막에 고른 키워드부터 출력
        keyArr = e.map((element) => {
          return element.value
        })

        this.setState({ keyword: keyArr })
        this.setState({ keywordCheck: false })
      } else {
        this.setState({ keyword: null })
        this.setState({ keywordCheck: false })
      }
    }
    //??
    else {
      this.inputRef.current.clearValue()
      this.setState({ keyword: null })
      this.setState({ keywordCheck: true })
    }
  }

  render() {
    const options = [
      { value: '1', label: '안전(화재,날씨)' },
      { value: '2', label: 'IoT' },
      { value: '3', label: '뷰티,헬스케어(건강,뷰티,심리,패션,인테리어)' },
      { value: '4', label: '문화(도서, 스포츠, 여행, 음식, SNS)' },
      { value: '5', label: '언어·교육(번역, 의사소통(농인))' },
      { value: '6', label: '사회(부동산, 상권, 주식)' },
      { value: '7', label: '자기개발(취업, 심리)' },
      { value: '8', label: '복지(편의, 육아)' },
      { value: '9', label: '동·식물' },
    ]

    const indexOfLast = this.state.currentPage * this.state.postsPerPage
    const indexOfFirst = indexOfLast - this.state.postsPerPage
    const currentPosts = (posts) => {
      let currentPosts = 0
      currentPosts = posts.slice(indexOfFirst, indexOfLast)
      return currentPosts
    }
    return (
      <>
        <CRow className="justify-content-around">
          <CCol xs={12} className="align-self-end">
            {/* <Link to="/base/addproject">
              <CButton color="dark" className="project-btn">
                프로젝트 등록
              </CButton>
            </Link>
            <CButton color="dark" className="project-btn" onClick={(e) => this.searchKeyword(e)}>
              프로젝트 타입 선택
            </CButton> */}
            <DocsCallout name="Card" href="components/card" />
          </CCol>
        </CRow>
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <CardHeaderInfo
                  style={{}}
                  chlist={this.chlist}
                  checkList={this.state.checkList}
                ></CardHeaderInfo>
              </CCardHeader>
              <CCardHeader>
                <Select
                  isMulti
                  name="colors"
                  options={options}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={(e) => this.searchKeyword(e)}
                  ref={this.inputRef}
                />
              </CCardHeader>

              <CCardBody>
                {this.state.checkList === false ? (
                  // 구분값을 makeCard로 props 전달
                  <>
                    {this.context.loding ? <CSpinner color="primary" /> : <></>}
                    <MakeCards
                      data={this.state.data}
                      pro_prize={this.props.pro_prize}
                      pro_type={this.props.pro_type}
                      dtype_num={this.props.dtype_num}
                      checkModal={this.modalFunc}
                      lodingData={this.state.checkModal}
                      searchKeyword={this.searchKeyword}
                    ></MakeCards>
                  </>
                ) : (
                  // <MakeCards
                  //   data={this.state.data}
                  //   pro_prize={this.props.pro_prize}
                  //   pro_type={this.props.pro_type}
                  //   dtype_num={this.props.dtype_num}
                  //   checkModal={this.modalFunc}
                  //   lodingData={this.state.checkModal}
                  // ></MakeCards>
                  <MakeCardList data={currentPosts(this.state.data)}></MakeCardList>
                )}
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </>
    )
  }
}

export default Cards
