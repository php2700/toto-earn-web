import React, { useState } from "react";
import { Home, Phone, Mail } from "lucide-react";
import bgImg from "../../assets/h1_hero.jpg";
import axios from "axios";
import contactImg from "../../assets/contact.jpg";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    console.log(e.target, "aaa");
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData, "ghghggh");
    if (!formData.message.trim()) {
      setError("Message is required");
      setSuccess("");
      return;
    }
    if (!formData.name.trim()) {
      setError("Name is required");
      setSuccess("");
      return;
    }
    if (!formData.email.trim()) {
      setError("Email is required");
      setSuccess("");
      return;
    }

    if (!formData.subject.trim()) {
      setError("Subject is required");
      setSuccess("");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_API_BASE_URL}api/user/contact`,
        formData
      );
      setSuccess("Message sent successfully!");
      setError("");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send message");
      setSuccess("");
    }
  };

  return (
    <section className="pt-16 w-full">
      <div
        className="h-[50vh] bg-grid"
        // style={{ backgroundImage: `url(${bgImg})` }}
      >
        {/* <h1 className="text-6xl font-bold text-gray-800">Contact Us</h1> */}
        <img src={contactImg} className="w-full h-full" />
      </div>
      <div className="bg-gray-200 p-20">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-[#0C3B57] mb-6">
              Get in Touch
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
                  {error}
                </div>
              )}
              {success && (
                <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">
                  {success}
                </div>
              )}
              <textarea
                name="message"
                placeholder="Enter Message"
                value={formData.message}
                onChange={handleChange}
                className="w-full border border-[#0C3B57] rounded-md p-3 focus:ring-2 focus:ring-[#0C3B57] outline-none h-32"
              ></textarea>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-[#0C3B57] rounded-md p-3 focus:ring-2 focus:ring-[#0C3B57] outline-none"
                />
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full border border-[#0C3B57] rounded-md p-3 focus:ring-2 focus:ring-[#0C3B57] outline-none"
                />
              </div>

              <input
                name="subject"
                type="text"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Enter Subject"
                className="w-full border border-[#0C3B57] rounded-md p-3 focus:ring-2 focus:ring-[#0C3B57] outline-none"
              />

              <button
                type="submit"
                className="px-6 py-3 border border-[#0C3B57] text-[#0C3B57] cursor-pointer font-medium rounded-md hover:bg-blue-500 hover:text-white transition"
              >
                SEND
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <Home className="w-6 h-6 text-gray-600" />
              <div>
                <h4 className="font-semibold text-gray-900">
                  Buttonwood, California.
                </h4>
                <p className="text-gray-600">Rosemead, CA 91770</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="w-6 h-6 text-gray-600" />
              <div>
                <h4 className="font-semibold text-gray-900">+1 253 565 2365</h4>
                <p className="text-gray-600">Mon to Fri 9am to 6pm</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-gray-600" />
              <div>
                <h4 className="font-semibold text-gray-900">
                  support@colorlib.com
                </h4>
                <p className="text-gray-600">Send us your query anytime!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
