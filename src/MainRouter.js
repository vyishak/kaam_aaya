import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import Menu from "./core/Menu";
import Signup from './user/Signup';
import Signin from './user/Signin';
// import Profile from './user/Profile';
// import Users from './user/Users';
// import EditProfile from './user/EditProfile';
// import FindPeople from './user/FindPeople';

import ForgotPassword from "./user/ForgotPassword";
import ResetPassword from "./user/ResetPassword";
// import Admin from './admin/Admin'
import './App.css';

// import NewPost from './post/NewPost';
// import SinglePost from './post/SinglePost';
// import EditPost from './post/EditPost';
import PrivateRoute from './auth/PrivateRoute';

const MainRouter = () => (
    <div>
        <Menu />
        <Switch>
            <Route exact path="/" component={Home} />
            {/* <Route exact path="/users" component={Users} /> */}
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/forgot-password" component={ForgotPassword} />
            <Route exact path="/reset-password/:resetPasswordToken" component={ResetPassword} />
            {/* <PrivateRoute exact path="/admin" component={Admin} />
            <PrivateRoute exact path="/user/:userId" component={Profile} />
            <PrivateRoute exact path="/user/edit/:userId" component={EditProfile} />
            <PrivateRoute exact path="/findpeople" component={FindPeople} />
            <PrivateRoute exact path="/post/create" component={NewPost} />
            <PrivateRoute exact path="/post/:postId" component={SinglePost} />
            <PrivateRoute exact path="/post/edit/:postId" component={EditPost} /> */}
        </Switch>
    </div>
);

export default MainRouter;