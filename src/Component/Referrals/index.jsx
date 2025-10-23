import axios from "axios";
import React, { useEffect, useState } from "react";

export const Referral = () => {
  const [referrals, setReferrals] = useState([]);
  const [amount, setAmount] = useState("");
  const token = localStorage.getItem("loanToken");
  const userId = localStorage.getItem("userId");

  const getAmount = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_BASE_URL}api/admin/refer-amount`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAmount(response.data.amount);
      console.log(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    getAmount();
  }, []);

  useEffect(() => {
    if (!token || !userId) return;

axios
axios
  .get(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/referrals/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  .then((res) => {
    console.log(res.data); // Check structure
    setReferrals(Array.isArray(res.data) ? res.data : res.data.referrals || []);
  })
  .catch((err) => console.error(err));


  }, [token, userId]);

  return (
    <div className="p-4 mt-20">
      <h2 className="text-2xl font-semibold mb-4">Referral List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left border-b border-gray-200">
                S.No
              </th>
              <th className="py-2 px-4 text-left border-b border-gray-200">
                Name
              </th>
              <th className="py-2 px-4 text-left border-b border-gray-200">
                Email
              </th>
            </tr>
          </thead>
          {referrals?.length ? (
            <tbody>
              {referrals.map((referral, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b border-gray-200">
                    {index + 1}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {referral.name}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {referral.email}
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td
                  colSpan={2}
                  className="py-2 px-4 border-b border-gray-200 text-center w-full text-gray-500"
                >
                  No Record Found
                </td>
              </tr>
            </tbody>
          )}
        </table>

        {referrals?.length > 0 && (
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-md text-center">
            <p className="text-lg font-semibold text-gray-700">
              🎉 Your Total Referral Bonus:{" "}
              <span className="text-blue-600 text-xl font-bold">
                ₹ {amount * referrals.length}
              </span>
            </p>
            <p className="text-sm text-gray-600 mt-1">
              You will receive this amount in your account within{" "}
              <span className="font-medium text-gray-800">7 days</span>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};




