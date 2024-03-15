import MainPage from "components/MainPage"
import Docs from "components/Docs"
import Login from "components/Login"
import { useState } from "react"

export default function App(){
    const [page, setPage] = useState('main')
    if (page === 'main')
        return(
            <div className={page}>
                <MainPage setPage={setPage}/>
            </div>
        )
    else if (page === 'docs') {
        return (
            <div className={page}>
                <Docs />
            </div>
        )
    } else if (page === 'login') {
        return (
            <div className={page}>
                <Login />
            </div>
        )
    } else
        return(
            <div className={page}>
                <MainPage setPage={setPage}/>
            </div>
        )

}