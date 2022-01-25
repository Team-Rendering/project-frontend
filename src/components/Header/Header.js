import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link, NavLink } from 'react-router-dom'
import './header.css'
import { ArrowRight, ArrowUp, DoorClosedFill, GearFill, HouseFill, PencilSquare, PersonFill, PersonLinesFill, PersonWorkspace, Signpost2Fill } from 'react-bootstrap-icons'

const authenticatedOptions = (

  <Fragment>
    <NavLink to='/posts/owner' className='nav-link OneUsersAllPosts'>See Your Posts <PersonWorkspace /></NavLink>
    <NavLink to='/users/' className='nav-link makePost'>List of Users <PersonLinesFill /></NavLink>
    <NavLink to='/posts/create' className='nav-link makePost'>Make a Post <PencilSquare /></NavLink>
    <NavLink to='/posts' className='nav-link seePosts '>Posts <Signpost2Fill /></NavLink>
    <NavLink to='/change-password' className='nav-link changePass '>Change Password <GearFill /></NavLink>
    <NavLink to='/sign-out' className='nav-link doorClosed'>Sign Out <DoorClosedFill /></NavLink>
  </Fragment>

)

const unauthenticatedOptions = (
  <Fragment>
    <NavLink to='/sign-up' className='nav-link'>Sign Up <ArrowUp /></NavLink>
    <NavLink to='/sign-in' className='nav-link'>Sign In <ArrowRight /></NavLink>
  </Fragment>
)

const alwaysOptions = (
  <Fragment>
    <NavLink to='/' className='nav-link homeNav'>Home <HouseFill /></NavLink>
  </Fragment>
)

const Header = ({ user }) => (
  <Navbar className='navbar' bg='primary' variant='dark' expand='md' >
    <Navbar.Brand>
      <Link to='/' style={{ color: '#FFF', textDecoration: 'none' }} className='ml-auto logo border-fade'>OurSpace</Link>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls='basic-navbar-nav' />
    <Navbar.Collapse id='basic-navbar-nav'>
      <Nav className='ms-auto justify-content-center' >
        {user && (
          <span className='navbar-text' style={{ color: '#FFF', textDecoration: 'none' }}> {user.email} <PersonFill /> </span>
        )}
        {alwaysOptions}
        {user ? authenticatedOptions : unauthenticatedOptions}
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
