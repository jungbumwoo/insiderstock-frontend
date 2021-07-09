import React from 'react'
import Spinner from "react-bootstrap/Spinner";
import './LoadingSpinner.css';

export const LoadingSpinner = () => {
    return (
        <div>
            <Spinner className="centered-spinner" animation="border" variant="primary" />
        </div>
    )
}
