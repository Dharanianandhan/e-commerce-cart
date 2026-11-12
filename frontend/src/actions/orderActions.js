import { createOrderFail, createOrderRequest, createOrderSuccess, orderDetailFail, orderDetailRequest, orderDetailSuccess, userOrdersFail, userOrdersRequest, userOrdersSuccess } from "../slices/orderSlice";
import axios from 'axios';

const getErrorMessage = (error) => {
    return error?.response?.data?.message || error?.message || 'Something went wrong';
};

export const createOrder=order=>async(dispatch)=>{
    try{
        dispatch(createOrderRequest())
       const {data}= await axios.post('/api/v1/order/new',order)
       dispatch(createOrderSuccess(data))
    }catch(error){
        dispatch(createOrderFail(getErrorMessage(error)))
    }
}




export const userOrders = () => async (dispatch) => {

    try {

        dispatch(userOrdersRequest());

        const { data } = await axios.get('/api/v1/myorders');

        dispatch(userOrdersSuccess(data));

    } catch (error) {

        dispatch(
            userOrdersFail(getErrorMessage(error))
        );

    }

};

export const orderDetail = id => async (dispatch) => {

    try {

        dispatch(orderDetailRequest());

        const { data } = await axios.get(`/api/v1/order/${id}`);

        dispatch(orderDetailSuccess(data));

    } catch (error) {

        dispatch(
            orderDetailFail(getErrorMessage(error))
        );

    }

};


