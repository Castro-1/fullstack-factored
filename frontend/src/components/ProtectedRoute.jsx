import React from 'react'
import { Navigate } from 'react-router-dom'
import { useUserSession } from '../UserSessionContext'

export default function ProtectedRoute ({ element }) {
  const { token } = useUserSession()

  if (!token) {
    return <Navigate to={'/login'} replace />
  }

  return element
}