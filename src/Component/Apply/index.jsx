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
  const [amount, setAmount] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [bankAccountName, setBankAccountName] = useState("");
  const userId = localStorage.getItem("userId");
  const [paymentModel, setPaymentModel] = useState(false);
  const [utrNumber, setUtrNumber] = useState("");
  const [paymentImage, setPaymentImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [showQR, setShowQR] = useState(false);
  const [paymentConfig, setPaymentConfig] = useState();

  // --- Rewards & Scratch States ---
  const [canScratch, setCanScratch] = useState(false);
  const [isWithin30Days, setIsWithin30Days] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");
  const [pointsEarned, setPointsEarned] = useState(0);
  const [scratchType, setScratchType] = useState(""); // "daily" or "referral"

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  // --- Timer & Priority Logic ---
  useEffect(() => {
    if (userData) {
      const signupDate = new Date(userData.createdAt);
      const now = new Date();
      const diffDays = Math.ceil((now - signupDate) / (1000 * 60 * 60 * 24));
      setIsWithin30Days(diffDays <= 30);

      const checkTimer = () => {
        if ( userData?.isActivate === 'inactive' ||
  userData?.isActivate === 'reject') {
          setCanScratch(false);
          return;
        }

        // 1. Priority: Referral Bonus Card
        if (userData.scratchCardsBalance > 0) {
          setCanScratch(true);
          setScratchType("referral");
          setPointsEarned(20000);
          return;
        }

        // 2. Daily Card Timer
        const lastScratch = localStorage.getItem(`last_scratch_${userData._id}`);
        if (lastScratch) {
          const lastTime = new Date(lastScratch).getTime();
          const distance = (24 * 60 * 60 * 1000) - (new Date().getTime() - lastTime);

          if (distance > 0) {
            setCanScratch(false);
            const h = Math.floor(distance / (1000 * 60 * 60));
            const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            setTimeLeft(`${h}h ${m}m`);
          } else {
            setCanScratch(true);
            setScratchType("daily");
          }
        } else {
          setCanScratch(true);
          setScratchType("daily");
        }
      };

      checkTimer();
      const interval = setInterval(checkTimer, 60000);
      return () => clearInterval(interval);
    }
  }, [userData]);



useEffect(() => {
  if (!canScratch || scratchType !== "daily") return;

  const currentId = userData?._id;

const isValidObjectId =
  typeof currentId === "string" &&
  /^[a-f\d]{24}$/i.test(currentId);

if (!isValidObjectId) return;

  const isValidId = currentId && currentId.length === 24 && currentId !== "undefined";

  if (!isValidId || !token) return;

  const getPoints = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API_BASE_URL}api/user/today-reward-points/${currentId}`,
        {
        
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPointsEarned(res.data?.points || 0);
    } catch (err) {
      console.error("Daily reward API failed", err);
    }
  };

  getPoints();
}, [canScratch, scratchType, userData?._id, token]);




const handleScratchComplete = async () => {
  if ( userData?.isActivate === 'inactive' ||
  userData?.isActivate === 'reject') return;

  try {
    // Agar scratchType "referral" hai toh ye 'claim-referral-coupon' par jana chahiye
    const endpoint = scratchType === "referral" ? "claim-referral-coupon" : "claim-daily-points";
    
    console.log("Calling Endpoint:", endpoint); // Debug kijiye console mein

    const res = await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/${endpoint}`,
      { userId: userData._id }, 
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (res.status === 200) {
      toast.success(`${res.data.points} Points added! ✨`);
      if (scratchType === "daily") {
        localStorage.setItem(`last_scratch_${userData._id}`, new Date().toISOString());
      }
      
      setCanScratch(false);
      setPointsEarned(0);
      dispatch(fetchUserData()); 
    }
  } catch (err) {
    console.error("Scratch Error:", err.response?.data);
    toast.error(err.response?.data?.message || "Error claiming points.");
  }
};

  const handleClaimPointsToCash = async () => {
    if ( userData?.isActivate === 'inactive' ||
  userData?.isActivate === 'reject') return toast.error("Please activate account first!");
    if (userData?.pointsBalance < 1000) return toast.warning("Min 50,000 points needed!");
    try {
      const res = await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/convert-points`,
        { userId: userData._id }, { headers: { Authorization: `Bearer ${token}` } });
      if (res.status === 200) {
        toast.success(`Converted to cash! 💰`);
        dispatch(fetchUserData());
      }
    } catch (err) { toast.error("Conversion failed."); }
  };

  const handleActivateClick = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/payment-config`, { headers: { Authorization: `Bearer ${token}` } });
      setPaymentConfig(res?.data);
      setShowQR(true);
    } catch (error) { toast.error("QR Fetch Error"); }
  };

  const handleProceedToProof = () => { setShowQR(false); setPaymentModel(true); };

  const copyReferral = async () => {
    const link = `${import.meta.env.VITE_WEBSITE_URL}/signup?ref=${userData.referralCode}`;
    await navigator.clipboard.writeText(link);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
    toast.success("Link Copied!");
  };

  const handleInst = () => {
    if (!userData?.referralCode) return toast.error("Refer code not available");
    const link = `${import.meta.env.VITE_WEBSITE_URL}/signup?ref=${userData.referralCode}`;
    navigator.clipboard.writeText(`Join and earn rewards: ${link}`).then(() => {
      window.open("https://www.instagram.com/direct/inbox/", "_blank");
    });
  };

  const withdrawReq = async () => {
    if (userData?.walletAmount < amount) return toast.error("Low Balance!");
    try {
      await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/withdraw`,
        { userId: userData._id, amount: Number(amount), bankAccountName, ifscCode }, { headers: { Authorization: `Bearer ${token}` } });
      toast.success("Withdraw Sent"); setShowModal(false); dispatch(fetchUserData());
    } catch (err) { toast.error("Error"); }
  };

  const submitPaymentProof = async () => {
    const formData = new FormData();
    formData.append("userId", userData?._id);
    if (utrNumber) formData.append("utrNumber", utrNumber);
    if (paymentImage) formData.append("paymentImage", paymentImage);
    try {
      await axios.patch(`${import.meta.env.VITE_APP_API_BASE_URL}api/user/payment-proof`, formData, { headers: { Authorization: `Bearer ${token}` } });
      toast.success("Proof submitted!"); setPaymentModel(false); dispatch(fetchUserData());
    } catch (error) { toast.error("Error"); }
  };

  return (
    <section className="w-full pt-16">
      <div className="h-[50vh] flex items-center justify-center bg-grid" style={{ backgroundImage: `url(${bgImg})` }}>
        <h1 className="text-6xl font-bold text-gray-800 tracking-tighter uppercase italic text-center">REFER & EARN</h1>
      </div>

      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
          <h1 className="text-2xl font-bold text-center mb-4 text-blue-800 tracking-tight">Refer & Earn – Earn 20k Points (₹200) Per Friend! 💰</h1>
          <p className="text-center text-gray-600 mb-6 text-sm">
            Refer & Earn – Join now, pay ₹200 activation fee and get instant signup bonus!
            Share your link — every friend's activation earns you ₹200 (20k pts) instantly! 💸
          </p>

        {userData?.isActivate === 'active' ? (
  <button className="w-full bg-green-600 text-white py-3 rounded-lg mb-6 font-black shadow-md tracking-widest uppercase">
    ✓ ACTIVE USER
  </button>
) : userData?.isActivate === 'reject' ? (
  <button className="w-full bg-red-500 text-white py-3 rounded-lg mb-6 font-black shadow-md animate-pulse uppercase tracking-widest">
    REJECT ACTIVATION...
  </button>
) : userData?.utrNumber || userData?.paymentImage ? (
  <button className="w-full bg-yellow-500 text-white py-3 rounded-lg mb-6 font-black shadow-md animate-pulse uppercase tracking-widest">
    PENDING ACTIVATION...
  </button>
) : (
  <button
    onClick={handleActivateClick}
    className="w-full bg-blue-600 text-white py-3 rounded-lg mb-6 font-black shadow-md hover:bg-blue-700 transition tracking-widest uppercase"
  >
    ACTIVATE & GET LINK
  </button>
)}


          <div className="grid grid-cols-3 gap-2 mb-10 text-center">
            <div className="flex flex-col items-center"><img src={googleImg} className="w-12 h-12 mb-2" alt="1" /><p className="text-[10px]"><strong>1. Login</strong><br />Google Signup</p></div>
            <div className="flex flex-col items-center"><img src={account} className="w-12 h-12 mb-2" alt="2" /><p className="text-[10px]"><strong>2. Activate</strong><br />Pay fee</p></div>
            <div className="flex flex-col items-center"><img src={share} className="w-12 h-12 mb-2" alt="3" /><p className="text-[10px]"><strong>3. Earn</strong><br />Get Points</p></div>
          </div>

          {/* {isWithin30Days && (
            <div className="w-full bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 p-6 rounded-2xl shadow-xl border-2 border-amber-600 mb-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 opacity-10 text-6xl">💎</div>
              <div className="text-center md:text-left">
                <h2 className="text-amber-900 font-extrabold text-lg uppercase tracking-tighter italic">
                  {scratchType === "referral" ? "✨ Referral Reward ✨" : "✨ Daily Lucky Coupon ✨"}
                </h2>
                <p className="text-amber-800 text-xs mb-1 font-semibold tracking-tighter">
                  Potential Points: <span className="text-xl font-black text-amber-950">
                    {scratchType === "referral" ? "20,000" : (pointsEarned > 0 ? pointsEarned.toLocaleString() : "...")}
                  </span>
                </p>
                {userData?.scratchCardsBalance > 0 && (
                  <div className="bg-red-600 text-white text-[9px] px-2 py-0.5 rounded-full inline-block font-bold mb-3 animate-bounce">
                    🔥 {userData.scratchCardsBalance} EXTRA COUPONS!
                  </div>
                )}
                <div className="block mt-2">
                  <button onClick={handleClaimPointsToCash} className={`px-4 py-2 rounded-lg font-bold shadow-lg transition text-sm
                     ${userData?.isActivate === 'active' && userData?.pointsBalance >= 1000 ? "bg-amber-950 text-white hover:bg-black" : "bg-gray-400 text-gray-200 cursor-not-allowed"}`}>
                    {userData?.pointsBalance >= 1000 ? "CLAIM CASH (₹)" : "MIN 1000 PTS"}
                  </button>
                </div>
              </div>

              <div className="bg-white/40 p-2 rounded-xl backdrop-blur-sm border border-white/50 min-w-[280px] flex flex-col items-center justify-center min-h-[160px]">
                { (userData?.isActivate === 'inactive' ||
  userData?.isActivate === 'reject') ? (
                  <div className="text-center py-6"><span className="text-4xl mb-2 block">🔒</span><p className="text-amber-900 font-black text-[10px] uppercase">Locked</p></div>
                ) : 
                canScratch ? (
                  <div className="flex flex-col items-center">
                    <ScratchCard
                      width={260}
                      height={130}
                      
                      revealPercent={60}
                      rewardValue={
                        scratchType === "referral"
                          ? "20,000 Points"
                          : `${pointsEarned.toLocaleString()} Points`
                      }
                      onComplete={handleScratchComplete}
                    />
                    <p className="mt-2 text-amber-900 font-black text-[10px] animate-pulse uppercase tracking-widest text-center">
                      {scratchType === "referral" ? "🎁 REFERRAL BONUS: 20,000 PTS 🎁" : "Scratch Daily Reward 👆"}
                    </p>
                  </div>
                ) 
                : (
                  <div className="text-center py-6 px-10">
                    <p className="text-amber-900 font-bold text-sm tracking-tight leading-tight">Next daily coupon in:</p>
                    <div className="bg-amber-900/20 text-amber-900 px-4 py-2 rounded-lg mt-2 font-mono text-2xl font-black inline-block tracking-tighter">{timeLeft}</div>
                  </div>
                )}
              </div>

            </div>
          )} */}

          {/* <div className="grid grid-cols-2 gap-px bg-gray-200 border border-gray-200 rounded-xl overflow-hidden mb-8 shadow-sm text-center">
            <div className="bg-white p-4 border-r border-b"><p className="text-gray-400 text-[10px] uppercase font-bold tracking-tighter">Points Balance</p><p className="text-2xl font-black text-amber-600">{userData?.pointsBalance || 0}</p></div>
            <div className="bg-white p-4 border-b"><p className="text-gray-400 text-[10px] uppercase font-bold tracking-tighter">Money Wallet (₹)</p><p className="text-2xl font-black text-blue-600">₹{userData?.walletAmount || 0}</p></div>
            <div className="bg-white p-4 border-r"><p className="text-gray-400 text-[10px] uppercase font-bold tracking-tighter">Active Referrals</p><p className="text-xl font-bold text-green-600">{userData?.activeReferralsCount || 0}</p></div>
            <div className="bg-white p-4"><p className="text-gray-400 text-[10px] uppercase font-bold tracking-tighter">Min. Withdrawal</p><p className="text-xl font-bold text-gray-800">₹200</p></div>
          </div> */}

          {/* {(userData?.isActivate=='active') && (
            <div className="bg-blue-50 p-4 rounded-xl border border-dashed border-blue-300 mb-6 text-center">
              <p className="text-[10px] text-blue-400 font-bold uppercase mb-1 tracking-widest">Your Referral Link & Code</p>
              <p className="text-xs font-mono text-blue-700 font-bold break-all mb-1">{import.meta.env.VITE_WEBSITE_URL}/signup?ref={userData.referralCode}</p>
              <p className="text-[10px] text-gray-500 italic uppercase">Code: <span className="text-blue-600 font-black">{userData.referralCode}</span></p>
            </div>
          )} */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button disabled={ userData?.isActivate === 'inactive' || userData?.isActivate === 'reject'} className="flex items-center gap-2 bg-green-500 text-white px-6 py-2 rounded-full font-bold shadow-md disabled:opacity-50 text-xs" onClick={() => window.open(`https://wa.me/?text=Join and earn rewards: ${import.meta.env.VITE_WEBSITE_URL}/signup?ref=${userData.referralCode}`, "_blank")}>
              <img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" className="w-4 h-4" alt="wa" /> WhatsApp
            </button>
            <button disabled={ userData?.isActivate === 'inactive' || userData?.isActivate === 'reject'} onClick={copyReferral} className="flex items-center gap-2 bg-gray-700 text-white px-6 py-2 rounded-full font-bold shadow-md disabled:opacity-50 text-xs uppercase">
              <img src="https://cdn-icons-png.flaticon.com/512/60/60990.png" className="w-4 h-4" alt="copy" /> {copied ? "COPIED!" : "COPY LINK"}
            </button>
            <button disabled={  userData?.isActivate === 'inactive' || userData?.isActivate === 'reject'} onClick={handleInst} className="flex items-center gap-2 bg-pink-500 text-white px-6 py-2 rounded-full font-bold shadow-md disabled:opacity-50 text-xs">
              <img src="https://cdn-icons-png.flaticon.com/512/1384/1384063.png" className="w-4 h-4" alt="ig" /> INSTAGRAM
            </button>
          </div>

          <button onClick={() => setShowModal(true)} disabled={userData?.walletAmount < 200} className={`w-full py-4 rounded-2xl font-black text-lg shadow-xl mb-4 transition-all transform active:scale-95 ${userData?.walletAmount >= 200 ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}>WITHDRAW MONEY (₹)</button>
          <p className="text-center text-gray-400 font-bold text-[10px] uppercase tracking-widest italic">Total Withdrawn: ₹{userData?.totalAmount || 0}</p>
        </div>
      </div>

      {/* --- MODALS --- */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-center">Withdraw Funds</h2>
            <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full border p-3 rounded mb-3 text-sm" />
            <input type="text" placeholder="Bank Account Number" value={bankAccountName} onChange={(e) => setBankAccountName(e.target.value)} className="w-full border p-3 rounded mb-3 text-sm" />
            <input type="text" placeholder="IFSC Code" value={ifscCode} onChange={(e) => setIfscCode(e.target.value)} className="w-full border p-3 rounded mb-6 text-sm" />
            <div className="flex gap-4">
              <button onClick={() => setShowModal(false)} className="flex-1 bg-gray-100 py-2 rounded font-bold">Cancel</button>
              <button onClick={withdrawReq} className="flex-1 bg-blue-500 text-white py-2 rounded font-bold">Confirm</button>
            </div>
          </div>
        </div>
      )}

      {showQR && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4 text-center">
          <div className="bg-white rounded-3xl p-8 shadow-2xl w-full max-w-md border-t-8 border-blue-600">
            <h2 className="text-sm font-black mb-1 uppercase tracking-widest">SCAN & PAY ₹200</h2>
            <div className="flex justify-center my-6"><img src={`${import.meta.env.VITE_APP_API_BASE_URL}${paymentConfig?.imageName}`} alt="QR" className="w-56 h-56 border p-2 rounded-2xl shadow-inner" /></div>
            <p className="font-mono bg-gray-50 py-2 rounded-lg text-blue-600 font-bold mb-4 text-xs tracking-wider">{paymentConfig?.upiId}</p>
            <button onClick={handleProceedToProof} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold uppercase text-sm">I HAVE PAID — NEXT</button>
            <button onClick={() => setShowQR(false)} className="mt-4 text-gray-400 font-bold text-[10px] uppercase">Cancel</button>
          </div>
        </div>
      )}

      {paymentModel && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
            <h2 className="text-2xl font-black mb-6 text-gray-800 text-center uppercase text-blue-700">SUBMIT PROOF</h2>
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
            <button onClick={submitPaymentProof} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold uppercase text-sm">SUBMIT FOR REVIEW</button>
            <button onClick={() => setPaymentModel(false)} className="w-full mt-4 text-gray-400 text-center font-bold text-[10px] uppercase">Back</button>
          </div>
        </div>
      )}
    </section>
  );
}