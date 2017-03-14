import React, { Component } from 'react';

const test = {
    width: '100%'
}
const Stars = (props) => {
    let val = parseFloat(props.rating);
    var size = Math.max(0, (Math.min(5, val))) * 18;
    test.width = size;
    return (
        <div className="Stars">
            <div className="Stars__empty"></div>
            <div className="Stars__filled" style={test}></div>
        </div>
    )
}

export default Stars;
