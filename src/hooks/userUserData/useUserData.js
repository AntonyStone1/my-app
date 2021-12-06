import React from 'react'
import { UserContext } from '../../components/Router/UserDataProvider'

function useUserData() {
  const context = React.useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUserData must be used within a CountProvider')
  }
  return context
}

export default useUserData
