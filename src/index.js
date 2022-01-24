import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'

import App from './App'
import { BrowserRouter } from 'react-router-dom'
// import ParticlesBackground from './ParticlesBackground/ParticlesBackground'

const appJsx = (
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <App />
    {/* <ParticlesBackground /> */}
  </BrowserRouter>
)

ReactDOM.render(appJsx, document.getElementById('root'))
