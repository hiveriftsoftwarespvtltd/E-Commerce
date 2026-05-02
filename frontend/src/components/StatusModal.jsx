import React, { useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function StatusModal({
  open,
  message,
  onClose,
  onCancel,
  type = "success",
  actionText = "Continue",
  autoClose = true,
  duration = 1500, // ms
}) {
  // ✅ Auto close logic
  useEffect(() => {
    if (open && autoClose && type === "success") {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
        >
          <motion.div
            initial={{ y: 40, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl p-8 text-center"
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
            >
              <X size={18} />
            </button>

            {/* ✅ Animated Tick */}
            {type === "success" && (
              <div className="flex justify-center mb-5">
                <motion.svg
                  width="80"
                  height="80"
                  viewBox="0 0 52 52"
                  className="block"
                >
                  {/* Circle */}
                  <motion.circle
                    cx="26"
                    cy="26"
                    r="25"
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.4 }}
                  />

                  {/* Tick */}
                  <motion.path
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 27l7 7 16-16"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                  />
                </motion.svg>
              </div>
            )}

            {/* Message */}
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Success
            </h2>

            <p className="text-gray-500 text-sm mb-6">
              {message}
            </p>

            {/* Actions */}
            <div className="flex justify-center gap-3">
              {onCancel && (
                <button
                  onClick={onCancel}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
              )}

              {!autoClose && (
                <button
                  onClick={onClose}
                  className="px-5 py-2 rounded-lg text-white bg-green-500 hover:bg-green-600"
                >
                  {actionText}
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}