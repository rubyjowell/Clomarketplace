import { motion } from "motion/react";
import { useNavigate, useParams } from "react-router";
import { Star, Instagram, MapPin, ArrowLeft } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export default function UserProfile() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock user data
  const user = {
    id,
    name: "Emma Johnson",
    college: "NYU",
    location: "New York, NY",
    memberSince: "January 2026",
    rating: 4.9,
    totalReviews: 34,
    totalRentals: 28,
    instagram: "@emmajstyle",
    bio: "Fashion student at NYU. Love vintage finds and sustainable style. Always looking for the perfect piece!",
  };

  const asSeenOn = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwb3V0Zml0JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzMzMjk0ODU4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      itemName: "Vintage Denim Jacket",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwc3R5bGUlMjBwb3J0cmFpdHxlbnwxfHx8fDE3MzMyOTQ4NjB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      itemName: "Silk Midi Dress",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwcG9ydHJhaXQlMjB3b21hbnxlbnwxfHx8fDE3MzMyOTQ4NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      itemName: "Evening Gown",
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwc3RyZWV0JTIwc3R5bGV8ZW58MXx8fHwxNzMzMjk0ODY1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      itemName: "Oversized Blazer",
    },
  ];

  const listings = [
    {
      id: 1,
      name: "Reformation Midi Dress",
      brand: "Reformation",
      tags: 2,
      image: "https://images.unsplash.com/photo-1772474557170-4818d01d7bca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwZGVzaWduZXIlMjBkcmVzcyUyMGVsZWdhbnR8ZW58MXx8fHwxNzczMjk0ODQ0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: 2,
      name: "Vintage Leather Jacket",
      brand: "Vintage",
      tags: 3,
      image: "https://images.unsplash.com/photo-1664894626626-65ab49e0077d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMGxlYXRoZXIlMjBqYWNrZXQlMjBmYXNoaW9ufGVufDF8fHx8MTc3MzI5NDg0OHww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: 3,
      name: "Designer Handbag",
      brand: "Coach",
      tags: 2,
      image: "https://images.unsplash.com/photo-1758171692659-024183c2c272?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBoYW5kYmFnJTIwZGVzaWduZXJ8ZW58MXx8fHwxNzczMjA0MjQyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  const reviews = [
    {
      id: 1,
      reviewer: "Sarah M.",
      rating: 5,
      comment: "Amazing experience! The dress was in perfect condition and Emma was so communicative.",
      date: "March 10, 2026",
    },
    {
      id: 2,
      reviewer: "Jessica L.",
      rating: 5,
      comment: "Great items and super easy rental process. Highly recommend!",
      date: "March 5, 2026",
    },
    {
      id: 3,
      reviewer: "Taylor K.",
      rating: 4,
      comment: "Beautiful pieces, well maintained. Would rent again!",
      date: "February 28, 2026",
    },
  ];

  return (
    <div className="min-h-screen bg-[rgba(230,225,220,0.37)] pt-24 pb-16">
      <div className="container mx-auto px-6 max-w-[1200px]">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-6 font-['Inter',sans-serif] text-gray-600 hover:text-black"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Profile Header */}
          <div className="bg-white rounded-lg p-6 md:p-8 mb-6">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#e1d0d2] to-[rgba(230,225,220,0.37)] flex items-center justify-center flex-shrink-0">
                <span className="font-['Libre_Caslon_Display',sans-serif] text-5xl text-gray-600">
                  {user.name.charAt(0)}
                </span>
              </div>
              <div className="flex-1">
                <h1 className="font-['Libre_Caslon_Display',sans-serif] text-3xl md:text-4xl mb-2">
                  {user.name}
                </h1>
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-['Inter',sans-serif]">
                      {user.rating} ({user.totalReviews} reviews)
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="font-['Inter',sans-serif] text-sm">
                      {user.location}
                    </span>
                  </div>
                </div>
                {user.instagram && (
                  <a
                    href={`https://instagram.com/${user.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-gray-700 hover:text-black transition-colors mb-3"
                  >
                    <Instagram className="w-5 h-5" />
                    <span className="font-['Inter',sans-serif]">{user.instagram}</span>
                  </a>
                )}
                <p className="font-['Inter',sans-serif] text-gray-700 mb-3">
                  {user.bio}
                </p>
                <div className="flex gap-4 text-sm text-gray-600">
                  <span className="font-['Inter',sans-serif]">
                    <strong>{user.totalRentals}</strong> successful rentals
                  </span>
                  <span className="font-['Inter',sans-serif]">
                    Member since {user.memberSince}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* As Seen On Section */}
          {asSeenOn.length > 0 && (
            <div className="bg-white rounded-lg p-6 md:p-8 mb-6">
              <h2 className="font-['Libre_Caslon_Display',sans-serif] text-2xl mb-4">
                As Seen On
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {asSeenOn.map((photo) => (
                  <div key={photo.id} className="group cursor-pointer">
                    <div className="aspect-square overflow-hidden rounded-lg mb-2">
                      <ImageWithFallback
                        src={photo.image}
                        alt={photo.itemName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <p className="font-['Inter',sans-serif] text-sm text-gray-600">
                      {photo.itemName}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Listings */}
          <div className="bg-white rounded-lg p-6 md:p-8 mb-6">
            <h2 className="font-['Libre_Caslon_Display',sans-serif] text-2xl mb-4">
              Available Items ({listings.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {listings.map((item) => (
                <motion.div
                  key={item.id}
                  className="group cursor-pointer"
                  onClick={() => navigate(`/item/${item.id}`)}
                  whileHover={{ y: -4 }}
                >
                  <div className="aspect-[3/4] overflow-hidden rounded-lg mb-3">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="font-['Libre_Caslon_Display',sans-serif] text-lg mb-1">
                    {item.name}
                  </h3>
                  <p className="font-['Inter',sans-serif] text-sm text-gray-600 mb-1">
                    {item.brand}
                  </p>
                  <p className="font-['Inter',sans-serif] text-sm text-gray-500">
                    {item.tags} tag{item.tags > 1 ? "s" : ""}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div className="bg-white rounded-lg p-6 md:p-8">
            <h2 className="font-['Libre_Caslon_Display',sans-serif] text-2xl mb-6">
              Reviews ({user.totalReviews})
            </h2>
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-['Inter',sans-serif] text-sm text-gray-600">
                      {review.reviewer} · {review.date}
                    </span>
                  </div>
                  <p className="font-['Inter',sans-serif] text-gray-700">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
