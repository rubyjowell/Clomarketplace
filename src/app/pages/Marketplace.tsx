import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Search, SlidersHorizontal, Heart } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useAuth } from "../context/AuthContext";
import { projectId, publicAnonKey } from '/utils/supabase/info';

interface MarketplaceItem {
  id: string;
  name: string;
  brand: string;
  size: string;
  tags: number;
  category: string;
  ownerId: string;
  ownerName: string;
  imageUrl?: string;
  isAvailable: boolean;
  rentalFee: number;
}

export default function Marketplace() {
  const navigate = useNavigate();
  const { user, accessToken } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [items, setItems] = useState<MarketplaceItem[]>([]);
  const [favourites, setFavourites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-9f30820f`;

  const categories = ["all", "dress", "top", "jacket", "bag", "accessories"];

  useEffect(() => {
    fetchItems();
    if (user) {
      fetchFavourites();
    }
  }, [user]);

  const fetchItems = async () => {
    try {
      const response = await fetch(`${API_URL}/items`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setItems(data.items || []);
      }
    } catch (error) {
      console.error('Failed to fetch items:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFavourites = async () => {
    if (!accessToken) return;
    
    try {
      const response = await fetch(`${API_URL}/favourites`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setFavourites(data.favourites || []);
      }
    } catch (error) {
      console.error('Failed to fetch favourites:', error);
    }
  };

  const toggleFavourite = async (itemId: string) => {
    if (!user || !accessToken) {
      navigate('/signin');
      return;
    }

    const isFavourited = favourites.includes(itemId);

    try {
      const response = await fetch(`${API_URL}/favourites/${itemId}`, {
        method: isFavourited ? 'DELETE' : 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setFavourites(data.favourites);
      }
    } catch (error) {
      console.error('Failed to toggle favourite:', error);
    }
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory && item.isAvailable;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-[rgba(230,225,220,0.37)] pt-24 pb-16 flex items-center justify-center">
        <div className="font-['Inter',sans-serif] text-lg">Loading...</div>
      </div>
    );
  }

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
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer relative"
            >
              <div 
                onClick={() => navigate(`/item/${item.id}`)}
                className="aspect-[3/4] bg-gradient-to-br from-[#e1d0d2] to-[rgba(230,225,220,0.37)] flex items-center justify-center"
              >
                <ImageWithFallback
                  src={item.imageUrl || `fashion ${item.category}`}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Heart Icon */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavourite(item.id);
                }}
                className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:scale-110 transition-transform"
              >
                <Heart
                  className={`w-5 h-5 ${
                    favourites.includes(item.id) 
                      ? 'fill-red-500 text-red-500' 
                      : 'text-gray-400'
                  }`}
                />
              </button>
              
              <div className="p-4" onClick={() => navigate(`/item/${item.id}`)}>
                <h3 className="font-['Libre_Caslon_Display',sans-serif] text-xl mb-1">
                  {item.name}
                </h3>
                <p className="font-['Inter',sans-serif] text-sm text-gray-600 mb-3">
                  {item.brand} · Size {item.size}
                </p>
                <div className="flex justify-between items-center">
                  <span className="font-['Inter',sans-serif] text-sm text-gray-500">
                    {item.tags} tag{item.tags > 1 ? "s" : ""}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <p className="font-['Inter',sans-serif] text-gray-500 text-lg mb-4">
              {items.length === 0 
                ? "No items available yet. Be the first to list an item!" 
                : "No items found. Try a different search or category."}
            </p>
            {items.length === 0 && user && (
              <button
                onClick={() => navigate('/list-item')}
                className="bg-black text-white px-6 py-3 rounded-lg font-['Inter',sans-serif] hover:bg-gray-800"
              >
                List Your First Item
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}