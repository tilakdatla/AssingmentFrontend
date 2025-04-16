import React from "react";

function Trans(props)
{
 return <>
    <div className="detail">
            <div>{props.name} : </div>
            <div className="entry">{props.item}</div>
    </div>
 </>
}

export default Trans;