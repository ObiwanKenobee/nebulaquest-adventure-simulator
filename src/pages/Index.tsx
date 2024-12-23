import React from 'react';
import StarField from '../components/StarField';
import GalaxyMap from '../components/GalaxyMap';
import Spaceship from '../components/Spaceship';
import GameHUD from '../components/GameHUD';
import QuestLog from '../components/QuestLog';
import { motion } from 'framer-motion';

const Index = () => {
  return (
    <div className="min-h-screen bg-space-dark text-white overflow-hidden relative">
      <StarField />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container py-8"
      >
        <h1 className="text-4xl font-bold text-center mb-8 text-space-accent2">
          NebulaQuest: AI Galaxy Explorer
        </h1>
        
        <div className="relative">
          <GalaxyMap />
          <Spaceship />
        </div>
      </motion.div>
      
      <GameHUD />
      <QuestLog />
    </div>
  );
};

export default Index;