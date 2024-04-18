import React from "react";
import HomeNavBar from "../navbars/homeNavBar";
import { Outlet } from "react-router-dom";

const HomeLayout = ({ children }) => {
    return (
        <div>
            <HomeNavBar />
            <h1>Home Layout</h1>
            <Outlet />
            {children}
        </div>
    );
};

export default HomeLayout;
