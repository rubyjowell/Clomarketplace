import { motion } from "motion/react";
import { useNavigate, useParams } from "react-router";
import { Calendar, ShieldCheck, Star, ArrowLeft } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export default function ItemDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock item data
  const item = {
    id,
    name: "Silk Evening Gown",
    brand: "Reformation",
    size: "S",
    tags: 2,
    rentalFee: 45,
    deposit: 200,
    retailValue: 398,
    description: "Elegant silk gown perfect for formal events, weddings, and special occasions. Features a flattering silhouette with adjustable straps.",
    owner: {
      name: "Sarah M.",
      rating: 4.9,
      reviews: 23,
    },
    category: "dress",
  };

  return (
    <div className="min-h-screen bg-[rgba(230,225,220,0.37)] pt-24 pb-16">
      <div className="container mx-auto px-6 max-w-[1200px]">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate("/marketplace")}
          className="flex items-center gap-2 mb-6 font-['Inter',sans-serif] text-gray-600 hover:text-black"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Browse
        </motion.button>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg overflow-hidden shadow-lg"
          >
            <div className="aspect-[3/4] bg-gradient-to-br from-[#e1d0d2] to-[rgba(230,225,220,0.37)] flex items-center justify-center">
              <ImageWithFallback
                src={`fashion ${item.category}`}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div>
              <p className="font-['Inter',sans-serif] text-sm text-gray-600 mb-2">
                {item.brand}
              </p>
              <h1 className="font-['Libre_Caslon_Display',sans-serif] text-4xl mb-4">
                {item.name}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <span className="font-['Inter',sans-serif] text-2xl">
                  ${item.rentalFee}
                </span>
                <span className="font-['Inter',sans-serif] text-sm text-gray-500">
                  + {item.tags} tag{item.tags > 1 ? "s" : ""}
                </span>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 space-y-3">
              <div className="flex justify-between font-['Inter',sans-serif] text-sm">
                <span className="text-gray-600">Size</span>
                <span>{item.size}</span>
              </div>
              <div className="flex justify-between font-['Inter',sans-serif] text-sm">
                <span className="text-gray-600">Retail Value</span>
                <span>${item.retailValue}</span>
              </div>
              <div className="flex justify-between font-['Inter',sans-serif] text-sm">
                <span className="text-gray-600">Security Deposit</span>
                <span>${item.deposit}</span>
              </div>
            </div>

            <div>
              <h3 className="font-['Libre_Caslon_Display',sans-serif] text-xl mb-2">
                Description
              </h3>
              <p className="font-['Inter',sans-serif] text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-['Libre_Caslon_Display',sans-serif] text-lg">
                    {item.owner.name}
                  </p>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-['Inter',sans-serif] text-sm">
                      {item.owner.rating} ({item.owner.reviews} reviews)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <motion.button
              onClick={() => navigate(`/checkout/${item.id}`)}
              className="w-full bg-black text-white font-['Libre_Caslon_Display',sans-serif] py-4 rounded-lg text-xl"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Rent This Item
            </motion.button>

            <div className="flex gap-4 text-center">
              <div className="flex-1">
                <Calendar className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                <p className="font-['Inter',sans-serif] text-xs text-gray-600">
                  Flexible Dates
                </p>
              </div>
              <div className="flex-1">
                <ShieldCheck className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                <p className="font-['Inter',sans-serif] text-xs text-gray-600">
                  Protected Rental
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}