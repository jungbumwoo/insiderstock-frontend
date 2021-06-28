import React from "react";
import Layout from "../../components/Layouts/Layout/Layout.js";
import News from "../News/News.js";
import Interest from "../Interest/Interest.js";

// import "./Home.css";

const Home = (props) => {
    return (
        <>
            <Layout />
            <News location={props.location} />
            {/* <Interest /> */}
        </>
    )
}

export default Home;