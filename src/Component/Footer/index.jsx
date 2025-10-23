import React from "react";
import { useNavigate } from "react-router-dom";
import logo1 from "../../assets/logo1.png";

function Footer() {
  const navigte = useNavigate();
  const handleContact = () => {
    navigte("/contact");
  };

  const handleUrl = (getUrl) => {
    navigte(`/${getUrl}`);
  };
  return (
    <div className="w-full bg-gray-900 text-white">
      <header className="p-6 max-w-6xl mx-auto"></header>

      <div className="px-6 md:px-20 py-10">
        <nav className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
          <div>
            <div className="h-12 ">
              <img src={logo1} className="h-full object-contain " />
            </div>

            <p className="mt-2 text-gray-400 max-w-xl">
              Heaven fruitful doesn't over lesser days. Creeping seasons so
              behold bearing.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Quick Link</h2>
            <ul className="space-y-2 text-gray-400">
              <li
                onClick={() => handleUrl("")}
                className="hover:text-white cursor-pointer"
              >
                Welcome
              </li>
              <li
                onClick={() => handleUrl("services")}
                className="hover:text-white cursor-pointer"
              >
                Our Solutions
              </li>
              <li
                onClick={() => handleUrl("faq")}
                className="hover:text-white cursor-pointer"
              >
                Help Center
              </li>
              <li
                onClick={() => handleUrl("contact")}
                className="hover:text-white cursor-pointer"
              >
                Get in Touch
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Support</h2>
            <ul className="space-y-2 text-gray-400">
              <li
                className="hover:text-white cursor-pointer"
                onClick={() => handleUrl("term-condition")}
              >
                Terms & Conditions
              </li>
              <li
                className="hover:text-white cursor-pointer"
                onClick={() => handleUrl("privacy-policy")}
              >
                Privacy Policy
              </li>
             
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Get In touch</h2>
            <div className="text-gray-400 my-4">
              Have any questions or need assistance? Reach out to us and our
              team will get back to you promptly.
            </div>
            <button
              onClick={handleContact}
              className="border font-bold rounded-md px-6 py-2 cursor-pointer text-white bg-[#0C3B57]"
            >
              Contact
            </button>
          </div>
        </nav>
      </div>

      <footer className="p-6 border-t border-gray-700 text-center text-gray-500">
        <p>Copyright ©2025 All rights reserved</p>
      </footer>
    </div>
  );
}

export default Footer;
