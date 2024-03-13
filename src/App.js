import MainPage from "components/MainPage"
import Docs from "components/Docs"
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
    } else
        return(
            <div className={page}>
                <MainPage setPage={setPage}/>
            </div>
        )

}