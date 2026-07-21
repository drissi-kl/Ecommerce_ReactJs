import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getProductsApi } from '../services/products';

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

  

  return <main className='products'>
    <section className='products_section'>
      <div className="filter">

      </div>

      <div className='products_list'>
          {
            products.map(()=>{
              
            })
          }

      </div>
    </section>

  </main>

}
