import { useState } from 'react'
import { signup } from '../api/authApi'
import './SignupForm.css'

const initialForm = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
}

function SignupForm() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState({ type: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setStatus({ type: '', message: '' })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (form.password !== form.confirmPassword) {
      setStatus({ type: 'error', message: 'Passwords do not match' })
      return
    }

    setLoading(true)
    setStatus({ type: '', message: '' })

    try {
      const data = await signup({
        name: form.name,
        email: form.email,
        password: form.password,
      })

      setStatus({ type: 'success', message: data.message })
      setForm(initialForm)
    } catch (error){
      const message =
        error.response?.data?.message || 'Something went wrong. Please try again.'
      setStatus({ type: 'error', message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="signup-card">
      <h2>Create an account</h2>
      <p className="signup-subtitle">Sign up to get started</p>

      <form className="signup-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          placeholder="Jane Doe"
          required
          minLength={2}
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="At least 6 characters"
          required
          minLength={6}
        />

        <label htmlFor="confirmPassword">Confirm password</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={form.confirmPassword}
          onChange={handleChange}
          placeholder="Re-enter your password"
          required
          minLength={6}
        />

        {status.message && (
          <p className={`signup-status signup-status--${status.type}`}>{status.message}</p>
        )}

        <button type="submit" disabled={loading}>
          {loading ? 'Creating account...' : 'Sign up'}
        </button>
      </form>
    </div>
  )
}

export default SignupForm
