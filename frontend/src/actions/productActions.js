import axios from 'axios';
import { adminProductsFail, adminProductsRequest, adminProductsSuccess, productsFail, productsRequest, productsSuccess } from '../slices/productsSlice';
import { createReviewFail, createReviewRequest, createReviewSuccess, deleteProductFail, deleteProductRequest, deleteProductSuccess, newProductFail, newProductRequest, newProductSuccess, productFail, productRequest, productSuccess, updateProductFail, updateProductRequest, updateProductSuccess } from '../slices/productSlice';
import { updatePasswordSuccess } from '../slices/authSlice';

const getErrorMessage = (error) => {
  return error?.response?.data?.message || error?.message || 'Something went wrong';
};

export const getProducts=(keyword,price,category,ratings,currentPage)=>async(dispatch)=>{

    try{
        dispatch(productsRequest())
        let link=`/api/v1/products?page=${currentPage}`;
        if(keyword){
             link +=`&keyword=${keyword}`
        }
        if(price){  
                link+=`&price[gte]=${price[0]}&price[lte]=${price[1]}`

        }
        if(category){
            link+=`&category=${category}`
        }
        if(ratings){
            link+=`&ratings=${ratings}`
        }
        const {data}=await axios.get(link);
        dispatch (productsSuccess(data))
    }catch(error){
        //handle error
    dispatch(productsFail(getErrorMessage(error)))
    }
   
}





export const getProduct=id =>async(dispatch)=>{

    try{
        dispatch(productRequest())
        const {data}=await axios.get(`/api/v1/product/${id}`);
        dispatch (productSuccess(data))
    }catch(error){
        //handle error
        dispatch(productFail(getErrorMessage(error)))
    }
   
}



export const createReview = (reviewData) => async (dispatch) => {
    try {
        dispatch(createReviewRequest());

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.put(
            "/api/v1/review",
            reviewData,
            config
        );

        dispatch(createReviewSuccess(data));
    } catch (error) {
        dispatch(createReviewFail(getErrorMessage(error)));
    }
};

export const getAdminProducts = () => async (dispatch) => {
    try {
        dispatch(adminProductsRequest());

        const { data } = await axios.get(
            '/api/v1/admin/products'
        );

        dispatch(adminProductsSuccess(data));

    } catch (error) {
        dispatch(
            adminProductsFail(
                error.response?.data?.message
            )
        );
    }
};


export const createNewProduct=productData=>async (dispatch)=>{
    try{
        dispatch(newProductRequest())
        
        // ✅ FIXED: Add proper headers for multipart form data
        // Let browser set multipart boundary and include cookies for auth
        const config = {
            withCredentials: true
        };
        
        const {data}=await axios.post('http://localhost:8000/api/v1/admin/product/new',productData,config);
        dispatch (newProductSuccess(data))
    }catch(error){
        //handle error
    dispatch(newProductFail(getErrorMessage(error)))
    }
   
}

export const deleteProduct=id=>async (dispatch)=>{
    try{
        dispatch(deleteProductRequest())
        await axios.delete(`/api/v1/admin/product/${id}`);
        dispatch (deleteProductSuccess())
    }catch(error){
        //handle error
    dispatch(deleteProductFail(getErrorMessage(error)))
    }
   
}

export const UpdateProduct = (id, productData) => async (dispatch) => {
    try {

        dispatch(updateProductRequest());

        // Let browser set multipart boundary and include auth cookies
        const config = {
            withCredentials: true
        };

        const { data } = await axios.put(
            `http://localhost:8000/api/v1/admin/product/${id}`,
            productData,
            config
        );

        dispatch(updateProductSuccess(data));

    } catch (error) {
        dispatch(
            updateProductFail(getErrorMessage(error))
        );
    }
};