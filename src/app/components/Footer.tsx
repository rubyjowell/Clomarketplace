import { motion } from "motion/react";

export function Footer() {
  return (
    <footer className="bg-[#ad3417] py-8 md:py-12">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-[1400px]">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-['Libre_Caslon_Display',sans-serif] text-white text-xl mb-2">
            CLO
          </p>
          <p className="font-['Inter',sans-serif] text-white/80 text-sm">
            © 2026 Clo. Fashion that flows.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}