
// import React ,{ Fragment,useEffect, useState } from "react";
// import MetaData from "./layouts/MetaData";
// import { getProducts } from "../actions/productActions";
// import { useDispatch, useSelector} from "react-redux";
// import Loader from "./layouts/Loader";
// import Product from "./product/Product";
// import {toast}from 'react-toastify';
// import Pagination from 'react-js-pagination';

// export default function Home() {
//   const dispatch=useDispatch();
//   const {products,loading,error,productsCount,resPerPage}=useSelector((state)=> state.productsState)
//   const [currentPage,setCurrentPage]=useState(1);
//   console.log(currentPage)

//   const setCurrentPageNo=(pageNo)=>{
//     setCurrentPage(pageNo)

//   }

//   useEffect(()=>{
//     if(error){
//         return toast.error(error,{
//         position:"bottom-center"
//          })
//         }
//     dispatch(getProducts(null,null,null,null,currentPage))
//   },[error,dispatch,currentPage])
//   return (
//     <Fragment>
//       {loading  ? <Loader/>:
//         <Fragment>
//           <MetaData  title={'Buy Best Products'}/>
//           <h1 id="products_heading" className="text-center my-4">
//             Latest Products
//           </h1>

//           <section id="products" className="container">
//       <div className="row">
//         {products &&
//           products.map((product) => (
//             <Product col={3} key={product._id} product={product}/>
//           ))}
//       </div>
//     </section>
//      {productsCount > 0 && productsCount > resPerPage ?
//     <div className="d-flex justify-content-center mt-5">
//           <Pagination
//             activePage={currentPage}
//             onChange={setCurrentPageNo}
//             totalItemsCount={productsCount}
//             itemsCountPerPage={resPerPage}
//             nextPageText='Next'
//             firstPageText='First'
//             lastPageText='Last'
//             itemClass='page-item' 
//             linkClass='page-link'        
//           />
//     </div>:null }  
//         </Fragment>
// }
//     </Fragment>
//   );
// } 


import React, { Fragment, useEffect, useState } from "react";
import MetaData from "./layouts/MetaData";
import { getProducts } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./layouts/Loader";
import Product from "./product/Product";
import { toast } from "react-toastify";
import Pagination from "react-js-pagination";

export default function Home() {
  const dispatch = useDispatch();

  const {
    products,
    loading,
    error,
    productsCount,
    resPerPage,
  } = useSelector((state) => state.productsState);

  const [currentPage, setCurrentPage] = useState(1);

  const setCurrentPageNo = (pageNo) => {
    setCurrentPage(pageNo);
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "bottom-center",
      });
      return;
    }

    dispatch(getProducts(null, null, null, null, currentPage));
  }, [error, dispatch, currentPage]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Buy Best Products"} />


          <h1 id="products_heading" className="text-center my-4">
            Latest Products
          </h1>

          <section id="products" className="container">
            <div className="row">
              {products &&
                products.map((product) => (
                  <Product
                    key={product._id}
                    product={product}
                    col={3}
                  />
                ))}
            </div>
          </section>

          {productsCount > 0 && productsCount > resPerPage && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                onChange={setCurrentPageNo}
                totalItemsCount={productsCount}
                itemsCountPerPage={resPerPage}
                nextPageText="Next"
                firstPageText="First"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
}