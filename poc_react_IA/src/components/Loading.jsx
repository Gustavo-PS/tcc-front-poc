import React from 'react'
import ReactLoading from "react-loading";

import "./Loading.css"

const Loading = () => {
    return (
        <div className='loading'>
            <ReactLoading type="bubbles" color="#0a516d"
                height={150} width={100} />
        </div>
    )
}

export default Loading