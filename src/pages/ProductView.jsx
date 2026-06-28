import Product from "../components/Product";

const ProductView = () => {
  const products = [
    {
      id: 1,
      name: "iPhone 15",
      price: 79999,
      category: "Mobile",
    },
    {
      id: 2,
      name: "MacBook Air",
      price: 99999,
      category: "Laptop",
    },
    {
      id: 3,
      name: "iPad Pro",
      price: 69999,
      category: "Tablet",
    },
  ];

  return (
    <div>
      <h1>Products List</h1>

      {products.map((product) => (
        <Product
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
};

export default ProductView;