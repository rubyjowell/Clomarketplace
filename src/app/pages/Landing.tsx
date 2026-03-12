import { motion, useScroll, useTransform, useInView } from "motion/react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import img41 from "figma:asset/42b9f555a4a72c64184f5269d35ea38d7a15ee88.png";
import imgFavouritesForAReason from "figma:asset/aef6044e3493721f52b80dd09964cd1673276e7a.png";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.9, 0.5]);

  return (
    <section ref={ref} className="relative min-h-screen pt-20 md:pt-24 overflow-hidden bg-[rgba(230,225,220,0.37)] flex items-center">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-[1400px] w-full">
        {/* Quote */}
        <motion.div
          className="text-center relative"
          style={{ y, opacity }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Receipt Container */}
          <div className="max-w-md mx-auto bg-white/80 backdrop-blur-sm px-8 py-12 relative">
            {/* Top Dashed Line */}
            <div className="border-t-2 border-dashed border-gray-400 mb-8"></div>
            
            <h1 className="font-['League_Gothic',sans-serif] text-5xl md:text-6xl lg:text-7xl text-[#101828] tracking-wide leading-tight mb-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                "WHAT'S
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                MINE
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                IS
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                YOURS"
              </motion.div>
            </h1>
            
            {/* Bottom Dashed Line */}
            <div className="border-t-2 border-dashed border-gray-400 mb-6"></div>
            
            <p className="font-['Libre_Caslon_Display',sans-serif] text-base md:text-xl text-[#101828] italic tracking-wide mb-2">
              - CLO
            </p>
            <p className="font-['Inter',sans-serif] text-sm md:text-base text-[#4a5565] tracking-tight mb-6">
              © 2026 Clo
            </p>
            
            {/* Barcode */}
            <motion.div
              className="flex justify-center gap-[2px] opacity-60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              {[...Array(40)].map((_, i) => (
                <div
                  key={i}
                  className="bg-black"
                  style={{
                    width: Math.random() > 0.5 ? '2px' : '1px',
                    height: '50px',
                  }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function PhilosophySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const philosophyItems = [
    {
      title: "Your curated space awaits",
      description: "CONNECT WITH YOUR COMMUNITY TO SHOP YOUR FAVOURITES",
      delay: 0,
    },
    {
      title: "A collection like no other",
      description: "USE YOUR MONTHLY TAGS TO PURCHASE DESIGNER PEICES FOR ANY OCCASION",
      delay: 0.2,
    },
    {
      title: "The peices worth keeping",
      description: "LIST YOUR WARDROBE AND EARN ON RENTALS",
      delay: 0.4,
    },
  ];

  return (
    <section ref={ref} className="py-16 md:py-24 bg-[#e1d0d2]">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-[1400px]">
        <motion.h2
          className="font-['Libre_Caslon_Display',sans-serif] text-2xl md:text-3xl text-[#101828] text-center mb-12 md:mb-16 tracking-wide"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          THE PHILOSOPHY
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
          {philosophyItems.map((item, index) => (
            <motion.div
              key={index}
              className="text-center flex flex-col items-center"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: item.delay }}
            >
              <h3 className="font-['Meie_Script',sans-serif] text-2xl md:text-3xl text-[#101828] mb-4 tracking-tight min-h-[80px] flex items-center">
                {item.title}
              </h3>
              <p className="font-['Inter',sans-serif] text-sm md:text-base text-[#363b53] tracking-tight leading-relaxed max-w-[300px]">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BestSellersSection() {
  const ref = useRef(null);
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const bestSellers = [
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
    {
      id: 5,
      name: "Blazer",
      brand: "Theory",
      tags: 2,
      image: "https://images.unsplash.com/photo-1771072426342-8fa359598a6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMGJsYXplciUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzMyMDIwOTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 6,
      name: "Cocktail Dress",
      brand: "ASTR The Label",
      tags: 1,
      image: "https://images.unsplash.com/photo-1699729589505-d1791e32d925?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2NrdGFpbCUyMGRyZXNzJTIwcGFydHl8ZW58MXx8fHwxNzczMjk0ODU1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  return (
    <section ref={ref} className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-[1400px]">
        <motion.div
          className="flex justify-between items-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-['Meie_Script',sans-serif] text-3xl md:text-4xl lg:text-5xl text-[#101828]">
            Favourites for a reason...
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className="p-2 rounded-full border border-gray-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className="p-2 rounded-full border border-gray-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {bestSellers.map((item, index) => (
            <motion.div
              key={item.id}
              className="flex-shrink-0 w-[280px] md:w-[320px] cursor-pointer group"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => navigate(`/item/${item.id}`)}
              whileHover={{ y: -8 }}
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg mb-4">
                <ImageWithFallback
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="space-y-1">
                <h3 className="font-['Libre_Caslon_Display',sans-serif] text-xl">
                  {item.name}
                </h3>
                <p className="font-['Inter',sans-serif] text-sm text-gray-600">
                  {item.brand}
                </p>
                <p className="font-['Inter',sans-serif] text-sm text-gray-500">
                  {item.tags} tag{item.tags > 1 ? 's' : ''}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const ref = useRef(null);
  const navigate = useNavigate();
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-12 md:py-16 bg-[rgba(230,225,220,0.37)]">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-[1400px] text-center">
        <motion.div
          className="inline-block"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.6 }}
        >
          <motion.button
            onClick={() => navigate("/marketplace")}
            className="text-black font-['Libre_Caslon_Display',sans-serif] text-xl md:text-2xl relative group cursor-pointer bg-transparent border-none"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">YOUR NEW WARDROBE</span>
            <motion.div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-px bg-black"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

export default function Landing() {
  return (
    <main>
      <HeroSection />
      <PhilosophySection />
      <BestSellersSection />
      <CTASection />
    </main>
  );
}