import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart, removeFromCart, removeProductFromCart, clearCart } from '../store/cartSlice'
import './ProductsAndCart.css'

function CartView() {
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.items)

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)
  const shipping = subtotal > 50000 ? 0 : 499
  const tax = Math.round(subtotal * 0.08) // 8% tax
  const total = subtotal + shipping + tax

  const handleAddQty = (product) => {
    dispatch(addToCart(product))
  }

  const handleRemoveQty = (id) => {
    dispatch(removeFromCart(id))
  }

  const handleRemoveAll = (id) => {
    dispatch(removeProductFromCart(id))
  }

  const handleCheckout = () => {
    alert("🚀 Order Placed Successfully! Thank you for shopping with E-commerce app.")
    dispatch(clearCart())
  }

  return (
    <div className="cart-page">
      <div>
        <h1 style={{ margin: 0 }}>Shopping Cart</h1>
        <p className="users-subtitle">Review and modify your items before completing purchase.</p>
      </div>

      {cartItems.length === 0 ? (
        <div className="users-empty" style={{ marginTop: '24px', padding: '48px 24px' }}>
          <h2>Your Cart is Empty</h2>
          <p style={{ color: 'var(--text)', marginBottom: '24px' }}>
            It looks like you haven't added any products to your cart yet.
          </p>
          <Link to="/products" className="users-btn users-btn--primary" style={{ textDecoration: 'none' }}>
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          {/* Cart Items List */}
          <div className="cart-items-list">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item-row">
                <img src={item.image} alt={item.name} className="cart-item-img" />

                <div className="cart-item-details">
                  <span className="cart-item-category">{item.category}</span>
                  <h3 className="cart-item-title">{item.name}</h3>
                  <span className="cart-item-price">₹{item.price.toLocaleString()}</span>
                </div>

                <div className="cart-item-actions">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button
                      type="button"
                      className="qty-btn"
                      onClick={() => handleRemoveQty(item.id)}
                    >
                      -
                    </button>
                    <span className="qty-val" style={{ minWidth: '20px', textAlign: 'center' }}>
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      className="qty-btn"
                      onClick={() => handleAddQty(item)}
                    >
                      +
                    </button>
                  </div>

                  <span className="cart-item-total">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </span>

                  <button
                    type="button"
                    className="qty-remove-link"
                    style={{ fontSize: '14px' }}
                    onClick={() => handleRemoveAll(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
              <Link to="/products" className="users-link" style={{ fontSize: '14px' }}>
                ← Continue Shopping
              </Link>
              <button
                type="button"
                className="users-btn users-btn--danger"
                style={{ fontSize: '14px' }}
                onClick={() => {
                  if (window.confirm("Clear all items from your cart?")) {
                    dispatch(clearCart())
                  }
                }}
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Checkout/Summary Panel */}
          <div className="cart-summary-panel">
            <h3 className="cart-summary-title">Order Summary</h3>

            <div className="cart-summary-totals">
              <div className="summary-row">
                <span style={{ color: 'var(--text)' }}>Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="summary-row">
                <span style={{ color: 'var(--text)' }}>Shipping</span>
                <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
              </div>
              <div className="summary-row">
                <span style={{ color: 'var(--text)' }}>Estimated Tax (8%)</span>
                <span>₹{tax.toLocaleString()}</span>
              </div>
              <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '16px 0' }} />
              <div className="summary-row summary-row--total">
                <span>Grand Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
            </div>

            <button
              type="button"
              className="users-btn users-btn--primary"
              style={{ width: '100%', padding: '14px', fontSize: '16px' }}
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartView
