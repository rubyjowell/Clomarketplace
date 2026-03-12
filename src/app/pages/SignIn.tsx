import { motion } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function SignIn() {
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [college, setCollege] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isSignUp) {
        if (!fullName || !college) {
          setError("Please fill in all fields");
          setLoading(false);
          return;
        }
        await signUp(email, password, fullName, college);
      } else {
        await signIn(email, password);
      }
      navigate("/marketplace");
    } catch (err: any) {
      setError(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

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

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm font-['Inter',sans-serif]">{error}</p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {isSignUp && (
              <>
                <div>
                  <label className="block font-['Inter',sans-serif] text-sm mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required={isSignUp}
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
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    required={isSignUp}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e1d0d2]"
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white font-['Libre_Caslon_Display',sans-serif] py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={!loading ? { scale: 1.02 } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
            >
              {loading ? "Loading..." : (isSignUp ? "Create Account" : "Sign In")}
            </motion.button>
          </form>

          <p className="text-center mt-6 font-['Inter',sans-serif] text-sm text-gray-600">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError("");
              }}
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