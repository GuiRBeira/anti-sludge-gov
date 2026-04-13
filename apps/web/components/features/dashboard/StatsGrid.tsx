"use client";

import React from "react";
import { motion } from "framer-motion";
import { GovIcon } from "@/components/gov";

interface StatItem {
  label: string;
  value: string | number;
  icon: string;
  color: string;
}

interface StatsGridProps {
  stats: StatItem[];
}

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat, idx) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="glass p-3 rounded-3xl shadow-sm border border-slate-200/50 flex items-center gap-4"
        >
          <div
            className={`${stat.color} p-3 border rounded-2xl text-white shadow-md`}
          >
            <GovIcon icon={stat.icon} size={24} />
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">
              {stat.label}
            </span>
            <div className="h-4 w-px bg-slate-200 self-center" />
            <span className="text-2xl font-black text-slate-800 tabular-nums leading-none">
              {stat.value}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
