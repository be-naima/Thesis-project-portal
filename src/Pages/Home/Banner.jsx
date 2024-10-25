import React, { useState, useEffect } from 'react';
import '../../assets/custom css/custom.css';
import { Slide } from 'react-awesome-reveal';

const Banner = () => {
    const [currentSlide, setCurrentSlide] = useState(0);


    const slides = [
        { url: 'bd1.jpg', alt: 'University Building 1' },
        { url: 'bd2.jfif', alt: 'University Building 2' },
        { url: 'bd3.webp', alt: 'University Building 3' }
    ];


    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
        }, 5000);
        return () => clearInterval(interval);
    }, [slides.length]);

    return (
        <div className='mb-44'>
            <div className="flex flex-col sm:flex-row w-full h-screen">

                <div className="relative w-full sm:w-1/2 h-1/2 sm:h-full overflow-hidden">
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === index ? 'opacity-100' : 'opacity-0'}`}
                        >
                            <img src={slide.url} alt={slide.alt} className="object-cover w-full h-full" />
                        </div>
                    ))}
                </div>


                <div className="flex flex-col items-center justify-center w-full sm:w-1/2 h-1/2 sm:h-full text-center bannerColor text-indigo-700 p-8">
                   <Slide direction="right" > <h1 className="text-3xl custom-heading font-extrabold sm:text-4xl md:text-5xl lg:text-5xl animate-slideInRight">
                        THESIS PROJECT HUB
                    </h1></Slide>
                    <Slide direction="right" ><h4 className="mt-4 text-bold sm:text-base md:text-lg lg:text-xl sub-heading animate-slideInRight">
                        Effortless Submission for Your <br /> Academic Research
                    </h4></Slide>
                    <Slide direction="right" > <div className="mt-8 flex space-x-4">
                    <button className="px-6 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-800 animate-slideInRight">
                            Explore Thesis/Projects
                        </button>
                        <button className="px-6 py-2 font-semibold text-white bg-green-700 rounded-md hover:bg-green-800 animate-slideInRight">
                            Submit Your Thesis/Projects
                        </button>
                    </div> </Slide>
                </div>
            </div>


            <div className="relative z-20 flex flex-col items-center justify-center mt-10 space-y-4 bg-transparent sm:flex-row sm:space-x-4 sm:space-y-0 sm:-mt-16">

            <Slide direction="left" > <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg text-center h-72 sm:h-80 border-t-8 border-indigo-500 animate-slideInRight">
                    <h3 className="text-xl font-bold">Why Choose Our Thesis Portal</h3>
                    <p className="mt-2 text-gray-600">Streamline your research journey with our easy-to-use platform. Whether you’re uploading, reviewing, or collaborating on thesis projects, our portal is designed to help students and faculty manage academic research with ease and efficiency.</p>
                </div> </Slide>


                <Slide direction="right" ><div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg text-center h-72 sm:h-80 border-t-8 border-indigo-500 animate-slideInBottom">
                    <h3 className="text-xl font-bold">Thesis Guidelines</h3>
                    <p className="mt-2 text-gray-600">Access comprehensive thesis submission guidelines, format instructions, and best practices. Ensure your thesis meets the university’s standards with clear, concise directions and resources.</p>
                </div></Slide>


                <Slide direction="right" ><div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg text-center h-72 sm:h-80 border-t-8 border-indigo-500 animate-slideInRight">
                    <h3 className="text-xl font-bold">Start Your Submission</h3>
                    <p className="mt-2 text-gray-600">Ready to submit your thesis? Use our secure and intuitive submission process to upload your work, track its progress, and receive feedback from advisors and reviewers.</p>
                </div></Slide>
            </div>
        </div>
    );
};

export default Banner;
