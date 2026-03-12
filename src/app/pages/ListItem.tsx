import { motion } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Upload, ArrowLeft } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { projectId, publicAnonKey } from '/utils/supabase/info';

export default function ListItem() {
  const navigate = useNavigate();
  const { user, profile, accessToken } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    size: "",
    category: "dress",
    tags: "1",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-9f30820f`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !accessToken) {
      navigate('/signin');
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          ...formData,
          tags: parseInt(formData.tags),
          ownerName: profile?.fullName || user.email,
          imageUrl: "",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to list item');
      }

      alert('Item listed successfully!');
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[rgba(230,225,220,0.37)] pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <p className="font-['Inter',sans-serif] text-lg mb-4">Please sign in to list items</p>
          <button
            onClick={() => navigate('/signin')}
            className="bg-black text-white px-6 py-2 rounded-lg font-['Inter',sans-serif]"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[rgba(230,225,220,0.37)] pt-24 pb-16">
      <div className="container mx-auto px-6 max-w-[800px]">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 mb-6 font-['Inter',sans-serif] text-gray-600 hover:text-black"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-['Libre_Caslon_Display',sans-serif] text-4xl mb-8">
            List Your Item
          </h1>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 font-['Inter',sans-serif] text-sm">{error}</p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Photos */}
            <div className="bg-white rounded-lg p-6">
              <label className="block font-['Libre_Caslon_Display',sans-serif] text-xl mb-4">
                Photos
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-gray-400 transition-colors cursor-pointer">
                <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="font-['Inter',sans-serif] text-gray-600 mb-2">
                  Click to upload photos
                </p>
                <p className="font-['Inter',sans-serif] text-sm text-gray-400">
                  Add up to 5 photos
                </p>
              </div>
            </div>

            {/* Basic Info */}
            <div className="bg-white rounded-lg p-6 space-y-4">
              <h2 className="font-['Libre_Caslon_Display',sans-serif] text-xl mb-4">
                Item Details
              </h2>

              <div>
                <label className="block font-['Inter',sans-serif] text-sm mb-2">
                  Item Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Silk Evening Gown"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e1d0d2]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-['Inter',sans-serif] text-sm mb-2">
                    Brand
                  </label>
                  <input
                    type="text"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    placeholder="e.g., Reformation"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e1d0d2]"
                  />
                </div>
                <div>
                  <label className="block font-['Inter',sans-serif] text-sm mb-2">
                    Size
                  </label>
                  <input
                    type="text"
                    value={formData.size}
                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                    placeholder="e.g., S, M, L"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e1d0d2]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-['Inter',sans-serif] text-sm mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e1d0d2]"
                >
                  <option value="dress">Dress</option>
                  <option value="top">Top</option>
                  <option value="jacket">Jacket</option>
                  <option value="bag">Bag</option>
                  <option value="accessories">Accessories</option>
                </select>
              </div>

              <div>
                <label className="block font-['Inter',sans-serif] text-sm mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your item..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e1d0d2]"
                />
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-white rounded-lg p-6 space-y-4">
              <h2 className="font-['Libre_Caslon_Display',sans-serif] text-xl mb-4">
                Pricing
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-['Inter',sans-serif] text-sm mb-2">
                    Tags Required
                  </label>
                  <select
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e1d0d2]"
                  >
                    <option value="1">1 tag</option>
                    <option value="2">2 tags</option>
                    <option value="3">3 tags</option>
                    <option value="4">4 tags</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              className="w-full bg-black text-white font-['Libre_Caslon_Display',sans-serif] py-4 rounded-lg text-xl"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? 'Listing...' : 'List Item'}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}