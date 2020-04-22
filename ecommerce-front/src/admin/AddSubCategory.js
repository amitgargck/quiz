import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import {createSubCategory, getCategories} from "./apiAdmin";
import SideBarLinks from "../core/SidebarLinks";

const AddSubCategory = () => {
    const [values, setValues] = useState({
        name: "",
        categories: [],
        category: "",
        photo: "",
        loading: false,
        error: "",
        createdProduct: "",
        redirectToProfile: false,
        formData: ""
    });

    const { user, token } = isAuthenticated();
    const {
        name,
        categories,
        category,
        loading,
        error,
        createdSubCategory,
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

        createSubCategory(user._id, token, formData).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name: "",
                    photo: "",
                    loading: false,
                    createdSubCategory: data.name
                });
            }
        });
    };

    const newPostForm = () => (
        <form className="mb-3" onSubmit={clickSubmit}>
    <div className="form-group">
        <label className="text-muted">Image</label>
        <input
    onChange={handleChange("photo")}
    type="file"
    name="photo"
    accept="image/*"
    className="form-control"
        />
        </div>

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
        <label className="text-muted">Category</label>
        <select
    onChange={handleChange("category")}
    className="form-control"
        >
        <option>Please select</option>
    {categories &&
    categories.map((c, i) => (
        <option key={i} value={c._id}>
        {c.name}
        </option>
    ))}
</select>
    </div>

    
    <button className="btn btn-outline-primary">Create Subcategory</button>
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
    style={{ display: createdSubCategory ? "" : "none" }}
>
<h2>{`${createdSubCategory}`} is created!</h2>
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
        <div className="col-9">
        {showLoading()}
    {showSuccess()}
    {showError()}
    {newPostForm()}
</div>
    </div>
    </Layout>
);
};

export default AddSubCategory;
