// 이미지 URL 처리 유틸리티

// 백엔드 서버 주소 (context path 포함)
// 백엔드는 FTP 서버(edusmhrd.ddns.net:26)의 /usr/local/data/project 경로와 연결되어 있음
const API_BASE_URL = 'http://localhost:8070/project-smhrd'

/**
 * 백엔드에서 받은 이미지 URL을 로컬 서버 URL로 변환
 * @param {string} url - 원본 이미지 URL
 * @returns {string} 변환된 이미지 URL
 */
export const convertImageUrl = (url) => {
  if (!url) {
    return ''
  }

  // 이미 올바른 localhost URL이면 그대로 반환
  if (url.startsWith(API_BASE_URL)) {
    return url
  }

  // project-data.ddns.net 도메인을 localhost로 교체
  if (url.includes('project-data.ddns.net')) {
    let converted = url.replace(/https?:\/\/project-data\.ddns\.net/, API_BASE_URL)
    // PPT0.JPG 같은 형식을 PPT/0.jpg로 변환
    converted = converted.replace(
      /\/(PPT|DOC|IMG)(\d+)\.(JPG|jpg|PNG|png|pdf|PDF)$/i,
      (match, p1, p2, p3) => `/${p1}/${p2}.${p3.toLowerCase()}`,
    )
    return converted
  }

  // 상대 경로면 API_BASE_URL 추가
  if (!url.startsWith('http')) {
    let converted = API_BASE_URL + (url.startsWith('/') ? '' : '/') + url
    // PPT0.JPG 같은 형식을 PPT/0.jpg로 변환
    converted = converted.replace(
      /\/(PPT|DOC|IMG)(\d+)\.(JPG|jpg|PNG|png|pdf|PDF)$/i,
      (match, p1, p2, p3) => `/${p1}/${p2}.${p3.toLowerCase()}`,
    )
    return converted
  }

  // 기타 http URL은 그대로 반환
  return url
}

/**
 * 여러 이미지 URL을 한번에 변환
 * @param {Array<string>} urls - 이미지 URL 배열
 * @returns {Array<string>} 변환된 이미지 URL 배열
 */
export const convertImageUrls = (urls) => {
  if (!Array.isArray(urls)) return []
  return urls.map(convertImageUrl)
}

export default convertImageUrl
