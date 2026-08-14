
import axios from "axios";
import baseApi from "./baseApi"

const getCategories = async () => {
    try{
        const response = await baseApi.get('/products/categories');
        return response.data;
    } catch (error) {
        if(axios.isAxiosError(error)){
            throw error;
        }
        throw new Error("exits error in getCategoriesApi functions");
    }
}


export {getCategories, };







