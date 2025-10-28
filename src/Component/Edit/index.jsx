import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../Store/userSlice";

export const Edit = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("totoToken");
  const { userData } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    upiId: "",
    walletAmount: 0,
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState();

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        upiId: userData.upiId || "",
        walletAmount: userData.walletAmount || 0,
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    setError("");
    setMessage("");
    e.preventDefault();
    if (!formData.name.trim() || !formData.upiId.trim()) {
      setError("Name and UPI ID are required!");
      return;
    }

    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_APP_API_BASE_URL}api/user/edit`,
        {
          userId: userData._id,
          name: formData.name,
          upiId: formData.upiId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(response.data.message || "Profile updated successfully!");
      dispatch(fetchUserData());
    } catch (error) {
      setError(
        error.response?.data?.message || "Something went wrong. Try again."
      );
    }
  };

  return (
    <div className="container mx-auto max-w-lg px-6 py-10 mt-20 bg-white shadow-lg rounded-xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Edit Profile
      </h2>

      {message && (
        <p className="text-center text-sm text-green-600 mt-4">{message}</p>
      )}
      {error && (
        <p className="text-center text-sm text-red-600 mt-4">{error}</p>
      )}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="w-full bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 text-gray-500 cursor-not-allowed"
            value={formData.email}
            readOnly
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            UPI ID
          </label>
          <input
            type="text"
            name="upiId"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={formData.upiId}
            onChange={handleChange}
            placeholder="example@upi"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Wallet Amount
          </label>
          <input
            type="text"
            name="walletAmount"
            className="w-full bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 text-gray-500 cursor-not-allowed"
            value={`₹ ${formData.walletAmount}`}
            readOnly
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition duration-200"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};
