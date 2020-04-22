import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { getCategories, deleteCategory } from "./apiAdmin";
import {Link} from "react-router-dom";
import css from "../styles.css"
import {API} from "../config";
import ShowImage from "../core/ShowImage";
import SideBarLinks from "../core/SidebarLinks";
import {isAuthenticated} from "../auth";


const ListCategory = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState([]);
    const { user, token } = isAuthenticated();

    const loadCategory = () => {
        getCategories().then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setCategories(data);
            }
        });
    };
    
    const destroy = categoryId => {
        deleteCategory(categoryId, user._id, token).then(data => {
            if (data.error){
                console.log(data.error);
            }else{
                loadCategory();
            }
        });
    };

    useEffect(() => {
        loadCategory();
    }, []);

    return (
        <Layout
    title="Home Page"
    description="Node React E-commerce App"
    className="container-fluid"
        >
        <div className="row">
        <div className="col-3">< SideBarLinks /></div>
        <div className="col-6">
            <table id="students">
            <thead>
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Image</th>
                <th>Edit</th>
        <th>Delete</th>
            </tr>
            </thead>
            <tbody>
            {categories.map((cat, i) => (
            <tr>
            <td>{cat._id}</td>
            <td>{cat.name}</td>
            <td><ShowImage item={cat} url="category" /></td>
            <td><Link to={`/category/update/${cat._id}`}>Edit</Link></td>
            <td><span
    onClick={() => destroy(cat._id)}
    className="badge badge-danger badge-pill"
        >
        Delete
        </span></td>
            </tr>
            ))}
            </tbody>
        </table>
        </div>
        <div className="col-3"><Link to='/create/category'>Create Category</Link></div>
    </div>
    </Layout>
);
};

export default ListCategory;
