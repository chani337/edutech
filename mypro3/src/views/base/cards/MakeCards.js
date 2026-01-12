/* eslint-disable react/prop-types */
import React, { Component } from 'react'
// import Pagination from './Pagination'
import Pagination from 'react-js-pagination'
import { Route, Link } from 'react-router-dom'
import axios from '../../../axios'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardImage,
  CCardTitle,
  CCol,
  CRow,
} from '@coreui/react'
import { connect } from 'react-redux'
import { LodingConText } from 'src/layout/DefaultLayout'
import '../../../scss/paging.scss'
import { ProjectContext } from 'src/App'
import { convertImageUrl } from '../../../utils/imageUtils'

class makeCards extends Component {
  static contextType = LodingConText
  static proContext = ProjectContext

  state = {
    data: [],
    currentPage: 1,
    postsPerPage: 8,
    page: 1,
    mem_level: '',
  }

  constructor(props) {
    super(props)

    this.handleSuccess = this.handleSuccess.bind(this)
    this.searchKeyword = this.searchKeyword.bind(this)
  }
  handleSuccess() {
    this.props.checkModal(0)
  }
  searchKeyword() {
    this.props.searchKeyword('test')
  }

  handlePageChange = (page) => {
    this.setPage(page)
  }

  // async getDataAll() {
  //   await axios({
  //     method: 'POST',
  //     url: `/project-smhrd/project/projectList`,
  //     responseType: 'json',
  //   }).then((response) => {
  //     this.setState({ data: response.data })
  //   })
  // }

  componentDidMount() {
    //this.getDataAll()
    //기본 실행시 전체 데이터를 받아옴
    this.setState({ mem_level: window.localStorage.getItem('mem_level') })
    if (
      this.props.pro_type == undefined &&
      this.props.pro_prize == undefined &&
      this.props.dtype_num == undefined
    ) {
      axios({
        method: 'POST',
        url: `/project-smhrd/project/projectList`,
        responseType: 'json',
      }).then((response) => {
        this.context.setloding(false)
        const dataSet = response.data.reverse()
        this.setState({ data: dataSet })
      })
    }

    if (this.props.pro_prize !== undefined) {
      axios({
        method: 'POST',
        url: `/project-smhrd/project/projectList/pro_prize/${this.props.pro_prize}`,
        responseType: 'json',
      }).then((response) => {
        this.context.setloding(false)
        const dataSet = response.data
        this.setState({ data: dataSet, currentPage: 1 })
      })
    }

    if (this.props.pro_type !== undefined) {
      axios({
        method: 'POST',
        url: `/project-smhrd/project/projectList/pro_type/${this.props.pro_type}`,
        responseType: 'json',
      }).then((response) => {
        this.context.setloding(false)
        const dataSet = response.data
        this.setState({ data: dataSet, currentPage: 1 })
      })
    }

    if (this.props.dtype_num !== undefined) {
      axios({
        method: 'POST',
        url: `/project-smhrd/project/projectList/dtype_num/${this.props.dtype_num}`,
        responseType: 'json',
      }).then((response) => {
        this.context.setloding(false)
        const dataSet = response.data
        this.setState({ data: dataSet, currentPage: 1 })
      })
    }
  }

  // componentDidUpdate(prevProps) {
  //   //
  //   // 넘겨받은 키워드값이 기존값과 변동이 있는지 체크
  //   let keyword_check = prevProps.data.length !== this.props.data.length ? true : false

  //   if (this.props.data.length == 0) {
  //   } else if (this.props.data.length > 0 && keyword_check) {
  //     const dataSet = this.props.data.reverse()

  //     this.setState({ data: dataSet, currentPage: 1 })
  //   }

  //   // props로 전달 받은값과 업데이트 된 값을 비교해야 무한루프에 안빠짐

  //   //수상
  //   let prize_check = prevProps.pro_prize !== this.props.pro_prize ? true : false

  //   //주제 형태 (기업, 자율, 챌린지, 리버스)
  //   let type_check = prevProps.pro_type !== this.props.pro_type ? true : false

  //   //분석 데이터 형태(음성, 영상, 이미지, 텍스트)
  //   let data_check = prevProps.dtype_num !== this.props.dtype_num ? true : false

  //   // axios({
  //   //   method: 'GET',
  //   //   url: '/project-smhrd/project/projectCnt',
  //   //   responseType: 'json',
  //   // }).then((response) => {
  //   // })

  //   if (this.props.pro_prize !== undefined && prize_check) {
  //     this.searchKeyword()
  //     // 수상별 요청
  //     // state수정시 currentPage :1로 수정해야 탭 클릭시 초기 값이 1로 설정가능해서 수정

  //     axios({
  //       method: 'POST',
  //       url: `/project-smhrd/project/projectList/pro_prize/${this.props.pro_prize}`,
  //       responseType: 'json',
  //     }).then((response) => {
  //       this.context.setloding(false)
  //       const dataSet = response.data.reverse()
  //       this.setState({ data: dataSet, currentPage: 1 })
  //     })
  //   } else if (this.props.pro_type !== undefined && type_check) {
  //     this.searchKeyword()
  //     // 프로젝트 타입별 요청
  //     axios({
  //       method: 'POST',
  //       url: `/project-smhrd/project/projectList/pro_type/${this.props.pro_type}`,
  //       responseType: 'json',
  //     }).then((response) => {
  //       this.context.setloding(false)
  //       const dataSet = response.data.reverse()
  //       this.setState({ data: dataSet, currentPage: 1 })
  //     })
  //   } else if (this.props.dtype_num !== undefined && data_check) {
  //     this.searchKeyword()
  //     // 프로젝트 데이터 형태별 요청
  //     axios({
  //       method: 'POST',
  //       url: `/project-smhrd/project/projectList/dtype_num/${this.props.dtype_num}`,
  //       responseType: 'json',
  //     }).then((response) => {
  //       this.context.setloding(false)
  //       const dataSet = response.data.reverse()
  //       this.setState({ data: dataSet, currentPage: 1 })
  //     })
  //   } else if (
  //     (this.props.pro_type == undefined &&
  //       this.props.pro_prize == undefined &&
  //       this.props.dtype_num == undefined &&
  //       prize_check) ||
  //     type_check ||
  //     data_check
  //   ) {
  //     this.searchKeyword()
  //     // 전체프로젝트 조회시 요청
  //     axios({
  //       method: 'POST',
  //       url: `/project-smhrd/project/projectList`,
  //       responseType: 'json',
  //     }).then((response) => {
  //       this.context.setloding(false)
  //       const dataSet = response.data.reverse()
  //       this.setState({ data: dataSet, currentPage: 1 })
  //     })
  //   }
  // }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      const dataSet = this.props.data.reverse()
      this.setState({ data: dataSet })
    }
  }

  paginate = (number) => {
    this.setState({
      currentPage: number,
    })
  }

  render() {
    const indexOfLast = this.state.currentPage * this.state.postsPerPage
    const indexOfFirst = indexOfLast - this.state.postsPerPage
    const currentPosts = (posts) => {
      let currentPosts = 0
      currentPosts = posts.slice(indexOfFirst, indexOfLast)
      return currentPosts
    }

    return (
      <>
        <CRow xs={{ cols: 1, gutter: 3 }} md={{ cols: 4 }}>
          {/* axios 응답데이터를 페이지네이션을 통해 값을 자르기 위하여 currentpost로 수정 */}
          {/*  */}
          {currentPosts(this.state.data).map((arr, index) => {
            // 이미지 URL 변환
            let realImg = convertImageUrl(arr.pro_img)

            return (
              <CCol xs key={index}>
                <CCard>
                  {/* 0826 이미지 클릭시 이동으로 변경_정형 */}
                  <Link
                    to="/base/base/theme/typography"
                    state={{ pro_num: arr.pro_num, pro_doc_url: realImg }}
                  >
                    <CCardImage orientation="top" src={realImg} />
                  </Link>
                  <CCardBody>
                    <CCardTitle>{arr.pro_theme}</CCardTitle>
                    {/*<CCardText>{arr.content}</CCardText>*/}
                  </CCardBody>
                  <CCardFooter>
                    <CButton color="info">{arr.pro_type}</CButton>
                    {arr.pro_prize !== undefined ? (
                      <CButton color="success">{arr.pro_prize}</CButton>
                    ) : null}
                  </CCardFooter>
                </CCard>
              </CCol>
            )
          })}
        </CRow>
        {this.state.mem_level !== '일반' ? (
          <Pagination
            activePage={this.state.currentPage} // 현재 페이지
            itemsCountPerPage={this.state.postsPerPage} // 한 페이지랑 보여줄 아이템 갯수
            totalItemsCount={this.state.data.length} // 총 아이템 갯수
            pageRangeDisplayed={5} // paginator의 페이지 범위
            prevPageText={'‹'} // "이전"을 나타낼 텍스트
            nextPageText={'›'} // "다음"을 나타낼 텍스트
            onChange={this.paginate} // 페이지 변경을 핸들링하는 함수
          />
        ) : (
          <Pagination
            activePage={this.state.currentPage} // 현재 페이지
            itemsCountPerPage={8} // 한 페이지랑 보여줄 아이템 갯수
            totalItemsCount={this.state.data.length} // 총 아이템 갯수
            pageRangeDisplayed={1} // paginator의 페이지 범위
            prevPageText={''} // "이전"을 나타낼 텍스트
            nextPageText={''} // "다음"을 나타낼 텍스트
            onChange={this.paginate} // 페이지 변경을 핸들링하는 함수
          />
        )}
      </>
    )
  }
}

export default makeCards
