import { motion } from "motion/react";
import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import { Calendar, ShieldCheck, Star, ArrowLeft, Heart } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useAuth } from "../context/AuthContext";
import { projectId, publicAnonKey } from '/utils/supabase/info';

const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-9f30820f`;

export default function ItemDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user, accessToken } = useAuth();
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    if (id) {
      fetchItem();
      if (user && accessToken) {
        checkFavourite();
      }
    }
  }, [id, user, accessToken]);

  const fetchItem = async () => {
    try {
      const response = await fetch(`${API_URL}/items/${id}`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setItem(data.item);
      } else {
        console.error('Item not found');
        navigate('/marketplace');
      }
    } catch (error) {
      console.error('Failed to fetch item:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkFavourite = async () => {
    if (!accessToken) return;

    try {
      const response = await fetch(`${API_URL}/favourites`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setIsFavourite(data.favourites.includes(id));
      }
    } catch (error) {
      console.error('Failed to check favourites:', error);
    }
  };

  const toggleFavourite = async () => {
    if (!accessToken) {
      navigate('/signin');
      return;
    }

    try {
      if (isFavourite) {
        await fetch(`${API_URL}/favourites/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });
        setIsFavourite(false);
      } else {
        await fetch(`${API_URL}/favourites/${id}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });
        setIsFavourite(true);
      }
    } catch (error) {
      console.error('Failed to toggle favourite:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[rgba(230,225,220,0.37)] pt-24 pb-16 flex items-center justify-center">
        <div className="font-['Inter',sans-serif] text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-[rgba(230,225,220,0.37)] pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-['Libre_Caslon_Display',sans-serif] text-3xl mb-4">Item Not Found</h1>
          <button
            onClick={() => navigate('/marketplace')}
            className="bg-black text-white px-6 py-3 rounded-lg font-['Inter',sans-serif] hover:bg-gray-800"
          >
            Back to Marketplace
          </button>
        </div>
      </div>
    );
  }

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
            className="bg-white rounded-lg overflow-hidden shadow-lg relative"
          >
            <div className="aspect-[3/4] bg-gradient-to-br from-[#e1d0d2] to-[rgba(230,225,220,0.37)] flex items-center justify-center">
              <ImageWithFallback
                src={item.imageUrl || `fashion ${item.category}`}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Favourite Button */}
            <button
              onClick={toggleFavourite}
              className="absolute top-4 right-4 bg-white rounded-full p-3 shadow-lg hover:scale-110 transition-transform"
            >
              <Heart className={`w-6 h-6 ${isFavourite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
            </button>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <div>
              <h1 className="font-['Libre_Caslon_Display',sans-serif] text-4xl mb-2">
                {item.name}
              </h1>
              <p className="font-['Inter',sans-serif] text-xl text-gray-600">
                {item.brand}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-white px-4 py-2 rounded-lg">
                <span className="font-['Inter',sans-serif] text-sm text-gray-600">
                  Size
                </span>
                <p className="font-['Inter',sans-serif] text-lg font-semibold">
                  {item.size}
                </p>
              </div>
              <div className="bg-white px-4 py-2 rounded-lg">
                <span className="font-['Inter',sans-serif] text-sm text-gray-600">
                  Category
                </span>
                <p className="font-['Inter',sans-serif] text-lg font-semibold capitalize">
                  {item.category}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-['Inter',sans-serif] text-gray-600">
                  Tags Required
                </span>
                <span className="font-['Libre_Caslon_Display',sans-serif] text-2xl font-semibold">
                  {item.tags} {item.tags === 1 ? 'tag' : 'tags'}
                </span>
              </div>

              {item.retailValue && (
                <div className="flex justify-between items-center pt-4 border-t">
                  <span className="font-['Inter',sans-serif] text-gray-600">
                    Retail Value
                  </span>
                  <span className="font-['Inter',sans-serif] text-lg">
                    ${item.retailValue}
                  </span>
                </div>
              )}
            </div>

            {item.description && (
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-['Libre_Caslon_Display',sans-serif] text-xl mb-3">
                  Description
                </h3>
                <p className="font-['Inter',sans-serif] text-gray-700 leading-relaxed">
                  {item.description}
                </p>
              </div>
            )}

            <div className="bg-white rounded-lg p-6">
              <h3 className="font-['Libre_Caslon_Display',sans-serif] text-xl mb-3">
                Owner
              </h3>
              <p className="font-['Inter',sans-serif] text-gray-700">
                {item.ownerName}
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => navigate(`/checkout/${item.id}`)}
                disabled={!item.isAvailable}
                className="w-full bg-black text-white py-4 rounded-lg font-['Inter',sans-serif] text-lg hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {item.isAvailable ? 'Rent Now' : 'Currently Unavailable'}
              </button>

              <div className="flex gap-4 font-['Inter',sans-serif] text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>14-day rental</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verified item</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
