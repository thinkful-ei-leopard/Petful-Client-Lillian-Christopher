import React from 'react'
import { Route } from 'react-router-dom'
import Landing from '../Landing/Landing'
import AdoptMain from '../AdoptMain/AdoptMain'

class Root extends React.Component {
  render(){
    return (
      <main>
        <Route 
          exact
          path={'/'}
          component={Landing}
        />
        <Route 
          path={'/adopt'}
          component={AdoptMain}
        />
      </main>
    )
  }
}

export default Root
