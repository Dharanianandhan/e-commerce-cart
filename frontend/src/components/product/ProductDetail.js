// import { Fragment, useEffect, useState } from "react";
// import { createReview, getProduct } from "../../actions/productActions";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import Loader from "../layouts/Loader";
// import Carousel from "react-bootstrap/Carousel";
// import MetaData from "../layouts/MetaData";
// import { addCartItem } from "../../actions/cartActions";
// import { Modal } from "react-bootstrap";
// import { toast } from "react-toastify";

// import {
//   clearReviewSubmitted,
//   clearError,
//   clearProduct,
// } from "../../slices/productSlice";

// import ProductReview from "./ProductReview";

// export default function ProductDetail() {
//   const {
//     loading,
//     product = {},
//     isReviewSubmitted,
//     error,
//   } = useSelector((state) => state.productState);

//   const { user } = useSelector((state) => state.authState);

//   const dispatch = useDispatch();
//   const { id } = useParams();

//   const [quantity, setQuantity] = useState(1);
//   const [show, setShow] = useState(false);
//   const [rating, setRating] = useState(1);
//   const [comment, setComment] = useState("");

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   // ✅ SAFE IMAGE ARRAY (prevents crash)
//   const images = product.images || [];

//   // ======================
//   // QUANTITY HANDLERS
//   // ======================
//   const increaseQty = () => {
//     if (!product.stock || quantity >= product.stock) return;
//     setQuantity((prev) => prev + 1);
//   };

//   const decreaseQty = () => {
//     if (quantity <= 1) return;
//     setQuantity((prev) => prev - 1);
//   };

//   // ======================
//   // REVIEW SUBMIT
//   // ======================
//   const reviewHandler = () => {
//     dispatch(
//       createReview({
//         rating,
//         comment,
//         productId: id,
//       })
//     );
//   };

//   // ======================
//   // USE EFFECT
//   // ======================
//   useEffect(() => {
//     if (isReviewSubmitted) {
//       handleClose();

//       toast.success("Review Submitted Successfully", {
//         position: "bottom-center",
//         onOpen: () => dispatch(clearReviewSubmitted()),
//       });
//     }

//     if (error) {
//       toast.error(error, {
//         position: "bottom-center",
//         onOpen: () => dispatch(clearError()),
//       });
//     }

//     if (!product._id || isReviewSubmitted) {
//       dispatch(getProduct(id));
//     }

//     return () => {
//       dispatch(clearProduct());
//     };
//   }, [dispatch, id, isReviewSubmitted, error]);

//   return (
//     <Fragment>
//       {loading ? (
//         <Loader />
//       ) : (
//         <Fragment>
//           <MetaData title={product.name} />

//           <div className="row f-flex justify-content-around">

//             {/* ================= IMAGE SECTION ================= */}
//             <div className="col-12 col-lg-5 img-fluid" id="product_image">

//               <Carousel pause="hover">

//                 {images.length > 0 ? (
//                   images.map((image, index) => (
//                     <Carousel.Item key={index}>
//                       <img
//                         className="d-block w-100"
//                         src={image}
//                         alt={product.name}
//                         height="500"
//                         width="500"
//                         onError={(e) => {
//                           e.target.src = "/placeholder.png";
//                         }}
//                       />
//                     </Carousel.Item>
//                   ))
//                 ) : (
//                   <Carousel.Item>
//                     <img
//                       className="d-block w-100"
//                       src="/placeholder.png"
//                       alt="no image"
//                       height="500"
//                       width="500"
//                     />
//                   </Carousel.Item>
//                 )}

//               </Carousel>
//             </div>

//             {/* ================= PRODUCT INFO ================= */}
//             <div className="col-12 col-lg-5 mt-5">

//               <h3>{product.name}</h3>
//               <p>Product # {product._id}</p>

//               <hr />

//               <div className="rating-outer">
//                 <div
//                   className="rating-inner"
//                   style={{
//                     width: `${(product.ratings / 5) * 100}%`,
//                   }}
//                 ></div>
//               </div>

//               <span>
//                 ({product.numOfReviews || 0} Reviews)
//               </span>

//               <hr />

//               <p>${product.price}</p>

//               {/* ================= QUANTITY ================= */}
//               <div className="stockCounter d-inline">

//                 <span className="btn btn-danger" onClick={decreaseQty}>
//                   -
//                 </span>

//                 <input
//                   type="number"
//                   className="form-control count d-inline"
//                   value={quantity}
//                   readOnly
//                 />

//                 <span className="btn btn-primary" onClick={increaseQty}>
//                   +
//                 </span>
//               </div>

//               <button
//                 disabled={product.stock === 0}
//                 onClick={() =>
//                   dispatch(addCartItem(product._id, quantity))
//                 }
//                 className="btn btn-primary ml-4"
//               >
//                 Add to Cart
//               </button>

//               <hr />

//               <p>
//                 Status:{" "}
//                 <span
//                   className={
//                     product.stock > 0 ? "greenColor" : "redColor"
//                   }
//                 >
//                   {product.stock > 0 ? "In Stock" : "Out Of Stock"}
//                 </span>
//               </p>

//               <hr />

//               <h4>Description</h4>
//               <p>{product.description}</p>

//               <hr />

//               <p>
//                 Sold by: <strong>{product.seller}</strong>
//               </p>

//               {/* ================= REVIEW ================= */}
//               {user ? (
//                 <button
//                   onClick={handleShow}
//                   className="btn btn-primary mt-4"
//                 >
//                   Submit Your Review
//                 </button>
//               ) : (
//                 <div className="alert alert-danger mt-4">
//                   Login to Post Review
//                 </div>
//               )}

//               {/* ================= MODAL ================= */}
//               <Modal show={show} onHide={handleClose}>
//                 <Modal.Header closeButton>
//                   <Modal.Title>Submit Review</Modal.Title>
//                 </Modal.Header>

//                 <Modal.Body>
//                   <ul className="stars">
//                     {[1, 2, 3, 4, 5].map((star) => (
//                       <li
//                         key={star}
//                         onClick={() => setRating(star)}
//                         className={`star ${
//                           star <= rating ? "orange" : ""
//                         }`}
//                       >
//                         <i className="fa fa-star"></i>
//                       </li>
//                     ))}
//                   </ul>

//                   <textarea
//                     className="form-control mt-3"
//                     onChange={(e) => setComment(e.target.value)}
//                   ></textarea>

//                   <button
//                     className="btn btn-primary mt-3 float-right"
//                     onClick={reviewHandler}
//                   >
//                     Submit
//                   </button>
//                 </Modal.Body>
//               </Modal>

//             </div>
//           </div>

//           {/* ================= REVIEWS ================= */}
//           {product.reviews?.length > 0 && (
//             <ProductReview reviews={product.reviews} />
//           )}
//         </Fragment>
//       )}
//     </Fragment>
//   );
// }

import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";

import Loader from "../layouts/Loader";
import MetaData from "../layouts/MetaData";
import ProductReview from "./ProductReview";

import { getProduct, createReview } from "../../actions/productActions";
import { addCartItem } from "../../actions/cartActions";

import {
  clearReviewSubmitted,
  clearError,
  clearProduct,
} from "../../slices/productSlice";

export default function ProductDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const {
    loading,
    product = {},
    isReviewSubmitted,
    error,
  } = useSelector((state) => state.productState);

  const { user } = useSelector((state) => state.authState);

  const [quantity, setQuantity] = useState(1);
  const [show, setShow] = useState(false);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");

  const images = product.images || [];

  const getImageUrl = (img) => {
    if (!img) return "/images/products/1.jpg";
    const url = typeof img === "string" ? img : img?.image || img?.url;
    if (!url) return "/images/products/1.jpg";
    if (url.startsWith("http")) return url;
    if (url.startsWith("/uploads")) return `http://localhost:8000${url}`;
    return url;
  };

  const increaseQty = () => {
    if (quantity >= product.stock) return;
    setQuantity((prev) => prev + 1);
  };

  const decreaseQty = () => {
    if (quantity <= 1) return;
    setQuantity((prev) => prev - 1);
  };

  const addToCartHandler = () => {
    dispatch(addCartItem(product._id, quantity));

    toast.success("Item Added To Cart", {
      position: "bottom-center",
    });
  };

  const reviewHandler = () => {
    dispatch(
      createReview({
        rating,
        comment,
        productId: id,
      })
    );
  };

  useEffect(() => {
    if (isReviewSubmitted) {
      handleClose();

      toast.success("Review Submitted Successfully", {
        position: "bottom-center",
      });

      dispatch(clearReviewSubmitted());
    }

    if (error) {
      toast.error(error, {
        position: "bottom-center",
      });

      dispatch(clearError());
    }

    dispatch(getProduct(id));

    return () => {
      dispatch(clearProduct());
    };
  }, [dispatch, id, isReviewSubmitted, error]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={product.name} />

          <div className="container mt-5">
            <div className="row justify-content-around">

              {/* Product Images */}
              <div className="col-12 col-lg-5" id="product_image">
                <Carousel pause="hover">
                  {images.length > 0 ? (
                    images.map((imageObj, index) => (
                      <Carousel.Item key={index}>
                        <img
                          className="d-block w-100"
                          src={getImageUrl(imageObj)}
                          alt={product.name}
                          height="500"
                          onError={(e) => {
                            e.target.src = "/images/products/1.jpg";
                          }}
                        />
                      </Carousel.Item>
                    ))
                  ) : (
                    <Carousel.Item>
                      <img
                        className="d-block w-100"
                        src="/images/products/1.jpg"
                        alt="No Product"
                        height="500"
                      />
                    </Carousel.Item>
                  )}
                </Carousel>
              </div>

              {/* Product Details */}
              <div className="col-12 col-lg-5 mt-5">

                <h3>{product.name}</h3>
                <p>Product ID: {product._id}</p>

                <hr />

                <div className="rating-outer">
                  <div
                    className="rating-inner"
                    style={{
                      width: `${
                        ((product.ratings || 0) / 5) * 100
                      }%`,
                    }}
                  />
                </div>

                <span>
                  ({product.numOfReviews || 0} Reviews)
                </span>

                <hr />

                <h3>${product.price}</h3>

                {/* Quantity */}
                <div className="stockCounter d-inline-block">

                  <button
                    className="btn btn-danger"
                    onClick={decreaseQty}
                  >
                    -
                  </button>

                  <input
                    type="number"
                    className="form-control count d-inline mx-2"
                    value={quantity}
                    readOnly
                    style={{ width: "60px" }}
                  />

                  <button
                    className="btn btn-primary"
                    onClick={increaseQty}
                  >
                    +
                  </button>

                </div>

                <button
                  disabled={product.stock === 0}
                  onClick={addToCartHandler}
                  className="btn btn-addtocart ml-3"
                >
                  Add To Cart
                </button>

                <hr />

                <p>
                  Status :
                  <span
                    className={
                      product.stock > 0
                        ? "greenColor ml-2"
                        : "redColor ml-2"
                    }
                  >
                    {product.stock > 0
                      ? "In Stock"
                      : "Out Of Stock"}
                  </span>
                </p>

                <hr />

                <h4>Description</h4>
                <p>{product.description}</p>

                <hr />

                <p>
                  Sold By :
                  <strong> {product.seller}</strong>
                </p>

                {user ? (
                  <button
                    onClick={handleShow}
                    className="btn btn-review mt-3"
                  >
                    Submit Your Review
                  </button>
                ) : (
                  <div className="alert alert-danger mt-3">
                    Login To Post Review
                  </div>
                )}

                {/* Review Modal */}
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>
                      Submit Review
                    </Modal.Title>
                  </Modal.Header>

                  <Modal.Body>

                    <ul className="stars list-unstyled d-flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <li
                          key={star}
                          className={`star ${
                            star <= rating ? "orange" : ""
                          }`}
                          onClick={() => setRating(star)}
                          aria-label={`${star} star`}
                        >
                          <span className="star-icon" aria-hidden="true">★</span>
                        </li>
                      ))}
                    </ul>

                    <textarea
                      className="form-control mt-3"
                      rows="4"
                      value={comment}
                      onChange={(e) =>
                        setComment(e.target.value)
                      }
                    />

                    <button
                      className="btn btn-addtocart mt-3 float-end"
                      onClick={reviewHandler}
                    >
                      Submit
                    </button>

                  </Modal.Body>
                </Modal>

              </div>
            </div>

            {product.reviews &&
              product.reviews.length > 0 && (
                <ProductReview
                  reviews={product.reviews}
                />
              )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}