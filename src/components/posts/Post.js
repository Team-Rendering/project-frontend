import React, { useState, useEffect } from 'react'
import { Link, Redirect, useParams } from 'react-router-dom'
import { Spinner, Button } from 'react-bootstrap'
import { deletePost, showPost } from '../../api/post'
import { format } from 'timeago.js'
import './Post.css'

const Post = ({ user, msgAlert }) => {
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
          heading: 'Post failed to load this is coming from (Post.js Error)',
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
        heading: 'Failed to delete Post',
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
    // We have a post, display it!
    return (
      <div className='post'>
        <div className='PostWrapper'>
          <h3>{post.title}</h3>
          <span className='postDate'>{format(post.createdAt)}</span>
          <p>You changed your mind?💭: {post.text}</p>
          <p>Upload Photo: {post.photo}</p>
          <Link to={`/posts/${id}/edit`}>
            <Button className='Bttn' variant='primary' type='submit'>Update Post</Button>
          </Link>
          <Button className='Bttn' variant='danger' onClick={handleDeleteClick}>Delete Post</Button>
        </div>
      </div>
    )
  }
}

export default Post
