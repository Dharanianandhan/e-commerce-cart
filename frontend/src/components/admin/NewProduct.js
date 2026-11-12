import React, { Fragment, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createNewProduct } from "../../actions/productActions";
import { toast } from "react-toastify";
import { clearProductCreated } from "../../slices/productSlice";
import { clearError } from "../../slices/productsSlice";

export default function NewProduct() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState(0);
    const [seller, setSeller] = useState("");
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const { loading,isProductCreated,error } = useSelector(
        (state) => state.productState || {}
    );

    const navigate = useNavigate();
    const dispatch = useDispatch();

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
        "Home",
    ];
const onImagesChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
        const reader = new FileReader();

        reader.onloadend = () => {
            setImagesPreview((prev) => [...prev, reader.result]);
            setImages((prev) => [...prev, file]);
        };

        reader.readAsDataURL(file);
    });

    e.target.value = "";
};

const submitHandler=(e)=>{
    e.preventDefault();
    const formData=new FormData();
    formData.append('name',name);
    formData.append('price',price);
    formData.append('stock',stock);
    formData.append('description',description);
    formData.append('seller',seller);
    formData.append('category',category);
    images.forEach(image=>{
        formData.append('images',image)
    })
    dispatch(createNewProduct(formData))
}
    useEffect(()=>{
        if(isProductCreated){
            toast.success("Product created successfully!", {
                position: "bottom-center",
                onOpen:()=>dispatch(clearProductCreated())

            });
            navigate('/admin/products')
        }
        if(error){
                                     toast(error,{
                                     position:"bottom-center",
                                     type:'error',
                                     onOpen:()=>{dispatch(clearError())}
                                 })
                                 return}
    },[isProductCreated,error,navigate,dispatch])
    return (
        <div className="row">
            <div className="col-12 col-md-2">
                <Sidebar />
            </div>

            <div className="col-12 col-md-10">
                <Fragment>
                    <div className="wrapper my-5">
                        <form
                            onSubmit={submitHandler} className="shadow-lg p-4"
                            encType="multipart/form-data"
                            onSubmit={submitHandler}
                        >
                            <h1 className="mb-4">
                                New Product
                            </h1>

                            <div className="form-group mb-3">
                                <label htmlFor="name_field">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name_field"
                                    className="form-control"
                                    value={name}
                                    onChange={(e) =>
                                        setName(
                                            e.target.value
                                        )
                                    }
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label htmlFor="price_field">
                                    Price
                                </label>
                                <input
                                    type="number"
                                    id="price_field"
                                    className="form-control"
                                    value={price}
                                    onChange={(e) =>
                                        setPrice(
                                            e.target.value
                                        )
                                    }
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label htmlFor="description_field">
                                    Description
                                </label>
                                <textarea
                                    id="description_field"
                                    rows="8"
                                    className="form-control"
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(
                                            e.target.value
                                        )
                                    }
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label htmlFor="category_field">
                                    Category
                                </label>

                                <select
                                    onChange={e=>setCategory(e.target.value)}id="category_field"
                                    className="form-control"
                                    value={category}
                                    onChange={(e) =>
                                        setCategory(
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="">
                                        Select
                                    </option>

                                    {categories.map(
                                        (category) => (
                                            <option
                                                key={category}
                                                value={category}
                                            >
                                                {category}
                                            </option>
                                        )
                                    )}
                                </select>
                            </div>

                            <div className="form-group mb-3">
                                <label htmlFor="stock_field">
                                    Stock
                                </label>
                                <input
                                    type="number"
                                    id="stock_field"
                                    className="form-control"
                                    value={stock}
                                    onChange={(e) =>
                                        setStock(
                                            e.target.value
                                        )
                                    }
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label htmlFor="seller_field">
                                    Seller Name
                                </label>
                                <input
                                    type="text"
                                    id="seller_field"
                                    className="form-control"
                                    value={seller}
                                    onChange={(e) =>
                                        setSeller(
                                            e.target.value
                                        )
                                    }
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label>Images</label>

                                <div className="custom-file">
                                    <input
                                        type="file"
                                        name="product_images"
                                        className="custom-file-input"
                                        id="customFile"
                                        multiple
                                        accept="image/*"
                                        onChange={
                                            onImagesChange
                                        }
                                    />

                                    <label
                                        className="custom-file-label"
                                        htmlFor="customFile"
                                    >
                                        Choose Images
                                    </label>
                                </div>

                                <div
                                    className="mt-3"
                                    style={{
                                        display:
                                            "flex",
                                        flexWrap:
                                            "wrap",
                                        gap: "10px",
                                    }}
                                >
                                    {imagesPreview.map(
                                        (
                                            image,
                                            index
                                        ) => (
                                            <img
                                                key={
                                                    index
                                                }
                                                src={
                                                    image
                                                }
                                                alt={`Preview ${index}`}
                                                width="100"
                                                height="100"
                                                style={{
                                                    objectFit:
                                                        "cover",
                                                    border:
                                                        "1px solid #ddd",
                                                    borderRadius:
                                                        "5px",
                                                }}
                                            />
                                        )
                                    )}
                                </div>
                            </div>

                            <button
                                id="login_button"
                                type="submit"
                                disabled={loading}
                                className="btn btn-primary btn-block py-3"
                            >
                                {loading
                                    ? "CREATING..."
                                    : "CREATE"}
                            </button>
                        </form>
                    </div>
                </Fragment>
            </div>
        </div>
    );
}