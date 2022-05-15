import { useEffect, useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Login from '../pages/Login'
import Register from '../pages/Register'

const Routes = () => {
  const [authenticated, setAuthenticated] = useState(false)
  const token = localStorage.getItem('@KenzieHub:token')

  useEffect(() => {
    if (token) {
      return setAuthenticated(true)
    }
  }, [authenticated])

  return (
    <Switch>
      <Route exact path='/'>
        <Login
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
        />
      </Route>
      <Route path='/register'>
        <Register />
      </Route>
      <Route path='/dashboard/:name/:module'>
        <Dashboard
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
        />
      </Route>
    </Switch>
  )
}

export default Routes
