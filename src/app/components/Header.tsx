import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { Menu, X } from "lucide-react";

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = location.pathname === "/";

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-white"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="border-b border-[#e5e7eb]">
        <div className="flex items-center justify-between px-6 md:px-12 lg:px-16 py-4 max-w-[1400px] mx-auto">
          <motion.button
            onClick={() => navigate("/")}
            className="font-['Libre_Caslon_Display',sans-serif] text-2xl md:text-3xl text-black tracking-wide"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            CLO
          </motion.button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => navigate("/marketplace")}
              className="font-['Libre_Caslon_Display',sans-serif] text-sm hover:text-gray-600 transition-colors"
            >
              Browse
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="font-['Libre_Caslon_Display',sans-serif] text-sm hover:text-gray-600 transition-colors"
            >
              Dashboard
            </button>
            <button
              onClick={() => navigate("/profile")}
              className="font-['Libre_Caslon_Display',sans-serif] text-sm hover:text-gray-600 transition-colors"
            >
              Profile
            </button>
            <motion.button
              onClick={() => navigate("/signin")}
              className="bg-white text-black font-['Libre_Caslon_Display',sans-serif] text-sm px-6 py-2 rounded-lg border border-black hover:bg-black hover:text-white transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              SIGN IN
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-[#e5e7eb] bg-white"
          >
            <div className="px-6 py-4 space-y-4">
              <button
                onClick={() => {
                  navigate("/marketplace");
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left font-['Libre_Caslon_Display',sans-serif] text-sm py-2"
              >
                Browse
              </button>
              <button
                onClick={() => {
                  navigate("/dashboard");
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left font-['Libre_Caslon_Display',sans-serif] text-sm py-2"
              >
                Dashboard
              </button>
              <button
                onClick={() => {
                  navigate("/profile");
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left font-['Libre_Caslon_Display',sans-serif] text-sm py-2"
              >
                Profile
              </button>
              <button
                onClick={() => {
                  navigate("/signin");
                  setIsMobileMenuOpen(false);
                }}
                className="w-full bg-black text-white font-['Libre_Caslon_Display',sans-serif] text-sm px-6 py-2 rounded-lg"
              >
                SIGN IN
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}