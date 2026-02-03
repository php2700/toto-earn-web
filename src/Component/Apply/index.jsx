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
// import ScratchCard from "../Home/ScratchCard";

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

//       <div style={{ padding: 40 }}>
//       <ScratchCard
//         width={320}
//         height={180}
//         revealPercent={60}
//         onComplete={() => alert("Scratch Completed!")}
//       />
//     </div>

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


// import { useEffect, useState } from "react";
// import bgImg from "../../assets/h1_hero.jpg";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchUserData } from "../Store/userSlice";
// import { toast } from "react-toastify";
// import account from "../../assets/account.png";
// import googleImg from "../../assets/google.png";
// import share from "../../assets/share.png";
// // import qrImg from "../../assets/qr.svg"; // Not used in provided snippet but kept if needed
// import ScratchCard from "../Home/ScratchCard";

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

//   // --- New States for Scratch Card Logic ---
//   const [canScratch, setCanScratch] = useState(false);
//   const [isWithin30Days, setIsWithin30Days] = useState(false);
//   const [timeLeft, setTimeLeft] = useState("");

//   useEffect(() => {
//     dispatch(fetchUserData());
//   }, [dispatch]);

//   // --- Timer & Validity Logic for Scratch Card ---
//   useEffect(() => {
//     if (userData && userData.isActivate) {
//       // 1. Check if user is within 30 days of activation
//       // Note: Assuming 'updatedAt' or a specific 'activatedAt' field is the activation date
//       const activationDate = new Date(userData.updatedAt); 
//       const now = new Date();
//       const diffDays = Math.ceil((now - activationDate) / (1000 * 60 * 60 * 24));

//       if (diffDays <= 30) {
//         setIsWithin30Days(true);
//       }

//       // 2. 24-Hour Scratch Limit Logic
//       const checkScratchStatus = () => {
//         const lastScratch = localStorage.getItem(`lastPointsScratch_${userData._id}`);
//         if (lastScratch) {
//           const lastTime = new Date(lastScratch).getTime();
//           const currentTime = new Date().getTime();
//           const hours24 = 24 * 60 * 60 * 1000;
//           const remaining = hours24 - (currentTime - lastTime);

//           if (remaining > 0) {
//             setCanScratch(false);
//             const h = Math.floor(remaining / (1000 * 60 * 60));
//             const m = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
//             setTimeLeft(`${h}h ${m}m`);
//           } else {
//             setCanScratch(true);
//           }
//         } else {
//           setCanScratch(true);
//         }
//       };

//       checkScratchStatus();
//       const interval = setInterval(checkScratchStatus, 60000);
//       return () => clearInterval(interval);
//     }
//   }, [userData]);

//   const handleScratchComplete = async () => {
//     try {
//       // API call to update points in backend
//       const res = await axios.post(
//         `${import.meta.env.VITE_APP_API_BASE_URL}api/user/claim-points`,
//         { userId: userData?._id },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (res.status === 200) {
//         toast.success("Points added to your wallet! ✨");
//         localStorage.setItem(`lastPointsScratch_${userData._id}`, new Date().toISOString());
//         setCanScratch(false);
//         dispatch(fetchUserData()); // Refresh UI with new points
//       }
//     } catch (err) {
//       toast.error("Error claiming points. Try again.");
//     }
//   };

//   // --- Existing Handlers (Unchanged) ---
//   const handleActivateClick = async () => {
//     try { setShowQR(true); } catch (err) { toast.error(err); }
//   };

//   const getPaymentDetails = async () => {
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/payment-config`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setPaymentConfig(res?.data);
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Error");
//     }
//   };

//   useEffect(() => { getPaymentDetails(); }, []);

//   const handleProceedToProof = () => { setShowQR(false); setPaymentModel(true); };

//   const copyReferral = async () => {
//     if (!userData?.referralCode) return;
//     try {
//       const websiteUrl = import.meta.env.VITE_WEBSITE_URL;
//       const referralLink = `${websiteUrl}/signup?ref=${userData.referralCode}`;
//       await navigator.clipboard.writeText(referralLink);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     } catch (err) { console.error(err); }
//   };

//   const handleInst = () => {
//     if (!userData?.referralCode) return toast.error("refer code not available");
//     const link = `${import.meta.env.VITE_WEBSITE_URL}/signup?ref=${userData.referralCode}`;
//     navigator.clipboard.writeText(`Hey! Join and use my code: ${link}`).then(() => {
//       window.open("https://www.instagram.com/direct/inbox/", "_blank");
//     });
//   };

//   const withdrawReq = async () => {
//     try {
//       if (userData?.walletAmount < amount) {
//         setModelError("Amount can not be greate than Availble amount");
//         setTimeout(() => setModelError(""), 1500);
//         return;
//       }
//       const response = await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/withdraw`, 
//         { userId, amount: Number(amount), bankAccountName, ifscCode },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       if (response?.data) {
//         toast.success("Withdraw Request Sent");
//         setShowModal(false);
//         setAmount("");
//         dispatch(fetchUserData());
//       }
//     } catch (error) { toast.error("Withdrawal failed."); }
//   };

//   const submitPaymentProof = async () => {
//     const formData = new FormData();
//     formData.append("userId", userData?._id);
//     if (utrNumber) formData.append("utrNumber", utrNumber);
//     if (paymentImage) formData.append("paymentImage", paymentImage);
//     try {
//       const res = await axios.patch(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/payment-proof`, formData, {
//         headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
//       });
//       if (res.status === 200) {
//         toast.success("Proof submitted!");
//         setPaymentModel(false);
//         dispatch(fetchUserData());
//       }
//     } catch (error) { toast.error("Submission failed."); }
//   };

//   return (
//     <section className="w-full pt-16">
//       <div className="h-[50vh] flex items-center justify-center bg-grid" style={{ backgroundImage: `url(${bgImg})` }}>
//         <h1 className="text-6xl font-bold text-gray-800 tracking-tighter uppercase">REFER & EARN</h1>
//       </div>

//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
//         <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
//           <h1 className="text-2xl font-bold text-center mb-4">Refer & Earn – Earn ₹200 for Every Friend! 💰</h1>
//           <p className="text-center text-gray-600 mb-6">
//             Join now, pay ₹200 activation fee and earn points daily! Lifetime opportunity to earn through your network.
//           </p>

//           {/* Activation Buttons */}
//           {userData?.isActivate ? (
//             <button className="w-full bg-green-500 text-white py-3 rounded-lg mb-6 font-bold">Active User</button>
//           ) : userData?.utrNumber || userData?.paymentImage ? (
//             <button className="w-full bg-yellow-500 text-white py-3 rounded-lg mb-6 font-bold animate-pulse">Wait For Active Account</button>
//           ) : (
//             <button onClick={handleActivateClick} className="w-full bg-blue-500 text-white py-3 rounded-lg mb-6 font-bold hover:bg-blue-600 transition">Activate & Get Link</button>
//           )}

//           <h2 className="text-xl font-semibold text-center mb-4">How it Works</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 text-center">
//             <div>
//               <div className="inline-flex items-center justify-center mb-3 mx-auto" style={{ width: 64, height: 64 }}>
//                 <img src={googleImg} alt="Google" />
//               </div>
//               <p className="text-sm"><strong>Login / Sign Up</strong><br />1-click Google Login.</p>
//             </div>
//             <div>
//               <div className="inline-flex items-center justify-center mb-3 mx-auto" style={{ width: 64, height: 64 }}>
//                 <img src={account} alt="Account" />
//               </div>
//               <p className="text-sm"><strong>Activate Account</strong><br />Unlock your referral link instantly.</p>
//             </div>
//             <div>
//               <div className="inline-flex items-center justify-center mb-3 mx-auto" style={{ width: 64, height: 64 }}>
//                 <img src={share} alt="Share" />
//               </div>
//               <p className="text-sm"><strong>Share & Earn</strong><br />Earn points and ₹200 per friend.</p>
//             </div>
//           </div>

//           {/* WALLET & REFERRAL OVERVIEW */}
//           <h2 className="w-full bg-blue-500 text-center text-semibold text-white py-2 rounded-lg mb-6 uppercase tracking-wider">
//             Wallet & Referral Overview
//           </h2>
//           <div className="grid grid-cols-2 gap-4 text-center mb-8 bg-gray-50 p-4 rounded-xl border border-gray-200">
//             <div><p className="text-gray-500 text-xs">WALLET BALANCE</p><span className="font-bold text-xl text-blue-600">{userData?.walletAmount} Points</span></div>
//             <div><p className="text-gray-500 text-xs">ACTIVE REFERRALS</p><span className="font-bold text-xl text-green-600">{userData?.activeReferralsCount}</span></div>
//             <div><p className="text-gray-500 text-xs">PENDING REFERRALS</p><span className="font-bold text-xl text-orange-500">{userData?.inactiveReferralsCount}</span></div>
//             <div><p className="text-gray-500 text-xs">MIN. WITHDRAWAL</p><span className="font-bold text-xl text-gray-800">200 Points</span></div>
//           </div>

//           {/* --- GOLDEN BOX FOR SCRATCH CARD --- */}
//           {userData?.isActivate && isWithin30Days && (
//             <div className="w-full bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 p-6 rounded-2xl shadow-xl border-2 border-amber-600 mb-8 flex flex-col items-center justify-center relative overflow-hidden">
//                 <div className="absolute -top-4 -right-4 text-4xl opacity-20">💎</div>
//                 <h2 className="text-amber-900 font-extrabold text-lg mb-1 uppercase tracking-tighter">✨ Daily Points Reward ✨</h2>
//                 <p className="text-amber-800 text-xs mb-4 font-semibold">(24 Hour Limit | Valid for 30 Days)</p>

//                 <div className="bg-white/40 p-4 rounded-xl backdrop-blur-sm border border-white/50">
//                    {canScratch ? (
//                     <div className="flex flex-col items-center">
//                        <ScratchCard
//                         width={280}
//                         height={150}
//                         revealPercent={60}
//                         onComplete={handleScratchComplete}
//                       />
//                       <p className="mt-3 text-amber-900 font-bold text-xs animate-bounce">👆 SCRATCH TO EARN POINTS!</p>
//                     </div>
//                    ) : (
//                     <div className="text-center py-6 px-10">
//                        <p className="text-amber-900 font-bold text-sm">Next card available in:</p>
//                        <p className="text-2xl font-black text-amber-900 mt-1">{timeLeft}</p>
//                        <p className="text-amber-800 text-[10px] mt-2 italic font-medium">Come back later for more points!</p>
//                     </div>
//                    )}
//                 </div>
//             </div>
//           )}

//           {/* Referral Actions */}
//           <div className="text-center mb-6">
//             {userData?.isActivate && <p className="font-bold text-blue-700 bg-blue-50 py-2 rounded-lg mb-4">REFERRAL CODE : {userData?.referralCode}</p>}
//             <div className="flex flex-wrap justify-center gap-4">
//               <button disabled={!userData?.isActivate} className="flex items-center gap-2 bg-green-500 text-white py-2 px-6 rounded-full font-bold shadow-md hover:scale-105 transition disabled:grayscale" onClick={() => {
//                   const link = `${import.meta.env.VITE_WEBSITE_URL}/signup?ref=${userData.referralCode}`;
//                   window.open(`https://wa.me/?text=${encodeURIComponent("Join and earn points daily: " + link)}`, "_blank");
//               }}>WhatsApp</button>

//               <button disabled={!userData?.isActivate} onClick={copyReferral} className="flex items-center gap-2 bg-gray-600 text-white py-2 px-6 rounded-full font-bold shadow-md hover:scale-105 transition disabled:grayscale">
//                 {copied ? "Copied" : "Copy Link"}
//               </button>

//               <button onClick={handleInst} disabled={!userData?.isActivate} className="flex items-center gap-2 bg-pink-500 text-white py-2 px-6 rounded-full font-bold shadow-md hover:scale-105 transition disabled:grayscale">Instagram</button>
//             </div>
//           </div>

//           <button onClick={() => setShowModal(true)} disabled={userData?.walletAmount < 200} className={`w-full py-4 rounded-xl mb-4 font-bold text-lg shadow-lg ${userData?.walletAmount >= 200 ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-400 text-gray-200 cursor-not-allowed"}`}>
//             WITHDRAW POINTS
//           </button>

//           <p className="text-center text-gray-400 text-xs font-bold uppercase tracking-widest">
//             Total Points Withdrawn : {userData?.totalAmount}
//           </p>
//         </div>
//       </div>

//       {/* MODALS START HERE (Kept Same as Original) */}
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
//           <div className="bg-white rounded-xl shadow-lg p-6 w-11/12 max-w-md">
//             <h2 className="text-xl font-bold mb-4 text-center">Withdraw Points</h2>
//             {modalError && <p className="bg-red-500 text-white text-center p-2 rounded mb-4">{modalError}</p>}
//             <input type="number" placeholder="Enter amount" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full border p-2 rounded mb-3" />
//             <input type="text" placeholder="Bank Name" value={bankAccountName} onChange={(e) => setBankAccountName(e.target.value)} className="w-full border p-2 rounded mb-3" />
//             <input type="text" placeholder="IFSC" value={ifscCode} onChange={(e) => setIfscCode(e.target.value)} className="w-full border p-2 rounded mb-6" />
//             <div className="flex gap-4">
//               <button onClick={() => setShowModal(false)} className="flex-1 bg-gray-200 py-2 rounded font-bold">Cancel</button>
//               <button onClick={withdrawReq} className="flex-1 bg-blue-600 text-white py-2 rounded font-bold">Confirm</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {showQR && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
//           <div className="bg-white rounded-2xl p-6 shadow-lg w-11/12 max-w-md text-center">
//             <h2 className="text-xl font-bold mb-4">Scan & Pay ₹200</h2>
//             <img src={`${import.meta.env.VITE_APP_API_BASE_URL}${paymentConfig?.imageName}`} alt="QR" className="mx-auto w-56 h-56 border rounded-lg mb-4" />
//             <p className="font-bold mb-4">{paymentConfig?.upiId}</p>
//             <button onClick={handleProceedToProof} className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold">I HAVE PAID — NEXT</button>
//             <button onClick={() => setShowQR(false)} className="mt-4 text-gray-400">Cancel</button>
//           </div>
//         </div>
//       )}

//       {paymentModel && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
//           <div className="bg-white rounded-2xl shadow-2xl p-6 w-11/12 max-w-md">
//             <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Payment Proof</h2>
//             <input type="text" placeholder="UTR Number" value={utrNumber} onChange={(e) => setUtrNumber(e.target.value)} className="w-full border p-3 rounded-lg mb-4" />
//             <input type="file" onChange={(e) => setPaymentImage(e.target.files[0])} className="mb-6 w-full" />
//             <button onClick={submitPaymentProof} className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold">SUBMIT PROOF</button>
//             <button onClick={() => setPaymentModel(false)} className="w-full mt-4 text-gray-400">Cancel</button>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }



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
// import ScratchCard from "../Home/ScratchCard";

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
//   const [pointsEarned, setPointsEarned] = useState(0); // <--- यह लाइन ऐड की गई है

//   // --- New States for Points & Scratch Card ---
//   const [canScratch, setCanScratch] = useState(false);
//   const [isWithin30Days, setIsWithin30Days] = useState(false);
//   const [timeLeft, setTimeLeft] = useState("");

//   useEffect(() => {
//     dispatch(fetchUserData());
//   }, [dispatch]);

//   // --- Logic for 30 Days and 24 Hours Limit ---
//   useEffect(() => {
//     if (userData) {
//       // 1. Check 30 Days from Signup
//       const signupDate = new Date(userData.createdAt);
//       const now = new Date();
//       const diffDays = Math.ceil((now - signupDate) / (1000 * 60 * 60 * 24));
//       if (diffDays <= 30) setIsWithin30Days(true);

//       // 2. 24 Hour Limit Check
//       const checkTimer = () => {
//         const lastScratch = localStorage.getItem(`last_scratch_${userData._id}`);
//         if (lastScratch) {
//           const lastTime = new Date(lastScratch).getTime();
//           const distance = (24 * 60 * 60 * 1000) - (new Date().getTime() - lastTime);
//           if (distance > 0) {
//             setCanScratch(false);
//             const h = Math.floor(distance / (1000 * 60 * 60));
//             const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//             setTimeLeft(`${h}h ${m}m`);
//           } else { setCanScratch(true); }
//         } else { setCanScratch(true); }
//       };
//       checkTimer();
//       const interval = setInterval(checkTimer, 60000);
//       return () => clearInterval(interval);
//     }
//   }, [userData]);

//   // Handle Scratch Reward
//   const handleScratchComplete = async () => {
//     try {
//       const res = await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/claim-daily-points`, 
//         { userId }, { headers: { Authorization: `Bearer ${token}` } });
//       if (res.status === 200) {
//         toast.success("Points added successfully! 🎁");
//         localStorage.setItem(`last_scratch_${userData._id}`, new Date().toISOString());
//         setCanScratch(false);
//         dispatch(fetchUserData());
//       }
//     } catch (err) { toast.error("Claim failed. Try again."); }
//   };

//   // Convert Points to Real Money (Claim Button)
//   const handleClaimPointsToCash = async () => {
//     if (userData?.pointsBalance < 100) return toast.warning("Min 100 points needed to claim!");
//     try {
//       const res = await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/convert-points`, 
//         { userId }, { headers: { Authorization: `Bearer ${token}` } });
//       if (res.status === 200) {
//         toast.success(`Converted to ₹${res.data.convertedAmount}! 💰`);
//         dispatch(fetchUserData());
//       }
//     } catch (err) { toast.error("Conversion failed."); }
//   };

//   // --- Existing Functions (Keep Same) ---
//   const handleActivateClick = async () => { try { setShowQR(true); } catch (err) { console.error(err); } };
//   const getPaymentDetails = async () => {
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/payment-config`, { headers: { Authorization: `Bearer ${token}` } });
//       setPaymentConfig(res?.data);
//     } catch (error) { console.error(error); }
//   };
//   useEffect(() => { getPaymentDetails(); }, []);
//   const handleProceedToProof = () => { setShowQR(false); setPaymentModel(true); };
//   const copyReferral = async () => {
//     if (!userData?.referralCode) return;
//     const referralLink = `${import.meta.env.VITE_WEBSITE_URL}/signup?ref=${userData.referralCode}`;
//     await navigator.clipboard.writeText(referralLink);
//     setCopied(true); setTimeout(() => setCopied(false), 2000);
//   };
//   const handleInst = () => {
//     const referralLink = `${import.meta.env.VITE_WEBSITE_URL}/signup?ref=${userData.referralCode}`;
//     navigator.clipboard.writeText(referralLink).then(() => { window.open("https://www.instagram.com/direct/inbox/", "_blank"); });
//   };

//   const withdrawReq = async () => {
//     try {
//       if (userData?.walletAmount < amount) {
//         setModelError("Amount can not be greate than Availble amount");
//         setTimeout(() => setModelError(""), 1500);
//         return;
//       }
//       const response = await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/withdraw`, 
//         { userId, amount: Number(amount), bankAccountName, ifscCode }, { headers: { Authorization: `Bearer ${token}` } });
//       if (response?.data) {
//         toast.success("Withdraw Request Sent");
//         setShowModal(false); setAmount("");
//         dispatch(fetchUserData());
//       }
//     } catch (error) { toast.error("Something went wrong."); }
//   };

//   const submitPaymentProof = async () => {
//     const formData = new FormData();
//     formData.append("userId", userData?._id);
//     if (utrNumber) formData.append("utrNumber", utrNumber);
//     if (paymentImage) formData.append("paymentImage", paymentImage);
//     try {
//       const res = await axios.patch(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/payment-proof`, formData, 
//         { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } });
//       if (res.status === 200) { toast.success("Proof submitted!"); setPaymentModel(false); dispatch(fetchUserData()); }
//     } catch (error) { toast.error("Error submitting proof."); }
//   };

//   return (
//     <section className="w-full pt-16">
//       <div className="h-[50vh] flex items-center justify-center bg-grid" style={{ backgroundImage: `url(${bgImg})` }}>
//         <h1 className="text-6xl font-bold text-gray-800">REFER & EARN</h1>
//       </div>

//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
//         <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
//           <h1 className="text-2xl font-bold text-center mb-4">Refer & Earn – Earn 20k Points (₹200) for Every Friend! 💰</h1>
//           <p className="text-center text-gray-600 mb-4">
//             Join now, pay ₹200 activation fee and get 1000 Points signup bonus instantly! 
//             Claim daily coupon points for 30 days. 100 Points = ₹1.
//           </p>

//           {userData?.isActivate ? (
//             <button className="w-full bg-blue-500 text-white py-2 rounded-lg mb-6">Active User</button>
//           ) : userData?.utrNumber || userData?.paymentImage ? (
//             <button className="w-full bg-blue-500 text-white py-2 rounded-lg mb-6">Wait For Active Account</button>
//           ) : (
//             <button onClick={handleActivateClick} className="w-full bg-blue-500 text-white py-2 rounded-lg mb-6">Activate & Get Link</button>
//           )}

//           <h2 className="text-xl font-semibold text-center mb-4">How it Works</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 text-center">
//             <div><div className="rounded-full inline-flex items-center justify-center mb-3 mx-auto" style={{ width: 64, height: 64 }}><img src={googleImg} alt="Google" /></div><p className="text-gray-800"><strong>Login / Sign Up</strong><br />1-click Google Login.</p></div>
//             <div><div className="inline-flex items-center justify-center mb-3 mx-auto" style={{ width: 64, height: 64 }}><img src={account} alt="Payment" /></div><p className="text-gray-800"><strong>Activate Account</strong><br />Unlock your referral link instantly.</p></div>
//             <div><div className="rounded-full inline-flex items-center justify-center mb-3 mx-auto" style={{ width: 64, height: 64 }}><img src={share} alt="Share" /></div><p className="text-gray-800"><strong>Share & Earn</strong><br />Earn points and ₹200 per referral.</p></div>
//           </div>

//           {/* --- GOLDEN BOX (DAILY COUPON & CLAIM) --- */}
//           {isWithin30Days && (
//             <div className="w-full bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 p-6 rounded-2xl shadow-xl border-2 border-amber-600 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
//                 <div className="text-center md:text-left">
//                     <h2 className="text-amber-900 font-extrabold text-lg uppercase tracking-tighter">✨ Daily Lucky Coupon ✨</h2>
//                     <p className="text-amber-800 text-xs mb-3 font-semibold">Balance: <span className="text-xl font-black">{userData?.pointsBalance || 0} Points</span></p>
//                     <button 
//                       onClick={handleClaimPointsToCash}
//                       className="bg-amber-900 text-white px-4 py-2 rounded-lg font-bold shadow-md hover:bg-black transition active:scale-95 text-sm"
//                     >
//                       CLAIM POINTS TO CASH (₹)
//                     </button>
//                 </div>

//                 <div className="bg-white/40 p-2 rounded-xl backdrop-blur-sm border border-white/50">
//                    {canScratch ? (
//                     <div className="flex flex-col items-center">
//                        <ScratchCard width={260} height={130} revealPercent={60} onComplete={handleScratchComplete}   rewardValue={pointsEarned}/>
//                        <p className="mt-1 text-amber-900 font-bold text-[10px] animate-pulse">SCRATCH TO GET POINTS! 👆</p>
//                     </div>
//                    ) : (
//                     <div className="text-center py-6 px-10">
//                        <p className="text-amber-900 font-bold text-sm">Next coupon in:</p>
//                        <p className="text-xl font-black text-amber-900 mt-1">{timeLeft}</p>
//                     </div>
//                    )}
//                 </div>
//             </div>
//           )}

//           <h2 className="w-full bg-blue-500 text-center text-semibold text-white py-2 rounded-lg mb-6">Wallet & Referral Overview</h2>
//           <div className="grid grid-cols-2 gap-4 text-center mb-6 bg-gray-50 p-4 rounded-xl border border-gray-200">
//             <div><p className="text-gray-500 text-xs uppercase">Point Balance</p><span className="font-bold text-xl">{userData?.pointsBalance || 0} Pts</span></div>
//             <div><p className="text-gray-500 text-xs uppercase">Money Wallet (₹)</p><span className="font-bold text-xl text-blue-600">₹{userData?.walletAmount || 0}</span></div>
//             <div><p className="text-gray-500 text-xs uppercase">Active Referrals</p><span className="font-bold text-xl text-green-600">{userData?.activeReferralsCount}</span></div>
//             <div><p className="text-gray-500 text-xs uppercase">Min. Withdrawal</p><span className="font-bold text-xl">₹200</span></div>
//           </div>

//           <div className="text-center mb-4">
//             {userData?.isActivate && <p className="font-medium bg-blue-50 py-2 rounded mb-4">REFERRAL CODE : {userData?.referralCode}</p>}
//             <div className="flex flex-wrap justify-center gap-4">
//               <button disabled={!userData?.isActivate} className="flex items-center gap-2 bg-green-500 text-white py-1 px-4 rounded" onClick={() => {
//                   const link = `${import.meta.env.VITE_WEBSITE_URL}/signup?ref=${userData.referralCode}`;
//                   window.open(`https://wa.me/?text=${encodeURIComponent("Join and earn points daily: " + link)}`, "_blank");
//               }}>WhatsApp</button>
//               <button disabled={!userData?.isActivate} onClick={copyReferral} className="flex items-center gap-2 bg-gray-500 text-white py-1 px-4 rounded">{copied ? "Copied" : "Copy"}</button>
//               <button onClick={handleInst} disabled={!userData?.isActivate} className="flex items-center gap-2 bg-pink-500 text-white py-1 px-4 rounded">Instagram</button>
//             </div>
//           </div>

//           <button
//             onClick={() => setShowModal(true)}
//             disabled={userData?.walletAmount < 200}
//             className={`w-full py-3 rounded-lg mb-4 text-white font-bold text-lg shadow-lg ${userData?.walletAmount >= 200 ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}`}
//           >
//             Withdraw Points (Money)
//           </button>
//           <p className="text-center text-gray-400 text-sm">Total Withdraw : {userData?.totalAmount}</p>
//         </div>
//       </div>

//       {/* --- MODALS (KEEP AS IT IS) --- */}
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
//           <div className="bg-white rounded-xl shadow-lg p-6 w-11/12 max-w-md relative">
//             <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">Withdraw Amount</h2>
//             {modalError && <h2 className="bg-red-500 text-white text-center my-4 p-2 rounded">Amount not Available!</h2>}
//             <label>Available: ₹{userData?.walletAmount}</label>
//             <input type="text" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full border p-2 rounded mb-4 mt-1" />
//             <input type="text" placeholder="Bank Name" value={bankAccountName} onChange={(e) => setBankAccountName(e.target.value)} className="w-full border p-2 rounded mb-4" />
//             <input type="text" placeholder="IFSC" value={ifscCode} onChange={(e) => setIfscCode(e.target.value)} className="w-full border p-2 rounded mb-6" />
//             <div className="flex justify-between gap-2">
//               <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-200 rounded-lg">Cancel</button>
//               <button onClick={withdrawReq} className="px-4 py-2 bg-blue-500 text-white rounded-lg">Confirm</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {showQR && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
//           <div className="bg-white rounded-2xl p-6 shadow-lg w-11/12 max-w-md text-center">
//             <h2 className="text-xl font-semibold mb-4 text-gray-800">Scan & Pay ₹200</h2>
//             <img src={`${import.meta.env.VITE_APP_API_BASE_URL}${paymentConfig?.imageName}`} alt="QR" className="w-56 h-56 mx-auto mb-4 border rounded" />
//             <div className="font-bold mb-2">{paymentConfig?.upiId}</div>
//             <button onClick={handleProceedToProof} className="w-full bg-blue-500 text-white py-2 rounded-lg mb-2">I Have Paid — Next</button>
//             <button onClick={() => setShowQR(false)} className="text-gray-400 text-sm">Cancel</button>
//           </div>
//         </div>
//       )}

//       {paymentModel && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
//           <div className="bg-white rounded-2xl shadow-2xl p-6 w-11/12 max-w-md relative">
//             <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Payment Proof</h2>
//             <input type="text" placeholder="UTR Number" value={utrNumber} onChange={(e) => setUtrNumber(e.target.value)} className="w-full border p-2 rounded mb-4" />
//             <input type="file" onChange={(e) => setPaymentImage(e.target.files[0])} className="w-full mb-6" />
//             <div className="flex justify-between">
//               <button onClick={() => setPaymentModel(false)} className="px-4 py-2 border rounded">Cancel</button>
//               <button onClick={submitPaymentProof} className="px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }


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
// import ScratchCard from "../Home/ScratchCard";

// export default function Apply() {
//   const dispatch = useDispatch();
//   const token = localStorage.getItem("totoToken");
//   const { userData } = useSelector((state) => state.user);
//   const [copied, setCopied] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [amount, setAmount] = useState("");
//   const [ifscCode, setIfscCode] = useState("");
//   const [bankAccountName, setBankAccountName] = useState("");
//   const userId = localStorage.getItem("userId");
//   const [paymentModel, setPaymentModel] = useState(false);
//   const [utrNumber, setUtrNumber] = useState("");
//   const [paymentImage, setPaymentImage] = useState(null);
//   const [previewImage, setPreviewImage] = useState(null);
//   const [showQR, setShowQR] = useState(false);
//   const [paymentConfig, setPaymentConfig] = useState();
//   const [modalError, setModelError] = useState();

//   // --- Points & Scratch Card States ---
//   const [canScratch, setCanScratch] = useState(false);
//   const [isWithin30Days, setIsWithin30Days] = useState(false);
//   const [timeLeft, setTimeLeft] = useState("");
//   const [pointsEarned, setPointsEarned] = useState(0); // Today's dynamic reward points

//   useEffect(() => {
//     dispatch(fetchUserData());
//   }, [dispatch]);

//   // --- Logic for 30 Days from Signup and 24 Hours Scratch Limit ---
//   useEffect(() => {
//     if (userData) {
//       // 1. Check if user is within 30 days of joining
//       const signupDate = new Date(userData.createdAt);
//       const now = new Date();
//       const diffDays = Math.ceil((now - signupDate) / (1000 * 60 * 60 * 24));
//       if (diffDays <= 30) setIsWithin30Days(true);

//       // 2. Logic for 24-hour scratch timer
//       const checkTimer = () => {
//         const lastScratch = localStorage.getItem(`last_scratch_${userData._id}`);
//         if (lastScratch) {
//           const lastTime = new Date(lastScratch).getTime();
//           const distance = (24 * 60 * 60 * 1000) - (new Date().getTime() - lastTime);
//           if (distance > 0) {
//             setCanScratch(false);
//             const h = Math.floor(distance / (1000 * 60 * 60));
//             const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//             setTimeLeft(`${h}h ${m}m`);
//           } else { setCanScratch(true); }
//         } else { setCanScratch(true); }
//       };
//       checkTimer();
//       const interval = setInterval(checkTimer, 60000);
//       return () => clearInterval(interval);
//     }
//   }, [userData]);

//   // --- Get Today's Reward Points (Dynamic preview before scratching) ---
//   useEffect(() => {
//     if (canScratch && userId && token) {
//       const getPoints = async () => {
//         try {
//           const res = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/today-reward-points`, 
//             { params: { userId }, headers: { Authorization: `Bearer ${token}` } });
//           setPointsEarned(res.data.points);
//         } catch (err) {
//           console.error("Error fetching daily reward amount");
//         }
//       };
//       getPoints();
//     }
//   }, [canScratch, userId, token]);

//   // --- Handle Scratch Completion ---
//   const handleScratchComplete = async () => {
//     try {
//       const res = await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/claim-daily-points`, 
//         { userId }, { headers: { Authorization: `Bearer ${token}` } });
//       if (res.status === 200) {
//         toast.success(`${pointsEarned} Points added successfully! 🎁`);
//         localStorage.setItem(`last_scratch_${userData._id}`, new Date().toISOString());
//         setCanScratch(false);
//         dispatch(fetchUserData());
//       }
//     } catch (err) { toast.error("Claim failed. Try again."); }
//   };

//   // --- Convert Points to Cash (100 Points = ₹1) ---
//   const handleClaimPointsToCash = async () => {
//     if (userData?.pointsBalance < 100) return toast.warning("Min 100 points needed to claim!");
//     try {
//       const res = await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/convert-points`, 
//         { userId }, { headers: { Authorization: `Bearer ${token}` } });
//       if (res.status === 200) {
//         toast.success(`Converted to ₹${res.data.convertedAmount}! 💰`);
//         dispatch(fetchUserData());
//       }
//     } catch (err) { toast.error("Conversion failed."); }
//   };

//   // --- Existing Utility Functions (Keeping functionality same) ---
//   const handleActivateClick = async () => { try { setShowQR(true); } catch (err) { console.error(err); } };
//   const getPaymentDetails = async () => {
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/payment-config`, { headers: { Authorization: `Bearer ${token}` } });
//       setPaymentConfig(res?.data);
//     } catch (error) { console.error(error); }
//   };
//   useEffect(() => { getPaymentDetails(); }, []);

//   const handleProceedToProof = () => { setShowQR(false); setPaymentModel(true); };

//   const copyReferral = async () => {
//     if (!userData?.referralCode) return;
//     const referralLink = `${import.meta.env.VITE_WEBSITE_URL}/signup?ref=${userData.referralCode}`;
//     await navigator.clipboard.writeText(referralLink);
//     setCopied(true); setTimeout(() => setCopied(false), 2000);
//   };

//   const handleInst = () => {
//     const referralLink = `${import.meta.env.VITE_WEBSITE_URL}/signup?ref=${userData.referralCode}`;
//     navigator.clipboard.writeText(referralLink).then(() => { window.open("https://www.instagram.com/direct/inbox/", "_blank"); });
//   };

//   const withdrawReq = async () => {
//     try {
//       if (userData?.walletAmount < amount) {
//         setModelError("Amount can not be greate than Availble amount");
//         setTimeout(() => setModelError(""), 1500);
//         return;
//       }
//       const response = await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/withdraw`, 
//         { userId, amount: Number(amount), bankAccountName, ifscCode }, { headers: { Authorization: `Bearer ${token}` } });
//       if (response?.data) {
//         toast.success("Withdraw Request Sent");
//         setShowModal(false); setAmount("");
//         dispatch(fetchUserData());
//       }
//     } catch (error) { toast.error("Something went wrong."); }
//   };

//   const submitPaymentProof = async () => {
//     const formData = new FormData();
//     formData.append("userId", userData?._id);
//     if (utrNumber) formData.append("utrNumber", utrNumber);
//     if (paymentImage) formData.append("paymentImage", paymentImage);
//     try {
//       const res = await axios.patch(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/payment-proof`, formData, 
//         { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } });
//       if (res.status === 200) { toast.success("Proof submitted!"); setPaymentModel(false); dispatch(fetchUserData()); }
//     } catch (error) { toast.error("Error submitting proof."); }
//   };

//   return (
//     <section className="w-full pt-16">
//       <div className="h-[50vh] flex items-center justify-center bg-grid" style={{ backgroundImage: `url(${bgImg})` }}>
//         <h1 className="text-6xl font-bold text-gray-800">REFER & EARN</h1>
//       </div>

//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
//         <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
//           <h1 className="text-2xl font-bold text-center mb-4 text-blue-800 tracking-tight">Refer & Earn – Earn 20k Points (₹200) Per Friend! 💰</h1>
//           <p className="text-center text-gray-600 mb-6 text-sm">
//             Join now, pay ₹200 activation fee and get 1000 Points signup bonus instantly! 
//             Claim daily coupon points for 30 days. 100 Points = ₹1.
//           </p>

//           {/* User Activation Status Button */}
//           {userData?.isActivate ? (
//             <button className="w-full bg-green-600 text-white py-2 rounded-lg mb-6 font-bold shadow-sm">✓ ACTIVE USER</button>
//           ) : userData?.utrNumber || userData?.paymentImage ? (
//             <button className="w-full bg-yellow-500 text-white py-2 rounded-lg mb-6 font-bold animate-pulse">PENDING ACTIVATION...</button>
//           ) : (
//             <button onClick={handleActivateClick} className="w-full bg-blue-600 text-white py-2 rounded-lg mb-6 font-bold hover:bg-blue-700 transition">ACTIVATE & GET LINK</button>
//           )}

//           {/* How it Works Section */}
//           <h2 className="text-xl font-bold text-center mb-4">How it Works</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 text-center">
//             <div className="flex flex-col items-center"><img src={googleImg} className="w-12 h-12 mb-2" alt="Google" /><p className="text-sm"><strong>Login</strong><br />1-click Google Sign Up.</p></div>
//             <div className="flex flex-col items-center"><img src={account} className="w-12 h-12 mb-2" alt="Activate" /><p className="text-sm"><strong>Activate</strong><br />Get your referral code.</p></div>
//             <div className="flex flex-col items-center"><img src={share} className="w-12 h-12 mb-2" alt="Earn" /><p className="text-sm"><strong>Earn</strong><br />Points & ₹200 per friend.</p></div>
//           </div>

//           {/* --- GOLDEN BOX (DAILY COUPON & POINTS CLAIM) --- */}
//           {isWithin30Days && (
//             <div className="w-full bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 p-6 rounded-2xl shadow-xl border-2 border-amber-600 mb-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
//                 <div className="absolute top-0 right-0 p-2 opacity-10 text-6xl">💎</div>
//                 <div className="text-center md:text-left">
//                     <h2 className="text-amber-900 font-extrabold text-lg uppercase tracking-tighter">✨ Daily Lucky Coupon ✨</h2>
//                     <p className="text-amber-800 text-xs mb-3 font-semibold">Current Balance: <span className="text-xl font-black text-amber-950">{userData?.pointsBalance || 0} Points</span></p>
//                     <button 
//                       onClick={handleClaimPointsToCash}
//                       disabled={!userData?.pointsBalance || userData.pointsBalance < 100}
//                       className={`px-4 py-2 rounded-lg font-bold shadow-lg transition text-sm ${
//                         userData?.pointsBalance >= 100 
//                         ? "bg-amber-950 text-white hover:bg-black" 
//                         : "bg-gray-400 text-gray-200 cursor-not-allowed"
//                       }`}
//                     >
//                       CLAIM POINTS TO CASH (₹)
//                     </button>
//                     <p className="text-[10px] text-amber-900 mt-2 italic font-bold">*100 Points = ₹1.00</p>
//                 </div>

//                 <div className="bg-white/40 p-2 rounded-xl backdrop-blur-sm border border-white/50 min-w-[280px]">
//                    {canScratch ? (
//                     <div className="flex flex-col items-center">
//                        <ScratchCard 
//                           width={260} 
//                           height={130} 
//                           revealPercent={60} 
//                           rewardValue={pointsEarned} // Dynamically show today's potential points
//                           onComplete={handleScratchComplete} 
//                         />
//                        <p className="mt-2 text-amber-900 font-black text-[10px] animate-pulse uppercase">Scratch to reveal reward! 👆</p>
//                     </div>
//                    ) : (
//                     <div className="text-center py-6 px-10">
//                        <p className="text-amber-900 font-bold text-sm">Next coupon ready in:</p>
//                        <div className="bg-amber-900/20 text-amber-900 px-4 py-2 rounded-lg mt-2 font-mono text-2xl font-black inline-block">
//                           {timeLeft}
//                        </div>
//                        <p className="text-amber-800 text-[10px] mt-3 italic font-medium tracking-tight">
//                          Come back tomorrow to win more!
//                        </p>
//                     </div>
//                    )}
//                 </div>
//             </div>
//           )}

//           {/* Wallet Overview Table */}
//           <h2 className="w-full bg-blue-600 text-center font-bold text-white py-3 rounded-t-xl tracking-widest uppercase">Wallet & Referral Overview</h2>
//           <div className="grid grid-cols-2 gap-px bg-gray-200 border-x border-b rounded-b-xl overflow-hidden mb-8 shadow-sm">
//             <div className="bg-white p-4 text-center border-r border-b">
//               <p className="text-gray-400 text-[10px] uppercase font-bold">Points Balance</p>
//               <p className="text-2xl font-black text-amber-600">{userData?.pointsBalance || 0} Pts</p>
//             </div>
//             <div className="bg-white p-4 text-center border-b">
//               <p className="text-gray-400 text-[10px] uppercase font-bold">Money Wallet (₹)</p>
//               <p className="text-2xl font-black text-blue-600">₹{userData?.walletAmount || 0}</p>
//             </div>
//             <div className="bg-white p-4 text-center border-r">
//               <p className="text-gray-400 text-[10px] uppercase font-bold">Active Referrals</p>
//               <p className="text-xl font-bold text-green-600">{userData?.activeReferralsCount || 0}</p>
//             </div>
//             <div className="bg-white p-4 text-center">
//               <p className="text-gray-400 text-[10px] uppercase font-bold">Min. Withdrawal</p>
//               <p className="text-xl font-bold text-gray-800">₹200</p>
//             </div>
//           </div>

//           {/* Referral Link & Social Actions */}
//           <div className="text-center mb-6">
//             {userData?.isActivate && (
//               <div className="bg-blue-50 py-2 rounded-lg border border-dashed border-blue-200 mb-4">
//                 <span className="text-xs text-gray-500 font-bold uppercase">Your Referral Code</span>
//                 <p className="text-xl font-black text-blue-700 tracking-wider">{userData?.referralCode}</p>
//               </div>
//             )}
//             <div className="flex flex-wrap justify-center gap-4">
//               <button disabled={!userData?.isActivate} className="flex items-center gap-2 bg-green-500 text-white py-2 px-6 rounded-full font-bold shadow-md hover:bg-green-600 transition disabled:opacity-50" onClick={() => {
//                   const link = `${import.meta.env.VITE_WEBSITE_URL}/signup?ref=${userData.referralCode}`;
//                   window.open(`https://wa.me/?text=${encodeURIComponent("Join and earn daily rewards: " + link)}`, "_blank");
//               }}>WhatsApp</button>
//               <button disabled={!userData?.isActivate} onClick={copyReferral} className="flex items-center gap-2 bg-gray-700 text-white py-2 px-6 rounded-full font-bold shadow-md disabled:opacity-50">{copied ? "COPIED! ✅" : "COPY LINK"}</button>
//               <button onClick={handleInst} disabled={!userData?.isActivate} className="flex items-center gap-2 bg-pink-500 text-white py-2 px-6 rounded-full font-bold shadow-md disabled:opacity-50">INSTAGRAM</button>
//             </div>
//           </div>

//           {/* Main Withdrawal Button */}
//           <button
//             onClick={() => setShowModal(true)}
//             disabled={userData?.walletAmount < 200}
//             className={`w-full py-4 rounded-2xl font-black text-lg shadow-xl mb-4 transition-all transform active:scale-95 ${
//               userData?.walletAmount >= 200 ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-300 text-gray-500 cursor-not-allowed"
//             }`}
//           >
//             WITHDRAW MONEY (₹)
//           </button>

//           <p className="text-center text-gray-400 font-bold text-[10px] uppercase tracking-widest">
//             Total Withdrawn To Date: ₹{userData?.totalAmount || 0}
//           </p>
//         </div>
//       </div>

//       {/* MODALS CODE (Kept same as original logic but slightly cleaner UI) */}
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
//           <div className="bg-white rounded-2xl shadow-2xl p-6 w-11/12 max-w-md relative">
//             <h2 className="text-xl font-bold mb-4 text-gray-800 text-center uppercase tracking-tight">Withdraw Funds</h2>
//             {modalError && <h2 className="bg-red-500 text-white text-center py-2 rounded mb-4 text-xs font-bold">{modalError}</h2>}
//             <div className="mb-4 text-center"><p className="text-xs text-gray-400 uppercase">Available for transfer</p><p className="text-2xl font-black text-blue-600">₹{userData?.walletAmount}</p></div>
//             <input type="number" placeholder="Enter amount (min ₹200)" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full border p-3 rounded-xl mb-3 focus:outline-blue-400" />
//             <input type="text" placeholder="Bank Account Holder Name" value={bankAccountName} onChange={(e) => setBankAccountName(e.target.value)} className="w-full border p-3 rounded-xl mb-3 focus:outline-blue-400" />
//             <input type="text" placeholder="IFSC Code" value={ifscCode} onChange={(e) => setIfscCode(e.target.value)} className="w-full border p-3 rounded-xl mb-6 focus:outline-blue-400" />
//             <div className="flex gap-4">
//               <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-3 bg-gray-100 rounded-xl font-bold text-gray-500">CANCEL</button>
//               <button onClick={withdrawReq} className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg">CONFIRM</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* QR Code Modal */}
//       {showQR && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md z-50">
//           <div className="bg-white rounded-3xl p-8 shadow-2xl w-11/12 max-w-md text-center border-t-8 border-blue-600">
//             <h2 className="text-xl font-black mb-1 text-gray-800">SCAN & PAY ₹200</h2>
//             <p className="text-xs text-gray-400 mb-6 uppercase tracking-widest">To activate your referral link</p>
//             <div className="flex justify-center mb-6">
//               <img src={`${import.meta.env.VITE_APP_API_BASE_URL}${paymentConfig?.imageName}`} alt="QR" className="w-56 h-56 object-contain border-4 border-gray-50 p-2 rounded-2xl shadow-inner" />
//             </div>
//             <p className="font-mono bg-gray-50 py-2 rounded-lg text-blue-600 font-bold mb-6">{paymentConfig?.upiId}</p>
//             <button onClick={handleProceedToProof} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-xl active:scale-95 transition-all">I HAVE PAID — PROCEED TO NEXT</button>
//             <button onClick={() => setShowQR(false)} className="mt-4 text-gray-400 font-bold text-xs uppercase tracking-widest">Cancel Transaction</button>
//           </div>
//         </div>
//       )}

//       {/* Payment Proof Modal */}
//       {paymentModel && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
//           <div className="bg-white rounded-3xl shadow-2xl p-8 w-11/12 max-w-md">
//             <h2 className="text-2xl font-black mb-6 text-gray-800 text-center">SUBMIT PROOF</h2>
//             <label className="text-[10px] text-gray-400 font-bold uppercase mb-1 block">UTR Number / Transaction ID</label>
//             <input type="text" placeholder="Enter 12-digit UTR" value={utrNumber} onChange={(e) => setUtrNumber(e.target.value)} className="w-full border p-3 rounded-xl mb-4 focus:outline-blue-500" />
//             <label className="text-[10px] text-gray-400 font-bold uppercase mb-1 block">Payment Screenshot</label>
//             <input type="file" onChange={(e) => setPaymentImage(e.target.files[0])} className="w-full mb-8 text-xs text-gray-500" />
//             <button onClick={submitPaymentProof} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-xl">SUBMIT FOR REVIEW</button>
//             <button onClick={() => setPaymentModel(false)} className="w-full mt-4 text-gray-400 font-bold text-xs">Back</button>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }

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
// import ScratchCard from "../Home/ScratchCard";

// export default function Apply() {
//   const dispatch = useDispatch();
//   const token = localStorage.getItem("totoToken");
//   const { userData } = useSelector((state) => state.user);
//   const [copied, setCopied] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [amount, setAmount] = useState("");
//   const [ifscCode, setIfscCode] = useState("");
//   const [bankAccountName, setBankAccountName] = useState("");
//   const userId = localStorage.getItem("userId");
//   const [paymentModel, setPaymentModel] = useState(false);
//   const [utrNumber, setUtrNumber] = useState("");
//   const [paymentImage, setPaymentImage] = useState(null);
//   const [showQR, setShowQR] = useState(false);
//   const [paymentConfig, setPaymentConfig] = useState();
//   const [modalError, setModelError] = useState();

//   // --- Rewards & Scratch States ---
//   const [canScratch, setCanScratch] = useState(false);
//   const [isWithin30Days, setIsWithin30Days] = useState(false);
//   const [timeLeft, setTimeLeft] = useState("");
//   const [pointsEarned, setPointsEarned] = useState(0); 
//   const [showSignupClaim, setShowSignupClaim] = useState(false); // New state for Signup Claim button

//   useEffect(() => {
//     dispatch(fetchUserData());
//   }, [dispatch]);

//   // --- Points Logic: Signup Claim & Daily Scratch Timer ---
//   useEffect(() => {
//     if (userData) {
//       // 1. Check if Signup Bonus (1000 pts) is already claimed
//       const signupClaimed = localStorage.getItem(`signup_claimed_${userData._id}`);

//       // If Active but not claimed yet, show the "Claim 1000 Pts" button
//       if (userData.isActivate && !signupClaimed && userData.pointsBalance < 1000) {
//         setShowSignupClaim(true);
//       } else {
//         setShowSignupClaim(false);
//       }

//       // 2. Logic for 30 Days and 24 Hour Scratch Limit
//       const signupDate = new Date(userData.createdAt);
//       const now = new Date();
//       const diffDays = Math.ceil((now - signupDate) / (1000 * 60 * 60 * 24));
//       if (diffDays <= 30) setIsWithin30Days(true);

//       const checkTimer = () => {
//         const lastScratch = localStorage.getItem(`last_scratch_${userData._id}`);
//         if (lastScratch) {
//           const lastTime = new Date(lastScratch).getTime();
//           const distance = (24 * 60 * 60 * 1000) - (new Date().getTime() - lastTime);
//           if (distance > 0) {
//             setCanScratch(false);
//             const h = Math.floor(distance / (1000 * 60 * 60));
//             const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//             setTimeLeft(`${h}h ${m}m`);
//           } else { setCanScratch(true); }
//         } else if (signupClaimed || userData.pointsBalance >= 1000) { 
//            // Only allow daily scratch if signup points are handled
//           setCanScratch(true); 
//         }
//       };
//       checkTimer();
//       const interval = setInterval(checkTimer, 60000);
//       return () => clearInterval(interval);
//     }
//   }, [userData]);

//   // --- Action: Claim 1000 Points Signup Bonus ---
//   const handleClaimSignupBonus = async () => {
//     try {
//       const res = await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/claim-signup-bonus`, 
//         { userId }, { headers: { Authorization: `Bearer ${token}` } });
//       if (res.status === 200) {
//         toast.success("1000 Signup Points Claimed! 🎁");
//         localStorage.setItem(`signup_claimed_${userData._id}`, "true");
//         setShowSignupClaim(false);
//         dispatch(fetchUserData());
//       }
//     } catch (err) { toast.error("Claim failed. Please try again."); }
//   };

//   // --- Get Today's Reward Points ---
//   useEffect(() => {
//     if (canScratch && userId && token && !showSignupClaim) {
//       const getPoints = async () => {
//         try {
//           const res = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/today-reward-points`, 
//             { params: { userId }, headers: { Authorization: `Bearer ${token}` } });
//           setPointsEarned(res.data.points);
//         } catch (err) { console.error(err); }
//       };
//       getPoints();
//     }
//   }, [canScratch, userId, token, showSignupClaim]);

//   const handleScratchComplete = async () => {
//     try {
//       const res = await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/claim-daily-points`, 
//         { userId }, { headers: { Authorization: `Bearer ${token}` } });
//       if (res.status === 200) {
//         toast.success(`${pointsEarned} Points added successfully!`);
//         localStorage.setItem(`last_scratch_${userData._id}`, new Date().toISOString());
//         setCanScratch(false);
//         dispatch(fetchUserData());
//       }
//     } catch (err) { toast.error("Claim failed."); }
//   };

//   const handleClaimPointsToCash = async () => {
//     if (!userData?.isActivate) return toast.error("Activate account first!");
//     if (userData?.pointsBalance < 100) return toast.warning("Min 100 points needed!");
//     try {
//       const res = await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/convert-points`, 
//         { userId }, { headers: { Authorization: `Bearer ${token}` } });
//       if (res.status === 200) {
//         toast.success(`Converted to ₹${res.data.convertedAmount}! 💰`);
//         dispatch(fetchUserData());
//       }
//     } catch (err) { toast.error("Conversion failed."); }
//   };

//   // --- Existing Functions (Unchanged) ---
//   const handleActivateClick = () => setShowQR(true);
//   const getPaymentDetails = async () => {
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/payment-config`, { headers: { Authorization: `Bearer ${token}` } });
//       setPaymentConfig(res?.data);
//     } catch (error) { console.error(error); }
//   };
//   useEffect(() => { getPaymentDetails(); }, []);
//   const handleProceedToProof = () => { setShowQR(false); setPaymentModel(true); };
//   const copyReferral = async () => {
//     if (!userData?.referralCode) return;
//     const referralLink = `${import.meta.env.VITE_WEBSITE_URL}/signup?ref=${userData.referralCode}`;
//     await navigator.clipboard.writeText(referralLink);
//     setCopied(true); setTimeout(() => setCopied(false), 2000);
//   };
//   const handleInst = () => {
//     const link = `${import.meta.env.VITE_WEBSITE_URL}/signup?ref=${userData.referralCode}`;
//     navigator.clipboard.writeText(link).then(() => { window.open("https://www.instagram.com/direct/inbox/", "_blank"); });
//   };
//   const withdrawReq = async () => {
//     try {
//       if (userData?.walletAmount < amount) { setModelError("Low Balance!"); return; }
//       const res = await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/withdraw`, 
//         { userId, amount: Number(amount), bankAccountName, ifscCode }, { headers: { Authorization: `Bearer ${token}` } });
//       if (res?.data) { toast.success("Withdraw Sent"); setShowModal(false); setAmount(""); dispatch(fetchUserData()); }
//     } catch (err) { toast.error("Error"); }
//   };
//   const submitPaymentProof = async () => {
//     const formData = new FormData();
//     formData.append("userId", userData?._id);
//     if (utrNumber) formData.append("utrNumber", utrNumber);
//     if (paymentImage) formData.append("paymentImage", paymentImage);
//     try {
//       const res = await axios.patch(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/payment-proof`, formData, 
//         { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } });
//       if (res.status === 200) { toast.success("Proof submitted!"); setPaymentModel(false); dispatch(fetchUserData()); }
//     } catch (error) { toast.error("Error submitting proof."); }
//   };

//   return (
//     <section className="w-full pt-16">
//       <div className="h-[50vh] flex items-center justify-center bg-grid" style={{ backgroundImage: `url(${bgImg})` }}>
//         <h1 className="text-6xl font-bold text-gray-800 tracking-tighter uppercase italic">REFER & EARN</h1>
//       </div>

//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
//         <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
//           <h1 className="text-2xl font-bold text-center mb-4 text-blue-800 tracking-tight">Refer & Earn – Earn 20k Points (₹200) Per Friend! 💰</h1>

//           {/* User Activation Status Button */}
//           {userData?.isActivate ? (
//             <button className="w-full bg-green-600 text-white py-3 rounded-lg mb-6 font-black shadow-md tracking-widest">✓ ACTIVE USER</button>
//           ) : userData?.utrNumber || userData?.paymentImage ? (
//             <button className="w-full bg-yellow-500 text-white py-3 rounded-lg mb-6 font-black shadow-md animate-pulse">PENDING ACTIVATION...</button>
//           ) : (
//             <button onClick={handleActivateClick} className="w-full bg-blue-600 text-white py-3 rounded-lg mb-6 font-black shadow-md hover:bg-blue-700 transition tracking-widest">ACTIVATE & GET LINK</button>
//           )}

//           {/* How it Works Section */}
//           <h2 className="text-xl font-bold text-center mb-6">How it Works</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 text-center">
//             <div className="flex flex-col items-center"><img src={googleImg} className="w-12 h-12 mb-2" alt="Google" /><p className="text-sm"><strong>Login</strong><br />1-click Google Login.</p></div>
//             <div className="flex flex-col items-center"><img src={account} className="w-12 h-12 mb-2" alt="Activate" /><p className="text-sm"><strong>Activate</strong><br />Get your referral code.</p></div>
//             <div className="flex flex-col items-center"><img src={share} className="w-12 h-12 mb-2" alt="Earn" /><p className="text-sm"><strong>Earn</strong><br />Points & ₹200 per friend.</p></div>
//           </div>

//           {/* --- GOLDEN BOX (Signup Bonus & Daily Coupon Logic) --- */}
//           {(isWithin30Days || showSignupClaim) && (
//             <div className="w-full bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 p-6 rounded-2xl shadow-xl border-2 border-amber-600 mb-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
//                 <div className="absolute top-0 right-0 p-2 opacity-10 text-6xl">💎</div>
//                 <div className="text-center md:text-left">
//                     <h2 className="text-amber-900 font-extrabold text-lg uppercase tracking-tighter">✨ Daily Lucky Coupon ✨</h2>
//                     <p className="text-amber-800 text-xs mb-3 font-semibold">Balance: <span className="text-xl font-black text-amber-950">{userData?.pointsBalance || 0} Points</span></p>
//                     <button 
//                       onClick={handleClaimPointsToCash}
//                       className={`px-4 py-2 rounded-lg font-bold shadow-lg transition text-sm ${
//                         userData?.isActivate && userData?.pointsBalance >= 100 
//                         ? "bg-amber-950 text-white hover:bg-black" 
//                         : "bg-gray-400 text-gray-200 cursor-not-allowed"
//                       }`}
//                     >
//                       {userData?.isActivate ? "CLAIM POINTS TO CASH (₹)" : "ACTIVATE TO CLAIM (₹)"}
//                     </button>
//                 </div>

//                 <div className="bg-white/40 p-2 rounded-xl backdrop-blur-sm border border-white/50 min-w-[280px] flex flex-col items-center justify-center">
//                    {!userData?.isActivate ? (
//                       <div className="text-center p-4">
//                         <p className="text-amber-950 font-black text-sm">Pay ₹200 to unlock your<br/>1,000 Pts Signup Bonus!</p>
//                       </div>
//                    ) : showSignupClaim ? (
//                       /* --- CLAIM BUTTON FOR 1000 POINTS AFTER PAYMENT --- */
//                       <button 
//                         onClick={handleClaimSignupBonus}
//                         className="bg-amber-950 text-amber-200 px-6 py-4 rounded-xl font-black text-lg shadow-2xl animate-bounce hover:scale-105 transition"
//                       >
//                         CLAIM 1,000 PTS NOW!
//                       </button>
//                    ) : canScratch ? (
//                       <div className="flex flex-col items-center">
//                          <ScratchCard width={260} height={130} revealPercent={60} rewardValue={pointsEarned} onComplete={handleScratchComplete} />
//                          <p className="mt-2 text-amber-900 font-black text-[10px] animate-pulse uppercase">Scratch to reveal reward! 👆</p>
//                       </div>
//                    ) : (
//                       <div className="text-center py-6 px-10">
//                          <p className="text-amber-900 font-bold text-sm">Next coupon ready in:</p>
//                          <div className="bg-amber-900/20 text-amber-900 px-4 py-2 rounded-lg mt-2 font-mono text-2xl font-black inline-block">{timeLeft}</div>
//                       </div>
//                    )}
//                 </div>
//             </div>
//           )}

//           {/* Wallet Overview Table */}
//           <h2 className="w-full bg-blue-600 text-center font-bold text-white py-3 rounded-t-xl tracking-widest uppercase shadow-inner">Wallet & Referral Overview</h2>
//           <div className="grid grid-cols-2 gap-px bg-gray-200 border-x border-b rounded-b-xl overflow-hidden mb-8 shadow-sm">
//             <div className="bg-white p-4 text-center border-r border-b"><p className="text-gray-400 text-[10px] uppercase font-bold">Points Balance</p><p className="text-2xl font-black text-amber-600">{userData?.pointsBalance || 0} Pts</p></div>
//             <div className="bg-white p-4 text-center border-b"><p className="text-gray-400 text-[10px] uppercase font-bold">Money Wallet (₹)</p><p className="text-2xl font-black text-blue-600">₹{userData?.walletAmount || 0}</p></div>
//             <div className="bg-white p-4 text-center border-r"><p className="text-gray-400 text-[10px] uppercase font-bold">Active Referrals</p><p className="text-xl font-bold text-green-600">{userData?.activeReferralsCount || 0}</p></div>
//             <div className="bg-white p-4 text-center"><p className="text-gray-400 text-[10px] uppercase font-bold">Min. Withdrawal</p><p className="text-xl font-bold text-gray-800">₹200</p></div>
//           </div>

//           {/* Referral Links */}
//           <div className="text-center mb-6">
//             <div className="flex flex-wrap justify-center gap-4">
//               <button disabled={!userData?.isActivate} className="flex items-center gap-2 bg-green-500 text-white py-2 px-6 rounded-full font-bold shadow-md disabled:opacity-50" onClick={() => {
//                   const link = `${import.meta.env.VITE_WEBSITE_URL}/signup?ref=${userData.referralCode}`;
//                   window.open(`https://wa.me/?text=${encodeURIComponent("Join and earn daily rewards: " + link)}`, "_blank");
//               }}>WhatsApp</button>
//               <button disabled={!userData?.isActivate} onClick={copyReferral} className="flex items-center gap-2 bg-gray-700 text-white py-2 px-6 rounded-full font-bold shadow-md disabled:opacity-50">{copied ? "COPIED!" : "COPY LINK"}</button>
//               <button onClick={handleInst} disabled={!userData?.isActivate} className="flex items-center gap-2 bg-pink-500 text-white py-2 px-6 rounded-full font-bold shadow-md disabled:opacity-50">INSTAGRAM</button>
//             </div>
//           </div>

//           <button onClick={() => setShowModal(true)} disabled={userData?.walletAmount < 200} className={`w-full py-4 rounded-2xl font-black text-lg shadow-xl mb-4 transition-all transform active:scale-95 ${userData?.walletAmount >= 200 ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}>WITHDRAW MONEY (₹)</button>
//           <p className="text-center text-gray-400 font-bold text-[10px] uppercase tracking-widest">Total Withdrawn: ₹{userData?.totalAmount || 0}</p>
//         </div>
//       </div>

//       {/* --- MODALS (QR, PAYMENT, WITHDRAW) --- */}
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
//           <div className="bg-white rounded-xl shadow-lg p-6 w-11/12 max-w-md relative">
//             <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center uppercase">Withdraw</h2>
//             {modalError && <h2 className="bg-red-500 text-white text-center py-2 rounded mb-4">{modalError}</h2>}
//             <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full border p-3 rounded mb-3" />
//             <input type="text" placeholder="Bank Name" value={bankAccountName} onChange={(e) => setBankAccountName(e.target.value)} className="w-full border p-3 rounded mb-3" />
//             <input type="text" placeholder="IFSC" value={ifscCode} onChange={(e) => setIfscCode(e.target.value)} className="w-full border p-3 rounded mb-6" />
//             <div className="flex gap-4">
//               <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 bg-gray-200 rounded font-bold">Cancel</button>
//               <button onClick={withdrawReq} className="flex-1 px-4 py-2 bg-blue-500 text-white rounded font-bold">Confirm</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {showQR && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
//           <div className="bg-white rounded-3xl p-8 shadow-2xl w-11/12 max-w-md text-center border-t-8 border-blue-600">
//             <h2 className="text-xl font-black mb-1 text-gray-800">SCAN & PAY ₹200</h2>
//             <div className="flex justify-center my-6"><img src={`${import.meta.env.VITE_APP_API_BASE_URL}${paymentConfig?.imageName}`} alt="QR" className="w-56 h-56 object-contain border-4 p-2 rounded-2xl" /></div>
//             <button onClick={handleProceedToProof} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold uppercase">Next</button>
//             <button onClick={() => setShowQR(false)} className="mt-4 text-gray-400 text-xs">Cancel</button>
//           </div>
//         </div>
//       )}

//       {paymentModel && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
//           <div className="bg-white rounded-3xl shadow-2xl p-8 w-11/12 max-w-md">
//             <h2 className="text-2xl font-black mb-6 text-center">Submit Proof</h2>
//             <input type="text" placeholder="UTR Number" value={utrNumber} onChange={(e) => setUtrNumber(e.target.value)} className="w-full border p-3 rounded mb-4" />
//             <input type="file" onChange={(e) => setPaymentImage(e.target.files[0])} className="w-full mb-8 text-xs text-gray-500" />
//             <button onClick={submitPaymentProof} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black">Submit</button>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }

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
// import ScratchCard from "../Home/ScratchCard";

// export default function Apply() {
//   const dispatch = useDispatch();
//   const token = localStorage.getItem("totoToken");
//   const { userData } = useSelector((state) => state.user);
//   const [copied, setCopied] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [amount, setAmount] = useState("");
//   const [ifscCode, setIfscCode] = useState("");
//   const [bankAccountName, setBankAccountName] = useState("");
//   const userId = localStorage.getItem("userId");
//   const [paymentModel, setPaymentModel] = useState(false);
//   const [utrNumber, setUtrNumber] = useState("");
//   const [paymentImage, setPaymentImage] = useState(null);
//   const [showQR, setShowQR] = useState(false);
//   const [paymentConfig, setPaymentConfig] = useState();
//   const [modalError, setModelError] = useState();

//   // --- Rewards & Scratch States ---
//   const [canScratch, setCanScratch] = useState(false);
//   const [isWithin30Days, setIsWithin30Days] = useState(false);
//   const [timeLeft, setTimeLeft] = useState("");
//   const [pointsEarned, setPointsEarned] = useState(0); 
//    const [unlockedCoupons, setUnlockedCoupons] = useState(0);

//    useEffect(() => {
//     dispatch(fetchUserData());
//   }, [dispatch]);

//   useEffect(() => {
//     if (userData) {
//       // 1. 30 Days Logic
//       const signupDate = new Date(userData.createdAt);
//       const now = new Date();
//       const diffDays = Math.ceil((now - signupDate) / (1000 * 60 * 60 * 24));
//       if (diffDays <= 30) setIsWithin30Days(true);

//       // 2. Unlocked Coupons Logic
//       // अब canScratch तभी true होगा जब scratchCardsBalance > 0 हो
//       setUnlockedCoupons(userData.scratchCardsBalance || 0);

//       const checkTimer = () => {
//         const lastScratch = localStorage.getItem(`last_scratch_${userData._id}`);
//         if (lastScratch) {
//           const lastTime = new Date(lastScratch).getTime();
//           const distance = (24 * 60 * 60 * 1000) - (new Date().getTime() - lastTime);

//           if (distance > 0) {
//             setCanScratch(false);
//             const h = Math.floor(distance / (1000 * 60 * 60));
//             const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//             setTimeLeft(`${h}h ${m}m`);
//           } else if (userData.scratchCardsBalance > 0) {
//              setCanScratch(true); // समय पूरा हुआ AND कूपन बैलेंस है
//           }
//         } else if (userData.scratchCardsBalance > 0) {
//           setCanScratch(true); // पहली बार स्क्रैच AND कूपन बैलेंस है
//         } else {
//           setCanScratch(false); // समय तो है पर अनलॉक कूपन नहीं है
//         }
//       };

//       checkTimer();
//       const interval = setInterval(checkTimer, 60000);
//       return () => clearInterval(interval);
//     }
//   }, [userData]);

//   useEffect(() => {
//     dispatch(fetchUserData());
//   }, [dispatch]);

//   // --- Points Logic: Daily Scratch Timer ---
//   useEffect(() => {
//     if (userData) {
//       // 1. Check if user is within 30 days of signup
//       const signupDate = new Date(userData.createdAt);
//       const now = new Date();
//       const diffDays = Math.ceil((now - signupDate) / (1000 * 60 * 60 * 24));
//       if (diffDays <= 30) setIsWithin30Days(true);

//       // 2. Daily Scratch Logic (Always active from signup day 1)
//       const checkTimer = () => {
//         const lastScratch = localStorage.getItem(`last_scratch_${userData._id}`);
//         if (lastScratch) {
//           const lastTime = new Date(lastScratch).getTime();
//           const distance = (24 * 60 * 60 * 1000) - (new Date().getTime() - lastTime);
//           if (distance > 0) {
//             setCanScratch(false);
//             const h = Math.floor(distance / (1000 * 60 * 60));
//             const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//             setTimeLeft(`${h}h ${m}m`);
//           } else { setCanScratch(true); }
//         } else {
//           setCanScratch(true); // Allow scratch if it's the first time
//         }
//       };
//       checkTimer();
//       const interval = setInterval(checkTimer, 60000);
//       return () => clearInterval(interval);
//     }
//   }, [userData]);

//   // --- Today's Dynamic Points Preview ---
//   useEffect(() => {
//     if (canScratch && userId && token) {
//       const getPoints = async () => {
//         try {
//           const res = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/today-reward-points`, 
//             { params: { userId }, headers: { Authorization: `Bearer ${token}` } });
//           setPointsEarned(res.data.points);
//         } catch (err) { console.error(err); }
//       };
//       getPoints();
//     }
//   }, [canScratch, userId, token]);

//   const handleScratchComplete = async () => {
//     try {
//       const res = await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/claim-daily-points`, 
//         { userId }, { headers: { Authorization: `Bearer ${token}` } });
//       if (res.status === 200) {
//         toast.success(`${pointsEarned} Points added successfully! ✨`);
//         localStorage.setItem(`last_scratch_${userData._id}`, new Date().toISOString());
//         setCanScratch(false);
//         dispatch(fetchUserData());
//       }
//     } catch (err) { toast.error("Scratch failed."); }
//   };

//   const handleClaimPointsToCash = async () => {
//     if (!userData?.isActivate) return toast.error("Please activate account (₹200) first!");
//     if (userData?.pointsBalance < 50000) return toast.warning("Min 50,000 points needed to convert!");

//     try {
//       const res = await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/convert-points`, 
//         { userId }, { headers: { Authorization: `Bearer ${token}` } });
//       if (res.status === 200) {
//         toast.success(`Converted to cash! 💰`);
//         dispatch(fetchUserData());
//       }
//     } catch (err) { toast.error("Conversion failed."); }
//   };

//   // --- Payment & Utility Logics ---
//   const handleActivateClick = () => { getPaymentDetails(); setShowQR(true); };
//   const getPaymentDetails = async () => {
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/payment-config`, { headers: { Authorization: `Bearer ${token}` } });
//       setPaymentConfig(res?.data);
//     } catch (error) { toast.error("QR Fetch Error"); }
//   };
//   const handleProceedToProof = () => { setShowQR(false); setPaymentModel(true); };
//   const copyReferral = async () => {
//     const link = `${import.meta.env.VITE_WEBSITE_URL}/signup?ref=${userData.referralCode}`;
//     await navigator.clipboard.writeText(link);
//     setCopied(true); setTimeout(() => setCopied(false), 2000);
//     toast.success("Link Copied!");
//   };

//   const withdrawReq = async () => {
//     if (userData?.walletAmount < amount) return toast.error("Low Balance!");
//     try {
//       await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/withdraw`, 
//         { userId, amount: Number(amount), bankAccountName, ifscCode }, { headers: { Authorization: `Bearer ${token}` } });
//       toast.success("Withdraw Sent"); setShowModal(false); dispatch(fetchUserData());
//     } catch (err) { toast.error("Error"); }
//   };

//   const submitPaymentProof = async () => {
//     const formData = new FormData();
//     formData.append("userId", userData?._id);
//     if (utrNumber) formData.append("utrNumber", utrNumber);
//     if (paymentImage) formData.append("paymentImage", paymentImage);
//     try {
//       await axios.patch(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/payment-proof`, formData, { headers: { Authorization: `Bearer ${token}` } });
//       toast.success("Proof submitted!"); setPaymentModel(false); dispatch(fetchUserData());
//     } catch (error) { toast.error("Error"); }
//   };

//   return (
//     <section className="w-full pt-16">
//       <div className="h-[50vh] flex items-center justify-center bg-grid" style={{ backgroundImage: `url(${bgImg})` }}>
//         <h1 className="text-6xl font-bold text-gray-800 tracking-tighter uppercase italic">REFER & EARN</h1>
//       </div>

//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
//         <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
//           <h1 className="text-2xl font-bold text-center mb-4 text-blue-800 tracking-tight">Refer & Earn – Earn 20k Points (₹200) Per Friend! 💰</h1>

//           {/* Activation UI */}
//           {userData?.isActivate ? (
//             <button className="w-full bg-green-600 text-white py-3 rounded-lg mb-6 font-black shadow-md tracking-widest uppercase">✓ ACTIVE USER</button>
//           ) : userData?.utrNumber || userData?.paymentImage ? (
//             <button className="w-full bg-yellow-500 text-white py-3 rounded-lg mb-6 font-black shadow-md animate-pulse uppercase tracking-widest">PENDING ACTIVATION...</button>
//           ) : (
//             <button onClick={handleActivateClick} className="w-full bg-blue-600 text-white py-3 rounded-lg mb-6 font-black shadow-md hover:bg-blue-700 transition tracking-widest uppercase">ACTIVATE & GET LINK</button>
//           )}

//           {/* How it Works */}
//           <div className="grid grid-cols-3 gap-2 mb-10 text-center">
//             <div className="flex flex-col items-center"><img src={googleImg} className="w-10 h-10 mb-2" alt="1" /><p className="text-[10px]"><strong>1. Login</strong><br />Google Signup</p></div>
//             <div className="flex flex-col items-center"><img src={account} className="w-10 h-10 mb-2" alt="2" /><p className="text-[10px]"><strong>2. Activate</strong><br />Pay fee</p></div>
//             <div className="flex flex-col items-center"><img src={share} className="w-10 h-10 mb-2" alt="3" /><p className="text-[10px]"><strong>3. Earn</strong><br />Get Points</p></div>
//           </div>

//           {/* --- GOLDEN BOX (No Claim Button, Only Daily Scratch) --- */}
//           {isWithin30Days && (
//             <div className="w-full bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 p-6 rounded-2xl shadow-xl border-2 border-amber-600 mb-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
//                 <div className="absolute top-0 right-0 p-2 opacity-10 text-6xl">💎</div>
//                 <div className="text-center md:text-left">
//                     <h2 className="text-amber-900 font-extrabold text-lg uppercase tracking-tighter italic">✨ Daily Lucky Coupon ✨</h2>
//                     <p className="text-amber-800 text-xs mb-3 font-semibold tracking-tighter">Balance: <span className="text-xl font-black text-amber-950">{userData?.pointsBalance || 0} Pts</span></p>

//                     <button 
//                       onClick={handleClaimPointsToCash}
//                       className={`px-4 py-2 rounded-lg font-bold shadow-lg transition text-sm ${
//                         userData?.isActivate && userData?.pointsBalance >= 50000 
//                         ? "bg-amber-950 text-white hover:bg-black" 
//                         : "bg-gray-400 text-gray-200 cursor-not-allowed"
//                       }`}
//                     >
//                       {userData?.pointsBalance >= 50000 ? "CLAIM CASH (₹)" : "MIN 50k PTS TO CLAIM"}
//                     </button>
//                     {!userData?.isActivate && <p className="text-[9px] text-red-600 mt-1 font-bold">*Activate to convert points</p>}
//                 </div>

//                 <div className="bg-white/40 p-2 rounded-xl backdrop-blur-sm border border-white/50 min-w-[280px] flex flex-col items-center justify-center min-h-[160px]">
//                    {canScratch ? (
//                       <div className="flex flex-col items-center">
//                          <ScratchCard width={260} height={130} revealPercent={60} rewardValue={pointsEarned} onComplete={handleScratchComplete} />
//                          <p className="mt-2 text-amber-900 font-black text-[10px] animate-pulse uppercase tracking-widest">Scratch Daily Reward 👆</p>
//                       </div>
//                    ) : (
//                       <div className="text-center py-6 px-10">
//                          <p className="text-amber-900 font-bold text-sm tracking-tight leading-tight">Next coupon ready in:</p>
//                          <div className="bg-amber-900/20 text-amber-900 px-4 py-2 rounded-lg mt-2 font-mono text-2xl font-black inline-block tracking-tighter">{timeLeft}</div>
//                       </div>
//                    )}
//                 </div>
//             </div>
//           )}

//           {/* Wallet Overview Table */}
//           <div className="grid grid-cols-2 gap-px bg-gray-200 border border-gray-200 rounded-xl overflow-hidden mb-8 shadow-sm">
//             <div className="bg-white p-4 text-center border-r border-b"><p className="text-gray-400 text-[10px] uppercase font-bold tracking-tighter">Points Balance</p><p className="text-2xl font-black text-amber-600">{userData?.pointsBalance || 0}</p></div>
//             <div className="bg-white p-4 text-center border-b"><p className="text-gray-400 text-[10px] uppercase font-bold tracking-tighter">Money Wallet (₹)</p><p className="text-2xl font-black text-blue-600">₹{userData?.walletAmount || 0}</p></div>
//             <div className="bg-white p-4 text-center border-r"><p className="text-gray-400 text-[10px] uppercase font-bold tracking-tighter">Active Referrals</p><p className="text-xl font-bold text-green-600">{userData?.activeReferralsCount || 0}</p></div>
//             <div className="bg-white p-4 text-center"><p className="text-gray-400 text-[10px] uppercase font-bold tracking-tighter">Min. Withdrawal</p><p className="text-xl font-bold text-gray-800">₹200</p></div>
//           </div>

//           {/* Referral Sharing Buttons */}
//           <div className="flex justify-center gap-4 mb-8">
//               <button disabled={!userData?.isActivate} className="bg-green-500 text-white px-6 py-2 rounded-full font-bold shadow-md disabled:opacity-50 text-xs" onClick={() => window.open(`https://wa.me/?text=Join and earn rewards: ${import.meta.env.VITE_WEBSITE_URL}/signup?ref=${userData.referralCode}`, "_blank")}>WhatsApp</button>
//               <button disabled={!userData?.isActivate} onClick={copyReferral} className="bg-gray-700 text-white px-6 py-2 rounded-full font-bold shadow-md disabled:opacity-50 text-xs">{copied ? "COPIED!" : "COPY LINK"}</button>
//           </div>

//           <button onClick={() => setShowModal(true)} disabled={userData?.walletAmount < 200} className={`w-full py-4 rounded-2xl font-black text-lg shadow-xl mb-4 transition-all transform active:scale-95 ${userData?.walletAmount >= 200 ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}>WITHDRAW MONEY (₹)</button>
//           <p className="text-center text-gray-400 font-bold text-[10px] uppercase tracking-widest">Total Withdrawn: ₹{userData?.totalAmount || 0}</p>
//         </div>
//       </div>

//       {/* --- MODALS (QR, PAYMENT, WITHDRAW) --- */}
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 p-4">
//           <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
//             <h2 className="text-xl font-bold mb-4 text-center">Withdraw Funds</h2>
//             <input type="number" placeholder="Enter Amount" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full border p-3 rounded mb-3" />
//             <input type="text" placeholder="Bank Holder Name" value={bankAccountName} onChange={(e) => setBankAccountName(e.target.value)} className="w-full border p-3 rounded mb-3" />
//             <input type="text" placeholder="IFSC Code" value={ifscCode} onChange={(e) => setIfscCode(e.target.value)} className="w-full border p-3 rounded mb-6" />
//             <div className="flex gap-4">
//               <button onClick={() => setShowModal(false)} className="flex-1 bg-gray-100 py-2 rounded font-bold text-gray-500">Cancel</button>
//               <button onClick={withdrawReq} className="flex-1 bg-blue-500 text-white py-2 rounded font-bold">Confirm</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {showQR && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4">
//           <div className="bg-white rounded-3xl p-8 shadow-2xl w-full max-w-md text-center border-t-8 border-blue-600">
//             <h2 className="text-xl font-black mb-1 text-gray-800 uppercase tracking-widest">SCAN & PAY ₹200</h2>
//             <div className="flex justify-center my-6"><img src={`${import.meta.env.VITE_APP_API_BASE_URL}${paymentConfig?.imageName}`} alt="QR" className="w-56 h-56 object-contain border-4 border-gray-50 p-2 rounded-2xl shadow-inner" /></div>
//             <p className="font-mono bg-gray-50 py-2 rounded-lg text-blue-600 font-bold mb-6 tracking-wider">{paymentConfig?.upiId}</p>
//             <button onClick={handleProceedToProof} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-xl active:scale-95 transition-all">I HAVE PAID — NEXT</button>
//             <button onClick={() => setShowQR(false)} className="mt-4 text-gray-400 font-bold text-xs uppercase cursor-pointer">Cancel</button>
//           </div>
//         </div>
//       )}

//       {paymentModel && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
//           <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
//             <h2 className="text-2xl font-black mb-6 text-gray-800 text-center uppercase tracking-tighter text-blue-700">SUBMIT PROOF</h2>
//             <input type="text" placeholder="Enter 12-digit UTR Number" value={utrNumber} onChange={(e) => setUtrNumber(e.target.value)} className="w-full border p-3 rounded-xl mb-4 focus:outline-blue-500" />
//             <input type="file" onChange={(e) => setPaymentImage(e.target.files[0])} className="w-full mb-8 text-xs text-gray-500" />
//             <button onClick={submitPaymentProof} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-xl">SUBMIT FOR REVIEW</button>
//             <button onClick={() => setPaymentModel(false)} className="w-full mt-4 text-gray-400 text-center font-bold text-xs">Back</button>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }

// latest sahi hai

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
// import ScratchCard from "../Home/ScratchCard";

// export default function Apply() {
//   const dispatch = useDispatch();
//   const token = localStorage.getItem("totoToken");
//   const { userData } = useSelector((state) => state.user);
//   const [copied, setCopied] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [amount, setAmount] = useState("");
//   const [ifscCode, setIfscCode] = useState("");
//   const [bankAccountName, setBankAccountName] = useState("");
//   const userId = localStorage.getItem("userId");
//   const [paymentModel, setPaymentModel] = useState(false);
//   const [utrNumber, setUtrNumber] = useState("");
//   const [paymentImage, setPaymentImage] = useState(null);
//   const [showQR, setShowQR] = useState(false);
//   const [paymentConfig, setPaymentConfig] = useState();
//   const [modalError, setModelError] = useState();

//   // --- Rewards & Scratch States ---
//   const [canScratch, setCanScratch] = useState(false);
//   const [isWithin30Days, setIsWithin30Days] = useState(false);
//   const [timeLeft, setTimeLeft] = useState("");
//   const [pointsEarned, setPointsEarned] = useState(0); 
//   const [unlockedCoupons, setUnlockedCoupons] = useState(0);


//   console.log("Poora User Data:", userData); 
// console.log("Mera Referral Code hai:", userData?.referralCode);

//   useEffect(() => {
//     dispatch(fetchUserData());
//   }, [dispatch]);

//   // --- Merged Logic: Timer + Activation Check ---
//   useEffect(() => {
//     if (userData) {
//       // 1. 30 Days Logic
//       const signupDate = new Date(userData.createdAt);
//       const now = new Date();
//       const diffDays = Math.ceil((now - signupDate) / (1000 * 60 * 60 * 24));
//       if (diffDays <= 30) setIsWithin30Days(true);

//       // 2. Unlocked Coupons Logic
//       setUnlockedCoupons(userData.scratchCardsBalance || 0);

//       const checkTimer = () => {
//         // Condition: Scratch tabhi hoga jab user ACTIVE ho
//         if (!userData.isActivate) {
//           setCanScratch(false);
//           return;
//         }

//         const lastScratch = localStorage.getItem(`last_scratch_${userData._id}`);
//         if (lastScratch) {
//           const lastTime = new Date(lastScratch).getTime();
//           const distance = (24 * 60 * 60 * 1000) - (new Date().getTime() - lastTime);

//           if (distance > 0) {
//             setCanScratch(false);
//             const h = Math.floor(distance / (1000 * 60 * 60));
//             const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//             setTimeLeft(`${h}h ${m}m`);
//           } else {
//              setCanScratch(true); 
//           }
//         } else {
//           setCanScratch(true); 
//         }
//       };

//       checkTimer();
//       const interval = setInterval(checkTimer, 60000);
//       return () => clearInterval(interval);
//     }
//   }, [userData]);

//   // --- Today's Dynamic Points Preview ---
//   useEffect(() => {
//     if (canScratch && userId && token && userData?.isActivate) {
//       const getPoints = async () => {
//         try {
//           const res = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/today-reward-points`, 
//             { params: { userId }, headers: { Authorization: `Bearer ${token}` } });
//           setPointsEarned(res.data.points);
//         } catch (err) { console.error(err); }
//       };
//       getPoints();
//     }
//   }, [canScratch, userId, token, userData?.isActivate]);

//   const handleScratchComplete = async () => {
//     if (!userData?.isActivate) {
//       toast.error("Activate account to claim points!");
//       return;
//     }
//     try {
//       const res = await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/claim-daily-points`, 
//         { userId }, { headers: { Authorization: `Bearer ${token}` } });
//       if (res.status === 200) {
//         toast.success(`${pointsEarned} Points added successfully! ✨`);
//         localStorage.setItem(`last_scratch_${userData._id}`, new Date().toISOString());
//         setCanScratch(false);
//         dispatch(fetchUserData());
//       }
//     } catch (err) { toast.error("Scratch failed."); }
//   };

//   const handleClaimPointsToCash = async () => {
//     if (!userData?.isActivate) return toast.error("Please activate account (₹200) first!");
//     if (userData?.pointsBalance < 50000) return toast.warning("Min 50,000 points needed to convert!");

//     try {
//       const res = await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/convert-points`, 
//         { userId }, { headers: { Authorization: `Bearer ${token}` } });
//       if (res.status === 200) {
//         toast.success(`Converted to cash! 💰`);
//         dispatch(fetchUserData());
//       }
//     } catch (err) { toast.error("Conversion failed."); }
//   };

//   // --- Payment & Utility Logics ---
//   const handleActivateClick = () => { getPaymentDetails(); setShowQR(true); };
//   const getPaymentDetails = async () => {
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/payment-config`, { headers: { Authorization: `Bearer ${token}` } });
//       setPaymentConfig(res?.data);
//     } catch (error) { toast.error("QR Fetch Error"); }
//   };
//   const handleProceedToProof = () => { setShowQR(false); setPaymentModel(true); };
//   const copyReferral = async () => {
//     const link = `${import.meta.env.VITE_WEBSITE_URL}/signup?ref=${userData.referralCode}`;
//     await navigator.clipboard.writeText(link);
//     setCopied(true); setTimeout(() => setCopied(false), 2000);
//     toast.success("Link Copied!");
//   };

//   const withdrawReq = async () => {
//     if (userData?.walletAmount < amount) return toast.error("Low Balance!");
//     try {
//       await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/withdraw`, 
//         { userId, amount: Number(amount), bankAccountName, ifscCode }, { headers: { Authorization: `Bearer ${token}` } });
//       toast.success("Withdraw Sent"); setShowModal(false); dispatch(fetchUserData());
//     } catch (err) { toast.error("Error"); }
//   };

//   const submitPaymentProof = async () => {
//     const formData = new FormData();
//     formData.append("userId", userData?._id);
//     if (utrNumber) formData.append("utrNumber", utrNumber);
//     if (paymentImage) formData.append("paymentImage", paymentImage);
//     try {
//       await axios.patch(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/payment-proof`, formData, { headers: { Authorization: `Bearer ${token}` } });
//       toast.success("Proof submitted!"); setPaymentModel(false); dispatch(fetchUserData());
//     } catch (error) { toast.error("Error"); }
//   };

//   return (
//     <section className="w-full pt-16">
//       <div className="h-[50vh] flex items-center justify-center bg-grid" style={{ backgroundImage: `url(${bgImg})` }}>
//         <h1 className="text-6xl font-bold text-gray-800 tracking-tighter uppercase italic">REFER & EARN</h1>
//       </div>

//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
//         <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
//           <h1 className="text-2xl font-bold text-center mb-4 text-blue-800 tracking-tight">Refer & Earn – Earn 20k Points (₹200) Per Friend! 💰</h1>

//           {/* Activation UI */}
//           {userData?.isActivate ? (
//             <button className="w-full bg-green-600 text-white py-3 rounded-lg mb-6 font-black shadow-md tracking-widest uppercase">✓ ACTIVE USER</button>
//           ) : userData?.utrNumber || userData?.paymentImage ? (
//             <button className="w-full bg-yellow-500 text-white py-3 rounded-lg mb-6 font-black shadow-md animate-pulse uppercase tracking-widest">PENDING ACTIVATION...</button>
//           ) : (
//             <button onClick={handleActivateClick} className="w-full bg-blue-600 text-white py-3 rounded-lg mb-6 font-black shadow-md hover:bg-blue-700 transition tracking-widest uppercase">ACTIVATE & GET LINK</button>
//           )}

//           {/* How it Works */}
//           <div className="grid grid-cols-3 gap-2 mb-10 text-center">
//             <div className="flex flex-col items-center"><img src={googleImg} className="w-10 h-10 mb-2" alt="1" /><p className="text-[10px]"><strong>1. Login</strong><br />Google Signup</p></div>
//             <div className="flex flex-col items-center"><img src={account} className="w-10 h-10 mb-2" alt="2" /><p className="text-[10px]"><strong>2. Activate</strong><br />Pay fee</p></div>
//             <div className="flex flex-col items-center"><img src={share} className="w-10 h-10 mb-2" alt="3" /><p className="text-[10px]"><strong>3. Earn</strong><br />Get Points</p></div>
//           </div>

//           {/* --- GOLDEN BOX --- */}
//           {isWithin30Days && (
//             <div className="w-full bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 p-6 rounded-2xl shadow-xl border-2 border-amber-600 mb-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
//                 <div className="absolute top-0 right-0 p-2 opacity-10 text-6xl">💎</div>
//                 <div className="text-center md:text-left">
//                     <h2 className="text-amber-900 font-extrabold text-lg uppercase tracking-tighter italic">✨ Daily Lucky Coupon ✨</h2>
//                     <p className="text-amber-800 text-xs mb-3 font-semibold tracking-tighter">Balance: <span className="text-xl font-black text-amber-950">{userData?.pointsBalance || 0} Pts</span></p>

//                     <button 
//                       onClick={handleClaimPointsToCash}
//                       className={`px-4 py-2 rounded-lg font-bold shadow-lg transition text-sm ${
//                         userData?.isActivate && userData?.pointsBalance >= 50000 
//                         ? "bg-amber-950 text-white hover:bg-black" 
//                         : "bg-gray-400 text-gray-200 cursor-not-allowed"
//                       }`}
//                     >
//                       {userData?.pointsBalance >= 50000 ? "CLAIM CASH (₹)" : "MIN 50k PTS TO CLAIM"}
//                     </button>
//                     {!userData?.isActivate && <p className="text-[9px] text-red-600 mt-1 font-bold">*Activate to unlock scratch card</p>}
//                 </div>

//                 <div className="bg-white/40 p-2 rounded-xl backdrop-blur-sm border border-white/50 min-w-[280px] flex flex-col items-center justify-center min-h-[160px]">
//                    {!userData?.isActivate ? (
//                       // User is not active
//                       <div className="text-center py-6">
//                          <span className="text-4xl mb-2 block">🔒</span>
//                          <p className="text-amber-900 font-black text-[10px] uppercase">Coupon Locked</p>
//                          <p className="text-[9px] text-amber-800">Please activate your account first</p>
//                       </div>
//                    ) : canScratch ? (
//                       // User is active and timer is over
//                       <div className="flex flex-col items-center">
//                          <ScratchCard width={260} height={130} revealPercent={60} rewardValue={pointsEarned} onComplete={handleScratchComplete} />
//                          <p className="mt-2 text-amber-900 font-black text-[10px] animate-pulse uppercase tracking-widest">Scratch Daily Reward 👆</p>
//                       </div>
//                    ) : (
//                       // User is active but must wait for timer
//                       <div className="text-center py-6 px-10">
//                          <p className="text-amber-900 font-bold text-sm tracking-tight leading-tight">Next coupon ready in:</p>
//                          <div className="bg-amber-900/20 text-amber-900 px-4 py-2 rounded-lg mt-2 font-mono text-2xl font-black inline-block tracking-tighter">{timeLeft}</div>
//                       </div>
//                    )}
//                 </div>
//             </div>
//           )}

//           {/* Wallet Overview Table */}
//           <div className="grid grid-cols-2 gap-px bg-gray-200 border border-gray-200 rounded-xl overflow-hidden mb-8 shadow-sm">
//             <div className="bg-white p-4 text-center border-r border-b"><p className="text-gray-400 text-[10px] uppercase font-bold tracking-tighter">Points Balance</p><p className="text-2xl font-black text-amber-600">{userData?.pointsBalance || 0}</p></div>
//             <div className="bg-white p-4 text-center border-b"><p className="text-gray-400 text-[10px] uppercase font-bold tracking-tighter">Money Wallet (₹)</p><p className="text-2xl font-black text-blue-600">₹{userData?.walletAmount || 0}</p></div>
//             <div className="bg-white p-4 text-center border-r"><p className="text-gray-400 text-[10px] uppercase font-bold tracking-tighter">Active Referrals</p><p className="text-xl font-bold text-green-600">{userData?.activeReferralsCount || 0}</p></div>
//             <div className="bg-white p-4 text-center"><p className="text-gray-400 text-[10px] uppercase font-bold tracking-tighter">Min. Withdrawal</p><p className="text-xl font-bold text-gray-800">₹200</p></div>
//           </div>


//           {/* Referral Sharing Buttons */}
//           <div className="flex justify-center gap-4 mb-8">
//               <button disabled={!userData?.isActivate} className="bg-green-500 text-white px-6 py-2 rounded-full font-bold shadow-md disabled:opacity-50 text-xs" onClick={() => window.open(`https://wa.me/?text=Join and earn rewards: ${import.meta.env.VITE_WEBSITE_URL}/signup?ref=${userData.referralCode}`, "_blank")}>WhatsApp</button>
//               <button disabled={!userData?.isActivate} onClick={copyReferral} className="bg-gray-700 text-white px-6 py-2 rounded-full font-bold shadow-md disabled:opacity-50 text-xs">{copied ? "COPIED!" : "COPY LINK"}</button>
//           </div>

//           <button onClick={() => setShowModal(true)} disabled={userData?.walletAmount < 200} className={`w-full py-4 rounded-2xl font-black text-lg shadow-xl mb-4 transition-all transform active:scale-95 ${userData?.walletAmount >= 200 ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}>WITHDRAW MONEY (₹)</button>
//           <p className="text-center text-gray-400 font-bold text-[10px] uppercase tracking-widest">Total Withdrawn: ₹{userData?.totalAmount || 0}</p>
//         </div>
//       </div>

//       {/* --- MODALS (QR, PAYMENT, WITHDRAW) --- */}
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 p-4">
//           <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
//             <h2 className="text-xl font-bold mb-4 text-center">Withdraw Funds</h2>
//             <input type="number" placeholder="Enter Amount" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full border p-3 rounded mb-3" />
//             <input type="text" placeholder="Bank Holder Name" value={bankAccountName} onChange={(e) => setBankAccountName(e.target.value)} className="w-full border p-3 rounded mb-3" />
//             <input type="text" placeholder="IFSC Code" value={ifscCode} onChange={(e) => setIfscCode(e.target.value)} className="w-full border p-3 rounded mb-6" />
//             <div className="flex gap-4">
//               <button onClick={() => setShowModal(false)} className="flex-1 bg-gray-100 py-2 rounded font-bold text-gray-500">Cancel</button>
//               <button onClick={withdrawReq} className="flex-1 bg-blue-500 text-white py-2 rounded font-bold">Confirm</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {showQR && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4">
//           <div className="bg-white rounded-3xl p-8 shadow-2xl w-full max-w-md text-center border-t-8 border-blue-600">
//             <h2 className="text-xl font-black mb-1 text-gray-800 uppercase tracking-widest">SCAN & PAY ₹200</h2>
//             <div className="flex justify-center my-6"><img src={`${import.meta.env.VITE_APP_API_BASE_URL}${paymentConfig?.imageName}`} alt="QR" className="w-56 h-56 object-contain border-4 border-gray-50 p-2 rounded-2xl shadow-inner" /></div>
//             <p className="font-mono bg-gray-50 py-2 rounded-lg text-blue-600 font-bold mb-6 tracking-wider">{paymentConfig?.upiId}</p>
//             <button onClick={handleProceedToProof} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-xl active:scale-95 transition-all">I HAVE PAID — NEXT</button>
//             <button onClick={() => setShowQR(false)} className="mt-4 text-gray-400 font-bold text-xs uppercase cursor-pointer">Cancel</button>
//           </div>
//         </div>
//       )}

//       {paymentModel && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
//           <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
//             <h2 className="text-2xl font-black mb-6 text-gray-800 text-center uppercase tracking-tighter text-blue-700">SUBMIT PROOF</h2>
//             <input type="text" placeholder="Enter 12-digit UTR Number" value={utrNumber} onChange={(e) => setUtrNumber(e.target.value)} className="w-full border p-3 rounded-xl mb-4 focus:outline-blue-500" />
//             <input type="file" onChange={(e) => setPaymentImage(e.target.files[0])} className="w-full mb-8 text-xs text-gray-500" />
//             <button onClick={submitPaymentProof} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-xl">SUBMIT FOR REVIEW</button>
//             <button onClick={() => setPaymentModel(false)} className="w-full mt-4 text-gray-400 text-center font-bold text-xs">Back</button>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }





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
// import ScratchCard from "../Home/ScratchCard";

// export default function Apply() {
//   const dispatch = useDispatch();
//   const token = localStorage.getItem("totoToken");
//   const { userData } = useSelector((state) => state.user);
//   const [copied, setCopied] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [amount, setAmount] = useState("");
//   const [ifscCode, setIfscCode] = useState("");
//   const [bankAccountName, setBankAccountName] = useState("");
//   const userId = localStorage.getItem("userId");
//   const [paymentModel, setPaymentModel] = useState(false);
//   const [utrNumber, setUtrNumber] = useState("");
//   const [paymentImage, setPaymentImage] = useState(null);
//   const [showQR, setShowQR] = useState(false);
//   const [paymentConfig, setPaymentConfig] = useState();

//   // --- Rewards & Scratch States ---
//   const [canScratch, setCanScratch] = useState(false);
//   const [isWithin30Days, setIsWithin30Days] = useState(false);
//   const [timeLeft, setTimeLeft] = useState("");
//   const [pointsEarned, setPointsEarned] = useState(0);
//   const [scratchType, setScratchType] = useState(""); // "daily" ya "referral" track karne ke liye

//   console.log("Poora User Data:", userData);
//   console.log("Mera Referral Code hai:", userData?.referralCode);

//   useEffect(() => {
//     dispatch(fetchUserData());
//   }, [dispatch]);

//   // --- Points & Scratch Logic (Updated for Extra Coupons) ---
//   useEffect(() => {
//     if (userData) {
//       // 30 Days Signup Logic
//       const signupDate = new Date(userData.createdAt);
//       const now = new Date();
//       const diffDays = Math.ceil((now - signupDate) / (1000 * 60 * 60 * 24));
//       setIsWithin30Days(diffDays <= 30);

//       const checkTimer = () => {
//         if (!userData.isActivate) {
//           setCanScratch(false);
//           return;
//         }

//         // 1. Check if Extra Referral Coupon exists in Backend Balance
//         if (userData.scratchCardsBalance > 0) {
//           setCanScratch(true);
//           setScratchType("referral");
//           setPointsEarned(20000); // Referral ka fix 20k points
//           return;
//         }

//         // 2. Check Daily Scratch Timer (Agar referral coupon nahi hai tabhi daily check hoga)
//         const lastScratch = localStorage.getItem(`last_scratch_${userData._id}`);
//         if (lastScratch) {
//           const lastTime = new Date(lastScratch).getTime();
//           const distance = (24 * 60 * 60 * 1000) - (new Date().getTime() - lastTime);

//           if (distance > 0) {
//             setCanScratch(false);
//             const h = Math.floor(distance / (1000 * 60 * 60));
//             const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//             setTimeLeft(`${h}h ${m}m`);
//           } else {
//             setCanScratch(true);
//             setScratchType("daily");
//           }
//         } else {
//           setCanScratch(true);
//           setScratchType("daily");
//         }
//       };

//       checkTimer();
//       const interval = setInterval(checkTimer, 60000);
//       return () => clearInterval(interval);
//     }
//   }, [userData]);

//   // Daily points fetch tabhi hoga jab scratch type "daily" ho
//   useEffect(() => {
//     if (canScratch && scratchType === "daily" && userId && token) {
//       const getPoints = async () => {
//         try {
//           const res = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/today-reward-points`,
//             { params: { userId }, headers: { Authorization: `Bearer ${token}` } });
//           setPointsEarned(res.data.points);
//         } catch (err) { console.error(err); }
//       };
//       getPoints();
//     }
//   }, [canScratch, scratchType, userId, token]);

//   const handleScratchComplete = async () => {
//     if (!userData?.isActivate) return toast.error("Activate account first!");

//     try {
//       const endpoint = scratchType === "referral" ? "claim-referral-coupon" : "claim-daily-points";

//       const res = await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/${endpoint}`,
//         { userId }, { headers: { Authorization: `Bearer ${token}` } });

//       if (res.status === 200) {
//         toast.success(`${pointsEarned} Points added! ✨`);
//         console.log(`poins yeh tere ${pointsEarned}`)

//         // Agar daily tha toh timer set karo, agar referral tha toh timer mat chedo
//         if (scratchType === "daily") {
//           localStorage.setItem(`last_scratch_${userData._id}`, new Date().toISOString());
//         }

//         setCanScratch(false);
//         dispatch(fetchUserData()); // Isse scratchCardsBalance update ho jayega
//       }
//     } catch (err) { toast.error("Error claiming points."); }
//   };

//   const handleClaimPointsToCash = async () => {
//     if (!userData?.isActivate) return toast.error("Please activate account first!");
//     if (userData?.pointsBalance < 50000) return toast.warning("Min 50,000 points needed!");

//     try {
//       const res = await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/convert-points`,
//         { userId }, { headers: { Authorization: `Bearer ${token}` } });
//       if (res.status === 200) {
//         toast.success(`Converted to cash! 💰`);
//         dispatch(fetchUserData());
//       }
//     } catch (err) { toast.error("Conversion failed."); }
//   };

//   // --- Payment & Referral Logics (Keeping same as original) ---
//   const handleActivateClick = () => { getPaymentDetails(); setShowQR(true); };
//   const getPaymentDetails = async () => {
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/payment-config`, { headers: { Authorization: `Bearer ${token}` } });
//       setPaymentConfig(res?.data);
//     } catch (error) { toast.error("QR Fetch Error"); }
//   };
//   const handleProceedToProof = () => { setShowQR(false); setPaymentModel(true); };
//   const copyReferral = async () => {
//     const link = `${import.meta.env.VITE_WEBSITE_URL}/signup?ref=${userData.referralCode}`;
//     await navigator.clipboard.writeText(link);
//     setCopied(true); setTimeout(() => setCopied(false), 2000);
//     toast.success("Link Copied!");
//   };

//   const withdrawReq = async () => {
//     if (userData?.walletAmount < amount) return toast.error("Low Balance!");
//     try {
//       await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/withdraw`,
//         { userId, amount: Number(amount), bankAccountName, ifscCode }, { headers: { Authorization: `Bearer ${token}` } });
//       toast.success("Withdraw Sent"); setShowModal(false); dispatch(fetchUserData());
//     } catch (err) { toast.error("Error"); }
//   };

//   const submitPaymentProof = async () => {
//     const formData = new FormData();
//     formData.append("userId", userData?._id);
//     if (utrNumber) formData.append("utrNumber", utrNumber);
//     if (paymentImage) formData.append("paymentImage", paymentImage);
//     try {
//       await axios.patch(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/payment-proof`, formData, { headers: { Authorization: `Bearer ${token}` } });
//       toast.success("Proof submitted!"); setPaymentModel(false); dispatch(fetchUserData());
//     } catch (error) { toast.error("Error"); }
//   };

//   return (
//     <section className="w-full pt-16">
//       <div className="h-[50vh] flex items-center justify-center bg-grid" style={{ backgroundImage: `url(${bgImg})` }}>
//         <h1 className="text-6xl font-bold text-gray-800 tracking-tighter uppercase italic">REFER & EARN</h1>
//       </div>

//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
//         <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
//           <h1 className="text-2xl font-bold text-center mb-4 text-blue-800 tracking-tight">Refer & Earn – Earn 20k Points (₹200) Per Friend! 💰</h1>

//           {/* Activation UI */}
//           {userData?.isActivate ? (
//             <button className="w-full bg-green-600 text-white py-3 rounded-lg mb-6 font-black shadow-md tracking-widest uppercase">✓ ACTIVE USER</button>
//           ) : userData?.utrNumber || userData?.paymentImage ? (
//             <button className="w-full bg-yellow-500 text-white py-3 rounded-lg mb-6 font-black shadow-md animate-pulse uppercase tracking-widest">PENDING ACTIVATION...</button>
//           ) : (
//             <button onClick={handleActivateClick} className="w-full bg-blue-600 text-white py-3 rounded-lg mb-6 font-black shadow-md hover:bg-blue-700 transition tracking-widest uppercase">ACTIVATE & GET LINK</button>
//           )}

//           {/* --- GOLDEN BOX (Now showing Extra Coupons) --- */}
//           {isWithin30Days && (
//             <div className="w-full bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 p-6 rounded-2xl shadow-xl border-2 border-amber-600 mb-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
//               <div className="absolute top-0 right-0 p-2 opacity-10 text-6xl">💎</div>
//               <div className="text-center md:text-left">
//                 <h2 className="text-amber-900 font-extrabold text-lg uppercase tracking-tighter italic">✨ Daily Lucky Coupon ✨</h2>
//                 <p className="text-amber-800 text-xs mb-1 font-semibold tracking-tighter">Points: <span className="text-xl font-black text-amber-950">{userData?.pointsBalance || 0}</span></p>

//                 {/* Extra Coupon Counter Badge */}
//                 {userData?.scratchCardsBalance > 0 && (
//                   <div className="bg-red-600 text-white text-[10px] px-2 py-1 rounded-full inline-block font-bold mb-3 animate-bounce shadow-md">
//                     🔥 {userData.scratchCardsBalance} EXTRA COUPONS UNLOCKED!
//                   </div>
//                 )}

//                 <div className="block mt-2">
//                   <button
//                     onClick={handleClaimPointsToCash}
//                     className={`px-4 py-2 rounded-lg font-bold shadow-lg transition text-sm ${userData?.isActivate && userData?.pointsBalance >= 50000
//                         ? "bg-amber-950 text-white hover:bg-black"
//                         : "bg-gray-400 text-gray-200 cursor-not-allowed"
//                       }`}
//                   >
//                     {userData?.pointsBalance >= 50000 ? "CLAIM CASH (₹)" : "MIN 50k PTS"}
//                   </button>
//                 </div>
//               </div>

//               <div className="bg-white/40 p-2 rounded-xl backdrop-blur-sm border border-white/50 min-w-[280px] flex flex-col items-center justify-center min-h-[160px]">
//                 {!userData?.isActivate ? (
//                   <div className="text-center py-6"><span className="text-4xl mb-2 block">🔒</span><p className="text-amber-900 font-black text-[10px] uppercase tracking-tighter">Locked</p></div>
//                 ) : canScratch ? (
//                   <div className="flex flex-col items-center">
//                     {/* <ScratchCard width={260} height={130} revealPercent={60}
//                           // rewardValue={pointsEarned} 
//                           rewardValue={`${pointsEarned.toLocaleString()} Points`} 
//                           onComplete={handleScratchComplete} /> */}
//                     <ScratchCard
//                       width={260}
//                       height={130}
//                       revealPercent={60}
//                       // Referral hai toh 20k, Daily hai toh backend wala pointsEarned
//                       rewardValue={scratchType === "referral" ? "20,000 Points" : `${pointsEarned.toLocaleString()} Points`}
//                       onComplete={handleScratchComplete}
//                     />
//                     <p className="mt-2 text-amber-900 font-black text-[10px] animate-pulse uppercase tracking-widest text-center">
//                       {/* {scratchType === "referral" ? "🎁 BONUS REFERRAL COUPON! 🎁" : "Scratch Daily Reward 👆"} */}
//                       {scratchType === "referral" ? "🎁 REFERRAL BONUS: 20,000 PTS 🎁" : "Scratch Daily Reward 👆"}
//                     </p>
//                   </div>
//                 ) : (
//                   // <div className="text-center py-6 px-10">
//                   //    <p className="text-amber-900 font-bold text-sm tracking-tight leading-tight">Next daily coupon in:</p>
//                   //    <div className="bg-amber-900/20 text-amber-900 px-4 py-2 rounded-lg mt-2 font-mono text-2xl font-black inline-block tracking-tighter">{timeLeft}</div>
//                   //    {/* <p className="text-[9px] mt-2 text-amber-800 font-bold italic">Hint: Refer a friend to get instant coupon!</p> */}

//                   // </div>
//                   <div className="text-center py-6 px-10">
//                     <p className="text-amber-900 font-bold text-sm tracking-tight leading-tight">Next daily coupon in:</p>
//                     <div className="bg-amber-900/20 text-amber-900 px-4 py-2 rounded-lg mt-2 font-mono text-2xl font-black inline-block tracking-tighter">{timeLeft}</div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Wallet Table & Referral Buttons (Same as before) */}
//           <div className="grid grid-cols-2 gap-px bg-gray-200 border border-gray-200 rounded-xl overflow-hidden mb-8 shadow-sm">
//             <div className="bg-white p-4 text-center border-r border-b"><p className="text-gray-400 text-[10px] uppercase font-bold tracking-tighter">Points Balance</p><p className="text-2xl font-black text-amber-600">{userData?.pointsBalance || 0}</p></div>
//             <div className="bg-white p-4 text-center border-b"><p className="text-gray-400 text-[10px] uppercase font-bold tracking-tighter">Money Wallet (₹)</p><p className="text-2xl font-black text-blue-600">₹{userData?.walletAmount || 0}</p></div>
//             <div className="bg-white p-4 text-center border-r"><p className="text-gray-400 text-[10px] uppercase font-bold tracking-tighter">Active Referrals</p><p className="text-xl font-bold text-green-600">{userData?.activeReferralsCount || 0}</p></div>
//             <div className="bg-white p-4 text-center"><p className="text-gray-400 text-[10px] uppercase font-bold tracking-tighter">Min. Withdrawal</p><p className="text-xl font-bold text-gray-800">₹200</p></div>
//           </div>

//           <div className="flex justify-center gap-4 mb-8">
//             <button disabled={!userData?.isActivate} className="bg-green-500 text-white px-6 py-2 rounded-full font-bold shadow-md disabled:opacity-50 text-xs" onClick={() => window.open(`https://wa.me/?text=Join and earn rewards: ${import.meta.env.VITE_WEBSITE_URL}/signup?ref=${userData.referralCode}`, "_blank")}>WhatsApp</button>
//             <button disabled={!userData?.isActivate} onClick={copyReferral} className="bg-gray-700 text-white px-6 py-2 rounded-full font-bold shadow-md disabled:opacity-50 text-xs">{copied ? "COPIED!" : "COPY LINK"}</button>
//           </div>

//           <button onClick={() => setShowModal(true)} disabled={userData?.walletAmount < 200} className={`w-full py-4 rounded-2xl font-black text-lg shadow-xl mb-4 transition-all transform active:scale-95 ${userData?.walletAmount >= 200 ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}>WITHDRAW MONEY (₹)</button>
//         </div>
//       </div>

//       {/* --- MODALS (Same as before) --- */}
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 p-4">
//           <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
//             <h2 className="text-xl font-bold mb-4 text-center">Withdraw Funds</h2>
//             <input type="number" placeholder="Enter Amount" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full border p-3 rounded mb-3" />
//             <input type="text" placeholder="Bank Holder Name" value={bankAccountName} onChange={(e) => setBankAccountName(e.target.value)} className="w-full border p-3 rounded mb-3" />
//             <input type="text" placeholder="IFSC Code" value={ifscCode} onChange={(e) => setIfscCode(e.target.value)} className="w-full border p-3 rounded mb-6" />
//             <div className="flex gap-4">
//               <button onClick={() => setShowModal(false)} className="flex-1 bg-gray-100 py-2 rounded font-bold text-gray-500">Cancel</button>
//               <button onClick={withdrawReq} className="flex-1 bg-blue-500 text-white py-2 rounded font-bold">Confirm</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {showQR && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4">
//           <div className="bg-white rounded-3xl p-8 shadow-2xl w-full max-w-md text-center border-t-8 border-blue-600">
//             <h2 className="text-xl font-black mb-1 text-gray-800 uppercase tracking-widest">SCAN & PAY ₹200</h2>
//             <div className="flex justify-center my-6"><img src={`${import.meta.env.VITE_APP_API_BASE_URL}${paymentConfig?.imageName}`} alt="QR" className="w-56 h-56 object-contain border-4 border-gray-50 p-2 rounded-2xl shadow-inner" /></div>
//             <p className="font-mono bg-gray-50 py-2 rounded-lg text-blue-600 font-bold mb-6 tracking-wider">{paymentConfig?.upiId}</p>
//             <button onClick={handleProceedToProof} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-xl active:scale-95 transition-all">I HAVE PAID — NEXT</button>
//             <button onClick={() => setShowQR(false)} className="mt-4 text-gray-400 font-bold text-xs uppercase cursor-pointer">Cancel</button>
//           </div>
//         </div>
//       )}

//       {paymentModel && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
//           <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
//             <h2 className="text-2xl font-black mb-6 text-gray-800 text-center uppercase tracking-tighter text-blue-700">SUBMIT PROOF</h2>
//             <input type="text" placeholder="Enter 12-digit UTR Number" value={utrNumber} onChange={(e) => setUtrNumber(e.target.value)} className="w-full border p-3 rounded-xl mb-4 focus:outline-blue-500" />
//             <input type="file" onChange={(e) => setPaymentImage(e.target.files[0])} className="w-full mb-8 text-xs text-gray-500" />
//             <button onClick={submitPaymentProof} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-xl">SUBMIT FOR REVIEW</button>
//             <button onClick={() => setPaymentModel(false)} className="w-full mt-4 text-gray-400 text-center font-bold text-xs">Back</button>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }









// import { useEffect, useState } from "react";
// import bgImg from "../../assets/h1_hero.jpg";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchUserData } from "../Store/userSlice";
// import { toast } from "react-toastify";
// import account from "../../assets/account.png";
// import googleImg from "../../assets/google.png";
// import share from "../../assets/share.png";
// import ScratchCard from "../Home/ScratchCard";

// export default function Apply() {
//   const dispatch = useDispatch();
//   const token = localStorage.getItem("totoToken");
//   const { userData } = useSelector((state) => state.user);

//   // UI States
//   const [copied, setCopied] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [amount, setAmount] = useState("");
//   const [ifscCode, setIfscCode] = useState("");
//   const [bankAccountName, setBankAccountName] = useState("");
//   const userId = localStorage.getItem("userId");
//   const [paymentModel, setPaymentModel] = useState(false);
//   const [utrNumber, setUtrNumber] = useState("");
//   const [paymentImage, setPaymentImage] = useState(null);
//   const [previewImage, setPreviewImage] = useState(null);
//   const [showQR, setShowQR] = useState(false);
//   const [paymentConfig, setPaymentConfig] = useState();

//   // --- Rewards & Scratch States ---
//   const [canScratch, setCanScratch] = useState(false);
//   const [isWithin30Days, setIsWithin30Days] = useState(false);
//   const [timeLeft, setTimeLeft] = useState("");
//   const [pointsEarned, setPointsEarned] = useState(0);
//   const [scratchType, setScratchType] = useState(""); // "daily" or "referral"

//   useEffect(() => {
//     dispatch(fetchUserData());
//   }, [dispatch]);

//   // --- Timer & Priority Logic ---
//   useEffect(() => {
//     if (userData) {
//       const signupDate = new Date(userData.createdAt);
//       const now = new Date();
//       const diffDays = Math.ceil((now - signupDate) / (1000 * 60 * 60 * 24));
//       setIsWithin30Days(diffDays <= 30);

//       const checkTimer = () => {
//         if (userData?.isActivate === 'inactive' ||
//           userData?.isActivate === 'reject') {
//           setCanScratch(false);
//           return;
//         }

//         // 1. Priority: Referral Bonus Card
//         if (userData.scratchCardsBalance > 0) {
//           setCanScratch(true);
//           setScratchType("referral");
//           setPointsEarned(20000);
//           return;
//         }

//         // 2. Daily Card Timer
//         const lastScratch = localStorage.getItem(`last_scratch_${userData._id}`);
//         if (lastScratch) {
//           const lastTime = new Date(lastScratch).getTime();
//           const distance = (24 * 60 * 60 * 1000) - (new Date().getTime() - lastTime);

//           if (distance > 0) {
//             setCanScratch(false);
//             const h = Math.floor(distance / (1000 * 60 * 60));
//             const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//             setTimeLeft(`${h}h ${m}m`);
//           } else {
//             setCanScratch(true);
//             setScratchType("daily");
//           }
//         } else {
//           setCanScratch(true);
//           setScratchType("daily");
//         }
//       };

//       checkTimer();
//       const interval = setInterval(checkTimer, 60000);
//       return () => clearInterval(interval);
//     }
//   }, [userData]);



//   useEffect(() => {
//     if (!canScratch || scratchType !== "daily") return;

//     const currentId = userData?._id;

//     const isValidObjectId =
//       typeof currentId === "string" &&
//       /^[a-f\d]{24}$/i.test(currentId);

//     if (!isValidObjectId) return;

//     const isValidId = currentId && currentId.length === 24 && currentId !== "undefined";

//     if (!isValidId || !token) return;

//     const getPoints = async () => {
//       try {
//         const res = await axios.get(
//           `${import.meta.env.VITE_APP_API_BASE_URL}api/user/today-reward-points/${currentId}`,
//           {

//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setPointsEarned(res.data?.points || 0);
//       } catch (err) {
//         console.error("Daily reward API failed", err);
//       }
//     };

//     getPoints();
//   }, [canScratch, scratchType, userData?._id, token]);




//   const handleScratchComplete = async () => {
//     if (userData?.isActivate === 'inactive' ||
//       userData?.isActivate === 'reject') return;

//     try {
//       // Agar scratchType "referral" hai toh ye 'claim-referral-coupon' par jana chahiye
//       const endpoint = scratchType === "referral" ? "claim-referral-coupon" : "claim-daily-points";

//       console.log("Calling Endpoint:", endpoint); // Debug kijiye console mein

//       const res = await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/${endpoint}`,
//         { userId: userData._id },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (res.status === 200) {
//         toast.success(`${res.data.points} Points added! ✨`);
//         if (scratchType === "daily") {
//           localStorage.setItem(`last_scratch_${userData._id}`, new Date().toISOString());
//         }

//         setCanScratch(false);
//         setPointsEarned(0);
//         dispatch(fetchUserData());
//       }
//     } catch (err) {
//       console.error("Scratch Error:", err.response?.data);
//       toast.error(err.response?.data?.message || "Error claiming points.");
//     }
//   };

//   const handleClaimPointsToCash = async () => {
//     if (userData?.isActivate === 'inactive' ||
//       userData?.isActivate === 'reject') return toast.error("Please activate account first!");
//     if (userData?.pointsBalance < 1000) return toast.warning("Min 50,000 points needed!");
//     try {
//       const res = await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/convert-points`,
//         { userId: userData._id }, { headers: { Authorization: `Bearer ${token}` } });
//       if (res.status === 200) {
//         toast.success(`Converted to cash! 💰`);
//         dispatch(fetchUserData());
//       }
//     } catch (err) { toast.error("Conversion failed."); }
//   };

//   const handleActivateClick = async () => {
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/payment-config`, { headers: { Authorization: `Bearer ${token}` } });
//       setPaymentConfig(res?.data);
//       setShowQR(true);
//     } catch (error) { toast.error("QR Fetch Error"); }
//   };

//   const handleProceedToProof = () => { setShowQR(false); setPaymentModel(true); };

//   const copyReferral = async () => {
//     const link = `${import.meta.env.VITE_WEBSITE_URL}/signup?ref=${userData.referralCode}`;
//     await navigator.clipboard.writeText(link);
//     setCopied(true); setTimeout(() => setCopied(false), 2000);
//     toast.success("Link Copied!");
//   };

//   const handleInst = () => {
//     if (!userData?.referralCode) return toast.error("Refer code not available");
//     const link = `${import.meta.env.VITE_WEBSITE_URL}/signup?ref=${userData.referralCode}`;
//     navigator.clipboard.writeText(`Join and earn rewards: ${link}`).then(() => {
//       window.open("https://www.instagram.com/direct/inbox/", "_blank");
//     });
//   };

//   const withdrawReq = async () => {
//     if (userData?.walletAmount < amount) return toast.error("Low Balance!");
//     try {
//       await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/withdraw`,
//         { userId: userData._id, amount: Number(amount), bankAccountName, ifscCode }, { headers: { Authorization: `Bearer ${token}` } });
//       toast.success("Withdraw Sent"); setShowModal(false); dispatch(fetchUserData());
//     } catch (err) { toast.error("Error"); }
//   };

//   const submitPaymentProof = async () => {
//     const formData = new FormData();
//     formData.append("userId", userData?._id);
//     if (utrNumber) formData.append("utrNumber", utrNumber);
//     if (paymentImage) formData.append("paymentImage", paymentImage);
//     try {
//       await axios.patch(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/payment-proof`, formData, { headers: { Authorization: `Bearer ${token}` } });
//       toast.success("Proof submitted!"); setPaymentModel(false); dispatch(fetchUserData());
//     } catch (error) { toast.error("Error"); }
//   };

//   return (
//     <section className="w-full pt-16">
//       <div className="h-[50vh] flex items-center justify-center bg-grid" style={{ backgroundImage: `url(${bgImg})` }}>
//         <h1 className="text-6xl font-bold text-gray-800 tracking-tighter uppercase italic text-center">REFER & EARN</h1>
//       </div>

//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
//         <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
//           <h1 className="text-2xl font-bold text-center mb-4 text-blue-800 tracking-tight">Refer & Earn – Earn 20k Points (₹200) Per Friend! 💰</h1>
//           <p className="text-center text-gray-600 mb-6 text-sm">
//             Refer & Earn – Join now, pay ₹200 activation fee and get instant signup bonus!
//             Share your link — every friend's activation earns you ₹200 (20k pts) instantly! 💸
//           </p>

//           {userData?.isActivate === 'active' ? (
//             <button className="w-full bg-green-600 text-white py-3 rounded-lg mb-6 font-black shadow-md tracking-widest uppercase">
//               ✓ ACTIVE USER
//             </button>
//           ) : userData?.isActivate === 'reject' ? (
//             <button className="w-full bg-red-500 text-white py-3 rounded-lg mb-6 font-black shadow-md animate-pulse uppercase tracking-widest">
//               REJECT ACTIVATION...
//             </button>
//           ) : userData?.utrNumber || userData?.paymentImage ? (
//             <button className="w-full bg-yellow-500 text-white py-3 rounded-lg mb-6 font-black shadow-md animate-pulse uppercase tracking-widest">
//               PENDING ACTIVATION...
//             </button>
//           ) : (
//             <button
//               onClick={handleActivateClick}
//               className="w-full bg-blue-600 text-white py-3 rounded-lg mb-6 font-black shadow-md hover:bg-blue-700 transition tracking-widest uppercase"
//             >
//               ACTIVATE & GET LINK
//             </button>
//           )}


//           <div className="grid grid-cols-3 gap-2 mb-10 text-center">
//             <div className="flex flex-col items-center"><img src={googleImg} className="w-12 h-12 mb-2" alt="1" /><p className="text-[10px]"><strong>1. Login</strong><br />Google Signup</p></div>
//             <div className="flex flex-col items-center"><img src={account} className="w-12 h-12 mb-2" alt="2" /><p className="text-[10px]"><strong>2. Activate</strong><br />Pay fee</p></div>
//             <div className="flex flex-col items-center"><img src={share} className="w-12 h-12 mb-2" alt="3" /><p className="text-[10px]"><strong>3. Earn</strong><br />Get Points</p></div>
//           </div>

//            {isWithin30Days && (
//             <div className="w-full bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 p-6 rounded-2xl shadow-xl border-2 border-amber-600 mb-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
//               <div className="absolute top-0 right-0 p-2 opacity-10 text-6xl">💎</div>
//               <div className="text-center md:text-left">
//                 <h2 className="text-amber-900 font-extrabold text-lg uppercase tracking-tighter italic">
//                   {scratchType === "referral" ? "✨ Referral Reward ✨" : "✨ Daily Lucky Coupon ✨"}
//                 </h2>
//                 <p className="text-amber-800 text-xs mb-1 font-semibold tracking-tighter">
//                   Potential Points: <span className="text-xl font-black text-amber-950">
//                     {scratchType === "referral" ? "20,000" : (pointsEarned > 0 ? pointsEarned.toLocaleString() : "...")}
//                   </span>
//                 </p>
//                 {userData?.scratchCardsBalance > 0 && (
//                   <div className="bg-red-600 text-white text-[9px] px-2 py-0.5 rounded-full inline-block font-bold mb-3 animate-bounce">
//                     🔥 {userData.scratchCardsBalance} EXTRA COUPONS!
//                   </div>
//                 )}
//                 <div className="block mt-2">
//                   <button onClick={handleClaimPointsToCash} className={`px-4 py-2 rounded-lg font-bold shadow-lg transition text-sm
//                      ${userData?.isActivate === 'active' && userData?.pointsBalance >= 1000 ? "bg-amber-950 text-white hover:bg-black" : "bg-gray-400 text-gray-200 cursor-not-allowed"}`}>
//                     {userData?.pointsBalance >= 1000 ? "CLAIM CASH (₹)" : "MIN 1000 PTS"}
//                   </button>
//                 </div>
//               </div>

//               <div className="bg-white/40 p-2 rounded-xl backdrop-blur-sm border border-white/50 min-w-[280px] flex flex-col items-center justify-center min-h-[160px]">
//                 { (userData?.isActivate === 'inactive' ||
//   userData?.isActivate === 'reject') ? (
//                   <div className="text-center py-6"><span className="text-4xl mb-2 block">🔒</span><p className="text-amber-900 font-black text-[10px] uppercase">Locked</p></div>
//                 ) : 
//                 canScratch ? (
//                   <div className="flex flex-col items-center">
//                     <ScratchCard
//                       width={260}
//                       height={130}
                      
//                       revealPercent={60}
//                       rewardValue={
//                         scratchType === "referral"
//                           ? "20,000 Points"
//                           : `${pointsEarned.toLocaleString()} Points`
//                       }
//                       onComplete={handleScratchComplete}
//                     />
//                     <p className="mt-2 text-amber-900 font-black text-[10px] animate-pulse uppercase tracking-widest text-center">
//                       {scratchType === "referral" ? "🎁 REFERRAL BONUS: 20,000 PTS 🎁" : "Scratch Daily Reward 👆"}
//                     </p>
//                   </div>
//                 ) 
//                 : (
//                   <div className="text-center py-6 px-10">
//                     <p className="text-amber-900 font-bold text-sm tracking-tight leading-tight">Next daily coupon in:</p>
//                     <div className="bg-amber-900/20 text-amber-900 px-4 py-2 rounded-lg mt-2 font-mono text-2xl font-black inline-block tracking-tighter">{timeLeft}</div>
//                   </div>
//                 )}
//               </div>

//             </div>
//           )} 

//            <div className="grid grid-cols-2 gap-px bg-gray-200 border border-gray-200 rounded-xl overflow-hidden mb-8 shadow-sm text-center">
//             <div className="bg-white p-4 border-r border-b"><p className="text-gray-400 text-[10px] uppercase font-bold tracking-tighter">Points Balance</p><p className="text-2xl font-black text-amber-600">{userData?.pointsBalance || 0}</p></div>
//             <div className="bg-white p-4 border-b"><p className="text-gray-400 text-[10px] uppercase font-bold tracking-tighter">Money Wallet (₹)</p><p className="text-2xl font-black text-blue-600">₹{userData?.walletAmount || 0}</p></div>
//             <div className="bg-white p-4 border-r"><p className="text-gray-400 text-[10px] uppercase font-bold tracking-tighter">Active Referrals</p><p className="text-xl font-bold text-green-600">{userData?.activeReferralsCount || 0}</p></div>
//             <div className="bg-white p-4"><p className="text-gray-400 text-[10px] uppercase font-bold tracking-tighter">Min. Withdrawal</p><p className="text-xl font-bold text-gray-800">₹200</p></div>
//           </div> 

//           {(userData?.isActivate=='active') && (
//             <div className="bg-blue-50 p-4 rounded-xl border border-dashed border-blue-300 mb-6 text-center">
//               <p className="text-[10px] text-blue-400 font-bold uppercase mb-1 tracking-widest">Your Referral Link & Code</p>
//               <p className="text-xs font-mono text-blue-700 font-bold break-all mb-1">{import.meta.env.VITE_WEBSITE_URL}/signup?ref={userData.referralCode}</p>
//               <p className="text-[10px] text-gray-500 italic uppercase">Code: <span className="text-blue-600 font-black">{userData.referralCode}</span></p>
//             </div>
//           )} 


//           <div className="flex flex-wrap justify-center gap-4 mb-8">
//             <button disabled={userData?.isActivate === 'inactive' || userData?.isActivate === 'reject'} className="flex items-center gap-2 bg-green-500 text-white px-6 py-2 rounded-full font-bold shadow-md disabled:opacity-50 text-xs" onClick={() => window.open(`https://wa.me/?text=Join and earn rewards: ${import.meta.env.VITE_WEBSITE_URL}/signup?ref=${userData.referralCode}`, "_blank")}>
//               <img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" className="w-4 h-4" alt="wa" /> WhatsApp
//             </button>
//             <button disabled={userData?.isActivate === 'inactive' || userData?.isActivate === 'reject'} onClick={copyReferral} className="flex items-center gap-2 bg-gray-700 text-white px-6 py-2 rounded-full font-bold shadow-md disabled:opacity-50 text-xs uppercase">
//               <img src="https://cdn-icons-png.flaticon.com/512/60/60990.png" className="w-4 h-4" alt="copy" /> {copied ? "COPIED!" : "COPY LINK"}
//             </button>
//             <button disabled={userData?.isActivate === 'inactive' || userData?.isActivate === 'reject'} onClick={handleInst} className="flex items-center gap-2 bg-pink-500 text-white px-6 py-2 rounded-full font-bold shadow-md disabled:opacity-50 text-xs">
//               <img src="https://cdn-icons-png.flaticon.com/512/1384/1384063.png" className="w-4 h-4" alt="ig" /> INSTAGRAM
//             </button>
//           </div>

//           <button onClick={() => setShowModal(true)} disabled={userData?.walletAmount < 200} className={`w-full py-4 rounded-2xl font-black text-lg shadow-xl mb-4 transition-all transform active:scale-95 ${userData?.walletAmount >= 200 ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}>WITHDRAW MONEY (₹)</button>
//           <p className="text-center text-gray-400 font-bold text-[10px] uppercase tracking-widest italic">Total Withdrawn: ₹{userData?.totalAmount || 0}</p>
//         </div>
//       </div>

//       {/* --- MODALS --- */}
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 p-4">
//           <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
//             <h2 className="text-xl font-bold mb-4 text-center">Withdraw Funds</h2>
//             <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full border p-3 rounded mb-3 text-sm" />
//             <input type="text" placeholder="Bank Account Number" value={bankAccountName} onChange={(e) => setBankAccountName(e.target.value)} className="w-full border p-3 rounded mb-3 text-sm" />
//             <input type="text" placeholder="IFSC Code" value={ifscCode} onChange={(e) => setIfscCode(e.target.value)} className="w-full border p-3 rounded mb-6 text-sm" />
//             <div className="flex gap-4">
//               <button onClick={() => setShowModal(false)} className="flex-1 bg-gray-100 py-2 rounded font-bold">Cancel</button>
//               <button onClick={withdrawReq} className="flex-1 bg-blue-500 text-white py-2 rounded font-bold">Confirm</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {showQR && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4 text-center">
//           <div className="bg-white rounded-3xl p-8 shadow-2xl w-full max-w-md border-t-8 border-blue-600">
//             <h2 className="text-sm font-black mb-1 uppercase tracking-widest">SCAN & PAY ₹200</h2>
//             <div className="flex justify-center my-6"><img src={`${import.meta.env.VITE_APP_API_BASE_URL}${paymentConfig?.imageName}`} alt="QR" className="w-56 h-56 border p-2 rounded-2xl shadow-inner" /></div>
//             <p className="font-mono bg-gray-50 py-2 rounded-lg text-blue-600 font-bold mb-4 text-xs tracking-wider">{paymentConfig?.upiId}</p>
//             <button onClick={handleProceedToProof} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold uppercase text-sm">I HAVE PAID — NEXT</button>
//             <button onClick={() => setShowQR(false)} className="mt-4 text-gray-400 font-bold text-[10px] uppercase">Cancel</button>
//           </div>
//         </div>
//       )}

//       {paymentModel && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
//           <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
//             <h2 className="text-2xl font-black mb-6 text-gray-800 text-center uppercase text-blue-700">SUBMIT PROOF</h2>
//             <input type="text" placeholder="UTR Number" value={utrNumber} onChange={(e) => setUtrNumber(e.target.value)} className="w-full border p-3 rounded-xl mb-4 text-sm" />
//             <p className="text-[10px] text-gray-400 mb-1 ml-1 font-bold">SCREENSHOT:</p>
//             <input type="file" onChange={(e) => {
//               const file = e.target.files[0];
//               setPaymentImage(file);
//               if (file) {
//                 const reader = new FileReader();
//                 reader.onloadend = () => setPreviewImage(reader.result);
//                 reader.readAsDataURL(file);
//               }
//             }} className="w-full mb-4 text-xs" />
//             {previewImage && <img src={previewImage} className="w-full h-32 object-contain rounded-lg mb-4 border" alt="preview" />}
//             <button onClick={submitPaymentProof} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold uppercase text-sm">SUBMIT FOR REVIEW</button>
//             <button onClick={() => setPaymentModel(false)} className="w-full mt-4 text-gray-400 text-center font-bold text-[10px] uppercase">Back</button>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }


//o8 line


// import { useEffect, useState } from "react";
// import bgImg from "../../assets/h1_hero.jpg";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchUserData } from "../Store/userSlice";
// import { toast } from "react-toastify";
// import account from "../../assets/account.png";
// import googleImg from "../../assets/google.png";
// import share from "../../assets/share.png";
// import ScratchCard from "../Home/ScratchCard";

// export default function Apply() {
//   const dispatch = useDispatch();
//   const token = localStorage.getItem("totoToken");
//   const { userData } = useSelector((state) => state.user);

//   // UI States
//   const [copied, setCopied] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [amount, setAmount] = useState("");
//   const [ifscCode, setIfscCode] = useState("");
//   const [bankAccountName, setBankAccountName] = useState("");
  
//   // States updated for free activation
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // --- Rewards & Scratch States ---
//   const [canScratch, setCanScratch] = useState(false);
//   const [isWithin30Days, setIsWithin30Days] = useState(false);
//   const [timeLeft, setTimeLeft] = useState("");
//   const [pointsEarned, setPointsEarned] = useState(0);
//   const [scratchType, setScratchType] = useState("");

//   useEffect(() => {
//     dispatch(fetchUserData());
//   }, [dispatch]);

//   // --- Timer & Priority Logic ---
//   useEffect(() => {
//     if (userData) {
//       const signupDate = new Date(userData.createdAt);
//       const now = new Date();
//       const diffDays = Math.ceil((now - signupDate) / (1000 * 60 * 60 * 24));
//       setIsWithin30Days(diffDays <= 30);

//       const checkTimer = () => {
//         if (userData?.isActivate === 'inactive' || userData?.isActivate === 'reject') {
//           setCanScratch(false);
//           return;
//         }

//         if (userData.scratchCardsBalance > 0) {
//           setCanScratch(true);
//           setScratchType("referral");
//           setPointsEarned(20000);
//           return;
//         }

//         const lastScratch = localStorage.getItem(`last_scratch_${userData._id}`);
//         if (lastScratch) {
//           const lastTime = new Date(lastScratch).getTime();
//           const distance = (24 * 60 * 60 * 1000) - (new Date().getTime() - lastTime);

//           if (distance > 0) {
//             setCanScratch(false);
//             const h = Math.floor(distance / (1000 * 60 * 60));
//             const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//             setTimeLeft(`${h}h ${m}m`);
//           } else {
//             setCanScratch(true);
//             setScratchType("daily");
//           }
//         } else {
//           setCanScratch(true);
//           setScratchType("daily");
//         }
//       };

//       checkTimer();
//       const interval = setInterval(checkTimer, 60000);
//       return () => clearInterval(interval);
//     }
//   }, [userData]);

//   useEffect(() => {
//     if (!canScratch || scratchType !== "daily") return;
//     const currentId = userData?._id;
//     if (!currentId || !token) return;

//     const getPoints = async () => {
//       try {
//         const res = await axios.get(
//           `${import.meta.env.VITE_APP_API_BASE_URL}api/user/today-reward-points/${currentId}`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         setPointsEarned(res.data?.points || 0);
//       } catch (err) {
//         console.error("Daily reward API failed", err);
//       }
//     };
//     getPoints();
//   }, [canScratch, scratchType, userData?._id, token]);

//   const handleScratchComplete = async () => {
//     if (userData?.isActivate === 'inactive' || userData?.isActivate === 'reject') return;
//     try {
//       const endpoint = scratchType === "referral" ? "claim-referral-coupon" : "claim-daily-points";
//       const res = await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/${endpoint}`,
//         { userId: userData._id },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (res.status === 200) {
//         toast.success(`${res.data.points} Points added! ✨`);
//         if (scratchType === "daily") {
//           localStorage.setItem(`last_scratch_${userData._id}`, new Date().toISOString());
//         }
//         setCanScratch(false);
//         setPointsEarned(0);
//         dispatch(fetchUserData());
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Error claiming points.");
//     }
//   };

//   const handleClaimPointsToCash = async () => {
//     if (userData?.isActivate === 'inactive' || userData?.isActivate === 'reject') 
//       return toast.error("Please activate account first!");
//     if (userData?.pointsBalance < 1000) return toast.warning("Min 1,000 points needed!");
//     try {
//       const res = await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/convert-points`,
//         { userId: userData._id }, { headers: { Authorization: `Bearer ${token}` } });
//       if (res.status === 200) {
//         toast.success(`Converted to cash! 💰`);
//         dispatch(fetchUserData());
//       }
//     } catch (err) { toast.error("Conversion failed."); }
//   };

//   // MODIFIED: Request Free Activation
//   const handleFreeActivation = async () => {
//     setIsSubmitting(true);
//     const formData = new FormData();
//     formData.append("userId", userData?._id);
//     // Hum "FREE" value bhej rahe hain taaki admin ko pata chale ye free request hai
//     formData.append("utrNumber", "FREE_ACTIVATION_REQUEST"); 

//     try {
//       await axios.patch(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/payment-proof`, formData, { 
//         headers: { Authorization: `Bearer ${token}` } 
//       });
//       toast.success("Activation request sent! Waiting for admin approval.");
//       dispatch(fetchUserData());
//     } catch (error) { 
//       toast.error("Failed to send request. Try again."); 
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const copyReferral = async () => {
//     const link = `${import.meta.env.VITE_WEBSITE_URL}/signup?ref=${userData.referralCode}`;
//     await navigator.clipboard.writeText(link);
//     setCopied(true); setTimeout(() => setCopied(false), 2000);
//     toast.success("Link Copied!");
//   };

//   const handleInst = () => {
//     if (!userData?.referralCode) return toast.error("Refer code not available");
//     const link = `${import.meta.env.VITE_WEBSITE_URL}/signup?ref=${userData.referralCode}`;
//     navigator.clipboard.writeText(`Join and earn rewards: ${link}`).then(() => {
//       window.open("https://www.instagram.com/direct/inbox/", "_blank");
//     });
//   };

//   const withdrawReq = async () => {
//     if (userData?.walletAmount < amount) return toast.error("Low Balance!");
//     try {
//       await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/withdraw`,
//         { userId: userData._id, amount: Number(amount), bankAccountName, ifscCode }, { headers: { Authorization: `Bearer ${token}` } });
//       toast.success("Withdraw Sent"); setShowModal(false); dispatch(fetchUserData());
//     } catch (err) { toast.error("Error"); }
//   };

//   return (
//     <section className="w-full pt-16">
//       <div className="h-[50vh] flex items-center justify-center bg-grid" style={{ backgroundImage: `url(${bgImg})` }}>
//         <h1 className="text-6xl font-bold text-gray-800 tracking-tighter uppercase italic text-center">REFER & EARN</h1>
//       </div>

//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
//         <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
//           <h1 className="text-2xl font-bold text-center mb-4 text-blue-800 tracking-tight">Refer & Earn – Earn 20k Points (₹200) Per Friend! 💰</h1>
//           <p className="text-center text-gray-600 mb-6 text-sm">
//             Refer & Earn – Join now, request FREE activation and get instant signup bonus!
//             Share your link — every friend's activation earns you ₹200 (20k pts) instantly! 💸
//           </p>

//           {userData?.isActivate === 'active' ? (
//             <button className="w-full bg-green-600 text-white py-3 rounded-lg mb-6 font-black shadow-md tracking-widest uppercase">
//               ✓ ACTIVE USER
//             </button>
//           ) : userData?.isActivate === 'reject' ? (
//             <button className="w-full bg-red-500 text-white py-3 rounded-lg mb-6 font-black shadow-md animate-pulse uppercase tracking-widest">
//               REJECTED - CONTACT SUPPORT
//             </button>
//           ) : userData?.utrNumber || userData?.paymentImage ? (
//             <button className="w-full bg-yellow-500 text-white py-3 rounded-lg mb-6 font-black shadow-md animate-pulse uppercase tracking-widest">
//               PENDING APPROVAL...
//             </button>
//           ) : (
//             <button
//               onClick={handleFreeActivation}
//               disabled={isSubmitting}
//               className="w-full bg-blue-600 text-white py-3 rounded-lg mb-6 font-black shadow-md hover:bg-blue-700 transition tracking-widest uppercase"
//             >
//               {isSubmitting ? "REQUESTING..." : "ACTIVATE & GET LINK (FREE)"}
//             </button>
//           )}

//           <div className="grid grid-cols-3 gap-2 mb-10 text-center">
//             <div className="flex flex-col items-center"><img src={googleImg} className="w-12 h-12 mb-2" alt="1" /><p className="text-[10px]"><strong>1. Login</strong><br />Google Signup</p></div>
//             <div className="flex flex-col items-center"><img src={account} className="w-12 h-12 mb-2" alt="2" /><p className="text-[10px]"><strong>2. Activate</strong><br />Free Request</p></div>
//             <div className="flex flex-col items-center"><img src={share} className="w-12 h-12 mb-2" alt="3" /><p className="text-[10px]"><strong>3. Earn</strong><br />Get Points</p></div>
//           </div>

//            {isWithin30Days && (
//             <div className="w-full bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 p-6 rounded-2xl shadow-xl border-2 border-amber-600 mb-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
//               <div className="absolute top-0 right-0 p-2 opacity-10 text-6xl">💎</div>
//               <div className="text-center md:text-left">
//                 <h2 className="text-amber-900 font-extrabold text-lg uppercase tracking-tighter italic">
//                   {scratchType === "referral" ? "✨ Referral Reward ✨" : "✨ Daily Lucky Coupon ✨"}
//                 </h2>
//                 <p className="text-amber-800 text-xs mb-1 font-semibold tracking-tighter">
//                   Potential Points: <span className="text-xl font-black text-amber-950">
//                     {scratchType === "referral" ? "20,000" : (pointsEarned > 0 ? pointsEarned.toLocaleString() : "...")}
//                   </span>
//                 </p>
//                 {userData?.scratchCardsBalance > 0 && (
//                   <div className="bg-red-600 text-white text-[9px] px-2 py-0.5 rounded-full inline-block font-bold mb-3 animate-bounce">
//                     🔥 {userData.scratchCardsBalance} EXTRA COUPONS!
//                   </div>
//                 )}
//                 <div className="block mt-2">
//                   <button onClick={handleClaimPointsToCash} className={`px-4 py-2 rounded-lg font-bold shadow-lg transition text-sm
//                      ${userData?.isActivate === 'active' && userData?.pointsBalance >= 1000 ? "bg-amber-950 text-white hover:bg-black" : "bg-gray-400 text-gray-200 cursor-not-allowed"}`}>
//                     {userData?.pointsBalance >= 1000 ? "CLAIM CASH (₹)" : "MIN 1000 PTS"}
//                   </button>
//                 </div>
//               </div>

//               <div className="bg-white/40 p-2 rounded-xl backdrop-blur-sm border border-white/50 min-w-[280px] flex flex-col items-center justify-center min-h-[160px]">
//                 { (userData?.isActivate === 'inactive' || userData?.isActivate === 'reject' || userData?.utrNumber) ? (
//                   <div className="text-center py-6"><span className="text-4xl mb-2 block">🔒</span><p className="text-amber-900 font-black text-[10px] uppercase">{userData?.isActivate === 'active' ? "Unlocked" : "Locked (Need Activation)"}</p></div>
//                 ) : 
//                 canScratch ? (
//                   <div className="flex flex-col items-center">
//                     <ScratchCard
//                       width={260}
//                       height={130}
//                       revealPercent={60}
//                       rewardValue={scratchType === "referral" ? "20,000 Points" : `${pointsEarned.toLocaleString()} Points`}
//                       onComplete={handleScratchComplete}
//                     />
//                     <p className="mt-2 text-amber-900 font-black text-[10px] animate-pulse uppercase tracking-widest text-center">
//                       {scratchType === "referral" ? "🎁 REFERRAL BONUS: 20,000 PTS 🎁" : "Scratch Daily Reward 👆"}
//                     </p>
//                   </div>
//                 ) 
//                 : (
//                   <div className="text-center py-6 px-10">
//                     <p className="text-amber-900 font-bold text-sm tracking-tight leading-tight">Next daily coupon in:</p>
//                     <div className="bg-amber-900/20 text-amber-900 px-4 py-2 rounded-lg mt-2 font-mono text-2xl font-black inline-block tracking-tighter">{timeLeft}</div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )} 

//           <div className="grid grid-cols-2 gap-px bg-gray-200 border border-gray-200 rounded-xl overflow-hidden mb-8 shadow-sm text-center">
//             <div className="bg-white p-4 border-r border-b"><p className="text-gray-400 text-[10px] uppercase font-bold tracking-tighter">Points Balance</p><p className="text-2xl font-black text-amber-600">{userData?.pointsBalance || 0}</p></div>
//             <div className="bg-white p-4 border-b"><p className="text-gray-400 text-[10px] uppercase font-bold tracking-tighter">Money Wallet (₹)</p><p className="text-2xl font-black text-blue-600">₹{userData?.walletAmount || 0}</p></div>
//             <div className="bg-white p-4 border-r"><p className="text-gray-400 text-[10px] uppercase font-bold tracking-tighter">Active Referrals</p><p className="text-xl font-bold text-green-600">{userData?.activeReferralsCount || 0}</p></div>
//             <div className="bg-white p-4"><p className="text-gray-400 text-[10px] uppercase font-bold tracking-tighter">Min. Withdrawal</p><p className="text-xl font-bold text-gray-800">₹200</p></div>
//           </div> 

//           {(userData?.isActivate === 'active') && (
//             <div className="bg-blue-50 p-4 rounded-xl border border-dashed border-blue-300 mb-6 text-center">
//               <p className="text-[10px] text-blue-400 font-bold uppercase mb-1 tracking-widest">Your Referral Link & Code</p>
//               <p className="text-xs font-mono text-blue-700 font-bold break-all mb-1">{import.meta.env.VITE_WEBSITE_URL}/signup?ref={userData.referralCode}</p>
//               <p className="text-[10px] text-gray-500 italic uppercase">Code: <span className="text-blue-600 font-black">{userData.referralCode}</span></p>
//             </div>
//           )} 

//           <div className="flex flex-wrap justify-center gap-4 mb-8">
//             <button disabled={userData?.isActivate !== 'active'} className="flex items-center gap-2 bg-green-500 text-white px-6 py-2 rounded-full font-bold shadow-md disabled:opacity-50 text-xs" onClick={() => window.open(`https://wa.me/?text=Join and earn rewards: ${import.meta.env.VITE_WEBSITE_URL}/signup?ref=${userData.referralCode}`, "_blank")}>
//               <img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" className="w-4 h-4" alt="wa" /> WhatsApp
//             </button>
//             <button disabled={userData?.isActivate !== 'active'} onClick={copyReferral} className="flex items-center gap-2 bg-gray-700 text-white px-6 py-2 rounded-full font-bold shadow-md disabled:opacity-50 text-xs uppercase">
//               <img src="https://cdn-icons-png.flaticon.com/512/60/60990.png" className="w-4 h-4" alt="copy" /> {copied ? "COPIED!" : "COPY LINK"}
//             </button>
//             <button disabled={userData?.isActivate !== 'active'} onClick={handleInst} className="flex items-center gap-2 bg-pink-500 text-white px-6 py-2 rounded-full font-bold shadow-md disabled:opacity-50 text-xs">
//               <img src="https://cdn-icons-png.flaticon.com/512/1384/1384063.png" className="w-4 h-4" alt="ig" /> INSTAGRAM
//             </button>
//           </div>

//           <button onClick={() => setShowModal(true)} disabled={userData?.walletAmount < 200} className={`w-full py-4 rounded-2xl font-black text-lg shadow-xl mb-4 transition-all transform active:scale-95 ${userData?.walletAmount >= 200 ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}>WITHDRAW MONEY (₹)</button>
//           <p className="text-center text-gray-400 font-bold text-[10px] uppercase tracking-widest italic">Total Withdrawn: ₹{userData?.totalAmount || 0}</p>
//         </div>
//       </div>

//       {/* --- WITHDRAW MODAL --- */}
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 p-4">
//           <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
//             <h2 className="text-xl font-bold mb-4 text-center">Withdraw Funds</h2>
//             <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full border p-3 rounded mb-3 text-sm" />
//             <input type="text" placeholder="Bank Account Number" value={bankAccountName} onChange={(e) => setBankAccountName(e.target.value)} className="w-full border p-3 rounded mb-3 text-sm" />
//             <input type="text" placeholder="IFSC Code" value={ifscCode} onChange={(e) => setIfscCode(e.target.value)} className="w-full border p-3 rounded mb-6 text-sm" />
//             <div className="flex gap-4">
//               <button onClick={() => setShowModal(false)} className="flex-1 bg-gray-100 py-2 rounded font-bold">Cancel</button>
//               <button onClick={withdrawReq} className="flex-1 bg-blue-500 text-white py-2 rounded font-bold">Confirm</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }





// import { useEffect, useState } from "react";
// import bgImg from "../../assets/h1_hero.jpg";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchUserData } from "../Store/userSlice";
// import { toast } from "react-toastify";
// import account from "../../assets/account.png";
// import googleImg from "../../assets/google.png";
// import share from "../../assets/share.png";
// import ScratchCard from "../Home/ScratchCard";

// export default function Apply() {
//   const dispatch = useDispatch();
//   const token = localStorage.getItem("totoToken");
//   const { userData } = useSelector((state) => state.user);

//   // UI States
//   const [copied, setCopied] = useState(false);
//   const [showModal, setShowModal] = useState(false); // Step 1: Bank Details
//   const [showQR, setShowQR] = useState(false);      // Step 2: QR Payment
//   const [paymentModel, setPaymentModel] = useState(false); // Step 3: Proof Submission
  
//   // Form States
//   const [bankAccountName, setBankAccountName] = useState("");
//   const [ifscCode, setIfscCode] = useState("");
//   const [utrNumber, setUtrNumber] = useState("");
//   const [paymentImage, setPaymentImage] = useState(null);
//   const [previewImage, setPreviewImage] = useState(null);
//   const [paymentConfig, setPaymentConfig] = useState();
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // --- 8 LEVELS WITHDRAWAL CONFIG ---
//   const withdrawalLevels = [
//     { level: 1, amount: 50, payout: 25, fee: 25 },
//     { level: 2, amount: 100, payout: 50, fee: 50 },
//     { level: 3, amount: 200, payout: 100, fee: 100 },
//     { level: 4, amount: 400, payout: 200, fee: 200 },
//     { level: 5, amount: 800, payout: 400, fee: 400 },
//     { level: 6, amount: 1600, payout: 800, fee: 800 },
//     { level: 7, amount: 3200, payout: 1600, fee: 1600 },
//     { level: 8, amount: 6400, payout: 3200, fee: 3200 },
//   ];

//   // Logic to handle 1-8 cycle from backend 'withdrawalStage'
//   const currentLevelIndex = ((userData?.withdrawalStage || 1) - 1) % 8;
//   const currentLevel = withdrawalLevels[currentLevelIndex];

//   // --- Rewards & Scratch States (UNCHANGED) ---
//   const [canScratch, setCanScratch] = useState(false);
//   const [isWithin30Days, setIsWithin30Days] = useState(false);
//   const [timeLeft, setTimeLeft] = useState("");
//   const [pointsEarned, setPointsEarned] = useState(0);
//   const [scratchType, setScratchType] = useState("");

//   useEffect(() => {
//     dispatch(fetchUserData());
//   }, [dispatch]);

//   // --- Scratch Card Timer Logic (UNCHANGED) ---
//   useEffect(() => {
//     if (userData) {
//       const signupDate = new Date(userData.createdAt);
//       const now = new Date();
//       const diffDays = Math.ceil((now - signupDate) / (1000 * 60 * 60 * 24));
//       setIsWithin30Days(diffDays <= 30);

//       const checkTimer = () => {
//         if (userData?.isActivate === 'inactive' || userData?.isActivate === 'reject') {
//           setCanScratch(false);
//           return;
//         }
//         if (userData.scratchCardsBalance > 0) {
//           setCanScratch(true);
//           setScratchType("referral");
//           setPointsEarned(20000);
//           return;
//         }
//         const lastScratch = localStorage.getItem(`last_scratch_${userData._id}`);
//         if (lastScratch) {
//           const lastTime = new Date(lastScratch).getTime();
//           const distance = (24 * 60 * 60 * 1000) - (new Date().getTime() - lastTime);
//           if (distance > 0) {
//             setCanScratch(false);
//             const h = Math.floor(distance / (1000 * 60 * 60));
//             const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//             setTimeLeft(`${h}h ${m}m`);
//           } else { setCanScratch(true); setScratchType("daily"); }
//         } else { setCanScratch(true); setScratchType("daily"); }
//       };
//       checkTimer();
//       const interval = setInterval(checkTimer, 60000);
//       return () => clearInterval(interval);
//     }
//   }, [userData]);

//   useEffect(() => {
//     if (!canScratch || scratchType !== "daily" || !userData?._id || !token) return;
//     const getPoints = async () => {
//       try {
//         const res = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/today-reward-points/${userData._id}`,
//           { headers: { Authorization: `Bearer ${token}` } });
//         setPointsEarned(res.data?.points || 0);
//       } catch (err) { console.error(err); }
//     };
//     getPoints();
//   }, [canScratch, scratchType, userData?._id, token]);

//   const handleScratchComplete = async () => {
//     if (userData?.isActivate === 'inactive' || userData?.isActivate === 'reject') return;
//     try {
//       const endpoint = scratchType === "referral" ? "claim-referral-coupon" : "claim-daily-points";
//       const res = await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/${endpoint}`,
//         { userId: userData._id }, { headers: { Authorization: `Bearer ${token}` } });
//       if (res.status === 200) {
//         toast.success(`${res.data.points} Points added! ✨`);
//         if (scratchType === "daily") localStorage.setItem(`last_scratch_${userData._id}`, new Date().toISOString());
//         setCanScratch(false); setPointsEarned(0); dispatch(fetchUserData());
//       }
//     } catch (err) { toast.error("Error claiming points."); }
//   };

//   const handleClaimPointsToCash = async () => {
//     if (userData?.isActivate !== 'active') return toast.error("Please activate account first!");
//     if (userData?.pointsBalance < 1000) return toast.warning("Min 1,000 points needed!");
//     try {
//       const res = await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/convert-points`,
//         { userId: userData._id }, { headers: { Authorization: `Bearer ${token}` } });
//       if (res.status === 200) { toast.success(`Converted to cash! 💰`); dispatch(fetchUserData()); }
//     } catch (err) { toast.error("Conversion failed."); }
//   };

//   // --- FREE ACTIVATION ---
//   const handleFreeActivation = async () => {
//     setIsSubmitting(true);
//     const formData = new FormData();
//     formData.append("userId", userData?._id);
//     formData.append("utrNumber", "FREE_ACTIVATION_REQUEST"); 
//     try {
//       await axios.patch(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/payment-proof`, formData, { headers: { Authorization: `Bearer ${token}` } });
//       toast.success("Activation request sent!");
//       dispatch(fetchUserData());
//     } catch (error) { toast.error("Request failed."); }
//     finally { setIsSubmitting(false); }
//   };

//   // --- LEVEL WITHDRAWAL SYSTEM (BACKEND DRIVEN) ---
//   const handleWithdrawClick = () => {
//     if (userData?.walletAmount < currentLevel.amount) {
//       return toast.error(`Low Balance! Need ₹${currentLevel.amount} for Level ${currentLevel.level}`);
//     }
//     setShowModal(true);
//   };

//   const handleProceedToQR = async () => {
//     if (!bankAccountName || !ifscCode) return toast.warning("Enter bank details");
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/payment-config`, { headers: { Authorization: `Bearer ${token}` } });
//       setPaymentConfig(res?.data);
//       setShowModal(false);
//       setShowQR(true);
//     } catch (error) { toast.error("Error fetching payment info"); }
//   };

//   const submitWithdrawalProof = async () => {
//     if (!utrNumber) return toast.warning("Enter UTR Number");
//     setIsSubmitting(true);
//     const formData = new FormData();
//     formData.append("userId", userData?._id);
//     formData.append("utrNumber", utrNumber);
//     formData.append("bankAccount", bankAccountName);
//     formData.append("ifscCode", ifscCode);
//     formData.append("withdrawAmount", currentLevel.amount);
//     formData.append("processingFee", currentLevel.fee);
//     formData.append("currentLevel", currentLevel.level);
//     if (paymentImage) formData.append("paymentImage", paymentImage);

//     try {
//       // Backend should create a withdrawal record and wait for admin approval
//       await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/withdraw-request-instant`, formData, { headers: { Authorization: `Bearer ${token}` } });
//       toast.success("Withdrawal Fee Proof Submitted!");
//       setPaymentModel(false);
//       dispatch(fetchUserData());
//     } catch (error) { toast.error("Error submitting proof."); }
//     finally { setIsSubmitting(false); }
//   };

//   const copyReferral = async () => {
//     const link = `${import.meta.env.VITE_WEBSITE_URL}/signup?ref=${userData.referralCode}`;
//     await navigator.clipboard.writeText(link);
//     setCopied(true); setTimeout(() => setCopied(false), 2000);
//     toast.success("Link Copied!");
//   };

//   const handleInst = () => {
//     const link = `${import.meta.env.VITE_WEBSITE_URL}/signup?ref=${userData.referralCode}`;
//     navigator.clipboard.writeText(`Join and earn rewards: ${link}`).then(() => window.open("https://www.instagram.com/direct/inbox/", "_blank"));
//   };

//   return (
//     <section className="w-full pt-16">
//       <div className="h-[50vh] flex items-center justify-center bg-grid" style={{ backgroundImage: `url(${bgImg})` }}>
//         <h1 className="text-6xl font-bold text-gray-800 tracking-tighter uppercase italic text-center">REFER & EARN</h1>
//       </div>

//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
//         <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
//           <h1 className="text-2xl font-bold text-center mb-4 text-blue-800 tracking-tight">Refer & Earn – Earn 20k Points (₹200) Per Friend! 💰</h1>
//           <p className="text-center text-gray-600 mb-6 text-sm">Join now for FREE! No activation charges. Share link and withdraw level by level. 💸</p>

//           {/* ACTIVATION BUTTON */}
//           {userData?.isActivate === 'active' ? (
//             <button className="w-full bg-green-600 text-white py-3 rounded-lg mb-6 font-black shadow-md uppercase">✓ ACTIVE USER</button>
//           ) : userData?.utrNumber === 'FREE_ACTIVATION_REQUEST' || userData?.paymentImage ? (
//             <button className="w-full bg-yellow-500 text-white py-3 rounded-lg mb-6 font-black shadow-md animate-pulse uppercase">PENDING APPROVAL...</button>
//           ) : (
//             <button onClick={handleFreeActivation} disabled={isSubmitting} className="w-full bg-blue-600 text-white py-3 rounded-lg mb-6 font-black shadow-md hover:bg-blue-700 transition uppercase">
//               {isSubmitting ? "REQUESTING..." : "ACTIVATE & GET LINK (FREE)"}
//             </button>
//           )}

//           <div className="grid grid-cols-3 gap-2 mb-10 text-center">
//             <div className="flex flex-col items-center"><img src={googleImg} className="w-12 h-12 mb-2" alt="1" /><p className="text-[10px]"><strong>1. Login</strong><br />Google Signup</p></div>
//             <div className="flex flex-col items-center"><img src={account} className="w-12 h-12 mb-2" alt="2" /><p className="text-[10px]"><strong>2. Activate</strong><br />Free Request</p></div>
//             <div className="flex flex-col items-center"><img src={share} className="w-12 h-12 mb-2" alt="3" /><p className="text-[10px]"><strong>3. Earn</strong><br />Get Points</p></div>
//           </div>

//           {/* SCRATCH CARD SECTION (SAME AS BEFORE) */}
//           {isWithin30Days && (
//             <div className="w-full bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 p-6 rounded-2xl shadow-xl border-2 border-amber-600 mb-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
//               <div className="text-center md:text-left">
//                 <h2 className="text-amber-900 font-extrabold text-lg uppercase italic">{scratchType === "referral" ? "✨ Referral Reward ✨" : "✨ Daily Lucky Coupon ✨"}</h2>
//                 <p className="text-amber-800 text-xs mb-1 font-semibold">Potential Points: <span className="text-xl font-black text-amber-950">{scratchType === "referral" ? "20,000" : (pointsEarned || "...")}</span></p>
//                 <button onClick={handleClaimPointsToCash} className={`mt-2 px-4 py-2 rounded-lg font-bold shadow-lg transition text-sm ${userData?.isActivate === 'active' && userData?.pointsBalance >= 1000 ? "bg-amber-950 text-white" : "bg-gray-400 text-white cursor-not-allowed"}`}>CLAIM CASH (₹)</button>
//               </div>

//               <div className="bg-white/40 p-2 rounded-xl backdrop-blur-sm border border-white/50 min-w-[280px] flex flex-col items-center justify-center min-h-[160px]">
//                 {userData?.isActivate !== 'active' ? (
//                   <div className="text-center py-6"><span className="text-4xl mb-2 block">🔒</span><p className="text-amber-900 font-black text-[10px] uppercase">Locked</p></div>
//                 ) : canScratch ? (
//                   <ScratchCard width={260} height={130} revealPercent={60} rewardValue={scratchType === "referral" ? "20,000 Points" : `${pointsEarned.toLocaleString()} Points`} onComplete={handleScratchComplete} />
//                 ) : (
//                   <div className="text-center py-6 px-10"><p className="text-amber-900 font-bold text-sm">Next coupon in:</p><div className="bg-amber-900/20 text-amber-900 px-4 py-2 rounded-lg mt-2 font-mono text-2xl font-black">{timeLeft}</div></div>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* WALLET AND LEVEL INFO */}
//           <div className="grid grid-cols-2 gap-px bg-gray-200 border border-gray-200 rounded-xl overflow-hidden mb-8 shadow-sm text-center">
//             <div className="bg-white p-4 border-r border-b"><p className="text-gray-400 text-[10px] uppercase font-bold">Points Balance</p><p className="text-2xl font-black text-amber-600">{userData?.pointsBalance || 0}</p></div>
//             <div className="bg-white p-4 border-b"><p className="text-gray-400 text-[10px] uppercase font-bold">Money Wallet (₹)</p><p className="text-2xl font-black text-blue-600">₹{userData?.walletAmount || 0}</p></div>
//             <div className="bg-white p-4 border-r"><p className="text-gray-400 text-[10px] uppercase font-bold">Current Stage</p><p className="text-xl font-bold text-green-600">Level {currentLevel.level}/8</p></div>
//             <div className="bg-white p-4"><p className="text-gray-400 text-[10px] uppercase font-bold">Next Payout</p><p className="text-xl font-bold text-gray-800">₹{currentLevel.amount}</p></div>
            
//           </div>

//           {(userData?.isActivate === 'active') && (
//             <div className="bg-blue-50 p-4 rounded-xl border border-dashed border-blue-300 mb-6 text-center">
//               <p className="text-[10px] text-blue-400 font-bold uppercase mb-1">Your Referral Link</p>
//               <p className="text-xs font-mono text-blue-700 font-bold break-all mb-1">{import.meta.env.VITE_WEBSITE_URL}/signup?ref={userData.referralCode}</p>
//             </div>
//           )}

//           <div className="flex flex-wrap justify-center gap-4 mb-8">
//             <button disabled={userData?.isActivate !== 'active'} className="flex items-center gap-2 bg-green-500 text-white px-6 py-2 rounded-full font-bold shadow-md text-xs" onClick={() => window.open(`https://wa.me/?text=Earn Rewards: ${import.meta.env.VITE_WEBSITE_URL}/signup?ref=${userData.referralCode}`, "_blank")}>WhatsApp</button>
//             <button disabled={userData?.isActivate !== 'active'} onClick={copyReferral} className="flex items-center gap-2 bg-gray-700 text-white px-6 py-2 rounded-full font-bold shadow-md text-xs uppercase">{copied ? "COPIED!" : "COPY LINK"}</button>
//             <button disabled={userData?.isActivate !== 'active'} onClick={handleInst} className="flex items-center gap-2 bg-pink-500 text-white px-6 py-2 rounded-full font-bold shadow-md text-xs">INSTAGRAM</button>
//           </div>

//           {/* MAIN WITHDRAW BUTTON */}
//           <button onClick={handleWithdrawClick} disabled={userData?.walletAmount < currentLevel.amount} className={`w-full py-4 rounded-2xl font-black text-lg shadow-xl mb-4 transition-all ${userData?.walletAmount >= currentLevel.amount ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}>
//             WITHDRAW ₹{currentLevel.amount} (LEVEL {currentLevel.level})
//           </button>
//           <p className="text-center text-gray-400 font-bold text-[10px] uppercase italic">Processing Fee: ₹{currentLevel.fee} | Total Withdrawn: ₹{userData?.totalAmount || 0}</p>
//         </div>
//       </div>

//       {/* --- LEVEL WITHDRAWAL MODALS --- */}

//       {/* 1. Bank Details Modal */}
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 p-4">
//           <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
//             <h2 className="text-xl font-bold mb-1 text-center">Withdrawal Level {currentLevel.level}</h2>
//             <p className="text-[10px] text-center text-gray-500 mb-4">Payout: ₹{currentLevel.amount} | Fee: ₹{currentLevel.fee}</p>
//             <input type="text" placeholder="Bank Account Number" onChange={(e) => setBankAccountName(e.target.value)} className="w-full border p-3 rounded mb-3 text-sm" />
//             <input type="text" placeholder="IFSC Code" onChange={(e) => setIfscCode(e.target.value)} className="w-full border p-3 rounded mb-6 text-sm" />
//             <div className="flex gap-4">
//               <button onClick={() => setShowModal(false)} className="flex-1 bg-gray-100 py-2 rounded font-bold">Cancel</button>
//               <button onClick={handleProceedToQR} className="flex-1 bg-blue-500 text-white py-2 rounded font-bold">Next</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* 2. QR Code for Fee */}
//       {showQR && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4 text-center">
//           <div className="bg-white rounded-3xl p-8 shadow-2xl w-full max-w-md border-t-8 border-blue-600">
//             <h2 className="text-sm font-black mb-1 uppercase tracking-widest">PAY PROCESSING FEE: ₹{currentLevel.fee}</h2>
//             <div className="flex justify-center my-6"><img src={`${import.meta.env.VITE_APP_API_BASE_URL}${paymentConfig?.imageName}`} alt="QR" className="w-56 h-56 border p-2 rounded-2xl shadow-inner" /></div>
//             <p className="font-mono bg-gray-50 py-2 rounded-lg text-blue-600 font-bold mb-4 text-xs tracking-wider">{paymentConfig?.upiId}</p>
//             <button onClick={() => { setShowQR(false); setPaymentModel(true); }} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold uppercase text-sm">I HAVE PAID — NEXT</button>
//             <button onClick={() => setShowQR(false)} className="mt-4 text-gray-400 font-bold text-[10px] uppercase">Cancel</button>
//           </div>
//         </div>
//       )}

//       {/* 3. Proof Submission */}
//       {paymentModel && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
//           <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
//             <h2 className="text-2xl font-black mb-6 text-center uppercase text-blue-700">SUBMIT PROOF</h2>
//             <input type="text" placeholder="UTR Number" value={utrNumber} onChange={(e) => setUtrNumber(e.target.value)} className="w-full border p-3 rounded-xl mb-4 text-sm" />
//             <p className="text-[10px] text-gray-400 mb-1 ml-1 font-bold">SCREENSHOT:</p>
//             <input type="file" onChange={(e) => {
//               const file = e.target.files[0];
//               setPaymentImage(file);
//               if (file) {
//                 const reader = new FileReader();
//                 reader.onloadend = () => setPreviewImage(reader.result);
//                 reader.readAsDataURL(file);
//               }
//             }} className="w-full mb-4 text-xs" />
//             {previewImage && <img src={previewImage} className="w-full h-32 object-contain rounded-lg mb-4 border" alt="preview" />}
//             <button onClick={submitWithdrawalProof} disabled={isSubmitting} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold uppercase text-sm">
//               {isSubmitting ? "SUBMITTING..." : "SUBMIT FOR REVIEW"}
//             </button>
//             <button onClick={() => setPaymentModel(false)} className="w-full mt-4 text-gray-400 text-center font-bold text-[10px] uppercase">Back</button>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }







// import { useEffect, useState } from "react";
// import bgImg from "../../assets/h1_hero.jpg";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchUserData } from "../Store/userSlice";
// import { toast } from "react-toastify";
// import account from "../../assets/account.png";
// import googleImg from "../../assets/google.png";
// import share from "../../assets/share.png";
// import ScratchCard from "../Home/ScratchCard";

// export default function Apply() {
//   const dispatch = useDispatch();
//   const token = localStorage.getItem("totoToken");
//   const { userData } = useSelector((state) => state.user);

//   // UI States
//   const [copied, setCopied] = useState(false);
//   const [showModal, setShowModal] = useState(false); // Step 1: Bank Details
//   const [showQR, setShowQR] = useState(false);      // Step 2: QR Payment
//   const [paymentModel, setPaymentModel] = useState(false); // Step 3: Proof Submission
  
//   // Form States
//   const [bankAccountName, setBankAccountName] = useState("");
//   const [ifscCode, setIfscCode] = useState("");
//   const [utrNumber, setUtrNumber] = useState("");
//   const [paymentImage, setPaymentImage] = useState(null);
//   const [previewImage, setPreviewImage] = useState(null);
//   const [paymentConfig, setPaymentConfig] = useState();
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // --- 10 LEVELS WITHDRAWAL CONFIG ---
//   const withdrawalLevels = [
//     { level: 1, amount: 50, fee: 25 },
//     { level: 2, amount: 500, fee: 250 },
//     { level: 3, amount: 2000, fee: 1000 },
//     { level: 4, amount: 5000, fee: 2500 },
//     { level: 5, amount: 10000, fee: 5000 },
//     { level: 6, amount: 20000, fee: 10000 },
//     { level: 7, amount: 50000, fee: 25000 },
//     { level: 8, amount: 100000, fee: 50000 },
//     { level: 9, amount: 200000, fee: 100000 },
//     { level: 10, amount: 500000, fee: 250000 },
//   ];

//   // Logic to handle 1-10 cycle from backend 'withdrawalStage'
//   const currentLevelIndex = ((userData?.withdrawalStage || 1) - 1) % 10;
//   const currentLevel = withdrawalLevels[currentLevelIndex];

//   // --- Rewards & Scratch States (UNCHANGED) ---
//   const [canScratch, setCanScratch] = useState(false);
//   const [isWithin30Days, setIsWithin30Days] = useState(false);
//   const [timeLeft, setTimeLeft] = useState("");
//   const [pointsEarned, setPointsEarned] = useState(0);
//   const [scratchType, setScratchType] = useState("");

//   useEffect(() => {
//     dispatch(fetchUserData());
//   }, [dispatch]);

//   // --- Scratch Card Timer Logic (UNCHANGED) ---
//   useEffect(() => {
//     if (userData) {
//       const signupDate = new Date(userData.createdAt);
//       const now = new Date();
//       const diffDays = Math.ceil((now - signupDate) / (1000 * 60 * 60 * 24));
//       setIsWithin30Days(diffDays <= 30);

//       const checkTimer = () => {
//         if (userData?.isActivate === 'inactive' || userData?.isActivate === 'reject') {
//           setCanScratch(false);
//           return;
//         }
//         if (userData.scratchCardsBalance > 0) {
//           setCanScratch(true);
//           setScratchType("referral");
//           setPointsEarned(20000);
//           return;
//         }
//         const lastScratch = localStorage.getItem(`last_scratch_${userData._id}`);
//         if (lastScratch) {
//           const lastTime = new Date(lastScratch).getTime();
//           const distance = (24 * 60 * 60 * 1000) - (new Date().getTime() - lastTime);
//           if (distance > 0) {
//             setCanScratch(false);
//             const h = Math.floor(distance / (1000 * 60 * 60));
//             const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//             setTimeLeft(`${h}h ${m}m`);
//           } else { setCanScratch(true); setScratchType("daily"); }
//         } else { setCanScratch(true); setScratchType("daily"); }
//       };
//       checkTimer();
//       const interval = setInterval(checkTimer, 60000);
//       return () => clearInterval(interval);
//     }
//   }, [userData]);

//   useEffect(() => {
//     if (!canScratch || scratchType !== "daily" || !userData?._id || !token) return;
//     const getPoints = async () => {
//       try {
//         const res = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/today-reward-points/${userData._id}`,
//           { headers: { Authorization: `Bearer ${token}` } });
//         setPointsEarned(res.data?.points || 0);
//       } catch (err) { console.error(err); }
//     };
//     getPoints();
//   }, [canScratch, scratchType, userData?._id, token]);

//   const handleScratchComplete = async () => {
//     if (userData?.isActivate === 'inactive' || userData?.isActivate === 'reject') return;
//     try {
//       const endpoint = scratchType === "referral" ? "claim-referral-coupon" : "claim-daily-points";
//       const res = await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/${endpoint}`,
//         { userId: userData._id }, { headers: { Authorization: `Bearer ${token}` } });
//       if (res.status === 200) {
//         toast.success(`${res.data.points} Points added! ✨`);
//         if (scratchType === "daily") localStorage.setItem(`last_scratch_${userData._id}`, new Date().toISOString());
//         setCanScratch(false); setPointsEarned(0); dispatch(fetchUserData());
//       }
//     } catch (err) { toast.error("Error claiming points."); }
//   };

//   const handleClaimPointsToCash = async () => {
//     if (userData?.isActivate !== 'active') return toast.error("Please activate account first!");
//     if (userData?.pointsBalance < 1000) return toast.warning("Min 1,000 points needed!");
//     try {
//       const res = await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/convert-points`,
//         { userId: userData._id }, { headers: { Authorization: `Bearer ${token}` } });
//       if (res.status === 200) { toast.success(`Converted to cash! 💰`); dispatch(fetchUserData()); }
//     } catch (err) { toast.error("Conversion failed."); }
//   };

//   // --- FREE ACTIVATION ---
//   const handleFreeActivation = async () => {
//     setIsSubmitting(true);
//     const formData = new FormData();
//     formData.append("userId", userData?._id);
//     formData.append("utrNumber", "FREE_ACTIVATION_REQUEST"); 
//     try {
//       await axios.patch(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/payment-proof`, formData, { headers: { Authorization: `Bearer ${token}` } });
//       toast.success("Activation request sent!");
//       dispatch(fetchUserData());
//     } catch (error) { toast.error("Request failed."); }
//     finally { setIsSubmitting(false); }
//   };

//   // --- LEVEL WITHDRAWAL SYSTEM ---
//   const handleWithdrawClick = () => {
//     if (userData?.walletAmount < currentLevel.amount) {
//       return toast.error(`Low Balance! Need ₹${currentLevel.amount} for Level ${currentLevel.level}`);
//     }
//     setShowModal(true);
//   };

//   const handleProceedToQR = async () => {
//     if (!bankAccountName || !ifscCode) return toast.warning("Enter bank details");
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/payment-config`, { headers: { Authorization: `Bearer ${token}` } });
//       setPaymentConfig(res?.data);
//       setShowModal(false);
//       setShowQR(true);
//     } catch (error) { toast.error("Error fetching payment info"); }
//   };

//   const submitWithdrawalProof = async () => {
//     if (!utrNumber) return toast.warning("Enter UTR Number");
//     setIsSubmitting(true);
//     const formData = new FormData();
//     formData.append("userId", userData?._id);
//     formData.append("utrNumber", utrNumber);
//     formData.append("bankAccount", bankAccountName);
//     formData.append("ifscCode", ifscCode);
//     formData.append("withdrawAmount", currentLevel.amount);
//     formData.append("processingFee", currentLevel.fee);
//     // formData.append("currentLevel", currentLevel.level);
//      formData.append("level", currentLevel.level);
//     if (paymentImage) formData.append("paymentImage", paymentImage);

//     try {
//       // Backend should create a withdrawal record and wait for admin approval
//       await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/withdraw-request`, formData, { headers: { Authorization: `Bearer ${token}` } });
//       toast.success("Withdrawal Fee Proof Submitted!");
//       setPaymentModel(false);
//       dispatch(fetchUserData());
//     } catch (error) { toast.error("Error submitting proof."); }
//     finally { setIsSubmitting(false); }
//   };

//   const copyReferral = async () => {
//     const link = `${import.meta.env.VITE_WEBSITE_URL}/signup?ref=${userData.referralCode}`;
//     await navigator.clipboard.writeText(link);
//     setCopied(true); setTimeout(() => setCopied(false), 2000);
//     toast.success("Link Copied!");
//   };

//   const handleInst = () => {
//     const link = `${import.meta.env.VITE_WEBSITE_URL}/signup?ref=${userData.referralCode}`;
//     navigator.clipboard.writeText(`Join and earn rewards: ${link}`).then(() => window.open("https://www.instagram.com/direct/inbox/", "_blank"));
//   };

//   return (
//     <section className="w-full pt-16">
//       <div className="h-[50vh] flex items-center justify-center bg-grid" style={{ backgroundImage: `url(${bgImg})` }}>
//         <h1 className="text-6xl font-bold text-gray-800 tracking-tighter uppercase italic text-center">REFER & EARN</h1>
//       </div>

//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
//         <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
//           <h1 className="text-2xl font-bold text-center mb-4 text-blue-800 tracking-tight">Refer & Earn – Earn 20k Points (₹200) Per Friend! 💰</h1>
//           <p className="text-center text-gray-600 mb-6 text-sm">Join now for FREE! No activation charges. Share link and withdraw level by level. 💸</p>

//           {/* ACTIVATION BUTTON */}
//           {userData?.isActivate === 'active' ? (
//             <button className="w-full bg-green-600 text-white py-3 rounded-lg mb-6 font-black shadow-md uppercase">✓ ACTIVE USER</button>
//           ) : userData?.utrNumber === 'FREE_ACTIVATION_REQUEST' || userData?.paymentImage ? (
//             <button className="w-full bg-yellow-500 text-white py-3 rounded-lg mb-6 font-black shadow-md animate-pulse uppercase">PENDING APPROVAL...</button>
//           ) : (
//             <button onClick={handleFreeActivation} disabled={isSubmitting} className="w-full bg-blue-600 text-white py-3 rounded-lg mb-6 font-black shadow-md hover:bg-blue-700 transition uppercase">
//               {isSubmitting ? "REQUESTING..." : "ACTIVATE & GET LINK (FREE)"}
//             </button>
//           )}

//           <div className="grid grid-cols-3 gap-2 mb-10 text-center">
//             <div className="flex flex-col items-center"><img src={googleImg} className="w-12 h-12 mb-2" alt="1" /><p className="text-[10px]"><strong>1. Login</strong><br />Google Signup</p></div>
//             <div className="flex flex-col items-center"><img src={account} className="w-12 h-12 mb-2" alt="2" /><p className="text-[10px]"><strong>2. Activate</strong><br />Free Request</p></div>
//             <div className="flex flex-col items-center"><img src={share} className="w-12 h-12 mb-2" alt="3" /><p className="text-[10px]"><strong>3. Earn</strong><br />Get Points</p></div>
//           </div>

//           {/* SCRATCH CARD SECTION */}
//           {isWithin30Days && (
//             <div className="w-full bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 p-6 rounded-2xl shadow-xl border-2 border-amber-600 mb-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
//               <div className="text-center md:text-left">
//                 <h2 className="text-amber-900 font-extrabold text-lg uppercase italic">{scratchType === "referral" ? "✨ Referral Reward ✨" : "✨ Daily Lucky Coupon ✨"}</h2>
//                 <p className="text-amber-800 text-xs mb-1 font-semibold">Potential Points: <span className="text-xl font-black text-amber-950">{scratchType === "referral" ? "20,000" : (pointsEarned || "...")}</span></p>
//                 <button onClick={handleClaimPointsToCash} className={`mt-2 px-4 py-2 rounded-lg font-bold shadow-lg transition text-sm ${userData?.isActivate === 'active' && userData?.pointsBalance >= 1000 ? "bg-amber-950 text-white hover:bg-black" : "bg-gray-400 text-gray-200 cursor-not-allowed"}`}>CLAIM CASH (₹)</button>
//               </div>

//               <div className="bg-white/40 p-2 rounded-xl backdrop-blur-sm border border-white/50 min-w-[280px] flex flex-col items-center justify-center min-h-[160px]">
//                 {userData?.isActivate !== 'active' ? (
//                   <div className="text-center py-6"><span className="text-4xl mb-2 block">🔒</span><p className="text-amber-900 font-black text-[10px] uppercase">Locked</p></div>
//                 ) : canScratch ? (
//                   <ScratchCard width={260} height={130} revealPercent={60} rewardValue={scratchType === "referral" ? "20,000 Points" : `${pointsEarned.toLocaleString()} Points`} onComplete={handleScratchComplete} />
//                 ) : (
//                   <div className="text-center py-6 px-10"><p className="text-amber-900 font-bold text-sm">Next coupon in:</p><div className="bg-amber-900/20 text-amber-900 px-4 py-2 rounded-lg mt-2 font-mono text-2xl font-black">{timeLeft}</div></div>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* WALLET AND LEVEL INFO */}
//           <div className="grid grid-cols-2 gap-px bg-gray-200 border border-gray-200 rounded-xl overflow-hidden mb-8 shadow-sm text-center">
//             <div className="bg-white p-4 border-r border-b"><p className="text-gray-400 text-[10px] uppercase font-bold">Points Balance</p><p className="text-2xl font-black text-amber-600">{userData?.pointsBalance || 0}</p></div>
//             <div className="bg-white p-4 border-b"><p className="text-gray-400 text-[10px] uppercase font-bold">Money Wallet (₹)</p><p className="text-2xl font-black text-blue-600">₹{userData?.walletAmount || 0}</p></div>
//             <div className="bg-white p-4 border-r"><p className="text-gray-400 text-[10px] uppercase font-bold">Current Stage</p><p className="text-xl font-bold text-green-600">Level {currentLevel.level}/10</p></div>
//             <div className="bg-white p-4"><p className="text-gray-400 text-[10px] uppercase font-bold">Next Payout</p><p className="text-xl font-bold text-gray-800">₹{currentLevel.amount.toLocaleString()}</p></div>
//           </div>

//           {(userData?.isActivate === 'active') && (
//             <div className="bg-blue-50 p-4 rounded-xl border border-dashed border-blue-300 mb-6 text-center">
//               <p className="text-[10px] text-blue-400 font-bold uppercase mb-1">Your Referral Link</p>
//               <p className="text-xs font-mono text-blue-700 font-bold break-all mb-1">{import.meta.env.VITE_WEBSITE_URL}/signup?ref={userData.referralCode}</p>
//             </div>
//           )}

//           <div className="flex flex-wrap justify-center gap-4 mb-8">
//             <button disabled={userData?.isActivate !== 'active'} className="flex items-center gap-2 bg-green-500 text-white px-6 py-2 rounded-full font-bold shadow-md text-xs" onClick={() => window.open(`https://wa.me/?text=Earn Rewards: ${import.meta.env.VITE_WEBSITE_URL}/signup?ref=${userData.referralCode}`, "_blank")}>WhatsApp</button>
//             <button disabled={userData?.isActivate !== 'active'} onClick={copyReferral} className="flex items-center gap-2 bg-gray-700 text-white px-6 py-2 rounded-full font-bold shadow-md text-xs uppercase">{copied ? "COPIED!" : "COPY LINK"}</button>
//             <button disabled={userData?.isActivate !== 'active'} onClick={handleInst} className="flex items-center gap-2 bg-pink-500 text-white px-6 py-2 rounded-full font-bold shadow-md text-xs">INSTAGRAM</button>
//           </div>

//           {/* MAIN WITHDRAW BUTTON */}
//           <button onClick={handleWithdrawClick} disabled={userData?.walletAmount < currentLevel.amount} className={`w-full py-4 rounded-2xl font-black text-lg shadow-xl mb-4 transition-all transform active:scale-95 ${userData?.walletAmount >= currentLevel.amount ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}>
//             WITHDRAW ₹{currentLevel.amount.toLocaleString()} (LEVEL {currentLevel.level})
//           </button>
//           <p className="text-center text-gray-400 font-bold text-[10px] uppercase italic">Processing Fee: ₹{currentLevel.fee.toLocaleString()} | Total Withdrawn: ₹{userData?.totalAmount || 0}</p>
//         </div>
//       </div>

//       {/* --- LEVEL WITHDRAWAL MODALS --- */}

//       {/* 1. Bank Details Modal */}
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 p-4">
//           <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
//             <h2 className="text-xl font-bold mb-1 text-center">Withdrawal Level {currentLevel.level}</h2>
//             <p className="text-[10px] text-center text-gray-500 mb-4">Payout: ₹{currentLevel.amount.toLocaleString()} | Fee: ₹{currentLevel.fee.toLocaleString()}</p>
//             <input type="text" placeholder="Bank Account Number" onChange={(e) => setBankAccountName(e.target.value)} className="w-full border p-3 rounded mb-3 text-sm" />
//             <input type="text" placeholder="IFSC Code" onChange={(e) => setIfscCode(e.target.value)} className="w-full border p-3 rounded mb-6 text-sm" />
//             <div className="flex gap-4">
//               <button onClick={() => setShowModal(false)} className="flex-1 bg-gray-100 py-2 rounded font-bold">Cancel</button>
//               <button onClick={handleProceedToQR} className="flex-1 bg-blue-500 text-white py-2 rounded font-bold">Next</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* 2. QR Code for Fee */}
//       {showQR && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4 text-center">
//           <div className="bg-white rounded-3xl p-8 shadow-2xl w-full max-w-md border-t-8 border-blue-600">
//             <h2 className="text-sm font-black mb-1 uppercase tracking-widest">PAY PROCESSING FEE: ₹{currentLevel.fee.toLocaleString()}</h2>
//             <div className="flex justify-center my-6"><img src={`${import.meta.env.VITE_APP_API_BASE_URL}${paymentConfig?.imageName}`} alt="QR" className="w-56 h-56 border p-2 rounded-2xl shadow-inner" /></div>
//             <p className="font-mono bg-gray-50 py-2 rounded-lg text-blue-600 font-bold mb-4 text-xs tracking-wider">{paymentConfig?.upiId}</p>
//             <button onClick={() => { setShowQR(false); setPaymentModel(true); }} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold uppercase text-sm">I HAVE PAID — NEXT</button>
//             <button onClick={() => setShowQR(false)} className="mt-4 text-gray-400 font-bold text-[10px] uppercase">Cancel</button>
//           </div>
//         </div>
//       )}

//       {/* 3. Proof Submission */}
//       {paymentModel && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
//           <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
//             <h2 className="text-2xl font-black mb-6 text-center uppercase text-blue-700">SUBMIT PROOF</h2>
//             <input type="text" placeholder="UTR Number" value={utrNumber} onChange={(e) => setUtrNumber(e.target.value)} className="w-full border p-3 rounded-xl mb-4 text-sm" />
//             <p className="text-[10px] text-gray-400 mb-1 ml-1 font-bold">SCREENSHOT:</p>
//             <input type="file" onChange={(e) => {
//               const file = e.target.files[0];
//               setPaymentImage(file);
//               if (file) {
//                 const reader = new FileReader();
//                 reader.onloadend = () => setPreviewImage(reader.result);
//                 reader.readAsDataURL(file);
//               }
//             }} className="w-full mb-4 text-xs" />
//             {previewImage && <img src={previewImage} className="w-full h-32 object-contain rounded-lg mb-4 border" alt="preview" />}
//             <button onClick={submitWithdrawalProof} disabled={isSubmitting} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold uppercase text-sm">
//               {isSubmitting ? "SUBMITTING..." : "SUBMIT FOR REVIEW"}
//             </button>
//             <button onClick={() => setPaymentModel(false)} className="w-full mt-4 text-gray-400 text-center font-bold text-[10px] uppercase">Back</button>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }




// import { useEffect, useState } from "react";
// import bgImg from "../../assets/h1_hero.jpg";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchUserData } from "../Store/userSlice";
// import { toast } from "react-toastify";
// import account from "../../assets/account.png";
// import googleImg from "../../assets/google.png";
// import share from "../../assets/share.png";
// import ScratchCard from "../Home/ScratchCard";

// export default function Apply() {
//   const dispatch = useDispatch();
//   const token = localStorage.getItem("totoToken");
//   const { userData } = useSelector((state) => state.user);

//   // UI States
//   const [copied, setCopied] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [showQR, setShowQR] = useState(false);
//   const [paymentModel, setPaymentModel] = useState(false);
  
//   // Withdrawal Status State
//   const [lastWithdrawal, setLastWithdrawal] = useState(null);

//   // Form States
//   const [bankAccountName, setBankAccountName] = useState("");
//   const [ifscCode, setIfscCode] = useState("");
//   const [utrNumber, setUtrNumber] = useState("");
//   const [paymentImage, setPaymentImage] = useState(null);
//   const [previewImage, setPreviewImage] = useState(null);
//   const [paymentConfig, setPaymentConfig] = useState();
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // --- 10 LEVELS WITHDRAWAL CONFIG ---
//   const withdrawalLevels = [
//     { level: 1, amount: 50, fee: 25 },
//     { level: 2, amount: 500, fee: 250 },
//     { level: 3, amount: 2000, fee: 1000 },
//     { level: 4, amount: 5000, fee: 2500 },
//     { level: 5, amount: 10000, fee: 5000 },
//     { level: 6, amount: 20000, fee: 10000 },
//     { level: 7, amount: 50000, fee: 25000 },
//     { level: 8, amount: 100000, fee: 50000 },
//     { level: 9, amount: 200000, fee: 100000 },
//     { level: 10, amount: 500000, fee: 250000 },
//   ];

//   const currentLevelIndex = ((userData?.withdrawalStage || 1) - 1) % 10;
//   const currentLevel = withdrawalLevels[currentLevelIndex];

//   useEffect(() => {
//     dispatch(fetchUserData());
//     fetchLastWithdrawalStatus();
//   }, [dispatch]);

//   // Naya Function Status Fetch karne ke liye
//   const fetchLastWithdrawalStatus = async () => {
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/my-last-withdrawal`, 
//       { headers: { Authorization: `Bearer ${token}` } });
//       setLastWithdrawal(res.data?.data);
//     } catch (err) { console.error("Status fetch error", err); }
//   };

//   // --- Scratch Card Timer Logic (UNCHANGED) ---
//   const [canScratch, setCanScratch] = useState(false);
//   const [isWithin30Days, setIsWithin30Days] = useState(false);
//   const [timeLeft, setTimeLeft] = useState("");
//   const [pointsEarned, setPointsEarned] = useState(0);
//   const [scratchType, setScratchType] = useState("");

//   useEffect(() => {
//     if (userData) {
//       const signupDate = new Date(userData.createdAt);
//       const now = new Date();
//       const diffDays = Math.ceil((now - signupDate) / (1000 * 60 * 60 * 24));
//       setIsWithin30Days(diffDays <= 30);

//       const checkTimer = () => {
//         if (userData?.isActivate === 'inactive' || userData?.isActivate === 'reject') {
//           setCanScratch(false);
//           return;
//         }
//         if (userData.scratchCardsBalance > 0) {
//           setCanScratch(true);
//           setScratchType("referral");
//           setPointsEarned(20000);
//           return;
//         }
//         const lastScratch = localStorage.getItem(`last_scratch_${userData._id}`);
//         if (lastScratch) {
//           const lastTime = new Date(lastScratch).getTime();
//           const distance = (24 * 60 * 60 * 1000) - (new Date().getTime() - lastTime);
//           if (distance > 0) {
//             setCanScratch(false);
//             const h = Math.floor(distance / (1000 * 60 * 60));
//             const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//             setTimeLeft(`${h}h ${m}m`);
//           } else { setCanScratch(true); setScratchType("daily"); }
//         } else { setCanScratch(true); setScratchType("daily"); }
//       };
//       checkTimer();
//       const interval = setInterval(checkTimer, 60000);
//       return () => clearInterval(interval);
//     }
//   }, [userData]);

//   useEffect(() => {
//     if (!canScratch || scratchType !== "daily" || !userData?._id || !token) return;
//     const getPoints = async () => {
//       try {
//         const res = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/today-reward-points/${userData._id}`,
//           { headers: { Authorization: `Bearer ${token}` } });
//         setPointsEarned(res.data?.points || 0);
//       } catch (err) { console.error(err); }
//     };
//     getPoints();
//   }, [canScratch, scratchType, userData?._id, token]);

//   const handleScratchComplete = async () => {
//     if (userData?.isActivate === 'inactive' || userData?.isActivate === 'reject') return;
//     try {
//       const endpoint = scratchType === "referral" ? "claim-referral-coupon" : "claim-daily-points";
//       const res = await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/${endpoint}`,
//         { userId: userData._id }, { headers: { Authorization: `Bearer ${token}` } });
//       if (res.status === 200) {
//         toast.success(`${res.data.points} Points added! ✨`);
//         if (scratchType === "daily") localStorage.setItem(`last_scratch_${userData._id}`, new Date().toISOString());
//         setCanScratch(false); setPointsEarned(0); dispatch(fetchUserData());
//       }
//     } catch (err) { toast.error("Error claiming points."); }
//   };

//   const handleClaimPointsToCash = async () => {
//     if (userData?.isActivate !== 'active') return toast.error("Please activate account first!");
//     if (userData?.pointsBalance < 1000) return toast.warning("Min 1,000 points needed!");
//     try {
//       const res = await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/convert-points`,
//         { userId: userData._id }, { headers: { Authorization: `Bearer ${token}` } });
//       if (res.status === 200) { toast.success(`Converted to cash! 💰`); dispatch(fetchUserData()); }
//     } catch (err) { toast.error("Conversion failed."); }
//   };

//   const handleFreeActivation = async () => {
//     setIsSubmitting(true);
//     const formData = new FormData();
//     formData.append("userId", userData?._id);
//     formData.append("utrNumber", "FREE_ACTIVATION_REQUEST"); 
//     try {
//       await axios.patch(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/payment-proof`, formData, { headers: { Authorization: `Bearer ${token}` } });
//       toast.success("Activation request sent!");
//       dispatch(fetchUserData());
//     } catch (error) { toast.error("Request failed."); }
//     finally { setIsSubmitting(false); }
//   };

//   const handleWithdrawClick = () => {
//     if (userData?.walletAmount < currentLevel.amount) {
//       return toast.error(`Low Balance! Need ₹${currentLevel.amount} for Level ${currentLevel.level}`);
//     }
//     setShowModal(true);
//   };

//   const handleProceedToQR = async () => {
//     if (!bankAccountName || !ifscCode) return toast.warning("Enter bank details");
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/payment-config`, { headers: { Authorization: `Bearer ${token}` } });
//       setPaymentConfig(res?.data);
//       setShowModal(false);
//       setShowQR(true);
//     } catch (error) { toast.error("Error fetching payment info"); }
//   };

//   const submitWithdrawalProof = async () => {
//     if (!utrNumber) return toast.warning("Enter UTR Number");
//     setIsSubmitting(true);
//     const formData = new FormData();
//     formData.append("userId", userData?._id);
//     formData.append("utrNumber", utrNumber);
//     formData.append("bankAccount", bankAccountName);
//     formData.append("ifscCode", ifscCode);
//     formData.append("level", currentLevel.level);
//     if (paymentImage) formData.append("paymentImage", paymentImage);

//     try {
//       await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/withdraw-request`, formData, { headers: { Authorization: `Bearer ${token}` } });
//       toast.success("Withdrawal Request Submitted!");
//       setPaymentModel(false);
//       fetchLastWithdrawalStatus(); // Refresh status
//       dispatch(fetchUserData());
//     } catch (error) { toast.error("Error submitting proof."); }
//     finally { setIsSubmitting(false); }
//   };

//   const copyReferral = async () => {
//     const link = `${import.meta.env.VITE_WEBSITE_URL}/signup?ref=${userData.referralCode}`;
//     await navigator.clipboard.writeText(link);
//     setCopied(true); setTimeout(() => setCopied(false), 2000);
//     toast.success("Link Copied!");
//   };

//   const handleInst = () => {
//     const link = `${import.meta.env.VITE_WEBSITE_URL}/signup?ref=${userData.referralCode}`;
//     navigator.clipboard.writeText(`Join and earn rewards: ${link}`).then(() => window.open("https://www.instagram.com/direct/inbox/", "_blank"));
//   };

//   return (
//     <section className="w-full pt-16">
//       <div className="h-[50vh] flex items-center justify-center bg-grid" style={{ backgroundImage: `url(${bgImg})` }}>
//         <h1 className="text-6xl font-bold text-gray-800 tracking-tighter uppercase italic text-center">REFER & EARN</h1>
//       </div>

//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
//         <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
//           <h1 className="text-2xl font-bold text-center mb-4 text-blue-800 tracking-tight">Refer & Earn – Earn 20k Points (₹200) Per Friend! 💰</h1>
//           <p className="text-center text-gray-600 mb-6 text-sm">Join now for FREE! No activation charges. Share link and withdraw level by level. 💸</p>

//           {/* ACTIVATION BUTTON */}
//           {userData?.isActivate === 'active' ? (
//             <button className="w-full bg-green-600 text-white py-3 rounded-lg mb-6 font-black shadow-md uppercase">✓ ACTIVE USER</button>
//           ) : userData?.utrNumber === 'FREE_ACTIVATION_REQUEST' || userData?.paymentImage ? (
//             <button className="w-full bg-yellow-500 text-white py-3 rounded-lg mb-6 font-black shadow-md animate-pulse uppercase">PENDING ACTIVATION...</button>
//           ) : (
//             <button onClick={handleFreeActivation} disabled={isSubmitting} className="w-full bg-blue-600 text-white py-3 rounded-lg mb-6 font-black shadow-md hover:bg-blue-700 transition uppercase">
//               {isSubmitting ? "REQUESTING..." : "ACTIVATE & GET LINK (FREE)"}
//             </button>
//           )}

//           <div className="grid grid-cols-3 gap-2 mb-10 text-center">
//             <div className="flex flex-col items-center"><img src={googleImg} className="w-12 h-12 mb-2" alt="1" /><p className="text-[10px]"><strong>1. Login</strong><br />Google Signup</p></div>
//             <div className="flex flex-col items-center"><img src={account} className="w-12 h-12 mb-2" alt="2" /><p className="text-[10px]"><strong>2. Activate</strong><br />Free Request</p></div>
//             <div className="flex flex-col items-center"><img src={share} className="w-12 h-12 mb-2" alt="3" /><p className="text-[10px]"><strong>3. Earn</strong><br />Get Points</p></div>
//           </div>

//           {/* SCRATCH CARD SECTION */}
//           {isWithin30Days && (
//             <div className="w-full bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 p-6 rounded-2xl shadow-xl border-2 border-amber-600 mb-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
//               <div className="text-center md:text-left">
//                 <h2 className="text-amber-900 font-extrabold text-lg uppercase italic">{scratchType === "referral" ? "✨ Referral Reward ✨" : "✨ Daily Lucky Coupon ✨"}</h2>
//                 <p className="text-amber-800 text-xs mb-1 font-semibold">Potential Points: <span className="text-xl font-black text-amber-950">{scratchType === "referral" ? "20,000" : (pointsEarned || "...")}</span></p>
//                 <button onClick={handleClaimPointsToCash} className={`mt-2 px-4 py-2 rounded-lg font-bold shadow-lg transition text-sm ${userData?.isActivate === 'active' && userData?.pointsBalance >= 1000 ? "bg-amber-950 text-white hover:bg-black" : "bg-gray-400 text-gray-200 cursor-not-allowed"}`}>CLAIM CASH (₹)</button>
//               </div>

//               <div className="bg-white/40 p-2 rounded-xl backdrop-blur-sm border border-white/50 min-w-[280px] flex flex-col items-center justify-center min-h-[160px]">
//                 {userData?.isActivate !== 'active' ? (
//                   <div className="text-center py-6"><span className="text-4xl mb-2 block">🔒</span><p className="text-amber-900 font-black text-[10px] uppercase">Locked</p></div>
//                 ) : canScratch ? (
//                   <ScratchCard width={260} height={130} revealPercent={60} rewardValue={scratchType === "referral" ? "20,000 Points" : `${pointsEarned.toLocaleString()} Points`} onComplete={handleScratchComplete} />
//                 ) : (
//                   <div className="text-center py-6 px-10"><p className="text-amber-900 font-bold text-sm">Next coupon in:</p><div className="bg-amber-900/20 text-amber-900 px-4 py-2 rounded-lg mt-2 font-mono text-2xl font-black">{timeLeft}</div></div>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* WALLET AND LEVEL INFO */}
//           <div className="grid grid-cols-2 gap-px bg-gray-200 border border-gray-200 rounded-xl overflow-hidden mb-8 shadow-sm text-center">
//             <div className="bg-white p-4 border-r border-b"><p className="text-[10px] text-amber-500 font-black uppercase tracking-widest mb-2">Points Balance</p><p className="text-6xl font-black text-amber-600 tracking-tighter">{userData?.pointsBalance || 0}</p></div>
//             <div className="bg-white p-4 border-b"><p className="text-[10px] text-blue-400 font-black uppercase tracking-widest mb-2">Money Wallet (₹)</p><p className="text-6xl font-black text-blue-800 tracking-tighter">₹{userData?.walletAmount || 0}</p></div>
//             <div className="bg-white p-4 border-r"><p className="text-gray-400 text-[10px] uppercase font-bold">Current Stage</p><p className="text-xl font-bold text-green-600">Level {currentLevel.level}/10</p></div>
//             <div className="bg-white p-4"><p className="text-gray-400 text-[10px] uppercase font-bold">Next Payout</p><p className="text-xl font-bold text-gray-800">₹{currentLevel.amount.toLocaleString()}</p></div>
//           </div>

//           <div className="flex flex-wrap justify-center gap-4 mb-8 mt-6">
//             <button disabled={userData?.isActivate !== 'active'} className="flex items-center gap-2 bg-green-500 text-white px-6 py-2 rounded-full font-bold shadow-md text-xs" onClick={() => window.open(`https://wa.me/?text=Earn Rewards: ${import.meta.env.VITE_WEBSITE_URL}/signup?ref=${userData.referralCode}`, "_blank")}>WhatsApp</button>
//             <button disabled={userData?.isActivate !== 'active'} onClick={copyReferral} className="flex items-center gap-2 bg-gray-700 text-white px-6 py-2 rounded-full font-bold shadow-md text-xs uppercase">{copied ? "COPIED!" : "COPY LINK"}</button>
//             <button disabled={userData?.isActivate !== 'active'} onClick={handleInst} className="flex items-center gap-2 bg-pink-500 text-white px-6 py-2 rounded-full font-bold shadow-md text-xs">INSTAGRAM</button>
//           </div>

//           {/* --- MAIN WITHDRAW BUTTON WITH STATUS --- */}
//           {lastWithdrawal?.status === 'pending' && lastWithdrawal?.level === currentLevel.level ? (
//             <div className="w-full bg-yellow-100 border border-yellow-400 text-yellow-700 p-4 rounded-2xl text-center mb-4">
//               <p className="font-black text-lg uppercase animate-pulse">⏳ PENDING APPROVAL (Lvl {currentLevel.level})</p>
//               <p className="text-[10px] font-bold">Admin is reviewing your fee proof. Please wait.</p>
//             </div>
//           ) : lastWithdrawal?.status === 'rejected' && lastWithdrawal?.level === currentLevel.level ? (
//             <div className="flex flex-col gap-2 mb-4">
//               <div className="w-full bg-red-100 border border-red-400 text-red-700 p-3 rounded-xl text-center">
//                 <p className="font-black text-xs uppercase">❌ PREVIOUS REQUEST REJECTED</p>
//                 <p className="text-[9px]">Check your UTR or Screenshot and try again.</p>
//               </div>
//               <button onClick={handleWithdrawClick} className="w-full py-4 rounded-2xl font-black text-lg shadow-xl bg-blue-600 text-white hover:bg-blue-700">
//                 RETRY WITHDRAW ₹{currentLevel.amount.toLocaleString()}
//               </button>
//             </div>
//           ) : (
//             <button 
//               onClick={handleWithdrawClick} 
//               disabled={userData?.walletAmount < currentLevel.amount || userData?.isActivate !== 'active'} 
//               className={`w-full py-4 rounded-2xl font-black text-lg shadow-xl mb-4 transition-all transform active:scale-95 ${userData?.walletAmount >= currentLevel.amount ? "bg-yellow-500 text-black hover:bg-yellow-600" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
//             >
//               WITHDRAW ₹{currentLevel.amount.toLocaleString()} (LEVEL {currentLevel.level})
//             </button>
//           )}

//           <p className="text-center text-gray-400 font-bold text-[10px] uppercase italic">Processing Fee: ₹{currentLevel.fee.toLocaleString()} | Total Withdrawn: ₹{userData?.totalAmount || 0}</p>
//         </div>
//       </div>

//       {/* --- MODALS (SAME) --- */}
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 p-4">
//           <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
//             <h2 className="text-xl font-bold mb-1 text-center">Withdrawal Level {currentLevel.level}</h2>
//             <p className="text-[10px] text-center text-gray-500 mb-4">Payout: ₹{currentLevel.amount.toLocaleString()} | Fee: ₹{currentLevel.fee.toLocaleString()}</p>
//             <input type="text" placeholder="Bank Account Number" onChange={(e) => setBankAccountName(e.target.value)} className="w-full border p-3 rounded mb-3 text-sm" />
//             <input type="text" placeholder="IFSC Code" onChange={(e) => setIfscCode(e.target.value)} className="w-full border p-3 rounded mb-6 text-sm" />
//             <div className="flex gap-4">
//               <button onClick={() => setShowModal(false)} className="flex-1 bg-gray-100 py-2 rounded font-bold">Cancel</button>
//               <button onClick={handleProceedToQR} className="flex-1 bg-blue-500 text-white py-2 rounded font-bold">Next</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {showQR && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4 text-center">
//           <div className="bg-white rounded-3xl p-8 shadow-2xl w-full max-w-md border-t-8 border-blue-600">
//             <h2 className="text-sm font-black mb-1 uppercase tracking-widest">PAY PROCESSING FEE: ₹{currentLevel.fee.toLocaleString()}</h2>
//             <div className="flex justify-center my-6"><img src={`${import.meta.env.VITE_APP_API_BASE_URL}${paymentConfig?.imageName}`} alt="QR" className="w-56 h-56 border p-2 rounded-2xl shadow-inner" /></div>
//             <p className="font-mono bg-gray-50 py-2 rounded-lg text-blue-600 font-bold mb-4 text-xs tracking-wider">{paymentConfig?.upiId}</p>
//             <button onClick={() => { setShowQR(false); setPaymentModel(true); }} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold uppercase text-sm">I HAVE PAID — NEXT</button>
//             <button onClick={() => setShowQR(false)} className="mt-4 text-gray-400 font-bold text-[10px] uppercase">Cancel</button>
//           </div>
//         </div>
//       )}

//       {paymentModel && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
//           <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
//             <h2 className="text-2xl font-black mb-6 text-center uppercase text-blue-700">SUBMIT PROOF</h2>
//             <input type="text" placeholder="UTR Number" value={utrNumber} onChange={(e) => setUtrNumber(e.target.value)} className="w-full border p-3 rounded-xl mb-4 text-sm" />
//             <p className="text-[10px] text-gray-400 mb-1 ml-1 font-bold">SCREENSHOT:</p>
//             <input type="file" onChange={(e) => {
//               const file = e.target.files[0];
//               setPaymentImage(file);
//               if (file) {
//                 const reader = new FileReader();
//                 reader.onloadend = () => setPreviewImage(reader.result);
//                 reader.readAsDataURL(file);
//               }
//             }} className="w-full mb-4 text-xs" />
//             {previewImage && <img src={previewImage} className="w-full h-32 object-contain rounded-lg mb-4 border" alt="preview" />}
//             <button onClick={submitWithdrawalProof} disabled={isSubmitting} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold uppercase text-sm">
//               {isSubmitting ? "SUBMITTING..." : "SUBMIT FOR REVIEW"}
//             </button>
//             <button onClick={() => setPaymentModel(false)} className="w-full mt-4 text-gray-400 text-center font-bold text-[10px] uppercase">Back</button>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }


// import { useEffect, useState } from "react";
// import bgImg from "../../assets/h1_hero.jpg";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchUserData } from "../Store/userSlice";
// import { toast } from "react-toastify";
// import account from "../../assets/account.png";
// import googleImg from "../../assets/google.png";
// import share from "../../assets/share.png";
// import ScratchCard from "../Home/ScratchCard";

// export default function Apply() {
//   const dispatch = useDispatch();
//   const token = localStorage.getItem("totoToken");
//   const { userData } = useSelector((state) => state.user);

//   // UI States
//   const [copied, setCopied] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [showQR, setShowQR] = useState(false);
//   const [paymentModel, setPaymentModel] = useState(false);
  
//   // Withdrawal Status State
//   const [lastWithdrawal, setLastWithdrawal] = useState(null);

//   // Form States
//   const [bankAccountName, setBankAccountName] = useState("");
//   const [ifscCode, setIfscCode] = useState("");
//   const [utrNumber, setUtrNumber] = useState("");
//   const [paymentImage, setPaymentImage] = useState(null);
//   const [previewImage, setPreviewImage] = useState(null);
//   const [paymentConfig, setPaymentConfig] = useState();
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // --- 10 LEVELS WITHDRAWAL CONFIG ---
//   const withdrawalLevels = [
//     { level: 1, amount: 50, fee: 25 },
//     { level: 2, amount: 500, fee: 250 },
//     { level: 3, amount: 2000, fee: 1000 },
//     { level: 4, amount: 5000, fee: 2500 },
//     { level: 5, amount: 10000, fee: 5000 },
//     { level: 6, amount: 20000, fee: 10000 },
//     { level: 7, amount: 50000, fee: 25000 },
//     { level: 8, amount: 100000, fee: 50000 },
//     { level: 9, amount: 200000, fee: 100000 },
//     { level: 10, amount: 500000, fee: 250000 },
//   ];

//   const currentLevelIndex = ((userData?.withdrawalStage || 1) - 1) % 10;
//   const currentLevel = withdrawalLevels[currentLevelIndex];

//   useEffect(() => {
//     dispatch(fetchUserData());
//     fetchLastWithdrawalStatus();
//   }, [dispatch]);

//   const fetchLastWithdrawalStatus = async () => {
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/my-last-withdrawal`, 
//       { headers: { Authorization: `Bearer ${token}` } });
//       setLastWithdrawal(res.data?.data);
//     } catch (err) { console.error("Status fetch error", err); }
//   };

//   // --- Scratch Card Timer Logic (UNCHANGED) ---
//   const [canScratch, setCanScratch] = useState(false);
//   const [isWithin30Days, setIsWithin30Days] = useState(false);
//   const [timeLeft, setTimeLeft] = useState("");
//   const [pointsEarned, setPointsEarned] = useState(0);
//   const [scratchType, setScratchType] = useState("");

//   useEffect(() => {
//     if (userData) {
//       const signupDate = new Date(userData.createdAt);
//       const now = new Date();
//       const diffDays = Math.ceil((now - signupDate) / (1000 * 60 * 60 * 24));
//       setIsWithin30Days(diffDays <= 30);

//       const checkTimer = () => {
//         if (userData?.isActivate === 'inactive' || userData?.isActivate === 'reject') {
//           setCanScratch(false);
//           return;
//         }
//         if (userData.scratchCardsBalance > 0) {
//           setCanScratch(true);
//           setScratchType("referral");
//           setPointsEarned(20000);
//           return;
//         }
//         const lastScratch = localStorage.getItem(`last_scratch_${userData._id}`);
//         if (lastScratch) {
//           const lastTime = new Date(lastScratch).getTime();
//           const distance = (24 * 60 * 60 * 1000) - (new Date().getTime() - lastTime);
//           if (distance > 0) {
//             setCanScratch(false);
//             const h = Math.floor(distance / (1000 * 60 * 60));
//             const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//             setTimeLeft(`${h}h ${m}m`);
//           } else { setCanScratch(true); setScratchType("daily"); }
//         } else { setCanScratch(true); setScratchType("daily"); }
//       };
//       checkTimer();
//       const interval = setInterval(checkTimer, 60000);
//       return () => clearInterval(interval);
//     }
//   }, [userData]);

//   useEffect(() => {
//     if (!canScratch || scratchType !== "daily" || !userData?._id || !token) return;
//     const getPoints = async () => {
//       try {
//         const res = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/today-reward-points/${userData._id}`,
//           { headers: { Authorization: `Bearer ${token}` } });
//         setPointsEarned(res.data?.points || 0);
//       } catch (err) { console.error(err); }
//     };
//     getPoints();
//   }, [canScratch, scratchType, userData?._id, token]);

//   const handleScratchComplete = async () => {
//     if (userData?.isActivate === 'inactive' || userData?.isActivate === 'reject') return;
//     try {
//       const endpoint = scratchType === "referral" ? "claim-referral-coupon" : "claim-daily-points";
//       const res = await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/${endpoint}`,
//         { userId: userData._id }, { headers: { Authorization: `Bearer ${token}` } });
//       if (res.status === 200) {
//         toast.success(`${res.data.points} Points added! ✨`);
//         if (scratchType === "daily") localStorage.setItem(`last_scratch_${userData._id}`, new Date().toISOString());
//         setCanScratch(false); setPointsEarned(0); dispatch(fetchUserData());
//       }
//     } catch (err) { toast.error("Error claiming points."); }
//   };

//   const handleClaimPointsToCash = async () => {
//     if (userData?.isActivate !== 'active') return toast.error("Please activate account first!");
//     if (userData?.pointsBalance < 1000) return toast.warning("Min 1,000 points needed!");
//     try {
//       const res = await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/convert-points`,
//         { userId: userData._id }, { headers: { Authorization: `Bearer ${token}` } });
//       if (res.status === 200) { toast.success(`Converted to cash! 💰`); dispatch(fetchUserData()); }
//     } catch (err) { toast.error("Conversion failed."); }
//   };

//   const handleFreeActivation = async () => {
//     setIsSubmitting(true);
//     const formData = new FormData();
//     formData.append("userId", userData?._id);
//     formData.append("utrNumber", "FREE_ACTIVATION_REQUEST"); 
//     try {
//       await axios.patch(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/payment-proof`, formData, { headers: { Authorization: `Bearer ${token}` } });
//       toast.success("Activation request sent!");
//       dispatch(fetchUserData());
//     } catch (error) { toast.error("Request failed."); }
//     finally { setIsSubmitting(false); }
//   };

//   const handleWithdrawClick = () => {
//     if (userData?.walletAmount < currentLevel.amount) {
//       return toast.error(`Low Balance! Need ₹${currentLevel.amount} for Level ${currentLevel.level}`);
//     }
//     setShowModal(true);
//   };

//   const handleProceedToQR = async () => {
//     if (!bankAccountName || !ifscCode) return toast.warning("Enter bank details");
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/payment-config`, { headers: { Authorization: `Bearer ${token}` } });
//       setPaymentConfig(res?.data);
//       setShowModal(false);
//       setShowQR(true);
//     } catch (error) { toast.error("Error fetching payment info"); }
//   };

//   const submitWithdrawalProof = async () => {
//     if (!utrNumber) return toast.warning("Enter UTR Number");
//     setIsSubmitting(true);
//     const formData = new FormData();
//     formData.append("userId", userData?._id);
//     formData.append("utrNumber", utrNumber);
//     formData.append("bankAccount", bankAccountName);
//     formData.append("ifscCode", ifscCode);
//     formData.append("level", currentLevel.level);
//     if (paymentImage) formData.append("paymentImage", paymentImage);

//     try {
//       await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/withdraw-request`, formData, { headers: { Authorization: `Bearer ${token}` } });
//       toast.success("Withdrawal Request Submitted!");
//       setPaymentModel(false);
//       fetchLastWithdrawalStatus(); 
//       dispatch(fetchUserData());
//     } catch (error) { toast.error("Error submitting proof."); }
//     finally { setIsSubmitting(false); }
//   };

//   const copyReferral = async () => {
//     const link = `${import.meta.env.VITE_WEBSITE_URL}/signup?ref=${userData.referralCode}`;
//     await navigator.clipboard.writeText(link);
//     setCopied(true); setTimeout(() => setCopied(false), 2000);
//     toast.success("Link Copied!");
//   };

//   const handleInst = () => {
//     const link = `${import.meta.env.VITE_WEBSITE_URL}/signup?ref=${userData.referralCode}`;
//     navigator.clipboard.writeText(`Join and earn rewards: ${link}`).then(() => window.open("https://www.instagram.com/direct/inbox/", "_blank"));
//   };

//   return (
//     <section className="w-full pt-16 bg-gray-50">
//       <div className="h-[50vh] flex items-center justify-center bg-grid" style={{ backgroundImage: `url(${bgImg})` }}>
//         <h1 className="text-6xl font-bold text-gray-800 tracking-tighter uppercase italic text-center">REFER & EARN</h1>
//       </div>

//       <div className="flex flex-col items-center justify-center min-h-screen p-4 -mt-20">
//         <div className="bg-white p-6 rounded-3xl shadow-2xl w-full max-w-3xl border border-gray-200">
//           <h1 className="text-2xl font-bold text-center mb-4 text-blue-800 tracking-tight">Refer & Earn – Earn 20k Points (₹200) Per Friend! 💰</h1>
          
//           {/* ACTIVATION BUTTON */}
//           {userData?.isActivate === 'active' ? (
//             <button className="w-full bg-green-600 text-white py-3 rounded-lg mb-6 font-black shadow-md uppercase">✓ ACTIVE USER</button>
//           ) : userData?.utrNumber === 'FREE_ACTIVATION_REQUEST' || userData?.paymentImage ? (
//             <button className="w-full bg-yellow-500 text-white py-3 rounded-lg mb-6 font-black shadow-md animate-pulse uppercase">PENDING ACTIVATION...</button>
//           ) : (
//             <button onClick={handleFreeActivation} disabled={isSubmitting} className="w-full bg-blue-600 text-white py-3 rounded-lg mb-6 font-black shadow-md hover:bg-blue-700 transition uppercase">
//               {isSubmitting ? "REQUESTING..." : "ACTIVATE & GET LINK (FREE)"}
//             </button>
//           )}

//           <div className="grid grid-cols-3 gap-2 mb-10 text-center">
//             <div className="flex flex-col items-center"><img src={googleImg} className="w-12 h-12 mb-2" alt="1" /><p className="text-[10px]"><strong>1. Login</strong></p></div>
//             <div className="flex flex-col items-center"><img src={account} className="w-12 h-12 mb-2" alt="2" /><p className="text-[10px]"><strong>2. Activate</strong></p></div>
//             <div className="flex flex-col items-center"><img src={share} className="w-12 h-12 mb-2" alt="3" /><p className="text-[10px]"><strong>3. Earn</strong></p></div>
//           </div>

//           {/* SCRATCH CARD SECTION */}
//           {isWithin30Days && (
//             <div className="w-full bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 p-6 rounded-2xl shadow-xl border-2 border-amber-600 mb-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
//               <div className="text-center md:text-left">
//                 <h2 className="text-amber-900 font-extrabold text-lg uppercase italic">{scratchType === "referral" ? "✨ Referral Reward ✨" : "✨ Daily Lucky Coupon ✨"}</h2>
//                 <button onClick={handleClaimPointsToCash} className={`mt-2 px-4 py-2 rounded-lg font-bold shadow-lg transition text-sm ${userData?.isActivate === 'active' && userData?.pointsBalance >= 1000 ? "bg-amber-950 text-white hover:bg-black" : "bg-gray-400 text-gray-200 cursor-not-allowed"}`}>CLAIM CASH (₹)</button>
//               </div>
//               <div className="bg-white/40 p-2 rounded-xl backdrop-blur-sm border border-white/50 min-w-[280px] flex flex-col items-center justify-center min-h-[160px]">
//                 {userData?.isActivate !== 'active' ? (
//                   <div className="text-center py-6"><span className="text-4xl mb-2 block">🔒</span><p className="text-amber-900 font-black text-[10px] uppercase">Locked</p></div>
//                 ) : canScratch ? (
//                   <ScratchCard width={260} height={130} revealPercent={60} rewardValue={`${pointsEarned.toLocaleString()} Points`} onComplete={handleScratchComplete} />
//                 ) : (
//                   <div className="text-center py-6 px-10"><p className="text-amber-900 font-bold text-sm">Next coupon in:</p><div className="bg-amber-900/20 text-amber-900 px-4 py-2 rounded-lg mt-2 font-mono text-2xl font-black">{timeLeft}</div></div>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* WALLET AND LEVEL INFO - BIGGER FONTS */}
//           <div className="grid grid-cols-2 gap-px bg-gray-200 border border-gray-200 rounded-xl overflow-hidden mb-8 shadow-sm text-center">
//             <div className="bg-white p-6 border-r border-b">
//                <p className="text-[11px] text-amber-500 font-black uppercase tracking-widest mb-1">Points Balance</p>
//                <p className="text-7xl font-black text-amber-600 tracking-tighter drop-shadow-sm">{userData?.pointsBalance || 0}</p>
//             </div>
//             <div className="bg-white p-6 border-b">
//                <p className="text-[11px] text-blue-400 font-black uppercase tracking-widest mb-1">Money Wallet (₹)</p>
//                <p className="text-7xl font-black text-blue-800 tracking-tighter drop-shadow-sm">₹{userData?.walletAmount || 0}</p>
//             </div>
//             <div className="bg-white p-4 border-r"><p className="text-gray-400 text-[10px] uppercase font-bold">Current Stage</p><p className="text-xl font-bold text-green-600">Level {currentLevel.level}/10</p></div>
//             <div className="bg-white p-4"><p className="text-gray-400 text-[10px] uppercase font-bold">Next Payout</p><p className="text-xl font-bold text-gray-800">₹{currentLevel.amount.toLocaleString()}</p></div>
//           </div>

//           <div className="flex flex-wrap justify-center gap-4 mb-8">
//             <button onClick={() => window.open(`https://wa.me/?text=Earn Rewards: ${import.meta.env.VITE_WEBSITE_URL}/signup?ref=${userData.referralCode}`, "_blank")} className="bg-green-500 text-white px-8 py-2 rounded-full font-bold shadow-md text-xs uppercase transition hover:scale-105">WhatsApp</button>
//             <button disabled={userData?.isActivate !== 'active'} onClick={copyReferral} className="bg-gray-700 text-white px-8 py-2 rounded-full font-bold shadow-md text-xs uppercase transition hover:scale-105">Copy Link</button>
//             <button disabled={userData?.isActivate !== 'active'} onClick={handleInst} className="bg-pink-500 text-white px-8 py-2 rounded-full font-bold shadow-md text-xs transition hover:scale-105">INSTAGRAM</button>
//           </div>

//           {/* --- STAGE PROGRESS LINE (ABOVE BUTTON) --- */}
//           <div className="w-full px-2 mb-6">
//              <div className="flex justify-between items-center mb-2 px-1">
//                 <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest">Stage Journey</span>
//                 <span className="text-[9px] font-black text-blue-900 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100 italic">Level {userData?.withdrawalStage || 1} of 10</span>
//              </div>
//              <div className="relative w-full h-3 bg-gray-100 rounded-full border shadow-inner overflow-hidden">
//                 <div 
//                   className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400 via-blue-600 to-indigo-700 transition-all duration-1000 ease-out z-10"
//                   style={{ width: `${((userData?.withdrawalStage || 1) / 10) * 100}%` }}
//                 ></div>
//                 <div className="absolute top-0 left-0 w-full h-full flex justify-between px-0.5 z-20 pointer-events-none opacity-30">
//                    {[...Array(11)].map((_, i) => (
//                       <div key={i} className="w-[1px] h-full bg-black/20"></div>
//                    ))}
//                 </div>
//              </div>
//           </div>

//           {/* --- MAIN WITHDRAW BUTTON WITH CONGRATS STATUS --- */}
//           {lastWithdrawal?.status === 'pending' && lastWithdrawal?.level === currentLevel.level ? (
//             <div className="w-full relative group">
//                 {/* attractive Congratulations Card */}
//                 <div className="bg-white border-2 border-indigo-100 rounded-3xl p-6 shadow-2xl text-center mb-4 transform transition-all hover:scale-[1.01]">
//                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-auto pointer-events-none">
//                       <img src="https://i.ibb.co/X7PPr8v/congrats.png" alt="congratulations" className="animate-bounce drop-shadow-xl" />
//                    </div>
//                    <div className="mt-6">
//                       <h3 className="text-3xl font-black text-blue-900 tracking-tighter uppercase italic">Request Sent!</h3>
//                       <div className="flex justify-center gap-1 my-3">
//                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
//                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
//                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.5s]"></div>
//                       </div>
//                       <p className="text-xs font-bold text-gray-500 uppercase tracking-widest leading-tight">Admin is reviewing your Level {lastWithdrawal.level} payout. <br/> Check back soon!</p>
//                    </div>
//                    <div className="absolute inset-0 bg-gradient-to-t from-blue-50/50 to-transparent pointer-events-none rounded-3xl"></div>
//                 </div>
//                 <button className="w-full py-4 bg-gray-100 text-gray-400 rounded-2xl font-black text-lg border cursor-not-allowed uppercase tracking-widest">
//                    Wait for Approval...
//                 </button>
//             </div>
//           ) : (
//             <button 
//               onClick={handleWithdrawClick} 
//               disabled={userData?.walletAmount < currentLevel.amount || userData?.isActivate !== 'active'} 
//               className={`w-full py-5 rounded-3xl font-black text-2xl shadow-2xl mb-4 transition-all transform active:scale-95 flex flex-col items-center justify-center ${userData?.walletAmount >= currentLevel.amount ? "bg-yellow-500 text-black hover:bg-yellow-600" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
//             >
//               <span className="text-[10px] uppercase tracking-[0.3em] opacity-80 mb-1">Unlock Now</span>
//               <span>WITHDRAW ₹{currentLevel.amount.toLocaleString()}</span>
//             </button>
//           )}

//           <p className="text-center text-gray-400 font-bold text-[10px] uppercase italic tracking-tighter">Processing Fee: ₹{currentLevel.fee.toLocaleString()} | Total Earned: ₹{userData?.totalAmount || 0}</p>
//         </div>
//       </div>

//       {/* --- MODALS (UNCHANGED logic, Refined Styles) --- */}
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4 backdrop-blur-sm">
//           <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md border-t-8 border-indigo-600">
//             <h2 className="text-2xl font-black mb-1 text-center text-gray-800 uppercase italic">Withdraw Level {currentLevel.level}</h2>
//             <p className="text-[10px] text-center text-gray-400 font-bold mb-6 uppercase tracking-widest">Payout: ₹{currentLevel.amount} | Fee: ₹{currentLevel.fee}</p>
//             <input type="text" placeholder="Bank Account Number" onChange={(e) => setBankAccountName(e.target.value)} className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl mb-4 text-sm focus:border-indigo-500 outline-none transition-all" />
//             <input type="text" placeholder="IFSC Code" onChange={(e) => setIfscCode(e.target.value)} className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl mb-8 text-sm focus:border-indigo-500 outline-none transition-all" />
//             <div className="flex gap-4">
//               <button onClick={() => setShowModal(false)} className="flex-1 bg-gray-100 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-200 transition">Cancel</button>
//               <button onClick={handleProceedToQR} className="flex-1 bg-indigo-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg hover:bg-indigo-700 transition">Next Step</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {showQR && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 p-4 backdrop-blur-md">
//           <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl w-full max-w-md border-t-8 border-indigo-600 text-center">
//             <h2 className="text-xs font-black mb-1 uppercase tracking-[0.2em] text-gray-400">Scan & Pay Fee</h2>
//             <p className="text-5xl font-black text-indigo-600 mb-8 tracking-tighter">₹{currentLevel.fee.toLocaleString()}</p>
//             <div className="bg-gray-50 p-5 rounded-[2rem] mb-6 border border-dashed border-gray-300">
//                 <img src={`${import.meta.env.VITE_APP_API_BASE_URL}${paymentConfig?.imageName}`} alt="QR" className="w-52 h-52 mx-auto rounded-xl shadow-inner" />
//             </div>
//             <p className="font-mono bg-blue-50 py-3 rounded-2xl text-blue-600 font-bold mb-8 text-xs">{paymentConfig?.upiId}</p>
//             <button onClick={() => { setShowQR(false); setPaymentModel(true); }} className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black uppercase text-sm shadow-xl hover:bg-indigo-700 transform active:scale-95 transition-all">I HAVE PAID — NEXT</button>
//           </div>
//         </div>
//       )}

//       {paymentModel && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4 backdrop-blur-sm">
//           <div className="bg-white rounded-[2.5rem] shadow-2xl p-10 w-full max-w-md border-t-8 border-green-500">
//             <h2 className="text-3xl font-black mb-2 text-center uppercase italic text-gray-800 tracking-tighter">Final Step</h2>
//             <p className="text-center text-xs text-gray-400 font-bold mb-8 uppercase tracking-widest">Attach Payment Proof</p>
//             <input type="text" placeholder="UTR / Transaction ID" value={utrNumber} onChange={(e) => setUtrNumber(e.target.value)} className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl mb-6 text-sm outline-none focus:border-green-500 transition-all" />
//             <p className="text-[10px] text-gray-400 mb-2 ml-2 font-black uppercase">Screenshot</p>
//             <input type="file" onChange={(e) => {
//               const file = e.target.files[0];
//               setPaymentImage(file);
//               if (file) {
//                 const reader = new FileReader();
//                 reader.onloadend = () => setPreviewImage(reader.result);
//                 reader.readAsDataURL(file);
//               }
//             }} className="w-full mb-8 text-xs text-gray-400" />
//             {previewImage && <img src={previewImage} className="w-full h-32 object-contain rounded-2xl mb-8 border-2 border-gray-50 shadow-md" alt="preview" />}
//             <button onClick={submitWithdrawalProof} disabled={isSubmitting} className="w-full bg-green-600 text-white py-5 rounded-2xl font-black uppercase text-sm shadow-xl hover:bg-green-700 transform active:scale-95 transition-all">
//               {isSubmitting ? "PROCESSING..." : "SUBMIT FOR REVIEW"}
//             </button>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }


// import { useEffect, useState } from "react";
// import bgImg from "../../assets/h1_hero.jpg";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchUserData } from "../Store/userSlice";
// import { toast } from "react-toastify";
// import account from "../../assets/account.png";
// import googleImg from "../../assets/google.png";
// import share from "../../assets/share.png";
// import ScratchCard from "../Home/ScratchCard";
// import congs from "../../assets/cong.png";

// export default function Apply() {
//   const dispatch = useDispatch();
//   const token = localStorage.getItem("totoToken");
//   const { userData } = useSelector((state) => state.user);

//   // UI States
//   const [copied, setCopied] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [showQR, setShowQR] = useState(false);
//   const [paymentModel, setPaymentModel] = useState(false);
  
//   // Withdrawal Status State
//   const [lastWithdrawal, setLastWithdrawal] = useState(null);

//   // Form States
//   const [bankAccountName, setBankAccountName] = useState("");
//   const [ifscCode, setIfscCode] = useState("");
//   const [utrNumber, setUtrNumber] = useState("");
//   const [paymentImage, setPaymentImage] = useState(null);
//   const [previewImage, setPreviewImage] = useState(null);
//   const [paymentConfig, setPaymentConfig] = useState();
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // --- 10 LEVELS WITHDRAWAL CONFIG ---
//   const withdrawalLevels = [
//     { level: 1, amount: 50, fee: 25 },
//     { level: 2, amount: 500, fee: 250 },
//     { level: 3, amount: 2000, fee: 1000 },
//     { level: 4, amount: 5000, fee: 2500 },
//     { level: 5, amount: 10000, fee: 5000 },
//     { level: 6, amount: 20000, fee: 10000 },
//     { level: 7, amount: 50000, fee: 25000 },
//     { level: 8, amount: 100000, fee: 50000 },
//     { level: 9, amount: 200000, fee: 100000 },
//     { level: 10, amount: 500000, fee: 250000 },
//   ];

//   const currentLevelIndex = ((userData?.withdrawalStage || 1) - 1) % 10;
//   const currentLevel = withdrawalLevels[currentLevelIndex];

//   useEffect(() => {
//     dispatch(fetchUserData());
//     fetchLastWithdrawalStatus();
//   }, [dispatch]);

//   const fetchLastWithdrawalStatus = async () => {
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/my-last-withdrawal`, 
//       { headers: { Authorization: `Bearer ${token}` } });
//       setLastWithdrawal(res.data?.data);
//     } catch (err) { console.error("Status fetch error", err); }
//   };

//   // --- Scratch Card Timer Logic ---
//   const [canScratch, setCanScratch] = useState(false);
//   const [isWithin30Days, setIsWithin30Days] = useState(false);
//   const [timeLeft, setTimeLeft] = useState("");
//   const [pointsEarned, setPointsEarned] = useState(0);
//   const [scratchType, setScratchType] = useState("");

//   useEffect(() => {
//     if (userData) {
//       const signupDate = new Date(userData.createdAt);
//       const now = new Date();
//       const diffDays = Math.ceil((now - signupDate) / (1000 * 60 * 60 * 24));
//       setIsWithin30Days(diffDays <= 30);

//       const checkTimer = () => {
//         if (userData?.isActivate === 'inactive' || userData?.isActivate === 'reject') {
//           setCanScratch(false);
//           return;
//         }
//         if (userData.scratchCardsBalance > 0) {
//           setCanScratch(true);
//           setScratchType("referral");
//           setPointsEarned(20000);
//           return;
//         }
//         const lastScratch = localStorage.getItem(`last_scratch_${userData._id}`);
//         if (lastScratch) {
//           const lastTime = new Date(lastScratch).getTime();
//           const distance = (24 * 60 * 60 * 1000) - (new Date().getTime() - lastTime);
//           if (distance > 0) {
//             setCanScratch(false);
//             const h = Math.floor(distance / (1000 * 60 * 60));
//             const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//             setTimeLeft(`${h}h ${m}m`);
//           } else { setCanScratch(true); setScratchType("daily"); }
//         } else { setCanScratch(true); setScratchType("daily"); }
//       };
//       checkTimer();
//       const interval = setInterval(checkTimer, 60000);
//       return () => clearInterval(interval);
//     }
//   }, [userData]);

//   useEffect(() => {
//     if (!canScratch || scratchType !== "daily" || !userData?._id || !token) return;
//     const getPoints = async () => {
//       try {
//         const res = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/today-reward-points/${userData._id}`,
//           { headers: { Authorization: `Bearer ${token}` } });
//         setPointsEarned(res.data?.points || 0);
//       } catch (err) { console.error(err); }
//     };
//     getPoints();
//   }, [canScratch, scratchType, userData?._id, token]);

//   const handleScratchComplete = async () => {
//     if (userData?.isActivate === 'inactive' || userData?.isActivate === 'reject') return;
//     try {
//       const endpoint = scratchType === "referral" ? "claim-referral-coupon" : "claim-daily-points";
//       const res = await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/${endpoint}`,
//         { userId: userData._id }, { headers: { Authorization: `Bearer ${token}` } });
//       if (res.status === 200) {
//         toast.success(`${res.data.points} Points added! ✨`);
//         if (scratchType === "daily") localStorage.setItem(`last_scratch_${userData._id}`, new Date().toISOString());
//         setCanScratch(false); setPointsEarned(0); dispatch(fetchUserData());
//       }
//     } catch (err) { toast.error("Error claiming points."); }
//   };

//   const handleClaimPointsToCash = async () => {
//     if (userData?.isActivate !== 'active') return toast.error("Please activate account first!");
//     if (userData?.pointsBalance < 1000) return toast.warning("Min 1,000 points needed!");
//     try {
//       const res = await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/convert-points`,
//         { userId: userData._id }, { headers: { Authorization: `Bearer ${token}` } });
//       if (res.status === 200) { toast.success(`Converted to cash! 💰`); dispatch(fetchUserData()); }
//     } catch (err) { toast.error("Conversion failed."); }
//   };

//   const handleFreeActivation = async () => {
//     setIsSubmitting(true);
//     const formData = new FormData();
//     formData.append("userId", userData?._id);
//     formData.append("utrNumber", "FREE_ACTIVATION_REQUEST"); 
//     try {
//       await axios.patch(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/payment-proof`, formData, { headers: { Authorization: `Bearer ${token}` } });
//       toast.success("Activation request sent!");
//       dispatch(fetchUserData());
//     } catch (error) { toast.error("Request failed."); }
//     finally { setIsSubmitting(false); }
//   };

//   const handleWithdrawClick = () => {
//     if (userData?.walletAmount < currentLevel.amount) {
//       return toast.error(`Low Balance! Need ₹${currentLevel.amount} for Level ${currentLevel.level}`);
//     }
//     setShowModal(true);
//   };

//   const handleProceedToQR = async () => {
//     if (!bankAccountName || !ifscCode) return toast.warning("Enter bank details");
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/payment-config`, { headers: { Authorization: `Bearer ${token}` } });
//       setPaymentConfig(res?.data);
//       setShowModal(false);
//       setShowQR(true);
//     } catch (error) { toast.error("Error fetching payment info"); }
//   };

//   const submitWithdrawalProof = async () => {
//     if (!utrNumber) return toast.warning("Enter UTR Number");
//     setIsSubmitting(true);
//     const formData = new FormData();
//     formData.append("userId", userData?._id);
//     formData.append("utrNumber", utrNumber);
//     formData.append("bankAccount", bankAccountName);
//     formData.append("ifscCode", ifscCode);
//     formData.append("level", currentLevel.level);
//     if (paymentImage) formData.append("paymentImage", paymentImage);

//     try {
//       await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/withdraw-request`, formData, { headers: { Authorization: `Bearer ${token}` } });
//       toast.success("Withdrawal Request Submitted!");
//       setPaymentModel(false);
//       await fetchLastWithdrawalStatus(); 
//       dispatch(fetchUserData());
//     } catch (error) { toast.error("Error submitting proof."); }
//     finally { setIsSubmitting(false); }
//   };

//   const copyReferral = async () => {
//     const link = `${import.meta.env.VITE_WEBSITE_URL}/signup?ref=${userData.referralCode}`;
//     await navigator.clipboard.writeText(link);
//     setCopied(true); setTimeout(() => setCopied(false), 2000);
//     toast.success("Link Copied!");
//   };

//   const handleInst = () => {
//     const link = `${import.meta.env.VITE_WEBSITE_URL}/signup?ref=${userData.referralCode}`;
//     navigator.clipboard.writeText(`Join and earn rewards: ${link}`).then(() => window.open("https://www.instagram.com/direct/inbox/", "_blank"));
//   };

//   return (
//     <section className="w-full pt-16 bg-gray-50">
//       <div className="h-[50vh] flex items-center justify-center bg-grid" style={{ backgroundImage: `url(${bgImg})` }}>
//         <h1 className="text-6xl font-bold text-gray-800 tracking-tighter uppercase italic text-center">REFER & EARN</h1>
//       </div>

//       <div className="flex flex-col items-center justify-center min-h-screen p-4 -mt-20">
//         <div className="bg-white p-6 rounded-[2.5rem] shadow-2xl w-full max-w-4xl border border-gray-100">
//           <h1 className="text-2xl font-bold text-center mb-6 text-blue-800 tracking-tight">Refer & Earn – Dashboard 💰</h1>
          
//           {/* ACTIVATION BUTTON */}
//           {userData?.isActivate === 'active' ? (
//             <button className="w-full bg-green-600 text-white py-4 rounded-2xl mb-8 font-black shadow-md uppercase tracking-widest">✓ ACCOUNT ACTIVE</button>
//           ) : (
//             <button onClick={handleFreeActivation} disabled={isSubmitting || userData?.utrNumber} className="w-full bg-blue-600 text-white py-5 rounded-2xl mb-8 font-black shadow-xl hover:bg-blue-700 transition uppercase tracking-widest">
//               {userData?.utrNumber ? "PENDING ACTIVATION..." : "ACTIVATE ACCOUNT FREE"}
//             </button>
//           )}

//           {/* BALANCE GRID */}
//           <div className="grid grid-cols-2 gap-px bg-gray-200 border border-gray-200 rounded-[2rem] overflow-hidden mb-10 shadow-lg text-center">
//             <div className="bg-white p-10 border-r border-b">
//                <p className="text-[11px] text-amber-500 font-black uppercase tracking-widest mb-1">Points Balance</p>
//                <p className="text-7xl font-black text-amber-600 tracking-tighter drop-shadow-sm">{userData?.pointsBalance || 0}</p>
//             </div>
//             <div className="bg-white p-10 border-b">
//                <p className="text-[11px] text-blue-400 font-black uppercase tracking-widest mb-1">Money Wallet (₹)</p>
//                <p className="text-7xl font-black text-blue-800 tracking-tighter drop-shadow-sm">₹{userData?.walletAmount || 0}</p>
//             </div>
//             <div className="bg-white p-4 border-r"><p className="text-gray-400 text-[10px] uppercase font-bold">Current Stage</p><p className="text-xl font-bold text-green-600">Level {currentLevel.level}/10</p></div>
//             <div className="bg-white p-4"><p className="text-gray-400 text-[10px] uppercase font-bold">Next Payout</p><p className="text-xl font-bold text-gray-800">₹{currentLevel.amount.toLocaleString()}</p></div>
//           </div>

//           <div className="flex flex-wrap justify-center gap-4 mb-10">
//             <button onClick={() => window.open(`https://wa.me/?text=Earn Rewards: ${import.meta.env.VITE_WEBSITE_URL}/signup?ref=${userData.referralCode}`, "_blank")} className="bg-green-500 text-white px-10 py-3 rounded-full font-bold shadow-md text-xs uppercase">WhatsApp</button>
//             <button disabled={userData?.isActivate !== 'active'} onClick={copyReferral} className="bg-gray-700 text-white px-10 py-3 rounded-full font-bold shadow-md text-xs uppercase">Copy Link</button>
//             <button disabled={userData?.isActivate !== 'active'} onClick={handleInst} className="bg-pink-500 text-white px-10 py-3 rounded-full font-bold shadow-md text-xs uppercase">INSTAGRAM</button>
//           </div>

//           {/* --- STAGE PROGRESS LINE (ABOVE BUTTON) --- */}
//           <div className="w-full px-4 mb-8">
//              <div className="flex justify-between items-center mb-3">
//                 <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest italic">Stage Journey Progress</span>
//                 <span className="text-[16px] font-black text-blue-900 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">Lvl {userData?.withdrawalStage || 1} / 10</span>
//              </div>
//              <div className="relative w-full h-4 bg-gray-100 rounded-full border-2 border-white shadow-inner overflow-hidden">
//                 <div 
//                   className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 via-blue-600 to-indigo-700 transition-all duration-1000 ease-out z-10"
//                   style={{ width: `${((userData?.withdrawalStage || 1) / 10) * 100}%` }}
//                 ></div>
//                 <div className="absolute top-0 left-0 w-full h-full flex justify-between px-1 z-20 pointer-events-none opacity-20">
//                    {[...Array(11)].map((_, i) => (
//                       <div key={i} className="w-[2px] h-full bg-black"></div>
//                    ))}
//                 </div>
//              </div>
//           </div>

//           {/* --- MAIN WITHDRAW AREA (Congratulations Logic) --- */}
//           {lastWithdrawal?.status === 'pending' ? (
//             <div className="w-full relative py-12 px-6 bg-gradient-to-b from-white to-blue-50 border-4 border-indigo-100 rounded-[2.5rem] shadow-2xl text-center mb-8 transform transition-all hover:scale-[1.01]">
//                <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 pointer-events-none drop-shadow-2xl text-center">
//                   <img src={congs} alt="congratulations" className="animate-bounce inline-block" />
//                </div>
//                <div className="mt-8">
//                   <h3 className="text-4xl font-black text-blue-900 tracking-tighter uppercase italic drop-shadow-sm">Congratulations!</h3>
//                   <div className="flex justify-center gap-2 my-4">
//                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
//                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.1s]"></div>
//                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
//                   </div>
//                   <p className="text-sm font-bold text-gray-600 uppercase tracking-widest leading-snug">Request Submitted Successfully! <br/> <span className="text-indigo-600 font-black">Level {lastWithdrawal.level} Payout</span> is pending admin review.</p>
//                   <div className="mt-6 inline-block bg-yellow-400 text-white px-8 py-2 rounded-full font-black text-xs uppercase animate-pulse shadow-md">⏳ Processing...</div>
//                </div>
//             </div>
//           ) : (
//             <div className="group">
//                <button 
//                 onClick={handleWithdrawClick} 
//                 disabled={userData?.walletAmount < currentLevel.amount || userData?.isActivate !== 'active'} 
//                 className={`w-full py-7 rounded-[2.5rem] font-black text-3xl shadow-2xl mb-4 transition-all transform active:scale-95 flex flex-col items-center justify-center ${userData?.walletAmount >= currentLevel.amount ? "bg-yellow-500 text-white hover:bg-yellow-500" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
//                >
//                  <span className="text-[10px] uppercase tracking-[0.4em] opacity-80 mb-1">Available to Unlock</span>
//                  <span>WITHDRAW ₹{currentLevel.amount.toLocaleString()}</span>
//                </button>
//                <div className="flex justify-between px-6 text-gray-400 text-[15px] font-black uppercase tracking-widest italic opacity-60">
//                   <span>Processing Fee: ₹{currentLevel.fee.toLocaleString()}</span>
//                   <span>Withdrawal Level: {currentLevel.level}/10</span>
//                </div>
//             </div>
//           )}

//           {/* Scratch Section (UNCHANGED logic, refined UI) */}
//           {isWithin30Days && (
//             <div className="mt-12 w-full bg-gradient-to-r from-orange-400 to-rose-500 p-6 rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 border-4 border-white/20">
//               <div className="text-white text-center md:text-left">
//                 <h2 className="text-2xl font-black uppercase italic tracking-tighter">✨ Scratch Card Reward ✨</h2>
//                 <button onClick={handleClaimPointsToCash} className="mt-4 bg-white text-rose-600 px-8 py-2 rounded-full font-black text-xs shadow-lg transform hover:scale-105 transition-all">CLAIM CASH (₹)</button>
//               </div>
//               <div className="bg-white/20 p-2 rounded-3xl backdrop-blur-md border border-white/30 min-w-[280px] min-h-[160px] flex items-center justify-center text-white">
//                 {userData?.isActivate !== 'active' ? (
//                   <div className="text-center"><span className="text-5xl block mb-2">🔒</span><p className="font-black text-[10px] uppercase tracking-widest">Locked</p></div>
//                 ) : canScratch ? (
//                   <ScratchCard width={260} height={130} revealPercent={60} rewardValue={`${pointsEarned.toLocaleString()} Pts`} onComplete={handleScratchComplete} />
//                 ) : (
//                   <div className="text-center"><p className="text-[10px] font-bold opacity-80 uppercase mb-1">Next In</p><div className="text-3xl font-black tabular-nums">{timeLeft}</div></div>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* --- MODALS (CONGRATULATIONS HEADER FIXED) --- */}
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4 backdrop-blur-sm">
//           <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl w-full max-w-md border-t-8 border-indigo-600 relative overflow-visible">
//             {/* attractive header icon */}
//             <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-40 drop-shadow-xl text-center">
//                 <img src={congs} alt="congrats" className="animate-pulse inline-block" />
//             </div>
//             <div className="text-center mt-6">
//                 <h3 className="text-xl font-black text-indigo-900 tracking-tighter uppercase italic">Congratulations!</h3>
//                 <h2 className="text-lg font-bold mb-1 mt-1 text-gray-700 uppercase">Withdraw Level {currentLevel.level}</h2>
//                 <p className="text-[15px] text-gray-400 font-bold mb-8 uppercase tracking-widest">Payout: ₹{currentLevel.amount} | Fee: ₹{currentLevel.fee}</p>
//             </div>
//             <input type="text" placeholder="Bank Account Number" onChange={(e) => setBankAccountName(e.target.value)} className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl mb-4 text-sm focus:border-indigo-500 outline-none" />
//             <input type="text" placeholder="IFSC Code" onChange={(e) => setIfscCode(e.target.value)} className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl mb-8 text-sm focus:border-indigo-500 outline-none" />
//             <div className="flex gap-4">
//               <button onClick={() => setShowModal(false)} className="flex-1 bg-gray-100 py-4 rounded-2xl font-black text-xs uppercase tracking-widest">Cancel</button>
//               <button onClick={handleProceedToQR} className="flex-1 bg-indigo-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg">Next Step</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {showQR && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 p-4 backdrop-blur-md text-center">
//           <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl w-full max-w-md border-t-8 border-indigo-600">
//             <h2 className="text-xs font-black mb-1 uppercase tracking-[0.2em] text-gray-400">Processing Fee</h2>
//             <p className="text-5xl font-black text-indigo-600 mb-8 tracking-tighter">₹{currentLevel.fee.toLocaleString()}</p>
//             <div className="bg-gray-50 p-6 rounded-[2rem] mb-6 border border-dashed border-gray-300">
//                 <img src={`${import.meta.env.VITE_APP_API_BASE_URL}${paymentConfig?.imageName}`} alt="QR" className="w-52 h-52 mx-auto rounded-xl shadow-inner" />
//             </div>
//             <p className="font-mono bg-blue-50 py-3 rounded-2xl text-blue-600 font-bold mb-8 text-xs">{paymentConfig?.upiId}</p>
//             <button onClick={() => { setShowQR(false); setPaymentModel(true); }} className="w-full bg-indigo-600 text-white py-5 rounded-[1.5rem] font-black uppercase text-sm shadow-xl hover:bg-indigo-700">I HAVE PAID — NEXT</button>
//           </div>
//         </div>
//       )}

//       {paymentModel && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4 backdrop-blur-sm text-center">
//           <div className="bg-white rounded-[2.5rem] shadow-2xl p-10 w-full max-w-md border-t-8 border-green-500">
//             <h2 className="text-3xl font-black mb-2 uppercase italic text-gray-800 tracking-tighter">Final Step</h2>
//             <p className="text-xs text-gray-400 font-bold mb-8 uppercase tracking-widest font-black italic">Submit Payment Proof</p>
//             <input type="text" placeholder="UTR / Transaction ID" value={utrNumber} onChange={(e) => setUtrNumber(e.target.value)} className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl mb-6 text-sm outline-none focus:border-green-500 transition-all" />
//             <p className="text-[10px] text-gray-400 mb-2 ml-2 font-black uppercase">Attach Screenshot</p>
//             <input type="file" onChange={(e) => {
//               const file = e.target.files[0];
//               setPaymentImage(file);
//               if (file) {
//                 const reader = new FileReader();
//                 reader.onloadend = () => setPreviewImage(reader.result);
//                 reader.readAsDataURL(file);
//               }
//             }} className="w-full mb-8 text-xs text-gray-400" />
//             {previewImage && <img src={previewImage} className="w-full h-32 object-contain rounded-2xl mb-8 border-2 border-gray-50 shadow-md" alt="preview" />}
//             <button onClick={submitWithdrawalProof} disabled={isSubmitting} className="w-full bg-green-600 text-white py-5 rounded-[1.5rem] font-black uppercase text-sm shadow-xl hover:bg-green-700 transform active:scale-95 transition-all">
//               {isSubmitting ? "PROCESSING..." : "SUBMIT FOR REVIEW"}
//             </button>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }





// import { useEffect, useState } from "react";
// import bgImg from "../../assets/h1_hero.jpg";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchUserData } from "../Store/userSlice";
// import { toast } from "react-toastify";
// import account from "../../assets/account.png";
// import googleImg from "../../assets/google.png";
// import share from "../../assets/share.png";
// import ScratchCard from "../Home/ScratchCard";
// import congs from "../../assets/cong.png";

// export default function Apply() {
//   const dispatch = useDispatch();
//   const token = localStorage.getItem("totoToken");
//   const { userData } = useSelector((state) => state.user);

//   // UI States
//   const [copied, setCopied] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [showQR, setShowQR] = useState(false);
//   const [paymentModel, setPaymentModel] = useState(false);
  
//   // Withdrawal Status State
//   const [lastWithdrawal, setLastWithdrawal] = useState(null);

//   // Form States
//   const [bankAccountName, setBankAccountName] = useState("");
//   const [ifscCode, setIfscCode] = useState("");
//   const [utrNumber, setUtrNumber] = useState("");
//   const [paymentImage, setPaymentImage] = useState(null);
//   const [previewImage, setPreviewImage] = useState(null);
//   const [paymentConfig, setPaymentConfig] = useState();
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // --- 10 LEVELS WITHDRAWAL CONFIG ---
//   const withdrawalLevels = [
//     { level: 1, amount: 50, fee: 25 },
//     { level: 2, amount: 500, fee: 250 },
//     { level: 3, amount: 2000, fee: 1000 },
//     { level: 4, amount: 5000, fee: 2500 },
//     { level: 5, amount: 10000, fee: 5000 },
//     { level: 6, amount: 20000, fee: 10000 },
//     { level: 7, amount: 50000, fee: 25000 },
//     { level: 8, amount: 100000, fee: 50000 },
//     { level: 9, amount: 200000, fee: 100000 },
//     { level: 10, amount: 500000, fee: 250000 },
//   ];

//   const currentLevelIndex = ((userData?.withdrawalStage || 1) - 1) % 10;
//   const currentLevel = withdrawalLevels[currentLevelIndex];

//   useEffect(() => {
//     dispatch(fetchUserData());
//     fetchLastWithdrawalStatus();
//   }, [dispatch]);

//   const fetchLastWithdrawalStatus = async () => {
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/my-last-withdrawal`, 
//       { headers: { Authorization: `Bearer ${token}` } });
//       setLastWithdrawal(res.data?.data);
//     } catch (err) { console.error("Status fetch error", err); }
//   };

//   // --- Scratch Card Timer Logic ---
//   const [canScratch, setCanScratch] = useState(false);
//   const [isWithin30Days, setIsWithin30Days] = useState(false);
//   const [timeLeft, setTimeLeft] = useState("");
//   const [pointsEarned, setPointsEarned] = useState(0);
//   const [scratchType, setScratchType] = useState("");

//   useEffect(() => {
//     if (userData) {
//       const signupDate = new Date(userData.createdAt);
//       const now = new Date();
//       const diffDays = Math.ceil((now - signupDate) / (1000 * 60 * 60 * 24));
//       setIsWithin30Days(diffDays <= 30);

//       const checkTimer = () => {
//         if (userData?.isActivate === 'inactive' || userData?.isActivate === 'reject') {
//           setCanScratch(false);
//           return;
//         }
//         if (userData.scratchCardsBalance > 0) {
//           setCanScratch(true);
//           setScratchType("referral");
//           setPointsEarned(20000);
//           return;
//         }
//         const lastScratch = localStorage.getItem(`last_scratch_${userData._id}`);
//         if (lastScratch) {
//           const lastTime = new Date(lastScratch).getTime();
//           const distance = (24 * 60 * 60 * 1000) - (new Date().getTime() - lastTime);
//           if (distance > 0) {
//             setCanScratch(false);
//             const h = Math.floor(distance / (1000 * 60 * 60));
//             const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//             setTimeLeft(`${h}h ${m}m`);
//           } else { setCanScratch(true); setScratchType("daily"); }
//         } else { setCanScratch(true); setScratchType("daily"); }
//       };
//       checkTimer();
//       const interval = setInterval(checkTimer, 60000);
//       return () => clearInterval(interval);
//     }
//   }, [userData]);

//   useEffect(() => {
//     if (!canScratch || scratchType !== "daily" || !userData?._id || !token) return;
//     const getPoints = async () => {
//       try {
//         const res = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/today-reward-points/${userData._id}`,
//           { headers: { Authorization: `Bearer ${token}` } });
//         setPointsEarned(res.data?.points || 0);
//       } catch (err) { console.error(err); }
//     };
//     getPoints();
//   }, [canScratch, scratchType, userData?._id, token]);

//   const handleScratchComplete = async () => {
//     if (userData?.isActivate === 'inactive' || userData?.isActivate === 'reject') return;
//     try {
//       const endpoint = scratchType === "referral" ? "claim-referral-coupon" : "claim-daily-points";
//       const res = await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/${endpoint}`,
//         { userId: userData._id }, { headers: { Authorization: `Bearer ${token}` } });
//       if (res.status === 200) {
//         toast.success(`${res.data.points} Points added! ✨`);
//         if (scratchType === "daily") localStorage.setItem(`last_scratch_${userData._id}`, new Date().toISOString());
//         setCanScratch(false); setPointsEarned(0); dispatch(fetchUserData());
//       }
//     } catch (err) { toast.error("Error claiming points."); }
//   };

//   const handleClaimPointsToCash = async () => {
//     if (userData?.isActivate !== 'active') return toast.error("Please activate account first!");
//     if (userData?.pointsBalance < 1000) return toast.warning("Min 1,000 points needed!");
//     try {
//       const res = await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/convert-points`,
//         { userId: userData._id }, { headers: { Authorization: `Bearer ${token}` } });
//       if (res.status === 200) { toast.success(`Converted to cash! 💰`); dispatch(fetchUserData()); }
//     } catch (err) { toast.error("Conversion failed."); }
//   };

//   const handleFreeActivation = async () => {
//     setIsSubmitting(true);
//     const formData = new FormData();
//     formData.append("userId", userData?._id);
//     formData.append("utrNumber", "FREE_ACTIVATION_REQUEST"); 
//     try {
//       await axios.patch(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/payment-proof`, formData, { headers: { Authorization: `Bearer ${token}` } });
//       toast.success("Activation request sent!");
//       dispatch(fetchUserData());
//     } catch (error) { toast.error("Request failed."); }
//     finally { setIsSubmitting(false); }
//   };

//   const handleWithdrawClick = () => {
//     if (userData?.walletAmount < currentLevel.amount) {
//       return toast.error(`Low Balance! Need ₹${currentLevel.amount} for Level ${currentLevel.level}`);
//     }
//     setShowModal(true);
//   };

//   const handleProceedToQR = async () => {
//     if (!bankAccountName || !ifscCode) return toast.warning("Enter bank details");
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/payment-config`, { headers: { Authorization: `Bearer ${token}` } });
//       setPaymentConfig(res?.data);
//       setShowModal(false);
//       setShowQR(true);
//     } catch (error) { toast.error("Error fetching payment info"); }
//   };

//   const submitWithdrawalProof = async () => {
//     if (!utrNumber) return toast.warning("Enter UTR Number");
//     setIsSubmitting(true);
//     const formData = new FormData();
//     formData.append("userId", userData?._id);
//     formData.append("utrNumber", utrNumber);
//     formData.append("bankAccount", bankAccountName);
//     formData.append("ifscCode", ifscCode);
//     formData.append("level", currentLevel.level);
//     if (paymentImage) formData.append("paymentImage", paymentImage);

//     try {
//       await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/withdraw-request`, formData, { headers: { Authorization: `Bearer ${token}` } });
//       toast.success("Withdrawal Request Submitted!");
//       setPaymentModel(false);
//       await fetchLastWithdrawalStatus(); 
//       dispatch(fetchUserData());
//     } catch (error) { toast.error("Error submitting proof."); }
//     finally { setIsSubmitting(false); }
//   };

//   const copyReferral = async () => {
//     const link = `${import.meta.env.VITE_WEBSITE_URL}/signup?ref=${userData.referralCode}`;
//     await navigator.clipboard.writeText(link);
//     setCopied(true); setTimeout(() => setCopied(false), 2000);
//     toast.success("Link Copied!");
//   };

//   const handleInst = () => {
//     const link = `${import.meta.env.VITE_WEBSITE_URL}/signup?ref=${userData.referralCode}`;
//     navigator.clipboard.writeText(`Join and earn rewards: ${link}`).then(() => window.open("https://www.instagram.com/direct/inbox/", "_blank"));
//   };

//   return (
//     <section className="w-full pt-10 bg-gray-50 overflow-x-hidden">
//       {/* Hero Section Responsive */}
//       <div className="h-[30vh] md:h-[50vh] flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${bgImg})` }}>
//         <h1 className="text-4xl md:text-6xl font-bold text-gray-800 tracking-tighter uppercase italic text-center px-4">REFER & EARN</h1>
//       </div>

//       <div className="flex flex-col items-center justify-center min-h-screen p-3 md:p-4 -mt-16 md:-mt-20">
//         <div className="bg-white p-4 md:p-6 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl w-full max-w-4xl border border-gray-100">
//           <h1 className="text-xl md:text-2xl font-bold text-center mb-6 text-blue-800 tracking-tight flex items-center justify-center gap-2">
//             Refer & Earn – Dashboard 💰
//           </h1>
          
//           {/* ACTIVATION BUTTON */}
//           {userData?.isActivate === 'active' ? (
//             <button className="w-full bg-green-600 text-white py-4 rounded-2xl mb-6 font-black shadow-md uppercase tracking-widest text-sm md:text-base">
//               ✓ ACCOUNT ACTIVE
//             </button>
//           ) : (
//             <button onClick={handleFreeActivation} disabled={isSubmitting || userData?.utrNumber} className="w-full bg-blue-600 text-white py-4 md:py-5 rounded-2xl mb-6 font-black shadow-xl hover:bg-blue-700 transition uppercase tracking-widest text-sm md:text-base">
//               {userData?.utrNumber ? "PENDING ACTIVATION..." : "ACTIVATE ACCOUNT FREE"}
//             </button>
//           )}

//           {/* BALANCE GRID (Responsive 375px) */}
//           <div className="grid grid-cols-2 gap-px bg-gray-200 border border-gray-200 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden mb-8 shadow-lg text-center">
//             <div className="bg-white p-4 py-8 md:p-10 border-r border-b">
//                <p className="text-[9px] md:text-[11px] text-amber-500 font-black uppercase tracking-widest mb-1">Points Balance</p>
//                <p className="text-5xl md:text-7xl font-black text-amber-600 tracking-tighter drop-shadow-sm">{userData?.pointsBalance || 0}</p>
//             </div>
//             <div className="bg-white p-4 py-8 md:p-10 border-b">
//                <p className="text-[9px] md:text-[11px] text-blue-400 font-black uppercase tracking-widest mb-1">Money Wallet (₹)</p>
//                <p className="text-5xl md:text-7xl font-black text-blue-800 tracking-tighter drop-shadow-sm">₹{userData?.walletAmount || 0}</p>
//             </div>
//             <div className="bg-white p-3 md:p-4 border-r">
//               <p className="text-gray-400 text-[8px] md:text-[10px] uppercase font-bold">Current Stage</p>
//               <p className="text-base md:text-xl font-bold text-green-600">Level {currentLevel.level}/10</p>
//             </div>
//             <div className="bg-white p-3 md:p-4">
//               <p className="text-gray-400 text-[8px] md:text-[10px] uppercase font-bold">Next Payout</p>
//               <p className="text-base md:text-xl font-bold text-gray-800">₹{currentLevel.amount.toLocaleString()}</p>
//             </div>
//           </div>

//           {/* SOCIAL BUTTONS (Responsive Layout) */}
//           <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-3 mb-8">
//             <button onClick={() => window.open(`https://wa.me/?text=Earn Rewards: ${import.meta.env.VITE_WEBSITE_URL}/signup?ref=${userData.referralCode}`, "_blank")} className="bg-green-500 text-white py-3 rounded-full font-bold shadow-md text-[10px] md:text-xs uppercase">WhatsApp</button>
//             <button disabled={userData?.isActivate !== 'active'} onClick={copyReferral} className="bg-slate-700 text-white py-3 rounded-full font-bold shadow-md text-[10px] md:text-xs uppercase">Copy Link</button>
//             <button disabled={userData?.isActivate !== 'active'} onClick={handleInst} className="bg-pink-500 text-white py-3 md:px-10 rounded-full font-bold shadow-md text-[10px] md:text-xs uppercase col-span-2">INSTAGRAM</button>
//           </div>

//           {/* PROGRESS LINE */}
//           <div className="w-full px-2 mb-8">
//              <div className="flex justify-between items-center mb-3">
//                 <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest italic">Stage Journey Progress</span>
//                 <span className="text-[14px] font-black text-blue-900 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">Lvl {userData?.withdrawalStage || 1} / 10</span>
//              </div>
//              <div className="relative w-full h-3 md:h-4 bg-gray-100 rounded-full border-2 border-white shadow-inner overflow-hidden">
//                 <div 
//                   className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 via-blue-600 to-indigo-700 transition-all duration-1000 ease-out z-10"
//                   style={{ width: `${((userData?.withdrawalStage || 1) / 10) * 100}%` }}
//                 ></div>
//              </div>
//           </div>

//           {/* WITHDRAW AREA */}
//           {lastWithdrawal?.status === 'pending' ? (
//             <div className="w-full relative py-10 px-4 bg-gradient-to-b from-white to-blue-50 border-2 md:border-4 border-indigo-100 rounded-[2rem] shadow-xl text-center mb-8">
//                <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 pointer-events-none drop-shadow-xl text-center">
//                   <img src={congs} alt="congratulations" className="animate-bounce inline-block" />
//                </div>
//                <div className="mt-4">
//                   <h3 className="text-2xl md:text-4xl font-black text-blue-900 tracking-tighter uppercase italic">Congratulations!</h3>
//                   <p className="text-[12px] md:text-sm font-bold text-gray-600 uppercase tracking-widest mt-2">Request Submitted Successfully!</p>
//                   <div className="mt-6 inline-block bg-yellow-400 text-white px-8 py-2 rounded-full font-black text-[10px] uppercase animate-pulse">⏳ Processing...</div>
//                </div>
//             </div>
//           ) : (
//             <div className="group">
//                <button 
//                 onClick={handleWithdrawClick} 
//                 disabled={userData?.walletAmount < currentLevel.amount || userData?.isActivate !== 'active'} 
//                 className={`w-full py-5 md:py-7 rounded-[1.5rem] md:rounded-[2.5rem] font-black text-xl md:text-3xl shadow-xl mb-3 transition-all transform active:scale-95 flex flex-col items-center justify-center ${userData?.walletAmount >= currentLevel.amount ? "bg-slate-200 text-slate-800" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}
//                >
//                  <span className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] opacity-80 mb-1">Available to Unlock</span>
//                  <span>WITHDRAW ₹{currentLevel.amount.toLocaleString()}</span>
//                </button>
//                <div className="flex justify-between px-4 text-gray-400 text-[10px] md:text-[15px] font-black uppercase tracking-widest italic opacity-60">
//                   <span>Fee: ₹{currentLevel.fee.toLocaleString()}</span>
//                   <span>Level: {currentLevel.level}/10</span>
//                </div>
//             </div>
//           )}

//           {/* SCRATCH SECTION (Optimized for Mobile) */}
//           {isWithin30Days && (
//             <div className="mt-10 w-full bg-gradient-to-r from-orange-400 to-rose-500 p-5 md:p-6 rounded-[2rem] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 border-2 border-white/20">
//               <div className="text-white text-center md:text-left">
//                 <h2 className="text-xl md:text-2xl font-black uppercase italic tracking-tighter">✨ Scratch Card Reward ✨</h2>
//                 <button onClick={handleClaimPointsToCash} className="mt-4 bg-white text-rose-600 px-6 py-2 rounded-full font-black text-[10px] shadow-lg transform hover:scale-105 transition-all">CLAIM CASH (₹)</button>
//               </div>
//               <div className="bg-white/20 p-2 rounded-2xl backdrop-blur-md border border-white/30 w-full md:min-w-[280px] min-h-[160px] flex items-center justify-center text-white relative overflow-hidden">
//                 {userData?.isActivate !== 'active' ? (
//                   <div className="text-center"><span className="text-4xl block mb-2">🔒</span><p className="font-black text-[10px] uppercase tracking-widest">Locked</p></div>
//                 ) : canScratch ? (
//                   <div className="w-full flex justify-center">
//                     <ScratchCard width={260} height={130} revealPercent={60} rewardValue={`${pointsEarned.toLocaleString()} Pts`} onComplete={handleScratchComplete} />
//                   </div>
//                 ) : (
//                   <div className="text-center bg-white/10 w-full py-6 rounded-xl border border-white/10">
//                     <p className="text-[9px] font-bold opacity-80 uppercase mb-1">Next In</p>
//                     <div className="text-4xl font-black tabular-nums">{timeLeft}</div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* --- MODALS (Responsive Scaling) --- */}
//       {/* {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 p-4 backdrop-blur-sm">
//           <div className="bg-white rounded-[2rem] p-6 md:p-10 shadow-2xl w-full max-w-sm border-t-8 border-indigo-600 relative">
//             <div className="text-center mt-4">
//                 <h3 className="text-lg font-black text-indigo-900 tracking-tighter uppercase italic">Withdraw Level {currentLevel.level}</h3>
//                 <p className="text-[12px] text-gray-400 font-bold mb-6 uppercase tracking-widest">Payout: ₹{currentLevel.amount}</p>
//             </div>
//             <input type="text" placeholder="Bank Account Number" onChange={(e) => setBankAccountName(e.target.value)} className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-xl mb-4 text-xs focus:border-indigo-500 outline-none" />
//             <input type="text" placeholder="IFSC Code" onChange={(e) => setIfscCode(e.target.value)} className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-xl mb-6 text-xs focus:border-indigo-500 outline-none" />
//             <div className="flex gap-3">
//               <button onClick={() => setShowModal(false)} className="flex-1 bg-gray-100 py-3 rounded-xl font-black text-[10px] uppercase">Cancel</button>
//               <button onClick={handleProceedToQR} className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-black text-[10px] uppercase shadow-lg">Next</button>
//             </div>
//           </div>
//         </div>
//       )} */}
//       {/* --- MODAL (Congratulations fix) --- */}
// {showModal && (
//   <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 p-4 backdrop-blur-sm">
//     <div className="bg-white rounded-[2.5rem] p-6 md:p-10 shadow-2xl w-full max-w-sm border-t-8 border-indigo-600 relative overflow-visible">
      
//       {/* 1. attractive header image (Top par) */}
//       <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 text-center pointer-events-none">
//          <img src={congs} alt="congrats" className="w-40 h-auto animate-bounce inline-block drop-shadow-2xl" 
//               onError={(e) => e.target.style.display='none'} />
//       </div>
      
//       {/* 2. Congratulations Stylized Text */}
//       <div className="text-center mt-6">
//           <h3 className="text-2xl font-black text-indigo-700 tracking-tighter uppercase italic drop-shadow-sm animate-pulse">Congratulations!</h3>
//           <div className="h-1 w-20 bg-indigo-100 mx-auto rounded-full my-2"></div>
//           <h2 className="text-lg font-bold text-gray-700 uppercase tracking-tight">Withdraw Level {currentLevel.level}</h2>
//           <p className="text-[15px] text-gray-400 font-bold mb-8 uppercase tracking-[0.2em]">Payout: ₹{currentLevel.amount}</p>
//       </div>

//       <input type="text" placeholder="Bank Account Number" onChange={(e) => setBankAccountName(e.target.value)} className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-xl mb-4 text-xs focus:border-indigo-500 outline-none" />
//       <input type="text" placeholder="IFSC Code" onChange={(e) => setIfscCode(e.target.value)} className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-xl mb-6 text-xs focus:border-indigo-500 outline-none" />
      
//       <div className="flex gap-3">
//         <button onClick={() => setShowModal(false)} className="flex-1 bg-gray-100 py-3 rounded-xl font-black text-[10px] uppercase">Cancel</button>
//         <button onClick={handleProceedToQR} className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-black text-[10px] uppercase shadow-lg">Next Step</button>
//       </div>
//     </div>
//   </div>
// )}

//       {showQR && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50 p-4 backdrop-blur-md text-center">
//           <div className="bg-white rounded-[2rem] p-6 md:p-10 shadow-2xl w-full max-w-sm border-t-8 border-indigo-600">
//             <h2 className="text-[10px] font-black mb-1 uppercase tracking-widest text-gray-400">Processing Fee</h2>
//             <p className="text-4xl font-black text-indigo-600 mb-6 tracking-tighter">₹{currentLevel.fee.toLocaleString()}</p>
//             <div className="bg-gray-50 p-4 rounded-[1.5rem] mb-6 border border-dashed border-gray-300">
//                 <img src={`${import.meta.env.VITE_APP_API_BASE_URL}${paymentConfig?.imageName}`} alt="QR" className="w-40 h-40 mx-auto rounded-xl" />
//             </div>
//             <p className="font-mono bg-blue-50 py-3 rounded-xl text-blue-600 font-bold mb-6 text-[10px] break-all px-2">{paymentConfig?.upiId}</p>
//             <button onClick={() => { setShowQR(false); setPaymentModel(true); }} className="w-full bg-indigo-600 text-white py-4 rounded-xl font-black uppercase text-xs shadow-xl">I HAVE PAID — NEXT</button>
//           </div>
//         </div>
//       )}

//       {paymentModel && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 p-4 backdrop-blur-sm text-center">
//           <div className="bg-white rounded-[2rem] shadow-2xl p-6 md:p-10 w-full max-w-sm border-t-8 border-green-500">
//             <h2 className="text-2xl font-black mb-1 uppercase italic text-gray-800 tracking-tighter">Final Step</h2>
//             <p className="text-[10px] text-gray-400 font-black mb-6 uppercase tracking-widest">Submit Payment Proof</p>
//             <input type="text" placeholder="UTR / Transaction ID" value={utrNumber} onChange={(e) => setUtrNumber(e.target.value)} className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-xl mb-4 text-xs outline-none focus:border-green-500" />
//             <input type="file" onChange={(e) => {
//               const file = e.target.files[0];
//               setPaymentImage(file);
//               if (file) {
//                 const reader = new FileReader();
//                 reader.onloadend = () => setPreviewImage(reader.result);
//                 reader.readAsDataURL(file);
//               }
//             }} className="w-full mb-6 text-[10px] text-gray-400" />
//             {previewImage && <img src={previewImage} className="w-full h-24 object-contain rounded-xl mb-6 border border-gray-50 shadow-sm" alt="preview" />}
//             <button onClick={submitWithdrawalProof} disabled={isSubmitting} className="w-full bg-green-600 text-white py-4 rounded-xl font-black uppercase text-xs shadow-xl active:scale-95 transition-all">
//               {isSubmitting ? "PROCESSING..." : "SUBMIT FOR REVIEW"}
//             </button>
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

  // const handleScratchComplete = async () => {
  //   try {
  //     const endpoint = scratchType === "referral" ? "claim-referral-coupon" : "claim-daily-points";
  //     const res = await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/${endpoint}`,
  //       { userId: userData._id }, { headers: { Authorization: `Bearer ${token}` } });
  //     if (res.status === 200) {
  //       toast.success(`${res.data.points} Points added! ✨`);
  //       if (scratchType === "daily") localStorage.setItem(`last_scratch_${userData._id}`, new Date().toISOString());
  //       setCanScratch(false); setPointsEarned(0); dispatch(fetchUserData());
  //     }
  //   } catch (err) { toast.error("Error claiming points."); }
  // };

  const handleScratchComplete = async () => {
    try {
      const endpoint = scratchType === "referral" ? "claim-referral-coupon" : "claim-daily-points";
      const res = await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}api/${endpoint}`,
        { userId: userData._id }, { headers: { Authorization: `Bearer ${token}` } });
      if (res.status === 200) {
        toast.success(`${res.data.points} Points added! ✨`);
        if (scratchType === "daily") localStorage.setItem(`last_scratch_${userData._id}`, new Date().toISOString());
        setCanScratch(false); setPointsEarned(0); dispatch(fetchUserData());
      }
    } catch (err) { toast.error("Error claiming points."); }
  };

  // const handleClaimPointsToCash = async () => {
  //   if (userData?.pointsBalance < 1000) return toast.warning("Min 1,000 points needed!");
  //   try {
  //     const res = await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/convert-points`,
  //       { userId: userData._id }, { headers: { Authorization: `Bearer ${token}` } });
  //     if (res.status === 200) { toast.success(`Converted to cash! 💰`); dispatch(fetchUserData()); }
  //   } catch (err) { toast.error("Conversion failed."); }
  // };


  const handleClaimPointsToCash = async () => {
    if (userData?.pointsBalance < 1000) return toast.warning("Min 1,000 points needed!");
    try {
      const res = await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/ct-points`,
        { userId: userData._id }, { headers: { Authorization: `Bearer ${token}` } });
      if (res.status === 200) { toast.success(`Converted to cash! 💰`); dispatch(fetchUserData()); }
    } catch (err) { toast.error("Conversion failed."); }
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
      fetchLastWithdrawalStatus(); 
      dispatch(fetchUserData());
    } catch (error) { toast.error("Error submitting proof."); }
    finally { setIsSubmitting(false); }
  };

  // const copyReferral = async () => {
  //   const link = `${import.meta.env.VITE_WEBSITE_URL}/signup?ref=${userData?.referralCode}`;
  //   await navigator.clipboard.writeText(link);
  //   setCopied(true); setTimeout(() => setCopied(false), 2000);
  //   toast.success("Link Copied!");
  // };

  const copyReferral = async () => {

    const link = `${window.location.origin}/signup?ref=${userData?.referralCode}`;

    await navigator.clipboard.writeText(link);

    setCopied(true); setTimeout(() => setCopied(false), 2000);

    toast.success("Link Copied!");

  };

  const handleInst = () => {
    const link = `${import.meta.env.VITE_WEBSITE_URL}/signup?ref=${userData?.referralCode}`;
    navigator.clipboard.writeText(`Join and earn rewards: ${link}`).then(() => window.open("https://www.instagram.com/direct/inbox/", "_blank"));
  };

  return (
    <section className="w-full pt-10 bg-gray-50 overflow-x-hidden">
      <div className="h-[30vh] md:h-[50vh] flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${bgImg})` }}>
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 tracking-tighter uppercase italic text-center px-4">REFER & EARN</h1>
      </div>

      <div className="flex flex-col items-center justify-center min-h-screen p-3 md:p-4 -mt-16 md:-mt-20">
        <div className="bg-white p-4 md:p-6 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl w-full max-w-4xl border border-gray-100">
          
          {/* <h1 className="text-xl md:text-2xl font-bold text-center mb-6 text-blue-800 tracking-tight">Refer & Earn – Dashboard 💰</h1> */}
          <h1 className="text-2xl font-bold text-center mb-4 text-blue-800 tracking-tight">Refer & Earn – Earn 20k Points (₹50) Per Friend! 💰</h1>
          <p className="text-center text-gray-600 mb-6 text-sm">Join now for FREE! No activation charges. Share link and withdraw level by level. 💸</p>
          <button className="w-full bg-green-600 text-white py-3 rounded-lg mb-6 font-black shadow-md uppercase">✓ ACTIVE USER</button>
          
          

          {/* BALANCE GRID - LARGE FONTS RESTORED */}
          <div className="grid grid-cols-2 gap-px bg-gray-200 border border-gray-200 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden mb-8 shadow-lg text-center">
            {/* <div className="bg-white p-4 py-8 md:p-10 border-r border-b">
               <p className="text-[9px] md:text-[11px] text-amber-500 font-black uppercase tracking-widest mb-1">Points Balance</p>
               <p className="text-5xl md:text-7xl font-black text-amber-600 tracking-tighter drop-shadow-sm">{userData?.pointsBalance || 0}</p>
                <div className="bg-white p-4 border rounded-xl shadow-sm">
        <p className="text-[10px] text-indigo-600 font-bold uppercase">Referral Points </p>
        <p className="text-xl font-black">{userData?.referralPointsBalance || 0}</p>
    </div>
            </div> */}
            <div className="bg-white p-6 md:p-10 border-r border-b flex flex-col items-center justify-center min-h-[250px]">
  
  {/* Section 1: Daily Points (Main Highlight) */}
  <div className="text-center mb-6 w-full">
    <p className="text-[10px] md:text-[11px] text-amber-500 font-black uppercase tracking-widest mb-1 italic">
       Daily Balance
    </p>
    <p className="text-6xl md:text-7xl font-black text-amber-600 tracking-tighter drop-shadow-sm">
       {userData?.pointsBalance || 0}
    </p>
  </div>

  {/* Visual Divider Line */}
  <div className="w-3/4 border-t border-gray-100 mb-6"></div>

  {/* Section 2: Referral Points (Premium Styled Badge) */}
  <div className="w-full bg-indigo-50/50 rounded-2xl p-4 border border-indigo-100 shadow-inner group hover:bg-indigo-100 transition-all duration-300">
    <p className="text-[10px] text-indigo-600 font-black uppercase tracking-widest mb-1">
       Referral Points
    </p>
    <div className="flex items-center justify-center gap-2">
       <span className="text-indigo-400 text-sm animate-pulse">✨</span>
       <p className="text-3xl md:text-4xl font-black text-indigo-900 tracking-tight tabular-nums">
          {userData?.referralPointsBalance || 0}
       </p>
       <span className="text-indigo-400 text-sm animate-pulse">✨</span>
    </div>
  </div>
</div>
            
            <div className="bg-white p-4 py-8 md:p-10 border-b">
               <p className="text-[9px] md:text-[11px] text-blue-400 font-black uppercase tracking-widest mb-1">Money Wallet (₹)</p>
               <p className="text-5xl md:text-7xl font-black text-blue-800 tracking-tighter drop-shadow-sm">₹{userData?.walletAmount || 0}</p>
            </div>
            <div className="bg-white p-3 md:p-4 border-r">
              <p className="text-gray-400 text-[8px] md:text-[10px] uppercase font-bold">Current Stage</p>
              <p className="text-base md:text-xl font-bold text-green-600">Level {currentLevel.level}/10</p>
            </div>
            <div className="bg-white p-3 md:p-4">
              <p className="text-gray-400 text-[8px] md:text-[10px] uppercase font-bold">Next Payout</p>
              <p className="text-base md:text-xl font-bold text-gray-800">₹{currentLevel.amount.toLocaleString()}</p>
            </div>
          </div>

          {/* REFERRAL LINK & CODE SECTION RESTORED */}
          {/* <div className="bg-blue-50 p-4 rounded-xl border border-dashed border-blue-300 mb-8 text-center">
            <p className="text-[10px] text-blue-400 font-bold uppercase mb-1 tracking-widest">Your Referral Link & Code</p>
            <p className="text-xs font-mono text-blue-700 font-bold break-all mb-1">{import.meta.env.VITE_WEBSITE_URL}/signup?ref={userData?.referralCode}</p>
            <p className="text-[10px] text-gray-500 italic uppercase">Code: <span className="text-blue-600 font-black">{userData?.referralCode}</span></p>
          </div> */}
          <div className="bg-blue-50 p-4 rounded-xl border border-dashed border-blue-300 mb-8 text-center">
            <p className="text-[10px] text-blue-400 font-bold uppercase mb-1 tracking-widest">Your Referral Link & Code</p>
            <p className="text-xs font-mono text-blue-700 font-bold break-all mb-1">
              {window.location.origin}/signup?ref={userData?.referralCode}
            </p>
            <p className="text-[10px] text-gray-500 italic uppercase">Code: <span className="text-blue-600 font-black">{userData?.referralCode}</span></p>
          </div>
          {/* SOCIAL BUTTONS */}
          {/* <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-3 mb-8">
            <button onClick={() => window.open(`https://wa.me/?text=Earn Rewards: ${import.meta.env.VITE_WEBSITE_URL}/signup?ref=${userData?.referralCode}`, "_blank")} className="bg-green-500 text-white py-3 rounded-full font-bold shadow-md text-[10px] md:text-xs uppercase transition hover:scale-105">WhatsApp</button>
            <button onClick={copyReferral} className="bg-slate-700 text-white py-3 rounded-full font-bold shadow-md text-[10px] md:text-xs uppercase transition hover:scale-105">{copied ? "Copied!" : "Copy Link"}</button>
            <button onClick={handleInst} className="bg-pink-500 text-white py-3 md:px-10 rounded-full font-bold shadow-md text-[10px] md:text-xs uppercase col-span-2 transition hover:scale-105">INSTAGRAM</button>
          </div> */}
{/* SOCIAL BUTTONS - Fixed Layout */}
<div className="flex flex-wrap justify-center items-center gap-3 mb-8 px-2">
  <button 
    onClick={() => window.open(`https://wa.me/?text=Earn Rewards: https://earn.totoearn.shop/signup?ref=${userData?.referralCode}`, "_blank")} 
    className="flex-1 min-w-[100px] sm:flex-none bg-green-500 text-white py-3 px-6 rounded-full font-bold shadow-md text-[10px] sm:text-xs uppercase transition hover:scale-105 active:scale-95"
  >
    WhatsApp
  </button>
  
  <button 
    onClick={copyReferral} 
    className="flex-1 min-w-[100px] sm:flex-none bg-slate-700 text-white py-3 px-6 rounded-full font-bold shadow-md text-[10px] sm:text-xs uppercase transition hover:scale-105 active:scale-95"
  >
    {copied ? "Copied!" : "Copy Link"}
  </button>
  
  <button 
    onClick={handleInst} 
    className="w-full sm:w-auto bg-pink-500 text-white py-3 px-10 rounded-full font-bold shadow-md text-[10px] sm:text-xs uppercase transition hover:scale-105 active:scale-95"
  >
    INSTAGRAM
  </button>
</div>
          {/* --- STAGE PROGRESS LINE --- */}
          <div className="w-full px-2 mb-8">
             <div className="flex justify-between items-center mb-3">
                <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest italic">Stage Journey Progress</span>
                <span className="text-[14px] font-black text-blue-900 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 italic">Level {userData?.withdrawalStage || 1} / 10</span>
             </div>
             <div className="relative w-full h-3 md:h-4 bg-gray-100 rounded-full border-2 border-white shadow-inner overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 via-blue-600 to-indigo-700 transition-all duration-1000 ease-out z-10"
                  style={{ width: `${((userData?.withdrawalStage || 1) / 10) * 100}%` }}
                ></div>
             </div>
          </div>

          {/* DYNAMIC ACTION AREA (PENDING CARD) */}
          {lastWithdrawal?.status === 'pending' ? (
            <div className="w-full relative py-10 px-4 bg-gradient-to-b from-white to-blue-50 border-4 border-indigo-100 rounded-[2.5rem] shadow-xl text-center mb-8">
               <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 pointer-events-none drop-shadow-xl text-center">
                  <img src={congs} alt="congratulations" className="animate-bounce inline-block" />
               </div>
               <div className="mt-4">
                  <h3 className="text-2xl md:text-4xl font-black text-blue-900 tracking-tighter uppercase italic drop-shadow-sm">Congratulations!</h3>
                  <p className="text-[12px] md:text-sm font-bold text-gray-600 uppercase tracking-widest mt-2 px-2 leading-snug">Withdrawal Request Submitted! <br/> <span className="text-indigo-600 font-black">Level {lastWithdrawal.level} Payout</span> is pending admin review.</p>
                  <div className="mt-6 inline-block bg-yellow-400 text-white px-8 py-2 rounded-full font-black text-[10px] uppercase animate-pulse shadow-md">⏳ Status: Processing...</div>
               </div>
            </div>
          ) : (
            <div className="group">
               <button 
                onClick={handleWithdrawClick} 
                disabled={userData?.walletAmount < currentLevel.amount} 
                className={`w-full py-5 md:py-7 rounded-[1.5rem] md:rounded-[2.5rem] font-black text-xl md:text-3xl shadow-xl mb-4 transition-all transform active:scale-95 flex flex-col items-center justify-center ${userData?.walletAmount >= currentLevel.amount ? "bg-yellow-500 text-white hover:bg-yellow-600" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}
               >
                 <span className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] opacity-80 mb-1">Available to Unlock</span>
                 <span>WITHDRAW ₹{currentLevel.amount.toLocaleString()}</span>
               </button>
               <div className="flex justify-between px-4 text-gray-400 text-[10px] md:text-[15px] font-black uppercase tracking-widest italic opacity-60">
                  <span>Processing Fee: ₹{currentLevel.fee.toLocaleString()}</span>
                  <span>Withdrawal Level: {currentLevel.level}/10</span>
               </div>
            </div>
          )}

          {/* SCRATCH SECTION (ACTIVATION Hurdle Removed) */}
          {isWithin30Days && (
            <div className="mt-10 w-full bg-gradient-to-r from-orange-400 to-rose-500 p-5 md:p-6 rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 border-4 border-white/20">
              <div className="text-white text-center md:text-left">
                <h2 className="text-xl md:text-2xl font-black uppercase italic tracking-tighter">✨ Scratch Card Reward ✨</h2>
                <button onClick={handleClaimPointsToCash} className="mt-4 bg-white text-rose-600 px-8 py-2 rounded-full font-black text-[10px] shadow-lg transform hover:scale-105 transition-all">CLAIM CASH (₹)</button>
              </div>
              <div className="bg-white/20 p-2 rounded-3xl backdrop-blur-md border border-white/30 w-full md:min-w-[280px] min-h-[160px] flex items-center justify-center text-white relative overflow-hidden">
                {canScratch ? (
                  <div className="w-full flex justify-center">
                    <ScratchCard width={260} height={130} revealPercent={60} rewardValue={`${pointsEarned.toLocaleString()} Pts`} onComplete={handleScratchComplete} />
                  </div>
                ) : (
                  <div className="text-center bg-white/10 w-full py-6 rounded-xl border border-white/10">
                    <p className="text-[9px] font-bold opacity-80 uppercase mb-1">Next Scratch In</p>
                    <div className="text-4xl font-black tabular-nums">{timeLeft}</div>
                  </div>
                )}
              </div>
            </div>
          )}
          
          <p className="text-center text-gray-300 font-bold text-[9px] uppercase mt-10 tracking-widest italic">Lifetime Total Payouts Received: ₹{userData?.totalAmount || 0}</p>
        </div>
      </div>

      {/* --- MODAL (CONGRATULATIONS HEADER) --- */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl w-full max-w-sm border-t-8 border-indigo-600 relative overflow-visible">
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 text-center pointer-events-none">
               <img src={congs} alt="congrats" className="w-40 h-auto animate-bounce inline-block drop-shadow-2xl" />
            </div>
            <div className="text-center mt-6">
                <h3 className="text-2xl font-black text-indigo-700 tracking-tighter uppercase italic animate-pulse">Congratulations!</h3>
                <div className="h-1 w-20 bg-indigo-100 mx-auto rounded-full my-2"></div>
                <h2 className="text-lg font-bold text-gray-700 uppercase">Withdraw Level {currentLevel.level}</h2>
                <p className="text-[15px] text-gray-400 font-bold mb-8 uppercase tracking-[0.2em]">Payout: ₹{currentLevel.amount}</p>
            </div>
            <input type="text" placeholder="Bank Account Number" onChange={(e) => setBankAccountName(e.target.value)} className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl mb-4 text-sm focus:border-indigo-500 outline-none" />
            <input type="text" placeholder="IFSC Code" onChange={(e) => setIfscCode(e.target.value)} className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl mb-8 text-sm focus:border-indigo-500 outline-none" />
            <div className="flex gap-3">
              <button onClick={() => setShowModal(false)} className="flex-1 bg-gray-100 py-3 rounded-xl font-black text-[10px] uppercase">Cancel</button>
              <button onClick={handleProceedToQR} className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-black text-[10px] uppercase shadow-lg hover:bg-indigo-700 transition-all">Next Step</button>
            </div>
          </div>
        </div>
      )}

      {/* --- QR & PAYMENT MODALS --- */}
      {showQR && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50 p-4 backdrop-blur-md text-center">
          <div className="bg-white rounded-[2rem] p-6 md:p-10 shadow-2xl w-full max-w-sm border-t-8 border-indigo-600">
            <h2 className="text-[10px] font-black mb-1 uppercase tracking-widest text-gray-400">Processing Fee</h2>
            <p className="text-4xl font-black text-indigo-600 mb-6 tracking-tighter">₹{currentLevel.fee.toLocaleString()}</p>
            <div className="bg-gray-50 p-4 rounded-[1.5rem] mb-6 border border-dashed border-gray-300">
                <img src={`${import.meta.env.VITE_APP_API_BASE_URL}${paymentConfig?.imageName}`} alt="QR" className="w-40 h-40 mx-auto rounded-xl" />
            </div>
            <p className="font-mono bg-blue-50 py-3 rounded-2xl text-blue-600 font-bold mb-8 text-[10px] break-all px-2">{paymentConfig?.upiId}</p>
            <button onClick={() => { setShowQR(false); setPaymentModel(true); }} className="w-full bg-indigo-600 text-white py-4 rounded-xl font-black uppercase text-xs shadow-xl">I HAVE PAID — NEXT</button>
          </div>
        </div>
      )}

      {paymentModel && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 p-4 backdrop-blur-sm text-center">
          <div className="bg-white rounded-[2rem] shadow-2xl p-6 md:p-10 w-full max-w-sm border-t-8 border-green-500">
            <h2 className="text-2xl font-black mb-1 uppercase italic text-gray-800 tracking-tighter">Final Step</h2>
            <p className="text-[10px] text-gray-400 font-black mb-6 uppercase tracking-widest italic">Submit Payment Proof</p>
            <input type="text" placeholder="UTR / Transaction ID" value={utrNumber} onChange={(e) => setUtrNumber(e.target.value)} className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl mb-4 text-xs outline-none focus:border-green-500 transition-all" />
            <input type="file" onChange={(e) => {
              const file = e.target.files[0];
              setPaymentImage(file);
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => setPreviewImage(reader.result);
                reader.readAsDataURL(file);
              }
            }} className="w-full mb-6 text-[10px] text-gray-400" />
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


// import { useEffect, useState } from "react";
// import bgImg from "../../assets/h1_hero.jpg";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchUserData } from "../Store/userSlice";
// import { toast } from "react-toastify";
// import account from "../../assets/account.png";
// import googleImg from "../../assets/google.png";
// import share from "../../assets/share.png";
// import ScratchCard from "../Home/ScratchCard";
// import congs from "../../assets/cong.png";

// export default function Apply() {
//   const dispatch = useDispatch();
//   const token = localStorage.getItem("totoToken");
//   const { userData } = useSelector((state) => state.user);

//   // UI States
//   const [copied, setCopied] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [showQR, setShowQR] = useState(false);
//   const [paymentModel, setPaymentModel] = useState(false);
//   const [lastWithdrawal, setLastWithdrawal] = useState(null);

//   // Form States
//   const [bankAccountName, setBankAccountName] = useState("");
//   const [ifscCode, setIfscCode] = useState("");
//   const [utrNumber, setUtrNumber] = useState("");
//   const [paymentImage, setPaymentImage] = useState(null);
//   const [previewImage, setPreviewImage] = useState(null);
//   const [paymentConfig, setPaymentConfig] = useState();
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // --- 10 LEVELS WITHDRAWAL CONFIG ---
//   const withdrawalLevels = [
//     { level: 1, amount: 50, fee: 25 },
//     { level: 2, amount: 500, fee: 250 },
//     { level: 3, amount: 2000, fee: 1000 },
//     { level: 4, amount: 5000, fee: 2500 },
//     { level: 5, amount: 10000, fee: 5000 },
//     { level: 6, amount: 20000, fee: 10000 },
//     { level: 7, amount: 50000, fee: 25000 },
//     { level: 8, amount: 100000, fee: 50000 },
//     { level: 9, amount: 200000, fee: 100000 },
//     { level: 10, amount: 500000, fee: 250000 },
//   ];

//   const currentLevelIndex = ((userData?.withdrawalStage || 1) - 1) % 10;
//   const currentLevel = withdrawalLevels[currentLevelIndex];

//   useEffect(() => {
//     dispatch(fetchUserData());
//     fetchLastWithdrawalStatus();
//   }, [dispatch]);

//   const fetchLastWithdrawalStatus = async () => {
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/my-last-withdrawal`, 
//       { headers: { Authorization: `Bearer ${token}` } });
//       setLastWithdrawal(res.data?.data);
//     } catch (err) { console.error("Status fetch error", err); }
//   };

//   // --- Scratch Card Timer Logic ---
//   const [canScratch, setCanScratch] = useState(false);
//   const [isWithin30Days, setIsWithin30Days] = useState(false);
//   const [timeLeft, setTimeLeft] = useState("");
//   const [pointsEarned, setPointsEarned] = useState(0);
//   const [scratchType, setScratchType] = useState("");

//   useEffect(() => {
//     if (userData) {
//       const signupDate = new Date(userData.createdAt);
//       const now = new Date();
//       const diffDays = Math.ceil((now - signupDate) / (1000 * 60 * 60 * 24));
//       setIsWithin30Days(diffDays <= 30);

//       const checkTimer = () => {
//         if (userData.scratchCardsBalance > 0) {
//           setCanScratch(true);
//           setScratchType("referral");
//           setPointsEarned(20000);
//           return;
//         }
//         const lastScratch = localStorage.getItem(`last_scratch_${userData._id}`);
//         if (lastScratch) {
//           const lastTime = new Date(lastScratch).getTime();
//           const distance = (24 * 60 * 60 * 1000) - (new Date().getTime() - lastTime);
//           if (distance > 0) {
//             setCanScratch(false);
//             const h = Math.floor(distance / (1000 * 60 * 60));
//             const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//             setTimeLeft(`${h}h ${m}m`);
//           } else { setCanScratch(true); setScratchType("daily"); }
//         } else { setCanScratch(true); setScratchType("daily"); }
//       };
//       checkTimer();
//       const interval = setInterval(checkTimer, 60000);
//       return () => clearInterval(interval);
//     }
//   }, [userData]);

//   useEffect(() => {
//     if (!canScratch || scratchType !== "daily" || !userData?._id || !token) return;
//     const getPoints = async () => {
//       try {
//         const res = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/today-reward-points/${userData._id}`,
//           { headers: { Authorization: `Bearer ${token}` } });
//         setPointsEarned(res.data?.points || 0);
//       } catch (err) { console.error(err); }
//     };
//     getPoints();
//   }, [canScratch, scratchType, userData?._id, token]);

//   const handleScratchComplete = async () => {
//     try {
//       const endpoint = scratchType === "referral" ? "claim-referral-coupon" : "claim-daily-points";
//       const res = await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/${endpoint}`,
//         { userId: userData._id }, { headers: { Authorization: `Bearer ${token}` } });
//       if (res.status === 200) {
//         toast.success(`${res.data.points} Points added! ✨`);
//         if (scratchType === "daily") localStorage.setItem(`last_scratch_${userData._id}`, new Date().toISOString());
//         setCanScratch(false); setPointsEarned(0); dispatch(fetchUserData());
//       }
//     } catch (err) { toast.error("Error claiming points."); }
//   };

//   const handleClaimPointsToCash = async () => {
//     if (userData?.pointsBalance < 1000) return toast.warning("Min 1,000 points needed!");
//     try {
//       const res = await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/convert-points`,
//         { userId: userData._id }, { headers: { Authorization: `Bearer ${token}` } });
//       if (res.status === 200) { toast.success(`Converted to cash! 💰`); dispatch(fetchUserData()); }
//     } catch (err) { toast.error("Conversion failed."); }
//   };

//   const handleWithdrawClick = () => {
//     if (userData?.walletAmount < currentLevel.amount) {
//       return toast.error(`Low Balance! Need ₹${currentLevel.amount} for Level ${currentLevel.level}`);
//     }
//     setShowModal(true);
//   };

//   const handleProceedToQR = async () => {
//     if (!bankAccountName || !ifscCode) return toast.warning("Enter bank details");
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/payment-config`, { headers: { Authorization: `Bearer ${token}` } });
//       setPaymentConfig(res?.data);
//       setShowModal(false);
//       setShowQR(true);
//     } catch (error) { toast.error("Error fetching payment info"); }
//   };

//   const submitWithdrawalProof = async () => {
//     if (!utrNumber) return toast.warning("Enter UTR Number");
//     setIsSubmitting(true);
//     const formData = new FormData();
//     formData.append("userId", userData?._id);
//     formData.append("utrNumber", utrNumber);
//     formData.append("bankAccount", bankAccountName);
//     formData.append("ifscCode", ifscCode);
//     formData.append("level", currentLevel.level);
//     if (paymentImage) formData.append("paymentImage", paymentImage);

//     try {
//       await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/withdraw-request`, formData, { headers: { Authorization: `Bearer ${token}` } });
//       toast.success("Withdrawal Request Submitted!");
//       setPaymentModel(false);
//       fetchLastWithdrawalStatus(); 
//       dispatch(fetchUserData());
//     } catch (error) { toast.error("Error submitting proof."); }
//     finally { setIsSubmitting(false); }
//   };

//   // FIX: Using window.location.origin to avoid 'undefined'
//   const copyReferral = async () => {
//     const link = `${window.location.origin}/signup?ref=${userData?.referralCode}`;
//     await navigator.clipboard.writeText(link);
//     setCopied(true); setTimeout(() => setCopied(false), 2000);
//     toast.success("Link Copied!");
//   };

//   const handleInst = () => {
//     const link = `${window.location.origin}/signup?ref=${userData?.referralCode}`;
//     navigator.clipboard.writeText(`Join and earn rewards: ${link}`).then(() => window.open("https://www.instagram.com/direct/inbox/", "_blank"));
//   };

//   return (
//     <section className="w-full pt-10 bg-gray-50 overflow-x-hidden text-[Poppins]">
//       <div className="h-[30vh] md:h-[50vh] flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${bgImg})` }}>
//         <h1 className="text-4xl md:text-6xl font-bold text-gray-800 tracking-tighter uppercase italic text-center px-4">REFER & EARN</h1>
//       </div>

//       <div className="flex flex-col items-center justify-center min-h-screen p-3 md:p-4 -mt-16 md:-mt-20">
//         <div className="bg-white p-4 md:p-6 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl w-full max-w-4xl border border-gray-100">
          
//           <h1 className="text-2xl font-bold text-center mb-4 text-blue-800 tracking-tight">Refer & Earn – Earn 20k Points (₹200) Per Friend! 💰</h1>
//           <p className="text-center text-gray-600 mb-6 text-sm">Join now for FREE! No activation charges. Share link and withdraw level by level. 💸</p>
//           <button className="w-full bg-green-600 text-white py-3 rounded-lg mb-6 font-black shadow-md uppercase">✓ ACCOUNT ACTIVE</button>

//           {/* BALANCE GRID */}
//           <div className="grid grid-cols-2 gap-px bg-gray-200 border border-gray-200 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden mb-8 shadow-lg text-center">
//             <div className="bg-white p-4 py-8 md:p-10 border-r border-b">
//                <p className="text-[9px] md:text-[11px] text-amber-500 font-black uppercase tracking-widest mb-1">Points Balance</p>
//                <p className="text-5xl md:text-7xl font-black text-amber-600 tracking-tighter drop-shadow-sm">{userData?.pointsBalance || 0}</p>
//             </div>
//             <div className="bg-white p-4 py-8 md:p-10 border-b">
//                <p className="text-[9px] md:text-[11px] text-blue-400 font-black uppercase tracking-widest mb-1">Money Wallet (₹)</p>
//                <p className="text-5xl md:text-7xl font-black text-blue-800 tracking-tighter drop-shadow-sm">₹{userData?.walletAmount || 0}</p>
//             </div>
//             <div className="bg-white p-3 md:p-4 border-r">
//               <p className="text-gray-400 text-[8px] md:text-[10px] uppercase font-bold">Current Stage</p>
//               <p className="text-base md:text-xl font-bold text-green-600">Level {currentLevel.level}/10</p>
//             </div>
//             <div className="bg-white p-3 md:p-4">
//               <p className="text-gray-400 text-[8px] md:text-[10px] uppercase font-bold">Next Payout</p>
//               <p className="text-base md:text-xl font-bold text-gray-800">₹{currentLevel.amount.toLocaleString()}</p>
//             </div>
//           </div>

//           {/* REFERRAL LINK & CODE SECTION - Using window.location.origin */}
//           <div className="bg-blue-50 p-4 rounded-xl border border-dashed border-blue-300 mb-8 text-center">
//             <p className="text-[10px] text-blue-400 font-bold uppercase mb-1 tracking-widest">Your Referral Link & Code</p>
//             <p className="text-xs font-mono text-blue-700 font-bold break-all mb-1">
//               {window.location.origin}/signup?ref={userData?.referralCode}
//             </p>
//             <p className="text-[10px] text-gray-500 italic uppercase">Code: <span className="text-blue-600 font-black">{userData?.referralCode}</span></p>
//           </div>

//           {/* SOCIAL BUTTONS */}
//           <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-3 mb-8">
//             <button onClick={() => window.open(`https://wa.me/?text=Earn Rewards: ${window.location.origin}/signup?ref=${userData?.referralCode}`, "_blank")} className="bg-green-500 text-white py-3 rounded-full font-bold shadow-md text-[10px] md:text-xs uppercase transition hover:scale-105">WhatsApp</button>
//             <button onClick={copyReferral} className="bg-slate-700 text-white py-3 rounded-full font-bold shadow-md text-[10px] md:text-xs uppercase transition hover:scale-105">{copied ? "Copied!" : "Copy Link"}</button>
//             <button onClick={handleInst} className="bg-pink-500 text-white py-3 md:px-10 rounded-full font-bold shadow-md text-[10px] md:text-xs uppercase col-span-2 transition hover:scale-105">INSTAGRAM</button>
//           </div>

//           {/* STAGE PROGRESS LINE */}
//           <div className="w-full px-2 mb-8">
//              <div className="flex justify-between items-center mb-3">
//                 <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest italic">Stage Journey Progress</span>
//                 <span className="text-[14px] font-black text-blue-900 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">Lvl {userData?.withdrawalStage || 1} / 10</span>
//              </div>
//              <div className="relative w-full h-3 md:h-4 bg-gray-100 rounded-full border-2 border-white shadow-inner overflow-hidden">
//                 <div 
//                   className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 via-blue-600 to-indigo-700 transition-all duration-1000 ease-out z-10"
//                   style={{ width: `${((userData?.withdrawalStage || 1) / 10) * 100}%` }}
//                 ></div>
//              </div>
//           </div>

//           {/* DYNAMIC ACTION AREA */}
//           {lastWithdrawal?.status === 'pending' ? (
//             <div className="w-full relative py-10 px-4 bg-gradient-to-b from-white to-blue-50 border-4 border-indigo-100 rounded-[2.5rem] shadow-xl text-center mb-8">
//                <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 pointer-events-none drop-shadow-xl text-center">
//                   <img src={congs} alt="congratulations" className="animate-bounce inline-block" />
//                </div>
//                <div className="mt-4">
//                   <h3 className="text-2xl md:text-4xl font-black text-blue-900 tracking-tighter uppercase italic drop-shadow-sm">Congratulations!</h3>
//                   <p className="text-[12px] md:text-sm font-bold text-gray-600 uppercase tracking-widest mt-2 px-2 leading-snug">Withdrawal Request Submitted! <br/> <span className="text-indigo-600 font-black">Level {lastWithdrawal.level} Payout</span> is pending admin review.</p>
//                   <div className="mt-6 inline-block bg-yellow-400 text-white px-8 py-2 rounded-full font-black text-[10px] uppercase animate-pulse shadow-md">⏳ Status: Processing...</div>
//                </div>
//             </div>
//           ) : (
//             <div className="group">
//                <button 
//                 onClick={handleWithdrawClick} 
//                 disabled={userData?.walletAmount < currentLevel.amount} 
//                 className={`w-full py-5 md:py-7 rounded-[1.5rem] md:rounded-[2.5rem] font-black text-xl md:text-3xl shadow-xl mb-4 transition-all transform active:scale-95 flex flex-col items-center justify-center ${userData?.walletAmount >= currentLevel.amount ? "bg-indigo-600 text-white hover:bg-indigo-700" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
//                >
//                  <span className="text-[8px] md:text-[10px] uppercase tracking-[0.4em] opacity-80 mb-1">Available to Unlock</span>
//                  <span>WITHDRAW ₹{currentLevel.amount.toLocaleString()}</span>
//                </button>
//                <div className="flex justify-between px-4 text-gray-400 text-[10px] md:text-[15px] font-black uppercase tracking-widest italic opacity-60">
//                   <span>Processing Fee: ₹{currentLevel.fee.toLocaleString()}</span>
//                   <span>Withdrawal Level: {currentLevel.level}/10</span>
//                </div>
//             </div>
//           )}

//           {/* SCRATCH SECTION */}
//           {isWithin30Days && (
//             <div className="mt-10 w-full bg-gradient-to-r from-orange-400 to-rose-500 p-5 md:p-6 rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 border-4 border-white/20">
//               <div className="text-white text-center md:text-left">
//                 <h2 className="text-xl md:text-2xl font-black uppercase italic tracking-tighter">✨ Scratch Card Reward ✨</h2>
//                 <button onClick={handleClaimPointsToCash} className="mt-4 bg-white text-rose-600 px-8 py-2 rounded-full font-black text-[10px] shadow-lg transform hover:scale-105 transition-all">CLAIM CASH (₹)</button>
//               </div>
//               <div className="bg-white/20 p-2 rounded-3xl backdrop-blur-md border border-white/30 w-full md:min-w-[280px] min-h-[160px] flex items-center justify-center text-white relative overflow-hidden">
//                 {canScratch ? (
//                   <div className="w-full flex justify-center">
//                     <ScratchCard width={260} height={130} revealPercent={60} rewardValue={`${pointsEarned.toLocaleString()} Pts`} onComplete={handleScratchComplete} />
//                   </div>
//                 ) : (
//                   <div className="text-center bg-white/10 w-full py-6 rounded-xl border border-white/10">
//                     <p className="text-[9px] font-bold opacity-80 uppercase mb-1">Next In</p>
//                     <div className="text-4xl font-black tabular-nums">{timeLeft}</div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* --- MODAL (Congratulations fix) --- */}
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 p-4 backdrop-blur-sm">
//           <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl w-full max-sm:max-w-sm border-t-8 border-indigo-600 relative overflow-visible">
//             <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 text-center pointer-events-none">
//                <img src={congs} alt="congrats" className="w-40 h-auto animate-bounce inline-block drop-shadow-2xl" />
//             </div>
//             <div className="text-center mt-6">
//                 <h3 className="text-2xl font-black text-indigo-700 tracking-tighter uppercase italic drop-shadow-sm animate-pulse">Congratulations!</h3>
//                 <div className="h-1 w-20 bg-indigo-100 mx-auto rounded-full my-2"></div>
//                 <h2 className="text-lg font-bold text-gray-700 uppercase tracking-tight">Withdraw Level {currentLevel.level}</h2>
//                 <p className="text-[15px] text-gray-400 font-bold mb-8 uppercase tracking-[0.2em]">Payout: ₹{currentLevel.amount}</p>
//             </div>
//             <input type="text" placeholder="Bank Account Number" onChange={(e) => setBankAccountName(e.target.value)} className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-xl mb-4 text-xs focus:border-indigo-500 outline-none" />
//             <input type="text" placeholder="IFSC Code" onChange={(e) => setIfscCode(e.target.value)} className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-xl mb-6 text-xs focus:border-indigo-500 outline-none" />
//             <div className="flex gap-3">
//               <button onClick={() => setShowModal(false)} className="flex-1 bg-gray-100 py-3 rounded-xl font-black text-[10px] uppercase">Cancel</button>
//               <button onClick={handleProceedToQR} className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-black text-[10px] uppercase shadow-lg">Next Step</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* --- QR & PAYMENT MODALS --- */}
//       {showQR && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50 p-4 backdrop-blur-md text-center">
//           <div className="bg-white rounded-[2rem] p-6 md:p-10 shadow-2xl w-full max-w-sm border-t-8 border-indigo-600">
//             <h2 className="text-[10px] font-black mb-1 uppercase tracking-widest text-gray-400">Processing Fee</h2>
//             <p className="text-4xl font-black text-indigo-600 mb-6 tracking-tighter">₹{currentLevel.fee.toLocaleString()}</p>
//             <div className="bg-gray-50 p-4 rounded-[1.5rem] mb-6 border border-dashed border-gray-300">
//                 <img src={`${import.meta.env.VITE_APP_API_BASE_URL}${paymentConfig?.imageName}`} alt="QR" className="w-40 h-40 mx-auto rounded-xl" />
//             </div>
//             <p className="font-mono bg-blue-50 py-3 rounded-2xl text-blue-600 font-bold mb-8 text-[10px] break-all px-2">{paymentConfig?.upiId}</p>
//             <button onClick={() => { setShowQR(false); setPaymentModel(true); }} className="w-full bg-indigo-600 text-white py-4 rounded-xl font-black uppercase text-xs shadow-xl">I HAVE PAID — NEXT</button>
//           </div>
//         </div>
//       )}

//       {paymentModel && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 p-4 backdrop-blur-sm text-center">
//           <div className="bg-white rounded-[2rem] shadow-2xl p-6 md:p-10 w-full max-w-sm border-t-8 border-green-500">
//             <h2 className="text-2xl font-black mb-1 uppercase italic text-gray-800 tracking-tighter">Final Step</h2>
//             <p className="text-[10px] text-gray-400 font-black mb-6 uppercase tracking-widest italic">Submit Payment Proof</p>
//             <input type="text" placeholder="UTR / Transaction ID" value={utrNumber} onChange={(e) => setUtrNumber(e.target.value)} className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl mb-4 text-xs outline-none focus:border-green-500" />
//             <input type="file" onChange={(e) => {
//               const file = e.target.files[0];
//               setPaymentImage(file);
//               if (file) {
//                 const reader = new FileReader();
//                 reader.onloadend = () => setPreviewImage(reader.result);
//                 reader.readAsDataURL(file);
//               }
//             }} className="w-full mb-8 text-[10px] text-gray-400" />
//             {previewImage && <img src={previewImage} className="w-full h-32 object-contain rounded-2xl mb-8 border-2 border-gray-50 shadow-md" alt="preview" />}
//             <button onClick={submitWithdrawalProof} disabled={isSubmitting} className="w-full bg-green-600 text-white py-4 rounded-xl font-black uppercase text-xs shadow-xl active:scale-95 transition-all">
//               {isSubmitting ? "PROCESSING..." : "SUBMIT FOR REVIEW"}
//             </button>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }