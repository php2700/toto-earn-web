import React from "react";
import { Check } from "lucide-react";
// import whyChoose from "../../assets/whyChoose.webp"
import whyChoose from "../../assets/whyChoose.png"


const WhyChoose = () => {
      return (
            <section className="py-16 bg-white">
                  <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                              <p className="text-[#0C3B57] text-xl font-medium mb-2">
                                    Why Choose Our Company
                              </p>
                              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                    Loan Approval in Seconds
                              </h2>
                              {/* <p className="text-gray-600 mb-6">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam, quis nostrud.
                              </p> */}

                              <ul className="space-y-4">
                                    {[
                                          "Get Upto ₹5 Lakh Instantly",
                                          " 100% Online Paperless Process",
                                          "No Salary Slip or CIBIL Needed",
                                          "Minimum Documents Required",
                                          "Student, Job Holder, Business – All Eligible",
                                          "24x7 Loan Application Available",
                                          "Secure & Trusted Platform"
                                    ].map((item, idx) => (
                                          <li
                                                key={idx}
                                                className="flex items-center gap-3 text-gray-700"
                                          >
                                                <Check className="text-[#0C3B57] w-5 h-5" />
                                                {item}
                                          </li>
                                    ))}
                              </ul>
                        </div>
                        <div className="relative">
                              <img
                                    src={whyChoose}
                                    alt="Business professional"
                                    className="rounded-lg shadow-md "
                              />
                              <div className="absolute top-1/2 -right-10 transform -translate-y-1/2 bg-[#0C3B57] text-white px-4 py-2 rotate-90 font-bold text-lg tracking-wide">
                                    SINCE 1995
                              </div>
                        </div>
                  </div>
            </section>
      );
};

export default WhyChoose;
