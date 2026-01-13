// import { useEffect, useState } from "react";
// import bgImg from "../../assets/h1_hero.jpg";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchUserData } from "../Store/userSlice";
// import { toast } from "react-toastify";
// import account from "../../assets/account.png";
// import googleImg from "../../assets/google.png";
// import share from "../../assets/share.png";
// import qrImg from "../../assets/qr.svg";

// export default function Apply() {
//   const dispatch = useDispatch();
//   const token = localStorage.getItem("totoToken");
//   const { userData } = useSelector((state) => state.user);
//   const [copied, setCopied] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [amount, setAmount] = useState("");
//   const [ifscCode, setIfscCode] = useState("");
//   const [bankAccountName, setBankAccountName] = useState("");
//   const [message, setMessage] = useState("");
//   const userId = localStorage.getItem("userId");
//   const [paymentModel, setPaymentModel] = useState(false);
//   const [utrNumber, setUtrNumber] = useState("");
//   const [paymentImage, setPaymentImage] = useState(null);
//   const [previewImage, setPreviewImage] = useState(null);
//   const [showQR, setShowQR] = useState(false);
//   const [paymentConfig, setPaymentConfig] = useState();
//   const [modalError, setModelError] = useState();

//   useEffect(() => {
//     dispatch(fetchUserData());
//   }, [dispatch]);

//   const handleActivateClick = async () => {
//     try {
//       setShowQR(true);
//     } catch (err) {
//       console.error("Payment Error:", err);
//       toast.error(err, {
//         position: "top-right",
//       });
//     }
//   };

//   const getPaymentDetails = async () => {
//     try {
//       const res = await axios.get(
//         `${import.meta.env.VITE_APP_API_BASE_URL}api/user/payment-config`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       console.log(res?.data);
//       setPaymentConfig(res?.data);
//     } catch (error) {
//       toast.error(
//         error.response.data?.message || error.message || "something went wrong",
//         {
//           position: "top-right",
//         }
//       );
//     }
//   };

//   useEffect(() => {
//     getPaymentDetails();
//   }, []);

//   const handleProceedToProof = () => {
//     setShowQR(false);
//     setPaymentModel(true);
//   };

//   const copyReferral = async () => {
//     if (!userData?.referralCode) return;
//     try {
//       const websiteUrl = import.meta.env.VITE_WEBSITE_URL;
//       const referralLink = `${websiteUrl}/signup?ref=${userData.referralCode}`;
//       const message = `${referralLink}`;
//       await navigator.clipboard.writeText(message);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     } catch (err) {
//       console.error("Failed to copy:", err);
//     }
//   };

//   const handleInst = () => {
//     if (!userData?.referralCode) {
//       toast.error("refer code not available", {
//         position: "top-right",
//       });
//       return;
//     }
//     const websiteUrl = import.meta.env.VITE_WEBSITE_URL;
//     const referralLink = `${websiteUrl}/signup?ref=${userData.referralCode}`;
//     const message = `Hey! Join this website and use my referral code. ${referralLink}`;

//     navigator.clipboard.writeText(message).then(() => {
//       window.open("https://www.instagram.com/direct/inbox/", "_blank");
//     });
//   };

//   const withdrawReq = async () => {
//     try {
//       if (userData?.walletAmount < amount) {
//         setModelError("Amount can not be greate than Availble amount");
//         setTimeout(() => {
//           setModelError("");
//         }, 1500);
//         return;
//       }
//       const response = await axios.post(
//         `${import.meta.env.VITE_APP_API_BASE_URL}api/user/withdraw`,
//         {
//           userId,
//           amount: Number(amount),
//           bankAccountName: bankAccountName,
//           ifscCode: ifscCode,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       if (response?.data) {
//         toast.success("Withdraw Request Sent", {
//           position: "top-right",
//         });
//         setShowModal(false);
//         setAmount("");
//       }
//     } catch (error) {
//       setMessage(
//         error.response?.data?.message || "Something went wrong. Try again."
//       );
//       toast.error(
//         error.response?.data?.message || "Something went wrong. Try again.",
//         {
//           position: "top-right",
//         }
//       );
//     }
//   };

//   const submitPaymentProof = async () => {
//     if (!utrNumber && !paymentImage) {
//       toast.error("Please provide either a UTR number or a screenshot.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("userId", userData?._id);
//     if (utrNumber) formData.append("utrNumber", utrNumber);
//     if (paymentImage) formData.append("paymentImage", paymentImage);

//     try {
//       const res = await axios.patch(
//         `${import.meta.env.VITE_APP_API_BASE_URL}api/user/payment-proof`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       if (res.status === 200) {
//         toast.success("Payment proof submitted successfully!");
//         setPaymentModel(false);
//         dispatch(fetchUserData());
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error(error.response?.data?.message || "Something went wrong.");
//     }
//   };

//   return (
//     <section className="w-full pt-16">
//       <div
//         className="h-[50vh] flex items-center justify-center bg-grid"
//         style={{ backgroundImage: `url(${bgImg})` }}
//       >
//         <h1 className="text-6xl font-bold text-gray-800">REFER & EARN</h1>
//       </div>


//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
//         <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
//           <h1 className="text-2xl font-bold text-center mb-4">
//             Refer & Earn – Earn ₹200 for Every Friend! 💰
//           </h1>
//           <p className="text-center text-gray-600 mb-4">
//             Refer & Earn – Earn ₹200 for Every Friend! 💰 Join now, pay ₹200
//             activation fee (only once) and get ₹100 signup bonus instantly!
//             Share your referral link — every time your friend joins and
//             activates, you earn ₹200 instantly in your account! 💸 One-time
//             payment → Lifetime free earning opportunity!
//           </p>

//           {userData?.isActivate ? (
//             <button className="w-full bg-blue-500 text-white py-2 rounded-lg mb-6">
//               Active User
//             </button>
//           ) : userData?.utrNumber || userData?.paymentImage ? (
//             <button className="w-full bg-blue-500 text-white py-2 rounded-lg mb-6">
//               Wait For Active Account
//             </button>
//           ) : (
//             <button
//               onClick={handleActivateClick}
//               className="w-full bg-blue-500 text-white py-2 rounded-lg mb-6"
//             >
//               Activate & Get Link
//             </button>
//           )}

//           <h2 className="text-xl font-semibold text-center mb-4">
//             How it Works
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 text-center">
//             <div>
//               <div
//                 className=" rounded-full inline-flex items-center justify-center mb-3 mx-auto"
//                 style={{ width: 64, height: 64 }}
//               >
//                 <img src={googleImg} alt="Google" />
//               </div>
//               <p className="text-gray-800">
//                 <strong>Login / Sign Up</strong>
//                 <br />
//                 Login instantly with 1-click Google Login.
//               </p>
//             </div>

//             <div>
//               <div
//                 className="  inline-flex items-center justify-center mb-3 mx-auto"
//                 style={{ width: 64, height: 64 }}
//               >
//                 <img src={account} alt="Payment" />
//               </div>
//               <p className="text-gray-800">
//                 <strong>Activate Account ₹100</strong>
//                 <br />
//                 Once the payment is completed, your referral link will be
//                 unlocked instantly.
//               </p>
//             </div>

//             {/* 3. Share & Earn */}
//             <div>
//               <div
//                 className="  rounded-full inline-flex items-center justify-center mb-3 mx-auto "
//                 style={{ width: 64, height: 64 }}
//               >
//                 <img src={share} alt="Share" />
//               </div>
//               <p className="text-gray-800">
//                 <strong>Share & Earn</strong>
//                 <br />
//                 Share your referral link on WhatsApp, Instagram, and other
//                 social platforms. Earn ₹200 for every successful payment made
//                 through your link!
//               </p>
//             </div>
//           </div>

//           <h2 className="w-full bg-blue-500 text-center text-semibold text-white py-2 rounded-lg mb-6">
//             Wallet & Referral Overview
//           </h2>
//           <div className="grid grid-cols-2 gap-4 text-center mb-4">
//             <div>
//               <p>
//                 Wallet Balance <br />
//                 <span className="font-bold">{userData?.walletAmount}</span>
//               </p>
//             </div>
//             <div>
//               <p>
//                 Active Referrals <br />
//                 <span className="font-bold">
//                   {userData?.activeReferralsCount}
//                 </span>
//               </p>
//             </div>
//             <div>
//               <p>
//                 Pending Referrals <br />
//                 <span className="font-bold">
//                   {userData?.inactiveReferralsCount}
//                 </span>
//               </p>
//             </div>
//             <div>
//               <p>
//                 Min. Withdrawal <br />
//                 <span className="font-bold">₹200</span>
//               </p>
//             </div>
//           </div>
//           <div className="text-center mb-4">
//             {userData?.isActivate && (
//               <p className="font-medium">
//                 REFERRAL CODE : {userData?.referralCode}
//               </p>
//             )}
//             <div className="flex flex-col md:flex-row justify-center space-x-4 m-2 gap-4 items-center">
//               <button
//                 disabled={!userData?.isActivate}
//                 className={`flex items-center gap-2 bg-green-500 text-white py-1 px-3 rounded 
//                    ${
//                      userData?.isActivate
//                        ? "bg-green-500 hover:bg-green-600 text-white cursor-pointer"
//                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
//                    }
//                   `}
//                 onClick={() => {
//                   if (!userData?.referralCode) {
//                     toast.error("refer code not available", {
//                       position: "top-right",
//                     });
//                     return;
//                   }
//                   const websiteUrl = `${import.meta.env.VITE_WEBSITE_URL}`;
//                   const referralLink = `${websiteUrl}/signup?ref=${userData.referralCode}`;
//                   const message = `Join this website using my referral link: ${referralLink}`;

//                   const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
//                     message
//                   )}`;
//                   window.open(whatsappUrl, "_blank");
//                 }}
//               >
//                 <img
//                   src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
//                   alt="WhatsApp"
//                   className="w-4 h-4"
//                 />
//                 WhatsApp
//               </button>
//               <button
//                 disabled={!userData?.isActivate}
//                 onClick={copyReferral}
//                 className={`flex items-center gap-2 py-1 px-3 rounded transition
//     ${
//       userData?.isActivate
//         ? "bg-gray-500 hover:bg-gray-600 text-white cursor-pointer"
//         : "bg-gray-300 text-gray-500 cursor-not-allowed"
//     }`}
//               >
//                 <img
//                   src="https://cdn-icons-png.flaticon.com/512/60/60990.png"
//                   alt="Copy"
//                   className="w-4 h-4"
//                 />
//                 {copied ? "Copied" : "Copy"}
//               </button>

//               <button
//                 onClick={handleInst}
//                 disabled={!userData?.isActivate}
//                 className={`flex items-center gap-2 py-1 px-3 rounded transition
//                   ${
//                     userData?.isActivate
//                       ? "bg-pink-500 hover:bg-pink-600 text-white cursor-pointer"
//                       : "bg-gray-300 text-gray-500 cursor-not-allowed"
//                   }
    
//   `}
//               >
//                 <img
//                   src="https://cdn-icons-png.flaticon.com/512/1384/1384063.png"
//                   alt="Instagram"
//                   className="w-4 h-4"
//                 />
//                 Instagram
//               </button>
//             </div>
//           </div>

//           <button
//             onClick={() => setShowModal(true)}
//             disabled={userData?.walletAmount <= 200}
//             className={`w-full py-2 rounded-lg mb-4 text-white
//               ${
//                 userData?.walletAmount >= 200
//                   ? "bg-blue-500 hover:bg-blue-600 cursor-pointer"
//                   : "bg-gray-400 cursor-not-allowed"
//               }`}
//           >
//             Withdraw
//           </button>

//           <p className="text-center text-gray-600">
//             Total Withdraw : {userData?.totalAmount}
//           </p>
//         </div>
//       </div>
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
//           <div className="bg-white rounded-xl shadow-lg p-6 w-11/12 max-w-md relative">
//             <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">
//               Withdraw Amount
//             </h2>
//             {modalError && (
//               <h2 className="bg-red-500 text-white text-center my-4 p-2 rounded">
//                 Amount not Available!
//               </h2>
//             )}

//             <label>Availble Amount</label>
//             <input
//               type="text"
//               placeholder="Enter amount"
//               value={userData?.walletAmount}
//               readOnly
//               className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             />
//             <label>Amount</label>
//             <input
//               type="text"
//               placeholder="Enter amount"
//               value={amount}
//               required
//               onChange={(e) => setAmount(e.target.value)}
//               className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             />
//             <label>Bank Account Name</label>
//             <input
//               type="text"
//               placeholder="Bank Account Name"
//               value={bankAccountName}
//               required
//               onChange={(e) => setBankAccountName(e.target.value)}
//               className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             />
//             <label>IFSC code</label>
//             <input
//               type="text"
//               placeholder="IFSC code"
//               value={ifscCode}
//               required
//               onChange={(e) => setIfscCode(e.target.value)}
//               className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             />
//             <div className="flex justify-between">
//               <button
//                 onClick={() => {
//                   setAmount();
//                   setBankAccountName();
//                   setIfscCode();
//                   setShowModal(false);
//                 }}
//                 className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={withdrawReq}
//                 disabled={!amount}
//                 className={`px-4 py-2 rounded-lg text-white font-semibold transition ${
//                   amount
//                     ? "bg-blue-500 hover:bg-blue-600"
//                     : "bg-blue-300 cursor-not-allowed"
//                 }`}
//               >
//                 Confirm Withdraw
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {showQR && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
//           <div className="bg-white rounded-2xl p-6 shadow-lg w-11/12 max-w-md">
//             <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">
//               Scan & Pay
//             </h2>
//             {console.log(
//               `${import.meta.env.VITE_APP_API_BASE_URL}${
//                 paymentConfig.imageName
//               }`
//             )}
//             <div className="flex justify-center">
//               <img
//                 src={`${import.meta.env.VITE_APP_API_BASE_URL}${
//                   paymentConfig.imageName
//                 }`}
//                 alt="Payment QR"
//                 className="w-60 h-60 object-contain mb-4 border rounded-lg"
//               />
//             </div>
//             <div className="font-bold text-center">OR</div>
//             <div className="text-center my-2">{paymentConfig?.upiId}</div>
//             <a
//               href={`upi://pay?pa=${paymentConfig?.upiId}&pn=${
//                 paymentConfig.accountHolder
//               }&am=${Number(paymentConfig.amount)}&cu=${
//                 paymentConfig.currency
//               }`}
//               className="block text-center text-blue-500 underline mb-4"
//             >
//               Click to Pay using UPI app
//             </a>
//             <div className="flex flex-col gap-4">
//               <button
//                 onClick={handleProceedToProof}
//                 className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
//               >
//                 I Have Paid — Next
//               </button>
//               <button
//                 onClick={() => setShowQR(false)}
//                 className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-100"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {paymentModel && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
//           <div className="bg-white rounded-2xl shadow-2xl p-6 w-11/12 max-w-md relative">
//             <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
//               Payment Proof
//             </h2>

//             <label className="block text-gray-700 font-medium mb-2">
//               UTR Number (optional)
//             </label>
//             <input
//               type="text"
//               placeholder="Enter UTR number"
//               value={utrNumber}
//               onChange={(e) => {
//                 setUtrNumber(e.target.value);
//                 if (e.target.value) {
//                   setPaymentImage(null);
//                   setPreviewImage(null);
//                 }
//               }}
//               disabled={!!paymentImage}
//               className={`w-full border rounded-lg px-3 py-2 mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
//                 paymentImage
//                   ? "bg-gray-100 cursor-not-allowed"
//                   : "border-gray-300"
//               }`}
//             />

//             <label className="block text-gray-700 font-medium mb-2">
//               Upload Screenshot (optional)
//             </label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={(e) => {
//                 const file = e.target.files[0];
//                 setPaymentImage(file);
//                 if (file) {
//                   setUtrNumber("");
//                   const reader = new FileReader();
//                   reader.onloadend = () => setPreviewImage(reader.result);
//                   reader.readAsDataURL(file);
//                 } else {
//                   setPreviewImage(null);
//                 }
//               }}
//               disabled={!!utrNumber}
//               className={`w-full border rounded-lg px-3 py-2 mb-4 focus:outline-none ${
//                 utrNumber ? "bg-gray-100 cursor-not-allowed" : "border-gray-300"
//               }`}
//             />

//             {previewImage && (
//               <div className="mb-4">
//                 <p className="text-gray-600 text-sm mb-2">Preview:</p>
//                 <img
//                   src={previewImage}
//                   alt="Payment Screenshot"
//                   className="w-full h-48 object-contain rounded-lg border border-gray-300"
//                 />
//               </div>
//             )}

//             <div className="flex justify-between mt-4">
//               <button
//                 onClick={() => {
//                   setPaymentModel(false);
//                 }}
//                 className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={submitPaymentProof}
//                 disabled={!utrNumber && !paymentImage}
//                 className={`px-4 py-2 rounded-lg text-white font-semibold transition ${
//                   utrNumber || paymentImage
//                     ? "bg-blue-500 hover:bg-blue-600"
//                     : "bg-blue-300 cursor-not-allowed"
//                 }`}
//               >
//                 Submit Proof
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }








import { useEffect, useState } from "react";
import bgImg from "../../assets/h1_hero.jpg";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../Store/userSlice";
import { toast } from "react-toastify";
import account from "../../assets/account.png";
import googleImg from "../../assets/google.png";
import share from "../../assets/share.png";
import ScratchCard from "../Home/ScratchCard";

export default function Apply() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("totoToken");
  const { userData } = useSelector((state) => state.user);

  // UI States
  const [copied, setCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [paymentModel, setPaymentModel] = useState(false);
  
  // Withdrawal Status State
  const [lastWithdrawal, setLastWithdrawal] = useState(null);

  // Form States
  const [bankAccountName, setBankAccountName] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [utrNumber, setUtrNumber] = useState("");
  const [paymentImage, setPaymentImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [paymentConfig, setPaymentConfig] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- 10 LEVELS WITHDRAWAL CONFIG ---
  const withdrawalLevels = [
    { level: 1, amount: 50, fee: 25 },
    { level: 2, amount: 500, fee: 250 },
    { level: 3, amount: 2000, fee: 1000 },
    { level: 4, amount: 5000, fee: 2500 },
    { level: 5, amount: 10000, fee: 5000 },
    { level: 6, amount: 20000, fee: 10000 },
    { level: 7, amount: 50000, fee: 25000 },
    { level: 8, amount: 100000, fee: 50000 },
    { level: 9, amount: 200000, fee: 100000 },
    { level: 10, amount: 500000, fee: 250000 },
  ];

  const currentLevelIndex = ((userData?.withdrawalStage || 1) - 1) % 10;
  const currentLevel = withdrawalLevels[currentLevelIndex];

  useEffect(() => {
    dispatch(fetchUserData());
    fetchLastWithdrawalStatus();
  }, [dispatch]);

  // Naya Function Status Fetch karne ke liye
  const fetchLastWithdrawalStatus = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/my-last-withdrawal`, 
      { headers: { Authorization: `Bearer ${token}` } });
      setLastWithdrawal(res.data?.data);
    } catch (err) { console.error("Status fetch error", err); }
  };

  // --- Scratch Card Timer Logic (UNCHANGED) ---
  const [canScratch, setCanScratch] = useState(false);
  const [isWithin30Days, setIsWithin30Days] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");
  const [pointsEarned, setPointsEarned] = useState(0);
  const [scratchType, setScratchType] = useState("");

  useEffect(() => {
    if (userData) {
      const signupDate = new Date(userData.createdAt);
      const now = new Date();
      const diffDays = Math.ceil((now - signupDate) / (1000 * 60 * 60 * 24));
      setIsWithin30Days(diffDays <= 30);

      const checkTimer = () => {
        if (userData?.isActivate === 'inactive' || userData?.isActivate === 'reject') {
          setCanScratch(false);
          return;
        }
        if (userData.scratchCardsBalance > 0) {
          setCanScratch(true);
          setScratchType("referral");
          setPointsEarned(20000);
          return;
        }
        const lastScratch = localStorage.getItem(`last_scratch_${userData._id}`);
        if (lastScratch) {
          const lastTime = new Date(lastScratch).getTime();
          const distance = (24 * 60 * 60 * 1000) - (new Date().getTime() - lastTime);
          if (distance > 0) {
            setCanScratch(false);
            const h = Math.floor(distance / (1000 * 60 * 60));
            const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            setTimeLeft(`${h}h ${m}m`);
          } else { setCanScratch(true); setScratchType("daily"); }
        } else { setCanScratch(true); setScratchType("daily"); }
      };
      checkTimer();
      const interval = setInterval(checkTimer, 60000);
      return () => clearInterval(interval);
    }
  }, [userData]);

  useEffect(() => {
    if (!canScratch || scratchType !== "daily" || !userData?._id || !token) return;
    const getPoints = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/today-reward-points/${userData._id}`,
          { headers: { Authorization: `Bearer ${token}` } });
        setPointsEarned(res.data?.points || 0);
      } catch (err) { console.error(err); }
    };
    getPoints();
  }, [canScratch, scratchType, userData?._id, token]);

  const handleScratchComplete = async () => {
    if (userData?.isActivate === 'inactive' || userData?.isActivate === 'reject') return;
    try {
      const endpoint = scratchType === "referral" ? "claim-referral-coupon" : "claim-daily-points";
      const res = await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/${endpoint}`,
        { userId: userData._id }, { headers: { Authorization: `Bearer ${token}` } });
      if (res.status === 200) {
        toast.success(`${res.data.points} Points added! ✨`);
        if (scratchType === "daily") localStorage.setItem(`last_scratch_${userData._id}`, new Date().toISOString());
        setCanScratch(false); setPointsEarned(0); dispatch(fetchUserData());
      }
    } catch (err) { toast.error("Error claiming points."); }
  };

  const handleClaimPointsToCash = async () => {
    if (userData?.isActivate !== 'active') return toast.error("Please activate account first!");
    if (userData?.pointsBalance < 1000) return toast.warning("Min 1,000 points needed!");
    try {
      const res = await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/convert-points`,
        { userId: userData._id }, { headers: { Authorization: `Bearer ${token}` } });
      if (res.status === 200) { toast.success(`Converted to cash! 💰`); dispatch(fetchUserData()); }
    } catch (err) { toast.error("Conversion failed."); }
  };

  const handleFreeActivation = async () => {
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("userId", userData?._id);
    formData.append("utrNumber", "FREE_ACTIVATION_REQUEST"); 
    try {
      await axios.patch(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/payment-proof`, formData, { headers: { Authorization: `Bearer ${token}` } });
      toast.success("Activation request sent!");
      dispatch(fetchUserData());
    } catch (error) { toast.error("Request failed."); }
    finally { setIsSubmitting(false); }
  };

  const handleWithdrawClick = () => {
    if (userData?.walletAmount < currentLevel.amount) {
      return toast.error(`Low Balance! Need ₹${currentLevel.amount} for Level ${currentLevel.level}`);
    }
    setShowModal(true);
  };

  const handleProceedToQR = async () => {
    if (!bankAccountName || !ifscCode) return toast.warning("Enter bank details");
    try {
      const res = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/payment-config`, { headers: { Authorization: `Bearer ${token}` } });
      setPaymentConfig(res?.data);
      setShowModal(false);
      setShowQR(true);
    } catch (error) { toast.error("Error fetching payment info"); }
  };

  const submitWithdrawalProof = async () => {
    if (!utrNumber) return toast.warning("Enter UTR Number");
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("userId", userData?._id);
    formData.append("utrNumber", utrNumber);
    formData.append("bankAccount", bankAccountName);
    formData.append("ifscCode", ifscCode);
    formData.append("level", currentLevel.level);
    if (paymentImage) formData.append("paymentImage", paymentImage);

    try {
      await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/withdraw-request`, formData, { headers: { Authorization: `Bearer ${token}` } });
      toast.success("Withdrawal Request Submitted!");
      setPaymentModel(false);
      fetchLastWithdrawalStatus(); // Refresh status
      dispatch(fetchUserData());
    } catch (error) { toast.error("Error submitting proof."); }
    finally { setIsSubmitting(false); }
  };

  const copyReferral = async () => {
    const link = `${import.meta.env.VITE_WEBSITE_URL}/signup?ref=${userData.referralCode}`;
    await navigator.clipboard.writeText(link);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
    toast.success("Link Copied!");
  };

  const handleInst = () => {
    const link = `${import.meta.env.VITE_WEBSITE_URL}/signup?ref=${userData.referralCode}`;
    navigator.clipboard.writeText(`Join and earn rewards: ${link}`).then(() => window.open("https://www.instagram.com/direct/inbox/", "_blank"));
  };

  return (
    <section className="w-full pt-16">
      <div className="h-[50vh] flex items-center justify-center bg-grid" style={{ backgroundImage: `url(${bgImg})` }}>
        <h1 className="text-6xl font-bold text-gray-800 tracking-tighter uppercase italic text-center">REFER & EARN</h1>
      </div>

      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
          <h1 className="text-2xl font-bold text-center mb-4 text-blue-800 tracking-tight">Refer & Earn – Earn 20k Points (₹200) Per Friend! 💰</h1>
          <p className="text-center text-gray-600 mb-6 text-sm">Join now for FREE! No activation charges. Share link and withdraw level by level. 💸</p>

          {/* ACTIVATION BUTTON */}
          {userData?.isActivate === 'active' ? (
            <button className="w-full bg-green-600 text-white py-3 rounded-lg mb-6 font-black shadow-md uppercase">✓ ACTIVE USER</button>
          ) : userData?.utrNumber === 'FREE_ACTIVATION_REQUEST' || userData?.paymentImage ? (
            <button className="w-full bg-yellow-500 text-white py-3 rounded-lg mb-6 font-black shadow-md animate-pulse uppercase">PENDING ACTIVATION...</button>
          ) : (
            <button onClick={handleFreeActivation} disabled={isSubmitting} className="w-full bg-blue-600 text-white py-3 rounded-lg mb-6 font-black shadow-md hover:bg-blue-700 transition uppercase">
              {isSubmitting ? "REQUESTING..." : "ACTIVATE & GET LINK (FREE)"}
            </button>
          )}

          <div className="grid grid-cols-3 gap-2 mb-10 text-center">
            <div className="flex flex-col items-center"><img src={googleImg} className="w-12 h-12 mb-2" alt="1" /><p className="text-[10px]"><strong>1. Login</strong><br />Google Signup</p></div>
            <div className="flex flex-col items-center"><img src={account} className="w-12 h-12 mb-2" alt="2" /><p className="text-[10px]"><strong>2. Activate</strong><br />Free Request</p></div>
            <div className="flex flex-col items-center"><img src={share} className="w-12 h-12 mb-2" alt="3" /><p className="text-[10px]"><strong>3. Earn</strong><br />Get Points</p></div>
          </div>

          {/* SCRATCH CARD SECTION */}
          {isWithin30Days && (
            <div className="w-full bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 p-6 rounded-2xl shadow-xl border-2 border-amber-600 mb-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
              <div className="text-center md:text-left">
                <h2 className="text-amber-900 font-extrabold text-lg uppercase italic">{scratchType === "referral" ? "✨ Referral Reward ✨" : "✨ Daily Lucky Coupon ✨"}</h2>
                <p className="text-amber-800 text-xs mb-1 font-semibold">Potential Points: <span className="text-xl font-black text-amber-950">{scratchType === "referral" ? "20,000" : (pointsEarned || "...")}</span></p>
                <button onClick={handleClaimPointsToCash} className={`mt-2 px-4 py-2 rounded-lg font-bold shadow-lg transition text-sm ${userData?.isActivate === 'active' && userData?.pointsBalance >= 1000 ? "bg-amber-950 text-white hover:bg-black" : "bg-gray-400 text-gray-200 cursor-not-allowed"}`}>CLAIM CASH (₹)</button>
              </div>

              <div className="bg-white/40 p-2 rounded-xl backdrop-blur-sm border border-white/50 min-w-[280px] flex flex-col items-center justify-center min-h-[160px]">
                {userData?.isActivate !== 'active' ? (
                  <div className="text-center py-6"><span className="text-4xl mb-2 block">🔒</span><p className="text-amber-900 font-black text-[10px] uppercase">Locked</p></div>
                ) : canScratch ? (
                  <ScratchCard width={260} height={130} revealPercent={60} rewardValue={scratchType === "referral" ? "20,000 Points" : `${pointsEarned.toLocaleString()} Points`} onComplete={handleScratchComplete} />
                ) : (
                  <div className="text-center py-6 px-10"><p className="text-amber-900 font-bold text-sm">Next coupon in:</p><div className="bg-amber-900/20 text-amber-900 px-4 py-2 rounded-lg mt-2 font-mono text-2xl font-black">{timeLeft}</div></div>
                )}
              </div>
            </div>
          )}

          {/* WALLET AND LEVEL INFO */}
          <div className="grid grid-cols-2 gap-px bg-gray-200 border border-gray-200 rounded-xl overflow-hidden mb-8 shadow-sm text-center">
            <div className="bg-white p-4 border-r border-b"><p className="text-[10px] text-amber-500 font-black uppercase tracking-widest mb-2">Points Balance</p><p className="text-6xl font-black text-amber-600 tracking-tighter">{userData?.pointsBalance || 0}</p></div>
            <div className="bg-white p-4 border-b"><p className="text-[10px] text-blue-400 font-black uppercase tracking-widest mb-2">Money Wallet (₹)</p><p className="text-6xl font-black text-blue-800 tracking-tighter">₹{userData?.walletAmount || 0}</p></div>
            <div className="bg-white p-4 border-r"><p className="text-gray-400 text-[10px] uppercase font-bold">Current Stage</p><p className="text-xl font-bold text-green-600">Level {currentLevel.level}/10</p></div>
            <div className="bg-white p-4"><p className="text-gray-400 text-[10px] uppercase font-bold">Next Payout</p><p className="text-xl font-bold text-gray-800">₹{currentLevel.amount.toLocaleString()}</p></div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-8 mt-6">
            <button disabled={userData?.isActivate !== 'active'} className="flex items-center gap-2 bg-green-500 text-white px-6 py-2 rounded-full font-bold shadow-md text-xs" onClick={() => window.open(`https://wa.me/?text=Earn Rewards: ${import.meta.env.VITE_WEBSITE_URL}/signup?ref=${userData.referralCode}`, "_blank")}>WhatsApp</button>
            <button disabled={userData?.isActivate !== 'active'} onClick={copyReferral} className="flex items-center gap-2 bg-gray-700 text-white px-6 py-2 rounded-full font-bold shadow-md text-xs uppercase">{copied ? "COPIED!" : "COPY LINK"}</button>
            <button disabled={userData?.isActivate !== 'active'} onClick={handleInst} className="flex items-center gap-2 bg-pink-500 text-white px-6 py-2 rounded-full font-bold shadow-md text-xs">INSTAGRAM</button>
          </div>

          {/* --- MAIN WITHDRAW BUTTON WITH STATUS --- */}
          {lastWithdrawal?.status === 'pending' && lastWithdrawal?.level === currentLevel.level ? (
            <div className="w-full bg-yellow-100 border border-yellow-400 text-yellow-700 p-4 rounded-2xl text-center mb-4">
              <p className="font-black text-lg uppercase animate-pulse">⏳ PENDING APPROVAL (Lvl {currentLevel.level})</p>
              <p className="text-[10px] font-bold">Admin is reviewing your fee proof. Please wait.</p>
            </div>
          ) : lastWithdrawal?.status === 'rejected' && lastWithdrawal?.level === currentLevel.level ? (
            <div className="flex flex-col gap-2 mb-4">
              <div className="w-full bg-red-100 border border-red-400 text-red-700 p-3 rounded-xl text-center">
                <p className="font-black text-xs uppercase">❌ PREVIOUS REQUEST REJECTED</p>
                <p className="text-[9px]">Check your UTR or Screenshot and try again.</p>
              </div>
              <button onClick={handleWithdrawClick} className="w-full py-4 rounded-2xl font-black text-lg shadow-xl bg-blue-600 text-white hover:bg-blue-700">
                RETRY WITHDRAW ₹{currentLevel.amount.toLocaleString()}
              </button>
            </div>
          ) : (
            <button 
              onClick={handleWithdrawClick} 
              disabled={userData?.walletAmount < currentLevel.amount || userData?.isActivate !== 'active'} 
              className={`w-full py-4 rounded-2xl font-black text-lg shadow-xl mb-4 transition-all transform active:scale-95 ${userData?.walletAmount >= currentLevel.amount ? "bg-yellow-500 text-black hover:bg-yellow-600" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
            >
              WITHDRAW ₹{currentLevel.amount.toLocaleString()} (LEVEL {currentLevel.level})
            </button>
          )}

          <p className="text-center text-gray-400 font-bold text-[10px] uppercase italic">Processing Fee: ₹{currentLevel.fee.toLocaleString()} | Total Withdrawn: ₹{userData?.totalAmount || 0}</p>
        </div>
      </div>

      {/* --- MODALS (SAME) --- */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-1 text-center">Withdrawal Level {currentLevel.level}</h2>
            <p className="text-[10px] text-center text-gray-500 mb-4">Payout: ₹{currentLevel.amount.toLocaleString()} | Fee: ₹{currentLevel.fee.toLocaleString()}</p>
            <input type="text" placeholder="Bank Account Number" onChange={(e) => setBankAccountName(e.target.value)} className="w-full border p-3 rounded mb-3 text-sm" />
            <input type="text" placeholder="IFSC Code" onChange={(e) => setIfscCode(e.target.value)} className="w-full border p-3 rounded mb-6 text-sm" />
            <div className="flex gap-4">
              <button onClick={() => setShowModal(false)} className="flex-1 bg-gray-100 py-2 rounded font-bold">Cancel</button>
              <button onClick={handleProceedToQR} className="flex-1 bg-blue-500 text-white py-2 rounded font-bold">Next</button>
            </div>
          </div>
        </div>
      )}

      {showQR && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4 text-center">
          <div className="bg-white rounded-3xl p-8 shadow-2xl w-full max-w-md border-t-8 border-blue-600">
            <h2 className="text-sm font-black mb-1 uppercase tracking-widest">PAY PROCESSING FEE: ₹{currentLevel.fee.toLocaleString()}</h2>
            <div className="flex justify-center my-6"><img src={`${import.meta.env.VITE_APP_API_BASE_URL}${paymentConfig?.imageName}`} alt="QR" className="w-56 h-56 border p-2 rounded-2xl shadow-inner" /></div>
            <p className="font-mono bg-gray-50 py-2 rounded-lg text-blue-600 font-bold mb-4 text-xs tracking-wider">{paymentConfig?.upiId}</p>
            <button onClick={() => { setShowQR(false); setPaymentModel(true); }} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold uppercase text-sm">I HAVE PAID — NEXT</button>
            <button onClick={() => setShowQR(false)} className="mt-4 text-gray-400 font-bold text-[10px] uppercase">Cancel</button>
          </div>
        </div>
      )}

      {paymentModel && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
            <h2 className="text-2xl font-black mb-6 text-center uppercase text-blue-700">SUBMIT PROOF</h2>
            <input type="text" placeholder="UTR Number" value={utrNumber} onChange={(e) => setUtrNumber(e.target.value)} className="w-full border p-3 rounded-xl mb-4 text-sm" />
            <p className="text-[10px] text-gray-400 mb-1 ml-1 font-bold">SCREENSHOT:</p>
            <input type="file" onChange={(e) => {
              const file = e.target.files[0];
              setPaymentImage(file);
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => setPreviewImage(reader.result);
                reader.readAsDataURL(file);
              }
            }} className="w-full mb-4 text-xs" />
            {previewImage && <img src={previewImage} className="w-full h-32 object-contain rounded-lg mb-4 border" alt="preview" />}
            <button onClick={submitWithdrawalProof} disabled={isSubmitting} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold uppercase text-sm">
              {isSubmitting ? "SUBMITTING..." : "SUBMIT FOR REVIEW"}
            </button>
            <button onClick={() => setPaymentModel(false)} className="w-full mt-4 text-gray-400 text-center font-bold text-[10px] uppercase">Back</button>
          </div>
        </div>
      )}
    </section>
  );
}

























import { useEffect, useState } from "react";
import bgImg from "../../assets/h1_hero.jpg";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../Store/userSlice";
import { toast } from "react-toastify";
import account from "../../assets/account.png";
import googleImg from "../../assets/google.png";
import share from "../../assets/share.png";
import ScratchCard from "../Home/ScratchCard";
import congs from "../../assets/cong.png";

export default function Apply() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("totoToken");
  const { userData } = useSelector((state) => state.user);

  // UI States
  const [copied, setCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [paymentModel, setPaymentModel] = useState(false);
  
  // Withdrawal Status State
  const [lastWithdrawal, setLastWithdrawal] = useState(null);

  // Form States
  const [bankAccountName, setBankAccountName] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [utrNumber, setUtrNumber] = useState("");
  const [paymentImage, setPaymentImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [paymentConfig, setPaymentConfig] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- 10 LEVELS WITHDRAWAL CONFIG ---
  const withdrawalLevels = [
    { level: 1, amount: 50, fee: 25 },
    { level: 2, amount: 500, fee: 250 },
    { level: 3, amount: 2000, fee: 1000 },
    { level: 4, amount: 5000, fee: 2500 },
    { level: 5, amount: 10000, fee: 5000 },
    { level: 6, amount: 20000, fee: 10000 },
    { level: 7, amount: 50000, fee: 25000 },
    { level: 8, amount: 100000, fee: 50000 },
    { level: 9, amount: 200000, fee: 100000 },
    { level: 10, amount: 500000, fee: 250000 },
  ];

  const currentLevelIndex = ((userData?.withdrawalStage || 1) - 1) % 10;
  const currentLevel = withdrawalLevels[currentLevelIndex];

  useEffect(() => {
    dispatch(fetchUserData());
    fetchLastWithdrawalStatus();
  }, [dispatch]);

  const fetchLastWithdrawalStatus = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/my-last-withdrawal`, 
      { headers: { Authorization: `Bearer ${token}` } });
      setLastWithdrawal(res.data?.data);
    } catch (err) { console.error("Status fetch error", err); }
  };

  // --- Scratch Card Timer Logic ---
  const [canScratch, setCanScratch] = useState(false);
  const [isWithin30Days, setIsWithin30Days] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");
  const [pointsEarned, setPointsEarned] = useState(0);
  const [scratchType, setScratchType] = useState("");

  useEffect(() => {
    if (userData) {
      const signupDate = new Date(userData.createdAt);
      const now = new Date();
      const diffDays = Math.ceil((now - signupDate) / (1000 * 60 * 60 * 24));
      setIsWithin30Days(diffDays <= 30);

      const checkTimer = () => {
        if (userData?.isActivate === 'inactive' || userData?.isActivate === 'reject') {
          setCanScratch(false);
          return;
        }
        if (userData.scratchCardsBalance > 0) {
          setCanScratch(true);
          setScratchType("referral");
          setPointsEarned(20000);
          return;
        }
        const lastScratch = localStorage.getItem(`last_scratch_${userData._id}`);
        if (lastScratch) {
          const lastTime = new Date(lastScratch).getTime();
          const distance = (24 * 60 * 60 * 1000) - (new Date().getTime() - lastTime);
          if (distance > 0) {
            setCanScratch(false);
            const h = Math.floor(distance / (1000 * 60 * 60));
            const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            setTimeLeft(`${h}h ${m}m`);
          } else { setCanScratch(true); setScratchType("daily"); }
        } else { setCanScratch(true); setScratchType("daily"); }
      };
      checkTimer();
      const interval = setInterval(checkTimer, 60000);
      return () => clearInterval(interval);
    }
  }, [userData]);

  useEffect(() => {
    if (!canScratch || scratchType !== "daily" || !userData?._id || !token) return;
    const getPoints = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/today-reward-points/${userData._id}`,
          { headers: { Authorization: `Bearer ${token}` } });
        setPointsEarned(res.data?.points || 0);
      } catch (err) { console.error(err); }
    };
    getPoints();
  }, [canScratch, scratchType, userData?._id, token]);

  const handleScratchComplete = async () => {
    if (userData?.isActivate === 'inactive' || userData?.isActivate === 'reject') return;
    try {
      const endpoint = scratchType === "referral" ? "claim-referral-coupon" : "claim-daily-points";
      const res = await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/${endpoint}`,
        { userId: userData._id }, { headers: { Authorization: `Bearer ${token}` } });
      if (res.status === 200) {
        toast.success(`${res.data.points} Points added! ✨`);
        if (scratchType === "daily") localStorage.setItem(`last_scratch_${userData._id}`, new Date().toISOString());
        setCanScratch(false); setPointsEarned(0); dispatch(fetchUserData());
      }
    } catch (err) { toast.error("Error claiming points."); }
  };

  const handleClaimPointsToCash = async () => {
    if (userData?.isActivate !== 'active') return toast.error("Please activate account first!");
    if (userData?.pointsBalance < 1000) return toast.warning("Min 1,000 points needed!");
    try {
      const res = await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/convert-points`,
        { userId: userData._id }, { headers: { Authorization: `Bearer ${token}` } });
      if (res.status === 200) { toast.success(`Converted to cash! 💰`); dispatch(fetchUserData()); }
    } catch (err) { toast.error("Conversion failed."); }
  };

  const handleFreeActivation = async () => {
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("userId", userData?._id);
    formData.append("utrNumber", "FREE_ACTIVATION_REQUEST"); 
    try {
      await axios.patch(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/payment-proof`, formData, { headers: { Authorization: `Bearer ${token}` } });
      toast.success("Activation request sent!");
      dispatch(fetchUserData());
    } catch (error) { toast.error("Request failed."); }
    finally { setIsSubmitting(false); }
  };

  const handleWithdrawClick = () => {
    if (userData?.walletAmount < currentLevel.amount) {
      return toast.error(`Low Balance! Need ₹${currentLevel.amount} for Level ${currentLevel.level}`);
    }
    setShowModal(true);
  };

  const handleProceedToQR = async () => {
    if (!bankAccountName || !ifscCode) return toast.warning("Enter bank details");
    try {
      const res = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/payment-config`, { headers: { Authorization: `Bearer ${token}` } });
      setPaymentConfig(res?.data);
      setShowModal(false);
      setShowQR(true);
    } catch (error) { toast.error("Error fetching payment info"); }
  };

  const submitWithdrawalProof = async () => {
    if (!utrNumber) return toast.warning("Enter UTR Number");
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("userId", userData?._id);
    formData.append("utrNumber", utrNumber);
    formData.append("bankAccount", bankAccountName);
    formData.append("ifscCode", ifscCode);
    formData.append("level", currentLevel.level);
    if (paymentImage) formData.append("paymentImage", paymentImage);

    try {
      await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/withdraw-request`, formData, { headers: { Authorization: `Bearer ${token}` } });
      toast.success("Withdrawal Request Submitted!");
      setPaymentModel(false);
      await fetchLastWithdrawalStatus(); 
      dispatch(fetchUserData());
    } catch (error) { toast.error("Error submitting proof."); }
    finally { setIsSubmitting(false); }
  };

  const copyReferral = async () => {
    const link = `${import.meta.env.VITE_WEBSITE_URL}/signup?ref=${userData.referralCode}`;
    await navigator.clipboard.writeText(link);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
    toast.success("Link Copied!");
  };

  const handleInst = () => {
    const link = `${import.meta.env.VITE_WEBSITE_URL}/signup?ref=${userData.referralCode}`;
    navigator.clipboard.writeText(`Join and earn rewards: ${link}`).then(() => window.open("https://www.instagram.com/direct/inbox/", "_blank"));
  };

  return (
    <section className="w-full pt-16 bg-gray-50">
      <div className="h-[50vh] flex items-center justify-center bg-grid" style={{ backgroundImage: `url(${bgImg})` }}>
        <h1 className="text-6xl font-bold text-gray-800 tracking-tighter uppercase italic text-center">REFER & EARN</h1>
      </div>

      <div className="flex flex-col items-center justify-center min-h-screen p-4 -mt-20">
        <div className="bg-white p-6 rounded-[2.5rem] shadow-2xl w-full max-w-4xl border border-gray-100">
          <h1 className="text-2xl font-bold text-center mb-6 text-blue-800 tracking-tight">Refer & Earn – Dashboard 💰</h1>
          
          {/* ACTIVATION BUTTON */}
          {userData?.isActivate === 'active' ? (
            <button className="w-full bg-green-600 text-white py-4 rounded-2xl mb-8 font-black shadow-md uppercase tracking-widest">✓ ACCOUNT ACTIVE</button>
          ) : (
            <button onClick={handleFreeActivation} disabled={isSubmitting || userData?.utrNumber} className="w-full bg-blue-600 text-white py-5 rounded-2xl mb-8 font-black shadow-xl hover:bg-blue-700 transition uppercase tracking-widest">
              {userData?.utrNumber ? "PENDING ACTIVATION..." : "ACTIVATE ACCOUNT FREE"}
            </button>
          )}

          {/* BALANCE GRID */}
          <div className="grid grid-cols-2 gap-px bg-gray-200 border border-gray-200 rounded-[2rem] overflow-hidden mb-10 shadow-lg text-center">
            <div className="bg-white p-10 border-r border-b">
               <p className="text-[11px] text-amber-500 font-black uppercase tracking-widest mb-1">Points Balance</p>
               <p className="text-7xl font-black text-amber-600 tracking-tighter drop-shadow-sm">{userData?.pointsBalance || 0}</p>
            </div>
            <div className="bg-white p-10 border-b">
               <p className="text-[11px] text-blue-400 font-black uppercase tracking-widest mb-1">Money Wallet (₹)</p>
               <p className="text-7xl font-black text-blue-800 tracking-tighter drop-shadow-sm">₹{userData?.walletAmount || 0}</p>
            </div>
            <div className="bg-white p-4 border-r"><p className="text-gray-400 text-[10px] uppercase font-bold">Current Stage</p><p className="text-xl font-bold text-green-600">Level {currentLevel.level}/10</p></div>
            <div className="bg-white p-4"><p className="text-gray-400 text-[10px] uppercase font-bold">Next Payout</p><p className="text-xl font-bold text-gray-800">₹{currentLevel.amount.toLocaleString()}</p></div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <button onClick={() => window.open(`https://wa.me/?text=Earn Rewards: ${import.meta.env.VITE_WEBSITE_URL}/signup?ref=${userData.referralCode}`, "_blank")} className="bg-green-500 text-white px-10 py-3 rounded-full font-bold shadow-md text-xs uppercase">WhatsApp</button>
            <button disabled={userData?.isActivate !== 'active'} onClick={copyReferral} className="bg-gray-700 text-white px-10 py-3 rounded-full font-bold shadow-md text-xs uppercase">Copy Link</button>
            <button disabled={userData?.isActivate !== 'active'} onClick={handleInst} className="bg-pink-500 text-white px-10 py-3 rounded-full font-bold shadow-md text-xs uppercase">INSTAGRAM</button>
          </div>

          {/* --- STAGE PROGRESS LINE (ABOVE BUTTON) --- */}
          <div className="w-full px-4 mb-8">
             <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest italic">Stage Journey Progress</span>
                <span className="text-[16px] font-black text-blue-900 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">Lvl {userData?.withdrawalStage || 1} / 10</span>
             </div>
             <div className="relative w-full h-4 bg-gray-100 rounded-full border-2 border-white shadow-inner overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 via-blue-600 to-indigo-700 transition-all duration-1000 ease-out z-10"
                  style={{ width: `${((userData?.withdrawalStage || 1) / 10) * 100}%` }}
                ></div>
                <div className="absolute top-0 left-0 w-full h-full flex justify-between px-1 z-20 pointer-events-none opacity-20">
                   {[...Array(11)].map((_, i) => (
                      <div key={i} className="w-[2px] h-full bg-black"></div>
                   ))}
                </div>
             </div>
          </div>

          {/* --- MAIN WITHDRAW AREA (Congratulations Logic) --- */}
          {lastWithdrawal?.status === 'pending' ? (
            <div className="w-full relative py-12 px-6 bg-gradient-to-b from-white to-blue-50 border-4 border-indigo-100 rounded-[2.5rem] shadow-2xl text-center mb-8 transform transition-all hover:scale-[1.01]">
               <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 pointer-events-none drop-shadow-2xl text-center">
                  <img src={congs} alt="congratulations" className="animate-bounce inline-block" />
               </div>
               <div className="mt-8">
                  <h3 className="text-4xl font-black text-blue-900 tracking-tighter uppercase italic drop-shadow-sm">Congratulations!</h3>
                  <div className="flex justify-center gap-2 my-4">
                     <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                     <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.1s]"></div>
                     <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
                  </div>
                  <p className="text-sm font-bold text-gray-600 uppercase tracking-widest leading-snug">Request Submitted Successfully! <br/> <span className="text-indigo-600 font-black">Level {lastWithdrawal.level} Payout</span> is pending admin review.</p>
                  <div className="mt-6 inline-block bg-yellow-400 text-white px-8 py-2 rounded-full font-black text-xs uppercase animate-pulse shadow-md">⏳ Processing...</div>
               </div>
            </div>
          ) : (
            <div className="group">
               <button 
                onClick={handleWithdrawClick} 
                disabled={userData?.walletAmount < currentLevel.amount || userData?.isActivate !== 'active'} 
                className={`w-full py-7 rounded-[2.5rem] font-black text-3xl shadow-2xl mb-4 transition-all transform active:scale-95 flex flex-col items-center justify-center ${userData?.walletAmount >= currentLevel.amount ? "bg-yellow-500 text-white hover:bg-yellow-500" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
               >
                 <span className="text-[10px] uppercase tracking-[0.4em] opacity-80 mb-1">Available to Unlock</span>
                 <span>WITHDRAW ₹{currentLevel.amount.toLocaleString()}</span>
               </button>
               <div className="flex justify-between px-6 text-gray-400 text-[15px] font-black uppercase tracking-widest italic opacity-60">
                  <span>Processing Fee: ₹{currentLevel.fee.toLocaleString()}</span>
                  <span>Withdrawal Level: {currentLevel.level}/10</span>
               </div>
            </div>
          )}

          {/* Scratch Section (UNCHANGED logic, refined UI) */}
          {isWithin30Days && (
            <div className="mt-12 w-full bg-gradient-to-r from-orange-400 to-rose-500 p-6 rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 border-4 border-white/20">
              <div className="text-white text-center md:text-left">
                <h2 className="text-2xl font-black uppercase italic tracking-tighter">✨ Scratch Card Reward ✨</h2>
                <button onClick={handleClaimPointsToCash} className="mt-4 bg-white text-rose-600 px-8 py-2 rounded-full font-black text-xs shadow-lg transform hover:scale-105 transition-all">CLAIM CASH (₹)</button>
              </div>
              <div className="bg-white/20 p-2 rounded-3xl backdrop-blur-md border border-white/30 min-w-[280px] min-h-[160px] flex items-center justify-center text-white">
                {userData?.isActivate !== 'active' ? (
                  <div className="text-center"><span className="text-5xl block mb-2">🔒</span><p className="font-black text-[10px] uppercase tracking-widest">Locked</p></div>
                ) : canScratch ? (
                  <ScratchCard width={260} height={130} revealPercent={60} rewardValue={`${pointsEarned.toLocaleString()} Pts`} onComplete={handleScratchComplete} />
                ) : (
                  <div className="text-center"><p className="text-[10px] font-bold opacity-80 uppercase mb-1">Next In</p><div className="text-3xl font-black tabular-nums">{timeLeft}</div></div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* --- MODALS (CONGRATULATIONS HEADER FIXED) --- */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl w-full max-w-md border-t-8 border-indigo-600 relative overflow-visible">
            {/* attractive header icon */}
            <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-40 drop-shadow-xl text-center">
                <img src={congs} alt="congrats" className="animate-pulse inline-block" />
            </div>
            <div className="text-center mt-6">
                <h3 className="text-xl font-black text-indigo-900 tracking-tighter uppercase italic">Congratulations!</h3>
                <h2 className="text-lg font-bold mb-1 mt-1 text-gray-700 uppercase">Withdraw Level {currentLevel.level}</h2>
                <p className="text-[10px] text-gray-400 font-bold mb-8 uppercase tracking-widest">Payout: ₹{currentLevel.amount} | Fee: ₹{currentLevel.fee}</p>
            </div>
            <input type="text" placeholder="Bank Account Number" onChange={(e) => setBankAccountName(e.target.value)} className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl mb-4 text-sm focus:border-indigo-500 outline-none" />
            <input type="text" placeholder="IFSC Code" onChange={(e) => setIfscCode(e.target.value)} className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl mb-8 text-sm focus:border-indigo-500 outline-none" />
            <div className="flex gap-4">
              <button onClick={() => setShowModal(false)} className="flex-1 bg-gray-100 py-4 rounded-2xl font-black text-xs uppercase tracking-widest">Cancel</button>
              <button onClick={handleProceedToQR} className="flex-1 bg-indigo-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg">Next Step</button>
            </div>
          </div>
        </div>
      )}

      {showQR && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 p-4 backdrop-blur-md text-center">
          <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl w-full max-w-md border-t-8 border-indigo-600">
            <h2 className="text-xs font-black mb-1 uppercase tracking-[0.2em] text-gray-400">Processing Fee</h2>
            <p className="text-5xl font-black text-indigo-600 mb-8 tracking-tighter">₹{currentLevel.fee.toLocaleString()}</p>
            <div className="bg-gray-50 p-6 rounded-[2rem] mb-6 border border-dashed border-gray-300">
                <img src={`${import.meta.env.VITE_APP_API_BASE_URL}${paymentConfig?.imageName}`} alt="QR" className="w-52 h-52 mx-auto rounded-xl shadow-inner" />
            </div>
            <p className="font-mono bg-blue-50 py-3 rounded-2xl text-blue-600 font-bold mb-8 text-xs">{paymentConfig?.upiId}</p>
            <button onClick={() => { setShowQR(false); setPaymentModel(true); }} className="w-full bg-indigo-600 text-white py-5 rounded-[1.5rem] font-black uppercase text-sm shadow-xl hover:bg-indigo-700">I HAVE PAID — NEXT</button>
          </div>
        </div>
      )}

      {paymentModel && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4 backdrop-blur-sm text-center">
          <div className="bg-white rounded-[2.5rem] shadow-2xl p-10 w-full max-w-md border-t-8 border-green-500">
            <h2 className="text-3xl font-black mb-2 uppercase italic text-gray-800 tracking-tighter">Final Step</h2>
            <p className="text-xs text-gray-400 font-bold mb-8 uppercase tracking-widest font-black italic">Submit Payment Proof</p>
            <input type="text" placeholder="UTR / Transaction ID" value={utrNumber} onChange={(e) => setUtrNumber(e.target.value)} className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl mb-6 text-sm outline-none focus:border-green-500 transition-all" />
            <p className="text-[10px] text-gray-400 mb-2 ml-2 font-black uppercase">Attach Screenshot</p>
            <input type="file" onChange={(e) => {
              const file = e.target.files[0];
              setPaymentImage(file);
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => setPreviewImage(reader.result);
                reader.readAsDataURL(file);
              }
            }} className="w-full mb-8 text-xs text-gray-400" />
            {previewImage && <img src={previewImage} className="w-full h-32 object-contain rounded-2xl mb-8 border-2 border-gray-50 shadow-md" alt="preview" />}
            <button onClick={submitWithdrawalProof} disabled={isSubmitting} className="w-full bg-green-600 text-white py-5 rounded-[1.5rem] font-black uppercase text-sm shadow-xl hover:bg-green-700 transform active:scale-95 transition-all">
              {isSubmitting ? "PROCESSING..." : "SUBMIT FOR REVIEW"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}