import React from "react";
import HomeNavBar from "../navbars/homeNavBar";

const HomeLayout = ({children}) => {
    return (
        <div>
            <HomeNavBar />
            {children}
        </div>
    )
}

export default HomeLayout;
