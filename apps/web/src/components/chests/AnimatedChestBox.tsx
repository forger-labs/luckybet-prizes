"use client";

import { motion } from "framer-motion";

import { CoinsIcon } from "@/icons";
import type { AnimatedChestBoxProps } from "@/types/chests";

const FOUNTAIN_COINS = [
  { id: 1, x: -35, y: -70, delay: 0.1, rotate: -25 },
  { id: 2, x: 35, y: -80, delay: 0.15, rotate: 30 },
  { id: 3, x: -15, y: -95, delay: 0.2, rotate: -15 },
  { id: 4, x: 15, y: -90, delay: 0.25, rotate: 18 },
  { id: 5, x: 0, y: -110, delay: 0.3, rotate: 45 },
];

export function AnimatedChestBox({
  isOpened,
  isShaking = false,
  className = "",
}: AnimatedChestBoxProps) {
  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        animate={
          isShaking
            ? {
                rotate: [0, -6, 6, -4, 4, -2, 2, 0],
                scale: [1, 1.04, 1.08, 1.04, 1.08, 1],
                y: [0, -2, 2, -2, 2, 0],
              }
            : isOpened
              ? { scale: [1, 1.05, 1], y: 0 }
              : { scale: 1, y: 0 }
        }
        transition={{
          duration: isShaking ? 0.6 : 0.4,
          ease: "easeInOut",
        }}
        className="relative w-48 h-40 flex flex-col items-center justify-end"
      >
        {/* Ambient Back Glow */}
        <motion.div
          animate={{
            scale: isOpened ? [1, 1.3, 1.1] : 1,
            opacity: isOpened ? 0.9 : 0.3,
          }}
          transition={{ duration: 0.8 }}
          className="absolute -inset-8 rounded-full bg-gradient-radial from-secondary/40 via-secondary/15 to-transparent blur-2xl pointer-events-none"
        />

        {/* Volumetric Upward Light Beam */}
        <motion.div
          initial={{ opacity: 0, scaleY: 0 }}
          animate={
            isOpened
              ? { opacity: [0, 1, 0.85], scaleY: [0, 1.4, 1.2], y: -40 }
              : { opacity: 0, scaleY: 0 }
          }
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ transformOrigin: "bottom center" }}
          className="absolute -top-16 w-36 h-48 bg-gradient-to-t from-secondary/80 via-secondary/30 to-transparent blur-md rounded-t-full pointer-events-none z-10"
        />

        {/* Fountain of Coins jumping out */}
        {isOpened &&
          FOUNTAIN_COINS.map((c) => (
            <motion.div
              key={`coin-${c.id}`}
              initial={{ x: 0, y: 10, scale: 0, opacity: 0 }}
              animate={{
                x: c.x,
                y: c.y,
                scale: [0, 1.3, 1],
                opacity: [0, 1, 1],
                rotate: c.rotate,
              }}
              transition={{
                duration: 0.7,
                delay: c.delay,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute z-20"
            >
              <CoinsIcon className="w-7 h-7 text-secondary drop-shadow-[0_0_10px_rgba(255,198,64,0.9)]" />
            </motion.div>
          ))}

        {/* ── 3D HINGED LID (TAPA) ── */}
        <motion.div
          initial={{ rotateX: 0 }}
          animate={{ rotateX: isOpened ? -115 : 0 }}
          transition={{
            type: "spring",
            stiffness: 180,
            damping: 14,
            mass: 0.8,
          }}
          style={{
            transformOrigin: "bottom center",
            transformStyle: "preserve-3d",
          }}
          className="relative w-44 h-16 z-30 mb-[-2px]"
        >
          {/* Lid Upper Curve & Trims */}
          <div className="w-full h-full rounded-t-2xl bg-gradient-to-b from-[#2d384e] via-[#1c2438] to-[#121929] border-t-2 border-x-2 border-secondary/70 shadow-xl relative overflow-hidden flex items-center justify-center">
            {/* Wooden Planks & Gold Bands */}
            <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-secondary/30 via-secondary to-secondary/30" />
            <div className="absolute left-6 inset-y-0 w-3 bg-gradient-to-b from-secondary to-secondary-container border-x border-white/20" />
            <div className="absolute right-6 inset-y-0 w-3 bg-gradient-to-b from-secondary to-secondary-container border-x border-white/20" />

            {/* Rivets */}
            <div className="absolute left-7 top-2 w-1 h-1 rounded-full bg-on-secondary shadow-sm" />
            <div className="absolute right-7 top-2 w-1 h-1 rounded-full bg-on-secondary shadow-sm" />

            {/* Golden Central Buckle */}
            <motion.div
              animate={{ opacity: isOpened ? 0 : 1, y: isOpened ? -10 : 0 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-0 w-8 h-6 bg-gradient-to-b from-secondary to-secondary-container rounded-t-md border border-white/30 flex items-center justify-center shadow-md z-40"
            >
              <div className="w-2.5 h-3 bg-surface-container-lowest rounded-full border border-secondary" />
            </motion.div>
          </div>
        </motion.div>

        {/* ── CHEST BODY (BASE DEL BAÚL) ── */}
        <div className="relative w-44 h-24 rounded-b-2xl bg-gradient-to-b from-[#182033] via-[#111726] to-[#0a0f1c] border-b-2 border-x-2 border-secondary/60 shadow-2xl overflow-hidden z-20">
          {/* Inner Light Glow when Opened */}
          <motion.div
            animate={{ opacity: isOpened ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-secondary/70 to-transparent pointer-events-none"
          />

          {/* Golden Corner Brackets & Metal Bands */}
          <div className="absolute left-6 inset-y-0 w-3 bg-gradient-to-b from-secondary-container to-secondary border-x border-white/20" />
          <div className="absolute right-6 inset-y-0 w-3 bg-gradient-to-b from-secondary-container to-secondary border-x border-white/20" />
          <div className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-secondary/40 via-secondary to-secondary/40" />

          {/* Lower Keyhole Plate */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-5 bg-gradient-to-b from-secondary to-secondary-container rounded-b-md border-x border-b border-white/30 flex items-center justify-center shadow-md">
            <div className="w-1.5 h-2.5 bg-surface-container-lowest rounded-full" />
          </div>

          {/* Front Shadow Depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
        </div>
      </motion.div>
    </div>
  );
}
