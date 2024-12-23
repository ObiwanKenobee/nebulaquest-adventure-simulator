import React from 'react';
import { motion } from 'framer-motion';

const Spaceship = () => {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [rotation, setRotation] = React.useState(0);

  const handleKeyDown = React.useCallback((e: KeyboardEvent) => {
    const speed = 10;
    switch (e.key) {
      case 'ArrowUp':
        setPosition(prev => ({ ...prev, y: prev.y - speed }));
        setRotation(0);
        break;
      case 'ArrowDown':
        setPosition(prev => ({ ...prev, y: prev.y + speed }));
        setRotation(180);
        break;
      case 'ArrowLeft':
        setPosition(prev => ({ ...prev, x: prev.x - speed }));
        setRotation(-90);
        break;
      case 'ArrowRight':
        setPosition(prev => ({ ...prev, x: prev.x + speed }));
        setRotation(90);
        break;
    }
  }, []);

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <motion.div
      className="absolute w-12 h-12"
      animate={{ x: position.x, y: position.y, rotate: rotation }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div className="w-full h-full relative">
        <div className="absolute inset-0 bg-space-accent2 clip-path-triangle transform rotate-90" />
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-4 bg-space-accent1 rounded-full opacity-75 animate-pulse" />
      </div>
    </motion.div>
  );
};

export default Spaceship;