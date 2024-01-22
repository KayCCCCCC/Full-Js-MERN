import React from "react";
import Header from "../HeaderComponent/HeaderComponent";

const DefaultComponent = ({ children }) => {
    return (
        <React.Fragment>
            <Header />
            {children}
        </React.Fragment>
    )
}
export default DefaultComponent