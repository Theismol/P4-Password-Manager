import React from "react";
import HomeNavBar from "../navbars/homeNavBar";
import { Outlet } from "react-router-dom";

const HomeLayout = ({ children }) => {
    return (
        <div>
            <HomeNavBar />

            <Outlet />
            {children}
        </div>
    );
};

export default HomeLayout;
