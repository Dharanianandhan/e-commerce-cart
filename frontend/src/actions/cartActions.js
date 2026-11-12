// import { addCartItemRequest, addCartItemSuccess } from "../slices/cartSlice"
// import axios from "axios"

// export const addCartItem=(id,quantity)=>async(dispatch)=>{
//     try{
//         dispatch(addCartItemRequest())
//         const {data}=await axios.get(`/api/v1/product/${id}`)
//         dispatch(addCartItemSuccess({
//             product:data.product._id,
//             name:data.product.name,
//             price:data.product.price,
//             image:data.product.images[0].image,
//             stock:data.product.stock,
//             quantity
//         }))
//     }catch(error){

//     }
// }


import { addCartItemRequest, addCartItemSuccess } from "../slices/cartSlice";
import axios from "axios";

export const addCartItem = (id, quantity) => async (dispatch) => {
    try {
        dispatch(addCartItemRequest());

        const { data } = await axios.get(`/api/v1/product/${id}`);

        const product = data.product;

        const rawImage = product.images?.[0]?.image || product.images?.[0];
        const imageUrl = rawImage
            ? rawImage.startsWith("http")
                ? rawImage
                : rawImage.startsWith("/uploads")
                    ? `http://localhost:8000${rawImage}`
                    : rawImage
            : "/images/products/1.jpg";

        dispatch(
            addCartItemSuccess({
                product: product._id,
                name: product.name,
                price: product.price,
                image: imageUrl,
                stock: product.stock,
                quantity
            })
        );

    } catch (error) {
        console.log("Add to cart error:", error);
    }
};