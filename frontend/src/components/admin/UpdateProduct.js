

import React, { Fragment, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { UpdateProduct, getProduct } from "../../actions/productActions";
import { toast } from "react-toastify";
import { clearProductUpdated } from "../../slices/productSlice";
import { clearError } from "../../slices/productsSlice";

export default function UpdatedProduct() {
    const { id: productId } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        loading,
        isProductUpdated,
        error,
        product = {}
    } = useSelector((state) => state.productState);

    // FORM STATE
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState(0);
    const [seller, setSeller] = useState("");

    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [imagesCleared, setImagesCleared] = useState(false);

    const categories = [
        "Electronics",
        "Mobile Phones",
        "Laptops",
        "Accessories",
        "Headphones",
        "Food",
        "Books",
        "Clothes/Shoes",
        "Beauty/Health",
        "Sports",
        "Outdoor",
        "Home"
    ];

    // RESET + FETCH PRODUCT
    useEffect(() => {
        setName("");
        setPrice("");
        setDescription("");
        setCategory("");
        setStock(0);
        setSeller("");
        setImages([]);
        setImagesPreview([]);
        setImagesCleared(false);

        dispatch(clearProductUpdated());

        if (productId) {
            dispatch(getProduct(productId));
        }
    }, [dispatch, productId]);

    // LOAD PRODUCT INTO FORM
    useEffect(() => {
        if (!product?._id) return;

        setName(product.name || "");
        setPrice(product.price || "");
        setDescription(product.description || "");
        setCategory(product.category || "");
        setStock(product.stock || 0);
        setSeller(product.seller || "");

        const imagesList = Array.isArray(product.images)
            ? product.images
                  .map((img) => {
                      if (!img) return null;

                      // Already a full URL
                      if (typeof img === "string" && img.startsWith("http")) {
                          return img;
                      }

                      // Server-relative path like "/uploads/product/filename" or "/uploads/products/filename"
                      if (typeof img === "string" && img.startsWith("/")) {
                          return `http://localhost:8000${img}`;
                      }

                      // Filename only (legacy case) — support both upload folders
                      if (typeof img === "string") {
                          return `http://localhost:8000/uploads/product/${img}`;
                      }

                      // object formats support
                      if (img.url) {
                          return img.url.startsWith("http")
                              ? img.url
                              : `http://localhost:8000${img.url}`;
                      }

                      if (img.image) {
                          return img.image.startsWith("http")
                              ? img.image
                              : `http://localhost:8000${img.image}`;
                      }

                      return null;
                  })
                  .filter(Boolean)
            : [];

        setImagesPreview(imagesList);
        setImages([]);
        setImagesCleared(false);

    }, [product?._id]);

    // SUCCESS / ERROR
    useEffect(() => {
        if (isProductUpdated) {
            toast.success("Product Updated Successfully", {
                position: "bottom-center"
            });

            dispatch(clearProductUpdated());
            navigate("/admin/product");
        }

        if (error) {
            toast.error(error, {
                position: "bottom-center"
            });

            dispatch(clearError());
        }
    }, [isProductUpdated, error, dispatch, navigate]);

    // IMAGE CHANGE
    const onImagesChange = (e) => {
        const files = Array.from(e.target.files || []);
        if (!files.length) return;

        setImages([]);
        setImagesPreview([]);
        setImagesCleared(false);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((prev) => [...prev, reader.result]);
                    setImages((prev) => [...prev, file]);
                }
            };

            reader.readAsDataURL(file);
        });

        e.target.value = "";
    };

    // CLEAR IMAGES
    const clearImagesHandler = () => {
        setImages([]);
        setImagesPreview([]);
        setImagesCleared(true);
    };

    // SUBMIT
    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("name", name);
        formData.append("price", price);
        formData.append("description", description);
        formData.append("stock", Number(stock));
        formData.append("seller", seller);
        formData.append("category", category);
        formData.append("imagesCleared", imagesCleared);

        if (images.length > 0) {
            images.forEach((img) => {
                formData.append("images", img);
            });
        }

        dispatch(UpdateProduct(productId, formData));
    };

    return (
        <div className="row">
            <div className="col-12 col-md-2">
                <Sidebar />
            </div>

            <div className="col-12 col-md-10">
                <Fragment>
                    <div className="wrapper my-5">
                        <form
                            className="shadow-lg p-4"
                            onSubmit={submitHandler}
                            encType="multipart/form-data"
                        >
                            <h1 className="mb-4">Update Product</h1>

                            <input
                                className="form-control mb-3"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Name"
                            />

                            <input
                                type="number"
                                className="form-control mb-3"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="Price"
                            />

                            <textarea
                                className="form-control mb-3"
                                rows="5"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Description"
                            />

                            <select
                                className="form-control mb-3"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">Select</option>
                                {categories.map((c) => (
                                    <option key={c} value={c}>
                                        {c}
                                    </option>
                                ))}
                            </select>

                            <input
                                type="number"
                                className="form-control mb-3"
                                value={stock}
                                onChange={(e) => setStock(Number(e.target.value))}
                                placeholder="Stock"
                            />

                            <input
                                className="form-control mb-3"
                                value={seller}
                                onChange={(e) => setSeller(e.target.value)}
                                placeholder="Seller"
                            />

                            <input
                                type="file"
                                className="form-control"
                                accept="image/*"
                                multiple
                                onChange={onImagesChange}
                            />

                            {imagesPreview.length > 0 && (
                                <button
                                    type="button"
                                    className="btn btn-danger btn-sm mt-2"
                                    onClick={clearImagesHandler}
                                >
                                    Clear Images
                                </button>
                            )}

                            <div className="mt-3 d-flex flex-wrap gap-2">
                                {imagesPreview.map((img, i) => (
                                    <img
                                        key={i}
                                        src={img}
                                        alt="preview"
                                        style={{
                                            width: "100px",
                                            height: "100px",
                                            objectFit: "cover",
                                            border: "1px solid #ddd"
                                        }}
                                    />
                                ))}
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary w-100 mt-4"
                                disabled={loading || !name || !price || !category}
                            >
                                {loading ? "UPDATING..." : "UPDATE"}
                            </button>
                        </form>
                    </div>
                </Fragment>
            </div>
        </div>
    );
}