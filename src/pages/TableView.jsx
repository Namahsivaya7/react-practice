import { useCallback, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { deleteUser, getUsers } from '../api/userApi'
import { useAuth } from '../store/authStore'
import Table from '../components/Table'
import './Users.css'

function TableView() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState({ type: '', message: '' })
  const [deletingId, setDeletingId] = useState(null)
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const loadUsers = useCallback(async () => {
    setLoading(true)
    setStatus({ type: '', message: '' })

    try {
      const data = await getUsers()
      setUsers(data.users)
    } catch (error) {
      const message =
        error.response?.data?.message || 'Failed to load users. Please try again.'
      setStatus({ type: 'error', message })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadUsers()
  }, [loadUsers])

  useEffect(() => {
    if (location.state?.message) {
      setStatus({ type: 'success', message: location.state.message })
      navigate(location.pathname, { replace: true, state: {} })
    }
  }, [location.pathname, location.state, navigate])

  const handleLogout = () => {
    logout()
    navigate('/signin', { replace: true })
  }

  const handleDelete = async (targetUser) => {
    if (!window.confirm(`Delete ${targetUser.name}? This cannot be undone.`)) {
      return
    }

    setDeletingId(targetUser.id)
    setStatus({ type: '', message: '' })

    try {
      await deleteUser(targetUser.id)
      setUsers((prev) => prev.filter((item) => item.id !== targetUser.id))
      setStatus({ type: 'success', message: `${targetUser.name} was deleted.` })
    } catch (error) {
      const message =
        error.response?.data?.message || 'Failed to delete user. Please try again.'
      setStatus({ type: 'error', message })
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="users-card">
      <div className="users-header">
        <div>
          <h2>Users</h2>
          <p className="users-subtitle">
            Signed in as {user?.name}. Manage all registered users below.
          </p>
        </div>
        <div className="users-nav">
          <Link to="/dashboard" className="users-link">
            My profile
          </Link>
          <button type="button" className="users-btn" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </div>

      {status.message && (
        <p className={`users-status users-status--${status.type}`}>{status.message}</p>
      )}

      {loading ? (
        <p className="users-empty">Loading users...</p>
      ) : users.length === 0 ? (
        <p className="users-empty">No users found.</p>
      ) : (
        <div className="users-table-wrap">
          <table className="users-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((item) => (
                <Table
                  key={item.id}
                  user={item}
                  onDelete={handleDelete}
                  deletingId={deletingId}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default TableView
