import React from 'react';
import {Parallax} from 'react-parallax';


const insideStyles = {
    fontSize: 36,
    color: '#000000',
    fontWeight: 700,
    padding: 20,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)'
};

const Row = (props) => {
    return (
        <div style={{
            fontFamily: 'sans-serif',
            textAlign: 'center',
        }}>
            <Parallax bgImage={props.img} blur={props.blur}>
                <div style={{height: 614}}>
                    <p style={insideStyles}>{props.text}</p>
                </div>
            </Parallax>
        </div>
    )
};

export default Row