import { motion } from "motion/react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Calendar, CreditCard } from "lucide-react";

export default function Checkout() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Mock item data
  const item = {
    name: "Silk Evening Gown",
    brand: "Reformation",
    tags: 2,
    rentalFee: 45,
    deposit: 200,
  };

  const availableTags = 4;
  const hasEnoughTags = availableTags >= item.tags;

  return (
    <div className="min-h-screen bg-[rgba(230,225,220,0.37)] pt-24 pb-16">
      <div className="container mx-auto px-6 max-w-[800px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-['Libre_Caslon_Display',sans-serif] text-4xl mb-8">
            Complete Your Rental
          </h1>

          <div className="space-y-6">
            {/* Item Summary */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="font-['Libre_Caslon_Display',sans-serif] text-2xl mb-4">
                Rental Summary
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-['Inter',sans-serif]">{item.name}</span>
                  <span className="font-['Inter',sans-serif]">{item.brand}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between mb-2">
                    <span className="font-['Inter',sans-serif] text-gray-600">
                      Rental Fee
                    </span>
                    <span className="font-['Inter',sans-serif]">
                      ${item.rentalFee}
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="font-['Inter',sans-serif] text-gray-600">
                      Tags Required
                    </span>
                    <span className="font-['Inter',sans-serif]">
                      {item.tags} tags
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="font-['Inter',sans-serif] text-gray-600">
                      Security Deposit
                    </span>
                    <span className="font-['Inter',sans-serif]">
                      ${item.deposit}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Rental Dates */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="font-['Libre_Caslon_Display',sans-serif] text-2xl mb-4 flex items-center gap-2">
                <Calendar className="w-6 h-6" />
                Select Dates
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-['Inter',sans-serif] text-sm mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e1d0d2]"
                  />
                </div>
                <div>
                  <label className="block font-['Inter',sans-serif] text-sm mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e1d0d2]"
                  />
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-['Libre_Caslon_Display',sans-serif] text-2xl">
                  Your Tags
                </h2>
                <span className={`font-['Inter',sans-serif] text-lg ${hasEnoughTags ? 'text-green-600' : 'text-red-600'}`}>
                  {availableTags} / {item.tags} required
                </span>
              </div>
              {!hasEnoughTags && (
                <div>
                  <p className="font-['Inter',sans-serif] text-sm text-red-600 mb-3">
                    You need more tags to complete this rental.
                  </p>
                  <motion.button
                    onClick={() => navigate("/buy-credits")}
                    className="font-['Libre_Caslon_Display',sans-serif] text-sm underline hover:text-gray-600"
                    whileHover={{ scale: 1.05 }}
                  >
                    Buy More Tags
                  </motion.button>
                </div>
              )}
            </div>

            {/* Payment */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="font-['Libre_Caslon_Display',sans-serif] text-2xl mb-4 flex items-center gap-2">
                <CreditCard className="w-6 h-6" />
                Payment
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block font-['Inter',sans-serif] text-sm mb-2">
                    Card Number
                  </label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e1d0d2]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-['Inter',sans-serif] text-sm mb-2">
                      Expiry
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e1d0d2]"
                    />
                  </div>
                  <div>
                    <label className="block font-['Inter',sans-serif] text-sm mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e1d0d2]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Total */}
            <div className="bg-black text-white rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="font-['Libre_Caslon_Display',sans-serif] text-2xl">
                  Total Due Today
                </span>
                <span className="font-['Libre_Caslon_Display',sans-serif] text-3xl">
                  ${item.rentalFee + item.deposit}
                </span>
              </div>
              <p className="font-['Inter',sans-serif] text-sm text-gray-300">
                Deposit of ${item.deposit} will be refunded after item return
              </p>
            </div>

            {/* Confirm Button */}
            <motion.button
              onClick={() => navigate("/dashboard")}
              disabled={!hasEnoughTags || !startDate || !endDate}
              className="w-full bg-[#e1d0d2] text-black font-['Libre_Caslon_Display',sans-serif] py-4 rounded-lg text-xl disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={hasEnoughTags ? { scale: 1.02 } : {}}
              whileTap={hasEnoughTags ? { scale: 0.98 } : {}}
            >
              Confirm Rental
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
