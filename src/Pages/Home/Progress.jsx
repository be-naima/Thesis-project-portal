import { Slide } from 'react-awesome-reveal';

const Progress = () => {
    return (
        <div className="bg-white p-8 rounded-lg max-w-4xl mx-auto mt-24">
            <h2 className="text-3xl mb-12 text-center custom-heading font-extrabold sm:text-4xl md:text-5xl lg:text-5xl">My Progress</h2>

            <div className="flex flex-col md:flex-row">
                {/* Image Section */}
                <div className="md:w-1/2 flex justify-center md:justify-start mb-8 md:mb-0">
                    <div className="image-content flex justify-center">
                        <img
                            src="/images/grad.jpg"
                            alt="Graduation Cap and Books"
                            className="w-64 h-64 "
                        />
                    </div>
                </div>

                {/* Progress Section */}
                <div className="md:w-1/2">
                    <Slide direction="left">
                        <div className="flex items-center justify-end mb-6">
                            <span className="text-gray-700 font-semibold">Supervisor Assigned</span>
                            <div className="flex items-center">
                                <div className="bg-green-500 h-10 w-64 rounded-full text-white text-left px-4"></div>
                                <span className="text-green-500 text-2xl ml-4">✔</span>
                            </div>
                        </div>
                    </Slide>
                    <Slide direction="right">
                        <div className="flex items-center justify-end mb-6">
                            <span className="text-gray-700 font-semibold ">Proposal Submitted</span>
                            <div className="flex items-center">
                                <div className="bg-green-500 h-10 w-64 rounded-full text-white text-left px-4"></div>
                                <span className="text-green-500 text-2xl ml-4">✔</span>
                            </div>
                        </div>
                    </Slide>

                    <Slide direction="left">
                        <div className="flex items-center justify-end mb-6">
                            <span className="text-gray-700 font-semibold ">Pre-Defense Pending</span>
                            <div className="flex items-center">
                                <div className="flex">
                                    <div className="bg-yellow-400 h-10 w-32 rounded-l-full text-white"></div>
                                    <div className="bg-gray-300 h-10 w-32 rounded-r-full text-gray-500"></div>
                                </div>

                            </div>
                            <img
                                src="/images/hrglass.jpg"
                                alt="Hourglass Icon"
                                className="ml-4 w-8 h-8"
                            />
                        </div>
                    </Slide>

                    <Slide direction="right">
                        <div className="flex items-center justify-end mb-6">
                            <span className="text-gray-700 font-semibold ">Defense Date Not Published</span>
                            <div className="flex items-center ">
                                <div className="bg-gray-300 h-10 w-64 rounded-full px-4"></div>
                            </div>
                            <img
                                src="/images/cal.jpg"
                                alt="Calendar Icon"
                                className="ml-4 w-8 h-8"
                            />
                        </div>
                    </Slide>

                </div>
            </div>
        </div>
    );
};

export default Progress;
