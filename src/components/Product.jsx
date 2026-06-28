const Product = ({ product }) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        margin: "10px",
        borderRadius: "8px",
      }}
    >
      <h2>{product.name}</h2>
      <p>Price: ₹{product.price}</p>
      <p>Category: {product.category}</p>
    </div>
  );
};

export default Product;