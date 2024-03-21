import MainPage from "views/MainPage"
import Docs from "views/Docs"
import Login from "views/Login"
import User from "views/User"
import { useState } from "react"

export default function App(){
    const [page, setPage] = useState('main')
    let pageContent
    if (page === 'main')
        pageContent = <MainPage setPage={setPage}/>;
    else if (page === 'docs') {
        pageContent = <Docs />
    } else if (page === 'login') {
        pageContent = <Login />
    } else if (page === 'user-page'){
        pageContent = <User setPage={setPage} />
    } else
        pageContent = <MainPage setPage={setPage}/>;
    return(
        <div className={page}>
            {pageContent}
        </div>
    )

}