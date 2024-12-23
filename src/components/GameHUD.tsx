import React from 'react';
import { Shield, Fuel, Battery, Compass, Star, Diamond } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

const GameHUD = () => {
  return (
    <div className="fixed inset-x-0 top-0 p-4 pointer-events-none">
      <div className="max-w-6xl mx-auto flex justify-between items-start gap-4">
        {/* Navigation Panel */}
        <div className="bg-space-darker/80 p-4 rounded-lg border border-space-accent1/30 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-space-accent2 font-bold mb-3">
            <Compass className="w-5 h-5" />
            <h2>Navigation</h2>
          </div>
          <div className="space-y-2">
            <p className="text-white/80 text-sm flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-400" />
              Current System: Alpha Centauri
            </p>
            <p className="text-white/80 text-sm">Use arrow keys to navigate</p>
          </div>
        </div>
        
        {/* Central Status Panel */}
        <div className="bg-space-darker/80 p-4 rounded-lg border border-space-accent1/30 backdrop-blur-sm min-w-[300px]">
          <div className="flex items-center gap-2 text-space-accent2 font-bold mb-3">
            <Battery className="w-5 h-5" />
            <h2>Ship Status</h2>
          </div>
          <div className="space-y-3">
            {/* Shield Status */}
            <div className="space-y-1">
              <div className="flex justify-between text-sm text-white/80">
                <span className="flex items-center gap-1">
                  <Shield className="w-4 h-4 text-blue-400" />
                  Shields
                </span>
                <span>85%</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
            
            {/* Fuel Status */}
            <div className="space-y-1">
              <div className="flex justify-between text-sm text-white/80">
                <span className="flex items-center gap-1">
                  <Fuel className="w-4 h-4 text-green-400" />
                  Fuel
                </span>
                <span>65%</span>
              </div>
              <Progress value={65} className="h-2" />
            </div>
          </div>
        </div>
        
        {/* Resources Panel */}
        <div className="bg-space-darker/80 p-4 rounded-lg border border-space-accent1/30 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-space-accent2 font-bold mb-3">
            <Diamond className="w-5 h-5" />
            <h2>Resources</h2>
          </div>
          <div className="space-y-2">
            <p className="text-white/80 text-sm flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-purple-400" />
              Dark Matter: 150
            </p>
            <p className="text-white/80 text-sm flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-yellow-400" />
              Helium-3: 300
            </p>
            <p className="text-white/80 text-sm flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-400" />
              Titanium: 450
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameHUD;