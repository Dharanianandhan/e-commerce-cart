import { createSlice } from "@reduxjs/toolkit";

const getCartFromStorage = () => {
    try {
        return localStorage.getItem("cartItems")
            ? JSON.parse(localStorage.getItem("cartItems"))
            : [];
    } catch {
        return [];
    }
};

const getShippingFromStorage = () => {
    try {
        return localStorage.getItem("shippingInfo")
            ? JSON.parse(localStorage.getItem("shippingInfo"))
            : {};
    } catch {
        return {};
    }
};

const initialState = {
    items: getCartFromStorage(),
    loading: false,
    shippingInfo: getShippingFromStorage()
};

const cartSlice = createSlice({
    name: "cart",
    initialState,

    reducers: {
        addCartItemRequest(state) {
            state.loading = true;
        },

        addCartItemSuccess(state, action) {
            const item = action.payload;

            const existing = state.items.find(
                i => i.product === item.product
            );

            if (!existing) {
                // ✅ FIXED: Handle different image formats
                let imageUrl = "/images/products/1.jpg";
                
                if (item?.image) {
                    imageUrl = item.image;
                } else if (item?.images) {
                    if (Array.isArray(item.images)) {
                        if (typeof item.images[0] === 'string') {
                            imageUrl = item.images[0];
                        } else if (item.images[0]?.image) {
                            imageUrl = item.images[0].image;
                        }
                    }
                }
                
                if (imageUrl.startsWith("/uploads")) {
                    imageUrl = `http://localhost:8000${imageUrl}`;
                }
                
                state.items.push({
                    product: item.product,
                    name: item.name,
                    price: item.price,
                    stock: item.stock,
                    quantity: item.quantity || 1,
                    image: imageUrl
                });
            }

            state.loading = false;

            localStorage.setItem(
                "cartItems",
                JSON.stringify(state.items)
            );
        },

        increaseCartItemQty(state, action) {
            const item = state.items.find(
                i => i.product === action.payload
            );

            if (item && item.quantity < item.stock) {
                item.quantity += 1;
            }

            localStorage.setItem(
                "cartItems",
                JSON.stringify(state.items)
            );
        },

        decreaseCartItemQty(state, action) {
            const item = state.items.find(
                i => i.product === action.payload
            );

            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }

            localStorage.setItem(
                "cartItems",
                JSON.stringify(state.items)
            );
        },

        removeItemFRomCart(state, action) {
            state.items = state.items.filter(
                item => item.product !== action.payload
            );

            localStorage.setItem(
                "cartItems",
                JSON.stringify(state.items)
            );
        },

        saveShippingInfo(state, action) {
            state.shippingInfo = action.payload;

            localStorage.setItem(
                "shippingInfo",
                JSON.stringify(action.payload)
            );
        },

        orderCompleted(state) {
            state.items = [];
            state.shippingInfo = {};
            state.loading = false;

            localStorage.removeItem("cartItems");
            localStorage.removeItem("shippingInfo");
            sessionStorage.removeItem("orderInfo");
        }
    }
});

export const {
    addCartItemRequest,
    addCartItemSuccess,
    increaseCartItemQty,
    decreaseCartItemQty,
    removeItemFRomCart,
    saveShippingInfo,
    orderCompleted
} = cartSlice.actions;

export default cartSlice.reducer;