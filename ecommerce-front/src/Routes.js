import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Home from "./core/Home";
import PrivateRoute from "./auth/PrivateRoute";
import Dashboard from "./user/UserDashboard";
import Admin from "./user/AdminDashboard";
import AdminRoute from "./auth/AdminRoute";
import ListCategory from "./admin/ListCategory";
import AddCategory from "./admin/AddCategory";
import EditCategory from "./admin/EditCategory";

import ListSubCategory from "./admin/ListSubCategory";
import AddSubCategory from "./admin/AddSubCategory";
import EditSubCategory from "./admin/EditSubCategory";

import AddQuiz from "./admin/AddQuiz";
import ListQuiz from "./admin/ListQuiz";
import EditQuiz from "./admin/EditQuiz";

import AddProduct from "./admin/AddProduct";
import Shop from "./core/Shop";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Signin} />
        <Route path="/shop" exact component={Shop} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
        <AdminRoute path="/admin/dashboard" exact component={Admin} />
        <AdminRoute path="/list/category" exact component={ListCategory} />
        <AdminRoute path="/create/category" exact component={AddCategory} />
        <AdminRoute path="/category/update/:categoryId" exact component={EditCategory} />
        <AdminRoute path="/create/subcategory" exact component={AddSubCategory}/>
        <AdminRoute path="/list/subcategory" exact component={ListSubCategory} />
        <AdminRoute path="/subcategory/update/:subcategoryId" exact component={EditSubCategory} />
        <AdminRoute path="/list/quiz" exact component={ListQuiz} />
        <AdminRoute path="/quiz/update/:quizId" exact component={EditQuiz} />
        <AdminRoute path="/create/quiz" exact component={AddQuiz} />
        <AdminRoute path="/create/product" exact component={AddProduct} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
