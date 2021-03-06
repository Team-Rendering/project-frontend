import axios from 'axios'
import apiUrl from '../apiConfig'

export const createPost = (title, text, feelings, user) => {
  return axios.post(
    `${apiUrl}/posts/`,
    { post: { title, text, feelings } },
    // Pass along the authorization which includes our user's token
    {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    }
  )
}
export const indexPost = (user) => {
  return axios.get(
    `${apiUrl}/posts/`,
    // Pass along the authorization which includes our user's token
    {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    }
  )
}
export const indexUsersPost = (user) => {
  return axios.get(
    `${apiUrl}/posts/owner/`,
    // Pass along the authorization which includes our user's token
    {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    }
  )
}

export const showPost = (id, user) => {
  return axios.get(`${apiUrl}/posts/${id}/`, {
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const deletePost = (id, user) => {
  return axios.delete(`${apiUrl}/posts/${id}`, {
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const updatePost = (id, title, text, feelings, user) => {
  return axios.patch(
    `${apiUrl}/posts/${id}`,
    { post: { title, text, feelings } },
    {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    }
  )
}
