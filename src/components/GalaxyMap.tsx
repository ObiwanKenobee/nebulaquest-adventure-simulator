import React from 'react';
import { motion } from 'framer-motion';

interface Star {
  id: number;
  x: number;
  y: number;
  name: string;
  type: 'normal' | 'giant' | 'dwarf';
}

const generateStars = (count: number): Star[] => {
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    name: `Star-${i + 1}`,
    type: ['normal', 'giant', 'dwarf'][Math.floor(Math.random() * 3)] as Star['type'],
  }));
};

const GalaxyMap = () => {
  const [stars] = React.useState<Star[]>(() => generateStars(50));
  const [selectedStar, setSelectedStar] = React.useState<Star | null>(null);

  const getStarSize = (type: Star['type']) => {
    switch (type) {
      case 'giant': return 'w-6 h-6';
      case 'dwarf': return 'w-2 h-2';
      default: return 'w-4 h-4';
    }
  };

  return (
    <div className="relative w-full h-[600px] bg-space-dark rounded-lg overflow-hidden border border-space-accent1/20">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className={`absolute cursor-pointer ${getStarSize(star.type)} rounded-full bg-space-star hover:scale-150 transition-transform`}
          style={{ left: `${star.x}%`, top: `${star.y}%` }}
          whileHover={{ scale: 1.5 }}
          onClick={() => setSelectedStar(star)}
        />
      ))}
      
      {selectedStar && (
        <div 
          className="absolute bottom-4 left-4 bg-space-darker p-4 rounded-lg border border-space-accent1/30"
          style={{ backdropFilter: 'blur(8px)' }}
        >
          <h3 className="text-space-accent2 font-bold">{selectedStar.name}</h3>
          <p className="text-white/80">Type: {selectedStar.type}</p>
        </div>
      )}
    </div>
  );
};

export default GalaxyMap;