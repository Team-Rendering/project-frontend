import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { createPost } from '../../api/post'
import PostForm from './PostForm'

const CreatePost = ({ user, msgAlert }) => {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [photo, setPhoto] = useState('')
  const [createdId, setCreatedId] = useState(null)

  const handleSubmit = async event => {
    event.preventDefault()

    try {
      const res = await createPost(title, text, photo, user)
      setCreatedId(res.data.post._id)

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
      <div className='col-sm-10 col-md-8 mx-auto mt-5'>
        <h3>Create Post</h3>
        <PostForm
          handleSubmit={handleSubmit}
          title={title}
          text={text}
          photo={photo}
          setTitle={setTitle}
          setText={setText}
          setPhoto={setPhoto}
        />
      </div>
    </div>
  )
}

export default CreatePost
