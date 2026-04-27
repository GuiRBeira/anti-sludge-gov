// apps/web/features/processes/components/StatsGrid.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatItem {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
}

interface StatsGridProps {
  stats: StatItem[];
}

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, idx) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="h-full"
        >
          <Card className="h-full rounded-[2.5rem] border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden group hover:border-primary/20 transition-all">
            <CardContent className="py-2 px-5 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div
                  className={cn(
                    "p-3 rounded-2xl text-white shadow-lg transition-transform group-hover:scale-110 duration-300",
                    stat.color,
                  )}
                >
                  <stat.icon size={16} strokeWidth={3.5} />
                </div>

                <div className="h-1.5 w-1.5 rounded-full bg-slate-200" />
              </div>

              <div className="space-y-1">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
                  {stat.label}
                </p>
                <h3 className="text-3xl font-black tabular-nums tracking-tighter">
                  {stat.value}
                </h3>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
