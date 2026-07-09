import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart, removeFromCart, removeProductFromCart } from '../store/cartSlice'
import Product from '../components/Product'
import './ProductsAndCart.css'

const ProductView = () => {
  const dispatch = useDispatch()
  const products = useSelector((state) => state.products.items)
  const cartItems = useSelector((state) => state.cart.items)

  const totalCartPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)

  const handleAddQty = (product) => {
    dispatch(addToCart(product))
  }

  const handleRemoveQty = (id) => {
    dispatch(removeFromCart(id))
  }

  const handleRemoveAll = (id) => {
    dispatch(removeProductFromCart(id))
  }

  return (
    <div className="products-container">
      {/* Products Grid Pane */}
      <div className="products-main">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h1 style={{ margin: 0 }}>Product Catalog</h1>
            <p className="users-subtitle">Premium devices and hardware curated for excellence.</p>
          </div>
        </div>

        <div className="products-grid">
          {products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Side Cart Preview Pane */}
      <div className="products-sidebar">
        <div className="sidebar-cart-card">
          <h3 className="sidebar-cart-title">
            <span>Shopping Cart</span>
            <span className="sidebar-cart-badge">{totalCartCount}</span>
          </h3>

          <div className="sidebar-cart-items">
            {cartItems.length === 0 ? (
              <div className="sidebar-cart-empty">
                <p>Your cart is empty</p>
                <span style={{ fontSize: '12px', color: 'var(--text)' }}>Click "Buy Now" to add items</span>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="sidebar-cart-item">
                  <img src={item.image} alt={item.name} className="sidebar-item-img" />
                  <div className="sidebar-item-details">
                    <p className="sidebar-item-name">{item.name}</p>
                    <p className="sidebar-item-price">₹{item.price.toLocaleString()} each</p>
                    <div className="sidebar-item-qty">
                      <button 
                        type="button" 
                        className="qty-btn" 
                        onClick={() => handleRemoveQty(item.id)}
                      >
                        -
                      </button>
                      <span className="qty-val">{item.quantity}</span>
                      <button 
                        type="button" 
                        className="qty-btn" 
                        onClick={() => handleAddQty(item)}
                      >
                        +
                      </button>

                      <button 
                        type="button" 
                        className="qty-remove-link"
                        onClick={() => handleRemoveAll(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="sidebar-cart-summary">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{totalCartPrice.toLocaleString()}</span>
              </div>
              <div className="summary-row summary-row--total">
                <span>Total</span>
                <span>₹{totalCartPrice.toLocaleString()}</span>
              </div>
              <Link 
                to="/cart" 
                className="users-btn users-btn--primary" 
                style={{ display: 'block', textAlign: 'center', width: '100%', boxSizing: 'border-box', marginTop: '16px', textDecoration: 'none' }}
              >
                Go to Cart Page
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductView