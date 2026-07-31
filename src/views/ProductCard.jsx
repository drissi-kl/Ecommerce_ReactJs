export default function ProductCard({ product }) {
  return (
    <div className="product_card">
      <img src={product.thumbnail} alt={product.title} />
      <span>{product.category}</span>
      <h3>{product.title}</h3>
      <p>${product.price}</p>
      <button>Add to Cart</button>
    </div>
  );
}