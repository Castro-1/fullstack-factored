import React, { createContext, useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'

const UserSessionContext = createContext()

export const useUserSession = () => useContext(UserSessionContext)

export const UserSessionProvider = ({ children }) => {
  const [token, setToken] = useState(sessionStorage.getItem('token') || null)

  useEffect(() => {
    if (token !== null) {
      sessionStorage.setItem('token', token)
    }
  }, [token])

  return (
    <UserSessionContext.Provider value={{ token, setToken }}>
      {children}
    </UserSessionContext.Provider>
  )
}

UserSessionProvider.propTypes = {
  children: PropTypes.node.isRequired
}
