import axios from "axios";
import React, { useEffect, useState } from "react";

export const Applied = () => {
  const [appliedData, setAppliedData] = useState([]);
  const token = localStorage.getItem("loanToken");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!token || !userId) return;

    axios
      .get(
        `${
          import.meta.env.VITE_APP_API_BASE_URL
        }api/user/applied-list/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => setAppliedData(res?.data?.loanAppliedList))
      .catch((err) => console.error(err));
  }, [token, userId]);

  return (
    <div className="p-4 mt-20">
      <h2 className="text-2xl font-semibold mb-4">Applied List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left border-b border-gray-200">
                S.No
              </th>
              <th className="py-2 px-4 text-left border-b border-gray-200">
                Full Name
              </th>
              <th className="py-2 px-4 text-left border-b border-gray-200">
                Father Name
              </th>
              <th className="py-2 px-4 text-left border-b border-gray-200">
                Mother Name
              </th>
              <th className="py-2 px-4 text-left border-b border-gray-200">
                Address
              </th>
              <th className="py-2 px-4 text-left border-b border-gray-200">
                City
              </th>
              <th className="py-2 px-4 text-left border-b border-gray-200">
                State
              </th>
              <th className="py-2 px-4 text-left border-b border-gray-200">
                Loan Amount
              </th>
              <th className="py-2 px-4 text-left border-b border-gray-200">
                Loan Type
              </th>
              <th className="py-2 px-4 text-left border-b border-gray-200">
                Gender
              </th>
              <th className="py-2 px-4 text-left border-b border-gray-200">
                Occupation
              </th>
               <th className="py-2 px-4 text-left border-b border-gray-200">
                Contact
              </th>
              <th className="py-2 px-4 text-left border-b border-gray-200">
                Account Holder
              </th>
              <th className="py-2 px-4 text-left border-b border-gray-200">
                Account Number
              </th>
              <th className="py-2 px-4 text-left border-b border-gray-200">
                IFSC Code
              </th>
              <th className="py-2 px-4 text-left border-b border-gray-200">
                Bank Name
              </th>
              <th className="py-2 px-4 text-left border-b border-gray-200">
                Branch
              </th>
              <th className="py-2 px-4 text-left border-b border-gray-200">
                Status
              </th>
              <th className="py-2 px-4 text-left border-b border-gray-200">
                Created Date
              </th>
            </tr>
          </thead>
          {appliedData?.length ? (
            <tbody>
              {appliedData.map((apply, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b border-gray-200">
                    {index + 1}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {apply.fullName}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {apply.fatherName}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {apply.motherName}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {apply.address}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {apply.city}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {apply.state}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {apply.loanAmount}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {apply.loanType}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {apply.gender}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {apply.occupation}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {apply.contactNumber? apply?.contactNumber :'N/A' }
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {apply.accountHolderName ? apply.accountHolderName :'N/A'}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {apply.accountNumber ? apply.accountNumber :'N/A'}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {apply.ifscCode ? apply.ifscCode :'N/A'}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {apply.bankName ? apply.bankName :'N/A'}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {apply.branchName ? apply.branchName :'N/A'}
                  </td>
                  <td
                    className={`py-2 px-4 border-b border-gray-200 ${
                      apply.isAcceptLoan == "accepted"
                        ? "text-green-500"
                        : apply.isAcceptLoan == "rejected"
                        ? "text-red-500"
                        : "text-yellow-500"
                    } `}
                  >
                    {apply.isAcceptLoan}
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
                  colSpan={2}
                  className="py-2 px-4 border-b border-gray-200 text-center text-gray-500"
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
