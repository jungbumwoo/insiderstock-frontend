import React from "react";
import { useSelector } from "react-redux";
import "./Header3.css";
    
const Header = () => {
    const auth = useSelector(state => state.auth);
    const isToken = localStorage.getItem('token');
    const username = sessionStorage.getItem("insk_un");
    
    const renderLoggedinbar = () => {
        console.log(auth);
        return (
            <a href="/signout">signout</a>
        )
    };

    const renderNonLoginbar = () => {
        return (
            <>
                <a href="/signin">로그인하기</a>
            </>
        )
    };

    const isClicked = () => {
        document.getElementById("menu-btn").checked = false;
    }

    return (
        <>
            <div className="header">
                <div className="header-container">
                    <a id="htitle" href="/">insider</a>
                    <input id="menu-btn" type="checkbox"/>
                    <label className="menu-icon" for="menu-btn">
                        <span></span>
                        <span></span>
                        <span></span>
                    </label>
                    <div onClick={isClicked} className="modal-darkside"></div>
                    <div className="menuToggle">
                        <ul className="menu-ul">
                            <span id="username" className={ username ? 'visable' : 'disable'}>{username}님</span>
                            <a href="/onboard">담은목록</a>
                            <a href="/interest">관심종목</a>
                            <a href="/notinterest">노관심종목</a>
                            <a href="/ban">10일벤목록</a>
                            { isToken ? renderLoggedinbar() : renderNonLoginbar()}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Header;