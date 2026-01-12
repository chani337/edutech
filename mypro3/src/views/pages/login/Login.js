import React from 'react'
import { Link, Router, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useEffect, useState, useRef } from 'react'
import qs from 'qs'
import axios from '../../../axios'
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import { gapi } from 'gapi-script'
import { toast } from 'react-custom-alert'
import 'react-custom-alert/dist/index.css'

const Login = () => {
  const googleRef = useRef()

  const nav = useNavigate()
  const [code, setCode] = useState()
  //KAKAO 로그인 정보

  const REDIRECT_URI = 'https://smhrd-project-info.ddns.net:8071/login'
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`

  //google로그인 정보
  const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID

  //이메일을 넘겨받아서 서버로 요청하는 tryLogin
  const tryLogin = (getEmail) => {
    axios({
      method: 'POST',
      url: '/project-smhrd/user/login',
      data: {
        mem_email: getEmail,
      },
      headers: {
        'Content-Type': 'application/json', // 필요한 헤더만 포함
      },
      responseType: 'json',
    })
      .then((res) => {
        //res --> 스프링 서버에서 전달받은 데이터 저장하는 부분
        //어차피 json으로 넘겨줬으니 키값을 통해서 꺼내서 사용하면됨
        if (res.data.mem_name !== 'NoUser') {
          window.localStorage.setItem('mem_name', res.data.mem_name)
          window.localStorage.setItem('mem_level', res.data.mem_level)
          window.localStorage.setItem('mem_email', getEmail)
          window.localStorage.setItem('class_code', res.data.class_code)
          nav('/base')
          // if (res.data.mem_level != '일반') {

          // } else {
          //   alert('승인이 진행중 입니다')
          // }
        } else {
          toast.error('회원가입 후 진행해주세요')
        }
      })
      .catch((err) => {
        toast.error('로그인 실패')
      })
  }

  const getProfile = async () => {
    try {
      // Kakao SDK API를 이용해 사용자 정보 획득
      let data = await window.Kakao.API.request({
        url: '/v2/user/me',
      })

      tryLogin(data.kakao_account.email)
    } catch (err) {
      //console.log(err)
    }
  }

  const getToken = async (data) => {
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
    //console.log(KAKAO_AUTH_URL)
    window.location.href = KAKAO_AUTH_URL
  }

  // ///NaverLogin
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
  //       tryLogin(naverLogin.user.getEmail())
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

  //GoogleLogin
  const onSuccess = (response) => {
    tryLogin(response.profileObj.email)
  }
  const onFailure = (response) => {
    //console.log('FAILED', response)
  }
  const onLogoutSuccess = () => {
    // console.log('SUCESS LOG OUT')
  }

  useEffect(() => {
    setCode(new URL(window.location.href).searchParams.get('code'))
    if (code != null) {
      getToken()
    }
    // initializeNaverLogin()
    // userAccessToken()
  }, [code])

  const start = () => {
    gapi.client.init({
      clientId: '407040727643-v5l2rmgvuh6ootj330f8o6mavi9rilb1.apps.googleusercontent.com',
      scope: 'email',
    })
  }

  useEffect(() => {
    gapi.load('client:auth2', start)
  }, [])

  function tryGoolgeLogin() {
    googleRef.current.children[0].click()
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer style={{ maxWidth: '700px' }}>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>

                    {/* <CInputGroup className="mb-1 for-center">
                      <button
                        style={{
                          backgroundImage: 'url("img/kakao_login.png")',
                          backgroundSize: 'cover',
                          width: '250px',
                          height: '35px',
                        }}
                        type="button"
                        className="loginBtn"
                        onClick={() => {
                          //getToken()
                          redirectKakaoLogin()
                        }}
                      ></button>
                    </CInputGroup> */}
                    {/* <CInputGroup className="mb-2">
                      <button
                        id="naverIdLogin"
                        ref={naverRef}
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
                          clientId="407040727643-v5l2rmgvuh6ootj330f8o6mavi9rilb1.apps.googleusercontent.com"
                          onSuccess={onSuccess}
                          onFailure={onFailure}
                          buttonText="구글로그인"
                          alignItems="center"
                        ></GoogleLogin>
                      </div>

                      <button
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

                    <CRow>
                      <CCol
                        xs={15}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          marginTop: '1em',
                        }}
                      >
                        <p>아직 회원이 아니신가요?</p>
                        <Link to="/register">
                          <CButton color="primary" className="px-4">
                            간편회원가입
                          </CButton>
                        </Link>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
