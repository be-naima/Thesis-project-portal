

const About = () => {
    return (
        <div>
            <section className="bg-white py-16 px-4 md:px-20 flex flex-col md:flex-row items-center justify-between">
                <div className="text-content md:w-1/2">
                    <p className="text-red-500 uppercase mb-2">Since 1998</p>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Each Flavor Has a Tale</h2>
                    <p className="text-gray-600 mb-4">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </p>
                    <p className="text-gray-600 mb-6">
                        It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                    </p>
                    <button className="bg-green-500 text-white py-2 px-6 rounded-full hover:bg-green-600">
                        Book Through Call +1234 567 8910
                    </button>
                </div>

                <div className="image-content md:w-1/2 mt-8 md:mt-0 flex justify-center ">
                    {/* <div className="circle bg-orange-100 p-8 rounded-full absolute top-0 right-10">
                        <span className="text-sm text-orange-500 uppercase">
                            Quality Food - Best Environment
                        </span>
                        <p className="text-center text-black mt-2">Since 1989</p>
                    </div> */}
                    <div className="relative">
                        <img
                            className="rounded-full shadow-lg w-64 h-80 object-cover"
                            src="/images/thesis.jpg"
                            alt="Enjoying Food"
                        />
                        <img
                            className="rounded-full  w-48 h-64 object-cover absolute -bottom-12 -left-32"
                            src="/images/bulb.jpg"
                            alt="Delicious Dish"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;