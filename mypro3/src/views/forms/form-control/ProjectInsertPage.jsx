import {
  CForm,
  CFormInput,
  CFormSelect,
  CCard,
  CContainer,
  CRow,
  CCol,
  CCardBody,
  CCardTitle,
  CFormLabel,
  CFormTextarea,
  CButton,
} from '@coreui/react'
import React, { useState } from 'react'
import axios from '../../../axios'
import { useNavigate } from 'react-router-dom'

const ProjectInsertPage = () => {
  const nav = useNavigate()

  const [projectData, setProjectData] = useState({
    pro_name: '',
    pro_team: '',
    pro_theme: '',
    pro_prize: '',
    pro_type: '',
    pro_nutshell: '',
    ctg_num: '',
    ctg_num2: '',
    dtype_num: '',
    dtype_num2: '',
    pro_ctg_num: '1',
    course_type: 'KDT',
  })

  // 썸네일, 발표자료, 영상
  const [thumbnail, setThumbnail] = useState(null)
  const [presentation, setPresentation] = useState(null)
  const [video, setVideo] = useState(null)

  // 산출문서 슬롯 (각각 이름 + 파일)
  const [docSlots, setDocSlots] = useState([
    { type: 'ER 다이어그램', file: null },
    { type: 'UC 다이어그램', file: null },
    { type: '화면설계서', file: null },
    { type: '시스템아키텍처', file: null },
  ])

  const onChangeData = (e) => {
    setProjectData({ ...projectData, [e.target.name]: e.target.value })
  }

  // 산출문서 슬롯 타입 변경
  const onDocTypeChange = (idx, value) => {
    const updated = [...docSlots]
    updated[idx].type = value
    setDocSlots(updated)
  }

  // 산출문서 슬롯 파일 변경
  const onDocFileChange = (idx, file) => {
    const updated = [...docSlots]
    updated[idx].file = file
    setDocSlots(updated)
  }

  // 산출문서 슬롯 추가
  const addDocSlot = () => {
    setDocSlots([...docSlots, { type: '기타문서', file: null }])
  }

  // 산출문서 슬롯 제거
  const removeDocSlot = (idx) => {
    setDocSlots(docSlots.filter((_, i) => i !== idx))
  }

  const sendData = () => {
    if (!projectData.pro_name || !projectData.pro_team) {
      alert('필수 정보(프로젝트명, 팀명)를 입력해주세요.')
      return
    }
    if (!projectData.pro_type) {
      alert('주제 형태를 선택해주세요.')
      return
    }

    const cleanedData = { ...projectData }
    Object.keys(cleanedData).forEach((key) => {
      if (cleanedData[key] === '') cleanedData[key] = null
    })

    const formData = new FormData()
    formData.append(
      'projectDto',
      new Blob([JSON.stringify(cleanedData)], { type: 'application/json' }),
    )

    if (thumbnail) formData.append('thumbnail', thumbnail)
    if (presentation) formData.append('presentation', presentation)
    if (video) formData.append('video', video)

    // 산출문서: 파일이 선택된 슬롯만 전송
    const activeDocs = docSlots.filter((d) => d.file != null)
    activeDocs.forEach((d) => {
      formData.append('docs', d.file)
      formData.append('docTypes', d.type)
    })

    axios({
      url: '/project-smhrd/project/insert',
      method: 'post',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then((res) => {
        if (res.data === 'success') {
          alert('프로젝트가 성공적으로 등록되었습니다!')
          nav('/base')
        } else {
          alert('요청 실패: ' + res.data)
        }
      })
      .catch((error) => {
        console.error('에러:', error)
        alert('요청 중 오류가 발생했습니다.')
      })
  }

  // 산출문서 타입 옵션들
  const docTypeOptions = [
    'ER 다이어그램',
    'UC 다이어그램',
    '화면설계서',
    '시스템아키텍처',
    '플로우차트',
    'WBS',
    '요구사항정의서',
    '기타문서',
  ]

  return (
    <CContainer style={{ width: '80%' }}>
      <CCard>
        <CCardBody>
          <CCardTitle className="mb-4">프로젝트(산출물) 일괄 등록</CCardTitle>
          <CForm>
            <CRow className="mb-3">
              <CCol md={6}>
                <CFormLabel>프로젝트 제목 (pro_name)</CFormLabel>
                <CFormInput type="text" name="pro_name" onChange={onChangeData} />
              </CCol>
              <CCol md={6}>
                <CFormLabel>팀명 (pro_team)</CFormLabel>
                <CFormInput type="text" name="pro_team" onChange={onChangeData} />
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CCol>
                <CFormLabel>프로젝트 주제 설명 (pro_theme)</CFormLabel>
                <CFormInput type="text" name="pro_theme" onChange={onChangeData} />
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CCol md={3}>
                <CFormLabel>수상 내역</CFormLabel>
                <CFormSelect name="pro_prize" onChange={onChangeData}>
                  <option value="">(선택 안함)</option>
                  <option value="최우수">최우수</option>
                  <option value="우수">우수</option>
                  <option value="장려">장려</option>
                </CFormSelect>
              </CCol>
              <CCol md={3}>
                <CFormLabel>주제 형태 (pro_type)</CFormLabel>
                <CFormSelect name="pro_type" onChange={onChangeData}>
                  <option value="">(선택 안함)</option>
                  <option value="기업">기업제시</option>
                  <option value="자율">자율주제</option>
                  <option value="챌린지">챌린지</option>
                  <option value="리버스 엔지니어링">리버스 엔지니어링</option>
                </CFormSelect>
              </CCol>
              <CCol md={3}>
                <CFormLabel>과정명</CFormLabel>
                <CFormSelect name="course_type" onChange={onChangeData}>
                  <option value="KDT">KDT</option>
                  <option value="산대특">산대특</option>
                  <option value="KDT선도기업">KDT선도기업</option>
                  <option value="SW">SW</option>
                </CFormSelect>
              </CCol>
              <CCol md={3}>
                <CFormLabel>주제 카테고리</CFormLabel>
                <CFormSelect name="ctg_num" onChange={onChangeData}>
                  <option value="">선택 안함</option>
                  <option value="1">1. 안전(화재,날씨)</option>
                  <option value="2">2. IoT</option>
                  <option value="3">3. 뷰티,헬스케어</option>
                  <option value="4">4. 문화(도서,여행,음식)</option>
                  <option value="5">5. 언어·교육</option>
                  <option value="6">6. 사회(부동산,상권)</option>
                  <option value="7">7. 자기개발(취업)</option>
                  <option value="8">8. 복지(편의,육아)</option>
                  <option value="9">9. 동·식물</option>
                </CFormSelect>
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CCol md={6}>
                <CFormLabel>분석 데이터 형태 (dtype_num)</CFormLabel>
                <CFormSelect name="dtype_num" onChange={onChangeData}>
                  <option value="">선택 안함</option>
                  <option value="1">1. 이미지 데이터</option>
                  <option value="2">2. 음성 데이터</option>
                  <option value="3">3. 영상 데이터</option>
                  <option value="4">4. 텍스트 데이터</option>
                </CFormSelect>
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CCol>
                <CFormLabel>프로젝트 요약사항 (pro_nutshell)</CFormLabel>
                <CFormTextarea name="pro_nutshell" rows="3" onChange={onChangeData}></CFormTextarea>
              </CCol>
            </CRow>

            {/* ===== 파일 업로드 영역 ===== */}
            <CRow className="mb-3">
              <CCol md={4}>
                <CFormLabel style={{ fontWeight: 'bold' }}>썸네일 이미지</CFormLabel>
                <CFormInput
                  type="file"
                  accept="image/*"
                  onChange={(e) => setThumbnail(e.target.files[0])}
                />
                <small style={{ color: 'gray' }}>목록에 보여지는 대표 사진</small>
              </CCol>
              <CCol md={4}>
                <CFormLabel style={{ fontWeight: 'bold' }}>발표자료 (.pdf, .ppt)</CFormLabel>
                <CFormInput type="file" onChange={(e) => setPresentation(e.target.files[0])} />
                <small style={{ color: 'gray' }}>프레젠테이션 파일</small>
              </CCol>
              <CCol md={4}>
                <CFormLabel style={{ fontWeight: 'bold' }}>시연 영상 (.mp4)</CFormLabel>
                <CFormInput
                  type="file"
                  accept="video/*"
                  onChange={(e) => setVideo(e.target.files[0])}
                />
                <small style={{ color: 'gray' }}>시연 영상 파일</small>
              </CCol>
            </CRow>

            {/* ===== 산출문서 (개별 이름 지정) ===== */}
            <CFormLabel style={{ fontWeight: 'bold', marginTop: '10px' }}>
              📄 산출문서 (탭 이름 지정 가능)
            </CFormLabel>
            {docSlots.map((slot, idx) => (
              <CRow className="mb-2" key={idx} style={{ alignItems: 'center' }}>
                <CCol md={4}>
                  <CFormSelect
                    value={slot.type}
                    onChange={(e) => onDocTypeChange(idx, e.target.value)}
                  >
                    {docTypeOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    type="file"
                    onChange={(e) => onDocFileChange(idx, e.target.files[0])}
                  />
                </CCol>
                <CCol md={2}>
                  <CButton color="danger" variant="outline" onClick={() => removeDocSlot(idx)}>
                    삭제
                  </CButton>
                </CCol>
              </CRow>
            ))}
            <CButton
              color="secondary"
              variant="outline"
              size="sm"
              className="mb-4"
              onClick={addDocSlot}
            >
              + 산출문서 추가
            </CButton>

            <div className="d-grid">
              <CButton color="primary" size="lg" onClick={sendData}>
                프로젝트 등록하기
              </CButton>
            </div>
          </CForm>
        </CCardBody>
      </CCard>
    </CContainer>
  )
}

export default ProjectInsertPage
