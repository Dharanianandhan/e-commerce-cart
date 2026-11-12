

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    clearAuthError,
    updateProfile,
    loadUser
} from "../../actions/userActions";
import { toast } from "react-toastify";
import { clearUpdateProfile } from "../../slices/authSlice";

export default function UpdateProfile() {

    const dispatch = useDispatch();

    const {
        loading,
        error,
        user,
        isUpdated
    } = useSelector(state => state.authState);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState("");

    const [avatarPreview, setAvatarPreview] = useState(
        "/images/default_avatar.jpg"
    );

    useEffect(() => {

        if (user) {
            setName(user.name || "");
            setEmail(user.email || "");
            setAvatarPreview(
                user?.avatar || "/images/default_avatar.jpg"
            );
        }

        if (isUpdated) {

            toast.success("Profile Updated Successfully", {
                position: "bottom-center"
            });

            dispatch(loadUser());
            dispatch(clearUpdateProfile());
        }

        if (error) {

            toast.error(error, {
                position: "bottom-center"
            });

            dispatch(clearAuthError());
        }

    }, [dispatch, user, isUpdated, error]);

    const onChangeAvatar = (e) => {

        const reader = new FileReader();

        reader.onload = () => {

            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(e.target.files[0]);
            }
        };

        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const submitHandler = (e) => {

        e.preventDefault();

        const formData = new FormData();

        formData.append("name", name);
        formData.append("email", email);

        if (avatar) {
            formData.append("avatar", avatar);
        }

        dispatch(updateProfile(formData));
    };

    return (
        <div className="row wrapper">

            <div className="col-10 col-lg-5">

                <form
                    className="shadow-lg p-4"
                    onSubmit={submitHandler}
                    encType="multipart/form-data"
                >

                    <h1 className="mt-2 mb-5">
                        Update Profile
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
                            onChange={(e) => setName(e.target.value)}
                        />

                    </div>

                    <div className="form-group mb-3">

                        <label htmlFor="email_field">
                            Email
                        </label>

                        <input
                            type="email"
                            id="email_field"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                    </div>

                    <div className="form-group mb-4">

                        <label htmlFor="customFile">
                            Avatar
                        </label>

                        <div className="d-flex align-items-center mt-2">

                            <figure className="avatar me-3">

                                <img
                                    src={avatarPreview}
                                    className="rounded-circle"
                                    alt="Avatar Preview"
                                    width="80"
                                    height="80"
                                />

                            </figure>

                            <div className="custom-file">

                                <input
                                    type="file"
                                    name="avatar"
                                    className="custom-file-input"
                                    id="customFile"
                                    accept="image/*"
                                    onChange={onChangeAvatar}
                                />

                                <label
                                    className="custom-file-label"
                                    htmlFor="customFile"
                                >
                                    Choose Avatar
                                </label>

                            </div>

                        </div>

                    </div>

                    <button
                        type="submit"
                        className="btn update-btn btn-block mt-4 mb-3"
                        disabled={loading}
                    >
                        {loading ? "Updating..." : "Update"}
                    </button>

                </form>

            </div>

        </div>
    );
}

