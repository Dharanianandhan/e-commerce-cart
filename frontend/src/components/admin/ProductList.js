


import { Fragment, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { MDBDataTable } from "mdbreact";

import Sidebar from "./Sidebar";
import Loader from "../layouts/Loader";

import { clearError } from "../../slices/productsSlice";
import { clearProductDeleted } from "../../slices/productSlice";
import {
    deleteProduct,
    getAdminProducts
} from "../../actions/productActions";

export default function ProductList() {

    const {
        products = [],
        loading = true,
        error
    } = useSelector(state => state.productsState);

    const {
        isProductDeleted,
        error: productError
    } = useSelector(state => state.productState);

    const dispatch = useDispatch();

    const deleteHandler = (e, id) => {
        e.currentTarget.disabled = true;
        dispatch(deleteProduct(id));
    };

    const setProducts = () => {

        const data = {
            columns: [
                {
                    label: "ID",
                    field: "id",
                    sort: "asc"
                },
                {
                    label: "Name",
                    field: "name",
                    sort: "asc"
                },
                {
                    label: "Price",
                    field: "price",
                    sort: "asc"
                },
                {
                    label: "Stock",
                    field: "stock",
                    sort: "asc"
                },
                {
                    label: "Actions",
                    field: "actions"
                }
            ],
            rows: []
        };

        products.forEach(product => {

            data.rows.push({
                id: product._id,
                name: product.name,
                price: `$${product.price}`,
                stock: product.stock,

                actions: (
                    <Fragment>

                        <Link
                            to={`/admin/product/${product._id}`}
                            className="btn btn-primary"
                        >
                            <i className="fa fa-pencil"></i> Edit
                        </Link>

                        <Button
                            className="btn btn-danger py-1 px-2 ml-2"
                            onClick={(e) =>
                                deleteHandler(e, product._id)
                            }
                        >
                            <i className="fa fa-trash"></i>
                        </Button>

                    </Fragment>
                )
            });
        });

        return data;
    };

    useEffect(() => {

        if (error || productError) {

            toast.error(error || productError, {
                position: "bottom-center"
            });

            dispatch(clearError());

            return;
        }

        if (isProductDeleted) {

            toast.success(
                "Product deleted successfully!",
                {
                    position: "bottom-center"
                }
            );

            dispatch(clearProductDeleted());
        }

        dispatch(getAdminProducts());

    }, [
        dispatch,
        error,
        productError,
        isProductDeleted
    ]);

    return (
        <div className="row">

            <div className="col-12 col-md-2">
                <Sidebar />
            </div>

            <div className="col-12 col-md-10">

                <h1 className="my-4">
                    Product List
                </h1>

                <Fragment>

                    {loading ? (
                        <Loader />
                    ) : (
                        <MDBDataTable
                            data={setProducts()}
                            bordered
                            striped
                            hover
                            className="px-3"
                        />
                    )}

                </Fragment>

            </div>

        </div>
    );
}



