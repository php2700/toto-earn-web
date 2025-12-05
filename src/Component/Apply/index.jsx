import { useEffect, useState } from "react";
import bgImg from "../../assets/h1_hero.jpg";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../Store/userSlice";
import { toast } from "react-toastify";
import account from "../../assets/account.png";
import googleImg from "../../assets/google.png";
import share from "../../assets/share.png";
import qrImg from "../../assets/qr.svg";

export default function Apply() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("totoToken");
  const { userData } = useSelector((state) => state.user);
  const [copied, setCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [bankAccountName, setBankAccountName] = useState("");
  const [message, setMessage] = useState("");
  const userId = localStorage.getItem("userId");
  const [paymentModel, setPaymentModel] = useState(false);
  const [utrNumber, setUtrNumber] = useState("");
  const [paymentImage, setPaymentImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [showQR, setShowQR] = useState(false);
  const [paymentConfig, setPaymentConfig] = useState();
  const [modalError, setModelError] = useState();

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  const handleActivateClick = async () => {
    try {
      setShowQR(true);
    } catch (err) {
      console.error("Payment Error:", err);
      toast.error(err, {
        position: "top-right",
      });
    }
  };

  const getPaymentDetails = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API_BASE_URL}api/user/payment-config`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res?.data);
      setPaymentConfig(res?.data);
    } catch (error) {
      toast.error(
        error.response.data?.message || error.message || "something went wrong",
        {
          position: "top-right",
        }
      );
    }
  };

  useEffect(() => {
    getPaymentDetails();
  }, []);

  const handleProceedToProof = () => {
    setShowQR(false);
    setPaymentModel(true);
  };

  const copyReferral = async () => {
    if (!userData?.referralCode) return;
    try {
      const websiteUrl = import.meta.env.VITE_WEBSITE_URL;
      const referralLink = `${websiteUrl}/signup?ref=${userData.referralCode}`;
      const message = `${referralLink}`;
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleInst = () => {
    if (!userData?.referralCode) {
      toast.error("refer code not available", {
        position: "top-right",
      });
      return;
    }
    const websiteUrl = import.meta.env.VITE_WEBSITE_URL;
    const referralLink = `${websiteUrl}/signup?ref=${userData.referralCode}`;
    const message = `Hey! Join this website and use my referral code. ${referralLink}`;

    navigator.clipboard.writeText(message).then(() => {
      window.open("https://www.instagram.com/direct/inbox/", "_blank");
    });
  };

  const withdrawReq = async () => {
    try {
      if (userData?.walletAmount < amount) {
        setModelError("Amount can not be greate than Availble amount");
        setTimeout(() => {
          setModelError("");
        }, 1500);
        return;
      }
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_BASE_URL}api/user/withdraw`,
        {
          userId,
          amount: Number(amount),
          bankAccountName: bankAccountName,
          ifscCode:ifscCode
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if(response?.data){
      toast.success("Withdraw Request Sent", {
        position: "top-right",
      });
      setShowModal(false);
      setAmount("");
        }
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Something went wrong. Try again."
      );
      toast.error(
        error.response?.data?.message || "Something went wrong. Try again.",
        {
          position: "top-right",
        }
      );
    }
  };

  const submitPaymentProof = async () => {
    if (!utrNumber && !paymentImage) {
      toast.error("Please provide either a UTR number or a screenshot.");
      return;
    }

    const formData = new FormData();
    formData.append("userId", userData?._id);
    if (utrNumber) formData.append("utrNumber", utrNumber);
    if (paymentImage) formData.append("paymentImage", paymentImage);

    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_APP_API_BASE_URL}api/user/payment-proof`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 200) {
        toast.success("Payment proof submitted successfully!");
        setPaymentModel(false);
        dispatch(fetchUserData());
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <section className="w-full pt-16">
      <div
        className="h-[50vh] flex items-center justify-center bg-grid"
        style={{ backgroundImage: `url(${bgImg})` }}
      >
        <h1 className="text-6xl font-bold text-gray-800">REFER & EARN</h1>
      </div>

      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
          <h1 className="text-2xl font-bold text-center mb-4">
            Refer & Earn – Earn ₹200 for Every Friend! 💰
          </h1>
          <p className="text-center text-gray-600 mb-4">
            Refer & Earn – Earn ₹200 for Every Friend! 💰 Join now, pay ₹200
            activation fee (only once) and get ₹100 signup bonus instantly!
            Share your referral link — every time your friend joins and
            activates, you earn ₹200 instantly in your account! 💸 One-time
            payment → Lifetime free earning opportunity!
          </p>

          {userData?.isActivate ? (
            <button className="w-full bg-blue-500 text-white py-2 rounded-lg mb-6">
              Active User
            </button>
          ) : userData?.utrNumber || userData?.paymentImage ? (
            <button className="w-full bg-blue-500 text-white py-2 rounded-lg mb-6">
              Wait For Active Account
            </button>
          ) : (
            <button
              onClick={handleActivateClick}
              className="w-full bg-blue-500 text-white py-2 rounded-lg mb-6"
            >
              Activate & Get Link
            </button>
          )}

          <h2 className="text-xl font-semibold text-center mb-4">
            How it Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 text-center">
            <div>
              <div
                className=" rounded-full inline-flex items-center justify-center mb-3 mx-auto"
                style={{ width: 64, height: 64 }}
              >
                <img src={googleImg} alt="Google" />
              </div>
              <p className="text-gray-800">
                <strong>Login / Sign Up</strong>
                <br />
                Login instantly with 1-click Google Login.
              </p>
            </div>

            <div>
              <div
                className="  inline-flex items-center justify-center mb-3 mx-auto"
                style={{ width: 64, height: 64 }}
              >
                <img src={account} alt="Payment" />
              </div>
              <p className="text-gray-800">
                <strong>Activate Account ₹100</strong>
                <br />
                Once the payment is completed, your referral link will be
                unlocked instantly.
              </p>
            </div>

            {/* 3. Share & Earn */}
            <div>
              <div
                className="  rounded-full inline-flex items-center justify-center mb-3 mx-auto "
                style={{ width: 64, height: 64 }}
              >
                <img src={share} alt="Share" />
              </div>
              <p className="text-gray-800">
                <strong>Share & Earn</strong>
                <br />
                Share your referral link on WhatsApp, Instagram, and other
                social platforms. Earn ₹200 for every successful payment made
                through your link!
              </p>
            </div>
          </div>

          <h2 className="w-full bg-blue-500 text-center text-semibold text-white py-2 rounded-lg mb-6">
            Wallet & Referral Overview
          </h2>
          <div className="grid grid-cols-2 gap-4 text-center mb-4">
            <div>
              <p>
                Wallet Balance <br />
                <span className="font-bold">{userData?.walletAmount}</span>
              </p>
            </div>
            <div>
              <p>
                Active Referrals <br />
                <span className="font-bold">
                  {userData?.activeReferralsCount}
                </span>
              </p>
            </div>
            <div>
              <p>
                Pending Referrals <br />
                <span className="font-bold">
                  {userData?.inactiveReferralsCount}
                </span>
              </p>
            </div>
            <div>
              <p>
                Min. Withdrawal <br />
                <span className="font-bold">₹200</span>
              </p>
            </div>
          </div>
          <div className="text-center mb-4">
            {userData?.isActivate && (
              <p className="font-medium">
                REFERRAL CODE : {userData?.referralCode}
              </p>
            )}
            <div className="flex flex-col md:flex-row justify-center space-x-4 m-2 gap-4 items-center">
              <button
                disabled={!userData?.isActivate}
                className={`flex items-center gap-2 bg-green-500 text-white py-1 px-3 rounded 
                   ${
                     userData?.isActivate
                       ? "bg-green-500 hover:bg-green-600 text-white cursor-pointer"
                       : "bg-gray-300 text-gray-500 cursor-not-allowed"
                   }
                  `}
                onClick={() => {
                  if (!userData?.referralCode) {
                    toast.error("refer code not available", {
                      position: "top-right",
                    });
                    return;
                  }
                  const websiteUrl = `${import.meta.env.VITE_WEBSITE_URL}`;
                  const referralLink = `${websiteUrl}/signup?ref=${userData.referralCode}`;
                  const message = `Join this website using my referral link: ${referralLink}`;

                  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
                    message
                  )}`;
                  window.open(whatsappUrl, "_blank");
                }}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
                  alt="WhatsApp"
                  className="w-4 h-4"
                />
                WhatsApp
              </button>
              <button
                disabled={!userData?.isActivate}
                onClick={copyReferral}
                className={`flex items-center gap-2 py-1 px-3 rounded transition
    ${
      userData?.isActivate
        ? "bg-gray-500 hover:bg-gray-600 text-white cursor-pointer"
        : "bg-gray-300 text-gray-500 cursor-not-allowed"
    }`}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/60/60990.png"
                  alt="Copy"
                  className="w-4 h-4"
                />
                {copied ? "Copied" : "Copy"}
              </button>

              <button
                onClick={handleInst}
                disabled={!userData?.isActivate}
                className={`flex items-center gap-2 py-1 px-3 rounded transition
                  ${
                    userData?.isActivate
                      ? "bg-pink-500 hover:bg-pink-600 text-white cursor-pointer"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }
    
  `}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1384/1384063.png"
                  alt="Instagram"
                  className="w-4 h-4"
                />
                Instagram
              </button>
            </div>
          </div>

          <button
            onClick={() => setShowModal(true)}
            disabled={userData?.walletAmount <= 200}
            className={`w-full py-2 rounded-lg mb-4 text-white
              ${
                userData?.walletAmount >= 200
                  ? "bg-blue-500 hover:bg-blue-600 cursor-pointer"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
          >
            Withdraw
          </button>

          <p className="text-center text-gray-600">
            Total Withdraw : {userData?.totalAmount}
          </p>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-11/12 max-w-md relative">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">
              Withdraw Amount
            </h2>
            {modalError && (
              <h2 className="bg-red-500 text-white text-center my-4 p-2 rounded">
                Amount not Available!
              </h2>
            )}

            <label>Availble Amount</label>
            <input
              type="text"
              placeholder="Enter amount"
              value={userData?.walletAmount}
              readOnly
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <label>Amount</label>
            <input
              type="text"
              placeholder="Enter amount"
              value={amount}
              required
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <label>Bank Account Name</label>
            <input
              type="text"
              placeholder="Bank Account Name"
              value={bankAccountName}
              required
              onChange={(e) => setBankAccountName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <label>IFSC code</label>
            <input
              type="text"
              placeholder="IFSC code"
              value={ifscCode}
              required
              onChange={(e) => setIfscCode(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <div className="flex justify-between">
              <button
                onClick={() => {
                  setAmount();
                  setBankAccountName();
                  setIfscCode();
                  setShowModal(false);
                }}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>

              <button
                onClick={withdrawReq}
                disabled={!amount}
                className={`px-4 py-2 rounded-lg text-white font-semibold transition ${
                  amount
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "bg-blue-300 cursor-not-allowed"
                }`}
              >
                Confirm Withdraw
              </button>
            </div>
          </div>
        </div>
      )}

      {showQR && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-2xl p-6 shadow-lg w-11/12 max-w-md">
            <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">
              Scan & Pay
            </h2>
            {console.log(
              `${import.meta.env.VITE_APP_API_BASE_URL}${
                paymentConfig.imageName
              }`
            )}
            <div className="flex justify-center">
              <img
                src={`${import.meta.env.VITE_APP_API_BASE_URL}${
                  paymentConfig.imageName
                }`}
                alt="Payment QR"
                className="w-60 h-60 object-contain mb-4 border rounded-lg"
              />
            </div>
            <a
              href={`upi://pay?pa=${paymentConfig?.bankAccountName}&pn=${
                paymentConfig.name
              }&am=${Number(paymentConfig.amount)}&cu=${
                paymentConfig.currency
              }`}
              className="block text-center text-blue-500 underline mb-4"
            >
              Click to Pay using UPI app
            </a>
            <div className="flex flex-col gap-4">
              <button
                onClick={handleProceedToProof}
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
              >
                I Have Paid — Next
              </button>
              <button
                onClick={() => setShowQR(false)}
                className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {paymentModel && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-11/12 max-w-md relative">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
              Payment Proof
            </h2>

            <label className="block text-gray-700 font-medium mb-2">
              UTR Number (optional)
            </label>
            <input
              type="text"
              placeholder="Enter UTR number"
              value={utrNumber}
              onChange={(e) => {
                setUtrNumber(e.target.value);
                if (e.target.value) {
                  setPaymentImage(null);
                  setPreviewImage(null);
                }
              }}
              disabled={!!paymentImage}
              className={`w-full border rounded-lg px-3 py-2 mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                paymentImage
                  ? "bg-gray-100 cursor-not-allowed"
                  : "border-gray-300"
              }`}
            />

            <label className="block text-gray-700 font-medium mb-2">
              Upload Screenshot (optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                setPaymentImage(file);
                if (file) {
                  setUtrNumber("");
                  const reader = new FileReader();
                  reader.onloadend = () => setPreviewImage(reader.result);
                  reader.readAsDataURL(file);
                } else {
                  setPreviewImage(null);
                }
              }}
              disabled={!!utrNumber}
              className={`w-full border rounded-lg px-3 py-2 mb-4 focus:outline-none ${
                utrNumber ? "bg-gray-100 cursor-not-allowed" : "border-gray-300"
              }`}
            />

            {previewImage && (
              <div className="mb-4">
                <p className="text-gray-600 text-sm mb-2">Preview:</p>
                <img
                  src={previewImage}
                  alt="Payment Screenshot"
                  className="w-full h-48 object-contain rounded-lg border border-gray-300"
                />
              </div>
            )}

            <div className="flex justify-between mt-4">
              <button
                onClick={() => setPaymentModel(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={submitPaymentProof}
                disabled={!utrNumber && !paymentImage}
                className={`px-4 py-2 rounded-lg text-white font-semibold transition ${
                  utrNumber || paymentImage
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "bg-blue-300 cursor-not-allowed"
                }`}
              >
                Submit Proof
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
