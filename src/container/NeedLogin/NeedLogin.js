import React from 'react'
import PropTypes from 'prop-types'
import Layout from "../../components/Layouts/Layout/Layout.js";

import "./NeedLogin.css"


const NeedLogin = props => {
    return (
        <>
            <Layout />
            <div className="need-login-container">
                <div className="need-login">로그인이 필요한 항목입니다.</div>
                <div className="need-login-center">
                    <a href="/signin">로그인하기</a>
                </div>
                <div className="need-login-text">
                    <p>{props.title}</p>
                    <p>{props.description1}</p>
                    <p>{props.description2}</p>
                </div>
            </div>
        </>
    )
}

NeedLogin.propTypes = {
    title: PropTypes.string,
    description1: PropTypes.string,
    description2: PropTypes.string
}

export default NeedLogin
