import { useEffect, useState } from "react";
import bgImg from "../../assets/h1_hero.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddBankDetail() {
  const navigate = useNavigate();
  const token = localStorage.getItem("loanToken");
  const userId = localStorage.getItem("userId");
  const [formData, setFormData] = useState({
    accountHolderName: "",
    accountNumber: "",
    ifscCode: "",
    bankName: "",
    branchName: "",
  });

  const getBankDetail = async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_APP_API_BASE_URL
        }api/user/bank-detail/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response?.data);
      if (response.data?.bankDetail) {
        setFormData({
          accountHolderName: response.data.bankDetail.accountHolderName || "",
          accountNumber: response.data.bankDetail.accountNumber || "",
          ifscCode: response.data.bankDetail.ifscCode || "",
          bankName: response.data.bankDetail.bankName || "",
          branchName: response.data.bankDetail.branchName || "",
        });
      }
    } catch (error) {
      console.error("Error fetching bank detail:", error);
    }
  };

  useEffect(() => {
    getBankDetail();
  }, []);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");
  };

  const validateForm = () => {
    if (!formData.accountHolderName.trim())
      return "Account holder name is required";
    if (!formData.accountNumber.trim()) return "Account number is required";
    if (!formData.ifscCode.trim()) return "IFSC Code is required";
    if (!formData.bankName.trim()) return "Bank name is required";
    if (!formData.branchName.trim()) return "Branch name is required";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_BASE_URL}api/user/add-bank-detail`,
        { ...formData, userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccess(response?.data?.message);

      navigate("/add-bank-detail");
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full pt-16">
      <div
        className="h-[40vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImg})` }}
      >
        <h1 className="text-5xl font-bold text-gray-800">
          Update Bank Details
        </h1>
      </div>

      <div className="bg-gray-100 p-8">
        <form
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-xl"
        >
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
              {success}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold">
                * Account Holder Name
              </label>
              <input
                type="text"
                name="accountHolderName"
                value={formData.accountHolderName}
                onChange={handleChange}
                placeholder="Enter account holder name"
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block font-semibold">* Account Number</label>
              <input
                type="text"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
                placeholder="Enter account number"
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block font-semibold">* IFSC Code</label>
              <input
                type="text"
                name="ifscCode"
                value={formData.ifscCode}
                onChange={handleChange}
                placeholder="Enter IFSC code"
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block font-semibold">* Bank Name</label>
              <input
                type="text"
                name="bankName"
                value={formData.bankName}
                onChange={handleChange}
                placeholder="Enter bank name"
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block font-semibold">* Branch Name</label>
              <input
                type="text"
                name="branchName"
                value={formData.branchName}
                onChange={handleChange}
                placeholder="Enter branch name"
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto px-6 py-2 bg-[#0C3B57] text-white font-semibold rounded disabled:opacity-50"
            >
              {loading ? "Saving..." : "Update Bank Details"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
