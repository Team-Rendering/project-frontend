import React, { useState, useEffect } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { Spinner, Button } from 'react-bootstrap'
// import { deletePost } from '../../api/post'

import { deletePost, showPost } from '../../api/post'

const OnePost = ({ user, msgAlert }) => {
  const [post, setPost] = useState(null)
  const [deleted, setDeleted] = useState(false)
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
        setPost(res.data.post)
      } catch (error) {
        msgAlert({
          heading: 'Post failed to load',
          message: error.message,
          variant: 'danger'
        })
      }
    }
    fetchData()
  }, [])

  const handleDeleteClick = async () => {
    try {
      await deletePost(id, user)
      setDeleted(true)
    } catch (error) {
      msgAlert({
        heading: 'Failed to delete post',
        message: error.message,
        variant: 'danger'
      })
    }
  }

  // 3 states:
  // If movie is `null`, we are loading
  if (!post) {
    return (
      <Spinner animation='border' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </Spinner>
    )
  } else if (deleted) {
    return <Redirect to='/posts' />
  } else {
    // We have a movie, display it!
    return (
      <div className='row'>
        <div className='col-sm-10 col-md-8 mx-auto mt-5'>
          <h3>{post.title}</h3>
          <p>Post : {post.text}</p>
          <p>Photo : {post.photo}</p>
          <Button variant='danger' onClick={handleDeleteClick}>Delete Post</Button>
          {/* <Link to={`/posts/${id}/edit`}>
            <Button variant='primary' type='submit'>Update Post</Button>
          </Link> */}
        </div>
      </div>
    )
  }
}

export default OnePost
