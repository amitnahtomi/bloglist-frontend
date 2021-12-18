import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = (user) => {
  const request = axios.get(baseUrl, {headers: {Authorization: user}})
  return request.then(response => response.data)
}

export default { getAll }