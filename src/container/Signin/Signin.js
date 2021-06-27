import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layouts/Layout/Layout.js"
import { Redirect } from "react-router-dom";
import { postKakaoUser } from "../../actions"; 

import './Signin.css';

require('dotenv').config();

const Signin = () => {
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const isToken = localStorage.getItem('token');
    console.log("signin");

    const handleKakao = () => {
        console.log(`process.env.REQUEST_KAKAOLOGIN`, process.env.REACT_APP_KAKAO_JS_KEY);
        console.log(`process.env.KAKAO_LOGIN_API`, process.env.REACT_APP_KAKAO_LOGIN_API);
        // fetch(process.env.REACT_APP_KAKAO_LOGIN_API, {
        fetch('http://localhost:2000/api/login/kakao')
        .then(res => {
            console.log(res);
        })
    }

    const handleFBLogin = () => {
        fetch('http://localhost:2000/api/auth/facebook')
        .then(res => {
            console.log(res);
            // localStorage.setItem()
        })
    }

    // useEffect(() => {
    //     console.log("Signin useEffect");
    //     // Kakao sdk import
    //     const kakaoScript = document.createElement('script');
    //     kakaoScript.async = true;
    //     kakaoScript.src = "https://developers.kakao.com/sdk/js/kakao.js";
    //     document.head.appendChild(kakaoScript);
    //     console.log(`document.cookie`, document.cookie);
    //     console.log(`document.head`, document.head);
        
    //     // Kakao sdk load
    //     kakaoScript.onload = () => {
    //         console.log("kakaoScript onloaded!");
    //          // SDK를 초기화 합니다. 사용할 앱의 JavaScript 키를 설정해 주세요.
    //         window.Kakao.init(process.env.REACT_APP_KAKAO_JS_KEY);

    //         // SDK 초기화 여부를 판단합니다.
    //         console.log(window.Kakao.isInitialized());

    //         // Login and Get access_token
    //         window.Kakao.Auth.createLoginButton({
    //             container: '#kakao-login-btn',
    //             success: (auth) => {
    //                 console.log("Kakao Login Success", auth);
    //                 let { access_token } = auth; 
    //                 // requset Api User Info
    //                 window.Kakao.API.request({
    //                     url: '/v2/user/me', // kakao docs url
    //                     success: (res) => {
    //                         console.log("kakao SDK Login at Signin");
    //                         console.log(res);
    //                         let id = res.id;
    //                         let nickname = res.properties.nickname;
    //                         let profileImg110 = res.properties.thumbnail_image;
    //                         let provider = 'kakao';
    //                         dispatch(postKakaoUser(id, access_token, nickname, profileImg110, provider));
    //                     },
    //                     fail: (err) => {
    //                         console.log(err)
    //                     }
    //                 });
    //             },
    //             fail: (err) => {
    //                 console.log(err);
    //             }
    //         })
    //     };
    // });

    if(auth.authenticate && isToken){
        return <Redirect to={'/'} />
    }
    
    return(
        <>  
            <Layout />
            {/* <div className="signin-container">
                <button type="button" id="kakao-login-btn"></button>
            </div> */}
            <div className="signin-container">
                <button type="button" onClick={handleKakao}>KAKAO_LOGIN</button>
                <button type="button" onClick={handleFBLogin}>FACEBOOK_LOGIN</button>
                <a href="http://localhost:2000/api/login/kakao">KaKao Login</a>
                <a href="http://localhost:2000/api/auth/facebook">Facebook Login</a>
            </div>
        </>
    )    
}

export default Signin;