import { motion } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function SignIn() {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="min-h-screen bg-[rgba(230,225,220,0.37)] pt-24 pb-16">
      <div className="container mx-auto px-6 max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          <h1 className="font-['Libre_Caslon_Display',sans-serif] text-3xl text-center mb-8">
            {isSignUp ? "Join CLO" : "Welcome Back"}
          </h1>

          <form className="space-y-6">
            {isSignUp && (
              <>
                <div>
                  <label className="block font-['Inter',sans-serif] text-sm mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e1d0d2]"
                  />
                </div>
                <div>
                  <label className="block font-['Inter',sans-serif] text-sm mb-2">
                    College/University
                  </label>
                  <input
                    type="text"
                    placeholder="Your college"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e1d0d2]"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block font-['Inter',sans-serif] text-sm mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e1d0d2]"
              />
            </div>

            <div>
              <label className="block font-['Inter',sans-serif] text-sm mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e1d0d2]"
              />
            </div>

            <motion.button
              type="button"
              onClick={() => navigate("/marketplace")}
              className="w-full bg-black text-white font-['Libre_Caslon_Display',sans-serif] py-3 rounded-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSignUp ? "Create Account" : "Sign In"}
            </motion.button>
          </form>

          <p className="text-center mt-6 font-['Inter',sans-serif] text-sm text-gray-600">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-black underline"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>

          {isSignUp && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-6 p-4 bg-[#e1d0d2] rounded-lg"
            >
              <p className="font-['Inter',sans-serif] text-sm text-center">
                <strong>$25/month membership</strong>
                <br />
                Get 4 rental tags per month
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}