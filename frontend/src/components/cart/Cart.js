// // import { Fragment } from "react/jsx-runtime";
// // import {useDispatch, useSelector}from "react-redux";
// // import {Link, useNavigate} from "react-router-dom"
// // import {increaseCartItemQty,decreaseCartItemQty, removeItemFRomCart } from "../../slices/cartSlice";


// // export default function Cart(){
// //     const {items}=useSelector(state=>state.cartState)
// //     const dispatch=useDispatch();
// //     const navigate=useNavigate();

// //     const increaseQty=(item)=>{
// //         const count=item.quantity;
// //         if(item.stock ===0 || count>= item.stock)return;
// //         dispatch(increaseCartItemQty(item.product))
// //     }
// //     const decreaseQty=(item)=>{
// //         const count=item.quantity;
// //         if(count === 1)return;
// //         dispatch(decreaseCartItemQty(item.product))
// //     }

// //     const checkoutHandler =()=>{
// //         navigate('/login?redirect=shipping')
// //     }
// //     return(
// //         <Fragment>
// //             {items.length ===0 ?
// //             <h2 className="mt-5">Your Cart is Empty</h2>:
// //             <Fragment>
// //                 <h2 className="mt-5">Your Cart: <b>{items.length} items</b></h2>
        
// //         <div className="row d-flex justify-content-between">
// //             <div className="col-12 col-lg-8">
// //                 {items.map(item =>(
// //                 <Fragment>
// //                     <hr />
// //                 <div className="cart-item">
// //                     <div className="row">
// //                         <div className="col-4 col-lg-3">
// //                             <img src={item.image} alt={item.name} height="90" width="115"/>
// //                         </div>

// //                         <div className="col-5 col-lg-3">
// //                             <Link to={`/product/${item.product}`} href="#">{item.name}</Link>
// //                         </div>


// //                         <div className="col-4 col-lg-2 mt-4 mt-lg-0">
// //                             <p id="card_item_price">${item.price}</p>
// //                         </div>

// //                         <div className="col-4 col-lg-3 mt-4 mt-lg-0">
// //                             <div className="stockCounter d-inline">
// //                                 <span className="btn btn-danger minus" onClick={()=>decreaseQty(item)}>-</span>
// //                                 <input type="number" className="form-control count d-inline" value={item.quantity} readOnly />

// // 								<span className="btn btn-primary plus" onClick={()=>increaseQty(item)}>+</span>
// //                             </div>
// //                         </div>

// //                         <div className="col-4 col-lg-1 mt-4 mt-lg-0">
// //                             <i id="delete_cart_item" onClick={()=>dispatch(removeItemFRomCart(item.product))} className="fa fa-trash btn btn-danger"></i>
// //                         </div>

// //                     </div>
// //                 </div>

// //                 </Fragment>
// //                 )
// //             )
// //             }
// //             <hr/>
// //             </div>
                

// //             <div className="col-12 col-lg-3 my-4">
// //                 <div id="order_summary">
// //                     <h4>Order Summary</h4>
// //                     <hr />
// //                     <p>Subtotal:  <span className="order-summary-values">{items.reduce((acc,item)=>(acc+item.quantity),0)} (Units)</span></p>
// //                     <p>Est. total: <span className="order-summary-values">${items.reduce((acc,item)=>(acc+item.quantity*item.price),0)}</span></p>
    
// //                     <hr />
// //                     <button id="checkout_btn" onClick={checkoutHandler} className="btn btn-primary btn-block">Check out</button>
// //                 </div>
// //             </div>
// //         </div>
// //             </Fragment>
// //             }
        
// //         </Fragment>
// //     )
// // }

// import { Fragment } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   increaseCartItemQty,
//   decreaseCartItemQty,
//   removeItemFRomCart,
// } from "../../slices/cartSlice";

// export default function Cart() {
//   const { items } = useSelector((state) => state.cartState);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const increaseQty = (item) => {
//     const count = item.quantity;
//     if (item.stock === 0 || count >= item.stock) return;
//     dispatch(increaseCartItemQty(item.product));
//   };

//   const decreaseQty = (item) => {
//     const count = item.quantity;
//     if (count === 1) return;
//     dispatch(decreaseCartItemQty(item.product));
//   };

//   const checkoutHandler = () => {
//     navigate("/login?redirect=shipping");
//   };

//   return (
//     <Fragment>
//       {items.length === 0 ? (
//         <h2 className="mt-5">Your Cart is Empty</h2>
//       ) : (
//         <Fragment>
//           <h2 className="mt-5">
//             Your Cart: <b>{items.length} items</b>
//           </h2>

//           <div className="row d-flex justify-content-between">
//             <div className="col-12 col-lg-8">
//               {items.map((item) => (
//                 <Fragment key={item.product}>
//                   <hr />

//                   <div className="cart-item">
//                     <div className="row">
//                       {/* IMAGE FIXED HERE */}
//                       <div className="col-4 col-lg-3">
//                         <img
//                           src={item.image || "/placeholder.png"}
//                           alt={item.name}
//                           height="90"
//                           width="115"                           onError={(e) => { e.target.src = "/placeholder.png"; }}//                         />
//                       </div>

//                       <div className="col-5 col-lg-3">
//                         <Link to={`/product/${item.product}`}>
//                           {item.name}
//                         </Link>
//                       </div>

//                       <div className="col-4 col-lg-2 mt-4 mt-lg-0">
//                         <p id="card_item_price">${item.price}</p>
//                       </div>

//                       <div className="col-4 col-lg-3 mt-4 mt-lg-0">
//                         <div className="stockCounter d-inline">
//                           <span
//                             className="btn btn-danger minus"
//                             onClick={() => decreaseQty(item)}
//                           >
//                             -
//                           </span>

//                           <input
//                             type="number"
//                             className="form-control count d-inline"
//                             value={item.quantity}
//                             readOnly
//                           />

//                           <span
//                             className="btn btn-primary plus"
//                             onClick={() => increaseQty(item)}
//                           >
//                             +
//                           </span>
//                         </div>
//                       </div>

//                       <div className="col-4 col-lg-1 mt-4 mt-lg-0">
//                         <i
//                           id="delete_cart_item"
//                           onClick={() =>
//                             dispatch(removeItemFRomCart(item.product))
//                           }
//                           className="fa fa-trash btn btn-danger"
//                         ></i>
//                       </div>
//                     </div>
//                   </div>
//                 </Fragment>
//               ))}

//               <hr />
//             </div>

//             {/* ORDER SUMMARY */}
//             <div className="col-12 col-lg-3 my-4">
//               <div id="order_summary">
//                 <h4>Order Summary</h4>
//                 <hr />

//                 <p>
//                   Subtotal:{" "}
//                   <span className="order-summary-values">
//                     {items.reduce((acc, item) => acc + item.quantity, 0)} (
//                     Units)
//                   </span>
//                 </p>

//                 <p>
//                   Est. total:{" "}
//                   <span className="order-summary-values">
//                     $
//                     {items.reduce(
//                       (acc, item) => acc + item.quantity * item.price,
//                       0
//                     )}
//                   </span>
//                 </p>

//                 <hr />

//                 <button
//                   id="checkout_btn"
//                   onClick={checkoutHandler}
//                   className="btn btn-primary btn-block"
//                 >
//                   Check out
//                 </button>
//               </div>
//             </div>
//           </div>
//         </Fragment>
//       )}
//     </Fragment>
//   );
// }



import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  increaseCartItemQty,
  decreaseCartItemQty,
  removeItemFRomCart,
} from "../../slices/cartSlice";

export default function Cart() {
  const { items } = useSelector((state) => state.cartState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const increaseQty = (item) => {
    if (!item.stock || item.quantity >= item.stock) return;
    dispatch(increaseCartItemQty(item.product));
  };

  const decreaseQty = (item) => {
    if (item.quantity <= 1) return;
    dispatch(decreaseCartItemQty(item.product));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  return (
    <Fragment>
      {items.length === 0 ? (
        <h2 className="mt-5 text-center">Your Cart is Empty</h2>
      ) : (
        <Fragment>
          <h2 className="mt-5">
            Your Cart: <b>{items.length} items</b>
          </h2>

          <div className="row d-flex justify-content-between">
            {/* CART ITEMS */}
            <div className="col-12 col-lg-8">
              {items.map((item) => (
                <Fragment key={item.product}>
                  <hr />

                  <div className="cart-item">
                    <div className="row align-items-center">

                      {/* IMAGE */}
                      <div className="col-4 col-lg-3">
                        <img
                          src={item.image || "/images/products/1.jpg"}
                          alt={item.name}
                          height="90"
                          width="115"
                          onError={(e) =>
                            (e.target.src = "/images/products/1.jpg")
                          }
                        />
                      </div>

                      {/* NAME */}
                      <div className="col-5 col-lg-3">
                        <Link to={`/product/${item.product}`}>
                          {item.name}
                        </Link>
                      </div>

                      {/* PRICE */}
                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p>${item.price}</p>
                      </div>

                      {/* QUANTITY */}
                      <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <div className="stockCounter d-inline">
                          <button
                            className="btn btn-danger"
                            onClick={() => decreaseQty(item)}
                          >
                            -
                          </button>

                          <input
                            type="number"
                            className="form-control d-inline text-center"
                            value={item.quantity}
                            readOnly
                          />

                          <button
                            className="btn btn-primary"
                            onClick={() => increaseQty(item)}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* DELETE */}
                      <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                        <button
                          className="btn btn-danger"
                          onClick={() =>
                            dispatch(removeItemFRomCart(item.product))
                          }
                        >
                          <i className="fa fa-trash"></i>
                        </button>
                      </div>

                    </div>
                  </div>
                </Fragment>
              ))}
            </div>

            {/* SUMMARY */}
            <div className="col-12 col-lg-3 my-4">
              <div id="order_summary">
                <h4>Order Summary</h4>
                <hr />

                <p>
                  Subtotal:{" "}
                  <span>
                    {items.reduce((acc, item) => acc + item.quantity, 0)} Units
                  </span>
                </p>

                <p>
                  Est. total:{" "}
                  <span>
                    $
                    {items.reduce(
                      (acc, item) => acc + item.quantity * item.price,
                      0
                    )}
                  </span>
                </p>

                <hr />

                <button
                  id="checkout_btn"
                  onClick={checkoutHandler}
                  className="btn btn-primary w-100"
                >
                  Check out
                </button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}