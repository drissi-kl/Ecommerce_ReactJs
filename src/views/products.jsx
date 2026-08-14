import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { getProductsApi } from '../services/products';
import { getCategories } from '../services/category';
import "./products.css";
import { useDispatch, useSelector } from 'react-redux';
import { Check, ShoppingBag } from 'lucide-react';
import checkIfInCart from '../utilities/checkIfInCart';
import toast from 'react-hot-toast';

export default function Products() {
  const goToHead = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const category = location.state?.category;
  console.log('drisssssi: ', category)
  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(null);
  const [products, setProducts] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categorySelected, setCategorySelected] = useState("");
  const [pagination, setPagination] = useState([]);
  const [showAllCategories, setShowAllCategories] = useState(false);

  useEffect(() => {
    if (category) setCategorySelected(category);
  }, [category]);

  useEffect(() => {
    let limit = 21;
    let skip = 21 * page - 21;

    const fetchProducts = async () => {
      const response = await getProductsApi(limit, skip, categorySelected);
      if (response) {
        setProducts(response);
        setTotalProducts(response.total);
      }
    };
    fetchProducts();
    goToHead();
  }, [page, categorySelected]);

  useEffect(() => {
    if (!totalProducts) return;
    const t = [];
    for (let i = 1; i <= Math.ceil(totalProducts / 21); i++) {
      t.push(i);
    }
    setPagination(t);
  }, [totalProducts]);

  useEffect(() => {
    (async () => {
      const response = await getCategories();
      if (response) setCategories(response);
    })();
  }, []);


  const addToCard = (event, id) => {
    event.stopPropagation();
    const productItem = products.products.find((product) => {return product.id == id});
    if(!checkIfInCart(productItem.id)){
      const data = {
        id: productItem.id,
        title: productItem.title,
        price: productItem.price,
        quantity: 1,
        thumbnail: productItem.thumbnail,
        stock: productItem.stock
      }

      const cartItems = localStorage.getItem('cartItems');
      if(cartItems){
        const cartItemsObj = JSON.parse(cartItems);
        cartItemsObj.push(data)
        localStorage.setItem('cartItems', JSON.stringify(cartItemsObj))
      }else{
        localStorage.setItem('cartItems', JSON.stringify([data]));
      }

      dispatch({type:"addProduct", payload: data});

      toast.success(`Add ${productItem.title} success`);

      console.log("add to card function executed", dd);
    }
  }

  const changed = useSelector((state)=>{return state.cartItems});
  useEffect(()=>{
    // i create this logic for just reload component automaticlly when client add a product to cart

  }, [changed])

  return (
    <main className="products">
      {/* Sidebar Filters */}
      <aside className="filter">
        <div className="category_selection">
          <p>Category:</p>
          <div className={showAllCategories ? "category_list category_list_scroll" : "category_list"}>
            {(showAllCategories ? categories : categories.slice(0, 6)).map((cat, index) => (
              <div key={cat.id || cat.name || index} className="category_item">
                <input
                  type="checkbox"
                  id={`cat-${index}`}
                  checked={categorySelected === cat.name}
                  onChange={() => {
                    setPage(1);
                    setCategorySelected((prev) => (prev === cat.name ? "" : cat.name));
                  }}
                />
                <label htmlFor={`cat-${index}`}>{cat.name}</label>
              </div>
            ))}
          </div>

          {categories.length > 6 && (
            <button 
              className="category_more_less_btn" 
              onClick={() => setShowAllCategories((prev) => !prev)}
            >
              {showAllCategories ? "Less" : "More"}
            </button>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <section className="products_container">
        {products?.products?.length > 0 ? (
          <div className="products_grid">
            {products.products.map((product) => (
              <div onClick={()=>navigate(`${product.id}`)} key={product.id} className="product">
                <div className="image">
                  <img src={product.thumbnail} alt={product.title} />
                  <div>
                    <p className="product_title">{product.title}</p>
                    <p className="product_price">{product.price}</p>
                    {/* <button type="button" onClick={(event) => {addToCard(event, product.id)}}>Add To Cart</button> */}

                    <button 
                      className={`${checkIfInCart(product.id) ? 'success' : ''}`}
                      type="button" onClick={(event) => {addToCard(event, product.id)}}
                      disabled = {checkIfInCart(product.id)}
                    >
                      {checkIfInCart(product.id) ? (
                        <>
                          <Check size={18} /> Added to Cart!
                        </>
                      ) : (
                        <>
                          <ShoppingBag size={18} /> Add To Cart
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="not_product">No products found</div>
        )}

        {/* Pagination Bar */}
        {pagination.length > 1 && totalProducts > 0 && (
          <div className="pagination_wrapper">
            <button
              type="button"
              className="page_nav_btn"
              disabled={page === 1}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            >
              Prev
            </button>

            <div className="page_numbers">
              {pagination.map((item) => (
                <button
                  type="button"
                  key={item}
                  className={`page_btn ${page === item ? 'active' : ''}`}
                  onClick={() => setPage(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <button
              type="button"
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