import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { ArrowLeft, Upload, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { projectId, publicAnonKey } from '/utils/supabase/info';

const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-9f30820f`;

export default function Profile() {
  const navigate = useNavigate();
  const { user, profile, accessToken, refreshProfile } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    college: "",
    instagramHandle: "",
    bio: "",
  });
  const [asSeenOn, setAsSeenOn] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!user) {
      navigate('/signin');
      return;
    }

    if (profile) {
      setFormData({
        fullName: profile.fullName || "",
        email: profile.email || "",
        college: profile.college || "",
        instagramHandle: profile.instagramHandle || "",
        bio: profile.bio || "",
      });
    }
  }, [user, profile, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!accessToken) return;

    setSaving(true);
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          college: formData.college,
          instagramHandle: formData.instagramHandle,
          bio: formData.bio,
        }),
      });

      if (response.ok) {
        await refreshProfile();
        setMessage("Profile updated successfully!");
        setTimeout(() => setMessage(""), 3000);
      } else {
        const data = await response.json();
        setMessage(data.error || "Failed to update profile");
      }
    } catch (error) {
      console.error('Profile update error:', error);
      setMessage("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const addAsSeenOnPhoto = () => {
    const url = prompt("Enter photo URL:");
    if (url) {
      setAsSeenOn([...asSeenOn, url]);
    }
  };

  const removeAsSeenOnPhoto = (index: number) => {
    setAsSeenOn(asSeenOn.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-[rgba(230,225,220,0.37)] pt-24 pb-16">
      <div className="container mx-auto px-6 max-w-[800px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-black mb-8 font-['Inter',sans-serif]"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>

          <h1 className="font-['Libre_Caslon_Display',sans-serif] text-4xl md:text-5xl mb-8">
            My Profile
          </h1>

          {message && (
            <div className={`mb-6 p-4 rounded-lg ${message.includes('success') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              {message}
            </div>
          )}

          <div className="bg-white rounded-lg p-8 mb-8 space-y-6">
            <div>
              <label className="block font-['Inter',sans-serif] text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg font-['Inter',sans-serif] focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>

            <div>
              <label className="block font-['Inter',sans-serif] text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                disabled
                className="w-full px-4 py-3 border border-gray-300 rounded-lg font-['Inter',sans-serif] bg-gray-100 cursor-not-allowed"
              />
              <p className="text-sm text-gray-500 mt-1">Email cannot be changed</p>
            </div>

            <div>
              <label className="block font-['Inter',sans-serif] text-sm font-medium text-gray-700 mb-2">
                College/University
              </label>
              <input
                type="text"
                name="college"
                value={formData.college}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg font-['Inter',sans-serif] focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>

            <div>
              <label className="block font-['Inter',sans-serif] text-sm font-medium text-gray-700 mb-2">
                Instagram Handle
              </label>
              <input
                type="text"
                name="instagramHandle"
                value={formData.instagramHandle}
                onChange={handleChange}
                placeholder="@username"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg font-['Inter',sans-serif] focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>

            <div>
              <label className="block font-['Inter',sans-serif] text-sm font-medium text-gray-700 mb-2">
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                placeholder="Tell us about yourself..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg font-['Inter',sans-serif] focus:ring-2 focus:ring-black focus:border-transparent resize-none"
              />
            </div>

            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full bg-black text-white py-3 rounded-lg font-['Inter',sans-serif] hover:bg-gray-800 disabled:bg-gray-300 transition-colors"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>

          {/* As Seen On Section */}
          <div className="bg-white rounded-lg p-8">
            <h2 className="font-['Libre_Caslon_Display',sans-serif] text-2xl mb-4">
              As Seen On
            </h2>
            <p className="font-['Inter',sans-serif] text-gray-600 mb-6">
              Show off how you styled your rented items!
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {asSeenOn.map((photo, index) => (
                <div key={index} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden group">
                  <img
                    src={photo}
                    alt={`As seen on ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => removeAsSeenOnPhoto(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}

              <button
                onClick={addAsSeenOnPhoto}
                className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center gap-2 hover:border-black transition-colors"
              >
                <Upload className="w-8 h-8 text-gray-400" />
                <span className="font-['Inter',sans-serif] text-sm text-gray-500">
                  Add Photo
                </span>
              </button>
            </div>

            <p className="font-['Inter',sans-serif] text-xs text-gray-500">
              Note: Photo upload from device coming soon. For now, use image URLs.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
