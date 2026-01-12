import React, { useEffect, useState } from 'react'
import { CButton } from '@coreui/react'
import ReactDOM from 'react-dom'
// Import the main component
import { Worker } from '@react-pdf-viewer/core'

// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css'

import '@react-pdf-viewer/core/lib/styles/index.css'

const PdfViewer = ({ projectUrl }) => {
  const pdfVersion = '2.6.347'
  const [pdfUrl, setPdfUrl] = useState('')
  const [shown, setShown] = useState(false)

  useEffect(() => {
    setPdfUrl(projectUrl + '#toolbar=0')
  }, [projectUrl])
  const modalBody = () => (
    <div
      style={{
        backgroundColor: '#fff',
        flexDirection: 'column',
        overflow: 'hidden',

        /* Fixed position */
        left: 0,
        position: 'fixed',
        top: 0,

        /* Take full size */
        height: '100%',
        width: '100%',

        /* Displayed on top of other elements */
        zIndex: 9999,
      }}
    >
      <div
        style={{
          alignItems: 'center',
          backgroundColor: '#000',
          color: '#fff',
          display: 'flex',
          padding: '.5rem',
        }}
      >
        <div style={{ marginRight: 'auto' }}>기획서</div>
        <button
          style={{
            backgroundColor: '#357edd',
            border: 'none',
            borderRadius: '4px',
            color: '#ffffff',
            cursor: 'pointer',
            padding: '8px',
          }}
          onClick={() => setShown(false)}
        >
          Close
        </button>
      </div>
      <div
        style={{
          flexGrow: 1,
          // overflow: 'auto',
          height: '100vh',
        }}
      >
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.3.122/build/pdf.worker.min.js">
          <iframe src={pdfUrl} width="100%" height="100%"></iframe>
        </Worker>
      </div>
    </div>
  )

  return (
    <div>
      <CButton color="primary" variant="outline" onClick={() => setShown(true)}>
        <span style={{ color: '#5141e0' }}>기획서 보기</span>
      </CButton>
      {shown && ReactDOM.createPortal(modalBody(), document.body)}
    </div>
  )
}

export default PdfViewer
