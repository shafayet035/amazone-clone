import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://amazone-final-shafu.herokuapp.com'
})

export default instance