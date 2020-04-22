import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#ff9900" };
    } else {
        return { color: "#ffffff" };
    }
};

const SidebarLinks =  ({ history }) => (
        < div className = "card" >
            < h4 className = "card-header" > Admin Links < /h4>
        < ul className = "list-group" >
            < li
        className = "list-group-item" >
            < Link
        className = "nav-link"
        to = "/list/category" >
        Category
        < /Link>
        < /li>

        < li
        className = "list-group-item" >
            < Link
        className = "nav-link"
        to = "/list/subcategory" >
        Subcategory
        < /Link>
        < /li>
        < li
        className = "list-group-item" >
            < Link
        className = "nav-link"
        to = "/list/quiz" >

        Quiz
        < /Link>
        < /li>
        < /ul>
        < /div>
)

export default withRouter(SidebarLinks);