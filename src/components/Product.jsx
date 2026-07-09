import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../store/cartSlice'
import '../pages/ProductsAndCart.css'

const Product = ({ product }) => {
  const dispatch = useDispatch()

  const handleBuyNow = (e) => {
    e.preventDefault()
    dispatch(addToCart(product))
  }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
  return (
    <div className="product-card">
      <div className="product-img-wrap">
        <img 
          src={product.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60"} 
          alt={product.name} 
          className="product-card-img"
          loading="lazy"
        />
      </div>
      <div className="product-card-body">
        <span className="product-card-category">{product.category}</span>
        <h3 className="product-card-title">{product.name}</h3>
        <p className="product-card-desc">
          {product.description || "High quality premium item engineered for performance and comfort."}
        </p>
        <div className="product-card-price-row">
          <span className="product-card-price">₹{product.price.toLocaleString()}</span>
        </div>
        <div className="product-card-actions">
          <Link 
            to={`/products/${product.id}`} 
            className="users-link"
            style={{ flex: 1, textAlignment: "center", display: "inline-block", textAlign: "center" }}
          >
            Details
          </Link>
          <button 
            type="button" 
            className="users-btn users-btn--primary" 
            style={{ flex: 1 }}
            onClick={handleBuyNow}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default Product