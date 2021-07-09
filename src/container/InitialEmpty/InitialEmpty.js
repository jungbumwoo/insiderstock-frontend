import React from 'react'
import PropTypes from 'prop-types'
import Layout from "../../components/Layouts/Layout/Layout.js";

import "./InitialEmpty.css"


const InitialEmpty = props => {
    return (
        <>
            <Layout />
            <div className="empty-container">
                <div className="empty-yet">아직 저장된 항목이 없습니다.</div>
                <div className="empty-go-home">
                    <a href="/">종목 담으러가기</a>
                </div>
                <div className="empty-text">
                    <p>{props.title}</p>
                    <p>{props.description1}</p>
                    <p>{props.description2}</p>
                </div>
            </div>
        </>
    )
}

InitialEmpty.propTypes = {
    title: PropTypes.string,
    description1: PropTypes.string,
    description2: PropTypes.string
}

export default InitialEmpty
