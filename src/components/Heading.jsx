import React from "react";

function Heading(props)
{
 return <>
        <div className="trans-heading">
            <div>Total Expenses:</div>
            <div>{props.item} rupee</div>
        </div>
 </>

}


export default Heading;