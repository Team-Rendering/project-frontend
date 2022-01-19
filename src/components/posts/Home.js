import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => (
  <>
    <h4>Lets get ready to make some friends!</h4>
    <Link to='/sign-up'> Sign Up</Link>
    <Link to='/sign-in'> Sign In</Link>
  </>
)

export default Home
