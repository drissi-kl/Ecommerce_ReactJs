import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getProductsApi } from '../services/products';

import "./products.css";

export default function Products() {

  const {category} = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState(null);
  useEffect(()=>{
    const fetchCategory = async () => {
      const response = await getProductsApi();
      if(response){
        setProducts(response);
        
      }
    }
    fetchCategory();
  },[]);

  console.log('products', products);
  

  return <main className='products'>
      <div className="filter">
        <div className='category_selection'>
          <p>Category: </p>
          <div>
            <input type="checkbox" name="" id="laptop" />
            <label htmlFor="laptop">Laptops</label>
          </div>

          <div>
            <input type="checkbox" name="" id="phone" />
            <label htmlFor="phone">phones</label>
          </div>
        </div>

        <div className="price_selection">
          <p>Price:</p>
          <div>
            <input className='min_price' type="text" name="" id="" placeholder='min' />
            <input className='max_price' type="text" placeholder='max' />
          </div>
        </div>
        
        <button className='apply_selection'>Apply</button>

      </div>

      <div className='products_list'>
          {
            products?.products?.map((product)=>{ return <div className="product">
                <div className="image">
                  <img src={product.thumbnail} alt="" />
                  <div>
                    <p className='product_title'> {product.title} </p>
                    <p className='product_price'> {product.price} </p>
                    <button>Add To Cart</button>
                  </div>
                </div>
            </div>
              
            })
          }

      </div>

  </main>

}
