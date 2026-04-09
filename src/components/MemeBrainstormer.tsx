import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { generateContent } from '@/src/lib/gemini';
import { Laugh, Loader2, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function MemeBrainstormer() {
  const [topic, setTopic] = useState('');
  const [memes, setMemes] = useState<{ setup: string, punchline: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const generateMemes = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    try {
      const systemPrompt = `Sei un creatore di meme professionista. 
      Genera 3 idee per meme (formato testo) basate sul tema fornito.
      Ogni idea deve avere un "setup" (la situazione) e una "punchline" (la reazione o il testo del meme).
      Restituisci un array JSON di oggetti con chiavi "setup" e "punchline".
      Sii attuale, divertente e un po' "edgy". Lingua: Italiano.`;
      
      const result = await generateContent(`Tema: ${topic}`, systemPrompt);
      if (result) {
        const cleanJson = result.replace(/```json|```/g, '').trim();
        setMemes(JSON.parse(cleanJson));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="brutal-card">
        <CardHeader>
          <CardTitle className="font-heading text-3xl uppercase">Meme Architect</CardTitle>
          <CardDescription className="font-mono text-sm">Trasforma qualsiasi situazione in un meme leggendario.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input 
              placeholder="Tema del meme (es. 'Lunedì mattina', 'JavaScript', 'Palestra')"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="border-2 border-black rounded-none focus-visible:ring-viral-orange"
            />
            <Button 
              onClick={generateMemes} 
              disabled={loading || !topic.trim()}
              className="brutal-button bg-viral-orange hover:bg-viral-orange/90 text-white"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Laugh />}
            </Button>
          </div>
        </CardContent>
      </Card>

      <AnimatePresence>
        {memes.length > 0 && (
          <div className="grid gap-6">
            {memes.map((meme, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, rotate: index % 2 === 0 ? -2 : 2 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: index * 0.1 }}
                className="brutal-card bg-viral-orange text-white relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-30 transition-opacity">
                  <Laugh size={80} />
                </div>
                <div className="relative z-10 space-y-4">
                  <div className="space-y-1">
                    <p className="font-mono text-xs uppercase opacity-80">Situazione:</p>
                    <p className="text-xl font-bold leading-tight">{meme.setup}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-mono text-xs uppercase opacity-80">Testo del Meme:</p>
                    <p className="text-2xl font-heading uppercase tracking-tighter bg-black text-white p-2 inline-block">
                      {meme.punchline}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
            <Button 
              variant="outline" 
              onClick={generateMemes}
              className="w-full border-2 border-black rounded-none hover:bg-black hover:text-white"
            >
              <RefreshCw className="mr-2 w-4 h-4" /> RIGENERA IDEE
            </Button>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
