import { Link } from 'react-router-dom'

const Table = ({ user, onDelete, deletingId }) => {
  const isDeleting = deletingId === user.id

  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{new Date(user.createdAt).toLocaleDateString()}</td>
      <td>
        <div className="users-actions">
          <Link to={`/users/${user.id}`} className="users-link">
            View
          </Link>
          <Link to={`/users/${user.id}?edit=1`} className="users-link">
            Edit
          </Link>
          <button
            type="button"
            className="users-btn users-btn--danger"
            onClick={() => onDelete(user)}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </td>
    </tr>
  )
}

export default Table
