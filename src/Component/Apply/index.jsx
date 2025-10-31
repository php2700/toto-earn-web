import { useEffect, useState } from "react";
import bgImg from "../../assets/h1_hero.jpg";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../Store/userSlice";
import { toast } from "react-toastify";
import account from "../../assets/account.png";
import googleImg from "../../assets/google.png";
import share from "../../assets/share.png";

export default function Apply() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("totoToken");
  const { userData } = useSelector((state) => state.user);
  const [copied, setCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleActivateClick = async () => {
    const res = await loadRazorpayScript();
    if (!res) {
      return;
    }
    try {
      const { data: order } = await axios.post(
        `${import.meta.env.VITE_APP_API_BASE_URL}createOrder`,
        {
          amount: `${import.meta.env.VITE_APP_AMOUNT}`,
          currency: "INR",
        }
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "MyApp",
        description: "Active Account ",
        order_id: order.id,
        handler: async function (response) {
          const verifyRes = await axios.patch(
            `${import.meta.env.VITE_APP_API_BASE_URL}api/user/activate`,
            {
              userId: userData?._id,
              isActivate: true,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (verifyRes) {
            dispatch(fetchUserData());
            toast.success("user activate", {
              position: "top-right",
            });
          } else {
            toast.success("user InActive", {
              position: "top-right",
            });
          }
        },
        prefill: {
          name: userData?.name || "Guest User",
          email: userData?.email || "",
          contact: userData?.phone || "",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment Error:", err);
      toast.error(err, {
        position: "top-right",
      });
    }
  };

  const copyReferral = async () => {
    if (!userData?.referralCode) return;
    try {
      await navigator.clipboard.writeText(userData.referralCode);
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
    const websiteUrl = `${import.meta.env.VITE_WEBSITE_URL}`;
    const referralLink = `${websiteUrl}/signup?ref=${userData.referralCode}`;
    const message = encodeURIComponent(
      `Hey! Join this website and use my referral code. ${referralLink}`
    );
    const instagramUrl = `https://www.instagram.com/direct/inbox/?text=${message}`;

    window.open(instagramUrl, "_blank");
  };

  const withdrawReq = async () => {
    if (!userData?.upiId) {
      toast.error("First Add Upi Id In Edit Profile", {
        position: "top-right",
      });
      return;
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_BASE_URL}api/user/withdraw`,
        {
          userId,
          amount: Number(amount),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Withdraw Request Sent", {
        position: "top-right",
      });
      setShowModal(false);
      setAmount("");
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
            Refer & Earn – Har Friend Pe ₹200 Kamao! 💰
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
                Google se 1-click login karo.
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
                Payment karte hi referral link unlock ho jata hai.
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
                Apna link WhatsApp, Instagram par share karo. Har payment par
                ₹200 earn karo.
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
                <span className="font-bold">₹1200</span>
              </p>
            </div>
          </div>
          <div className="text-center mb-4">
            {userData?.isActivate && (
              <p className="font-medium">
                REFERRAL CODE : {userData?.referralCode}
              </p>
            )}
            <div className="flex justify-center space-x-4 m-2">
              <button
                className="flex items-center gap-2 bg-green-500 text-white py-1 px-3 rounded"
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
                onClick={copyReferral}
                className="flex items-center gap-2 bg-gray-200 text-gray-800 py-1 px-3 rounded"
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
                className="flex items-center gap-2 bg-pink-500 text-white py-1 px-3 rounded"
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
            disabled={userData?.walletAmount <= 1200}
            className={`w-full py-2 rounded-lg mb-4 text-white ${
              userData?.walletAmount > 1200
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
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />

            <div className="flex justify-between">
              <button
                onClick={() => setShowModal(false)}
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
    </section>
  );
}
