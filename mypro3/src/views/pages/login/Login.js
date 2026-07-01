/* eslint-disable */
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
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import { toast } from 'react-custom-alert'
import 'react-custom-alert/dist/index.css'

const Login = () => {
  const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || '839524259619-qnp7m10ids7i5up6tfd42h7t8qkbc0nb.apps.googleusercontent.com'

  const nav = useNavigate()
  const [code, setCode] = useState()
  //KAKAO 로그인 정보

  const REDIRECT_URI = 'https://smhrd-project-info.ddns.net:8071/login'
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`

  //google로그인 정보

  // 로그인 없이 강제 우회하는 헬퍼 함수
  const bypassLogin = (email) => {
    window.localStorage.setItem('mem_name', '테스트 개발자')
    window.localStorage.setItem('mem_level', '관리자')
    window.localStorage.setItem('mem_email', email)
    window.localStorage.setItem('class_code', 'CLASS01')
    nav('/base')
  }

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
          toast.error('회원가입이 되지 않은 이메일입니다. 테스트 계정으로 우회합니다.')
          bypassLogin(getEmail)
        }
      })
      .catch((err) => {
        toast.error('서버 로그인 통신 실패. 테스트 계정으로 우회합니다.')
        bypassLogin(getEmail)
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
  const onGoogleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential)
    tryLogin(decoded.email)
  }
  const onGoogleError = () => {
    //console.log('Google Login Failed')
  }

  useEffect(() => {
    setCode(new URL(window.location.href).searchParams.get('code'))
    if (code != null) {
      getToken()
    } else {
      // 구글 로그인 패스: 홈페이지 진입 시 자동으로 테스트 계정 로그인 시도
      tryLogin('chani7873@daum.net')
    }
    // initializeNaverLogin()
    // userAccessToken()
  }, [code])



  return (
    <GoogleOAuthProvider clientId={googleClientId}>
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

                      {/* 구글 로그인 */}
                      <CInputGroup
                        className="mb-2"
                        style={{ display: 'flex', justifyContent: 'center' }}
                      >
                        <GoogleLogin
                          onSuccess={onGoogleSuccess}
                          onError={onGoogleError}
                          text="signin_with"
                          shape="rectangular"
                          width="250"
                        />
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
    </GoogleOAuthProvider>
  )
}

export default Login
