import React, { useEffect, useState } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import {createQuiz, getCategories, getSubCategories} from "./apiAdmin";
import SideBarLinks from "../core/SidebarLinks";

const AddQuiz = () => {
  const [values, setValues] = useState({
    name: "",
    categories: [],
    subcategories: [],
    category: "",
    subcategory: "",
    photo: "",
    loading: false,
    error: "",
    createdQuiz: "",
    redirectToProfile: false,
    formData: new FormData()
  });

  const [error, setError] = useState(false);
  const [categories, setCategories] = useState(false);
  const [subcategories, setSubcategories] = useState(false);
  const { user, token } = isAuthenticated();
  const {
    name,
    description,
    loading,
    createdQuiz,
    redirectToProfile,
    formData
  } = values;

  const init = () => {
    getCategories().then(data => {
      if (data.error) {
        setValues({...values, error: data.error});
      } else {
        setCategories(data);
      }
    });
  };

  const initSub = () => {
    getSubCategories().then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setSubcategories(data);
      }
    });
  };


  useEffect(() => {
    init();
    initSub();
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

    createQuiz(user._id, token, formData).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          category: "",
          subcategory: "",
          photo: "",
          loading: false,
          createdQuiz: data.name
        });
      }
    });
  };

  const newQuizFom = () => (
      <form onSubmit={clickSubmit}>
      <div className="form-group">
      <label className="text-muted">Name</label>
      <input
  type="text"
  onChange={handleChange("name")}
  className="form-control"
  value={name}
  />
  </div>
  <div className="form-group">
      <label className="text-muted">Category</label>
      <select
  onChange={handleChange("category")}
  className="form-control">
      <option>Please select</option>
  {categories &&
  categories.map((c, i) => (
      <option key={i} value={c._id}>
      {c.name}
      </option>
  ))}
</select>
  </div>
  <div className="form-group">
      <label className="text-muted">SubCategory</label>
      <select
  onChange={handleChange("subcategory")}
  className="form-control" multiple>
      <option>Please select</option>
  {subcategories &&
  subcategories.map((s, x) => (
      <option key={x} value={s._id}>
      {s.name}
      </option>
  ))}
</select>
  </div>
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
      <label className="text-muted">Description</label>
      <textarea
  className="form-control"
  onChange={handleChange("description")}
  value={description}
  />
  </div>
  <button className="btn btn-outline-primary">Create Quiz</button>
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
  style={{ display: createdQuiz ? "" : "none" }}
>
<h2>{`${createdQuiz}`} is created!</h2>
  </div>
);

  const showLoading = () =>
      loading && (
      <div className="alert alert-success">
      <h2>Loading...</h2>
  </div>
);

  const goBack = () => (
      <div className="mt-5">
      <Link to="/admin/dashboard" className="text-warning">
      Back to Dashboard
  </Link>
  </div>
);

  return (
      <Layout
  title="Add a new category"
  description={`G'day ${user.name}, ready to add a new category?`}
>
<div className="row">
      <div className="col-3">< SideBarLinks /></div>
      <div className="col-9">
      {showSuccess()}
  {showError()}
  {newQuizFom()}
</div>
  </div>
  </Layout>
);
};

export default AddQuiz;
