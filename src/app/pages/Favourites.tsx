import { motion } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Heart, X } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export default function Favourites() {
  const navigate = useNavigate();
  const [favourites, setFavourites] = useState([
    {
      id: 1,
      name: "Silk Evening Gown",
      brand: "Reformation",
      tags: 2,
      image: "https://images.unsplash.com/photo-1772474557170-4818d01d7bca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwZGVzaWduZXIlMjBkcmVzcyUyMGVsZWdhbnR8ZW58MXx8fHwxNzczMjk0ODQ0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 2,
      name: "Designer Handbag",
      brand: "Coach",
      tags: 2,
      image: "https://images.unsplash.com/photo-1758171692659-024183c2c272?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBoYW5kYmFnJTIwZGVzaWduZXJ8ZW58MXx8fHwxNzczMjA0MjQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 3,
      name: "Leather Jacket",
      brand: "AllSaints",
      tags: 3,
      image: "https://images.unsplash.com/photo-1664894626626-65ab49e0077d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMGxlYXRoZXIlMjBqYWNrZXQlMjBmYXNoaW9ufGVufDF8fHx8MTc3MzI5NDg0OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 4,
      name: "Evening Dress",
      brand: "Versace",
      tags: 4,
      image: "https://images.unsplash.com/photo-1763336016192-c7b62602e993?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwZXZlbmluZyUyMGdvd258ZW58MXx8fHwxNzczMjk0ODUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ]);

  const removeFavourite = (id: number) => {
    setFavourites(favourites.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-[rgba(230,225,220,0.37)] pt-24 pb-16">
      <div className="container mx-auto px-6 max-w-[1200px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h1 className="font-['Libre_Caslon_Display',sans-serif] text-4xl md:text-5xl">
              Your Favourites
            </h1>
            <div className="flex items-center gap-2">
              <Heart className="w-6 h-6 fill-red-500 text-red-500" />
              <span className="font-['Inter',sans-serif] text-lg">
                {favourites.length} items
              </span>
            </div>
          </div>

          {favourites.length === 0 ? (
            <div className="bg-white rounded-lg p-12 text-center">
              <Heart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h2 className="font-['Libre_Caslon_Display',sans-serif] text-2xl mb-2">
                No favourites yet
              </h2>
              <p className="font-['Inter',sans-serif] text-gray-600 mb-6">
                Start exploring and add items to your favourites
              </p>
              <motion.button
                onClick={() => navigate("/marketplace")}
                className="bg-black text-white font-['Inter',sans-serif] px-6 py-3 rounded-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Browse Marketplace
              </motion.button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favourites.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="bg-white rounded-lg overflow-hidden group relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <button
                    onClick={() => removeFavourite(item.id)}
                    className="absolute top-3 right-3 z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div
                    className="relative aspect-[3/4] overflow-hidden cursor-pointer"
                    onClick={() => navigate(`/item/${item.id}`)}
                  >
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-4">
                    <h3
                      className="font-['Libre_Caslon_Display',sans-serif] text-xl mb-1 cursor-pointer hover:underline"
                      onClick={() => navigate(`/item/${item.id}`)}
                    >
                      {item.name}
                    </h3>
                    <p className="font-['Inter',sans-serif] text-sm text-gray-600 mb-2">
                      {item.brand}
                    </p>
                    <p className="font-['Inter',sans-serif] text-sm text-gray-500 mb-4">
                      {item.tags} tag{item.tags > 1 ? "s" : ""}
                    </p>
                    <motion.button
                      onClick={() => navigate(`/checkout/${item.id}`)}
                      className="w-full bg-black text-white font-['Inter',sans-serif] py-2 rounded-lg"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Rent Now
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
