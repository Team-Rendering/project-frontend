import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link, NavLink } from 'react-router-dom'
import './header.css'
import { DoorClosedFill, FilePostFill } from 'react-bootstrap-icons'

const authenticatedOptions = (

  <Fragment>
    <NavLink to='/posts/create' className='nav-link'><FilePostFill /></NavLink>
    <NavLink to='/posts' className='nav-link'>Posts</NavLink>
    <NavLink to='/change-password' className='nav-link'>Change Password</NavLink>
    <NavLink to='/sign-out' className='nav-link doorClosed'><DoorClosedFill /></NavLink>
  </Fragment>

)

const unauthenticatedOptions = (
  <Fragment>
    <NavLink to='/sign-up' className='nav-link'>Sign Up</NavLink>
    <NavLink to='/sign-in' className='nav-link'>Sign In</NavLink>
  </Fragment>
)

const alwaysOptions = (
  <Fragment>
    <NavLink exact to='/' className='nav-link'>Home</NavLink>
  </Fragment>
)

const Header = ({ user }) => (
  <Navbar className='navbar' bg='primary' variant='dark' expand='md' >
    <Navbar.Brand>
      <Link to='/' style={{ color: '#FFF', textDecoration: 'none' }} className='ml-auto logo border-fade'>OurSpace</Link>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls='basic-navbar-nav' />
    <Navbar.Collapse id='basic-navbar-nav'>
      <Nav className='ms-auto justify-content-end' >
        {user && (
          <span className='navbar-text'>Welcome, {user.email}</span>
        )}
        {alwaysOptions}
        {user ? authenticatedOptions : unauthenticatedOptions}
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
