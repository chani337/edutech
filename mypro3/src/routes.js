import { element } from 'prop-types'
import React, { Suspense } from 'react'

import DBListPage from './views/forms/form-control/DBListPage'
import DBSignupPage from './views/forms/form-control/DBSignupPage'
import DBUserOkPage from './views/forms/form-control/DBUserOkPage'

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

// Base

const Cards = React.lazy(() => import('./views/base/cards/Cards'))

// Buttons
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))

//Forms
const MDViewrPage = React.lazy(() => import('./views/forms/form-control/MDViewrPage'))
const MDEditorPage = React.lazy(() => import('./views/forms/form-control/MDEditorPage'))
const Select = React.lazy(() => import('./views/forms/select/Select'))
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Erro = React.lazy(() => import('./views/pages/page404/Page404'))

const routes = [
  // 에러페이지
  { path: '*', name: 'Err', element: Erro },

  { path: '/', exact: true, name: 'Home' },
  ,
  // {
  //   path: '/login',
  //   name: 'Login Page',
  //   element: Login,
  // },

  //프로젝트 현황(예정)
  {
    path: '/base/theme/typography',
    name: 'Typography',
    element: Typography,
  },

  // 구분값 전송
  {
    path: '/base',
    name: 'Base',
    element: Cards,
  },
  {
    path: '/base/login',
    name: 'Base',
    element: Cards,
  },
  { path: '/base/prize/prize1', name: '최우수', pro_prize: '최우수', element: Cards },
  { path: '/base/prize/prize2', name: '우수', pro_prize: '우수', element: Cards },
  { path: '/base/type/company', name: '기업', pro_type: '기업', element: Cards },
  { path: '/base/type/self', name: '자율', pro_type: '자율', element: Cards },
  { path: '/base/type/challenge', name: '챌린지', pro_type: '챌린지', element: Cards },
  {
    path: '/base/type/reverse',
    name: '리버스',
    pro_type: '리버스 엔지니어링',
    element: Cards,
  },
  { path: '/base/dtype/sound', name: '음성데이터', dtype_num: '2', element: Cards },
  { path: '/base/dtype/video', name: '영상데이터', dtype_num: '3', element: Cards },
  { path: '/base/dtype/img', name: '이미지데이터', dtype_num: '1', element: Cards },
  { path: '/base/dtype/text', name: '텍스트데이터', dtype_num: '4', element: Cards },

  //프로젝트 카드
  {
    path: '/base/cards',
    name: 'Cards',
    element: Cards,
  },

  //프로젝트 입력페이지
  { path: '/buttons/buttons', name: 'Buttons', element: Buttons },

  //프로젝트 사용기술
  { path: '/forms', name: 'Forms', element: MDViewrPage },
  { path: '/forms/viewer', name: 'MD Viewer', element: MDViewrPage },
  { path: '/forms/editor', name: 'MD Editor', element: MDEditorPage },

  // DB페이지
  { path: '/forms/db/signup', name: 'DB Signup', element: DBSignupPage },
  { path: '/forms/db/list', name: 'DB List', element: DBListPage },
  { path: '/forms/db/user_ok', name: 'DB UserOk', element: DBUserOkPage },
  // 회원관리
  { path: '/forms/select', name: '회원등급관리', element: Select },
]

export default routes
