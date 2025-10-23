import React from "react";
import {
  Briefcase,
  Building2,
  Car,
  GraduationCap,
  Home,
  HomeIcon,
  Hospital,
  ThumbsUp,
} from "lucide-react"; // icons
import serviceImg from "../../assets/our-service.jpg";

const Services = () => {
  const services = [
   {
  icon: <Briefcase size={48} className="text-[#0C3B57] mx-auto mb-4" />,
  title: "Business Loan",
  desc: "Flexible loans to support your business growth and working capital needs.",
},
{
  icon: <Building2 size={48} className="text-[#0C3B57] mx-auto mb-4" />,
  title: "Commercial Loans",
  desc: "Tailored financing options for real estate, offices, and commercial ventures.",
},
{
  icon: <Home size={48} className="text-[#0C3B57] mx-auto mb-4" />,
  title: "Construction Loans",
  desc: "Funding solutions to start, manage, or complete your construction projects.",
},
{
  icon: <ThumbsUp size={48} className="text-[#0C3B57] mx-auto mb-4" />,
  title: "Business Loan",
  desc: "Quick approvals and flexible repayment plans designed for entrepreneurs.",
}
,
    {
      icon: <Car size={48} className="text-[#0C3B57] mx-auto mb-4" />,
      title: "Vehicle Loan",
      desc: "Get quick financing for your car, bike, or commercial vehicle with easy repayment options.",
    },
    {
      icon: <GraduationCap size={48} className="text-[#0C3B57] mx-auto mb-4" />,
      title: "Education Loan",
      desc: "Support your higher studies in India or abroad with flexible and affordable education loans.",
    },
    {
      icon: <Hospital size={48} className="text-[#0C3B57] mx-auto mb-4" />,
      title: "Medical Loan",
      desc: "Cover emergency healthcare expenses and medical treatments with instant approval loans.",
    },
    {
      icon: <HomeIcon size={48} className="text-[#0C3B57] mx-auto mb-4" />,
      title: "Home Loan",
      desc: "Turn your dream home into reality with our hassle-free and low-interest home loan options.",
    },
  ];

  return (
    <section className="w-full  pt-16">
      <div className="h-[50vh] ">
        <img src={serviceImg} className="w-full object-cover h-full" />
      </div>
      <div className="bg-gray-200">
        <div className="max-w-7xl py-20 mx-auto  text-center">
          <p className="text-[#0C3B57] font-semibold text-xl mb-2">
            Services that we are providing
          </p>
          <h2 className="text-4xl font-bold text-gray-900 mb-12">
            High Performance Services <br /> For All Industries.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white shadow-xl rounded-lg p-8 hover:shadow-xl transition"
              >
                {service.icon}
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
