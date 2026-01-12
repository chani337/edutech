import PropTypes from 'prop-types'
import React from 'react'
import { CCallout, CLink } from '@coreui/react'

import packageJson from '../../package.json'

const DocsCallout = (props) => {
  const { content, href, name } = props

  const plural = name.slice(-1) === 's' ? true : false

  const _href = `https://coreui.io/react/docs/${packageJson.config.coreui_library_short_version}/${href}`

  return (
    <CCallout color="info" className="bg-white">
      공유공감형 융합인재 양성 스마트인재개발원의 다양한 프로젝트를 찾아보고{' '}
      <b>여러분의 아이디어와 융합해보세요‼️‼️</b>
      <br /> 다양한 사례를 통해 여러분의 <b>상상을 빠르게 프로젝트로 구현할 수 있습니다.</b>✨
    </CCallout>
  )
}

DocsCallout.propTypes = {
  content: PropTypes.string,
  href: PropTypes.string,
  name: PropTypes.string,
}

export default React.memo(DocsCallout)
