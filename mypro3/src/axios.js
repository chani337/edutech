import axios from 'axios'

const instance = axios.create({ baseURL: 'http://localhost:8070' })
//const instance = axios.create({ baseURL: 'http://172.30.1.254:8070' })
//const instance = axios.create({ baseURL: 'https://project.smhrd.com:8070' })

export default instance
