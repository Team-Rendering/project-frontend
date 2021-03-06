/* eslint-disable no-tabs */
import React, { Component, Fragment } from 'react'
import { Route, Switch } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

// import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import SignOut from './components/auth/SignOut'
import ChangePassword from './components/auth/ChangePassword'

import Home from './components/posts/Home'
import Posts from './components/posts/Posts'
import PostEdit from './components/posts/PostEdit'
import Post from './components/posts/Post'
import PostCreate from './components/posts/PostCreate'
import OneUsersAllPosts from './components/posts/OneUsersAllPosts'
import './app.css'
import ParticlesBackground from './ParticlesBackground/ParticlesBackground'
import AllUsers from './components/auth/IndexUsers'
// import ParticlesBackground from './ParticlesBackground/ParticlesBackground'
// import Particles from 'react-tsparticles'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = (user) => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  deleteAlert = (id) => {
    this.setState((state) => {
      return { msgAlerts: state.msgAlerts.filter((msg) => msg.id !== id) }
    })
  }

  msgAlert = ({ heading, message, variant }) => {
    const id = uuid()
    this.setState((state) => {
      return {
        msgAlerts: [...state.msgAlerts, { heading, message, variant, id }]
      }
    })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <ParticlesBackground />
        <div className='a'>
          <Header user={user} />
          {msgAlerts.map((msgAlert) => (
            <AutoDismissAlert
              key={msgAlert.id}
              heading={msgAlert.heading}
              variant={msgAlert.variant}
              message={msgAlert.message}
              id={msgAlert.id}
              deleteAlert={this.deleteAlert}
            />
          ))}

          <main className='container'>
            <Route
              exact path='/'
              render={() => (
                <Home msgAlert={this.msgAlert} setUser={this.setUser} />
              )}
            />

            <Route
              exact path='/sign-up'
              render={() => (
                <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
              )}
            />
            <Route
              exact path='/sign-in'
              render={() => (

                <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
              )}
            />
            <Route
              user={user}
              path='/sign-out'
              render={() => (
                <SignOut
                  msgAlert={this.msgAlert}
                  clearUser={this.clearUser}
                  user={user}
                />
              )}
            />
            {/* <Route path='/posts/create' element={<CreatePost msgAlert={this.msgAlert} user={user} />} /> */}
            <Route
              user={user}
              path='/change-password'
              render={() => (
                <ChangePassword msgAlert={this.msgAlert} user={user} />
              )}
            />
            <Switch >

              <Route
                user={user}
                path='/users'
                render={() => (
                  <AllUsers msgAlert={this.msgAlert} user={user} />
                )}
              />
              <Route
                user={user}
                path='/posts/create'
                render={() => (
                  <PostCreate msgAlert={this.msgAlert} user={user} />
                )}
              />
              <Route
                user={user}
                path='/posts/owner'
                render={() => (
                  <OneUsersAllPosts msgAlert={this.msgAlert} user={user} />
                )}
              />
              <Route
                user={user}
                path='/posts/:id'
                render={() => (
                  <Post msgAlert={this.msgAlert} user={user} />
                )}
              />
              <Route
                user={user}
                path='/posts'
                render={() => (
                  <Posts msgAlert={this.msgAlert} user={user} />
                )}
              />

            </Switch>
            <Route
              user={user}
              path='/posts/:id/edit'
              render={() => (
                <PostEdit msgAlert={this.msgAlert} user={user} />
              )}
            />

          </main>
        </div>
      </Fragment>

    )
  }
}

export default App
