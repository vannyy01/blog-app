import React from 'react';
import {Parallax} from 'react-parallax';


const insideStyles = {
    fontSize: 36,
    color: 'White',
    fontWeight: 700,
    padding: 20,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)'
};
const image = "https://get.pxhere.com/photo/people-night-crowd-concert-audience-cheering-lights-stage-performance-experience-event-rock-concert-applaud-musical-theatre-914452.jpg";

const Row = () => {
    return (
        <div style={{
            fontFamily: 'sans-serif',
            textAlign: 'center',
        }}>
            <Parallax bgImage={image} blur={{min: -1, max: 5}}>
                <div style={{height: 500}}>
                    <div style={insideStyles}>Stud-blog.loc</div>
                </div>
            </Parallax>
        </div>
    )
};

export default Row