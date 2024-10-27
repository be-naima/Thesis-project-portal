import { Slide } from 'react-awesome-reveal';

const About = () => {
    return (
        <div>
            <section className="bg-white py-8 px-4 md:px-20 flex flex-col md:flex-row items-center justify-between mt-24">
                
                    <div className="text-content md:w-1/2 md:pr-8">
                    <Slide direction="up">
                        <p className="text-red-500 uppercase mb-2">Since 1995</p>
                        <h2 className="text-3xl mb-6  custom-heading font-extrabold sm:text-4xl md:text-5xl lg:text-5xl">About</h2>
                        <p className="text-gray-600 mb-2 text-justify">
                            Welcome to the Thesis & Project Portal—your companion on the journey from idea to accomplishment. Here, we turn complex academic processes into a seamless online experience, guiding you from the selection of a supervisor to the final stages of defense. Our platform is designed to empower students, providing the tools and support needed to bring their research to life.
                        </p>
                        <p className="text-gray-600 mb-4 text-justify" >
                            With a few clicks, connect with expert supervisors, submit proposals, track your progress, and prepare for your pre-defense and final defense sessions—all in one place. Whether you’re navigating through feedback or submitting crucial documents, we ensure a smooth, organized, and stress-free experience.
                            Let us help you turn your vision into reality, guiding you toward academic success, every step of the way.
                        </p>
                        
                        </Slide>
                    </div>
               

                    <div className="image-content md:w-1/2 flex justify-center">
                    <div className="relative">
                        <img
                            className="rounded-full shadow-lg w-64 h-80 object-cover"
                            src="/images/thesis.jpg"
                            alt="Thesis"
                        />
                        <img
                            className="rounded-full w-48 h-64 object-cover absolute -bottom-8 -left-12 md:-left-16"
                            src="/images/bulb.jpg"
                            alt="Bulb"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
