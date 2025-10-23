import React, { useEffect, useState } from "react";
import heroBanner from "../../assets/hero_img.jpg";
import bgImg from "../../assets/h1_hero.jpg";
import { useNavigate } from "react-router-dom";
import banner1 from "../../assets/banner1.jpg";
import banner2 from "../../assets/banner2.webp";
// import banner3 from "../../assets/banner3.jpg";
// import banner3 from "../../assets/banner4.jpg"
import banner3 from "../../assets/banner6.png"

const images = [banner1, banner2, banner3];

const Banner = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleStarted = () => {
    navigate("/signup");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
      {/* <div className="relative grid grid-cols-1 min-h-[60vh] md:min-h-[80vh] overflow-hidden">
        <img
          src={images[currentIndex]}
          className="w-full h-[60vh] md:h-[80vh] lg:h-[100vh] object-cover
   transition-all duration-1000 ease-in-out"
        />
      </div>
      <div className="w-full  flex justify-center bg-red-500 hover:bg-red-600 cursor-pointer transition " onClick={handleStarted}>
        <button
          
          className="text-base sm:text-lg md:text-xl px-4 sm:px-6 py-2 rounded-lg sm:rounded-xl text-white font-bold cursor-pointer"
        >
          GET STARTED
        </button>
      </div> */}


  
<div className="w-full">
      <div className="relative w-full aspect-[16/9] overflow-hidden">
        <img
          src={images[currentIndex]}
          alt="slider"
          className="w-full h-full object-cover transition-all duration-1000 ease-in-out"
        />
      </div>

      <div className="w-full flex justify-center py-4 bg-red-500 hover:bg-red-600 transition">
        <button
          onClick={handleStarted}
          className="text-sm sm:text-base md:text-lg lg:text-xl px-4 sm:px-6 md:px-8 py-2 rounded-lg sm:rounded-xl text-white font-bold"
        >
          APPLY LOAN
        </button>
      </div>
    </div>


    </>
  );
};

export default Banner;
