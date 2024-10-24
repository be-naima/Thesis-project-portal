import React from 'react';
import '../../assets/custom css/custom.css';

const Banner = () => {
    return (
        <div>
            <div className="relative h-screen w-screen">
    {/* YouTube Embedded Video */}
    <iframe
        className="absolute top-0 left-0 w-full h-full z-0"
        src="https://www.youtube.com/embed/QHDfe7rdtJg?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&playlist=QHDfe7rdtJg&start=77"
        title="YouTube video player"
        frameBorder="0"
        style={{ width: '100vw', height: '100vh' }}
        allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
    ></iframe>

    {/* Banner Content */}
    <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center text-white bg-black bg-opacity-60">
        <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl lg:text-5xl">
            Thesis Project Hub
            <br />
            Effortless Submission<span className="text-indigo-400"> for Your Academic Research</span>
        </h1>
        <p className="mt-4 text-sm sm:text-base md:text-lg lg:text-xl">
            Access, Manage, and Submit Your Research Projects with Ease
        </p>
        <div className="mt-8 space-y-3 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row">
    <button className="px-6 py-2 font-semibold text-white bg-indigo-500 rounded-md hover:bg-indigo-600">
        Explore Thesis/Projects
    </button>
    <button className="px-6 py-2 font-semibold text-white bg-teal-500 rounded-md hover:bg-teal-600">
        Submit Your Thesis/Projects
    </button>
</div>

    </div>
</div>





            {/* Cards Section with Overlap */}
            <div className="relative z-20 flex flex-col items-center justify-center -mt-32 space-y-4 bg-transparent sm:flex-row sm:space-x-4 sm:space-y-0 sm:-mt-16">
                {/* Card 1 */}
<div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg text-center h-72 sm:h-80 border-t-8 border-indigo-500">
    <h3 className="text-xl font-bold">Why Choose Our Thesis Portal</h3>
    <p className="mt-2 text-gray-600">Streamline your research journey with our easy-to-use platform. Whether you’re uploading, reviewing, or collaborating on thesis projects, our portal is designed to help students and faculty manage academic research with ease and efficiency.</p>
</div>


                {/* Card 2 */}
                <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg text-center h-72 sm:h-80 border-t-8 border-indigo-500">
                    <h3 className="text-xl font-bold">Thesis Guidelines</h3>
                    <p className="mt-2 text-gray-600">Access comprehensive thesis submission guidelines, format instructions, and best practices. Ensure your thesis meets the university’s standards with clear, concise directions and resources.</p>
                </div>

                {/* Card 3 */}
                <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg text-center h-72 sm:h-80 border-t-8 border-indigo-500">
                    <h3 className="text-xl font-bold">Start Your Submission</h3>
                    <p className="mt-2 text-gray-600"> Ready to submit your thesis? Use our secure and intuitive submission process to upload your work, track its progress, and receive feedback from advisors and reviewers.</p>
                </div>
            </div>
        </div>
    );
};

export default Banner;
