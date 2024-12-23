import React from 'react';
import { motion } from 'framer-motion';
import { Info, Star, Database, MapPin } from 'lucide-react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface Star {
  id: number;
  x: number;
  y: number;
  name: string;
  type: 'normal' | 'giant' | 'dwarf';
  temperature: number;
  planets: number;
  resources: string[];
  distance: number;
}

const generateStars = (count: number): Star[] => {
  const starTypes = ['normal', 'giant', 'dwarf'];
  const possibleResources = ['Iron', 'Gold', 'Helium-3', 'Titanium', 'Dark Matter'];
  
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    name: `Star-${i + 1}`,
    type: starTypes[Math.floor(Math.random() * 3)] as Star['type'],
    temperature: Math.floor(Math.random() * 10000) + 2000,
    planets: Math.floor(Math.random() * 8) + 1,
    resources: Array.from({ length: Math.floor(Math.random() * 3) + 1 })
      .map(() => possibleResources[Math.floor(Math.random() * possibleResources.length)]),
    distance: Math.floor(Math.random() * 1000) + 100,
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

  const getStarColor = (type: Star['type']) => {
    switch (type) {
      case 'giant': return 'bg-red-500';
      case 'dwarf': return 'bg-blue-400';
      default: return 'bg-yellow-300';
    }
  };

  return (
    <div className="relative w-full h-[600px] bg-space-dark rounded-lg overflow-hidden border border-space-accent1/20">
      {stars.map((star) => (
        <HoverCard key={star.id}>
          <HoverCardTrigger asChild>
            <motion.div
              className={`absolute cursor-pointer ${getStarSize(star.type)} ${getStarColor(star.type)} rounded-full hover:scale-150 transition-transform`}
              style={{ left: `${star.x}%`, top: `${star.y}%` }}
              whileHover={{ scale: 1.5 }}
              onClick={() => setSelectedStar(star)}
            />
          </HoverCardTrigger>
          <HoverCardContent className="w-80 bg-space-darker/95 border-space-accent1/30">
            <div className="flex justify-between space-x-4">
              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-space-accent2">{star.name}</h4>
                <div className="flex items-center text-xs text-white/70">
                  <Star className="mr-1 h-3 w-3" /> {star.type.charAt(0).toUpperCase() + star.type.slice(1)} Star
                </div>
              </div>
            </div>
            <div className="mt-2 text-xs text-white/70 space-y-2">
              <div className="flex items-center">
                <Database className="mr-1 h-3 w-3" />
                Temperature: {star.temperature}K
              </div>
              <div className="flex items-center">
                <MapPin className="mr-1 h-3 w-3" />
                Distance: {star.distance} light years
              </div>
              <div className="flex items-center">
                <Info className="mr-1 h-3 w-3" />
                Planets: {star.planets}
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      ))}
      
      {selectedStar && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 left-4 bg-space-darker/95 p-6 rounded-lg border border-space-accent1/30 w-80"
        >
          <h3 className="text-xl font-bold text-space-accent2 mb-4">{selectedStar.name}</h3>
          <div className="space-y-3">
            <div className="flex items-center text-white/80">
              <Star className="mr-2 h-4 w-4" />
              <span>Type: {selectedStar.type.charAt(0).toUpperCase() + selectedStar.type.slice(1)}</span>
            </div>
            <div className="flex items-center text-white/80">
              <Database className="mr-2 h-4 w-4" />
              <span>Temperature: {selectedStar.temperature}K</span>
            </div>
            <div className="flex items-center text-white/80">
              <MapPin className="mr-2 h-4 w-4" />
              <span>Distance: {selectedStar.distance} light years</span>
            </div>
            <div>
              <h4 className="text-space-accent2 font-semibold mb-2">Available Resources:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedStar.resources.map((resource, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-space-accent1/20 rounded-full text-xs text-white/80"
                  >
                    {resource}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default GalaxyMap;