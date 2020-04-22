import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { getSubCategories, deleteSubCategory, getCategory } from "./apiAdmin";
import { Link } from "react-router-dom";
import css from "../styles.css";
import { API } from "../config";
import ShowImage from "../core/ShowImage";
import SideBarLinks from "../core/SidebarLinks";
import { isAuthenticated } from "../auth";

const ListSubCategory = () => {
  const [subcategories, setSubCategories] = useState([]);
  const [error, setError] = useState(false);
  const { user, token } = isAuthenticated();
  const loadSubCategory = () => {
    getSubCategories().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setSubCategories(data);
      }
    });
  };

  const destroy = (subcategoryId) => {
    deleteSubCategory(subcategoryId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadSubCategory();
      }
    });
  };

  useEffect(() => {
    loadSubCategory();
  }, []);

  return (
    <Layout
      title="Home Page"
      description="Node React E-commerce App"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-3">
          <SideBarLinks />
        </div>
        <div className="col-7">
          <table id="students">
            <thead>
              <tr>
                <th>Id</th>
                <th>Category Name</th>
                <th>Name</th>
                <th>Image</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {subcategories.map((subcat, i) => (
                <tr>
                  <td>{subcat._id}</td>
                  <td>{subcat.category.name}</td>
                  <td>{subcat.name}</td>
                  <td>
                    <ShowImage item={subcat} url="subcategory" />
                  </td>
                  <td>
                    <Link to={`/subcategory/update/${subcat._id}`}>Edit</Link>
                  </td>
                  <td>
                    <span
                      onClick={() => destroy(subcat._id)}
                      className="badge badge-danger badge-pill"
                    >
                      Delete
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-2">
          <Link to="/create/subcategory">Create SubCategory</Link>
        </div>
      </div>
    </Layout>
  );
};

export default ListSubCategory;
