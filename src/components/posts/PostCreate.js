import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { createPost } from '../../api/post'
import PostForm from './PostForm'

const PostCreate = ({ user, msgAlert }) => {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [feelings, setFeelings] = useState('')
  const [createdId, setCreatedId] = useState(null)

  const handleSubmit = async event => {
    event.preventDefault()

    try {
      const res = await createPost(title, text, feelings, user)
      setCreatedId(res.data.post._id)
      console.log(feelings)
      msgAlert({
        heading: 'Post Created',
        message: `Created ${title} successfully.`,
        variant: 'success'
      })
    } catch (error) {
      msgAlert({
        heading: 'Failed to create Post',
        message: error.message,
        variant: 'danger'
      })
    }
  }

  // if user is null, redirect to home page
  if (!user) {
    return <Redirect to='/' />
  } else if (createdId) {
    // if movie has been created,Navigate to the 'show' page
    return <Redirect to={`/posts/${createdId}`} />
  }
  return (
    <div className='row'>
      <div className='col-md-3 mx-auto mt-5'>
        <h3>Create Post</h3>
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

export default PostCreate
