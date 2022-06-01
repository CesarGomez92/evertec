import axios from 'axios'

export const EVERTEC_API = axios.create({
  baseURL: 'http://localhost:5000',
})
