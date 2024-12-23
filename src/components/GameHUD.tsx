import React from 'react';

const GameHUD = () => {
  return (
    <div className="fixed inset-x-0 top-0 p-4 pointer-events-none">
      <div className="max-w-4xl mx-auto flex justify-between items-start">
        <div className="bg-space-darker/80 p-4 rounded-lg border border-space-accent1/30 backdrop-blur-sm">
          <h2 className="text-space-accent2 font-bold mb-2">Navigation</h2>
          <p className="text-white/80 text-sm">Use arrow keys to navigate</p>
        </div>
        
        <div className="bg-space-darker/80 p-4 rounded-lg border border-space-accent1/30 backdrop-blur-sm">
          <h2 className="text-space-accent2 font-bold mb-2">Resources</h2>
          <p className="text-white/80 text-sm">Fuel: 100%</p>
          <p className="text-white/80 text-sm">Shield: 100%</p>
        </div>
      </div>
    </div>
  );
};

export default GameHUD;