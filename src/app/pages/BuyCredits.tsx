import { motion } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Check } from "lucide-react";

export default function BuyCredits() {
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const currentTags = 4;

  const tagPackages = [
    {
      id: "basic",
      tags: 2,
      price: 15,
      description: "Perfect for one extra rental",
    },
    {
      id: "standard",
      tags: 5,
      price: 35,
      description: "Best value for regular renters",
      popular: true,
    },
    {
      id: "premium",
      tags: 10,
      price: 65,
      description: "Maximum flexibility",
    },
  ];

  return (
    <div className="min-h-screen bg-[rgba(230,225,220,0.37)] pt-24 pb-16">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-[800px]">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-6 font-['Inter',sans-serif] text-gray-600 hover:text-black"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </motion.button>

        <motion.h1
          className="font-['Libre_Caslon_Display',sans-serif] text-4xl mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Buy Tags
        </motion.h1>

        <motion.p
          className="font-['Inter',sans-serif] text-gray-600 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Add tags to rent more items this month. Tags expire at the end of the billing cycle.
        </motion.p>

        {/* Current Tags */}
        <motion.div
          className="bg-white rounded-lg p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex justify-between items-center">
            <h2 className="font-['Libre_Caslon_Display',sans-serif] text-2xl">
              Current Tags
            </h2>
            <span className="font-['Inter',sans-serif] text-3xl text-green-600">
              {currentTags}
            </span>
          </div>
        </motion.div>

        {/* Tag Packages */}
        <div className="space-y-4 mb-8">
          {tagPackages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              className={`bg-white rounded-lg p-6 cursor-pointer transition-all ${
                selectedPackage === pkg.id
                  ? "ring-2 ring-black"
                  : "hover:shadow-lg"
              } ${pkg.popular ? "relative" : ""}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              onClick={() => setSelectedPackage(pkg.id)}
              whileHover={{ scale: 1.02 }}
            >
              {pkg.popular && (
                <div className="absolute -top-3 right-6 bg-black text-white px-4 py-1 rounded-full text-xs font-['Inter',sans-serif]">
                  Most Popular
                </div>
              )}
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="font-['Libre_Caslon_Display',sans-serif] text-2xl">
                      {pkg.tags} Tags
                    </h3>
                    <span className="font-['Inter',sans-serif] text-xl">
                      ${pkg.price}
                    </span>
                  </div>
                  <p className="font-['Inter',sans-serif] text-sm text-gray-600">
                    {pkg.description}
                  </p>
                </div>
                {selectedPackage === pkg.id && (
                  <div className="ml-4 bg-black rounded-full p-1">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Purchase Summary */}
        {selectedPackage && (
          <motion.div
            className="bg-white rounded-lg p-6 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="font-['Libre_Caslon_Display',sans-serif] text-xl mb-4">
              Purchase Summary
            </h3>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between font-['Inter',sans-serif]">
                <span className="text-gray-600">Tags to Add</span>
                <span>
                  {tagPackages.find((p) => p.id === selectedPackage)?.tags}
                </span>
              </div>
              <div className="flex justify-between font-['Inter',sans-serif]">
                <span className="text-gray-600">Price</span>
                <span>
                  ${tagPackages.find((p) => p.id === selectedPackage)?.price}
                </span>
              </div>
              <div className="border-t pt-2 flex justify-between font-['Inter',sans-serif] text-lg">
                <span>New Balance</span>
                <span className="text-green-600">
                  {currentTags +
                    (tagPackages.find((p) => p.id === selectedPackage)
                      ?.tags || 0)}{" "}
                  tags
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Purchase Button */}
        <motion.button
          onClick={() => navigate("/profile")}
          disabled={!selectedPackage}
          className="w-full bg-black text-white font-['Libre_Caslon_Display',sans-serif] py-4 rounded-lg text-xl disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={selectedPackage ? { scale: 1.02 } : {}}
          whileTap={selectedPackage ? { scale: 0.98 } : {}}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {selectedPackage ? "Purchase Tags" : "Select a Package"}
        </motion.button>

        <p className="font-['Inter',sans-serif] text-xs text-gray-500 text-center mt-4">
          Payment will be processed securely through Stripe. Tags will be added immediately.
        </p>
      </div>
    </div>
  );
}
