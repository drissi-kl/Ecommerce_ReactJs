import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getProductsApi } from '../services/products';

import "./products.css";

export default function Products() {
  const { category } = useParams();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(null);
  const [products, setProducts] = useState(null);
  const [pagination, setPagination] = useState([]);

  useEffect(() => {
    let limit = 21;
    let skip = 21 * page - 21;

    const fetchCategory = async (limit, skip) => {
      const response = await getProductsApi(limit, skip);
      if (response) {
        setProducts(response);
        setTotalProducts(response.total);
      }
    };
    fetchCategory(limit, skip);
  }, [page]);

  useEffect(() => {
    if (!totalProducts) return;
    const t = [];
    for (let i = 1; i <= Math.ceil(totalProducts / 21); i++) {
      t.push(i);
    }
    setPagination(t);
  }, [totalProducts]);

  return (
    <main className="products">
      {/* Sidebar Filters */}
      <aside className="filter">
        <div className="category_selection">
          <p>Category:</p>
          <div>
            <input type="checkbox" id="laptop" />
            <label htmlFor="laptop">Laptops</label>
          </div>
          <div>
            <input type="checkbox" id="phone" />
            <label htmlFor="phone">Phones</label>
          </div>
        </div>

        <div className="price_selection">
          <p>Price:</p>
          <div>
            <input className="min_price" type="text" placeholder="min" />
            <input className="max_price" type="text" placeholder="max" />
          </div>
        </div>

        <button className="apply_selection">Apply</button>
      </aside>

      {/* Main Content Area */}
      <section className="products_container">
        {/* Grid of Product Cards */}
        <div className="products_grid">
          {products?.products?.map((product) => (
            <div key={product.id} className="product">
              <div className="image">
                <img src={product.thumbnail} alt={product.title} />
                <div>
                  <p className="product_title">{product.title}</p>
                  <p className="product_price">{product.price}</p>
                  <button>Add To Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Bar */}
        {pagination.length > 1 && (
          <div className="pagination_wrapper">
            <button
              className="page_nav_btn"
              disabled={page === 1}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            >
              Prev
            </button>

            <div className="page_numbers">
              {pagination.map((item) => (
                <button
                  key={item}
                  className={`page_btn ${page === item ? 'active' : ''}`}
                  onClick={() => setPage(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <button
              className="page_nav_btn"
              disabled={page === pagination.length}
              onClick={() => setPage((prev) => Math.min(prev + 1, pagination.length))}
            >
              Next
            </button>
          </div>
        )}
      </section>
    </main>
  );
}