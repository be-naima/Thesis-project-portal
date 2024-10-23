import React, { useState } from 'react';

const slides = [
  {
    image: '/path-to-your-image1.jpg',
    title: 'The most anticipated ceremony of the Graduates',
    description: '10th Convocation of Daffodil International University held on 9th February, 2023',
  },
  {
    image: '/path-to-your-image2.jpg',
    title: 'Empowering Education for the Future',
    description: 'Join our innovative courses and start your journey towards excellence.',
  },
  {
    image: '/path-to-your-image3.jpg',
    title: 'Inspiring Success in Every Step',
    description: 'Our graduates are shaping the future, one milestone at a time.',
  }
];

const Banner2 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="relative w-full h-screen">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${slide.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>

          {/* Slide Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{slide.title}</h1>
            <p className="text-lg md:text-xl mb-6">{slide.description}</p>
            <button className="bg-blue-600 hover:bg-blue-700 transition-colors duration-300 text-white font-semibold py-2 px-4 rounded-md">
              Read More
            </button>
          </div>
        </div>
      ))}

      {/* Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 focus:outline-none"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 focus:outline-none"
      >
        &#10095;
      </button>
    </div>
  );
};

export default Banner2;
