import React from "react";
import quoteImg from "../../assets/quote.png";

const QuoteCard = () => {
      return (
            <div className="bg-[#0C3B57] min-h-screen flex items-center justify-center text-white">
                  <div className="text-center p-6 max-w-2xl mx-auto">
                        <div className="text-4xl   mb-4">
                              <img src={quoteImg} />
                        </div>

                        <p className="text-3xl">
                              Logisti Group is a representative logistics
                              operator providing full range of ser of customs
                              clearance and transportation worl.
                        </p>
                        <div className="flex items-center justify-center mt-6">
                              <img
                                    src="https://randomuser.me/api/portraits/men/45.jpg"
                                    alt="Jessya Inn"
                                    className="rounded-full mr-4"
                              />
                              <div>
                                    <p className="font-semibold">Jessya Inn</p>
                                    <p className="text-sm font-bold text-gray-400">
                                          Co Founder
                                    </p>
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default QuoteCard;
