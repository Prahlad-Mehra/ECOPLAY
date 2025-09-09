import React from 'react';
import { motion } from 'framer-motion';

interface NitrogenCycleAnimationProps {
  currentStep: string;
  visibleLayers: string[];
  animationCues: string[];
}

export const NitrogenCycleAnimation: React.FC<NitrogenCycleAnimationProps> = ({
  currentStep,
  visibleLayers,
  animationCues
}) => {
  const isLayerVisible = (layerId: string) => visibleLayers.includes(layerId);
  const hasAnimationCue = (cue: string) => animationCues.includes(cue);

  return (
    <div className="relative w-full h-80 bg-gradient-to-b from-blue-200 via-green-100 to-amber-100 rounded-lg overflow-hidden">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 800 320"
        className="absolute inset-0"
      >
        {/* Atmosphere */}
        {isLayerVisible('atmosphere') && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <rect x="0" y="0" width="800" height="80" fill="rgba(59, 130, 246, 0.1)" />
            
            {/* N₂ molecules floating in atmosphere */}
            {hasAnimationCue('nitrogen-molecules') && Array.from({ length: 12 }).map((_, i) => (
              <motion.g key={i}>
                <motion.circle
                  cx={50 + i * 60}
                  cy={30 + (i % 3) * 15}
                  r="4"
                  fill="#1E40AF"
                  animate={{
                    x: [0, 10, 0, -10, 0],
                    y: [0, -5, 0, 5, 0]
                  }}
                  transition={{
                    duration: 4 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <text
                  x={50 + i * 60 - 5}
                  y={35 + (i % 3) * 15}
                  fontSize="8"
                  fill="white"
                  textAnchor="middle"
                >
                  N₂
                </text>
              </motion.g>
            ))}
          </motion.g>
        )}

        {/* Soil layer */}
        {isLayerVisible('soil') && (
          <motion.g
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <rect x="0" y="260" width="800" height="60" fill="#8B5A2B" />
            {/* Soil texture */}
            {Array.from({ length: 50 }).map((_, i) => (
              <circle
                key={i}
                cx={Math.random() * 800}
                cy={260 + Math.random() * 60}
                r={1 + Math.random() * 2}
                fill="#A16207"
                opacity="0.6"
              />
            ))}
          </motion.g>
        )}

        {/* Bacteria */}
        {isLayerVisible('bacteria') && (
          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Nitrogen-fixing bacteria in soil */}
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.g key={i}>
                <motion.circle
                  cx={100 + i * 80}
                  cy={280}
                  r="6"
                  fill="#16A34A"
                  animate={hasAnimationCue('bacteria-conversion') ? {
                    scale: [1, 1.3, 1],
                    opacity: [1, 0.7, 1]
                  } : {}}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                />
                <text
                  x={100 + i * 80}
                  y={284}
                  fontSize="4"
                  fill="white"
                  textAnchor="middle"
                >
                  B
                </text>
              </motion.g>
            ))}
            
            {/* Conversion process visualization */}
            {hasAnimationCue('ammonia-production') && Array.from({ length: 6 }).map((_, i) => (
              <motion.g key={i}>
                <motion.circle
                  cx={120 + i * 80}
                  cy={270}
                  r="3"
                  fill="#F59E0B"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: [0, 1, 0], 
                    scale: [0, 1, 0],
                    y: [0, -10, -20]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeOut"
                  }}
                />
                <text
                  x={120 + i * 80}
                  y={273}
                  fontSize="6"
                  fill="white"
                  textAnchor="middle"
                  style={{ pointerEvents: 'none' }}
                >
                  NH₃
                </text>
              </motion.g>
            ))}
          </motion.g>
        )}

        {/* Plants */}
        {isLayerVisible('plants') && (
          <motion.g
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {/* Plant stems and roots */}
            {Array.from({ length: 6 }).map((_, i) => (
              <g key={i}>
                {/* Roots */}
                <motion.path
                  d={`M${150 + i * 100},260 Q${145 + i * 100},275 ${140 + i * 100},285 M${150 + i * 100},260 Q${155 + i * 100},275 ${160 + i * 100},285`}
                  stroke="#8B5A2B"
                  strokeWidth="2"
                  fill="none"
                  animate={hasAnimationCue('root-absorption') ? {
                    strokeWidth: [2, 3, 2]
                  } : {}}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
                
                {/* Stem */}
                <rect
                  x={148 + i * 100}
                  y="200"
                  width="4"
                  height="60"
                  fill="#16A34A"
                />
                
                {/* Leaves */}
                <ellipse
                  cx={150 + i * 100}
                  cy="190"
                  rx="12"
                  ry="8"
                  fill="#22C55E"
                />
                <ellipse
                  cx={145 + i * 100}
                  cy="200"
                  rx="10"
                  ry="6"
                  fill="#16A34A"
                />
                <ellipse
                  cx={155 + i * 100}
                  cy="200"
                  rx="10"
                  ry="6"
                  fill="#16A34A"
                />
                
                {/* Nutrient absorption arrows */}
                {hasAnimationCue('root-absorption') && (
                  <motion.path
                    d={`M${150 + i * 100},275 L${150 + i * 100},245`}
                    stroke="#F59E0B"
                    strokeWidth="2"
                    strokeDasharray="3,3"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: [0, 1, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: "easeOut"
                    }}
                  />
                )}
              </g>
            ))}
          </motion.g>
        )}

        {/* Animals */}
        {isLayerVisible('animals') && (
          <motion.g
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            {/* Rabbit */}
            <motion.g
              animate={hasAnimationCue('food-chain-arrows') ? { x: [0, 5, 0] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ellipse cx="300" cy="240" rx="15" ry="10" fill="#A3A3A3" />
              <circle cx="290" cy="235" r="6" fill="#D1D5DB" />
              <ellipse cx="288" cy="232" rx="3" ry="6" fill="#D1D5DB" />
              <ellipse cx="292" cy="232" rx="3" ry="6" fill="#D1D5DB" />
              <circle cx="286" cy="233" r="1" fill="#000" />
            </motion.g>
            
            {/* Bird */}
            <motion.g
              animate={hasAnimationCue('food-chain-arrows') ? { 
                x: [0, 10, 0], 
                y: [0, -5, 0] 
              } : {}}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            >
              <ellipse cx="500" cy="180" rx="12" ry="6" fill="#7C3AED" />
              <circle cx="495" cy="178" r="4" fill="#8B5CF6" />
              <path d="M485,178 Q490,175 495,178" stroke="#6D28D9" strokeWidth="2" fill="none" />
              <circle cx="493" cy="177" r="1" fill="#000" />
            </motion.g>

            {/* Food chain arrows */}
            {hasAnimationCue('food-chain-arrows') && (
              <>
                <motion.path
                  d="M270,240 Q280,230 290,240"
                  stroke="#F59E0B"
                  strokeWidth="2"
                  strokeDasharray="4,4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: [0, 1, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                />
                <motion.path
                  d="M480,185 Q490,175 500,180"
                  stroke="#F59E0B"
                  strokeWidth="2"
                  strokeDasharray="4,4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: [0, 1, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: 0.5,
                    ease: "easeOut"
                  }}
                />
              </>
            )}
          </motion.g>
        )}

        {/* Decomposers */}
        {isLayerVisible('decomposers') && (
          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {/* Mushrooms and decomposer organisms */}
            {Array.from({ length: 4 }).map((_, i) => (
              <g key={i}>
                <rect
                  x={600 + i * 40}
                  y="250"
                  width="3"
                  height="10"
                  fill="#8B5A2B"
                />
                <ellipse
                  cx={601.5 + i * 40}
                  cy="245"
                  rx="8"
                  ry="5"
                  fill="#EF4444"
                />
                <circle
                  cx={598 + i * 40}
                  cy="247"
                  r="1"
                  fill="#FEE2E2"
                />
                <circle
                  cx={605 + i * 40}
                  cy="247"
                  r="1"
                  fill="#FEE2E2"
                />
              </g>
            ))}

            {/* Decay particles */}
            {hasAnimationCue('decay-process') && Array.from({ length: 12 }).map((_, i) => (
              <motion.circle
                key={i}
                cx={600 + (i % 4) * 40}
                cy={260}
                r="2"
                fill="#F59E0B"
                opacity="0.7"
                animate={{
                  y: [0, -10, 0, 10, 0],
                  opacity: [0.7, 1, 0.7, 0.5, 0.7]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.g>
        )}

        {/* Denitrification arrows returning to atmosphere */}
        {hasAnimationCue('denitrification') && (
          <>
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.g key={i}>
                <motion.path
                  d={`M${100 + i * 100},280 Q${100 + i * 100},150 ${100 + i * 100},50`}
                  stroke="#3B82F6"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: [0, 1, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.4,
                    ease: "easeOut"
                  }}
                />
                <motion.polygon
                  points={`${100 + i * 100-3},55 ${100 + i * 100},50 ${100 + i * 100+3},55`}
                  fill="#3B82F6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.4,
                    ease: "easeOut"
                  }}
                />
                <motion.text
                  x={105 + i * 100}
                  y={170}
                  fontSize="8"
                  fill="#1E40AF"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.4,
                    ease: "easeOut"
                  }}
                >
                  N₂
                </motion.text>
              </motion.g>
            ))}
          </>
        )}
      </svg>
    </div>
  );
};