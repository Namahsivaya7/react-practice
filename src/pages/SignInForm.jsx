import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { signin } from '../api/authApi'
import { useAuth } from '../store/authStore'
import './SignupForm.css'

const initialForm = {
  email: '',
  password: '',
}

function SignInForm() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState({ type: '', message: '' })
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const redirectTo = location.state?.from || '/users'

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setStatus({ type: '', message: '' })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setStatus({ type: '', message: '' })

    try {
      const data = await signin({
        email: form.email,
        password: form.password,
      })

      login(data.token, data.user)
      navigate(redirectTo, { replace: true })
    } catch (error) {
      const message =
        error.response?.data?.message || 'Something went wrong. Please try again.'
      setStatus({ type: 'error', message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="signup-card">
      <h2>Welcome back</h2>
      <p className="signup-subtitle">Sign in to your account</p>

      <form className="signup-form" onSubmit={handleSubmit}>
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
          placeholder="Your password"
          required
          minLength={6}
        />

        {status.message && (
          <p className={`signup-status signup-status--${status.type}`}>{status.message}</p>
        )}

        <button type="submit" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>

      <p className="auth-switch">
        Don&apos;t have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  )
}

export default SignInForm
