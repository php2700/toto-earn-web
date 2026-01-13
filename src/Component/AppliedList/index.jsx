// import axios from "axios";
// import React, { useEffect, useState } from "react";

// export const Applied = () => {
//   const [appliedData, setAppliedData] = useState([]);
//   const token = localStorage.getItem("totoToken");
//   const userId = localStorage.getItem("userId");

//   useEffect(() => {
//     if (!token || !userId) return;

//     axios
//       .get(
//         `${
//           import.meta.env.VITE_APP_API_BASE_URL
//         }api/user/transaction-list/${userId}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       )
//       .then((res) => {
//         setAppliedData(res?.data?.data);
//       })
//       .catch((err) => console.error(err));
//   }, [token, userId]);

//   return (
//     <div className="p-4 mt-20 container mx-auto">
//       <h2 className="text-2xl font-semibold mb-4">Transaction List </h2>
//       <div className="overflow-x-auto">
//         <table className="min-w-full border border-gray-200 rounded-lg">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="py-2 px-4 text-left border-b border-gray-200">
//                 S.No
//               </th>
//               <th className="py-2 px-4 text-left border-b border-gray-200">
//                 Account Number
//               </th>

//               <th className="py-2 px-4 text-left border-b border-gray-200">
//                 Withdraw Request
//               </th>
//               <th className="py-2 px-4 text-left border-b border-gray-200">
//                 IFSC Code
//               </th>
//               <th className="py-2 px-4 text-left border-b border-gray-200">
//                 Transaction Status
//               </th>
//               <th className="py-2 px-4 text-left border-b border-gray-200">
//                 Created Date
//               </th>
//             </tr>
//           </thead>
//           {appliedData?.withdraw?.length ? (
//             <tbody>
//               {appliedData?.withdraw?.map((apply, index) => (
//                 <tr key={index} className="hover:bg-gray-50">
//                   <td className="py-2 px-4 border-b border-gray-200">
//                     {index + 1}
//                   </td>
//                   <td className="py-2 px-4 border-b border-gray-200">
//                     {apply.bankAccountName ? apply.bankAccountName : "N/A"}
//                   </td>
//                   <td className="py-2 px-4 border-b border-gray-200">
//                     {apply.amount ? apply.amount : "N/A"}
//                   </td>
//                   <td className="py-2 px-4 border-b border-gray-200">
//                     {apply.ifscCode ? apply.ifscCode : "N/A"}
//                   </td>
//                   <td
//                     className={`py-2 px-4 border-b border-gray-200 ${
//                       apply.isAccept === "Accepted"
//                         ? "text-green-500"
//                         : apply.isAccept === "Rejected"
//                         ? "text-red-500"
//                         : "text-yellow-500"
//                     }`}
//                   >
//                     {apply.isAccept === "Accepted"
//                       ? "Completed"
//                       : apply.isAccept === "Rejected"
//                       ? "Rejected"
//                       : "Pending"}
//                   </td>
//                   <td className="py-2 px-4 border-b border-gray-200">
//                     {new Date(apply.createdAt).toLocaleDateString()}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           ) : (
//             <tbody>
//               <tr>
//                 <td
//                   colSpan={7}
//                   className="py-4 px-4 text-center border-b border-gray-200 text-gray-500"
//                 >
//                   No Record Found
//                 </td>
//               </tr>
//             </tbody>
//           )}
//         </table>
//       </div>
//     </div>
//   );
// };



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
        `${import.meta.env.VITE_APP_API_BASE_URL}api/user/transaction-list/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        // Backend se aa rahe data ko state mein set karein
        setAppliedData(res?.data?.data?.withdraw || []);
      })
      .catch((err) => console.error(err));
  }, [token, userId]);

  return (
    <div className="p-4 mt-20 container mx-auto min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-blue-800">Transaction History</h2>
      <div className="overflow-x-auto shadow-lg rounded-xl border border-gray-200">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100 border-b-2 border-gray-200">
            <tr>
              <th className="py-4 px-4 text-left text-xs font-black uppercase text-gray-500">S.No</th>
              <th className="py-4 px-4 text-left text-xs font-black uppercase text-gray-500">Account Number</th>
              <th className="py-4 px-4 text-left text-xs font-black uppercase text-gray-500">Withdraw Amount</th>
              <th className="py-4 px-4 text-left text-xs font-black uppercase text-gray-500">IFSC Code</th>
              <th className="py-4 px-4 text-left text-xs font-black uppercase text-gray-500">Transaction Status</th>
              <th className="py-4 px-4 text-left text-xs font-black uppercase text-gray-500">Date</th>
            </tr>
          </thead>
          <tbody>
            {appliedData.length > 0 ? (
              appliedData.map((apply, index) => (
                <tr key={index} className="hover:bg-blue-50/50 transition-colors border-b border-gray-100">
                  <td className="py-4 px-4 text-sm font-medium text-gray-600">{index + 1}</td>
                  <td className="py-4 px-4 text-sm font-bold text-gray-800">{apply.bankAccount || "N/A"}</td>
                  <td className="py-4 px-4 text-sm font-black text-green-600">₹{apply.amount}</td>
                  <td className="py-4 px-4 text-sm text-gray-500 font-mono">{apply.ifscCode || "N/A"}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      apply.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : apply.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {apply.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-400 font-medium">
                    {new Date(apply.createdAt).toLocaleDateString("en-IN", {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                    })}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-10 text-center text-gray-400 font-bold italic uppercase tracking-widest">
                  No Transactions Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};