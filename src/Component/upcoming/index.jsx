import adImg from "../../assets/toto-ad.png";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const Upcoming = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <section className="pt-20 w-full font-[Poppins] bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="min-h-screen flex flex-col items-center justify-center px-4 relative">
        <button
          onClick={handleBack}
          className="absolute top-8 left-6 flex items-center gap-2 text-gray-700 hover:text-blue-600 transition duration-300 font-medium"
        >
          <FiArrowLeft className="text-lg" />
          Back
        </button>

        <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl p-8 border border-gray-200 transition-transform duration-500 hover:-translate-y-2 hover:shadow-2xl">
          <h1 className="text-2xl md:text-3xl font-semibold text-center text-gray-800 mb-5">
            🚧 Coming Soon 🚧
          </h1>
          <p className="text-center text-gray-500 mb-8">
            We’re working hard to bring you something amazing. Stay tuned!
          </p>

          <div className="overflow-hidden rounded-2xl">
            <img
              src={adImg}
              alt="Upcoming feature"
              className="w-full h-full transform transition duration-500 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Upcoming;
