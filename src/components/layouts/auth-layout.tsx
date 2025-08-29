import React from 'react'

const AuthLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="relative flex min-h-screen flex-col justify-center min-w-screen">
      {children}
    </div>
  )
}

export default AuthLayout
