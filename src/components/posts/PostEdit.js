import React, { useState, useEffect } from 'react'
import { Redirect, useParams } from 'react-router-dom'

import PostForm from './PostForm'
import { showPost, updatePost } from '../../api/post'

const PostEdit = ({ user, msgAlert }) => {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [feelings, setFeelings] = useState('')
  const [updated, setUpdated] = useState(false)
  const { id } = useParams()

  // if user is null, redirect to home page
  // Note: Must check before useEffect, since it needs user
  if (!user) {
    return <Redirect to='/' />
  }

  useEffect(() => {
    // When using async & await in a `useEffect` function
    // We have to wrap our `async` code in a function:
    // https://stackoverflow.com/a/53572588
    const fetchData = async () => {
      try {
        const res = await showPost(id, user)
        setTitle(res.data.post.title)
        setText(res.data.post.text)
        setFeelings(res.data.post.feelings)
      } catch (error) {
        msgAlert({
          heading: 'Failed to load post',
          message: error.message,
          variant: 'danger'
        })
      }
    }
    fetchData()
  }, [])

  const handleSubmit = async event => {
    event.preventDefault()

    try {
      await updatePost(id, title, text, feelings, user)
      setUpdated(true)
    } catch (error) {
      msgAlert({
        heading: 'Failed to update post',
        message: error.message,
        variant: 'danger'
      })
    }
  }

  if (updated) {
    // Navigate to the 'show' page
    return <Redirect to={`/posts/${id}`} />
  }

  return (
    <div className='row'>
      <div className='col-sm-10 col-md-8 mx-auto mt-5'>
        <h3>Edit Post</h3>
        <PostForm
          handleSubmit={handleSubmit}
          title={title}
          text={text}
          feelings={+feelings}
          setTitle={setTitle}
          setText={setText}
          setFeelings={setFeelings}
        />
      </div>
    </div>
  )
}

export default PostEdit
