import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import "./relatedProducts.css";
import { useEffect, useState } from "react";
import { getProductsApi } from "../../services/products";

export default function RelatedProducts({category}){

    const [products, setProducts] = useState([]);
    useState(()=>{
        const fetchProducts = async () => {
            try{
                const response = await getProductsApi(100, 0, category);
                setProducts(response.products);
            }catch(error){
                console.log(error);
            }
        }
        fetchProducts();

        console.log('category', category);
    }, [category])


    return <section className="related_products_section">
        <h2 className="section_title">You Might Also Like</h2>
        <Swiper className="products"
            slidesPerView={3}
            spaceBetween={10}
        >
            {products.map((relProduct) => {return <SwiperSlide className="product_card" key={relProduct.id}>
                <img src={relProduct.thumbnail} alt={relProduct.title} />
                <span>{relProduct.category}</span>
                <h3>{relProduct.title}</h3>
                <p>${relProduct.price}</p>
                <button>Add to Cart</button>
            </SwiperSlide>})}

        </Swiper>
      </section>
}