import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/authSlice'
import '../pages/ProductsAndCart.css'

function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  
  const user = useSelector((state) => state.auth.user)
  const cartItems = useSelector((state) => state.cart.items)
  
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/signin', { replace: true })
  }

  if (!user) {
    return null
  }

  const isActive = (path) => {
    return location.pathname === path ? 'active' : ''
  }

  return (
    <nav className="app-navbar">
      <div className="navbar-container">
        <Link to="/products" className="navbar-brand">
          E-Commerce App
        </Link>

        <div className="navbar-links">
          <Link to="/products" className={`navbar-link ${isActive('/products')}`}>
            Products
          </Link>
          <Link to="/users" className={`navbar-link ${isActive('/users')}`}>
            Users
          </Link>
          <Link to="/cart" className={`navbar-link ${isActive('/cart')}`}>
            Cart {totalCartCount > 0 && <span className="cart-link-badge">{totalCartCount}</span>}
          </Link>
          <Link to="/dashboard" className={`navbar-link ${isActive('/dashboard')}`}>
            Profile
          </Link>
        </div>

        <div className="navbar-user-section">
          <span className="navbar-user-welcome">Hello, {user.name}</span>
          <button 
            type="button" 
            className="users-btn navbar-logout-btn" 
            onClick={handleLogout}
          >
            Log out
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
