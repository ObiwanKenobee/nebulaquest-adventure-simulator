import React from 'react';
import { motion } from 'framer-motion';
import { Flag, Star, Trophy, Target } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface Quest {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'completed';
  type: 'main' | 'side';
  reward: string;
  progress: number;
}

const QuestLog = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  const [quests] = React.useState<Quest[]>([
    {
      id: '1',
      title: "First Contact",
      description: "Establish contact with the Alpha Centauri civilization",
      status: 'active',
      type: 'main',
      reward: "500 Dark Matter",
      progress: 30
    },
    {
      id: '2',
      title: "Resource Collection",
      description: "Collect 100 units of Helium-3 from nearby gas giants",
      status: 'active',
      type: 'side',
      reward: "200 Credits",
      progress: 65
    },
    {
      id: '3',
      title: "System Exploration",
      description: "Map out all planets in the current star system",
      status: 'completed',
      type: 'side',
      reward: "300 Credits",
      progress: 100
    }
  ]);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed right-4 top-32 w-80 bg-space-darker/90 rounded-lg border border-space-accent1/30 backdrop-blur-sm"
    >
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-space-accent2">
          <div className="flex items-center gap-2">
            <Flag className="w-5 h-5" />
            <h2 className="font-bold">Mission Log</h2>
          </div>
          <span className="text-xs text-white/70">
            {isOpen ? '(Click to Hide)' : '(Click to Show)'}
          </span>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <div className="p-4 space-y-4">
            {quests.map((quest) => (
              <div 
                key={quest.id}
                className={`p-3 rounded-lg border ${
                  quest.status === 'completed' 
                    ? 'border-green-500/30 bg-green-500/10' 
                    : quest.type === 'main' 
                      ? 'border-yellow-500/30 bg-yellow-500/10'
                      : 'border-space-accent1/30 bg-space-accent1/10'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {quest.type === 'main' ? (
                      <Star className="w-4 h-4 text-yellow-500" />
                    ) : (
                      <Target className="w-4 h-4 text-space-accent1" />
                    )}
                    <h3 className="font-semibold text-white">{quest.title}</h3>
                  </div>
                  {quest.status === 'completed' && (
                    <Trophy className="w-4 h-4 text-green-500" />
                  )}
                </div>
                
                <p className="text-sm text-white/70 mb-2">{quest.description}</p>
                
                <div className="space-y-2">
                  <div className="w-full h-2 bg-space-darker rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-space-accent2 transition-all duration-300"
                      style={{ width: `${quest.progress}%` }}
                    />
                  </div>
                  
                  <div className="flex justify-between text-xs">
                    <span className="text-white/70">Progress: {quest.progress}%</span>
                    <span className="text-space-accent2">{quest.reward}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </motion.div>
  );
};

export default QuestLog;