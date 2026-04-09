import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { generateContent } from '@/src/lib/gemini';
import { MessageCircle, Loader2, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function EngagementBaiter() {
  const [topic, setTopic] = useState('');
  const [takes, setTakes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const generateBait = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    try {
      const systemPrompt = `Sei un esperto di crescita organica sui social media.
      Il tuo compito è generare 3 "Hot Takes" (opinioni impopolari) o domande provocatorie sul tema fornito.
      L'obiettivo è generare discussioni accese (ma civili) nei commenti.
      Sii audace, controcorrente e un po' provocatorio.
      Restituisci solo una lista numerata di 3 frasi. Lingua: Italiano.`;
      
      const result = await generateContent(`Tema: ${topic}`, systemPrompt);
      if (result) {
        const lines = result.split('\n').filter(line => line.trim() && /^\d\./.test(line));
        setTakes(lines.map(l => l.replace(/^\d\.\s*/, '')));
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
          <CardTitle className="font-heading text-3xl uppercase flex items-center gap-2">
            <AlertTriangle className="text-yellow-500" /> Engagement Baiter
          </CardTitle>
          <CardDescription className="font-mono text-sm">Genera caos (controllato) nei tuoi commenti.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input 
              placeholder="Tema (es. 'Smart Working', 'Pizza all'ananas', 'AI')"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="border-2 border-black rounded-none focus-visible:ring-yellow-500"
            />
            <Button 
              onClick={generateBait} 
              disabled={loading || !topic.trim()}
              className="brutal-button bg-yellow-500 hover:bg-yellow-600 text-black"
            >
              {loading ? <Loader2 className="animate-spin" /> : <MessageCircle />}
            </Button>
          </div>
        </CardContent>
      </Card>

      <AnimatePresence>
        {takes.length > 0 && (
          <div className="grid gap-4">
            {takes.map((take, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="brutal-card bg-black text-white border-yellow-500"
              >
                <p className="text-xl font-bold italic text-yellow-500">"{take}"</p>
                <p className="mt-2 font-mono text-[10px] uppercase opacity-50">Copia e preparati alla discussione nei commenti.</p>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
