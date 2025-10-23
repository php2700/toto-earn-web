import { useState } from "react";
import bgImg from "../../assets/h1_hero.jpg";
import axios from "axios";
import { QRCodeCanvas as QRCode } from "qrcode.react";
import { useNavigate } from "react-router-dom";
import clientScanner from "../../assets/client-scanner.png";
import account from "../../assets/account.png";
import share from "../../assets/share.png";
import google from "../../assets/google.jpg";

export default function Apply() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

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
            Refer & Earn – Har Friend Pe ₹300 Kamao! 💰
          </h1>
          <p className="text-center text-gray-600 mb-4">
            Join karo, ₹100 activate fee do, aur apna referral link share karo!
            Jab koi join kare aur payment kare → payment karo!
          </p>
          <button className="w-full bg-blue-500 text-white py-2 rounded-lg mb-6">
            Start Now
          </button>

          <h2 className="text-xl font-semibold text-center mb-4">
            How it Works
          </h2>

          {/* 3-column steps with real icons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 text-center">
            {/* 1. Google Login */}
            <div>
              <div
                className=" rounded-full inline-flex items-center justify-center mb-3 mx-auto"
                style={{ width: 64, height: 64 }}
              >
                <img src={google} alt="Google" className="w-12 h-12" />
              </div>
              <p className="text-gray-800">
                <strong>Login / Sign Up</strong>
                <br />
                Google se 1-click login karo.
              </p>
            </div>

            {/* 2. Activate Account (Payment) */}
            <div>
              <div
                className="  inline-flex items-center justify-center mb-3 mx-auto"
                style={{ width: 64, height: 64 }}
              >
                <img src={account} alt="Payment" className="w-12 h-12" />
              </div>
              <p className="text-gray-800">
                <strong>Activate Account ₹100</strong>
                <br />
                Payment karo hi referral link unlock ho jata hai.
              </p>
            </div>

            {/* 3. Share & Earn */}
            <div>
              <div
                className="  rounded-full inline-flex items-center justify-center mb-3 mx-auto "
                style={{ width: 64, height: 64 }}
              >
                <img src={share} alt="Share" className="w-12 h-12" />
              </div>
              <p className="text-gray-800">
                <strong>Share & Earn</strong>
                <br />
                Apna link WhatsApp, Instagram par share karo. Har payment par
                ₹300 earn karo.
              </p>
            </div>
          </div>

          <button className="w-full bg-blue-500 text-white py-2 rounded-lg mb-6">
            Activate & Get Link
          </button>

          <h2 className="text-xl font-semibold text-center mb-4">
            Wallet & Referral Overview
          </h2>
          <div className="grid grid-cols-2 gap-4 text-center mb-4">
            <div>
              <p>
                Wallet Balance <br />
                <span className="font-bold">₹1450</span>
              </p>
            </div>
            <div>
              <p>
                Active Referrals <br />
                <span className="font-bold">12</span>
              </p>
            </div>
            <div>
              <p>
                Pending Referrals <br />
                <span className="font-bold">3</span>
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
            <p className="font-medium">fatatrefer.in/?tee#aa12</p>
            <div className="flex justify-center space-x-4 m-2">
              <button className="flex items-center gap-2 bg-green-500 text-white py-1 px-3 rounded">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
                  alt="WhatsApp"
                  className="w-4 h-4"
                />
                WhatsApp
              </button>
              <button className="flex items-center gap-2 bg-gray-200 text-gray-800 py-1 px-3 rounded">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/60/60990.png"
                  alt="Copy"
                  className="w-4 h-4"
                />
                Copy
              </button>
              <button className="flex items-center gap-2 bg-pink-500 text-white py-1 px-3 rounded">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1384/1384063.png"
                  alt="Instagram"
                  className="w-4 h-4"
                />
                Instagram
              </button>
            </div>
          </div>

          <button className="w-full bg-blue-500 text-white py-2 rounded-lg mb-4">
            Withdraw
          </button>
          <p className="text-center text-gray-600">Already 50,000+</p>
        </div>
      </div>
    </section>
  );
}
