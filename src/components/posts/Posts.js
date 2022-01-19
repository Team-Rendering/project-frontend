import React, { useEffect, useState } from 'react'
import { indexPost } from '../../api/post'
import { Link, Redirect } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'

const Posts = ({ user, msgAlert }) => {
  const [posts, setPosts] = useState([])

  if (!user) {
    return <Redirect to='/' />
  }

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await indexPost(user)
        setPosts(response.data.posts)
      } catch (error) {
        // Alert the user, that they failed to sign up
        msgAlert({
          heading: 'Post Cant be displayed: ' + error.message,
          message: 'Cant index Post',
          // this will be red
          variant: 'danger'
        })
      }
      if (!user) {
        return <Redirect to='/' />
      }
    }
    getPosts()
  }, [])

  if (posts.length === 0) {
    return (
      <Spinner animation='border' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </Spinner>
    )
  }
  const postList = posts.map(post => (
    <li key={post._id}>
      <Link to={`/posts/${post._id}`}>{post.title}</Link>
      <h6>Whats on your mind🧠: {post.text}</h6>
      <h6>Photo: {post.photo}</h6>
    </li>
  ))

  return (
    <div className='row'>
      <div className='col-sm-10 col-md-8 mx-auto mt-5'>
        <h3>Posts</h3>
        <ul>{postList}</ul>
      </div>
    </div>
  )
}

export default Posts
