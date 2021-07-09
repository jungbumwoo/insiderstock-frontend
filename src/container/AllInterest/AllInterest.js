import React from "react";
import Layout from "../../components/Layouts/Layout/Layout.js";
import Interest from "../../container/Interest/Interest.js";
import "./AllInterest.css";

const AllInterest = (props) => {
    console.log(props);
    return(
        <>
            <Layout />
            <Interest location={props.location}/>
        </>
    )
};

export default AllInterest;