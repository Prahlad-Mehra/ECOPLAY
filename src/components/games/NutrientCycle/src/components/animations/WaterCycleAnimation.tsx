import React from 'react';
import { motion } from 'framer-motion';

interface WaterCycleAnimationProps {
  currentStep: string;
  visibleLayers: string[];
  animationCues: string[];
}

export const WaterCycleAnimation: React.FC<WaterCycleAnimationProps> = ({
  currentStep,
  visibleLayers,
  animationCues
}) => {
  const isLayerVisible = (layerId: string) => visibleLayers.includes(layerId);
  const hasAnimationCue = (cue: string) => animationCues.includes(cue);

  return (
    <div className="relative w-full h-80 bg-gradient-to-b from-blue-200 via-blue-100 to-green-100 rounded-lg overflow-hidden">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 800 320"
        className="absolute inset-0"
      >
        {/* Sun */}
        {isLayerVisible('sun') && (
          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.circle
              cx="700"
              cy="60"
              r="30"
              fill="#FCD34D"
              animate={hasAnimationCue('sun-shimmer') ? {
                scale: [1, 1.1, 1],
                opacity: [1, 0.8, 1]
              } : {}}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            {/* Sun rays */}
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.line
                key={i}
                x1="700"
                y1="60"
                x2={700 + Math.cos(i * Math.PI / 4) * 50}
                y2={60 + Math.sin(i * Math.PI / 4) * 50}
                stroke="#FCD34D"
                strokeWidth="2"
                initial={{ opacity: 0 }}
                animate={{ opacity: hasAnimationCue('sun-shimmer') ? [0, 1, 0] : 0.6 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.g>
        )}

        {/* Ocean/Lake */}
        {isLayerVisible('ocean') && (
          <motion.g
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <path
              d="M0,280 Q200,270 400,280 T800,280 L800,320 L0,320 Z"
              fill="#3B82F6"
            />
            {/* Water surface waves */}
            <motion.path
              d="M0,280 Q200,275 400,280 T800,280"
              stroke="#60A5FA"
              strokeWidth="2"
              fill="none"
              animate={{
                d: [
                  "M0,280 Q200,275 400,280 T800,280",
                  "M0,280 Q200,285 400,280 T800,280",
                  "M0,280 Q200,275 400,280 T800,280"
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.g>
        )}

        {/* Evaporation arrows */}
        {hasAnimationCue('evaporation-arrows') && (
          <>
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.g key={i}>
                <motion.path
                  d={`M${100 + i * 150},280 Q${100 + i * 150},250 ${100 + i * 150},220`}
                  stroke="#60A5FA"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="5,5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: [0, 1, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeOut"
                  }}
                />
                <motion.polygon
                  points={`${100 + i * 150-3},225 ${100 + i * 150},220 ${100 + i * 150+3},225`}
                  fill="#60A5FA"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeOut"
                  }}
                />
              </motion.g>
            ))}
          </>
        )}

        {/* Clouds */}
        {isLayerVisible('clouds') && (
          <motion.g
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            {/* Cloud 1 */}
            <motion.g
              animate={hasAnimationCue('cloud-formation') ? { scale: [0.8, 1.2, 1] } : {}}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <ellipse cx="200" cy="100" rx="40" ry="25" fill="#E5E7EB" />
              <ellipse cx="220" cy="90" rx="35" ry="20" fill="#F3F4F6" />
              <ellipse cx="240" cy="100" rx="30" ry="18" fill="#E5E7EB" />
            </motion.g>
            
            {/* Cloud 2 */}
            <motion.g
              animate={hasAnimationCue('cloud-formation') ? { scale: [1, 0.9, 1.1, 1] } : {}}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            >
              <ellipse cx="500" cy="80" rx="45" ry="28" fill="#E5E7EB" />
              <ellipse cx="525" cy="70" rx="38" ry="22" fill="#F3F4F6" />
              <ellipse cx="550" cy="80" rx="32" ry="20" fill="#E5E7EB" />
            </motion.g>
          </motion.g>
        )}

        {/* Rain drops */}
        {hasAnimationCue('rainfall') && (
          <>
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.ellipse
                key={i}
                cx={150 + Math.random() * 300}
                cy={120}
                rx="2"
                ry="8"
                fill="#3B82F6"
                initial={{ y: 120, opacity: 0 }}
                animate={{ 
                  y: [120, 280], 
                  opacity: [0, 1, 1, 0]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "linear"
                }}
              />
            ))}
          </>
        )}

        {/* Mountains */}
        {isLayerVisible('mountains') && (
          <motion.g
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <path
              d="M600,280 L650,180 L700,200 L750,160 L800,280 Z"
              fill="#6B7280"
            />
            <path
              d="M600,280 L650,180 L700,200 L800,280 Z"
              fill="#9CA3AF"
            />
          </motion.g>
        )}

        {/* Vegetation */}
        {isLayerVisible('vegetation') && (
          <motion.g
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {/* Trees */}
            {Array.from({ length: 4 }).map((_, i) => (
              <g key={i}>
                <rect
                  x={80 + i * 120}
                  y="260"
                  width="8"
                  height="20"
                  fill="#8B5A2B"
                />
                <circle
                  cx={84 + i * 120}
                  cy="255"
                  r="15"
                  fill="#10B981"
                />
              </g>
            ))}
            
            {/* Transpiration bubbles */}
            {hasAnimationCue('transpiration-bubbles') && Array.from({ length: 8 }).map((_, i) => (
              <motion.circle
                key={i}
                cx={84 + (i % 4) * 120}
                cy={240}
                r="3"
                fill="#60A5FA"
                opacity="0.6"
                initial={{ y: 240, opacity: 0 }}
                animate={{ 
                  y: [240, 200, 160], 
                  opacity: [0, 0.6, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeOut"
                }}
              />
            ))}
          </motion.g>
        )}

        {/* City */}
        {isLayerVisible('city') && (
          <motion.g
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {/* Buildings */}
            <rect x="450" y="240" width="30" height="40" fill="#6B7280" />
            <rect x="490" y="220" width="35" height="60" fill="#4B5563" />
            <rect x="535" y="250" width="25" height="30" fill="#6B7280" />
            
            {/* Windows */}
            {Array.from({ length: 8 }).map((_, i) => (
              <rect
                key={i}
                x={455 + (i % 3) * 25 + Math.floor(i / 3) * 40}
                y={245 + (i % 2) * 8}
                width="4"
                height="4"
                fill="#FCD34D"
                opacity="0.8"
              />
            ))}
          </motion.g>
        )}

        {/* Ground infiltration arrows */}
        {hasAnimationCue('infiltration-arrows') && (
          <>
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.g key={i}>
                <motion.path
                  d={`M${100 + i * 100},285 L${100 + i * 100},305`}
                  stroke="#10B981"
                  strokeWidth="2"
                  strokeDasharray="3,3"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: [0, 1, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeOut"
                  }}
                />
                <motion.polygon
                  points={`${100 + i * 100-2},302 ${100 + i * 100},305 ${100 + i * 100+2},302`}
                  fill="#10B981"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeOut"
                  }}
                />
              </motion.g>
            ))}
          </>
        )}
      </svg>
    </div>
  );
};