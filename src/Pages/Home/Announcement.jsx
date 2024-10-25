import React from 'react';
import '../../assets/custom css/custom.css';
import { Slide } from 'react-awesome-reveal';

const Announcement = () => {
    return (
        <Slide direction="up"  >
            <h1 className="text-3xl mb-12 text-center custom-heading font-extrabold sm:text-4xl md:text-5xl lg:text-5xl animate-slideInBottom">
            Announcement
            </h1>
            <div className="announcement">
                <div className="thesis-date ">THESIS DATE</div>
                <button className="date-button ">12/10/2024</button>
            </div>
        </Slide>
    );
};

export default Announcement;
