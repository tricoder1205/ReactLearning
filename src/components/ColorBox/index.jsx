import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import './ColorBox.scss'

ColorBox.propTypes = {

};

function getRandomColor() {
    const colorList = ['red', 'green', 'blue', 'yellow', 'orange'];
    const randomIndex = Math.trunc(Math.random() * 5);
    return colorList[randomIndex];
}


function ColorBox() {

    const [color, setColor] = useState(() => {
        const initColor = localStorage.getItem('box-color') || 'deeppink';
        return initColor;
    });

    function handleBoxClick() {
        const newColor = getRandomColor();

        setColor(newColor);
        localStorage.setItem('box-color', newColor);
    }

    return (
        <div>
            <div
                className="color-box"
                style={{ backgroundColor: color }}
                onClick={handleBoxClick}
            >
            </div>
        </div>
    );
}

export default ColorBox;