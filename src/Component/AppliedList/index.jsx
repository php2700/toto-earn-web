import axios from "axios";
import React, { useEffect, useState } from "react";

export const Applied = () => {
  const [appliedData, setAppliedData] = useState([]);
  const token = localStorage.getItem("totoToken");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!token || !userId) return;

    axios
      .get(
        `${
          import.meta.env.VITE_APP_API_BASE_URL
        }api/user/transaction-list/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setAppliedData(res?.data?.data);
      })
      .catch((err) => console.error(err));
  }, [token, userId]);

  return (
    <div className="p-4 mt-20 container mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Transaction List </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left border-b border-gray-200">
                S.No
              </th>
              <th className="py-2 px-4 text-left border-b border-gray-200">
                Account Holder Name
              </th>

              <th className="py-2 px-4 text-left border-b border-gray-200">
                Withdraw Request
              </th>
              <th className="py-2 px-4 text-left border-b border-gray-200">
                IFSC Code
              </th>
              <th className="py-2 px-4 text-left border-b border-gray-200">
                Transaction Status
              </th>
              <th className="py-2 px-4 text-left border-b border-gray-200">
                Created Date
              </th>
            </tr>
          </thead>
          {appliedData?.withdraw?.length ? (
            <tbody>
              {appliedData?.withdraw?.map((apply, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b border-gray-200">
                    {index + 1}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {apply.bankAccountName ? apply.bankAccountName : "N/A"}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {apply.amount ? apply.amount : "N/A"}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {apply.ifscCode ? apply.ifscCode : "N/A"}
                  </td>
                  <td
                    className={`py-2 px-4 border-b border-gray-200 ${
                      apply.isAccept === "Accepted"
                        ? "text-green-500"
                        : apply.isAccept === "Rejected"
                        ? "text-red-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {apply.isAccept === "Accepted"
                      ? "Completed"
                      : apply.isAccept === "Rejected"
                      ? "Rejected"
                      : "Pending"}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {new Date(apply.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td
                  colSpan={7}
                  className="py-4 px-4 text-center border-b border-gray-200 text-gray-500"
                >
                  No Record Found
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};
