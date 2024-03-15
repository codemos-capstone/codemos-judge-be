import Leader from './Leader'

import './MainPage.css'
import profile from 'assets/profile.jpeg'
import symbol from 'assets/main-symbol.png'
import logo from 'assets/main-logo.png'

import susuk from 'assets/dol.jpg'

const btnTexts = require('lang/kor.json').main;

function MainButton({btnType, handlePage}){
    return <button className='button' btntype={btnType} onClick={handlePage}>{btnTexts[btnType]}</button>
}
function LoginBtn(){
    let isLogin = true;
    if (isLogin) {
        return(
            <div>
                <button href="user.html" className="home-mypage-btn">
                <div className="profile-image" style={{background: '#bdbdbd'}}><img className="profile" src={profile} /></div>
                </button>
                <button className="home-logout-btn">{btnTexts.login[1]}</button>
            </div>
        )
    } else {
        return(
            <button className="home-login-btn">{btnTexts.login[0]}</button>
        )
    }
}

export default function MainPage({setPage}){
    const handlePage = (e) => {
        setPage(e.currentTarget.getAttribute('btnType'))
    }
    return(
        <div>
            <LoginBtn />
            <div>
                <div className="mainpage">
                    <img src={symbol} width="100px" /><br />
                    <img src={logo} width="250px" />
                </div>
                <div className="iframe-container">
                    <iframe id="rightIframe" src="https://lottie.host/embed/67e1faa4-2645-461f-a6f0-4952bc6e94c8/9K3VEbwQTX.json"></iframe>
                    <img src={susuk} style={{height: '400px'}} />{/*<iframe id="leftIframe" src="minigame.html"></iframe>*/}
                </div>
                <div className="menus">
                    <div className="buttons">
                        <MainButton btnType='game' handlePage={handlePage} />
                        <MainButton btnType='docs' handlePage={handlePage} />
                        <MainButton btnType='leader' handlePage={handlePage} />
                    </div>
                    {/*<Leader />*/}
                </div>
                {/*<script src="login.js"></script>*/}
            </div>
        </div>
    )
}
/*
loadBoard(0, 0);
window.onload = function () {};
document.addEventListener("DOMContentLoaded", () => {
    console.log(sessionStorage.getItem("jwtToken"));
    if (sessionStorage.getItem("jwtToken") == null) {
        console.log("no token");
        document.querySelector(".home-login-btn").style.display = "block";
        document.querySelector(".home-logout-btn").style.display = "none";
        document.querySelector(".home-mypage-btn").style.display = "none";
    } else {
        document.querySelector(".home-login-btn").style.display = "none";
        document.querySelector(".home-logout-btn").style.display = "block";
        document.querySelector(".home-mypage-btn").style.display = "block";
        var token = sessionStorage.getItem("jwtToken");
        fetch(serverAddress + "/api/verify-token", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.status);
                }
                if (response.text() == "Invalid token.") {
                    sessionStorage.removeItem("jwtToken");
                    document.quereySelector(".home-login-btn").style.display = "block";
                    document.querySelector(".home-logout-btn").style.display = "none";
                    document.querySelector(".home-mypage-btn").style.display = "none";
                }
                return response.json();
            })
            .catch((error) => {
                console.error("Error Code:", error);
            });
    }
    //로그인 확인
    setTimeout(() => {
        console.log(sessionStorage.getItem("jwtToken"));
        if (sessionStorage.getItem("jwtToken") == null) {
            console.log("no token");
            document.querySelector(".home-login-btn").style.display = "block";
            document.querySelector(".home-logout-btn").style.display = "none";
            document.querySelector(".home-mypage-btn").style.display = "none";

            return;
        } else {
            document.querySelector(".home-login-btn").style.display = "none";
            document.querySelector(".home-logout-btn").style.display = "block";
            document.querySelector(".home-mypage-btn").style.display = "block";
            var token = sessionStorage.getItem("jwtToken");
            fetch(serverAddress + "/api/verify-token", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(response.status);
                    }
                    if (response.text() == "Invalid token.") {
                        sessionStorage.removeItem("jwtToken");
                        document.quereySelector(".home-login-btn").style.display = "block";
                        document.querySelector(".home-logout-btn").style.display = "none";
                        document.querySelector(".home-mypage-btn").style.display = "none";
                    }
                    return response.json();
                })
                .catch((error) => {
                    console.error("Error Code:", error);
                });
        }
    }, 2000);
});
function logout() {
    sessionStorage.removeItem("jwtToken");
    document.querySelector(".home-login-btn").style.display = "block";
    document.querySelector(".home-logout-btn").style.display = "none";
    document.querySelector(".home-mypage-btn").style.display = "none";
}*/