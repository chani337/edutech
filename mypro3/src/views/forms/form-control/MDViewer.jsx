/* eslint-disable react/prop-types */
import { CCard, CCardHeader, CCardBody, CCol, CRow } from '@coreui/react'
import '@toast-ui/editor/dist/toastui-editor-viewer.css'
import { Viewer } from '@toast-ui/react-editor'
import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { convertImageUrl } from '../../../utils/imageUtils'

const MDViewer = (props) => {
  const viewerOptions = {
    htmlDecode: true,
    referenceDefinition: true,
    referenceDefinitionHide: true,
    useDefaultHTMLSanitizer: true,
    viewer: {
      encoding: 'UTF-8',
    },
  }

  // 이미지 URL을 변환하는 커스텀 렌더러
  const customHTMLRenderer = {
    image(node, { entering }) {
      if (entering) {
        const originalSrc = node.destination
        const convertedSrc = convertImageUrl(originalSrc)
        return {
          type: 'openTag',
          tagName: 'img',
          attributes: {
            src: convertedSrc,
            alt: node.firstChild?.literal || '',
          },
        }
      }
      return { type: 'closeTag', tagName: 'img' }
    },
  }
  // useEffect(() => {
  //   setText(props.content)
  // }, [props.content])
  return (
    <>
      <CCard>
        <CCardHeader>
          <CRow>
            <CCol>
              <h1>{props.tchData.title}</h1>
            </CCol>
          </CRow>
          <CRow className="align-items-end">
            <CCol md={{ order: 'last' }}>
              <button className="btn btn-info">{props.tchData.src}</button>
            </CCol>
          </CRow>
        </CCardHeader>

        <CCardBody>
          {props.tchData.content !== null ? (
            <Viewer
              previewStyle="vertical"
              height="600px"
              initialValue={props.tchData.content}
              viewerOptions={viewerOptions}
              customHTMLRenderer={customHTMLRenderer}
            />
          ) : (
            <p>Loading...</p>
          )}
        </CCardBody>
      </CCard>
    </>
  )
}

MDViewer.prototypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
}

export default MDViewer
