import { motion } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Search, SlidersHorizontal } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const MOCK_ITEMS = [
  {
    id: 1,
    name: "Silk Evening Gown",
    brand: "Reformation",
    size: "S",
    tags: 2,
    rentalFee: 45,
    category: "dress",
  },
  {
    id: 2,
    name: "Leather Jacket",
    brand: "AllSaints",
    size: "M",
    tags: 3,
    rentalFee: 60,
    category: "jacket",
  },
  {
    id: 3,
    name: "Designer Handbag",
    brand: "Coach",
    size: "One Size",
    tags: 2,
    rentalFee: 50,
    category: "bag",
  },
  {
    id: 4,
    name: "Cocktail Dress",
    brand: "ASTR The Label",
    size: "M",
    tags: 1,
    rentalFee: 35,
    category: "dress",
  },
  {
    id: 5,
    name: "Blazer",
    brand: "Theory",
    size: "L",
    tags: 2,
    rentalFee: 40,
    category: "top",
  },
  {
    id: 6,
    name: "Statement Earrings",
    brand: "BaubleBar",
    size: "One Size",
    tags: 1,
    rentalFee: 15,
    category: "accessories",
  },
];

export default function Marketplace() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["all", "dress", "top", "jacket", "bag", "accessories"];

  const filteredItems = MOCK_ITEMS.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
            Browse
          </h1>
          <p className="font-['Inter',sans-serif] text-gray-600">
            Discover designer pieces from your community
          </p>
        </motion.div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by item or brand..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e1d0d2] bg-white"
            />
          </div>

          {/* Category Filters */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap font-['Inter',sans-serif] text-sm ${
                  selectedCategory === category
                    ? "bg-black text-white"
                    : "bg-white text-black border border-gray-300"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => navigate(`/item/${item.id}`)}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer"
            >
              <div className="aspect-[3/4] bg-gradient-to-br from-[#e1d0d2] to-[rgba(230,225,220,0.37)] flex items-center justify-center">
                <ImageWithFallback
                  src={`fashion ${item.category}`}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-['Libre_Caslon_Display',sans-serif] text-xl mb-1">
                  {item.name}
                </h3>
                <p className="font-['Inter',sans-serif] text-sm text-gray-600 mb-3">
                  {item.brand} · Size {item.size}
                </p>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-['Inter',sans-serif] text-sm text-gray-500">
                      {item.tags} tag{item.tags > 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="font-['Inter',sans-serif] text-lg">
                    ${item.rentalFee}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <p className="font-['Inter',sans-serif] text-gray-500 text-lg">
              No items found. Try a different search or category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}