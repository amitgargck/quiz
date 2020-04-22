import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import {createCategory, getCategories} from "./apiAdmin";
import SideBarLinks from "../core/SidebarLinks";


const AddCategory = () => {
    const [values, setValues] = useState({
        name: "",
        photo: "",
        loading: false,
        error: "",
        createdCategory: "",
        redirectToProfile: false,
        formData : ""
    });

    const { user, token } = isAuthenticated();
    const {
        name,
        loading,
        error,
        createdCategory,
        redirectToProfile,
        formData
    } = values;

    //load categories and set form data
    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    categories: data,
                    formData: new FormData()
                });
            }
        });
    };

    useEffect(() => {
        init();
    }, []);
    
    const handleChange = name => event => {
        const value =
            name === "photo" ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: "", loading: true });

        createCategory(user._id, token,formData).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name: "",
                    photo: "",
                    loading: false,
                    createdCategory: data.name
                });
            }
        });
    };

    const newPostForm = () => (
        <form className="mb-3" onSubmit={clickSubmit}>
        <div className="form-group">
        <label className="text-muted">Name</label>
        <input
    onChange={handleChange("name")}
    type="text"
    className="form-control"
    value={name}
    />
    </div>

    <div className="form-group">
        <label className="text-muted"> Image</label>
        <input
    onChange={handleChange("photo")}
    type="file"
    name="photo"
    className="form-control"
    accept="image/*"
        />

        </div>



    <button className="btn btn-outline-primary">Create Category</button>
    </form>
);

    const showError = () => (
        <div
    className="alert alert-danger"
    style={{ display: error ? "" : "none" }}
>
    {error}
</div>
);

    const showSuccess = () => (
        <div
    className="alert alert-info"
    style={{ display: createdCategory ? "" : "none" }}
>
<h2>{`${createdCategory}`} is created!</h2>
    </div>
);

    const showLoading = () =>
        loading && (
        <div className="alert alert-success">
        <h2>Loading...</h2>
    </div>
);

    return (
        <Layout
    title="Add a new product"
    description={`G'day ${user.name}, ready to add a new product?`}
>
<div className="row">
        <div className="col-3">< SideBarLinks /></div>
        <div className="col-6">
        {showLoading()}
    {showSuccess()}
    {showError()}
    {newPostForm()}
</div>
    <div className="col-3"></div>
    </div>
    </Layout>
);
};

export default AddCategory;
