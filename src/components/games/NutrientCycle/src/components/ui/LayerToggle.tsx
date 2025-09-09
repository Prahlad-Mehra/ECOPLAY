import React from 'react';
import { motion } from 'framer-motion';

interface LayerToggleProps {
  layerId: string;
  layerName: string;
  isVisible: boolean;
  onToggle: (layerId: string) => void;
}

export const LayerToggle: React.FC<LayerToggleProps> = ({
  layerId,
  layerName,
  isVisible,
  onToggle
}) => {
  return (
    <motion.button
      onClick={() => onToggle(layerId)}
      className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
        isVisible
          ? 'bg-emerald-500 text-white shadow-md'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-pressed={isVisible}
      aria-label={`${isVisible ? 'Hide' : 'Show'} ${layerName}`}
    >
      <span className="flex items-center gap-2">
        <motion.div
          className={`w-3 h-3 rounded-full ${
            isVisible ? 'bg-white' : 'bg-emerald-500'
          }`}
          animate={{ scale: isVisible ? 1 : 0.8 }}
          transition={{ duration: 0.2 }}
        />
        {layerName}
      </span>
    </motion.button>
  );
};