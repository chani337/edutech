import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilChartPie,
  cilCursor,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilGroup,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
const list = [
  {
    component: CNavTitle,
    name: '프로젝트',
    level: 0,
  },
  {
    component: CNavItem,
    name: '전체프로젝트',
    to: '/base',
    level: 0,
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
  },
  //   2.수상여부(학생, 관리자, 마스터)
  {
    component: CNavGroup,
    name: '수상여부',
    to: '/buttons',
    level: 1,
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: '최우수',
        to: '/base/base/prize/prize1',
        // pro_type: 'good',
      },
      {
        component: CNavItem,
        name: '우수',
        to: '/base/base/prize/prize2',
        // pro_type: 'good',
      },
    ],
  },
  // 3.주제형태(학생, 관리자, 마스터)
  {
    component: CNavGroup,
    name: '주제형태',
    level: 1,
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: '기업주제',
        to: '/base/base/type/company',
      },
      {
        component: CNavItem,
        name: '자율주제',
        to: '/base/base/type/self',
      },
      // {
      //   component: CNavItem,
      //   name: '챌린지포인트',
      //   to: '/base/base/type/challenge',
      // },
      {
        component: CNavItem,
        name: '리버스 엔지니어링',
        to: '/base/base/type/reverse',
      },
    ],
  },
  // 4.분석형태(학생, 관리자, 마스터)
  {
    component: CNavGroup,
    name: '분석데이터 형태',
    to: '/charts',
    level: 1,
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: '음성데이터',
        to: '/base/base/dtype/sound',
      },
      {
        component: CNavItem,
        name: '영상데이터',
        to: '/base/base/dtype/video',
      },
      {
        component: CNavItem,
        name: '이미지데이터',
        to: '/base/base/dtype/img',
      },
      {
        component: CNavItem,
        name: '텍스트데이터',
        to: '/base/base/dtype/text',
      },
    ],
  },
  // 5. 프로젝트 사용기술(학생 부터 전체)
  {
    component: CNavItem,
    name: '프로젝트 사용기술',
    to: '/base/forms/viewer',
    level: 1,
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
  },
  // 6. 프로젝트 기술 입력페이지(학생 부터 전체)
  {
    component: CNavItem,
    name: '프로젝트 사용기술입력 페이지',
    to: '/base/forms/editor',
    level: 3,
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
  },
  // 7. 프로젝트 입력(마스터)
  {
    component: CNavItem,
    name: '프로젝트 입력페이지',
    to: '/base/buttons/buttons',
    level: 3,
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: '회원관리',
    level: 3,
  },
  {
    component: CNavItem,
    name: '회원등급관리',
    to: '/base/forms/select',
    level: 3,
    icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'DB계정 관리',
    level: 1,
  },
  {
    component: CNavItem,
    name: 'DB계정 발급관리',
    to: '/base/forms/db/list',
    level: 3,
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'DB계정 생성 요청보내기',
    to: '/base/forms/db/signup',
    level: 1,
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'DB계정 요청확인페이지',
    to: '/base/forms/db/user_ok',
    level: 2,
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  // {
  //   component: CNavItem,
  //   name: '프로젝트 현황',
  //   to: '/theme/typography',
  //   icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  // },
]

const _nav = []

let grant = window.localStorage.getItem('mem_level')
let mem_level = 0
console.log(mem_level)
if (grant === '마스터') {
  mem_level = 3
} else if (grant === '관리자') {
  mem_level = 2
} else if (grant === '학생') {
  mem_level = 1
}

for (let i = 0; i < list.length; i++) {
  if (mem_level >= list[i].level) {
    _nav.push(list[i])
  }
}

export default _nav
