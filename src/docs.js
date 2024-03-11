import { useEffect } from "react";

export default function Docs(){
    useEffect(() => {
        //head
        document.title = 'API Documentation'

        const styleSheet = document.createElement('link')
        styleSheet.rel = 'stylesheet'
        styleSheet.href = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/styles/monokai.min.css"
        document.head.appendChild(styleSheet)

        const cloudflare = document.createElement('script')
        cloudflare.src = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/highlight.min.js"
        document.head.appendChild(cloudflare)

        const highlighting = document.createElement('script')
        highlighting.content = 'hljs.initHighlightingOnLoad();'
        document.head.appendChild

        const styleElement = document.createElement('style')
        styleElement.content = `
        body {
            font-family: Arial, sans-serif;
            background-color: rgb(1, 7, 29);
            color: #ffffff;
            padding: 20px;
        }
        a:link, a:visited {
            color: #4DAF7C; 
        }
        a:hover, a:active {
            color: #D9853B;
        }
        .api-function {
            border: 1px solid #444;
            background-color: #0a1f44;
            padding: 15px;
            margin-bottom: 20px;
        }
        .function-title {
            font-size: 20px;
            color: #FFD700;
        }
        .function-description, .function-example {
            font-size: 16px;
            color: #B0C4DE;
        }
        ::-webkit-scrollbar {
            display: none;
        }
        .desc {
            text-align: center;
        }`
        document.head.appendChild(styleElement)

        return() => {
            document.title = ''
            document.head.removeChild(styleSheet)
            document.head.removeChild(cloudflare)
            document.head.removeChild(highlighting)
            document.head.removeChild(styleElement)
        }
    }, [])

    return(
        <div>
            <div class="desc">
                <h1>CodeMos API Documentation</h1>    
                <div>
                CodeMos는 추락하는 우주선을 안전하게 착륙시키는 게임입니다.<br/>
                어떠한 상황에서도 안전하게 착륙하는 알고리즘을 작성해보세요.<br/>
                </div>
            </div>
        </div>
    )
}