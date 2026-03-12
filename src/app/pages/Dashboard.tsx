import { motion } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Package, TrendingUp, Calendar, Plus } from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"items" | "bookings" | "earnings">("items");

  const mockItems = [
    { id: 1, name: "Silk Evening Gown", bookings: 12, earnings: 540 },
    { id: 2, name: "Leather Jacket", bookings: 8, earnings: 480 },
  ];

  const mockBookings = [
    { id: 1, item: "Silk Evening Gown", renter: "Emma K.", dates: "Mar 15-17", status: "upcoming" },
    { id: 2, item: "Leather Jacket", renter: "Olivia R.", dates: "Mar 20-22", status: "upcoming" },
  ];

  const totalEarnings = 1020;
  const pendingPayouts = 245;

  return (
    <div className="min-h-screen bg-[rgba(230,225,220,0.37)] pt-24 pb-16">
      <div className="container mx-auto px-6 max-w-[1400px]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-['Libre_Caslon_Display',sans-serif] text-4xl mb-2">
            Owner Dashboard
          </h1>
          <p className="font-['Inter',sans-serif] text-gray-600">
            Manage your closet and track earnings
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg p-6 shadow-md"
          >
            <div className="flex items-center gap-3 mb-2">
              <Package className="w-6 h-6 text-gray-600" />
              <h3 className="font-['Libre_Caslon_Display',sans-serif] text-xl">
                Listed Items
              </h3>
            </div>
            <p className="font-['Libre_Caslon_Display',sans-serif] text-4xl">
              {mockItems.length}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg p-6 shadow-md"
          >
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-6 h-6 text-gray-600" />
              <h3 className="font-['Libre_Caslon_Display',sans-serif] text-xl">
                Total Earnings
              </h3>
            </div>
            <p className="font-['Libre_Caslon_Display',sans-serif] text-4xl">
              ${totalEarnings}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg p-6 shadow-md"
          >
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-6 h-6 text-gray-600" />
              <h3 className="font-['Libre_Caslon_Display',sans-serif] text-xl">
                Pending Payouts
              </h3>
            </div>
            <p className="font-['Libre_Caslon_Display',sans-serif] text-4xl">
              ${pendingPayouts}
            </p>
          </motion.div>
        </div>

        {/* Add Item Button */}
        <motion.button
          onClick={() => navigate("/list-item")}
          className="mb-6 bg-black text-white font-['Libre_Caslon_Display',sans-serif] px-6 py-3 rounded-lg flex items-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus className="w-5 h-5" />
          List New Item
        </motion.button>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-300">
          {(["items", "bookings", "earnings"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`font-['Inter',sans-serif] pb-3 px-2 capitalize ${
                activeTab === tab
                  ? "border-b-2 border-black"
                  : "text-gray-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "items" && (
          <div className="space-y-4">
            {mockItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-lg p-6 shadow-md"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-['Libre_Caslon_Display',sans-serif] text-xl mb-2">
                      {item.name}
                    </h3>
                    <p className="font-['Inter',sans-serif] text-sm text-gray-600">
                      {item.bookings} total bookings · ${item.earnings} earned
                    </p>
                  </div>
                  <button className="font-['Inter',sans-serif] text-sm underline">
                    Edit
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === "bookings" && (
          <div className="space-y-4">
            {mockBookings.map((booking) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-lg p-6 shadow-md"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-['Libre_Caslon_Display',sans-serif] text-xl mb-1">
                      {booking.item}
                    </h3>
                    <p className="font-['Inter',sans-serif] text-sm text-gray-600 mb-1">
                      Rented by {booking.renter}
                    </p>
                    <p className="font-['Inter',sans-serif] text-sm text-gray-600">
                      {booking.dates}
                    </p>
                  </div>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-['Inter',sans-serif]">
                    {booking.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === "earnings" && (
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b">
                <span className="font-['Inter',sans-serif]">Total Earnings</span>
                <span className="font-['Libre_Caslon_Display',sans-serif] text-2xl">
                  ${totalEarnings}
                </span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b">
                <span className="font-['Inter',sans-serif]">Platform Fee (30%)</span>
                <span className="font-['Inter',sans-serif] text-gray-600">
                  -${(totalEarnings * 0.3).toFixed(0)}
                </span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b">
                <span className="font-['Inter',sans-serif]">Available for Payout</span>
                <span className="font-['Libre_Caslon_Display',sans-serif] text-2xl text-green-600">
                  ${pendingPayouts}
                </span>
              </div>
              <motion.button
                className="w-full bg-black text-white font-['Libre_Caslon_Display',sans-serif] py-3 rounded-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Withdraw to Stripe
              </motion.button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
