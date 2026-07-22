import axios from "axios";
import baseApi from "./baseApi";


const getProductsApi = async(limit=20, skip=0)=>{
    try{
        const response = await baseApi.get(`/products?limit=${limit}&skip=${skip}`);
        return response.data;
    }catch(error){
        if(axios.isAxiosError(error)){
            throw error;
        }else{
            throw new Error('exists error in getProductsApi function')
        }
    }
}


export {getProductsApi, }





