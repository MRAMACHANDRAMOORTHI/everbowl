import React from 'react'
import { AuthLayout } from '../components/auth/AuthLayout'
import { LoginForm } from '../components/auth/LoginForm'

export const Login: React.FC = () => {
  return (
    <AuthLayout
      title="Welcome Back, Foodie 🍴"
      subtitle="Track your orders, customize your bowls, and earn rewards."
    >
      <LoginForm />
    </AuthLayout>
  )
}