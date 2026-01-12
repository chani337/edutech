import { CForm, CFormInput, CFormSelect, CCard, CContainer, CRow, CCol } from '@coreui/react'
import '@toast-ui/editor/dist/toastui-editor.css'
import { Editor } from '@toast-ui/react-editor'
import React, { useState, useEffect } from 'react'
import axios from '../../../axios'
import { toast } from 'react-custom-alert'

const MDEditor = () => {
  const editorRef = React.createRef()
  //const [formData, setFormData] = useState(new FormData())
  //

  const [post, setPost] = useState({
    techname: '',
    techtype: '',
    techcontent: '',
    techcode: '',
  })

  useEffect(function () {
    var fileData = new Blob(['Hello, world!'], { type: 'text/plain' })

    // 파일 객체 생성
    var file = new File([fileData], 'hello.txt')

    setPost({ ...post, techcode: file })
  }, [])

  function base64toFile(base_data, filename) {
    const byteCharacters = atob(base_data)
    const byteNumbers = new Array(byteCharacters.length)
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i)
    }
    const byteArray = new Uint8Array(byteNumbers)
    const blob = new Blob([byteArray], { type: 'image/png' })

    // Blob 객체를 File 객체로 변환
    const file = new File([blob], filename, { type: 'image/png' })

    return file
  }

  const onChangePost = (e) => {
    let markdown = editorRef.current.getInstance().getMarkdown()

    if (e === 'wysiwyg' || e === 'markdown') {
      setPost({
        ...post,
        techcontent: markdown,
      })
    } else {
      if (e.target.id === 'tch-file') {
        setPost({
          ...post,
          [e.target.name]: e.target.files[0],
        })
      } else {
        setPost({
          ...post,
          [e.target.name]: e.target.value,
        })
      }
    }
  }

  const postAdd = (event) => {
    event.preventDefault()

    let content = ''
    let img_name = []
    content = post.techcontent.replaceAll(/!\[.+\]/g, (match, p1) => {
      match = match.replace('[', '')
      match = match.replace(']', '')
      match = match.replace('!', '')

      img_name.push(match)

      return ''
    })
    content = content.replaceAll('data:image/png;base64,', '')

    const base64Regex = /([A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?/g
    let img_list = []

    const base64Matches = content.match(base64Regex)
    img_list = base64Matches
    img_list = img_list.filter((item) => item !== '')
    //img_list = img_list.filter((item) => item === base64Regex)

    let img_list2 = []
    for (let i = 0; i < img_list.length; i++) {
      if (img_list[i].length > 100) {
        //여기 불안정 일반문자열이랑  base64 구분하는 코드
        img_list2.push(img_list[i].match(base64Regex)[0])
      }
    }

    // console.log(img_list)

    const formData = new FormData()
    formData.append('techname', post.techname)
    formData.append('techtype', post.techtype)
    formData.append('techcode', post.techcode)

    let cnt = 0
    for (let i = 0; i < img_list2.length; i++) {
      cnt++
      content = content.replace(img_list2[i], 'img' + i)

      var file = base64toFile(img_list2[i], img_name[i])
      img_list2[i] = file
      formData.append('images', img_list2[i])
    }

    if (cnt == 0) {
      var fileData = new Blob(['Hello, world!'], { type: 'text/plain' })

      // 파일 객체 생성
      var file = new File([fileData], 'hello.txt')

      formData.append('images', file)
    }
    formData.append('content', content)

    axios
      .post('/project-smhrd/tech/postUpload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        toast.success('기술저장완료')
      })
  }

  return (
    <CContainer>
      <CForm
        // id="post-form"
        // action="http://172.30.1.36:8070/project-smhrd/tech/postUpload"
        // method="post"
        // ref={formRef}
        onSubmit={postAdd}
        encType="multipart/form-data"
      >
        <CRow style={{ margin: '5px' }}>
          <CCol>
            <CFormInput
              type="text"
              label="포스팅 제목"
              name="techname"
              className="form-control"
              id="post-title"
              onChange={onChangePost}
              placeholder="영어 만 입력해주세요(띄어쓰기X)"
            />
          </CCol>
        </CRow>

        <CRow>
          <CCol>
            <CFormSelect
              name="techtype"
              size="lg"
              className="mb-3"
              aria-label="기술 분야"
              onChange={onChangePost}
            >
              <option>기술분야 선택</option>
              <option value="web">Web</option>
              <option value="android">Android</option>
              <option value="ml">Machine Learning</option>
              <option value="dl">Deep Learning</option>
              <option value="iot">IoT</option>
            </CFormSelect>
          </CCol>
        </CRow>

        <CRow>
          <CCol>
            <Editor
              id="post-editor"
              previewStyle="vertical" //미리 보기랑 같이 출력
              height="600px"
              initialEditType="markdown"
              ref={editorRef}
              language="ko-KR"
              onChange={onChangePost}
            />
          </CCol>
        </CRow>

        <CRow>
          <CCol>
            <CFormInput
              type="file"
              name="techcode"
              size="sm"
              id="tch-file"
              label="소스코드 및 첨부 파일 업로드"
              onChange={onChangePost}
            />
          </CCol>
        </CRow>

        <CRow>
          <CCol>
            <CFormInput id="sendBtn" type="submit" value="Posting" className="btn btn-primary" />
          </CCol>
        </CRow>
      </CForm>
    </CContainer>
  )
}

export default MDEditor
