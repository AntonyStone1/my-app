import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Routing from './components/Router/Routing'
import { UserDataProvider } from './components/Router/UserDataProvider'
import { ProvideAuth } from './hooks/useAuth/useAuth'

function App() {
  return (
    <>
      <UserDataProvider>
        <ProvideAuth>
          <div className="wrapper">
            <Routing />
          </div>
        </ProvideAuth>
      </UserDataProvider>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
