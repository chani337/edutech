/* eslint-disable react/prop-types */

import React from 'react'
import { CCard, CCardBody } from '@coreui/react'

import MDEditor from './MDEditor.jsx'

const FormControl = () => {
  return (
    <CCard>
      <CCardBody>
        <MDEditor />
      </CCardBody>
    </CCard>
  )
}

export default FormControl
