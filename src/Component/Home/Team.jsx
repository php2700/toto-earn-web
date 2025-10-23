import React from "react";
import { Facebook, Twitter, Globe } from "lucide-react";
import bgImgTeam from "../../assets/section_bg.jpg";
import member1 from "../../assets/teamMember1.jpg";
import member2 from "../../assets/teamMember2.jpg";
import member3 from "../../assets/teamMember3.jpg";
import member4 from "../../assets/teamMember4.jpg";

const Team = () => {
  const members = [
    {
      name: "Rahul Mehta",
      role: "Founder & CEO",
      img: member1,
    },
    {
      name: "Ankit Sharma",
      role: "Head of Operations",
      img: member2,
    },
    {
      name: "Priya Nair",
      role: "Finance & Compliance Manager",
      img: member3,
    },
    {
      name: "Karan Verma",
      role: "Technology Lead",
      img: member4,
    },
    {
      name: "Sneha Kapoor",
      role: "Customer Relations Manager",
      img: member4,
    },
  ];

  return (
    <section
      className="py-16 bg-white"
      style={{ backgroundImage: `url(${bgImgTeam})` }}
    >
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-[#0C3B57] text-xl font-medium mb-2">
          Our Loan Section Team Members
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12">
          Our professional team members.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {members.map((member, index) => (
            <div
              key={index}
              className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-lg transition"
            >
              {/* <img
                src={member.img}
                alt={member.name}
                className="w-full h-64 object-cover rounded-md"
              /> */}
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {member.name}
                </h3>
                <p className="text-sm text-gray-500">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
        {/* <p className=" text-xl font-semibold text-red-500 mt-8">
          You have to return this amount after 30 days with 2% interest.
        </p> */}
      </div>
    </section>
  );
};

export default Team;
