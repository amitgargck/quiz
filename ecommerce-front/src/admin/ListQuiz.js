import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { getQuizes, deleteQuiz, getCategory, getSubCategory } from "./apiAdmin";
import { Link } from "react-router-dom";
import css from "../styles.css";
import { API } from "../config";
import ShowImage from "../core/ShowImage";
import SideBarLinks from "../core/SidebarLinks";
import { isAuthenticated } from "../auth";

const ListQuiz = () => {
  const [quiz, setQuiz] = useState([]);
  const [error, setError] = useState(false);
  const { user, token } = isAuthenticated();
  const loadQuiz = () => {
    getQuizes().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setQuiz(data);
      }
    });
  };

  const destroy = (quizId) => {
    deleteQuiz(quizId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadQuiz();
      }
    });
  };

  useEffect(() => {
    loadQuiz();
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
        <div className="col-8">
          <table id="students">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Category</th>
                <th>SubCategory</th>
                <th>Image</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {quiz.map((qu, i) => (
                <tr>
                  <td>{qu._id}</td>
                  <td>{qu.name}</td>
                  <td>{qu.category.name}</td>
                  <td>{qu.subcategory.name}</td>
                  <td>
                    <ShowImage item={qu} url="quiz" />
                  </td>
                  <td>
                    <Link to={`/quiz/update/${qu._id}`}>Edit</Link>
                  </td>
                  <td>
                    <span
                      onClick={() => destroy(qu._id)}
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
        <div className="col-1">
          <Link to="/create/quiz">Create Quiz</Link>
        </div>
      </div>
    </Layout>
  );
};

export default ListQuiz;
