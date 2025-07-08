import React from 'react'
import { AuthLayout } from '../components/auth/AuthLayout'
import { SignupForm } from '../components/auth/SignupForm'

export const Signup: React.FC = () => {
  return (
    <AuthLayout
      title="Join the Ever Bowl Tribe 🌱"
      subtitle="Start your journey to healthier living with organic nutrition."
    >
      <SignupForm />
    </AuthLayout>
  )
}