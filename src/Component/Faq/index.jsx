import { useState } from "react";
import bgImg from "../../assets/h1_hero.jpg";
import faqImg  from "../../assets/faq.webp"
import heroBanner from "../../assets/hero_img.jpg";

export default function Faq() {
      const [openIndex, setOpenIndex] = useState(null);
    const faqs = [
  {
    question: "What is Toto-Earn?",
    answer: "Toto-Earn is a reward platform where you can earn money by completing simple tasks, inviting friends.",
  },

  {
    question: "How do referrals work on Toto-Earn?",
    answer: "You’ll receive a unique referral link or code. When your friends join using your referral, you earn bonus rewards for each successful signup or activity.",
  },
  {
    question: "When will I receive my earnings?",
    answer: "Earnings are credited to your wallet instantly or within 24 hours after task completion or referral verification.",
  },
  {
    question: "Is Toto-Earn free to use?",
    answer: "Yes! Joining and using Toto-Earn is completely free. You just need to perform tasks or refer others to start earning.",
  },
  {
    question: "How can I withdraw my earnings?",
    answer: "You can withdraw your earnings directly to your UPI, Paytm, or bank account once you reach the minimum withdrawal limit.",
  },
  {
    question: "Can I use Toto-Earn on my mobile?",
    answer: "Absolutely! Toto-Earn is mobile-friendly and works smoothly on all smartphones and browsers.",
  },
];


      const toggleFAQ = (index) => {
            setOpenIndex(openIndex === index ? null : index);
      };
      return (
            <section className="pt-16 w-full">
                  <div className="h-[50vh] w-full">
  <img src={faqImg} className="h-full object-cover w-full" />
</div>

                  <div className="bg-gray-200 ">
                        <div className="container mx-auto py-12">
                              <div className="text-center mb-8">
                                    <h2 className="text-3xl font-bold text-[#0C3B57]">
                                          Our FAQs
                                    </h2>
                                    <h3 className="text-xl text-gray-600">
                                          FAQ FOR INQUIRY
                                    </h3>
                                    <p className="text-gray-500 max-w-2xl mx-auto mt-2">
                                          Here are some of the most common
                                          questions our customers ask. If you
                                          still have doubts, feel free to reach
                                          out to us anytime!
                                    </p>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
                                    <div className="flex justify-center">
                                          <img
                                                src={heroBanner}
                                                alt="FAQ illustration"
                                                className="rounded-lg shadow-lg w-full h-auto object-cover"
                                          />
                                    </div>
                                    <div className="space-y-4">
                                          {faqs.map((faq, index) => (
                                                <div
                                                      key={index}
                                                      className="border rounded-lg p-4 shadow-sm"
                                                >
                                                      <h4
                                                            className="font-semibold text-lg cursor-pointer flex justify-between items-center"
                                                            onClick={() =>
                                                                  toggleFAQ(
                                                                        index
                                                                  )
                                                            }
                                                      >
                                                            {faq.question}
                                                            <span className="ml-2">
                                                                  {openIndex ===
                                                                  index
                                                                        ? "−"
                                                                        : "+"}
                                                            </span>
                                                      </h4>

                                                      {openIndex === index && (
                                                            <p className="text-gray-600 mt-2">
                                                                  {faq.answer}
                                                            </p>
                                                      )}
                                                </div>
                                          ))}
                                    </div>
                              </div>
                        </div>
                  </div>
            </section>
      );
}
