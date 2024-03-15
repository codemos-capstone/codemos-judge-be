import MainPage from "components/MainPage"
import Docs from "components/Docs"
import Login from "components/Login"
import User from "components/User"
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
        pageContent = <User />
    } else
        pageContent = <MainPage setPage={setPage}/>;
    return(
        <div className={page}>
            {pageContent}
        </div>
    )

}