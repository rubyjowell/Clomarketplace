import { motion } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Camera, CreditCard, Star, Instagram, Upload, X } from "lucide-react";

export default function Profile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "Sarah Mitchell",
    email: "sarah@college.edu",
    college: "University of California",
    size: "M",
    instagram: "@sarahmitchell",
  });

  const [asSeenOn, setAsSeenOn] = useState([
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwb3V0Zml0JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzMzMjk0ODU4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      itemName: "Silk Evening Gown",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwc3R5bGUlMjBwb3J0cmFpdHxlbnwxfHx8fDE3MzMyOTQ4NjB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      itemName: "Leather Jacket",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwcG9ydHJhaXQlMjB3b21hbnxlbnwxfHx8fDE3MzMyOTQ4NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      itemName: "Evening Dress",
    },
  ]);

  const [instagramConnected, setInstagramConnected] = useState(true);

  const stats = {
    tags: 4,
    rentals: 12,
    listings: 2,
    rating: 4.9,
  };

  const removePhoto = (id: number) => {
    setAsSeenOn(asSeenOn.filter((photo) => photo.id !== id));
  };

  return (
    <div className="min-h-screen bg-[rgba(230,225,220,0.37)] pt-24 pb-16">
      <div className="container mx-auto px-6 max-w-[800px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-['Libre_Caslon_Display',sans-serif] text-4xl mb-8">
            Your Profile
          </h1>

          {/* Profile Photo */}
          <div className="bg-white rounded-lg p-6 mb-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#e1d0d2] to-[rgba(230,225,220,0.37)] flex items-center justify-center">
                  <span className="font-['Libre_Caslon_Display',sans-serif] text-3xl text-gray-600">
                    {formData.name.charAt(0)}
                  </span>
                </div>
                <button className="absolute bottom-0 right-0 bg-black text-white p-2 rounded-full">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div>
                <h2 className="font-['Libre_Caslon_Display',sans-serif] text-2xl mb-1">
                  {formData.name}
                </h2>
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-['Inter',sans-serif] text-sm">
                    {stats.rating} rating
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-lg p-4 text-center cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate("/buy-credits")}>
              <p className="font-['Libre_Caslon_Display',sans-serif] text-3xl mb-1">
                {stats.tags}
              </p>
              <p className="font-['Inter',sans-serif] text-sm text-gray-600">
                Tags
              </p>
              <p className="font-['Inter',sans-serif] text-xs text-black mt-2 underline">
                Buy More
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <p className="font-['Libre_Caslon_Display',sans-serif] text-3xl mb-1">
                {stats.rentals}
              </p>
              <p className="font-['Inter',sans-serif] text-sm text-gray-600">
                Rentals
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <p className="font-['Libre_Caslon_Display',sans-serif] text-3xl mb-1">
                {stats.listings}
              </p>
              <p className="font-['Inter',sans-serif] text-sm text-gray-600">
                Listed
              </p>
            </div>
          </div>

          {/* Personal Info */}
          <div className="bg-white rounded-lg p-6 mb-6">
            <h2 className="font-['Libre_Caslon_Display',sans-serif] text-xl mb-4">
              Personal Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block font-['Inter',sans-serif] text-sm mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e1d0d2]"
                />
              </div>
              <div>
                <label className="block font-['Inter',sans-serif] text-sm mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e1d0d2]"
                />
              </div>
              <div>
                <label className="block font-['Inter',sans-serif] text-sm mb-2">
                  College/University
                </label>
                <input
                  type="text"
                  value={formData.college}
                  onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e1d0d2]"
                />
              </div>
              <div>
                <label className="block font-['Inter',sans-serif] text-sm mb-2">
                  Clothing Size
                </label>
                <select
                  value={formData.size}
                  onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e1d0d2]"
                >
                  <option value="XS">XS</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                </select>
              </div>
              <div>
                <label className="block font-['Inter',sans-serif] text-sm mb-2">
                  Instagram
                </label>
                <input
                  type="text"
                  value={formData.instagram}
                  onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e1d0d2]"
                />
              </div>
            </div>
          </div>

          {/* Membership */}
          <div className="bg-white rounded-lg p-6 mb-6">
            <h2 className="font-['Libre_Caslon_Display',sans-serif] text-xl mb-4">
              Membership
            </h2>
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="font-['Inter',sans-serif] mb-1">
                  Premium Member
                </p>
                <p className="font-['Inter',sans-serif] text-sm text-gray-600">
                  $25/month · 4 tags per month
                </p>
              </div>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-['Inter',sans-serif]">
                Active
              </span>
            </div>
            <p className="font-['Inter',sans-serif] text-sm text-gray-600 mb-4">
              Next renewal: April 12, 2026
            </p>
          </div>

          {/* Stripe Account */}
          <div className="bg-white rounded-lg p-6 mb-6">
            <h2 className="font-['Libre_Caslon_Display',sans-serif] text-xl mb-4 flex items-center gap-2">
              <CreditCard className="w-6 h-6" />
              Stripe Account
            </h2>
            <p className="font-['Inter',sans-serif] text-sm text-gray-600 mb-4">
              Connect your Stripe account to receive payouts from rentals
            </p>
            <motion.button
              className="bg-[#635bff] text-white font-['Inter',sans-serif] px-6 py-3 rounded-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Connect Stripe
            </motion.button>
          </div>

          {/* As Seen On */}
          <div className="bg-white rounded-lg p-6 mb-6">
            <h2 className="font-['Libre_Caslon_Display',sans-serif] text-xl mb-4 flex items-center gap-2">
              <Instagram className="w-6 h-6" />
              As Seen On
            </h2>
            <p className="font-['Inter',sans-serif] text-sm text-gray-600 mb-4">
              Add photos of your items as seen on Instagram
            </p>
            <div className="grid grid-cols-3 gap-4">
              {asSeenOn.map((photo) => (
                <div key={photo.id} className="relative">
                  <img
                    src={photo.image}
                    alt={photo.itemName}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <button
                    className="absolute top-1 right-1 bg-black text-white p-1 rounded-full"
                    onClick={() => removePhoto(photo.id)}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              <div className="relative">
                <div className="w-full h-24 bg-gray-100 flex items-center justify-center rounded-lg">
                  <Upload className="w-6 h-6 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <motion.button
            className="w-full bg-black text-white font-['Libre_Caslon_Display',sans-serif] py-4 rounded-lg text-xl"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Save Changes
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}