import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loading = ({size = 100}) => {
    return (
        <div
        style={{
             display:"flex",
             justifyContent:"center",
             alignItems:"center",
             height:"100%",
             width:"100%"
        }}
        
        >
             <Spinner 
               animation="border"
                style={{
                    width:size,
                    height:size,
                }}

             
             />

        </div>
    )
}

export default Loading
