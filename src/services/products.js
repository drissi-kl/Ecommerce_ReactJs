import axios from "axios";
import baseApi from "./baseApi";


const getProductsApi = async(limit, skip, categorySelected)=>{
    try{
        const response = await baseApi.get(`/products${categorySelected ? `/category/${categorySelected}` : ''}?limit=${limit}&skip=${skip}`);
        return response.data;
    }catch(error){
        if(axios.isAxiosError(error)){
            throw error;
        }else{
            throw new Error('exists error in getProductsApi function')
        }
    }
}


const getProductApi = async(id)=>{
    try{
        const response = await baseApi.get(`/products/${id}`);
        console.log(`product ${id}`, response.data);
        return response.data;
    }catch(error){
        if(axios.isAxiosError(error)){
            throw error;
        }else{
            throw new Error('exists error in getProductApi function')
        }
    }
}


const searchProductApi = async(productData)=>{
    try{
        const response = await baseApi.get(`/products/search?q=${productData}`);
        // console.log('response', response.data);
        return response.data;
    }catch(error){
        if(axios.isAxiosError(error)){
            throw error;
        }else{
            throw new Error('exists error in searchProductApi function')
        }
    }
}

export {getProductsApi, getProductApi, searchProductApi}





