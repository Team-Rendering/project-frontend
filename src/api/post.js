import axios from 'axios'
import apiUrl from '../apiConfig'

export const createPost = (title, text, photo, user) => {
  return axios.post(
    `${apiUrl}/posts`,
    { post: { title, text, photo } },
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

export const showPost = (id
  , user) => {
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

export const updatePost = (id, title, text, photo, user) => {
  return axios.patch(
    `${apiUrl}/posts/${id}`,
    { post: { title, text, photo } },
    {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    }
  )
}
