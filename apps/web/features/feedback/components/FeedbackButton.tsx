"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bug, Lightbulb, MessageCircle } from "lucide-react";
import { useFeedbackMutation } from "../api/useFeedbackMutation";

export const FeedbackButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<"feedback" | "bug" | "suggestion">("feedback");
  const [message, setMessage] = useState("");
  const { mutateAsync: sendFeedback, isPending: isSending } = useFeedbackMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      await sendFeedback({
        user_name: "Tester Anon", // TODO: Pegar do AuthContext se disponível
        user_email: null,
        page_url: window.location.href,
        message: message,
        type: type,
      });
      setMessage("");
      setIsOpen(false);
    } catch (err) {
      // Erro já tratado no onError do hook
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 w-80 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-slate-900 px-4 py-3 text-white">
              <h3 className="text-sm font-semibold">Feedback do Protótipo</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1 hover:bg-slate-800 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-4">
              <div className="mb-4 flex gap-2">
                {(["feedback", "bug", "suggestion"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setType(t)}
                    className={`flex flex-1 flex-col items-center gap-1 rounded-lg border py-2 text-[10px] font-medium transition-all ${
                      type === t
                        ? "border-slate-900 bg-slate-900 text-white"
                        : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    {t === "bug" && <Bug size={14} />}
                    {t === "suggestion" && <Lightbulb size={14} />}
                    {t === "feedback" && <MessageCircle size={14} />}
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={
                  type === "bug"
                    ? "O que aconteceu de errado?"
                    : type === "suggestion"
                    ? "Como podemos melhorar?"
                    : "Deixe seu comentário..."
                }
                className="h-24 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm focus:border-slate-900 focus:outline-none transition-all"
              />

              <button
                type="submit"
                disabled={isSending || !message.trim()}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-2.5 text-sm font-semibold text-white transition-all hover:bg-slate-800 disabled:opacity-50"
              >
                {isSending ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <>
                    <Send size={14} />
                    Enviar Feedback
                  </>
                )}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 text-white shadow-xl hover:bg-slate-800 transition-shadow"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageSquare size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};
