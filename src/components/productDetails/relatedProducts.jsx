import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import "./relatedProducts.css";

import { getProductsApi } from "../../services/products";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import checkIfInCart from "../../utilities/checkIfInCart";
import { Check, ShoppingBag } from "lucide-react";

export default function RelatedProducts({ category }) {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getProductsApi(10, 0, category);
                setProducts(response.products);
            } catch (error) {
                console.log(error);
            }
        };

        fetchProducts();
    }, [category]);

    const addToCart = (event, id) => {
        event.stopPropagation();
        const product = products.find((product)=>{return product.id == id});
        if(product){

            const data = {
                id: product.id,
                title: product.title,
                price: product.price,
                quantity: 1,
                thumbnail: product.thumbnail,
                stock: product.stock
            }
            const cartItems = localStorage.getItem("cartItems");
            if(cartItems){
                const tmp = JSON.parse(cartItems);
                tmp.push(data);
                localStorage.setItem("cartItems", JSON.stringify(tmp));
            }else{
                localStorage.setItem("cartItems", JSON.stringify([data]));
            }
            dispatch({type: "addProduct", payload: data});
            toast.success(`Add ${data.title} success`);

        }
    }


  return (
    <section className="related_products_section">
      <h2 className="section_title">You Might Also Like</h2>
      
      <Swiper
        className="products_swiper"
        spaceBetween={20}
        slidesPerView={3}
        modules={[Navigation, Pagination]}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        
        loop = {true}
        
      >
        {products.map((relProduct) => (
          <SwiperSlide key={relProduct.id} className="product_slide" >
            <div className="product_card" onClick={()=>{navigate(`/products/${relProduct.id}`)}}>
                <img src={relProduct.thumbnail} alt={relProduct.title} />
                <span>{relProduct.category}</span>
                <h3>{relProduct.title}</h3>
                <p>${relProduct.price}</p>
                <button className={checkIfInCart(relProduct.id)?"success":""} onClick={(event)=>{addToCart(event, relProduct.id)}} disabled={checkIfInCart(relProduct.id)}>
                    {checkIfInCart(relProduct.id) ? (
                        <><Check size={18} /> Added to Cart!</>
                        ) : (
                        <><ShoppingBag size={18} /> Add To Cart</>
                    )}
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}