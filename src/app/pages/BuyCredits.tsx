import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Check } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { projectId, publicAnonKey } from '/utils/supabase/info';

const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-9f30820f`;

const tagPackages = [
  { id: 1, tags: 2, price: 15, popular: false },
  { id: 2, tags: 5, price: 35, popular: true },
  { id: 3, tags: 10, price: 65, popular: false },
];

export default function BuyCredits() {
  const navigate = useNavigate();
  const { user, profile, accessToken, refreshProfile } = useAuth();
  const [selectedPackage, setSelectedPackage] = useState<number | null>(2);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  const handlePurchase = async () => {
    if (!selectedPackage || !user || !accessToken) {
      if (!user) {
        navigate('/signin');
      }
      return;
    }

    setProcessing(true);
    setError("");

    const pkg = tagPackages.find(p => p.id === selectedPackage);
    if (!pkg) return;

    try {
      // Create Stripe checkout session
      const response = await fetch(`${API_URL}/stripe/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          packageId: pkg.id,
          quantity: pkg.tags,
          price: pkg.price,
          returnUrl: window.location.origin + '/buy-credits',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      // Redirect to Stripe Checkout
      window.location.href = data.url;
    } catch (err: any) {
      setError(err.message);
      setProcessing(false);
    }
  };

  // Check if returning from successful payment
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');
    const success = urlParams.get('success');

    if (success === 'true' && sessionId && accessToken) {
      // Verify payment and add tags
      fetch(`${API_URL}/stripe/verify-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ sessionId }),
      })
        .then(res => res.json())
        .then(async (data) => {
          if (data.success) {
            await refreshProfile();
            alert(`Success! ${data.quantity} tags added to your account.`);
            // Clean up URL
            window.history.replaceState({}, '', '/buy-credits');
          }
        })
        .catch(err => {
          console.error('Payment verification error:', err);
          alert('Payment successful but verification failed. Please contact support.');
        });
    } else if (urlParams.get('canceled') === 'true') {
      setError('Payment was canceled. Please try again.');
      window.history.replaceState({}, '', '/buy-credits');
    }
  }, [accessToken, refreshProfile]);

  return (
    <div className="min-h-screen bg-[rgba(230,225,220,0.37)] pt-24 pb-16">
      <div className="container mx-auto px-6 max-w-[1000px]">
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

          <h1 className="font-['Libre_Caslon_Display',sans-serif] text-4xl md:text-5xl mb-4">
            Purchase Tags
          </h1>
          <p className="font-['Inter',sans-serif] text-gray-600 mb-8">
            You currently have{" "}
            <span className="font-semibold text-black">
              {profile?.tagsAvailable || 0} tags
            </span>{" "}
            available
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {tagPackages.map((pkg) => (
              <motion.div
                key={pkg.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedPackage(pkg.id)}
                className={`relative bg-white rounded-lg p-6 cursor-pointer transition-all ${
                  selectedPackage === pkg.id
                    ? "ring-2 ring-black shadow-lg"
                    : "hover:shadow-md"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black text-white px-3 py-1 rounded-full text-xs font-['Inter',sans-serif]">
                    Popular
                  </div>
                )}

                {selectedPackage === pkg.id && (
                  <div className="absolute top-4 right-4 bg-black text-white rounded-full p-1">
                    <Check className="w-4 h-4" />
                  </div>
                )}

                <div className="text-center">
                  <div className="font-['Libre_Caslon_Display',sans-serif] text-5xl mb-2">
                    {pkg.tags}
                  </div>
                  <div className="font-['Inter',sans-serif] text-gray-600 mb-4">
                    {pkg.tags === 1 ? "Tag" : "Tags"}
                  </div>
                  <div className="font-['Inter',sans-serif] text-3xl font-semibold">
                    ${pkg.price}
                  </div>
                  <div className="font-['Inter',sans-serif] text-sm text-gray-500 mt-2">
                    ${(pkg.price / pkg.tags).toFixed(2)} per tag
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="bg-white rounded-lg p-6 mb-8">
            <h3 className="font-['Libre_Caslon_Display',sans-serif] text-xl mb-4">
              Payment Details
            </h3>
            {selectedPackage ? (
              <div className="font-['Inter',sans-serif] space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Package:</span>
                  <span className="font-semibold">
                    {tagPackages.find((p) => p.id === selectedPackage)?.tags}{" "}
                    Tags
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total:</span>
                  <span className="font-semibold text-xl">
                    ${tagPackages.find((p) => p.id === selectedPackage)?.price}
                  </span>
                </div>
              </div>
            ) : (
              <p className="font-['Inter',sans-serif] text-gray-500">
                Select a package to continue
              </p>
            )}
          </div>

          <button
            onClick={handlePurchase}
            disabled={!selectedPackage || processing}
            className="w-full bg-black text-white py-4 rounded-lg font-['Inter',sans-serif] text-lg hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {processing ? "Processing..." : "Continue to Payment"}
          </button>

          <div className="mt-8 bg-gray-100 rounded-lg p-6">
            <h3 className="font-['Libre_Caslon_Display',sans-serif] text-xl mb-3">
              How it works
            </h3>
            <ol className="list-decimal list-inside space-y-2 font-['Inter',sans-serif] text-gray-700">
              <li>Select a tag package above</li>
              <li>Complete secure payment via Stripe</li>
              <li>Tags are added to your account instantly</li>
              <li>Use tags to rent items from the marketplace</li>
            </ol>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
