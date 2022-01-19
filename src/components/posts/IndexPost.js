import React, { useEffect, useState } from 'react'
import { indexPost } from '../../api/post'
import { Link, Redirect } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
// import BookCreate from './BookCreate'

const IndexPosts = ({ user, msgAlert }) => {
  const [posts, setPost] = useState([])

  if (!user) {
    return <Redirect to='/' />
  }

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await indexPost(user)
        setPost(response.data.posts)
      } catch (error) {
        // Alert the user, that they failed to sign up
        msgAlert({
          heading: 'Post Cant be displayed: ' + error.message,
          message: 'Cant index Post',
          // this will be red
          variant: 'danger'
        })
      }
      // if (!user) {
      //   return <Navigate to='/' />
      // }
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
      <h6>{post.text}</h6>
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

//   const renderedMovies = movies.map(movie => {
//     return (
//       <li key={movie._id}>
//         <Link to={`/movies/${movie._id}`}>
//           <h6>{movie.title}</h6>
//         </Link>
//         <p>{movie.director}</p>
//       </li>
//     )
//   })
//   return (
//     <>
//       <h3>Movies:</h3>
//       <ul>
//         {renderedMovies}
//       </ul>
//     </>
//   )
// }

export default IndexPosts
