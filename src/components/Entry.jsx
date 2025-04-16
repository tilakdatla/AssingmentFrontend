import React from "react";

function Entry(props)
{
  return <>
        <div className="entry-div">
            <div className="name">{props.name}</div>
            <div>
              <input onChange={(e)=>{
                 props.setValue(e.target.value)
              }} value={props.value} placeholder={props.placeholder} type="text"/>
            </div>
        </div>
  </>
}

export default Entry;