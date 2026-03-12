import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { Calendar, CreditCard } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { projectId, publicAnonKey } from '/utils/supabase/info';

export default function Checkout() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user, profile, accessToken, refreshProfile } = useAuth();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-9f30820f`;

  useEffect(() => {
    if (!user) {
      navigate('/signin');
      return;
    }
    fetchItem();
  }, [user, id]);

  const fetchItem = async () => {
    try {
      const response = await fetch(`${API_URL}/items/${id}`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setItem(data.item);
      } else {
        setError('Item not found');
      }
    } catch (error) {
      console.error('Failed to fetch item:', error);
      setError('Failed to load item');
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async () => {
    if (!startDate || !endDate || !accessToken || !item) return;

    setProcessing(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          itemId: item.id,
          startDate,
          endDate,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Checkout failed');
      }

      // Refresh profile to get updated tag count
      await refreshProfile();

      // Redirect to dashboard
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[rgba(230,225,220,0.37)] pt-24 pb-16 flex items-center justify-center">
        <div className="font-['Inter',sans-serif] text-lg">Loading...</div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-[rgba(230,225,220,0.37)] pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <p className="font-['Inter',sans-serif] text-lg mb-4">{error || 'Item not found'}</p>
          <button
            onClick={() => navigate('/marketplace')}
            className="font-['Inter',sans-serif] underline"
          >
            Back to Marketplace
          </button>
        </div>
      </div>
    );
  }

  const availableTags = profile?.tagsAvailable || 0;
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

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 font-['Inter',sans-serif] text-sm">{error}</p>
            </div>
          )}

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
                      Tags Required
                    </span>
                    <span className="font-['Inter',sans-serif]">
                      {item.tags} tags
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="font-['Inter',sans-serif] text-gray-600">
                      Size
                    </span>
                    <span className="font-['Inter',sans-serif]">
                      {item.size}
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
                    min={new Date().toISOString().split('T')[0]}
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
                    min={startDate || new Date().toISOString().split('T')[0]}
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
                  {availableTags} available / {item.tags} required
                </span>
              </div>
              {!hasEnoughTags && (
                <div>
                  <p className="font-['Inter',sans-serif] text-sm text-red-600 mb-3">
                    You need {item.tags - availableTags} more tag{item.tags - availableTags > 1 ? 's' : ''} to complete this rental.
                  </p>
                  <motion.button
                    onClick={() => navigate("/buy-credits")}
                    className="bg-black text-white px-6 py-2 rounded-lg font-['Inter',sans-serif] text-sm"
                    whileHover={{ scale: 1.05 }}
                  >
                    Buy More Tags
                  </motion.button>
                </div>
              )}
            </div>

            {/* Confirm Button */}
            <motion.button
              onClick={handleCheckout}
              disabled={!hasEnoughTags || !startDate || !endDate || processing}
              className="w-full bg-[#e1d0d2] text-black font-['Libre_Caslon_Display',sans-serif] py-4 rounded-lg text-xl disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={hasEnoughTags && !processing ? { scale: 1.02 } : {}}
              whileTap={hasEnoughTags && !processing ? { scale: 0.98 } : {}}
            >
              {processing ? 'Processing...' : 'Confirm Rental'}
            </motion.button>

            <p className="font-['Inter',sans-serif] text-sm text-center text-gray-600">
              By confirming, you agree to our rental terms and conditions
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}