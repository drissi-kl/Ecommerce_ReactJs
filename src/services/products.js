import axios from "axios";
import baseApi from "./baseApi";


const getProductsApi = async()=>{
    try{
        const response = await baseApi.get('/products?limit=10');
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





