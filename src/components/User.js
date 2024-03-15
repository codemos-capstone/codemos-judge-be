import "./User.css"

const btnTexts = require('lang/kor.json').user;

import symbol from 'assets/main-symbol.png'

export default function User(){
    return(
       <div>
            <button className="home-btn" onclick="">{btnTexts[0]}</button>{/** onclick 제어 필요 */}
            <div className="container">
                <div className="logo">
                    {/*로고 이미지 경로를 'logo.png'로 가정합니다. 실제 경로로 변경하세요.*/}
                    <img src={symbol} alt="Logo" />
                </div>
                <div className="profile">
                    <div className="user-info-block">
                        <div className="profile-icon"></div>
                        <div className="user-details">
                            <h2 className="nickname">{btnTexts[1]}</h2>
                            <h2 className="small-text">ID: </h2>
                            <h2 className="small-text">ROLE: </h2>
                        </div>
                        {/*<button id="deleteAccount">회원탈퇴</button>*/}
                    </div>
                </div>
                <div className="code-entities">
                    <div id="code-buttons"></div>
                    <pre id="display-code"></pre>
                </div>
            </div>
       </div> 
    )
}

/*var serverAddress = "http://18.179.38.25:8080"
var codeList
document.addEventListener("DOMContentLoaded", function () {
    var currentPath = window.location.pathname;
    history.replaceState(null, null, currentPath.replace(".html", ""));

    var token = sessionStorage.getItem('jwtToken')
    if (token == null){
        var profile = document.querySelector('.profile')
        profile.innerHTML = `<div>Bad Access</div>`
        setTimeout(() => {
            history.back()
        }, 2000);
    } else {
        fetch(serverAddress + '/user/mypage', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            return response.json()
        })
        .then(data => {
            console.log(data)
            updateUserInfo(data);
            createCodeButtons(data.leaderBoards);
        })
        .catch(error => console.error('Error:', error));
    }
});

// 사용자 정보 업데이트
function updateUserInfo(data) {
    document.querySelector('.nickname').innerText = data.nickname;
    var smallTextElements = document.querySelectorAll('.small-text');
    if (smallTextElements.length >= 2) {
        smallTextElements[0].innerText = 'ID: ' + data.loginId;
        smallTextElements[1].innerText = 'ROLE: ' + data.role;
    }
}

// 코드 엔티티에 대한 버튼 생성
function createCodeButtons(leaderboards) {
    codeList = leaderboards
    var codeboxesContainer = document.getElementById('code-buttons');
    leaderboards.forEach(board => {
        var row = document.createElement('div');
        row.style.display = "flex"
        codeboxesContainer.appendChild(row);
        var codebox = document.createElement('div');
        row.appendChild(codebox);
        codebox.classList.add('code')
        codebox.innerText = '[Code ' + board.leaderBoardId + ']';
        codebox.style.width = "90%"
        codebox.style.margin = "5px"
        codebox.addEventListener('click', function(){
            this.classList.toggle("show")
            if(this.classList.contains("show")){
                this.innerHTML += `<pre><code style ="white-space: pre-wrap;overflow-wrap: break-word;"></code></pre>`
                this.querySelector('code').innerText = board.code                   
            } else {
                this.querySelector('pre').remove()
            }
            event.stopPropagation()
        })
        var regButton = document.createElement('button')
        regButton.classList.add("reg-btn")
        regButton.innerText = '등록'
        regButton.addEventListener('click', registerCode)
        codebox.insertAdjacentElement('afterend', regButton)*/
        /*var delButton = document.createElement('button')
        delButton.style.cssText = `
            color: #fff;
            font-size: 20px;
            cursor: pointer;
            border: none;
            background-color: transparent;`
        delButton.classList.add('close')
        delButton.innerText = '&#215;';
        delButton.addEventListener('click', deleteCode)  
        codebox.insertAdjacentElement('afterend', delButton)*//*
    });
}
function registerCode(){
    var conf = confirm("이 코드를 등록할까요?")
    var str = this.previousElementSibling.innerText
    let matches = str.match(/\[Code (\d+)\]/);
    let codeNumber
    if (matches) {
        codeNumber = parseInt(matches[1], 10);
    } else {
        console.log("No code number found");
        return
    }
    var token = sessionStorage.getItem('jwtToken')
    if(conf){
        fetch(serverAddress+"/user/updateRanking/"+codeNumber,{
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
        .then((response)=>{
            if(!response.ok){
                throw new Error(response.status)
            }
            console.log("등록 완료!")
        })
        .catch((error) => {
            console.log('Error', error)
        })      
    }
}
function deleteCode(){
    var conf = confirm("이 코드를 삭제할까요?")
    if(conf){
        this.parentNode.parentNode.remove()
        //fetch(삭제~~)
    }
}
function deleteAccount(){}*/