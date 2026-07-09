import { useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart, removeFromCart } from '../store/cartSlice'
import './ProductsAndCart.css'

function ProductDetail() {
  const { id } = useParams()
  const dispatch = useDispatch()

  const productId = parseInt(id, 10)

  const product = useSelector((state) =>
    state.products.items.find((item) => item.id === productId)
  )

  const cartItem = useSelector((state) =>
    state.cart.items.find((item) => item.id === productId)
  )

  if (!product) {
    return (
      <div className="users-card" style={{ marginTop: '40px' }}>
        <h2>Product Not Found</h2>
        <p className="users-subtitle">The product you are trying to view does not exist.</p>
        <div style={{ marginTop: '20px' }}>
          <Link to="/products" className="users-link">Back to Catalog</Link>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    dispatch(addToCart(product))
  }

  const handleDecreaseQty = () => {
    dispatch(removeFromCart(product.id))
  }

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto 16px', display: 'flex', justifyContent: 'flex-start' }}>
        <Link to="/products" className="users-link" style={{ fontSize: '14px' }}>
          ← Back to Products
        </Link>
      </div>

      <div className="product-detail-card">
        <div className="detail-img-pane">
          <img src={product.image} alt={product.name} className="detail-img" />
        </div>

        <div className="detail-info-pane">
          <span className="detail-category">{product.category}</span>
          <h1 className="detail-title">{product.name}</h1>
          <div className="detail-price">₹{product.price.toLocaleString()}</div>

          <p className="detail-desc">{product.description}</p>

          {cartItem && (
            <div className="detail-status">
              ✨ This item is in your cart! Current quantity: <strong>{cartItem.quantity}</strong>
            </div>
          )}

          <div className="detail-actions">
            {!cartItem ? (
              <button
                type="button"
                className="users-btn users-btn--primary"
                style={{ padding: '12px 24px', fontSize: '16px' }}
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    type="button"
                    className="qty-btn"
                    style={{ width: '32px', height: '32px', fontSize: '18px' }}
                    onClick={handleDecreaseQty}
                  >
                    -
                  </button>
                  <span className="qty-val" style={{ fontSize: '18px', minWidth: '24px', textAlign: 'center' }}>
                    {cartItem.quantity}
                  </span>
                  <button
                    type="button"
                    className="qty-btn"
                    style={{ width: '32px', height: '32px', fontSize: '18px' }}
                    onClick={handleAddToCart}
                  >
                    +
                  </button>
                </div>

                <Link to="/cart" className="users-link" style={{ padding: '10px 18px' }}>
                  Checkout Now
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
