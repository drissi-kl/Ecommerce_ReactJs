import axios from "axios";


const baseApi = axios.create({
    baseURL: 'https://dummyjson.com',
    
})

baseApi.interceptors.request.use((req)=>{
    return req;
})

baseApi.interceptors.response.use(
    (res)=> {
        return res;
    },
    (error)=>{
        throw error;
    }
)


export default baseApi;

