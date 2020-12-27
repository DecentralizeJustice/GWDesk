import qs from 'qs'
import axios from 'axios'
axios.defaults.withCredentials = false

export async function post (data, url) {
  const result = await axios({
    method: 'post',
    url: url,
    data: qs.stringify(
      data
    )
  })
  return result
}

export async function get (url) {
  const result = await axios({
    method: 'get',
    url: url
  })
  return result
}
