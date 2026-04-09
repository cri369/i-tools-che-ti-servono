import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ViralHookSmith from '@/src/components/ViralHookSmith';
import VibeAnalyzer from '@/src/components/VibeAnalyzer';
import MemeBrainstormer from '@/src/components/MemeBrainstormer';
import MemeGenerator from '@/src/components/MemeGenerator';
import RoastMyProfile from '@/src/components/RoastMyProfile';
import EngagementBaiter from '@/src/components/EngagementBaiter';
import CaptionWizard from '@/src/components/CaptionWizard';
import { Sparkles, Zap, Laugh, TrendingUp, Flame, MessageCircle, Wand2, Image as ImageIcon } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-viral-neon selection:text-black">
      {/* Marquee Header */}
      <div className="bg-black text-white py-2 overflow-hidden border-b-2 border-black">
        <div className="animate-marquee whitespace-nowrap flex gap-8 items-center">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 font-mono text-sm font-bold uppercase">
              <TrendingUp className="text-viral-neon w-4 h-4" />
              <span>ViralAI Studio // Create the Future // ViralAI Studio // Create the Future</span>
            </div>
          ))}
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-12 space-y-12">
        {/* Hero Section */}
        <header className="text-center space-y-4">
          <h1 className="font-heading text-7xl md:text-9xl uppercase leading-[0.85] tracking-tighter">
            VIRAL<br />
            <span className="text-viral-neon">STUDIO</span>
          </h1>
          <p className="font-mono text-lg md:text-xl max-w-2xl mx-auto opacity-70">
            La tua suite di tool AI per dominare l'algoritmo. 
            Crea contenuti che spaccano in pochi secondi.
          </p>
        </header>

        {/* Tool Tabs */}
        <Tabs defaultValue="hooks" className="w-full">
          <TabsList className="flex flex-wrap justify-center gap-3 bg-transparent h-auto p-0 mb-12 border-none">
            <TabsTrigger 
              value="hooks" 
              className="brutal-button flex items-center gap-2 bg-white data-[state=active]:bg-viral-neon data-[state=active]:-translate-x-1 data-[state=active]:-translate-y-1 data-[state=active]:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span className="font-bold uppercase tracking-tight">Ganci</span>
            </TabsTrigger>
            <TabsTrigger 
              value="vibe" 
              className="brutal-button flex items-center gap-2 bg-white data-[state=active]:bg-viral-pink data-[state=active]:text-white data-[state=active]:-translate-x-1 data-[state=active]:-translate-y-1 data-[state=active]:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              <Zap className="w-4 h-4" />
              <span className="font-bold uppercase tracking-tight">Vibe</span>
            </TabsTrigger>
            <TabsTrigger 
              value="memes" 
              className="brutal-button flex items-center gap-2 bg-white data-[state=active]:bg-viral-orange data-[state=active]:text-white data-[state=active]:-translate-x-1 data-[state=active]:-translate-y-1 data-[state=active]:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              <Laugh className="w-4 h-4" />
              <span className="font-bold uppercase tracking-tight">Meme</span>
            </TabsTrigger>
            <TabsTrigger 
              value="visual" 
              className="brutal-button flex items-center gap-2 bg-white data-[state=active]:bg-viral-pink data-[state=active]:text-white data-[state=active]:-translate-x-1 data-[state=active]:-translate-y-1 data-[state=active]:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              <ImageIcon className="w-4 h-4" />
              <span className="font-bold uppercase tracking-tight">Visual</span>
            </TabsTrigger>
            <TabsTrigger 
              value="roast" 
              className="brutal-button flex items-center gap-2 bg-white data-[state=active]:bg-red-600 data-[state=active]:text-white data-[state=active]:-translate-x-1 data-[state=active]:-translate-y-1 data-[state=active]:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              <Flame className="w-4 h-4" />
              <span className="font-bold uppercase tracking-tight">Roast</span>
            </TabsTrigger>
            <TabsTrigger 
              value="bait" 
              className="brutal-button flex items-center gap-2 bg-white data-[state=active]:bg-yellow-500 data-[state=active]:text-black data-[state=active]:-translate-x-1 data-[state=active]:-translate-y-1 data-[state=active]:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="font-bold uppercase tracking-tight">Bait</span>
            </TabsTrigger>
            <TabsTrigger 
              value="caption" 
              className="brutal-button flex items-center gap-2 bg-white data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:-translate-x-1 data-[state=active]:-translate-y-1 data-[state=active]:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              <Wand2 className="w-4 h-4" />
              <span className="font-bold uppercase tracking-tight">Magia</span>
            </TabsTrigger>
          </TabsList>

          <div className="mt-8">
            <TabsContent value="hooks">
              <ViralHookSmith />
            </TabsContent>
            <TabsContent value="vibe">
              <VibeAnalyzer />
            </TabsContent>
            <TabsContent value="memes">
              <MemeBrainstormer />
            </TabsContent>
            <TabsContent value="visual">
              <MemeGenerator />
            </TabsContent>
            <TabsContent value="roast">
              <RoastMyProfile />
            </TabsContent>
            <TabsContent value="bait">
              <EngagementBaiter />
            </TabsContent>
            <TabsContent value="caption">
              <CaptionWizard />
            </TabsContent>
          </div>
        </Tabs>

        {/* Footer */}
        <footer className="pt-12 border-t-2 border-black flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-xs uppercase opacity-50">
          <p>© 2026 ViralAI Studio. Creato per l'algoritmo.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-viral-neon transition-colors">Privacy</a>
            <a href="#" className="hover:text-viral-neon transition-colors">Termini</a>
            <a href="#" className="hover:text-viral-neon transition-colors">Contatti</a>
          </div>
        </footer>
      </main>
    </div>
  );
}
