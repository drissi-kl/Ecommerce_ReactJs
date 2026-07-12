
import baseApi from "./baseApi"

const getCategories = async () => {
    try{
        const response = await baseApi.get('/products/categories');
        return response;
    } catch (error) {
        console.log('error', error);
    }
}


export {getCategories, };







