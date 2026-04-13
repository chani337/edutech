/* eslint-disable prettier/prettier */
/* Prettier 스타일 규칙 위반 경고/에러를 무시 설정 */
import React, { useState } from 'react'
import axios from 'axios'
import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CContainer,
    CRow,
    CBadge,
    CFormInput,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CForm,
    CFormLabel,
} from '@coreui/react'

const MentoringStatus = () => {
    // 1. 활성화된 탭 상태 ('all', 'upcoming', 'completed')
    const [activeFilter, setActiveFilter] = useState('all')

    // 2. 검색어 상태
    const [searchTerm, setSearchTerm] = useState('')

    // 3. 모달창 열림/닫힘 상태
    const [modalVisible, setModalVisible] = useState(false)

    // 4. 모달창 입력 폼 상태
    const [formData, setFormData] = useState({
        title: '',
        time: '',
        maxHeadcount: 4,
    })

    // 5. 실제 화면에 그려질 멘토링 데이터(상태) - dummy data로 초기화
    const [meetings, setMeetings] = useState([])

    // 모달창 폼 입력값 변경 핸들러
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    // 멘토링 개설 저장 버튼 클릭 핸들러
    const handleSaveMeeting = async () => {
        try {
            // 백엔드(Spring Boot)에 두레이 화상미팅 개설 요청
            const response = await axios.post('http://localhost:8070/project-smhrd/api/mentoring/meeting', {
                title: formData.title || '제목 없음'
            });

            // API 응답 결과에서 미팅 정보 추출 (Dooray API 응답: { header: {...}, result: { meetingUrl: "..." } })
            const resultData = response.data.result || {};
            const meetingUrl = resultData.meetingUrl || '';
            const meetingId = resultData.id || Date.now();

            const newMeeting = {
                id: meetingId, // 두레이에서 발급한 ID 사용
                title: formData.title || '제목 없음',
                time: formData.time || '미정',
                headcount: `0/${formData.maxHeadcount}`,
                students: '참여자 : 없음',
                status: 'upcoming', // 새로 만들면 기본으로 진행 예정
                meetingUrl: meetingUrl // 발급받은 화상미팅 URL을 데이터에 저장
            }

            // 기존 배열 맨 앞에 새 배열 추가
            setMeetings([newMeeting, ...meetings])
            setModalVisible(false) // 모달 닫기
            setFormData({ title: '', time: '', maxHeadcount: 4 }) // 폼 초기화
        } catch (error) {
            console.error('화상미팅 생성 중 오류 발생:', error);
            alert('화상미팅 개설에 실패했습니다. 관리자에게 문의해주세요.');
        }
    }

    // 화면에 보여줄 데이터 필터링 (탭 + 검색어)
    const filteredMeetings = meetings.filter((meeting) => {
        // 1. 탭 필터 검사
        const isTabMatch = activeFilter === 'all' || meeting.status === activeFilter
        // 2. 검색어 필터 검사 (대소문자 구별 없이 포함 여부 확인)
        const isSearchMatch = meeting.title.toLowerCase().includes(searchTerm.toLowerCase())

        return isTabMatch && isSearchMatch
    })

    return (
        <CContainer fluid>
            {/* 상단 타이틀 및 개설 버튼 영역 */}
            <CRow className="mb-4 align-items-center">
                <CCol xs={6}>
                    <h4 className="fw-bold mb-0">멘토링 현황</h4>
                </CCol>
                <CCol xs={6} className="text-end">
                    <CButton color="primary" onClick={() => setModalVisible(true)}>
                        + 멘토링 개설하기
                    </CButton>
                </CCol>
            </CRow>

            {/* 필터 탭 및 검색창 영역 */}
            <CRow className="mb-4 d-flex align-items-center">
                <CCol xs={12} md={7} className="d-flex gap-3 mb-3 mb-md-0">
                    <CButton
                        color={activeFilter === 'all' ? 'secondary' : 'light'}
                        shape="rounded-pill"
                        onClick={() => setActiveFilter('all')}
                        style={{
                            width: '120px',
                            border: '1px solid #c8ced3',
                            backgroundColor: activeFilter === 'all' ? '#6c757d' : 'transparent',
                            color: activeFilter === 'all' ? '#fff' : '#000',
                        }}
                    >
                        전체
                    </CButton>
                    <CButton
                        color={activeFilter === 'upcoming' ? 'secondary' : 'light'}
                        shape="rounded-pill"
                        onClick={() => setActiveFilter('upcoming')}
                        style={{
                            width: '120px',
                            border: '1px solid #c8ced3',
                            backgroundColor: activeFilter === 'upcoming' ? '#6c757d' : 'transparent',
                            color: activeFilter === 'upcoming' ? '#fff' : '#000',
                        }}
                    >
                        진행 예정
                    </CButton>
                    <CButton
                        color={activeFilter === 'completed' ? 'secondary' : 'light'}
                        shape="rounded-pill"
                        onClick={() => setActiveFilter('completed')}
                        style={{
                            width: '120px',
                            border: '1px solid #c8ced3',
                            backgroundColor: activeFilter === 'completed' ? '#6c757d' : 'transparent',
                            color: activeFilter === 'completed' ? '#fff' : '#000',
                        }}
                    >
                        완료됨
                    </CButton>
                </CCol>
                <CCol xs={12} md={5}>
                    <CFormInput
                        type="text"
                        placeholder="멘토링 제목 검색..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ borderRadius: '0.5rem' }}
                    />
                </CCol>
            </CRow>

            {/* 멘토링 리스트 출력 영역 */}
            {filteredMeetings.length === 0 ? (
                // 빈 화면(Empty State) 처리
                <div
                    className="text-center p-5 mt-4"
                    style={{ backgroundColor: '#f9f9f9', borderRadius: '0.5rem', border: '1px dashed #ccc' }}
                >
                    <h5 className="text-muted">해당하는 멘토링이 없습니다.</h5>
                    <p className="text-muted mb-0">검색어를 변경하거나 새로운 멘토링을 개설해보세요.</p>
                </div>
            ) : (
                <CRow>
                    {filteredMeetings.map((item) => (
                        <CCol xs={12} md={6} key={item.id} className="mb-4">
                            <CCard
                                style={{
                                    borderLeft: '10px solid #3c4b64',
                                    borderRadius: '0.5rem',
                                    opacity: item.status === 'completed' ? 0.7 : 1, // 완료된 미팅은 살짝 흐리게
                                }}
                            >
                                <CCardBody className="p-4">
                                    <CRow className="mb-4">
                                        <CCol>
                                            <h4 className="fw-bold mb-3">
                                                {item.title}
                                                {item.status === 'completed' && (
                                                    <CBadge color="danger" className="ms-2" style={{ fontSize: '0.7rem', verticalAlign: 'middle' }}>
                                                        종료됨
                                                    </CBadge>
                                                )}
                                            </h4>

                                            <div className="d-flex gap-2">
                                                <CBadge
                                                    color="light"
                                                    textColor="dark"
                                                    shape="rounded-pill"
                                                    style={{ border: '1px solid #999', fontWeight: 'normal', padding: '0.4rem 1rem' }}
                                                >
                                                    {item.time}
                                                </CBadge>
                                                <CBadge
                                                    color="light"
                                                    textColor="dark"
                                                    shape="rounded-pill"
                                                    style={{ border: '1px solid #999', fontWeight: 'normal', padding: '0.4rem 1rem' }}
                                                >
                                                    인원 {item.headcount}
                                                </CBadge>
                                            </div>
                                        </CCol>
                                    </CRow>

                                    <CRow className="align-items-end">
                                        <CCol xs={5}>
                                            <div className="d-flex" style={{ paddingLeft: '10px' }}>
                                                {[1, 2, 3, 4].map((circle, index) => (
                                                    <div
                                                        key={index}
                                                        style={{
                                                            width: '35px',
                                                            height: '35px',
                                                            borderRadius: '50%',
                                                            backgroundColor: '#fff',
                                                            border: '1px solid #777',
                                                            marginLeft: index === 0 ? '0' : '-10px',
                                                            zIndex: 4 - index,
                                                            position: 'relative',
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                        </CCol>

                                        <CCol xs={7} className="text-end">
                                            <div className="mb-3" style={{ fontSize: '0.9rem', color: '#555' }}>
                                                {item.students}
                                            </div>
                                            <CButton
                                                color="dark"
                                                disabled={item.status === 'completed' || !item.meetingUrl} // URL이 없으면 버튼 잠금
                                                onClick={() => {
                                                    if (item.meetingUrl) window.open(item.meetingUrl, '_blank')
                                                }}
                                                style={{
                                                    borderRadius: '0.3rem',
                                                    padding: '0.5rem 1.2rem',
                                                    backgroundColor: item.status === 'completed' ? '#777' : '#3c4b64',
                                                    border: 'none',
                                                }}
                                            >
                                                {item.status === 'completed' ? '입장 불가' : '화상미팅 참여하기'}
                                            </CButton>
                                        </CCol>
                                    </CRow>
                                </CCardBody>
                            </CCard>
                        </CCol>
                    ))}
                </CRow>
            )}

            {/* 멘토링 개설 모달 창 */}
            <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
                <CModalHeader onClose={() => setModalVisible(false)}>
                    <CModalTitle>멘토링 개설하기</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm>
                        <div className="mb-3">
                            <CFormLabel>화상미팅 제목</CFormLabel>
                            <CFormInput
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                placeholder="예: 리액트 기초 화상 멘토링"
                            />
                        </div>
                        <div className="mb-3">
                            <CFormLabel>미팅 일시</CFormLabel>
                            <CFormInput
                                type="datetime-local"
                                name="time"
                                value={formData.time}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <CFormLabel>최대 참여 인원 (명)</CFormLabel>
                            <CFormInput
                                type="number"
                                name="maxHeadcount"
                                value={formData.maxHeadcount}
                                onChange={handleInputChange}
                                min="1"
                                max="20"
                            />
                        </div>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setModalVisible(false)}>
                        취소
                    </CButton>
                    <CButton color="primary" onClick={handleSaveMeeting}>
                        개설하기
                    </CButton>
                </CModalFooter>
            </CModal>
        </CContainer>
    )
}

export default MentoringStatus
