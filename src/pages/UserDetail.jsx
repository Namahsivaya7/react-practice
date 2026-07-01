import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { deleteUser, getUser, updateUser } from '../api/userApi'
import { useAuth, useAuthStore } from '../store/authStore'
import './Users.css'

function formatDate(value) {
  return new Date(value).toLocaleString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function UserDetail() {
  const { id } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const isEditing = searchParams.get('edit') === '1'
  const [user, setUser] = useState(null)
  const [form, setForm] = useState({ name: '', email: '' })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [status, setStatus] = useState({ type: '', message: '' })
  const { user: currentUser } = useAuth()
  const login = useAuthStore((state) => state.login)
  const navigate = useNavigate()

  const loadUser = useCallback(async () => {
    setLoading(true)
    setStatus({ type: '', message: '' })

    try {
      const data = await getUser(id)
      setUser(data.user)
      setForm({ name: data.user.name, email: data.user.email })
    } catch (error) {
      const message =
        error.response?.data?.message || 'Failed to load user details.'
      setStatus({ type: 'error', message })
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    loadUser()
  }, [loadUser])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setStatus({ type: '', message: '' })
  }

  const startEditing = () => {
    setSearchParams({ edit: '1' })
    setStatus({ type: '', message: '' })
  }

  const cancelEditing = () => {
    setSearchParams({})
    setForm({ name: user.name, email: user.email })
    setStatus({ type: '', message: '' })
  }

  const handleSave = async (event) => {
    event.preventDefault()
    setSaving(true)
    setStatus({ type: '', message: '' })

    try {
      const data = await updateUser(id, form)
      setUser(data.user)
      setForm({ name: data.user.name, email: data.user.email })
      setSearchParams({})
      setStatus({ type: 'success', message: 'User updated successfully.' })

      if (currentUser?.id === data.user.id) {
        const token = localStorage.getItem('auth_token')
        if (token) {
          login(token, data.user)
        }
      }
    } catch (error) {
      const message =
        error.response?.data?.message || 'Failed to update user. Please try again.'
      setStatus({ type: 'error', message })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm(`Delete ${user.name}? This cannot be undone.`)) {
      return
    }

    setDeleting(true)
    setStatus({ type: '', message: '' })

    try {
      await deleteUser(id)
      navigate('/users', {
        replace: true,
        state: { message: `${user.name} was deleted.` },
      })
    } catch (error) {
      const message =
        error.response?.data?.message || 'Failed to delete user. Please try again.'
      setStatus({ type: 'error', message })
      setDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="users-card">
        <p className="users-empty">Loading user details...</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="users-card">
        {status.message && (
          <p className={`users-status users-status--${status.type}`}>{status.message}</p>
        )}
        <Link to="/users" className="users-link">
          Back to users
        </Link>
      </div>
    )
  }

  return (
    <div className="users-card">
      <div className="users-header">
        <div>
          <h2>{isEditing ? 'Edit user' : 'User details'}</h2>
          <p className="users-subtitle">
            {isEditing ? 'Update name or email for this account.' : user.name}
          </p>
        </div>
        <Link to="/users" className="users-link">
          Back to users
        </Link>
      </div>

      {status.message && (
        <p className={`users-status users-status--${status.type}`}>{status.message}</p>
      )}

      {isEditing ? (
        <form className="user-edit-form" onSubmit={handleSave}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
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
            required
          />

          <div className="user-detail-actions">
            <button type="submit" className="users-btn users-btn--primary" disabled={saving}>
              {saving ? 'Saving...' : 'Save changes'}
            </button>
            <button type="button" className="users-btn" onClick={cancelEditing} disabled={saving}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="user-detail-grid">
            <div className="user-detail-row">
              <span className="user-detail-label">ID</span>
              <span className="user-detail-value">{user.id}</span>
            </div>
            <div className="user-detail-row">
              <span className="user-detail-label">Name</span>
              <span className="user-detail-value">{user.name}</span>
            </div>
            <div className="user-detail-row">
              <span className="user-detail-label">Email</span>
              <span className="user-detail-value">{user.email}</span>
            </div>
            <div className="user-detail-row">
              <span className="user-detail-label">Joined</span>
              <span className="user-detail-value">{formatDate(user.createdAt)}</span>
            </div>
            <div className="user-detail-row">
              <span className="user-detail-label">Last updated</span>
              <span className="user-detail-value">{formatDate(user.updatedAt)}</span>
            </div>
          </div>

          <div className="user-detail-actions">
            <button type="button" className="users-btn users-btn--primary" onClick={startEditing}>
              Edit user
            </button>
            <button
              type="button"
              className="users-btn users-btn--danger"
              onClick={handleDelete}
              disabled={deleting || currentUser?.id === user.id}
            >
              {deleting ? 'Deleting...' : 'Delete user'}
            </button>
          </div>

          {currentUser?.id === user.id && (
            <p className="users-subtitle" style={{ marginTop: '16px' }}>
              You cannot delete your own account from this page.
            </p>
          )}
        </>
      )}
    </div>
  )
}

export default UserDetail
