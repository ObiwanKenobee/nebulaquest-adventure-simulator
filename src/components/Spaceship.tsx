import React from 'react';
import { motion } from 'framer-motion';

const Spaceship = () => {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [rotation, setRotation] = React.useState(0);
  const [isThrusting, setIsThrusting] = React.useState(false);
  const [velocity, setVelocity] = React.useState({ x: 0, y: 0 });

  const handleKeyDown = React.useCallback((e: KeyboardEvent) => {
    const speed = 2;
    setIsThrusting(true);
    
    switch (e.key) {
      case 'ArrowUp':
        setVelocity(prev => ({ 
          x: prev.x, 
          y: Math.max(prev.y - speed, -10)
        }));
        setRotation(0);
        break;
      case 'ArrowDown':
        setVelocity(prev => ({ 
          x: prev.x, 
          y: Math.min(prev.y + speed, 10)
        }));
        setRotation(180);
        break;
      case 'ArrowLeft':
        setVelocity(prev => ({ 
          x: Math.max(prev.x - speed, -10), 
          y: prev.y
        }));
        setRotation(-90);
        break;
      case 'ArrowRight':
        setVelocity(prev => ({ 
          x: Math.min(prev.x + speed, 10), 
          y: prev.y
        }));
        setRotation(90);
        break;
    }
  }, []);

  const handleKeyUp = React.useCallback((e: KeyboardEvent) => {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      setIsThrusting(false);
    }
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setPosition(prev => ({
        x: prev.x + velocity.x,
        y: prev.y + velocity.y
      }));
      
      // Apply drag to slow down the ship
      setVelocity(prev => ({
        x: prev.x * 0.95,
        y: prev.y * 0.95
      }));
    }, 16); // ~60fps

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp, velocity]);

  return (
    <motion.div
      className="absolute w-16 h-16"
      animate={{ x: position.x, y: position.y, rotate: rotation }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <div className="w-full h-full relative">
        {/* Main ship body */}
        <div className="absolute inset-0 bg-gradient-to-br from-space-accent2 to-blue-600 clip-path-triangle transform rotate-90 rounded-lg shadow-lg" />
        
        {/* Cockpit */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-300/30 rounded-full" />
        
        {/* Wing accents */}
        <div className="absolute top-1/4 left-0 w-2 h-2 bg-space-accent1 rounded-full shadow-glow-purple" />
        <div className="absolute top-1/4 right-0 w-2 h-2 bg-space-accent1 rounded-full shadow-glow-purple" />
        
        {/* Thruster effect */}
        {isThrusting && (
          <>
            <motion.div
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3 h-6 bg-gradient-to-t from-orange-500 via-yellow-400 to-transparent rounded-full opacity-75"
              animate={{ 
                height: [6, 12, 6],
                opacity: [0.7, 1, 0.7] 
              }}
              transition={{ 
                duration: 0.5, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            />
            <motion.div
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-2 h-4 bg-white/90 rounded-full opacity-50"
              animate={{ 
                height: [4, 8, 4],
                opacity: [0.5, 0.8, 0.5] 
              }}
              transition={{ 
                duration: 0.3, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            />
          </>
        )}
      </div>
    </motion.div>
  );
};

export default Spaceship;