import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CFormCheck,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser, cilPen } from '@coreui/icons'
import { CFormSelect } from '@coreui/react'
import { useEffect, useState, useRef } from 'react'
import qs from 'qs'
import axios from '../../../axios'
import { Link, useNavigate } from 'react-router-dom'
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import { gapi } from 'gapi-script'
import { toast } from 'react-custom-alert'
import 'react-custom-alert/dist/index.css'

const Register = () => {
  //const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT

  const nav = useNavigate()

  const [classArray, setClass] = useState([])
  const [userEmail, setUserEmail] = useState('')
  const [inputEmail, setInputEmail] = useState(0)
  const [btnState, setBtnState] = useState(false)

  const userName = useRef()
  const userEmailRef = useRef()
  const googleRef = useRef()

  const checkRef1 = useRef()
  const checkRef2 = useRef()

  const classCode = useRef()

  let classCheck = 0
  function checkCurri(e) {
    console.log(e)
    classCheck = e.target.value
  }
  //과정명 불러오기
  async function classes() {
    await axios
      .get('/project-smhrd/user/classes')
      .then((res) => {
        console.log(res)
        let jsCnt = 0
        let viCnt = 0
        let iotCnt = 0
        let classList = [{ value: '0', label: '과정명 선택' }]

        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].curri_name.includes('JS')) {
            if (jsCnt == 0) {
              res.data[i].curri_name += '_A'
              jsCnt++
            } else {
              res.data[i].curri_name += '_B'
            }
          } else if (res.data[i].curri_name.includes('시각지능')) {
            if (viCnt == 0) {
              res.data[i].curri_name += '_A'
              viCnt++
            } else {
              res.data[i].curri_name += '_B'
            }
          } else if (res.data[i].curri_name.includes('사물지능')) {
            if (iotCnt == 0) {
              res.data[i].curri_name += '_A'
              iotCnt++
            } else {
              res.data[i].curri_name += '_B'
            }
          }
          if (!res.data[i].curri_name.includes('AI')) {
            res.data[i].curri_name += '_' + res.data[i].curri_cnt + '회차'
          }

          res.data[i].value = i + 1
          res.data[i].label = res.data[i].curri_name
          classList.push(res.data[i])
        }

        setClass(classList)
      })
      .catch((err) => {
        toast.error('과정명 데이터 불러오기 실패 관리자에게 문의 해주세요')
      })
  }

  const tryJoin = () => {
    // 만약 사용자가 정보를 전부 입력했다면 => 통신 시작

    if (
      userName.current !== null &&
      userEmailRef.current !== null &&
      classCode.current !== null &&
      checkRef1.current.checked === true &&
      checkRef2.current.checked === true &&
      classCheck !== 0
    ) {
      let code = classArray[classCheck].class_code
      //setInputEmail(1)
      axios
        .post('/project-smhrd/user/signup', {
          mem_email: userEmail,
          mem_name: userName.current.value,
          class_code: code,
        })
        .then((res) => {
          nav('/')
        })
        .catch((err) => {
          console.log('회원가입 실패')
          toast.error('관리자에게 문의 해주세요')
        })
    } else {
      // 체크 필요
      toast.error('정보를 모두 입력해주세요.')
    }
  }

  //KAKAO 로그인 정보

  const REDIRECT_URI = 'https://smhrd-project-info.ddns.net:8071/register'
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`

  const getProfile = async () => {
    try {
      // Kakao SDK API를 이용해 사용자 정보 획득
      let data = await window.Kakao.API.request({
        url: '/v2/user/me',
      })
      // 사용자 정보 변수에 저장
      setUserEmail(data.kakao_account.email)
    } catch (err) {
      // console.log(err)
    }
  }

  const getToken = async (data) => {
    const code = new URL(window.location.href).searchParams.get('code')
    const payload = qs.stringify({
      grant_type: 'authorization_code',
      client_id: process.env.REACT_APP_REST_API_KEY,
      redirect_uri: REDIRECT_URI,
      code: code,
      client_secret: process.env.REACT_APP_CLIENT_SECRET,
    })
    try {
      // access token 가져오기
      const res = await axios.post('https://kauth.kakao.com/oauth/token', payload)

      // Kakao Javascript SDK 초기화
      window.Kakao.init(process.env.REACT_APP_REST_API_KEY)
      // access token 설정
      window.Kakao.Auth.setAccessToken(res.data.access_token)
      //history('/profile')
      getProfile()
    } catch (err) {
      //console.log(err)
    }
  }

  const redirectKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL
  }

  // //여기서 부터 NaverLogin
  // const naverRef = useRef()
  // const { naver } = window
  // const NAVER_CLIENT_ID = 'MZBheOxZpYZtpwIsHuyH'
  // const NAVER_CALLBACK_URL = 'http://localhost:3000/login'

  // const initializeNaverLogin = () => {
  //   const naverLogin = new naver.LoginWithNaverId({
  //     clientId: NAVER_CLIENT_ID,
  //     callbackUrl: NAVER_CALLBACK_URL,
  //     // 팝업창으로 로그인을 진행할 것인지?
  //     isPopup: false,
  //     // 버튼 타입 ( 색상, 타입, 크기 변경 가능 )
  //     loginButton: { color: 'green', type: 3, height: 50 },
  //     callbackHandle: true,
  //   })
  //   naverLogin.init()

  //   naverLogin.getLoginStatus(async function (status) {
  //     if (status) {
  //       tryJoin(naverLogin.user.getEmail())
  //     }
  //   })
  // }

  // const userAccessToken = () => {
  //   window.location.href.includes('access_token') && getTokenNaver()
  // }

  // const getTokenNaver = () => {
  //   const token = window.location.href.split('=')[1].split('&')[0]
  // }

  // const handleClick = () => {
  //   naverRef.current.children[0].click()
  // }

  useEffect(() => {
    classes()
    //getToken()
    // initializeNaverLogin()
    // userAccessToken()
  }, [])

  const onSuccess = (response) => {
    //console.log('SUCCESS', response)

    setUserEmail(response.profileObj.email)
    tryJoin()
  }
  const onFailure = (response) => {}
  const onLogoutSuccess = () => {}

  //googleLogin
  useEffect(() => {
    //console.log(googleClientId)

    function start() {
      gapi.client.init({
        clientId: '407040727643-v5l2rmgvuh6ootj330f8o6mavi9rilb1.apps.googleusercontent.com',
        scope: 'email',
      })
    }

    gapi.load('client:auth2', start)
  }, [])

  function jugeEmail() {
    if (inputEmail == 0) {
      toast.error('SNS를 통해서 가입해주세요')
      // alert('SNS를 통해서 가입해주세요')
      userEmailRef.current.value = ''
    }
  }

  function tryGoolgeLogin() {
    googleRef.current.children[0].click()
  }

  const linkStyle = {
    color: 'darkgrey',
  }

  const essStyle = {
    color: 'red',
  }

  return (
    <div
      className="bg-light min-vh-100 d-flex flex-row align-items-center"
      style={{ textAlign: 'center' }}
    >
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  <CInputGroup className="mb-3 ">
                    {/* <CInputGroup className="mb-1">
                      <button
                        style={{
                          backgroundImage: 'url("img/kakao_login.png")',
                          backgroundSize: 'cover',
                          width: '250px',
                          height: '35px',
                        }}
                        type="button"
                        className="loginBtn"
                        onClick={redirectKakaoLogin}
                      ></button>
                    </CInputGroup> */}
                    {/* <CInputGroup className="mb-2">
                      <button
                        id="naverIdLogin"
                        // ref={naverRef}
                        type="button"
                        style={{ display: 'none' }}
                      ></button>
                      <button
                        style={{
                          backgroundImage: 'url("img/naver_login.png")',
                          backgroundSize: 'cover',
                          width: '250px',
                          height: '35px',
                        }}
                        type="button"
                        className="loginBtn"
                        onClick={handleClick}
                      ></button>
                    </CInputGroup> */}
                    {/* 구글 로그인 */}
                    <CInputGroup
                      className="mb-2 loginBtn"
                      style={{ width: '250px', height: '35px' }}
                    >
                      <GoogleLogin
                        className="mb-2 loginBtn"
                        clientId="407040727643-v5l2rmgvuh6ootj330f8o6mavi9rilb1.apps.googleusercontent.com"
                        onSuccess={onSuccess}
                        onFailure={onFailure}
                        buttonText="구글로그인"
                        alignItems="center"
                      ></GoogleLogin>
                      {/* <div style={{ display: 'none' }} ref={googleRef}>
                        <GoogleLogin
                          className="mb-2 loginBtn"
                          clientId='407040727643-v5l2rmgvuh6ootj330f8o6mavi9rilb1.apps.googleusercontent.com'
                          onSuccess={onSuccess}
                          onFailure={onFailure}
                          buttonText="구글로그인"
                          alignItems="center"
                        ></GoogleLogin>
                      </div> */}
                      {/* <button
                        style={{
                          backgroundImage: 'url("img/google_login.png")',
                          backgroundSize: 'cover',
                          width: '250px',
                          height: '35px',
                        }}
                        className="loginBtn"
                        onClick={tryGoolgeLogin}
                      ></button> */}
                    </CInputGroup>
                    <CInputGroup style={{ display: 'grid' }}>
                      <CInputGroup className="mb-3" style={{ width: '16em', marginTop: '1em' }}>
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>

                        <CFormInput
                          placeholder="UserEmail"
                          autoComplete="username"
                          id="useremail"
                          value={userEmail}
                          ref={userEmailRef}
                          onChange={jugeEmail}
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-3" style={{ width: '16em' }}>
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>

                        <CFormInput
                          placeholder="UserName"
                          autoComplete="username"
                          id="username"
                          ref={userName}
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-3" style={{ width: '16em' }}>
                        <CInputGroupText>
                          <CIcon icon={cilPen} />
                        </CInputGroupText>
                        <CFormSelect
                          aria-label="Default select example"
                          id="classCode"
                          options={classArray}
                          onChange={(e) => {
                            checkCurri(e)
                          }}
                        >
                          {/* <option disabled selected>
                            과정명 선택
                          </option>

                          {classArray.map((className, index) => (
                            <option value={className.class_code} key={index} ref={classCode}>
                              {className.host_code + className.curri_name + className.curri_cnt}
                            </option>
                          ))} */}
                          {/* <option value="F2020_IOT_1">빅데이터 11차(정형)</option>
                          <option value="F2020_IOT_3">인공지능 11차(박수현)</option> */}
                        </CFormSelect>

                        {/* 이용동의 시작  */}
                        <CInputGroup className="mb-3" style={{ width: '18em', marginTop: '1em' }}>
                          <div>
                            <CFormCheck name="policy" id="policy1" ref={checkRef1}></CFormCheck>
                            <span>
                              <Link to="/private" style={linkStyle} target="_blank">
                                개인정보이용
                              </Link>
                              에 동의합니다.
                              <span style={essStyle}>(필수)</span>
                            </span>
                          </div>
                          <div>
                            <CFormCheck name="policy" id="policy1" ref={checkRef2}></CFormCheck>
                            <span>
                              <Link to="/terms" style={linkStyle} target="_blank">
                                이용약관
                              </Link>
                              에 동의합니다.
                              <span style={essStyle}>(필수)</span>
                            </span>
                          </div>
                        </CInputGroup>
                        {/* 이용동의 끝  */}
                      </CInputGroup>
                    </CInputGroup>

                    <CInputGroup style={{ display: 'grid' }}>
                      <CInputGroup className="mb-3" style={{ width: '16em' }}>
                        {' '}
                        <div className="d-gri₩d">
                          <CButton color="success" onClick={tryJoin} type="button">
                            Create Account
                          </CButton>
                        </div>
                      </CInputGroup>
                    </CInputGroup>
                  </CInputGroup>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
