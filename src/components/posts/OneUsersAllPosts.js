import React, { useEffect, useState } from 'react'
import { indexUsersPost } from '../../api/post'
import { Link, Redirect } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import { format } from 'timeago.js'
import './Posts.css'
const OneUsersAllPosts = ({ user, msgAlert }) => {
  const [usersPosts, setUsersPosts] = useState(null)

  if (!user) {
    return <Redirect to='/' />
  }

  useEffect(() => {
    const getAllPosts = async () => {
      try {
        const res = await indexUsersPost(user)
        setUsersPosts(res.data.posts.owner)
      } catch (error) {
        // Alert the user, that they failed to sign up
        msgAlert({
          heading: 'Posts Cant be displayed: ' + error.message,
          message: 'Cant index Post',
          // this will be red
          variant: 'danger'
        })
      }
    }
    getAllPosts()
  }, [])

  if (usersPosts.length === 0) {
    return (
      <Spinner animation='border' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </Spinner>
    )
  }
  const postList = usersPosts.map(post => (
    <div className='posts' key={post._id}>
      <Link to={`/posts/${post._id}`}>{post.title}</Link>
      <span className='postDate'>{format(post.createdAt)}</span>
      <h6>{post.text}</h6>
      <h6>Photo: {post.photo}</h6>
      <h6>{post.owner}</h6>
    </div>
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

export default OneUsersAllPosts
